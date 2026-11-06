(() => {
  'use strict';

  const root = document.documentElement;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const lowData = Boolean(connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType));
  root.classList.add('wood-motion-ready');
  if (lowData) root.classList.add('wood-low-data');

  const qs = (selector, context = document) => context.querySelector(selector);
  const qsa = (selector, context = document) => [...context.querySelectorAll(selector)];

  function initScrollState() {
    const nav = qs('.nav');
    const progress = document.createElement('div');
    progress.className = 'wood-page-progress';
    progress.setAttribute('aria-hidden', 'true');
    progress.innerHTML = '<span></span>';
    document.body.prepend(progress);

    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty('--wood-page-progress', String(Math.min(1, window.scrollY / max)));
      nav?.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initReveals() {
    const targets = qsa([
      '.hero-proof-rail figure', '.cards .category', '.wood-service', '.wood-campaign__media', '.wood-campaign__copy', '.wood-runway-card', '.wood-selection__card', '.wood-mood__copy',
      '.wood-mood__card', '.wood-photo-rail figure', '.wood-pack__card', '.wood-proof__empty',
      '.story-image', '.story-text', '.value', '.location-card', '.wood-community__inner',
      '.faq-items details', '.product-card', '.product-related__card', '.product-detail__copy',
      '.product-detail__gallery', '.flower-detail__copy', '.flower-detail-card', '.notice'
    ].join(','));
    if (!targets.length) return;
    targets.forEach((target, index) => {
      if (target.dataset.woodMotionReveal === 'true') return;
      target.dataset.woodMotionReveal = 'true';
      target.classList.add('wood-reveal-v2');
      target.style.setProperty('--wood-reveal-delay', `${Math.min(index % 6 * 55, 275)}ms`);
      if (target.matches('.story-image, .product-detail__gallery')) target.dataset.revealFrom = 'left';
      if (target.matches('.story-text, .product-detail__copy')) target.dataset.revealFrom = 'right';
    });
    if (reduced || lowData || !('IntersectionObserver' in window)) {
      targets.forEach(target => target.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px 18% 0px' });
    targets.forEach(target => observer.observe(target));
    // Never leave content hidden when a browser captures a long page without
    // scrolling through it (print, full-page screenshot, keyboard navigation).
    window.setTimeout(() => targets.forEach(target => target.classList.add('is-visible')), 220);
  }

  function initHeroMotion() {
    const hero = qs('.hero-art');
    if (!hero || reduced || lowData) return;
    hero.addEventListener('pointermove', event => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * 16;
      const y = ((event.clientY - rect.top) / rect.height - .5) * 12;
      hero.style.setProperty('--wood-hero-x', x.toFixed(2));
      hero.style.setProperty('--wood-hero-y', y.toFixed(2));
    });
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--wood-hero-x', '0');
      hero.style.setProperty('--wood-hero-y', '0');
    });
  }

  function updateRail(rail, controls) {
    const items = [...rail.children].filter(item => !item.hidden);
    const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const ratio = max ? rail.scrollLeft / max : 0;
    const progress = qs('[data-rail-progress]', controls);
    const count = qs('[data-rail-count]', controls);
    const prev = qs('[data-rail-prev]', controls);
    const next = qs('[data-rail-next]', controls);
    if (progress) progress.style.width = `${Math.max(25, Math.round((rail.clientWidth / Math.max(rail.scrollWidth, 1)) * 100))}%`;
    if (progress) progress.style.transform = `translateX(${Math.round(ratio * 100)}%)`;
    if (count) {
      const current = max ? Math.min(items.length, Math.max(1, Math.round(ratio * Math.max(items.length - 1, 1)) + 1)) : Math.max(1, items.length);
      count.textContent = `${String(current).padStart(2, '0')} / ${String(Math.max(1, items.length)).padStart(2, '0')}`;
    }
    if (prev) prev.disabled = rail.scrollLeft <= 3;
    if (next) next.disabled = max <= 3 || rail.scrollLeft >= max - 3;
  }

  function initRails() {
    qsa('[data-wood-rail]').forEach(rail => {
      if (rail.dataset.motionWired === 'true') return;
      const controls = qs(`[data-wood-controls="${rail.dataset.woodRail}"]`);
      if (!controls) return;
      rail.dataset.motionWired = 'true';
      const items = [...rail.children];
      const jump = direction => {
        if (!items.length) return;
        const current = items.findIndex(item => {
          const delta = Math.abs(item.getBoundingClientRect().left - rail.getBoundingClientRect().left);
          return delta < 24;
        });
        const index = Math.min(items.length - 1, Math.max(0, (current < 0 ? 0 : current) + direction));
        items[index]?.scrollIntoView({ behavior: reduced || lowData ? 'auto' : 'smooth', block: 'nearest', inline: 'start' });
      };
      qs('[data-rail-prev]', controls)?.addEventListener('click', () => jump(-1));
      qs('[data-rail-next]', controls)?.addEventListener('click', () => jump(1));
      rail.addEventListener('scroll', () => updateRail(rail, controls), { passive: true });
      window.addEventListener('resize', () => updateRail(rail, controls), { passive: true });
      updateRail(rail, controls);
    });
  }

  function initPointerHints() {
    if (reduced || lowData || !window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return;
    qsa('.btn, .nav-cta, .add-to-cart, .cart-trigger').forEach(button => {
      if (button.dataset.woodPointerWired === 'true') return;
      button.dataset.woodPointerWired = 'true';
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 4;
        const y = ((event.clientY - rect.top) / rect.height - .5) * 3;
        button.style.setProperty('--wood-pointer-x', `${x.toFixed(2)}px`);
        button.style.setProperty('--wood-pointer-y', `${y.toFixed(2)}px`);
      });
      button.addEventListener('pointerleave', () => {
        button.style.removeProperty('--wood-pointer-x');
        button.style.removeProperty('--wood-pointer-y');
      });
    });
  }

  function initActionFeedback() {
    document.addEventListener('click', event => {
      const button = event.target.closest('.add-to-cart, [data-wood-demo-action]');
      if (!button || button.disabled) return;
      button.classList.remove('wood-button-pulse');
      void button.offsetWidth;
      button.classList.add('wood-button-pulse');
    }, true);
  }

  function initDynamicHooks() {
    const refresh = () => {
      initReveals();
      initRails();
      initPointerHints();
    };
    document.addEventListener('wood:catalog-rendered', refresh);
    document.addEventListener('wood:detail-rendered', refresh);
    window.setTimeout(refresh, 0);
  }

  initScrollState();
  initReveals();
  initHeroMotion();
  initRails();
  initPointerHints();
  initActionFeedback();
  initDynamicHooks();
})();
