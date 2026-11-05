(() => {
  const STORAGE_KEY = 'wood-cart-v1';
  const ORDER_MODE_KEY = 'wood-order-mode-v1';
  const MAX_CART_QUANTITY = 99;
  const escapeHtml = value => String(value ?? '').replace(/[&<>\"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const normalizeCartItem = item => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
    const id = typeof item.id === 'string' ? item.id.trim() : '';
    const productId = typeof item.productId === 'string' ? item.productId.trim() : '';
    const name = typeof item.name === 'string' ? item.name.trim() : '';
    const quantity = Number.isInteger(item.quantity) ? item.quantity : Number.parseInt(item.quantity, 10);
    if (!id || !productId || !name || !Number.isInteger(quantity) || quantity < 1) return null;
    const rawPrice = item.price === '' || item.price === null || item.price === undefined ? '' : Number(item.price);
    if (rawPrice !== '' && (!Number.isFinite(rawPrice) || rawPrice < 0)) return null;
    return {
      id,
      productId,
      name,
      category: typeof item.category === 'string' ? item.category.trim() : 'WOOD Shop',
      price: rawPrice === '' ? '' : String(rawPrice),
      weight: typeof item.weight === 'string' ? item.weight.trim() : '',
      quantity: Math.min(MAX_CART_QUANTITY, quantity),
    };
  };
  const normalizeCart = value => Array.isArray(value) ? value.map(normalizeCartItem).filter(Boolean) : [];
  const readCart = () => {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const normalized = normalizeCart(value);
      if (JSON.stringify(value) !== JSON.stringify(normalized)) localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      return normalized;
    } catch {
      return [];
    }
  };
  const writeCart = (cart) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeCart(cart))); } catch {}
  };
  let cart = readCart();
  const priceLabel = (item) => item.price ? `${Number(item.price).toFixed(2).replace('.', ',')} €` : 'Prix à confirmer';
  const totalLabel = () => {
    if (!cart.length || cart.some(item => !item.price)) return 'À confirmer';
    return `${cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0).toFixed(2).replace('.', ',')} €`;
  };
  const cartCount = () => cart.reduce((sum, item) => sum + (Number.isInteger(item.quantity) ? item.quantity : 0), 0);
  const calculateFlowerPrice = (grams, tiers) => window.WoodFlowerPricing?.calculateFlowerPrice?.(grams, tiers) || { price: '', breakdown: [] };
  const getFlowerPriceForOrder = (grams, tiers) => window.WoodFlowerPricing?.getFlowerPriceForOrder?.(grams, tiers) || { price: '', breakdown: [] };
  const maxFlowerGrams = 50;
  const hasBackendCatalog = Boolean(window.WOOD_SUPABASE_CONFIG?.url && window.WOOD_SUPABASE_CONFIG?.publishableKey);
  const getOrderMode = id => window.WoodOrderOptions?.getOrderMode?.(id) || null;
  const readOrderMode = () => {
    try {
      const id = localStorage.getItem(ORDER_MODE_KEY) || '';
      return getOrderMode(id) ? id : '';
    } catch { return ''; }
  };
  const writeOrderMode = id => {
    try { localStorage.setItem(ORDER_MODE_KEY, id); } catch {}
  };
  const readFlowerTiers = control => {
    try { return JSON.parse(control?.dataset.tiers || '[]'); } catch { return []; }
  };
  let lastCartTrigger = null;
  let lastMenuTrigger = null;

  function ensureCartPanel() {
    if (document.getElementById('cartPanel')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div class="cart-backdrop" data-cart-close></div>
      <aside class="cart-panel" id="cartPanel" role="dialog" aria-modal="true" aria-labelledby="cartTitle" aria-hidden="true" tabindex="-1">
        <div class="cart-panel__header"><h2 id="cartTitle">Votre sélection</h2><button class="cart-close" type="button" data-cart-close aria-label="Fermer le panier">×</button></div>
        <div class="cart-items" id="cartItems"></div>
        <div class="cart-summary"><span>Total</span><strong id="cartTotal">À confirmer</strong></div>
        <p class="cart-caption">Les prix sont vérifiés côté serveur. Le paiement Viva.com sera activé séparément.</p>
        <a class="cart-checkout" id="cartCheckout" href="checkout.html">Voir le récapitulatif</a>
      </aside>`);
  }

  function renderCart() {
    const count = document.getElementById('cartCount');
    const items = document.getElementById('cartItems');
    const total = document.getElementById('cartTotal');
    const checkout = document.getElementById('cartCheckout');
    if (count) count.textContent = String(cartCount());
    if (total) total.textContent = totalLabel();
    if (checkout) {
      const empty = cart.length === 0;
      checkout.classList.toggle('is-disabled', empty);
      checkout.setAttribute('aria-disabled', String(empty));
      checkout.tabIndex = empty ? -1 : 0;
    }
    if (!items) return;
    if (!cart.length) {
      items.innerHTML = '<p class="cart-empty">Votre sélection est vide. Ajoutez une référence depuis une page de la boutique pour préparer votre commande.</p>';
      return;
    }
    items.innerHTML = cart.map(item => `
      <div class="cart-item" data-item-id="${item.id}">
        <div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.category || 'WOOD Shop')} · ${escapeHtml(priceLabel(item))}</p><div class="cart-item__actions"><button class="cart-qty" type="button" data-qty="minus" aria-label="Retirer une unité">−</button><span class="cart-item__count">${item.quantity}</span><button class="cart-qty" type="button" data-qty="plus" aria-label="Ajouter une unité">+</button><button class="cart-qty" type="button" data-remove aria-label="Supprimer la référence">×</button></div></div>
        <div class="cart-item__price">${escapeHtml(priceLabel(item))}</div>
      </div>`).join('');
  }

  function setCartOpen(open) {
    const panel = document.getElementById('cartPanel');
    const backdrop = document.querySelector('.cart-backdrop');
    const trigger = document.getElementById('cartTrigger');
    if (!panel || !backdrop) return;
    const wasOpen = panel.classList.contains('is-open');
    panel.classList.toggle('is-open', open); backdrop.classList.toggle('is-open', open); panel.setAttribute('aria-hidden', String(!open));
    if (trigger) trigger.setAttribute('aria-expanded', String(open));
    if (open) {
      lastCartTrigger = trigger;
      queueMicrotask(() => panel.focus({ preventScroll: true }));
    } else if (wasOpen) {
      queueMicrotask(() => lastCartTrigger?.focus({ preventScroll: true }));
    }
  }

  function openFlowerDetail(card) {
    const href = card?.dataset.detailHref;
    if (!href) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      window.location.href = href;
      return;
    }
    const rect = card.getBoundingClientRect();
    const isCompact = window.innerWidth <= 500;
    const target = isCompact
      ? { left: window.innerWidth * 0.02, top: window.innerHeight * 0.04, width: window.innerWidth * 0.96, height: window.innerHeight * 0.92 }
      : { left: window.innerWidth * 0.05, top: window.innerHeight * 0.06, width: window.innerWidth * 0.90, height: window.innerHeight * 0.88 };
    const clone = card.cloneNode(true);
    clone.classList.add('product-zoom-clone');
    clone.setAttribute('aria-hidden', 'true');
    clone.removeAttribute('tabindex');
    clone.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    clone.querySelectorAll('[for]').forEach(element => element.removeAttribute('for'));
    clone.style.setProperty('--zoom-to-left', `${target.left}px`);
    clone.style.setProperty('--zoom-to-top', `${target.top}px`);
    clone.style.setProperty('--zoom-to-width', `${target.width}px`);
    clone.style.setProperty('--zoom-to-height', `${target.height}px`);
    clone.style.setProperty('--zoom-from-x', `${rect.left - target.left}px`);
    clone.style.setProperty('--zoom-from-y', `${rect.top - target.top}px`);
    clone.style.setProperty('--zoom-from-scale-x', `${rect.width / target.width}`);
    clone.style.setProperty('--zoom-from-scale-y', `${rect.height / target.height}`);
    document.body.appendChild(clone);
    // Commit the first frame at the exact card position before starting the transition.
    void clone.offsetWidth;
    requestAnimationFrame(() => clone.classList.add('is-active'));
    window.setTimeout(() => { window.location.href = href; }, 360);
  }

  function wireFlowerCard(card) {
    if (card.dataset.detailWired === 'true') return;
    const productId = card.dataset.productId;
    if (!productId) return;
    const productSlug = card.dataset.productSlug || productId;
    card.dataset.detailHref = `fleur.html?produit=${encodeURIComponent(productSlug)}`;
    card.dataset.detailWired = 'true';
    card.classList.add('product-card--navigable');
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Voir la fiche de ${card.dataset.productName || 'la fleur'}`);
  }

  function enhanceFlowerCards() {
    const flowerPage = document.querySelector('main[data-catalog-category^="fleurs"]');
    const flowerListing = document.querySelector('main[data-catalog-category="fleurs"]');
    if (flowerPage) {
      flowerPage.querySelectorAll('.product-card').forEach(card => {
        if (flowerListing) wireFlowerCard(card);
        const presentation = window.WoodFlowerPresentation?.get(card.dataset.productId);
        if (presentation) {
          const image = card.querySelector('.product-art img');
          const cardDescription = card.querySelector('.product-body > p');
          if (image) {
            image.src = presentation.image;
            image.alt = `Photo de démonstration de ${presentation.name} sous cloche`;
          }
          if (cardDescription) cardDescription.textContent = presentation.demoDescription;
        }
        const index = card.querySelector('.product-index');
        const description = card.querySelector('.product-body > p');
        const category = index?.textContent || '';
        if (index && description) {
          if (category.includes('STRONG')) {
            index.textContent = category.replace('STRONG', 'CBD BOOSTÉ (STRONG)');
            if (!presentation) description.textContent = 'CBD Boosté (strong). Choisissez le grammage souhaité.';
          } else if (category.includes('MEDIUM')) {
            index.textContent = category.replace('MEDIUM', 'CBD SOFT (MEDIUM)');
            if (!presentation) description.textContent = 'CBD Soft (medium). Choisissez le grammage souhaité.';
          } else if (category.includes('FLEURS CBD')) {
            index.textContent = category.replace('FLEURS CBD', 'CBD CLASSIQUE');
            if (!presentation) description.textContent = 'CBD classique. Choisissez le grammage souhaité.';
          }
        }

        const choice = card.querySelector('.product-choice');
        const meta = card.querySelector('.product-meta');
        const select = choice?.querySelector('[data-product-weight]');
        const price = meta?.querySelector('[data-product-price-label]');
        const button = meta?.querySelector('.add-to-cart');
        if (!choice || !meta || !select || !price || !button || choice.dataset.enhanced === 'true') return;
        const tiers = Array.from(select.options).map(option => ({
          grams: Number.parseInt(option.value, 10),
          price: Number(option.dataset.price || 0),
        })).filter(tier => tier.grams > 0 && Number.isFinite(tier.price));
        const initialGrams = Number.parseInt(select.value, 10) || 1;
        const control = document.createElement('div');
        control.className = 'product-gram-control';
        control.dataset.productGramControl = 'true';
        control.dataset.grams = String(initialGrams);
        control.dataset.tiers = JSON.stringify(tiers);
        control.setAttribute('role', 'group');
        control.setAttribute('aria-label', `Choisir le grammage de ${card.dataset.productName}`);
        control.innerHTML = `<button type="button" class="gram-step" data-gram-step="-1" aria-label="Diminuer le grammage">−</button><output class="gram-value" data-gram-value aria-live="polite">${initialGrams} g</output><button type="button" class="gram-step" data-gram-step="1" aria-label="Augmenter le grammage">+</button>`;
        const row = document.createElement('div');
        row.className = 'product-buy-row';
        row.append(control, price, button);
        choice.replaceChildren(row);
        choice.dataset.enhanced = 'true';
        meta.remove();
      });
    }
  }

  function selectedVariant(card) {
    const control = card.querySelector('[data-product-gram-control]');
    if (control) {
      const grams = Math.max(1, Number.parseInt(control.dataset.grams, 10) || 1);
      const pricing = getFlowerPriceForOrder(grams, readFlowerTiers(control));
      const label = `${grams} g`;
      return { id: `${card.dataset.productId}:${grams}g`, name: `${card.dataset.productName} · ${label}`, price: pricing.price === '' ? '' : String(pricing.price), label };
    }
    const select = card.querySelector('[data-product-weight]');
    if (!select) return { id: card.dataset.productId, name: card.dataset.productName, price: card.dataset.productPrice || '', label: '' };
    const option = select.options[select.selectedIndex];
    const label = option.dataset.label || option.textContent.split('·')[0].trim();
    return { id: `${card.dataset.productId}:${option.value}`, name: `${card.dataset.productName} · ${label}`, price: option.dataset.price || '', label };
  }

  function updateProductPrice(select) {
    const card = select.closest('.product-card');
    const label = card?.querySelector('[data-product-price-label]');
    if (select.matches('[data-product-gram-control]')) {
      const grams = Math.max(1, Number.parseInt(select.dataset.grams, 10) || 1);
      const pricing = getFlowerPriceForOrder(grams, readFlowerTiers(select));
      const card = select.closest('.product-card');
      const button = card?.querySelector('.add-to-cart');
      const orderable = pricing.price !== '';
      if (label) label.textContent = `${grams} g · ${orderable ? priceLabel({ price: pricing.price }) : 'Tarif à confirmer'}`;
      if (button && card?.dataset.productUnavailable !== 'true') {
        button.disabled = !orderable;
        button.setAttribute('aria-disabled', String(!orderable));
        if (orderable) button.removeAttribute('data-gram-unavailable');
        else button.setAttribute('data-gram-unavailable', 'true');
      }
      const minus = select.querySelector('[data-gram-step="-1"]');
      if (minus) minus.disabled = grams <= 1;
        const plus = select.querySelector('[data-gram-step="1"]');
        if (plus) plus.disabled = grams >= maxFlowerGrams;
      const output = select.querySelector('[data-gram-value]');
      if (output) output.textContent = `${grams} g`;
      return;
    }
    const option = select.options[select.selectedIndex];
    if (label && option) label.textContent = `${option.dataset.label || option.textContent} · ${priceLabel({ price: option.dataset.price || '' })}`;
  }

  function markFallbackCatalogUnavailable() {
    if (!hasBackendCatalog) return;
    document.querySelectorAll('main[data-catalog-category] .product-card').forEach(card => {
      const button = card.querySelector('.add-to-cart');
      if (!button || card.dataset.productUnavailable === 'true') return;
      card.dataset.productUnavailable = 'true';
      button.disabled = true;
      button.setAttribute('aria-disabled', 'true');
      button.setAttribute('data-product-unavailable', 'true');
      button.dataset.productUnavailable = 'true';
      button.textContent = 'Indisponible';
    });
  }

  function addProduct(card, button) {
    if (!card || button?.disabled || card.dataset.productUnavailable === 'true' || button?.dataset.productUnavailable !== undefined) return;
    const now = globalThis.performance?.now?.() || Date.now();
    const lastAddAt = Number(button?.dataset.lastAddAt || 0);
    if (button && lastAddAt > 0 && now - lastAddAt < 450) return;
    if (button) button.dataset.lastAddAt = String(now);
    const variant = selectedVariant(card);
    if (!variant.price) return;
    const existing = cart.find(item => item.id === variant.id);
    const item = { id: variant.id, productId: card.dataset.productId, name: variant.name, category: card.dataset.productCategory, price: variant.price, weight: variant.label, quantity: Math.min(MAX_CART_QUANTITY, existing ? existing.quantity + 1 : 1) };
    cart = existing ? cart.map(entry => entry.id === variant.id ? item : entry) : [...cart, item];
    writeCart(cart); renderCart(); setCartOpen(true);
  }

  function updateQuantity(id, delta) {
    cart = normalizeCart(cart.map(item => item.id === id ? {...item, quantity: item.quantity + delta} : item));
    writeCart(cart); renderCart();
  }

  function updateOrderModeUI(id) {
    const mode = getOrderMode(id);
    document.querySelectorAll('[data-order-mode-card]').forEach(card => card.classList.toggle('is-selected', card.dataset.orderModeCard === id));
    const summary = document.getElementById('orderModeSummary');
    if (summary) summary.textContent = mode ? `Mode choisi : ${mode.label}${mode.address ? ` · ${mode.address}` : ''}` : 'Livraison à domicile.';
    const payment = document.getElementById('prepareViva');
    const createOrderButton = document.getElementById('createOrderButton') || payment;
    if (createOrderButton) createOrderButton.disabled = !mode || cart.length === 0;
    const addressField = document.getElementById('deliveryAddressField');
    const address = document.getElementById('orderAddress');
    if (addressField) addressField.classList.toggle('hidden', id !== 'delivery');
    if (address) address.required = id === 'delivery';
  }

  function renderOrderModes() {
    const container = document.getElementById('orderModes');
    const modes = window.WoodOrderOptions?.getOrderModes?.();
    if (!container || !modes) return;
    const savedMode = readOrderMode();
    const selected = getOrderMode(savedMode) ? savedMode : modes[0]?.id;
    if (selected && selected !== savedMode) writeOrderMode(selected);
    container.innerHTML = modes.map(mode => `<div class="order-mode-card" data-order-mode-card="${mode.id}"><label class="order-mode-select"><input type="radio" name="orderMode" value="${mode.id}"${selected === mode.id ? ' checked' : ''}><span><strong>${mode.label}</strong><span>${mode.description}</span></span></label>${mode.address ? `<div class="order-mode-details"><span>${mode.address}<br>${mode.phone}</span><span class="order-mode-actions"><a href="${mode.routeHref}" target="_blank" rel="noopener noreferrer">Itinéraire ↗</a><a href="${mode.phoneHref}">Appeler ↗</a></span></div>` : ''}</div>`).join('');
    container.querySelectorAll('input[name="orderMode"]').forEach(input => input.addEventListener('change', () => {
      if (!input.checked) return;
      writeOrderMode(input.value);
      updateOrderModeUI(input.value);
    }));
    updateOrderModeUI(selected);
  }

  function initCart() {
    const trigger = document.getElementById('cartTrigger');
    if (!trigger) return;
    const purchaseNotice = window.WoodOrderOptions?.getPurchaseNotice?.();
    if (purchaseNotice) document.querySelectorAll('[data-purchase-notice]').forEach(node => { node.textContent = purchaseNotice; });
    const refreshCatalogEnhancements = () => {
      enhanceFlowerCards();
      document.querySelectorAll('[data-product-weight], [data-product-gram-control]').forEach(updateProductPrice);
    };
    window.WoodShopRefreshCatalog = refreshCatalogEnhancements;
    document.addEventListener('wood:catalog-rendered', refreshCatalogEnhancements);
    markFallbackCatalogUnavailable();
    refreshCatalogEnhancements();
    ensureCartPanel(); renderCart();
    window.addEventListener('storage', event => {
      if (event.key !== STORAGE_KEY) return;
      cart = readCart();
      renderCart();
    });
    trigger.addEventListener('click', () => setCartOpen(!document.getElementById('cartPanel').classList.contains('is-open')));
    document.addEventListener('click', event => {
      const step = event.target.closest('[data-gram-step]');
      if (step) {
        const control = step.closest('[data-product-gram-control]');
        if (!control) return;
        const current = Number.parseInt(control.dataset.grams, 10) || 1;
          const next = Math.min(maxFlowerGrams, Math.max(1, current + (Number.parseInt(step.dataset.gramStep, 10) || 0)));
        if (next !== current) {
          control.dataset.grams = String(next);
          updateProductPrice(control);
        }
        return;
      }
      const detailCard = event.target.closest('.product-card[data-detail-href]');
      if (detailCard && !event.target.closest('button, select, a, input, textarea, [data-gram-step]')) {
        openFlowerDetail(detailCard);
        return;
      }
      const close = event.target.closest('[data-cart-close]');
      if (close) setCartOpen(false);
      const button = event.target.closest('.add-to-cart');
      if (button) addProduct(button.closest('.product-card'), button);
      const qty = event.target.closest('.cart-qty');
      if (qty) {
        const item = qty.closest('.cart-item');
        if (item?.dataset.itemId) updateQuantity(item.dataset.itemId, qty.dataset.remove !== undefined ? -999 : (qty.dataset.qty === 'plus' ? 1 : -1));
      }
    });
    document.addEventListener('change', event => {
      const weight = event.target.closest('[data-product-weight]');
      if (weight) updateProductPrice(weight);
    });
    document.addEventListener('keydown', event => {
      const panel = document.getElementById('cartPanel');
      if (event.key === 'Escape') {
        setCartOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !panel?.classList.contains('is-open')) return;
      const focusable = [...panel.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) {
        event.preventDefault();
        panel.focus({ preventScroll: true });
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    });
    document.addEventListener('keydown', event => {
      const detailCard = event.target.closest('.product-card[data-detail-href]');
      if (!detailCard || event.target !== detailCard || !['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      openFlowerDetail(detailCard);
    });
  }

  function initCheckout() {
    const list = document.getElementById('checkoutItems');
    if (!list) return;
    if (!cart.length) {
      list.innerHTML = '<p class="cart-empty">Aucune référence n’a encore été ajoutée.</p>';
    } else {
      list.innerHTML = cart.map(item => `<div class="checkout-line"><div><h3>${escapeHtml(item.name)}</h3><span>${escapeHtml(item.category || 'WOOD Shop')} · quantité ${item.quantity}</span></div><strong>${escapeHtml(priceLabel(item))}</strong></div>`).join('');
    }
    const total = document.getElementById('checkoutTotal'); if (total) total.textContent = totalLabel();
    renderOrderModes();
    const message = document.getElementById('checkoutMessage');
    document.querySelectorAll('[data-checkout-mode]').forEach(choice => choice.addEventListener('click', () => {
      if (!message) return;
      message.textContent = choice.dataset.checkoutMode === 'guest' ? 'Tu peux enregistrer ta commande en invité avec ton e-mail.' : 'Le compte client est sécurisé par Supabase et permet de retrouver tes commandes.';
      message.classList.remove('hidden');
    }));
    document.getElementById('createOrderButton')?.addEventListener('click', async () => {
      if (!message) return;
      const mode = getOrderMode(readOrderMode());
      if (!mode) {
        message.textContent = 'La livraison est nécessaire pour enregistrer la commande.';
        message.classList.remove('hidden');
        return;
      }
      const contactForm = document.getElementById('orderContactForm');
      if (contactForm && !contactForm.reportValidity()) return;
      if (!cart.length) {
        message.textContent = 'Ajoute au moins un produit avant d’enregistrer la commande.';
        message.classList.remove('hidden');
        return;
      }
      const button = document.getElementById('createOrderButton');
      button.disabled = true;
      button.textContent = 'Enregistrement…';
      message.textContent = 'Vérification des produits et enregistrement sécurisé…';
      message.classList.remove('hidden');
      try {
        const order = await window.WoodOrderApi?.createPendingOrder({
          customer_email: document.getElementById('orderEmail')?.value.trim(),
          customer_name: document.getElementById('orderName')?.value.trim(),
          customer_phone: document.getElementById('orderPhone')?.value.trim(),
          delivery_address: document.getElementById('orderAddress')?.value.trim(),
          fulfillment_mode: mode.id,
          items: cart.map(item => ({ product_id: item.productId, grams: Number.parseInt(item.weight, 10) || 1, quantity: item.quantity }))
        });
        if (!order) throw new Error('Le service de commande est indisponible.');
        localStorage.setItem('wood-last-order-v1', JSON.stringify({ ...order, customer_email: document.getElementById('orderEmail')?.value.trim(), customer_name: document.getElementById('orderName')?.value.trim(), items: cart }));
        localStorage.removeItem(STORAGE_KEY);
        window.location.href = 'confirmation.html';
      } catch (error) {
        message.textContent = error.message || 'Impossible d’enregistrer la commande.';
        message.classList.add('is-error');
        button.disabled = false;
        button.textContent = 'Enregistrer la commande';
      }
    });
  }

  function initAccount() {
    const form = document.querySelector('[data-account-form]');
    if (!form || form.dataset.backend === 'supabase') return;
    const message = document.getElementById('accountMessage');
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (message) { message.textContent = 'La connexion Supabase est indisponible sur cette page.'; message.classList.remove('hidden'); }
    });
    document.querySelectorAll('[data-account-tab]').forEach(tab => tab.addEventListener('click', () => {
      document.querySelectorAll('[data-account-tab]').forEach(item => item.classList.remove('is-active'));
      tab.classList.add('is-active');
      const action = document.getElementById('accountAction'); if (action) action.textContent = tab.dataset.accountTab === 'login' ? 'Se connecter' : 'Créer mon compte';
    }));
  }

  const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
  const toggle = document.getElementById('hamb'); const nav = document.getElementById('navigation');
  function closeMenu({ restoreFocus = true } = {}) {
    if (!toggle || !nav) return;
    const wasOpen = nav.classList.contains('open');
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
    toggle.textContent = '☰';
    if (wasOpen && restoreFocus) queueMicrotask(() => lastMenuTrigger?.focus({ preventScroll: true }));
  }
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        closeMenu();
        return;
      }
      lastMenuTrigger = toggle;
      nav.classList.add('open');
      nav.setAttribute('tabindex', '-1');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fermer le menu');
      toggle.textContent = '×';
      queueMicrotask(() => nav.focus({ preventScroll: true }));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu({ restoreFocus: false })));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }
  initCart(); initCheckout(); initAccount();
})();
