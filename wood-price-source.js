(() => {
  'use strict';

  // Fixture tarifaire de démonstration : la source commerciale réelle reste
  // Supabase et ne doit être activée qu'après validation WOOD.
  const tiers = Object.freeze({
    'fleurs-nimbus-3000': [[1, 15], [3, 42], [5, 70], [10, 130], [25, 260]],
    'fleurs-ivory': [[1, 15], [3, 42], [5, 70], [10, 130], [25, 260]],
    'fleurs-velvet-kush': [[1, 12], [3, 34], [5, 55], [10, 100], [25, 200]],
    'fleurs-pastraweed': [[1, 12], [3, 34], [5, 55], [10, 100], [25, 200]],
    'fleurs-euphoria': [[1, 12], [3, 34], [5, 55], [10, 100], [25, 200]],
    'fleurs-purple': [[1, 11], [3, 30], [5, 50], [10, 100], [25, 180]],
    'fleurs-bloody-mary': [[1, 10], [3, 28], [5, 45], [10, 80], [25, 160]],
    'fleurs-cosmic-cbg': [[1, 10], [3, 28], [5, 45], [10, 80], [25, 160]],
    'fleurs-charlotte': [[1, 10], [3, 28], [5, 45], [10, 80], [25, 160]],
    'fleurs-rainbow': [[1, 8], [3, 22], [5, 35], [10, 60], [25, 120]],
    'fleurs-orange-bud': [[1, 7], [3, 20], [5, 30], [10, 50], [25, 100]],
    'fleurs-plutonium': [[1, 7], [3, 20], [5, 30], [10, 50], [25, 100]],
    'fleurs-fanta-hazy': [[1, 6], [3, 16], [5, 25], [10, 40], [25, 80]],
  });

  const getTiers = (id) => {
    const values = tiers[String(id || '')];
    if (!values) return [];
    return values.map(([grams, price]) => ({ grams, price }));
  };

  const api = Object.freeze({
    status: 'demo-fixture',
    getTiers,
    has: (id) => getTiers(id).length > 0,
  });
  if (typeof window !== 'undefined') window.WoodPriceSource = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
