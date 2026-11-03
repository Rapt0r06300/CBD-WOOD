(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.WoodFlowerPricing = factory();
}(typeof window !== 'undefined' ? window : globalThis, function () {
  function normalizeTiers(tiers) {
    return (Array.isArray(tiers) ? tiers : [])
      .map(tier => ({ grams: Math.round(Number(tier.grams)), price: Number(tier.price) }))
      .filter(tier => tier.grams > 0 && Number.isFinite(tier.price) && tier.price >= 0)
      .sort((a, b) => b.grams - a.grams);
  }

  function calculateFlowerPrice(grams, tiers) {
    const target = Math.max(1, Math.round(Number(grams) || 1));
    if (target > 50) return { price: '', breakdown: [] };
    const availableTiers = normalizeTiers(tiers);
    if (!availableTiers.length) return { price: '', breakdown: [] };

    const best = Array.from({ length: target + 1 }, () => null);
    best[0] = { price: 0, packCount: 0, breakdown: [] };
    for (let amount = 1; amount <= target; amount += 1) {
      availableTiers.forEach(tier => {
        if (tier.grams > amount || !best[amount - tier.grams]) return;
        const previous = best[amount - tier.grams];
        const candidate = {
          price: previous.price + tier.price,
          packCount: previous.packCount + 1,
          breakdown: [...previous.breakdown, tier.grams],
        };
        const current = best[amount];
        if (!current || candidate.price < current.price || (candidate.price === current.price && candidate.packCount < current.packCount)) {
          best[amount] = candidate;
        }
      });
    }
    if (!best[target]) return { price: '', breakdown: [] };
    return { ...best[target], breakdown: [...best[target].breakdown].sort((a, b) => b - a) };
  }

  return { calculateFlowerPrice };
}));
