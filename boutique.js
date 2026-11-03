(() => {
  const STORAGE_KEY = 'wood-cart-v1';
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

  function addProduct(card) {
    const id = card.dataset.productId;
    const existing = cart.find(item => item.id === id);
    const item = { id, name: card.dataset.productName, category: card.dataset.productCategory, price: card.dataset.productPrice || '', quantity: existing ? existing.quantity + 1 : 1 };
    cart = existing ? cart.map(entry => entry.id === id ? item : entry) : [...cart, item];
    writeCart(cart); renderCart(); setCartOpen(true);
  }

  function updateQuantity(id, delta) {
    cart = cart.map(item => item.id === id ? {...item, quantity: item.quantity + delta} : item).filter(item => item.quantity > 0);
    writeCart(cart); renderCart();
  }

  function initCart() {
    const trigger = document.getElementById('cartTrigger');
    if (!trigger) return;
    ensureCartPanel(); renderCart();
    trigger.addEventListener('click', () => setCartOpen(!document.getElementById('cartPanel').classList.contains('is-open')));
    document.addEventListener('click', event => {
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
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setCartOpen(false); });
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
    const message = document.getElementById('checkoutMessage');
    document.querySelectorAll('[data-checkout-mode]').forEach(choice => choice.addEventListener('click', () => {
      if (!message) return;
      message.textContent = choice.dataset.checkoutMode === 'guest' ? 'Le parcours invité est prêt. La validation de commande sera reliée au backend.' : 'La page compte client est prête visuellement. La création réelle du compte sera reliée au backend.';
      message.classList.remove('hidden');
    }));
    document.getElementById('prepareViva')?.addEventListener('click', () => {
      if (!message) return;
      message.textContent = 'Viva Smart Checkout sera appelé ici après la connexion sécurisée du backend. Aucun paiement réel n’est lancé dans cette maquette.';
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
