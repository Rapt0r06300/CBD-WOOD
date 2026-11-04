(() => {
  'use strict';

  const body = document.body;
  if (!body || body.classList.contains('admin-page') || document.querySelector('.mobile-app-nav')) return;

  const page = new URL(window.location.href).pathname.split('/').pop() || 'index.html';
  const isHome = page === '' || page === 'index.html';
  const isShop = ['wood-shop.html', 'fleurs.html', 'fleur.html', 'resines.html', 'bien-etre.html'].includes(page);
  const isAccount = page === 'compte.html';
  const isCart = page === 'checkout.html' || page === 'confirmation.html';
  const cartTrigger = document.getElementById('cartTrigger');

  const items = [
    { href: 'index.html', icon: '⌂', label: 'Accueil', active: isHome },
    { href: 'index.html#univers', icon: '▦', label: 'Boutique', active: isShop },
    isHome
      ? { href: 'index.html#boutique', icon: '⌖', label: 'Nous trouver', active: false }
      : { href: 'checkout.html', icon: '◫', label: 'Panier', active: isCart, cart: true },
    { href: 'compte.html', icon: '◉', label: 'Compte', active: isAccount },
  ];

  const nav = document.createElement('nav');
  nav.className = 'mobile-app-nav';
  nav.setAttribute('aria-label', 'Navigation rapide');

  for (const item of items) {
    const link = document.createElement('a');
    link.href = item.href;
    if (item.active) link.setAttribute('aria-current', 'page');
    if (item.cart) link.dataset.mobileCart = 'true';

    const icon = document.createElement('span');
    icon.className = 'mobile-app-nav__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = item.icon;
    const label = document.createElement('span');
    label.className = 'mobile-app-nav__label';
    label.textContent = item.label;
    link.append(icon, label);
    nav.append(link);
  }

  body.classList.add('has-mobile-app-nav');
  body.append(nav);

  const mobileCart = nav.querySelector('[data-mobile-cart]');
  if (mobileCart && cartTrigger) {
    mobileCart.addEventListener('click', (event) => {
      event.preventDefault();
      cartTrigger.click();
    });
  }
})();
