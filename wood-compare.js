(() => {
  const maxItems = 3;
  const selected = new Set();
  let dialog;
  let lastTrigger;

  const catalog = () => document.querySelector('main[data-catalog-category]:not([data-catalog-category="fleurs-detail"])');
  const cards = () => [...(catalog()?.querySelectorAll('.product-card[data-product-id]') || [])];
  const cardFor = id => cards().find(card => card.dataset.productId === id);
  const product = card => ({
    id: card.dataset.productId,
    name: card.dataset.productName || card.querySelector('h3')?.textContent?.trim() || 'Référence WOOD',
    category: card.dataset.productCategory || 'Univers WOOD',
    profile: card.querySelector('.product-index')?.textContent?.trim() || 'Profil à confirmer',
    availability: card.querySelector('.product-status')?.textContent?.trim() || 'Disponibilité à confirmer',
    price: card.querySelector('[data-product-price-label], .product-status')?.textContent?.trim() || 'Prix à confirmer',
  });
  const announce = message => {
    let status = document.querySelector('[data-wood-compare-status]');
    if (!status) {
      status = document.createElement('p');
      status.className = 'wood-compare-status';
      status.dataset.woodCompareStatus = 'true';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      document.body.appendChild(status);
    }
    status.textContent = message;
  };
  const updateUrl = () => {
    const url = new URL(window.location.href);
    if (selected.size) url.searchParams.set('compare', [...selected].join(','));
    else url.searchParams.delete('compare');
    window.history?.replaceState?.({}, '', url);
  };
  const renderDialog = () => {
    const items = [...selected].map(cardFor).filter(Boolean).map(product);
    const content = dialog.querySelector('[data-wood-compare-content]');
    content.replaceChildren();
    const heading = document.createElement('div');
    heading.className = 'wood-compare__heading';
    const title = document.createElement('h2');
    title.id = 'woodCompareTitle';
    title.textContent = 'COMPARER SANS SE PERDRE.';
    const note = document.createElement('p');
    note.textContent = 'Les lignes reprennent uniquement les informations visibles dans la démo.';
    heading.append(title, note);
    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.textContent = 'Comparaison de références WOOD';
    table.appendChild(caption);
    const head = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.appendChild(document.createElement('th'));
    items.forEach(item => { const cell = document.createElement('th'); cell.scope = 'col'; cell.textContent = item.name; headRow.appendChild(cell); });
    head.appendChild(headRow);
    table.appendChild(head);
    const body = document.createElement('tbody');
    [['Univers', 'category'], ['Profil affiché', 'profile'], ['Disponibilité', 'availability'], ['Prix affiché', 'price']].forEach(([label, key]) => {
      const row = document.createElement('tr');
      const labelCell = document.createElement('th');
      labelCell.scope = 'row';
      labelCell.textContent = label;
      row.appendChild(labelCell);
      items.forEach(item => { const cell = document.createElement('td'); cell.textContent = item[key] || 'À confirmer'; row.appendChild(cell); });
      body.appendChild(row);
    });
    table.appendChild(body);
    const actions = document.createElement('div');
    actions.className = 'wood-compare__actions';
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'btn secondary';
    copy.textContent = 'Copier le lien';
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(window.location.href); announce('Lien de comparaison copié.'); }
      catch { announce('Le lien reste disponible dans la barre d’adresse.'); }
    });
    actions.appendChild(copy);
    content.append(heading, table, actions);
  };
  const ensureDialog = () => {
    if (dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.className = 'wood-compare-dialog';
    dialog.setAttribute('aria-labelledby', 'woodCompareTitle');
    dialog.innerHTML = '<div class="wood-compare-dialog__top"><span class="kicker">Comparateur WOOD</span><button type="button" data-wood-compare-close aria-label="Fermer la comparaison">×</button></div><div data-wood-compare-content></div>';
    document.body.appendChild(dialog);
    dialog.querySelector('[data-wood-compare-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => queueMicrotask(() => lastTrigger?.focus({ preventScroll: true })));
    return dialog;
  };
  const open = trigger => {
    dialog = ensureDialog();
    lastTrigger = trigger;
    renderDialog();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };
  const renderToolbar = () => {
    const root = catalog();
    if (!root) return;
    let toolbar = root.querySelector('[data-wood-compare-toolbar]');
    if (!toolbar) {
      toolbar = document.createElement('section');
      toolbar.className = 'wood-compare-toolbar';
      toolbar.dataset.woodCompareToolbar = 'true';
      toolbar.setAttribute('aria-labelledby', 'woodCompareToolbarTitle');
      const title = document.createElement('h2');
      title.id = 'woodCompareToolbarTitle';
      title.textContent = 'Comparer des références';
      const count = document.createElement('span');
      count.dataset.woodCompareCount = 'true';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn primary';
      button.dataset.woodCompareOpen = 'true';
      button.textContent = 'Comparer';
      button.addEventListener('click', () => open(button));
      const clear = document.createElement('button');
      clear.type = 'button';
      clear.className = 'wood-compare-toolbar__clear';
      clear.textContent = 'Effacer';
      clear.addEventListener('click', () => { selected.clear(); updateUrl(); wire(); announce('Comparaison effacée.'); });
      toolbar.append(title, count, button, clear);
      const search = root.querySelector('[data-wood-catalog-search]');
      search?.insertAdjacentElement('afterend', toolbar);
    }
    const count = toolbar.querySelector('[data-wood-compare-count]');
    const openButton = toolbar.querySelector('[data-wood-compare-open]');
    if (count) count.textContent = selected.size ? `${selected.size} / ${maxItems} sélectionnée${selected.size > 1 ? 's' : ''}` : 'Choisis 2 à 3 références.';
    if (openButton) openButton.disabled = selected.size < 2;
    toolbar.hidden = false;
  };
  const toggle = (card, button) => {
    const id = card.dataset.productId;
    if (!id) return;
    if (selected.has(id)) { selected.delete(id); announce('Référence retirée de la comparaison.'); }
    else if (selected.size >= maxItems) { announce('La comparaison accepte au maximum trois références.'); return; }
    else { selected.add(id); announce(`${card.dataset.productName || 'Référence'} ajoutée à la comparaison.`); }
    updateUrl();
    wire();
    button.setAttribute('aria-pressed', String(selected.has(id)));
  };
  function wire() {
    cards().forEach(card => {
      if (card.querySelector('[data-wood-compare-toggle]')) {
        const existing = card.querySelector('[data-wood-compare-toggle]');
        existing.setAttribute('aria-pressed', String(selected.has(card.dataset.productId)));
        existing.classList.toggle('is-active', selected.has(card.dataset.productId));
        return;
      }
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'wood-compare-toggle';
      button.dataset.woodCompareToggle = 'true';
      button.textContent = 'Comparer';
      button.setAttribute('aria-pressed', String(selected.has(card.dataset.productId)));
      button.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); toggle(card, button); });
      const body = card.querySelector('.product-body');
      body?.appendChild(button);
    });
    renderToolbar();
  }
  function init() {
    const root = catalog();
    if (!root) return;
    const params = new URLSearchParams(window.location.search);
    params.get('compare')?.split(',').filter(Boolean).slice(0, maxItems).forEach(id => { if (cardFor(id)) selected.add(id); });
    wire();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
  document.addEventListener('wood:catalog-rendered', wire);
})();
