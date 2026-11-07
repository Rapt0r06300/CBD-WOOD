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

  function matches(card, query) {
    const queryTokens = tokens(query);
    if (!queryTokens.length) return true;
    const haystack = normalize([
      card?.dataset?.productName,
      card?.dataset?.productCategory,
      card?.textContent,
    ].filter(Boolean).join(' '));
    return queryTokens.every((token) => equivalentTokens(token).some((candidate) => haystack.includes(candidate)));
  }

  function init(document) {
    const form = document.querySelector('[data-wood-catalog-search]');
    const main = document.querySelector('main[data-catalog-category]');
    const grid = main?.querySelector('.product-grid');
    if (!form || !grid || form.dataset.ready === 'true') return;
    form.dataset.ready = 'true';
    const input = form.querySelector('input[type="search"]');
    const status = form.querySelector('[data-wood-catalog-search-status]');
    if (!input || !status) return;

    const apply = () => {
      const cards = Array.from(grid.querySelectorAll('.product-card'));
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
    };

    input.addEventListener('input', apply);
    form.addEventListener('reset', () => global.requestAnimationFrame(apply));
    document.addEventListener('wood:catalog-rendered', apply);
    apply();
  }

  const api = { normalize, tokens, matches };
  global.WoodCatalogSearch = api;
  if (global.document) {
    if (global.document.readyState === 'loading') global.document.addEventListener('DOMContentLoaded', () => init(global.document), { once: true });
    else init(global.document);
  }
}(window));
