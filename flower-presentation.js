(() => {
  'use strict';

  // Le catalogue démo est chargé avant ce registre dans les pages publiques.
  // Le require garde les tests Node et les outils locaux sur la même source.
  let source = typeof window !== 'undefined' ? window.WoodDemoCatalog : null;
  if (!source && typeof require === 'function') {
    try {
      source = require('./wood-demo-catalog.js');
    } catch {
      source = null;
    }
  }

  const entries = Object.fromEntries((source?.all?.() || []).map((product) => [product.id, {
    name: product.name,
    image: product.image,
    demoDescription: product.demoDescription,
    altImage: product.altImage,
    altDescription: `Vue détail de démonstration de ${product.name} sous cloche`,
  }]));
  const frozenEntries = Object.freeze(Object.fromEntries(
    Object.entries(entries).map(([id, entry]) => [id, Object.freeze(entry)]),
  ));
  const api = Object.freeze({
    get: (id) => frozenEntries[id] || null,
    all: () => frozenEntries,
  });

  if (typeof window !== 'undefined') window.WoodFlowerPresentation = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
