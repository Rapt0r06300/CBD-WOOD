(() => {
  'use strict';

  const body = document.body;
  if (!body || body.classList.contains('admin-page') || document.querySelector('.mobile-app-nav')) return;

  const page = new URL(window.location.href).pathname.split('/').pop() || 'index.html';
  const isHome = page === '' || page === 'index.html';
  const isShop = ['wood-shop.html', 'fleurs.html', 'fleur.html', 'produit.html', 'resines.html', 'bien-etre.html'].includes(page);
  const isAccount = page === 'compte.html';
  const isCart = page === 'checkout.html' || page === 'confirmation.html';
  const cartTrigger = document.getElementById('cartTrigger');

  function ensureFooterLocations() {
    const footer = document.querySelector('.footer');
    const barla = footer?.querySelector('a[href="tel:+33422163570"]');
    const links = barla?.closest('.footer-links');
    if (!links) return;
    barla.textContent = 'Barla · 04 22 16 35 70';
    if (!links.querySelector('a[href="tel:+33423130305"]')) {
      const borriglione = document.createElement('a');
      borriglione.href = 'tel:+33423130305';
      borriglione.textContent = 'Borriglione · 04 23 13 03 05';
      links.insertBefore(borriglione, barla.nextSibling);
    }
    const address = links.querySelector('a[href="index.html#boutique"]');
    if (address && !address.dataset.woodLocations) {
      address.dataset.woodLocations = 'true';
      address.replaceChildren('7 rue Barla, 06300 Nice', document.createElement('br'), '16 avenue Alfred Borriglione, 06100 Nice');
    }
  }

  function wireLandingImageFallback(image) {
    if (!image || image.dataset.landingFallbackWired === 'true') return;
    const frame = image.closest('.hero-art, .category .visual, .story-image');
    if (!frame) return;
    image.dataset.landingFallbackWired = 'true';
    image.addEventListener('error', () => {
      if (image.dataset.landingFallbackApplied === 'true') return;
      image.dataset.landingFallbackApplied = 'true';
      image.hidden = true;
      frame.classList.add('wood-image-fallback');
      frame.setAttribute('role', 'img');
      frame.setAttribute('aria-label', image.alt || 'Visuel WOOD à venir');
    }, { once: true });
  }

  function initLandingImageFallbacks() {
    document.querySelectorAll('.hero-art img, .category .visual img, .story-image img').forEach(wireLandingImageFallback);
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll('.page-hero__copy, .page-hero__art, .hero-copy, .hero-art, .section-heading, .notice, .story, .visit-grid, .faq-layout, .checkout-layout, .account-dashboard, .flower-detail__copy, .flower-detail-card, .product-detail__copy, .product-detail-card, .footer');
    if (!targets.length || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach((target, index) => {
      target.classList.add('wood-reveal');
      target.style.setProperty('--wood-reveal-delay', `${Math.min(index * 35, 210)}ms`);
      observer.observe(target);
    });
  }

  ensureFooterLocations();
  initLandingImageFallbacks();
  initScrollReveal();

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
