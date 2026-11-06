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
  let revealFallbacksWired = false;

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

  function initComicDoodles() {
    const replacements = [
      ['.hero-copy .wood-graffiti--tag', 'wood-comic-doodle--wood'],
      ['.hero-art .wood-graffiti--halo', 'wood-comic-doodle--leaf'],
      ['.hero-art .wood-graffiti--burst', 'wood-comic-doodle--smile'],
      ['.hero-art .wood-graffiti--loop', 'wood-comic-doodle--arrow'],
      ['.wood-service:nth-child(1) .wood-service__mark', 'wood-comic-doodle--leaf'],
      ['.wood-service:nth-child(2) .wood-service__mark', 'wood-comic-doodle--cloche'],
      ['.wood-service:nth-child(3) .wood-service__mark', 'wood-comic-doodle--arrow'],
      ['.wood-service:nth-child(4) .wood-service__mark', 'wood-comic-doodle--smile'],
      ['.wood-campaign__media .wood-graffiti--campaign-sun', 'wood-comic-doodle--cloche'],
      ['.wood-campaign__media .wood-graffiti--campaign-check', 'wood-comic-doodle--good'],
      ['.wood-runway .wood-graffiti--runway-arrow', 'wood-comic-doodle--arrow'],
      ['.wood-runway-card:nth-child(1) .wood-graffiti--runway-star', 'wood-comic-doodle--leaf'],
      ['.wood-runway-card:nth-child(2) .wood-graffiti--runway-star', 'wood-comic-doodle--smile'],
      ['.wood-runway-card:nth-child(3) .wood-graffiti--runway-star', 'wood-comic-doodle--cloche'],
      ['.wood-runway-card:nth-child(4) .wood-graffiti--runway-star', 'wood-comic-doodle--good']
    ];
    let replaced = false;
    replacements.forEach(([selector, doodle]) => {
      const image = qs(selector);
      if (!image || image.dataset.woodComicDoodle === 'true') return;
      const sticker = document.createElement('span');
      sticker.className = `${image.className} wood-comic-doodle ${doodle}`;
      sticker.setAttribute('aria-hidden', 'true');
      sticker.dataset.woodComicDoodle = 'true';
      image.replaceWith(sticker);
      replaced = true;
    });
    if (replaced) root.classList.add('wood-comic-ready');
  }

  function initRunwayViews() {
    qsa('a.wood-runway-card').forEach(anchor => {
      const media = qs('.wood-runway-card__media', anchor);
      if (!media || media.querySelectorAll('img').length < 2) return;
      const title = qs('h3', anchor)?.textContent.trim() || 'ce produit';
      const article = document.createElement('article');
      article.className = anchor.className;
      const link = document.createElement('a');
      link.className = 'wood-runway-card__link';
      link.href = anchor.href;
      const label = anchor.getAttribute('aria-label');
      if (label) link.setAttribute('aria-label', label);
      const decoration = qs('.wood-graffiti--runway-star', anchor);
      [...anchor.childNodes].forEach(node => {
        if (node === decoration) article.append(node);
        else link.append(node);
      });
      article.append(link);
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'wood-runway-card__view-toggle';
      toggle.setAttribute('aria-pressed', 'false');
      toggle.setAttribute('aria-label', `Afficher la vue alternative de ${title}`);
      toggle.textContent = '1 / 2';
      toggle.addEventListener('click', () => {
        const alternate = article.classList.toggle('is-alt-view');
        toggle.setAttribute('aria-pressed', String(alternate));
        toggle.setAttribute('aria-label', `${alternate ? 'Afficher la vue principale' : 'Afficher la vue alternative'} de ${title}`);
        toggle.textContent = alternate ? '2 / 2' : '1 / 2';
      });
      article.append(toggle);
      anchor.replaceWith(article);
    });
  }

  function initReveals() {
    const targets = qsa([
      '.hero-proof-rail figure', '.page-hero__copy > *', '.page-hero__art', '.shop-section > .section-heading', '.cards .category', '.wood-service', '.wood-campaign__media', '.wood-campaign__copy', '.wood-runway-card', '.wood-selection__card', '.wood-mood__copy',
      '.wood-mood__card', '.wood-photo-rail figure', '.wood-pack__card', '.wood-proof__empty', '.wood-proof__panel', '.wood-proof__trust-row > div',
      '.story-image', '.story-text', '.value', '.location-card', '.wood-community__inner', '.wood-detail-strip__item',
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
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(target => observer.observe(target));
    if (!revealFallbacksWired) {
      revealFallbacksWired = true;
      document.addEventListener('focusin', event => {
        event.target.closest?.('.wood-reveal-v2')?.classList.add('is-visible');
      });
      window.addEventListener('beforeprint', () => {
        qsa('.wood-reveal-v2').forEach(target => target.classList.add('is-visible'));
      });
    }
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

  function initDetailStrip() {
    const ticker = qs('.ticker');
    if (!ticker || qs('.wood-detail-strip')) return;
    const strip = document.createElement('section');
    strip.className = 'wood-detail-strip';
    strip.setAttribute('aria-label', 'Les repères WOOD');
    strip.innerHTML = `
      <div class="wood-detail-strip__inner">
        <article class="wood-detail-strip__item"><span class="wood-detail-strip__mark">01</span><div><strong>À NICE</strong><small>Deux adresses, une même signature.</small></div></article>
        <article class="wood-detail-strip__item"><span class="wood-detail-strip__mark">02</span><div><strong>SOUS CLOCHE</strong><small>Une présentation qui mérite un gros plan.</small></div></article>
        <article class="wood-detail-strip__item"><span class="wood-detail-strip__mark">03</span><div><strong>BON CONSEIL</strong><small>On prend le temps avant le clic.</small></div></article>
        <article class="wood-detail-strip__item"><span class="wood-detail-strip__mark">04</span><div><strong>WOOD MOOD</strong><small>Chill, chic et un peu drôle.</small></div></article>
      </div>`;
    ticker.insertAdjacentElement('afterend', strip);
  }

  function initProofReviews() {
    qsa('[data-proof-reviews]').forEach(reviews => {
      if (reviews.dataset.motionWired === 'true') return;
      const items = qsa('[data-proof-review]', reviews);
      if (items.length < 2) return;
      const panel = reviews.closest('.wood-proof__panel');
      const count = qs('[data-proof-review-count]', panel);
      const prev = qs('[data-proof-review-prev]', panel);
      const next = qs('[data-proof-review-next]', panel);
      let index = Math.max(0, items.findIndex(item => item.classList.contains('is-active')));
      let timer = null;
      reviews.dataset.motionWired = 'true';

      const render = nextIndex => {
        index = (nextIndex + items.length) % items.length;
        items.forEach((item, itemIndex) => {
          const active = itemIndex === index;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-hidden', String(!active));
        });
        if (count) count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');
      };
      const stop = () => {
        if (timer) window.clearInterval(timer);
        timer = null;
      };
      const start = () => {
        if (reduced || lowData) return;
        stop();
        timer = window.setInterval(() => render(index + 1), 5200);
      };

      prev?.addEventListener('click', () => { render(index - 1); start(); });
      next?.addEventListener('click', () => { render(index + 1); start(); });
      reviews.addEventListener('mouseenter', stop);
      reviews.addEventListener('mouseleave', start);
      reviews.addEventListener('focusin', stop);
      reviews.addEventListener('focusout', event => {
        if (!reviews.contains(event.relatedTarget)) start();
      });
      reviews.addEventListener('touchstart', stop, { passive: true });
      reviews.addEventListener('touchend', () => window.setTimeout(start, 900), { passive: true });
      render(index);
      start();
    });
  }

  function initDynamicHooks() {
    const refresh = () => {
      initReveals();
      initRails();
      initProofReviews();
      initPointerHints();
    };
    document.addEventListener('wood:catalog-rendered', refresh);
    document.addEventListener('wood:detail-rendered', refresh);
    window.setTimeout(refresh, 0);
  }

  initScrollState();
  initRunwayViews();
  initComicDoodles();
  initDetailStrip();
  initReveals();
  initHeroMotion();
  initRails();
  initProofReviews();
  initPointerHints();
  initActionFeedback();
  initDynamicHooks();
})();
