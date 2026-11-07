(() => {
  'use strict';

  const source = window.WoodPriceSource;
  if (!source) return;

  document.querySelectorAll('main[data-catalog-category="fleurs"] [data-product-id]').forEach((card) => {
    const tiers = source.getTiers(card.dataset.productId);
    const select = card.querySelector('[data-product-weight]');
    if (!tiers.length || !select) return;
    select.replaceChildren(...tiers.map(({ grams, price }) => {
      const option = document.createElement('option');
      option.value = `${grams}g`;
      option.dataset.label = `${grams} g`;
      option.dataset.price = String(price);
      option.textContent = `${grams} g · ${Number(price).toFixed(2).replace('.', ',')} €`;
      return option;
    }));
    card.dataset.priceSource = 'wood-demo-fixture';
    const label = card.querySelector('[data-product-price-label]');
    if (label) label.textContent = `${Number(tiers[0].price).toFixed(2).replace('.', ',')} €`;
  });
})();
