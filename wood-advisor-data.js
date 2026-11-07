(function attachAdvisorData(root) {
  const unknownFacts = Object.freeze([
    { key: 'notes', value: null, verified: false, source: null },
    { key: 'aromaIntensity', value: null, verified: false, source: null },
  ]);

  const product = (id, name, href) => Object.freeze({
    id,
    name,
    href,
    facts: unknownFacts,
  });

  const categories = Object.freeze([
    Object.freeze({
      slug: 'fleurs',
      label: 'Fleurs',
      eyebrow: 'La sélection botanique',
      href: 'fleurs.html',
      products: Object.freeze([
        product('fleurs-nimbus-3000', 'Nimbus 3000', 'fleur.html?produit=fleurs-nimbus-3000'),
        product('fleurs-ivory', 'Ivory', 'fleur.html?produit=fleurs-ivory'),
        product('fleurs-velvet-kush', 'Velvet Kush', 'fleur.html?produit=fleurs-velvet-kush'),
        product('fleurs-pastraweed', 'Pastraweed', 'fleur.html?produit=fleurs-pastraweed'),
        product('fleurs-euphoria', 'Euphoria', 'fleur.html?produit=fleurs-euphoria'),
      ]),
    }),
    Object.freeze({
      slug: 'resines',
      label: 'Résines',
      eyebrow: 'La matière sous verre',
      href: 'resines.html',
      products: Object.freeze([
        product('resines-selection', 'Sélection résine', 'resines.html'),
        product('resines-texture', 'La texture du moment', 'resines.html'),
        product('resines-decouverte', 'Découverte WOOD', 'resines.html'),
      ]),
    }),
    Object.freeze({
      slug: 'bien-etre',
      label: 'Bien-être',
      eyebrow: 'Cosmétiques, huiles & soins',
      href: 'bien-etre.html',
      products: Object.freeze([
        product('bienetre-cosmetiques', 'Cosmétiques', 'bien-etre.html'),
        product('bienetre-huiles', 'Huiles', 'bien-etre.html'),
        product('bienetre-soins', 'Soins', 'bien-etre.html'),
      ]),
    }),
    Object.freeze({
      slug: 'wood-shop',
      label: 'WOOD Shop',
      eyebrow: 'Objets & pièces WOOD',
      href: 'wood-shop.html',
      products: Object.freeze([
        product('woodshop-tshirt', 'T-shirt WOOD', 'wood-shop.html'),
        product('woodshop-apparel', 'Vêtement WOOD', 'wood-shop.html'),
        product('woodshop-goods', 'Produit dérivé', 'wood-shop.html'),
      ]),
    }),
  ]);

  const api = Object.freeze({
    categories,
    products: Object.freeze(categories.flatMap((category) => category.products.map((item) => Object.freeze({ ...item, category: category.slug, categoryLabel: category.label })))),
  });

  if (root) root.WoodAdvisorData = api;
}(typeof window !== 'undefined' ? window : globalThis));
