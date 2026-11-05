(() => {
  const root = document.querySelector('main[data-catalog-category="fleurs"]');
  if (!root) return;

  const hydrateCatalog = () => {
    const registry = window.WoodFlowerPresentation;
    if (!registry) return;

    root.querySelectorAll('[data-product-id]').forEach((card) => {
      if (card.dataset.demoVisual === 'true') return;
      const entry = registry.get(card.dataset.productId);
      if (!entry) return;
      card.dataset.mediaState = 'demo';
      card.dataset.mediaLabel = 'Photo démo';
      const image = card.querySelector('.product-art img');
      const description = card.querySelector('.product-body > p');
      if (image) {
        const flowerSource = entry.image;
        const previewSource = 'assets/fleurs.svg';
        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        image.src = flowerSource;
        image.alt = `Visuel de démonstration de la fleur ${entry.name}`;
        image.dataset.demoAsset = 'true';
        image.dataset.mediaState = 'demo';
        image.dataset.flowerSource = flowerSource;
        image.dataset.previewSource = previewSource;
        const showFlower = () => { image.src = flowerSource; };
        const showPreview = () => { if (canHover) image.src = previewSource; };
        const showFallback = () => {
          if (image.dataset.demoFallback === 'true') return;
          image.dataset.demoFallback = 'true';
          image.src = previewSource;
          image.alt = `Illustration botanique de la fleur ${entry.name}`;
        };
        image.addEventListener('error', showFallback, { once: true });
        if (canHover) {
          image.src = previewSource;
          card.addEventListener('mouseenter', showFlower);
          card.addEventListener('mouseleave', showPreview);
        }
        card.addEventListener('focusin', showFlower);
        card.addEventListener('focusout', (event) => {
          if (!card.contains(event.relatedTarget)) showPreview();
        });
        card.addEventListener('pointerdown', (event) => {
          if (event.pointerType === 'touch') showFlower();
        });
        card.addEventListener('pointerup', (event) => {
          if (event.pointerType === 'touch') showPreview();
        });
        card.addEventListener('pointercancel', (event) => {
          if (event.pointerType === 'touch') showPreview();
        });
      }
      if (description) description.textContent = entry.demoDescription;
      card.dataset.demoVisual = 'true';
    });
  };

  hydrateCatalog();
  document.addEventListener('wood:catalog-rendered', hydrateCatalog);
})();
