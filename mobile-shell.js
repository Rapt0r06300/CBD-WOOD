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
  initScrollReveal();
  initStructuredMenu();

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
