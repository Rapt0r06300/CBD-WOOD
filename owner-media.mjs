const categoryFallbacks = {
  fleurs: 'assets/fleurs.svg',
  resines: 'assets/resines.svg',
  'bien-etre': 'assets/cosmetiques.svg',
  'wood-shop': 'assets/accessoires.svg',
};

const demoFlowerSlugs = new Set([
  'bloody-mary',
  'charlotte',
  'cosmic-cbg',
  'euphoria',
  'fanta-hazy',
  'ivory',
  'nimbus-3000',
  'orange-bud',
  'pastraweed',
  'plutonium',
  'purple',
  'rainbow',
  'velvet-kush',
]);

const safeRelativeAsset = value => /^(?:\.\/)?assets\/[a-z0-9_./-]+$/iu.test(value) ? value.replace(/^\.\//u, '') : '';

export function getOwnerMediaStatus(product = {}) {
  const imagePath = String(product.image_path || '').trim();
  return imagePath
    ? { kind: 'configured', label: 'Photo renseignée' }
    : { kind: 'missing', label: 'Photo à fournir' };
}

export function getOwnerMediaPreview(product = {}) {
  const name = String(product.name || product.slug || 'produit WOOD').trim();
  const suppliedPath = safeRelativeAsset(String(product.image_path || '').trim());
  if (suppliedPath) return { src: suppliedPath, alt: `Photo de ${name}`, isDemo: false };
  const slug = String(product.slug || '').trim().toLowerCase();
  const demoPath = product.category === 'fleurs' && demoFlowerSlugs.has(slug)
    ? `assets/flowers/fleurs-${slug}.webp`
    : categoryFallbacks[product.category] || 'assets/wood-mark.svg';
  return { src: demoPath, alt: `Illustration de démonstration de ${name}`, isDemo: true };
}
