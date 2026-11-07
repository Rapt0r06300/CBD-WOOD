(() => {
  'use strict';

  // Source structurée du catalogue de démonstration. Elle alimente les fiches
  // et les prix de maquette ; elle ne constitue jamais une source commerciale.
  const products = [
    ['fleurs-nimbus-3000', 'Nimbus 3000', 'assets/flowers/fleurs-nimbus-3000.webp', 'Une présence aérienne, une silhouette nette et une mise en scène qui ouvre la sélection WOOD. ☁️', [[1, 15], [3, 42], [5, 70], [10, 130], [25, 260]]],
    ['fleurs-ivory', 'Ivory', 'assets/flowers/fleurs-ivory.webp', 'Une présentation claire et minérale, douce à regarder, pensée pour prendre le temps. 🤍', [[1, 15], [3, 42], [5, 70], [10, 130], [25, 260]]],
    ['fleurs-velvet-kush', 'Velvet Kush', 'assets/flowers/fleurs-velvet-kush.webp', 'Dense, sombre, texturée : une fiche qui joue la carte du velours sans perdre la précision. 🟣', [[1, 12], [3, 34], [5, 55], [10, 100], [25, 200]]],
    ['fleurs-pastraweed', 'Pastraweed', 'assets/flowers/fleurs-pastraweed.webp', 'Un profil visuel franc, une silhouette expressive et une touche graphique contrôlée. 🎨', [[1, 12], [3, 34], [5, 55], [10, 100], [25, 200]]],
    ['fleurs-euphoria', 'Euphoria', 'assets/flowers/fleurs-euphoria.webp', 'Une lumière plus vive, une mise en scène fraîche et un caractère qui attire l’œil. ✨', [[1, 12], [3, 34], [5, 55], [10, 100], [25, 200]]],
    ['fleurs-purple', 'Purple', 'assets/flowers/fleurs-purple.webp', 'Une profondeur plus sombre, une palette feutrée et un détail à découvrir en gros plan. 💜', [[1, 11], [3, 30], [5, 50], [10, 100], [25, 180]]],
    ['fleurs-bloody-mary', 'Bloody Mary', 'assets/flowers/fleurs-bloody-mary.webp', 'Une présence marquée, des détails cuivrés et une direction visuelle plus théâtrale. 🍷', [[1, 10], [3, 28], [5, 45], [10, 80], [25, 160]]],
    ['fleurs-cosmic-cbg', 'Cosmic CBG', 'assets/flowers/fleurs-cosmic-cbg.webp', 'Un détail doré, une ambiance nocturne et un visuel qui invite à regarder de plus près. 🌌', [[1, 10], [3, 28], [5, 45], [10, 80], [25, 160]]],
    ['fleurs-charlotte', 'Charlotte', 'assets/flowers/fleurs-charlotte.webp', 'Une silhouette fine, un rendu calme et une présentation qui laisse respirer l’image. 🌿', [[1, 10], [3, 28], [5, 45], [10, 80], [25, 160]]],
    ['fleurs-rainbow', 'Rainbow', 'assets/flowers/fleurs-rainbow.webp', 'Un reflet discret, une énergie plus joueuse, toujours dans le cadre WOOD. 🌈', [[1, 8], [3, 22], [5, 35], [10, 60], [25, 120]]],
    ['fleurs-orange-bud', 'Orange Bud', 'assets/flowers/fleurs-orange-bud.webp', 'Une lumière ambrée et une direction artistique chaleureuse pour cette présentation WOOD. 🍊', [[1, 7], [3, 20], [5, 30], [10, 50], [25, 100]]],
    ['fleurs-plutonium', 'Plutonium', 'assets/flowers/fleurs-plutonium.webp', 'Une composition dense, une lumière minérale et une présence presque futuriste. 🛰️', [[1, 7], [3, 20], [5, 30], [10, 50], [25, 100]]],
    ['fleurs-fanta-hazy', 'Fanta Hazy', 'assets/flowers/fleurs-fanta-hazy.webp', 'Une brume douce, une lumière solaire et une fiche plus légère pour terminer la sélection. 🍊', [[1, 6], [3, 16], [5, 25], [10, 40], [25, 80]]],
  ].map(([id, name, image, demoDescription, tiers]) => ({
    id,
    category: 'fleurs',
    name,
    image,
    altImage: 'assets/editorial/wood-jar-detail.webp',
    demoDescription,
    tiers: tiers.map(([grams, price]) => Object.freeze({ grams, price })),
    status: 'demo',
  }));

  const frozenProducts = Object.freeze(products.map((product) => Object.freeze({
    ...product,
    tiers: Object.freeze(product.tiers),
  })));
  const byId = new Map(frozenProducts.map((product) => [product.id, product]));
  const api = Object.freeze({
    version: 'wood-demo-catalog-v1',
    status: 'demo-fixture',
    commerciallyActive: false,
    all: () => frozenProducts,
    get: (id) => byId.get(String(id || '')) || null,
    getTiers: (id) => byId.get(String(id || ''))?.tiers || [],
  });

  if (typeof window !== 'undefined') window.WoodDemoCatalog = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
