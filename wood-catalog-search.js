(function initWoodCatalogSearch(global) {
  const aliasGroups = [
    ['fleur', 'fleurs'],
    ['resine', 'resines', 'hash'],
    ['boutique', 'shop'],
    ['bien etre', 'bien-etre'],
    ['cosmetique', 'cosmetiques'],
    ['huile', 'huiles'],
    ['textile', 'vetement', 'vetements', 'goods'],
  ];

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[’']/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function tokens(value) {
    const normalized = normalize(value);
    if (!normalized) return [];
    return normalized.split(/\s+/).filter(Boolean);
  }

  function equivalentTokens(token) {
    const group = aliasGroups.find((items) => items.includes(token));
    return group || [token];
  }

  function editDistance(left, right) {
    const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
    for (let row = 1; row <= left.length; row += 1) {
      const current = [row];
      for (let column = 1; column <= right.length; column += 1) {
        current[column] = Math.min(
          current[column - 1] + 1,
          previous[column] + 1,
          previous[column - 1] + (left[row - 1] === right[column - 1] ? 0 : 1),
        );
      }
      for (let column = 0; column <= right.length; column += 1) previous[column] = current[column];
    }
    return previous[right.length];
  }

  function fuzzyWordMatch(word, candidate) {
    if (word === candidate || word.startsWith(candidate) || candidate.startsWith(word)) return true;
    if (candidate.length < 4 || word.length < 4) return false;
    const threshold = candidate.length >= 7 ? 2 : 1;
    return editDistance(word, candidate) <= threshold;
  }

  function matches(card, query) {
    const queryTokens = tokens(query);
    if (!queryTokens.length) return true;
    const haystack = normalize([
      card?.dataset?.productName,
      card?.dataset?.productCategory,
      card?.textContent,
    ].filter(Boolean).join(' '));
    const words = haystack.split(/\s+/).filter(Boolean);
    return queryTokens.every((token) => equivalentTokens(token).some((candidate) => (
      haystack.includes(candidate) || words.some((word) => fuzzyWordMatch(word, candidate))
    )));
  }

  function init(document) {
    const form = document.querySelector('[data-wood-catalog-search]');
    const main = document.querySelector('main[data-catalog-category]');
    const grid = main?.querySelector('.product-grid');
    if (!form || !grid || form.dataset.ready === 'true') return;
    form.dataset.ready = 'true';
    const input = form.querySelector('input[type="search"]');
    const sort = form.querySelector('[data-wood-catalog-sort]');
    const status = form.querySelector('[data-wood-catalog-search-status]');
    if (!input || !sort || !status) return;

    const params = new URLSearchParams(global.location?.search || '');
    input.value = params.get('q') || '';
    sort.value = params.get('sort') === 'name' ? 'name' : 'wood';

    const updateUrl = () => {
      if (!global.history?.replaceState || !global.location?.href) return;
      const url = new URL(global.location.href);
      if (input.value.trim()) url.searchParams.set('q', input.value.trim());
      else url.searchParams.delete('q');
      if (sort.value === 'name') url.searchParams.set('sort', 'name');
      else url.searchParams.delete('sort');
      global.history.replaceState({}, '', url);
    };

    const orderCards = (cards) => {
      cards.forEach((card, index) => {
        if (!card.dataset.catalogOrder) card.dataset.catalogOrder = String(index);
      });
      const ordered = [...cards].sort((left, right) => {
        if (sort.value === 'name') return String(left.dataset.productName || '').localeCompare(String(right.dataset.productName || ''), 'fr', { sensitivity: 'base' });
        return Number(left.dataset.catalogOrder) - Number(right.dataset.catalogOrder);
      });
      ordered.forEach((card) => grid.appendChild(card));
    };

    const apply = (shouldUpdateUrl = true) => {
      const cards = Array.from(grid.querySelectorAll('.product-card'));
      orderCards(cards);
      const query = input.value;
      const visible = cards.filter((card) => {
        const visibleCard = matches(card, query);
        card.hidden = !visibleCard;
        return visibleCard;
      });
      if (!tokens(query).length) {
        status.textContent = `${cards.length} référence${cards.length > 1 ? 's' : ''} dans cet univers.`;
      } else if (!visible.length) {
        status.textContent = `Aucune référence pour « ${query.trim()} ». Effacez la recherche ou explorez un autre univers.`;
      } else {
        status.textContent = `${visible.length} référence${visible.length > 1 ? 's' : ''} trouvée${visible.length > 1 ? 's' : ''} pour « ${query.trim()} ».`;
      }
      if (shouldUpdateUrl) updateUrl();
    };

    input.addEventListener('input', apply);
    sort.addEventListener('change', apply);
    form.addEventListener('reset', () => global.requestAnimationFrame(apply));
    document.addEventListener('wood:catalog-rendered', () => apply(false));
    apply(false);
  }

  const api = { normalize, tokens, matches };
  global.WoodCatalogSearch = api;
  if (global.document) {
    if (global.document.readyState === 'loading') global.document.addEventListener('DOMContentLoaded', () => init(global.document), { once: true });
    else init(global.document);
  }
}(window));
