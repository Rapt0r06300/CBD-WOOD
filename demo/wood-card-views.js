(() => {
  'use strict';

  const registry = window.WoodFlowerPresentation;
  if (!registry) return;

  const uniqueViews = (entry) => {
    if (!Array.isArray(entry?.cardViews)) return [];
    const seen = new Set();
    return entry.cardViews.filter((view) => {
      const src = String(view?.src || '').trim();
      if (!src || seen.has(src)) return false;
      seen.add(src);
      return true;
    }).map((view, index) => ({
      src: String(view.src).trim(),
      alt: String(view.alt || `Vue ${index + 1} de démonstration`).trim(),
      label: String(view.label || `Vue ${index + 1}`).trim(),
    }));
  };

  const hydrate = () => {
    document.querySelectorAll('main[data-catalog-category="fleurs"] [data-product-id]').forEach((card) => {
      if (card.querySelector('[data-card-view-control]')) return;
      const views = uniqueViews(registry.get(card.dataset.productId));
      if (views.length < 2) return;
      const image = card.querySelector('.product-art img');
      const art = card.querySelector('.product-art');
      if (!image || !art) return;

      const controls = document.createElement('div');
      controls.className = 'product-card__view-controls';
      controls.dataset.cardViewControl = 'true';
      controls.setAttribute('aria-label', `Vues de ${card.dataset.productName || 'la référence'}`);
      views.forEach((view, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'product-card__view-dot';
        button.dataset.viewIndex = String(index);
        button.setAttribute('aria-label', view.label);
        button.setAttribute('aria-pressed', String(index === 0));
        button.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          image.src = view.src;
          image.alt = view.alt;
          controls.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        });
        controls.append(button);
      });
      art.append(controls);
    });
  };

  hydrate();
  document.addEventListener('wood:catalog-rendered', hydrate);
})();
