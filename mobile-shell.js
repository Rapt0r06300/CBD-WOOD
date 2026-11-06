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

  const WOOD_ICON_MARKUP = Object.freeze({
    home: '<path d="M3 10.5 12 3l9 7.5M5.5 9.5V21h13V9.5M9.5 21v-6h5v6"/>',
    catalog: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    cart: '<path d="M3 4h2l2 11h10.5l2-8H6"/><circle cx="9" cy="19" r="1.2"/><circle cx="17" cy="19" r="1.2"/>',
    account: '<circle cx="12" cy="8" r="3.5"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
    store: '<path d="M4 10h16v10H4zM3 10l2-6h14l2 6"/><path d="M3 10c0 1.7 1.2 3 3 3s3-1.3 3-3c0 1.7 1.2 3 3 3s3-1.3 3-3c0 1.7 1.2 3 3 3s3-1.3 3-3M9 20v-5h6v5"/>',
    phone: '<path d="M7 3.5h3l1.5 4-2 1.5a14 14 0 0 0 5.5 5.5l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10 19 5 14 5 5.5c0-1.1.9-2 2-2Z"/>',
    directions: '<path d="m12 3 9 9-9 9-9-9 9-9Z"/><path d="M8 12h8M13 9l3 3-3 3"/>',
    delivery: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.5"/><circle cx="18" cy="18" r="1.5"/>',
    faq: '<circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.4 2.4 0 1 1 4.1 1.7c-1.1 1-1.8 1.3-1.8 2.8M12 17h.01"/>',
  });

  function createWoodIcon(name, extraClass = '') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.classList.add('wood-icon', `wood-icon--${name}`);
    if (extraClass) svg.classList.add(extraClass);
    svg.innerHTML = WOOD_ICON_MARKUP[name] || WOOD_ICON_MARKUP.faq;
    return svg;
  }

  function hydrateWoodIcons(root = document) {
    root.querySelectorAll('[data-wood-icon]').forEach((slot) => {
      if (slot.querySelector('.wood-icon')) return;
      const name = slot.getAttribute('data-wood-icon');
      if (!WOOD_ICON_MARKUP[name]) return;
      slot.replaceChildren(createWoodIcon(name, 'wood-icon--inline'));
    });
  }

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

  function initFooterSections() {
    const top = document.querySelector('.footer .footer-top');
    if (!top || top.dataset.woodFooterSections === 'true') return;
    const groups = [...top.children].filter(group => !group.classList.contains('footer-brand'));
    const sections = groups.map((group, index) => {
      const heading = group.querySelector(':scope > h3');
      const links = group.querySelector(':scope > .footer-links');
      if (!heading || !links) return null;
      const details = document.createElement('details');
      details.className = 'footer-section';
      details.dataset.footerSection = String(index);
      const summary = document.createElement('summary');
      summary.textContent = heading.textContent.trim();
      details.append(summary, links);
      group.replaceWith(details);
      return details;
    }).filter(Boolean);
    if (!sections.length) return;
    top.dataset.woodFooterSections = 'true';
    const applyViewportState = () => {
      const compact = window.matchMedia?.('(max-width: 500px)').matches;
      sections.forEach(section => { section.open = !compact; });
    };
    applyViewportState();
    const media = window.matchMedia?.('(max-width: 500px)');
    media?.addEventListener?.('change', applyViewportState);
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

  function initLowDataMode() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const lowData = Boolean(connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType));
    if (lowData) document.documentElement.classList.add('wood-low-data');
  }

  function initPageTransitions() {
    if (document.documentElement.classList.contains('wood-low-data') || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    root.classList.add('wood-page-transitions');
    body.classList.add('wood-page-enter');
    const reveal = () => window.requestAnimationFrame(() => body.classList.add('wood-page-ready'));
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', reveal, { once: true });
    else reveal();

    document.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download') || link.closest('.cart-panel')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.protocol !== window.location.protocol) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      if (url.pathname.endsWith('.pdf') || url.pathname.endsWith('.zip')) return;
      event.preventDefault();
      body.classList.add('wood-page-exit');
      window.setTimeout(() => { window.location.assign(url.href); }, 170);
    });
    window.addEventListener('pageshow', () => body.classList.remove('wood-page-exit'));
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll('.page-hero__copy, .page-hero__art, .hero-copy, .hero-art, .section-heading, .notice, .story, .visit-grid, .faq-layout, .checkout-layout, .account-dashboard, .flower-detail__copy, .flower-detail-card, .product-detail__copy, .product-detail-card, .wood-mood, #selection-editoriale, .wood-pack, #preuve, .wood-community, .wood-photo-rail, .footer');
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

  function initPhotoMotion() {
    if (document.documentElement.classList.contains('wood-low-data') || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('wood-photo-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.45, rootMargin: '0px 0px -10% 0px' });
    const observePhotos = () => {
      document.querySelectorAll('.product-art img, .product-related__media img').forEach(target => {
        if (target.dataset.woodPhotoMotionObserved === 'true') return;
        target.dataset.woodPhotoMotionObserved = 'true';
        target.classList.add('wood-photo-motion');
        observer.observe(target);
      });
    };
    observePhotos();
    document.addEventListener('wood:catalog-rendered', observePhotos);
  }

  function initStructuredMenu() {
    const nav = document.getElementById('navigation');
    if (!nav || nav.dataset.woodStructuredMenu === 'true') return;

    const groups = [];
    let currentGroup = null;
    [...nav.children].forEach((child) => {
      if (child.classList.contains('nav-menu-label')) {
        currentGroup = { label: child.textContent.trim(), nodes: [] };
        groups.push(currentGroup);
        return;
      }
      if (currentGroup) currentGroup.nodes.push(child);
    });
    if (!groups.length || !groups.some(group => group.nodes.length)) return;

    const root = document.createElement('div');
    root.className = 'nav-menu-root';
    const menuSections = [];

    groups.forEach((group, index) => {
      const section = document.createElement('section');
      section.className = 'nav-menu-section';
      section.dataset.menuSection = String(index);

      const desktopLabel = document.createElement('span');
      desktopLabel.className = 'nav-menu-label';
      desktopLabel.textContent = group.label;

      const panelId = `wood-nav-submenu-${index}`;
      const trigger = document.createElement('button');
      trigger.className = 'nav-menu-trigger';
      trigger.type = 'button';
      trigger.setAttribute('aria-controls', panelId);
      trigger.setAttribute('aria-expanded', 'false');
      trigger.append(document.createTextNode(group.label));
      const triggerArrow = document.createElement('span');
      triggerArrow.setAttribute('aria-hidden', 'true');
      triggerArrow.textContent = '↗';
      trigger.append(triggerArrow);

      const panel = document.createElement('div');
      panel.className = 'nav-submenu-panel';
      panel.id = panelId;
      panel.dataset.menuPanel = String(index);
      panel.setAttribute('aria-label', group.label);

      const back = document.createElement('button');
      back.className = 'nav-menu-back';
      back.type = 'button';
      back.textContent = '← Retour au menu';
      panel.append(back, ...group.nodes);

      section.append(desktopLabel, trigger, panel);
      root.append(section);
      menuSections.push({ back, panel, section, trigger, index });
    });

    nav.replaceChildren(root);
    nav.classList.add('nav-structured');
    nav.dataset.woodStructuredMenu = 'true';

    const setMenuView = (view = 'root') => {
      nav.dataset.menuView = view;
      menuSections.forEach(({ panel, section, trigger, index }) => {
        const active = view === `submenu-${index}`;
        panel.classList.toggle('is-active', active);
        section.classList.toggle('is-active', active);
        trigger.setAttribute('aria-expanded', String(active));
      });
    };

    menuSections.forEach(({ back, trigger, index }) => {
      trigger.addEventListener('click', () => {
        setMenuView(`submenu-${index}`);
        queueMicrotask(() => back.focus({ preventScroll: true }));
      });
      back.addEventListener('click', () => {
        setMenuView('root');
        queueMicrotask(() => trigger.focus({ preventScroll: true }));
      });
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuView('root')));
    const toggle = document.getElementById('hamb');
    toggle?.addEventListener('click', () => queueMicrotask(() => setMenuView('root')));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') queueMicrotask(() => setMenuView('root'));
    });
    setMenuView();
  }

  ensureFooterLocations();
  initFooterSections();
  initLandingImageFallbacks();
  initLowDataMode();
  initPageTransitions();
  initScrollReveal();
  initPhotoMotion();
  initStructuredMenu();
  hydrateWoodIcons();

  const items = [
    { href: 'index.html', icon: 'home', label: 'Accueil', active: isHome },
    { href: 'index.html#univers', icon: 'catalog', label: 'Boutique', active: isShop },
    isHome
      ? { href: 'index.html#boutique', icon: 'pin', label: 'Nous trouver', active: false }
      : { href: 'checkout.html', icon: 'cart', label: 'Panier', active: isCart, cart: true },
    { href: 'compte.html', icon: 'account', label: 'Compte', active: isAccount },
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
    icon.append(createWoodIcon(item.icon));
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
