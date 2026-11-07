(() => {
  'use strict';

  // Les paliers viennent de la même fixture que les fiches fleurs. Ils restent
  // volontairement inactifs côté production tant que WOOD ne les a pas validés.
  let source = typeof window !== 'undefined' ? window.WoodDemoCatalog : null;
  if (!source && typeof require === 'function') {
    try {
      source = require('./wood-demo-catalog.js');
    } catch {
      source = null;
    }
  }

  const api = Object.freeze({
    status: 'demo-fixture',
    commerciallyActive: false,
    getTiers: (id) => source?.getTiers?.(id) || [],
    has: (id) => (source?.getTiers?.(id) || []).length > 0,
  });
  if (typeof window !== 'undefined') window.WoodPriceSource = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
