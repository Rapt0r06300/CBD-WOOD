const ownerProductCategories = new Set(['fleurs', 'resines', 'bien-etre', 'wood-shop']);
const flowerTierGrams = [1, 3, 5, 10, 25];

export function validateProductDraft({ name, category, priceValue = '', stockValue, tiers = [] }) {
  if (!String(name ?? '').trim()) return 'Renseigne le nom du produit.';
  if (!ownerProductCategories.has(category)) return 'Choisis une catégorie valide.';
  if (String(stockValue ?? '').trim() === '') return 'Renseigne le stock disponible.';
  const stock = Number(stockValue);
  if (!Number.isSafeInteger(stock) || stock < 0) return 'Le stock doit être un nombre entier positif ou nul.';

  if (String(priceValue ?? '').trim() !== '') {
    const priceCents = Math.round(Number(priceValue) * 100);
    if (!Number.isFinite(priceCents) || priceCents < 0) return 'Le prix doit être valide ou laissé vide.';
  }

  if (category === 'fleurs') {
    const hasExactTiers = tiers.length === flowerTierGrams.length
      && tiers.every((tier, index) => tier.grams === flowerTierGrams[index]
        && tier.value !== ''
        && Number.isFinite(tier.price_cents)
        && tier.price_cents >= 0);
    if (!hasExactTiers) return 'Renseigne les cinq tarifs fleurs : 1 g, 3 g, 5 g, 10 g et 25 g.';
  }
  return '';
}
