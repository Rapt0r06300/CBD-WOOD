(() => {
  const STORAGE_KEY = 'wood-cart-v1';
  const ORDER_MODE_KEY = 'wood-order-mode-v1';
  const readCart = () => {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  };
  const writeCart = (cart) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch {}
  };
  let cart = readCart();
  const priceLabel = (item) => item.price ? `${Number(item.price).toFixed(2).replace('.', ',')} €` : 'Prix à confirmer';
  const totalLabel = () => {
    if (!cart.length || cart.some(item => !item.price)) return 'À confirmer';
    return `${cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0).toFixed(2).replace('.', ',')} €`;
  };
  const cartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const calculateFlowerPrice = (grams, tiers) => window.WoodFlowerPricing?.calculateFlowerPrice?.(grams, tiers) || { price: '', breakdown: [] };
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

  function ensureCartPanel() {
    if (document.getElementById('cartPanel')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div class="cart-backdrop" data-cart-close></div>
      <aside class="cart-panel" id="cartPanel" aria-labelledby="cartTitle" aria-hidden="true">
        <div class="cart-panel__header"><h2 id="cartTitle">Votre sélection</h2><button class="cart-close" type="button" data-cart-close aria-label="Fermer le panier">×</button></div>
        <div class="cart-items" id="cartItems"></div>
        <div class="cart-summary"><span>Total</span><strong id="cartTotal">À confirmer</strong></div>
        <p class="cart-caption">Les prix et la connexion Viva.com seront activés après validation des produits et du backend.</p>
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
    if (checkout) checkout.classList.toggle('is-disabled', cart.length === 0);
    if (!items) return;
    if (!cart.length) {
      items.innerHTML = '<p class="cart-empty">Votre sélection est vide. Ajoutez une référence depuis une page de la boutique pour préparer votre commande.</p>';
      return;
    }
    items.innerHTML = cart.map(item => `
      <div class="cart-item" data-item-id="${item.id}">
        <div><h3>${item.name}</h3><p>${item.category || 'WOOD Shop'} · ${priceLabel(item)}</p><div class="cart-item__actions"><button class="cart-qty" type="button" data-qty="minus" aria-label="Retirer une unité">−</button><span class="cart-item__count">${item.quantity}</span><button class="cart-qty" type="button" data-qty="plus" aria-label="Ajouter une unité">+</button><button class="cart-qty" type="button" data-remove aria-label="Supprimer la référence">×</button></div></div>
        <div class="cart-item__price">${priceLabel(item)}</div>
      </div>`).join('');
  }

  function setCartOpen(open) {
    const panel = document.getElementById('cartPanel');
    const backdrop = document.querySelector('.cart-backdrop');
    const trigger = document.getElementById('cartTrigger');
    if (!panel || !backdrop) return;
    panel.classList.toggle('is-open', open); backdrop.classList.toggle('is-open', open); panel.setAttribute('aria-hidden', String(!open));
    if (trigger) trigger.setAttribute('aria-expanded', String(open));
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
    card.dataset.detailHref = `fleur.html?produit=${encodeURIComponent(productId)}`;
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
        const index = card.querySelector('.product-index');
        const description = card.querySelector('.product-body > p');
        const category = index?.textContent || '';
        if (index && description) {
          if (category.includes('STRONG')) {
            index.textContent = category.replace('STRONG', 'CBD BOOSTÉ (STRONG)');
            description.textContent = 'CBD Boosté (strong). Choisissez le grammage souhaité.';
          } else if (category.includes('MEDIUM')) {
            index.textContent = category.replace('MEDIUM', 'CBD SOFT (MEDIUM)');
            description.textContent = 'CBD Soft (medium). Choisissez le grammage souhaité.';
          } else if (category.includes('FLEURS CBD')) {
            index.textContent = category.replace('FLEURS CBD', 'CBD CLASSIQUE');
            description.textContent = 'CBD classique. Choisissez le grammage souhaité.';
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
      const pricing = calculateFlowerPrice(grams, readFlowerTiers(control));
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
      const pricing = calculateFlowerPrice(grams, readFlowerTiers(select));
      if (label) label.textContent = `${grams} g · ${priceLabel({ price: pricing.price })}`;
      const minus = select.querySelector('[data-gram-step="-1"]');
      if (minus) minus.disabled = grams <= 1;
      const output = select.querySelector('[data-gram-value]');
      if (output) output.textContent = `${grams} g`;
      return;
    }
    const option = select.options[select.selectedIndex];
    if (label && option) label.textContent = `${option.dataset.label || option.textContent} · ${priceLabel({ price: option.dataset.price || '' })}`;
  }

  function addProduct(card) {
    const variant = selectedVariant(card);
    const existing = cart.find(item => item.id === variant.id);
    const item = { id: variant.id, productId: card.dataset.productId, name: variant.name, category: card.dataset.productCategory, price: variant.price, weight: variant.label, quantity: existing ? existing.quantity + 1 : 1 };
    cart = existing ? cart.map(entry => entry.id === variant.id ? item : entry) : [...cart, item];
    writeCart(cart); renderCart(); setCartOpen(true);
  }

  function updateQuantity(id, delta) {
    cart = cart.map(item => item.id === id ? {...item, quantity: item.quantity + delta} : item).filter(item => item.quantity > 0);
    writeCart(cart); renderCart();
  }

  function updateOrderModeUI(id) {
    const mode = getOrderMode(id);
    document.querySelectorAll('[data-order-mode-card]').forEach(card => card.classList.toggle('is-selected', card.dataset.orderModeCard === id));
    const summary = document.getElementById('orderModeSummary');
    if (summary) summary.textContent = mode ? `Mode choisi : ${mode.label}${mode.address ? ` · ${mode.address}` : ''}` : 'Choisissez un mode de réception avant le paiement.';
    const payment = document.getElementById('prepareViva');
    if (payment) payment.disabled = !mode;
  }

  function renderOrderModes() {
    const container = document.getElementById('orderModes');
    const modes = window.WoodOrderOptions?.getOrderModes?.();
    if (!container || !modes) return;
    const selected = readOrderMode();
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
    enhanceFlowerCards();
    ensureCartPanel(); renderCart();
    document.querySelectorAll('[data-product-weight], [data-product-gram-control]').forEach(updateProductPrice);
    trigger.addEventListener('click', () => setCartOpen(!document.getElementById('cartPanel').classList.contains('is-open')));
    document.addEventListener('click', event => {
      const step = event.target.closest('[data-gram-step]');
      if (step) {
        const control = step.closest('[data-product-gram-control]');
        if (!control) return;
        const current = Number.parseInt(control.dataset.grams, 10) || 1;
        const next = Math.max(1, current + (Number.parseInt(step.dataset.gramStep, 10) || 0));
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
      if (button) addProduct(button.closest('.product-card'));
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
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setCartOpen(false); });
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
      list.innerHTML = cart.map(item => `<div class="checkout-line"><div><h3>${item.name}</h3><span>${item.category || 'WOOD Shop'} · quantité ${item.quantity}</span></div><strong>${priceLabel(item)}</strong></div>`).join('');
    }
    const total = document.getElementById('checkoutTotal'); if (total) total.textContent = totalLabel();
    renderOrderModes();
    const message = document.getElementById('checkoutMessage');
    document.querySelectorAll('[data-checkout-mode]').forEach(choice => choice.addEventListener('click', () => {
      if (!message) return;
      message.textContent = choice.dataset.checkoutMode === 'guest' ? 'Le parcours invité est prêt. La validation de commande sera reliée au backend.' : 'La page compte client est prête visuellement. La création réelle du compte sera reliée au backend.';
      message.classList.remove('hidden');
    }));
    document.getElementById('prepareViva')?.addEventListener('click', () => {
      if (!message) return;
      const mode = getOrderMode(readOrderMode());
      if (!mode) {
        message.textContent = 'Choisissez d’abord la livraison ou le retrait en boutique.';
        message.classList.remove('hidden');
        return;
      }
      message.textContent = `Viva Smart Checkout sera appelé ici pour le mode « ${mode.label} » après la connexion sécurisée du backend. Aucun paiement réel n’est lancé dans cette maquette.`;
      message.classList.remove('hidden');
    });
  }

  function initAccount() {
    const form = document.querySelector('[data-account-form]');
    if (!form || form.dataset.backend === 'supabase') return;
    const message = document.getElementById('accountMessage');
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (message) { message.textContent = 'La connexion sera activée avec le backend. Aucune donnée n’est enregistrée dans cette maquette.'; message.classList.remove('hidden'); }
    });
    document.querySelectorAll('[data-account-tab]').forEach(tab => tab.addEventListener('click', () => {
      document.querySelectorAll('[data-account-tab]').forEach(item => item.classList.remove('is-active'));
      tab.classList.add('is-active');
      const action = document.getElementById('accountAction'); if (action) action.textContent = tab.dataset.accountTab === 'login' ? 'Se connecter' : 'Créer mon compte';
    }));
  }

  const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
  const toggle = document.getElementById('hamb'); const nav = document.getElementById('navigation');
  function closeMenu(){if(!toggle||!nav)return;nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Ouvrir le menu');toggle.textContent='☰';}
  if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');toggle.textContent=open?'×':'☰';});nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});}
  initCart(); initCheckout(); initAccount();
})();
