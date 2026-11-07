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

  function stateFor(card) {
    const media = String(card?.dataset?.mediaState || 'demo').toLowerCase();
    const unavailable = card?.dataset?.productUnavailable === 'true'
      || Boolean(card?.querySelector?.('[data-product-unavailable], button[disabled]'));
    const availability = String(card?.dataset?.availabilityState || (unavailable ? 'incomplete' : 'available')).toLowerCase();
    return { media, availability };
  }

  function matchesFilters(card, filters = {}) {
    const state = stateFor(card);
    const characteristics = readCharacteristics(card);
    return (!filters.media || state.media === filters.media)
      && (!filters.state || state.availability === filters.state)
      && Object.entries(filters.characteristics || {}).every(([key, value]) => !value || characteristics[key].includes(value));
  }

  const characteristicKeys = Object.freeze([
    ['type', 'Type'],
    ['texture', 'Texture'],
    ['aroma', 'Arôme'],
  ]);

  function readCharacteristics(card) {
    return Object.fromEntries(characteristicKeys.map(([key]) => [
      key,
      String(card?.dataset?.[`woodCharacteristic${key[0].toUpperCase()}${key.slice(1)}`] || '')
        .split('|')
        .map((value) => normalize(value))
        .filter(Boolean),
    ]));
  }

  function collectCharacteristicValues(cards) {
    return Object.fromEntries(characteristicKeys.map(([key]) => [
      key,
      [...new Set(cards.flatMap((card) => readCharacteristics(card)[key]))].sort(),
    ]));
  }

  function filterCards(cards, query = '', filters = {}) {
    return [...cards].filter((card) => matches(card, query) && matchesFilters(card, filters));
  }

  function addFilterControl(root, label, name, options) {
    const wrap = document.createElement('label');
    wrap.className = 'wood-catalog-search__filter';
    wrap.textContent = label;
    const select = document.createElement('select');
    select.name = name;
    select.dataset[`woodCatalog${name[0].toUpperCase()}${name.slice(1)}Filter`] = 'true';
    options.forEach(([value, text]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = text;
      select.appendChild(option);
    });
    wrap.appendChild(select);
    root.appendChild(wrap);
    return select;
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

    const filterRoot = document.createElement('div');
    filterRoot.className = 'wood-catalog-search__filters';
    filterRoot.setAttribute('aria-label', 'Filtres de la sélection');
    const mediaFilter = addFilterControl(filterRoot, 'Média', 'media', [
      ['', 'Tous les médias'],
      ['demo', 'Illustration démo'],
      ['approved', 'Photo approuvée'],
    ]);
    const stateFilter = addFilterControl(filterRoot, 'État', 'state', [
      ['', 'Tous les états'],
      ['available', 'Consultable'],
      ['incomplete', 'À compléter'],
    ]);
    const cardsAtInit = Array.from(grid.querySelectorAll('.product-card'));
    const characteristicValues = collectCharacteristicValues(cardsAtInit);
    const characteristicFilters = Object.fromEntries(characteristicKeys.map(([key, label]) => {
      const values = characteristicValues[key];
      if (!values.length) return [key, null];
      return [key, addFilterControl(filterRoot, label, `characteristic${key[0].toUpperCase()}${key.slice(1)}`, [
        ['', `Tous les ${label.toLowerCase()}s`],
        ...values.map((value) => [value, value]),
      ])];
    }));
    if (!characteristicKeys.some(([key]) => characteristicValues[key].length)) {
      const note = document.createElement('p');
      note.className = 'wood-catalog-search__characteristics-note';
      note.textContent = 'Filtres de profil en attente de caractéristiques WOOD sourcées.';
      note.dataset.woodCharacteristicsEmpty = 'true';
      filterRoot.appendChild(note);
    }
    const activeRoot = document.createElement('div');
    activeRoot.className = 'wood-catalog-search__active';
    activeRoot.dataset.woodCatalogActiveFilters = 'true';
    activeRoot.setAttribute('aria-live', 'polite');
    filterRoot.appendChild(activeRoot);
    const filtersToggle = document.createElement('button');
    filtersToggle.type = 'button';
    filtersToggle.className = 'wood-catalog-search__filters-toggle';
    filtersToggle.textContent = 'Filtres';
    filtersToggle.setAttribute('aria-expanded', 'false');
    filtersToggle.setAttribute('aria-controls', 'wood-catalog-search-filters');
    const filtersPanel = document.createElement('div');
    filtersPanel.id = 'wood-catalog-search-filters';
    filtersPanel.className = 'wood-catalog-search__filters-panel';
    const applyFilters = document.createElement('button');
    applyFilters.type = 'button';
    applyFilters.className = 'wood-catalog-search__apply-filters';
    applyFilters.textContent = 'Appliquer les filtres';
    filterRoot.appendChild(applyFilters);
    filtersPanel.appendChild(filterRoot);
    const control = form.querySelector('.wood-catalog-search__control');
    control?.insertAdjacentElement('afterend', filtersToggle);
    filtersToggle.insertAdjacentElement('afterend', filtersPanel);

    const setFiltersOpen = (open, restoreFocus = false) => {
      filtersPanel.classList.toggle('is-open', open);
      filtersToggle.setAttribute('aria-expanded', String(open));
      if (open) {
        const firstFilter = filterRoot.querySelector('select, button');
        firstFilter?.focus();
      } else if (restoreFocus) {
        filtersToggle.focus();
      }
    };
    filtersToggle.addEventListener('click', () => {
      setFiltersOpen(filtersToggle.getAttribute('aria-expanded') !== 'true');
    });
    applyFilters.addEventListener('click', () => {
      apply();
      setFiltersOpen(false, true);
    });
    form.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || filtersToggle.getAttribute('aria-expanded') !== 'true') return;
      event.preventDefault();
      setFiltersOpen(false, true);
    });

    const params = new URLSearchParams(global.location?.search || '');
    input.value = params.get('q') || '';
    sort.value = params.get('sort') === 'name' ? 'name' : 'wood';
    mediaFilter.value = ['demo', 'approved'].includes(params.get('media')) ? params.get('media') : '';
    stateFilter.value = ['available', 'incomplete'].includes(params.get('state')) ? params.get('state') : '';
    Object.entries(characteristicFilters).forEach(([key, select]) => {
      if (select) select.value = characteristicValues[key].includes(normalize(params.get(`characteristic-${key}`)))
        ? normalize(params.get(`characteristic-${key}`))
        : '';
    });

    const updateUrl = () => {
      if (!global.history?.replaceState || !global.location?.href) return;
      const url = new URL(global.location.href);
      if (input.value.trim()) url.searchParams.set('q', input.value.trim());
      else url.searchParams.delete('q');
      if (sort.value === 'name') url.searchParams.set('sort', 'name');
      else url.searchParams.delete('sort');
      if (mediaFilter.value) url.searchParams.set('media', mediaFilter.value);
      else url.searchParams.delete('media');
      if (stateFilter.value) url.searchParams.set('state', stateFilter.value);
      else url.searchParams.delete('state');
      Object.entries(characteristicFilters).forEach(([key, select]) => {
        const param = `characteristic-${key}`;
        if (select?.value) url.searchParams.set(param, select.value);
        else url.searchParams.delete(param);
      });
      global.history.replaceState({}, '', url);
    };

    const renderActiveFilters = () => {
      activeRoot.replaceChildren();
      const values = [
        [mediaFilter, { demo: 'Illustration démo', approved: 'Photo approuvée' }],
        [stateFilter, { available: 'Consultable', incomplete: 'À compléter' }],
        ...Object.entries(characteristicFilters).filter(([, select]) => select).map(([key, select]) => [select, Object.fromEntries(characteristicValues[key].map((value) => [value, value]))]),
      ];
      values.forEach(([select, labels]) => {
        if (!select.value) return;
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'wood-catalog-search__chip';
        chip.textContent = `${labels[select.value]} ×`;
        chip.setAttribute('aria-label', `Retirer le filtre ${labels[select.value]}`);
        chip.addEventListener('click', () => { select.value = ''; apply(); });
        activeRoot.appendChild(chip);
      });
      if (activeRoot.childElementCount) {
        const clear = document.createElement('button');
        clear.type = 'button';
        clear.className = 'wood-catalog-search__clear-filters';
        clear.textContent = 'Tout effacer';
        clear.addEventListener('click', () => { mediaFilter.value = ''; stateFilter.value = ''; apply(); });
        activeRoot.appendChild(clear);
      }
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
      const filters = {
        media: mediaFilter.value,
        state: stateFilter.value,
        characteristics: Object.fromEntries(Object.entries(characteristicFilters)
          .filter(([, select]) => select?.value)
          .map(([key, select]) => [key, select.value])),
      };
      const visible = filterCards(cards, query, filters);
      cards.forEach((card) => {
        const visibleCard = visible.includes(card);
        card.hidden = !visibleCard;
      });
      renderActiveFilters();
      if (!tokens(query).length && !filters.media && !filters.state && !Object.keys(filters.characteristics).length) {
        status.textContent = `${cards.length} référence${cards.length > 1 ? 's' : ''} dans cet univers.`;
      } else if (!visible.length) {
        status.textContent = `Aucune référence ne correspond à cette recherche et à ces filtres. Effacez un filtre ou explorez un autre univers.`;
      } else {
        const suffix = query.trim() ? ` pour « ${query.trim()} »` : '';
        status.textContent = `${visible.length} référence${visible.length > 1 ? 's' : ''} trouvée${visible.length > 1 ? 's' : ''}${suffix}.`;
      }
      if (shouldUpdateUrl) updateUrl();
    };

    input.addEventListener('input', apply);
    sort.addEventListener('change', apply);
    mediaFilter.addEventListener('change', apply);
    stateFilter.addEventListener('change', apply);
    Object.values(characteristicFilters).forEach((select) => select?.addEventListener('change', apply));
    form.addEventListener('reset', () => global.requestAnimationFrame(apply));
    document.addEventListener('wood:catalog-rendered', () => apply(false));
    apply(false);
  }

  const api = { normalize, tokens, matches, stateFor, readCharacteristics, collectCharacteristicValues, matchesFilters, filterCards };
  global.WoodCatalogSearch = api;
  if (global.document) {
    if (global.document.readyState === 'loading') global.document.addEventListener('DOMContentLoaded', () => init(global.document), { once: true });
    else init(global.document);
  }
}(window));
