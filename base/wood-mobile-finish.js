(() => {
  'use strict';

  const root = document.documentElement;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const lowData = Boolean(connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType));
  const mobileQuery = window.matchMedia?.('(max-width: 800px)');
  const qs = (selector, context = document) => context.querySelector(selector);
  const qsa = (selector, context = document) => [...context.querySelectorAll(selector)];

  function visibleItems(rail) {
    return [...rail.children].filter(item => !item.hidden && getComputedStyle(item).display !== 'none');
  }

  function addRailCue(rail, label, key) {
    if (!rail || rail.dataset.mobileRailCue === 'true') return;
    const cue = document.createElement('div');
    cue.className = 'wood-mobile-rail-cue';
    cue.dataset.mobileRailCueFor = key;
    cue.innerHTML = `<span class="wood-mobile-rail-cue__label">${label}</span><span class="wood-mobile-rail-cue__track" aria-hidden="true"><span></span></span><span class="wood-mobile-rail-cue__count" aria-live="polite"></span>`;
    rail.insertAdjacentElement('afterend', cue);
    rail.dataset.mobileRailCue = 'true';

    const update = () => {
      const items = visibleItems(rail);
      const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const ratio = max ? Math.min(1, Math.max(0, rail.scrollLeft / max)) : 0;
      const track = qs('.wood-mobile-rail-cue__track span', cue);
      const count = qs('.wood-mobile-rail-cue__count', cue);
      cue.classList.toggle('is-static', max <= 2 || items.length < 2);
      if (track) {
        const width = max ? Math.max(28, Math.round((rail.clientWidth / rail.scrollWidth) * 100)) : 100;
        track.style.width = `${width}%`;
        track.style.transform = `translateX(${Math.round(ratio * Math.max(0, 100 - width))}%)`;
      }
      if (count) {
        const current = max ? Math.min(items.length, Math.max(1, Math.round(ratio * Math.max(items.length - 1, 1)) + 1)) : Math.max(1, items.length);
        count.textContent = `${String(current).padStart(2, '0')} / ${String(Math.max(1, items.length)).padStart(2, '0')}`;
      }
    };

    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  function initTouchRails() {
    const rails = [
      ['.wood-drop-grid', 'Glisser pour voir les drops', 'drops'],
      ['.wood-runway__grid', 'Glisser pour voir les profils', 'runway'],
      ['.wood-selection__grid[data-wood-rail]', 'Glisser pour découvrir la sélection', 'selection'],
      ['.wood-mood__rail[data-wood-rail]', 'Glisser pour changer de mood', 'mood'],
      ['.wood-photo-rail[data-wood-rail]', 'Glisser pour découvrir les images', 'photos'],
      ['.wood-pack__grid', 'Glisser pour voir les packs', 'packs'],
      ['.wood-community__wall', 'Glisser pour voir le feed', 'community'],
    ];
    rails.forEach(([selector, label, key]) => addRailCue(qs(selector), label, key));
  }

  function initTouchFeedback() {
    if (reduced || lowData) return;
    const targetSelector = '.wood-drop-card, .wood-runway-card, .wood-selection__card, .wood-mood__card, .wood-pack__card, .wood-community__wall article, .location-card, .btn, .wood-mood__tabs button';
    const clear = target => {
      if (!target) return;
      target.classList.remove('wood-touch-active');
    };

    document.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse') return;
      const target = event.target.closest?.(targetSelector);
      if (!target) return;
      target.classList.add('wood-touch-active');
      target.setPointerCapture?.(event.pointerId);
    }, { passive: true });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(type => {
      document.addEventListener(type, event => clear(event.target.closest?.(targetSelector)), { passive: true });
    });

    qsa('[data-mood]').forEach(button => button.addEventListener('click', () => {
      const mood = button.closest('[data-mood-selector]');
      if (!mood) return;
      mood.dataset.moodChanging = 'true';
      window.setTimeout(() => { delete mood.dataset.moodChanging; }, 520);
    }));
  }

  function initBottomNavigation() {
    const nav = qs('.mobile-app-nav');
    if (!nav || reduced) return;
    let previousY = window.scrollY;
    let ticking = false;
    const show = () => document.body.classList.remove('wood-nav-hidden');
    const update = () => {
      ticking = false;
      if (!mobileQuery?.matches) {
        show();
        previousY = window.scrollY;
        return;
      }
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      if (currentY < 24 || delta < -6 || document.querySelector('.nav.open')) show();
      else if (delta > 7 && currentY > 120) document.body.classList.add('wood-nav-hidden');
      previousY = currentY;
    };
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    nav.addEventListener('focusin', show);
    document.addEventListener('click', event => {
      if (event.target.closest?.('a[href^="#"]')) show();
    });
    mobileQuery?.addEventListener?.('change', () => { show(); previousY = window.scrollY; });
  }

  root.classList.add('wood-mobile-finish-ready');
  initTouchRails();
  mobileQuery?.addEventListener?.('change', initTouchRails);
  initTouchFeedback();
  initBottomNavigation();
})();
