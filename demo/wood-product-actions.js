(() => {
  const FAVORITES_KEY = 'wood-favorites-v1';
  const STORE_LIST_KEY = 'wood-store-list-v1';
  const RECENT_KEY = 'wood-recent-v1';
  const MAX_RECENT = 8;

  const readJson = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value ?? fallback;
    } catch {
      return fallback;
    }
  };
  const readFavorites = () => {
    const value = readJson(FAVORITES_KEY, []);
    return Array.isArray(value) ? [...new Set(value.filter(item => typeof item === 'string' && item.trim()))] : [];
  };
  const writeFavorites = value => {
    try { localStorage.setItem(FAVORITES_KEY, JSON.stringify([...new Set(value)])); } catch {}
  };
  const readStoreList = () => {
    const value = readJson(STORE_LIST_KEY, []);
    return Array.isArray(value) ? [...new Set(value.filter(item => typeof item === 'string' && item.trim()))] : [];
  };
  const writeStoreList = value => {
    try { localStorage.setItem(STORE_LIST_KEY, JSON.stringify([...new Set(value)].slice(0, 12))); } catch {}
  };
  const readRecent = () => {
    const value = readJson(RECENT_KEY, []);
    return Array.isArray(value) ? value.filter(item => item && typeof item === 'object' && item.id && item.href).slice(0, MAX_RECENT) : [];
  };
  const writeRecent = value => {
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(value.slice(0, MAX_RECENT))); } catch {}
  };
  const productFromCard = card => ({
    id: String(card?.dataset?.productId || '').trim(),
    name: String(card?.dataset?.productName || card?.querySelector('h3')?.textContent || 'Référence WOOD').trim(),
    category: String(card?.dataset?.productCategory || 'WOOD').trim(),
    href: String(card?.dataset?.detailHref || card?.querySelector('a[href]')?.getAttribute('href') || '').trim(),
    image: card?.querySelector('.product-art img')?.getAttribute('src') || '',
  });
  const getStatus = () => {
    let status = document.querySelector('[data-wood-local-status]');
    if (!status) {
      status = document.createElement('p');
      status.className = 'wood-local-status';
      status.dataset.woodLocalStatus = 'true';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      document.body.appendChild(status);
    }
    return status;
  };
  const announce = message => { getStatus().textContent = message; };

  let lastPreviewTrigger = null;
  let previewDialog = null;
  function ensurePreviewDialog() {
    if (previewDialog) return previewDialog;
    previewDialog = document.createElement('dialog');
    previewDialog.className = 'wood-quick-preview';
    previewDialog.setAttribute('aria-labelledby', 'woodQuickPreviewTitle');
    previewDialog.innerHTML = '<div class="wood-quick-preview__top"><span class="kicker">Aperçu WOOD</span><button type="button" class="wood-quick-preview__close" data-wood-preview-close aria-label="Fermer l’aperçu">×</button></div><div data-wood-preview-content></div>';
    document.body.appendChild(previewDialog);
    previewDialog.querySelector('[data-wood-preview-close]').addEventListener('click', () => previewDialog.close());
    previewDialog.addEventListener('close', () => queueMicrotask(() => lastPreviewTrigger?.focus({ preventScroll: true })));
    return previewDialog;
  }
  function openPreview(card, trigger) {
    const dialog = ensurePreviewDialog();
    const product = productFromCard(card);
    if (!product.id || !product.href) return;
    lastPreviewTrigger = trigger;
    const content = dialog.querySelector('[data-wood-preview-content]');
    content.replaceChildren();
    const media = document.createElement('div');
    media.className = 'wood-quick-preview__media';
    const image = card.querySelector('.product-art img');
    if (image) {
      const clone = image.cloneNode(true);
      clone.removeAttribute('loading');
      media.appendChild(clone);
    } else {
      media.textContent = 'WOOD.';
    }
    const body = document.createElement('div');
    body.className = 'wood-quick-preview__body';
    const title = document.createElement('h2');
    title.id = 'woodQuickPreviewTitle';
    title.textContent = product.name;
    const category = document.createElement('p');
    category.className = 'wood-quick-preview__category';
    category.textContent = product.category;
    const description = document.createElement('p');
    description.textContent = card.querySelector('.product-body > p')?.textContent?.trim() || 'Présentation WOOD à découvrir.';
    const link = document.createElement('a');
    link.className = 'btn primary';
    link.href = product.href;
    link.textContent = 'Voir la fiche complète ↗';
    body.append(title, category, description, link);
    content.append(media, body);
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  function renderLocalCollection() {
    const main = document.querySelector('main[data-catalog-category]');
    if (!main || main.dataset.catalogCategory === 'fleurs-detail') return;
    let section = main.querySelector('[data-wood-local-collection]');
    if (!section) {
      section = document.createElement('section');
      section.className = 'wood-local-collection';
      section.dataset.woodLocalCollection = 'true';
      section.setAttribute('aria-labelledby', 'wood-local-collection-title');
      const anchor = main.querySelector('[data-wood-catalog-search]') || main.querySelector('.product-grid');
      anchor?.insertAdjacentElement('afterend', section);
    }
    const favorites = readFavorites();
    const storeList = readStoreList();
    const recent = readRecent();
    const stored = [...recent, ...favorites.map(id => ({ id, name: id, category: 'Favori WOOD', href: '' })), ...storeList.map(id => ({ id, name: id, category: 'À montrer en boutique', href: '' }))];
    const known = new Map(stored.map(item => [item.id, item]));
    main.querySelectorAll('.product-card[data-product-id]').forEach(card => {
      const product = productFromCard(card);
      if (known.has(product.id)) known.set(product.id, { ...known.get(product.id), ...product });
    });
    const items = [...known.values()].filter(item => item.href && (favorites.includes(item.id) || storeList.includes(item.id) || recent.some(recentItem => recentItem.id === item.id)));
    if (!items.length) { section.hidden = true; section.replaceChildren(); return; }
    section.hidden = false;
    section.replaceChildren();
    const heading = document.createElement('div');
    heading.className = 'wood-local-collection__heading';
    const title = document.createElement('h2');
    title.id = 'wood-local-collection-title';
    title.textContent = 'À RETROUVER CHEZ WOOD.';
    const actions = document.createElement('div');
    actions.className = 'wood-local-collection__actions';
    if (storeList.length) {
      const share = document.createElement('button');
      share.type = 'button';
      share.className = 'wood-local-collection__share';
      share.textContent = 'Partager ma liste';
      share.addEventListener('click', async () => {
        const url = new URL(window.location.href);
        url.searchParams.set('liste', storeList.join(','));
        try {
          if (typeof navigator.share === 'function') await navigator.share({ title: 'Ma liste WOOD', text: 'Les références que je veux montrer en boutique.', url: url.href });
          else await navigator.clipboard.writeText(url.href);
          announce('Lien de ta liste boutique prêt à partager.');
        } catch { announce('Le lien de ta liste reste disponible dans la barre d’adresse.'); }
      });
      actions.appendChild(share);
    }
    const clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'wood-local-collection__clear';
    clear.textContent = 'Effacer mes repères';
    clear.addEventListener('click', () => { writeFavorites([]); writeStoreList([]); writeRecent([]); renderLocalCollection(); announce('Tes repères locaux ont été effacés.'); });
    actions.appendChild(clear);
    heading.append(title, actions);
    const list = document.createElement('div');
    list.className = 'wood-local-collection__list';
    items.slice(0, 6).forEach(item => {
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.name;
      link.title = `${item.name} · ${item.category}`;
      list.appendChild(link);
    });
    section.append(heading, list);
  }

  function toggleStoreList(card, button) {
    const product = productFromCard(card);
    if (!product.id) return;
    const list = readStoreList();
    const index = list.indexOf(product.id);
    if (index >= 0) { list.splice(index, 1); announce(`${product.name} retiré de ta liste boutique.`); }
    else { list.unshift(product.id); announce(`${product.name} ajouté à ta liste à montrer en boutique.`); }
    writeStoreList(list);
    const active = readStoreList().includes(product.id);
    button.setAttribute('aria-pressed', String(active));
    button.classList.toggle('is-active', active);
    button.textContent = active ? 'Dans ma liste boutique' : 'À montrer en boutique';
    renderLocalCollection();
  }

  function toggleFavorite(card, button) {
    const product = productFromCard(card);
    if (!product.id) return;
    const favorites = readFavorites();
    const index = favorites.indexOf(product.id);
    if (index >= 0) { favorites.splice(index, 1); announce(`${product.name} retiré de tes favoris locaux.`); }
    else { favorites.unshift(product.id); announce(`${product.name} ajouté à tes favoris locaux.`); }
    writeFavorites(favorites);
    const active = favorites.includes(product.id);
    button.setAttribute('aria-pressed', String(active));
    button.classList.toggle('is-active', active);
    button.querySelector('[data-wood-favorite-label]').textContent = active ? 'Favori' : 'Ajouter aux favoris';
    renderLocalCollection();
  }

  function wireCard(card) {
    if (!card.dataset.productId) return;
    const product = productFromCard(card);
    const media = card.querySelector('.product-art') || card;
    let favorite = card.querySelector('[data-wood-favorite]');
    if (!favorite) {
      favorite = document.createElement('button');
      favorite.type = 'button';
      favorite.className = 'wood-card-favorite';
      favorite.dataset.woodFavorite = 'true';
      favorite.innerHTML = '<span aria-hidden="true">★</span><span data-wood-favorite-label>Ajouter aux favoris</span>';
      media.appendChild(favorite);
      favorite.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); toggleFavorite(card, favorite); });
    }
    const active = readFavorites().includes(product.id);
    favorite.setAttribute('aria-pressed', String(active));
    favorite.classList.toggle('is-active', active);
    favorite.querySelector('[data-wood-favorite-label]').textContent = active ? 'Favori' : 'Ajouter aux favoris';
    if (card.dataset.detailHref && !card.querySelector('[data-wood-preview]')) {
      const preview = document.createElement('button');
      preview.type = 'button';
      preview.className = 'wood-card-preview';
      preview.dataset.woodPreview = 'true';
      preview.textContent = 'Aperçu';
      const meta = card.querySelector('.product-meta');
      if (meta) meta.prepend(preview);
      else card.querySelector('.product-body')?.appendChild(preview);
      preview.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); openPreview(card, preview); });
    }
    let storeButton = card.querySelector('[data-wood-store-list]');
    if (!storeButton) {
      storeButton = document.createElement('button');
      storeButton.type = 'button';
      storeButton.className = 'wood-card-store-list';
      storeButton.dataset.woodStoreList = 'true';
      const body = card.querySelector('.product-body');
      body?.appendChild(storeButton);
      storeButton.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); toggleStoreList(card, storeButton); });
    }
    const inStoreList = readStoreList().includes(product.id);
    storeButton.setAttribute('aria-pressed', String(inStoreList));
    storeButton.classList.toggle('is-active', inStoreList);
    storeButton.textContent = inStoreList ? 'Dans ma liste boutique' : 'À montrer en boutique';
  }

  function recordDetail() {
    const card = document.querySelector('#flowerDetail .product-card, #productDetail .product-card');
    if (!card) return;
    const product = productFromCard(card);
    const href = `${window.location.pathname}${window.location.search}`;
    if (!product.id) return;
    const recent = [{ ...product, href }, ...readRecent().filter(item => item.id !== product.id)];
    writeRecent(recent);
    const copyTarget = card.closest('#flowerDetail, #productDetail')?.querySelector('.flower-detail__note, .product-detail__note');
    if (copyTarget && !copyTarget.parentElement.querySelector('[data-wood-share]')) {
      const share = document.createElement('button');
      share.type = 'button';
      share.className = 'wood-share-button';
      share.dataset.woodShare = 'true';
      share.textContent = 'Partager la fiche ↗';
      const status = document.createElement('span');
      status.className = 'wood-share-status';
      status.dataset.woodShareStatus = 'true';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      copyTarget.insertAdjacentElement('afterend', share);
      share.insertAdjacentElement('afterend', status);
      const contact = document.createElement('a');
      contact.className = 'wood-product-contact-link';
      contact.href = `contact.html?produit=${encodeURIComponent(product.name)}`;
      contact.textContent = 'Poser une question sur cette référence ↗';
      status.insertAdjacentElement('afterend', contact);
      const stores = document.createElement('div');
      stores.className = 'wood-detail-stores';
      stores.innerHTML = '<strong>Voir en boutique</strong><span>Choisis l’adresse qui t’arrange.</span><div><a href="https://www.google.com/maps/dir/?api=1&destination=7+Rue+Barla%2C+06300+Nice" target="_blank" rel="noopener noreferrer">Barla · itinéraire ↗</a><a href="https://www.google.com/maps/dir/?api=1&destination=16+Avenue+Borriglione%2C+06100+Nice" target="_blank" rel="noopener noreferrer">Borriglione · itinéraire ↗</a></div>';
      contact.insertAdjacentElement('afterend', stores);
      share.addEventListener('click', async () => {
        const url = window.location.href;
        try {
          if (typeof navigator.share === 'function') { await navigator.share({ title: product.name, text: `${product.name} · WOOD`, url }); status.textContent = 'Fiche prête à partager.'; return; }
          await navigator.clipboard.writeText(url);
          status.textContent = 'Lien copié. À toi de jouer.';
        } catch { status.textContent = 'Le lien est prêt dans la barre d’adresse.'; }
      });
    }
  }

  function wireAll() {
    const params = new URLSearchParams(window.location.search);
    const imported = params.get('liste')?.split(',').filter(Boolean).slice(0, 12) || [];
    if (imported.length) writeStoreList([...readStoreList(), ...imported]);
    document.querySelectorAll('main[data-catalog-category] .product-card[data-product-id]').forEach(wireCard);
    recordDetail();
    renderLocalCollection();
  }

  window.WoodProductActions = Object.freeze({ readFavorites, readRecent, readStoreList });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wireAll, { once: true });
  else wireAll();
  document.addEventListener('wood:catalog-rendered', wireAll);
  document.addEventListener('wood:detail-rendered', wireAll);
})();
