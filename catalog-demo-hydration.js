(() => {
  const root = document.querySelector('main[data-catalog-category="fleurs"]');
  const registry = window.WoodFlowerPresentation;
  if (!root || !registry) return;

  root.querySelectorAll('[data-product-id]').forEach((card) => {
    const entry = registry.get(card.dataset.productId);
    if (!entry) return;
    const image = card.querySelector('.product-art img');
    const description = card.querySelector('.product-body > p');
    if (image) {
      image.src = entry.image;
      image.alt = `Visuel de démonstration de la fleur ${entry.name}`;
      image.dataset.demoAsset = 'true';
    }
    if (description) description.textContent = entry.demoDescription;
    card.dataset.demoVisual = 'true';
  });
})();
