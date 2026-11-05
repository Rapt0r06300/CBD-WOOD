(() => {
  // Registre local de démonstration : les noms restent ceux validés par WOOD.
  // Les images sont des visuels de maquette et devront être remplacées par les
  // photos réelles de la boutique avant toute mise en production.
  const entries = {
    'fleurs-nimbus-3000': {
      name: 'Nimbus 3000',
      image: 'assets/flowers/fleurs-nimbus-3000.webp',
      demoDescription: 'Une présence aérienne, une silhouette nette et une mise en scène qui ouvre la sélection WOOD. ☁️',
    },
    'fleurs-ivory': {
      name: 'Ivory',
      image: 'assets/flowers/fleurs-ivory.webp',
      demoDescription: 'Une présentation claire et minérale, douce à regarder, pensée pour prendre le temps. 🤍',
    },
    'fleurs-velvet-kush': {
      name: 'Velvet Kush',
      image: 'assets/flowers/fleurs-velvet-kush.webp',
      demoDescription: 'Dense, sombre, texturée : une fiche qui joue la carte du velours sans perdre la précision. 🟣',
    },
    'fleurs-pastraweed': {
      name: 'Pastraweed',
      image: 'assets/flowers/fleurs-pastraweed.webp',
      demoDescription: 'Un profil visuel franc, une silhouette expressive et une touche graphique contrôlée. 🎨',
    },
    'fleurs-euphoria': {
      name: 'Euphoria',
      image: 'assets/flowers/fleurs-euphoria.webp',
      demoDescription: 'Une lumière plus vive, une mise en scène fraîche et un caractère qui attire l’œil. ✨',
    },
    'fleurs-purple': {
      name: 'Purple',
      image: 'assets/flowers/fleurs-purple.webp',
      demoDescription: 'Une profondeur plus sombre, une palette feutrée et un détail à découvrir en gros plan. 💜',
    },
    'fleurs-bloody-mary': {
      name: 'Bloody Mary',
      image: 'assets/flowers/fleurs-bloody-mary.webp',
      demoDescription: 'Une présence marquée, des détails cuivrés et une direction visuelle plus théâtrale. 🍷',
    },
    'fleurs-cosmic-cbg': {
      name: 'Cosmic CBG',
      image: 'assets/flowers/fleurs-cosmic-cbg.webp',
      demoDescription: 'Un détail doré, une ambiance nocturne et un visuel qui invite à regarder de plus près. 🌌',
    },
    'fleurs-charlotte': {
      name: 'Charlotte',
      image: 'assets/flowers/fleurs-charlotte.webp',
      demoDescription: 'Une silhouette fine, un rendu calme et une présentation qui laisse respirer l’image. 🌿',
    },
    'fleurs-rainbow': {
      name: 'Rainbow',
      image: 'assets/flowers/fleurs-rainbow.webp',
      demoDescription: 'Un reflet discret, une énergie plus joueuse, toujours dans le cadre WOOD. 🌈',
    },
    'fleurs-orange-bud': {
      name: 'Orange Bud',
      image: 'assets/flowers/fleurs-orange-bud.webp',
      demoDescription: 'Une lumière ambrée et une direction artistique chaleureuse pour cette présentation WOOD. 🍊',
    },
    'fleurs-plutonium': {
      name: 'Plutonium',
      image: 'assets/flowers/fleurs-plutonium.webp',
      demoDescription: 'Une composition dense, une lumière minérale et une présence presque futuriste. 🛰️',
    },
    'fleurs-fanta-hazy': {
      name: 'Fanta Hazy',
      image: 'assets/flowers/fleurs-fanta-hazy.webp',
      demoDescription: 'Une brume douce, une lumière solaire et une fiche plus légère pour terminer la sélection. 🍊',
    },
  };

  const frozenEntries = Object.freeze(Object.fromEntries(
    Object.entries(entries).map(([id, entry]) => [id, Object.freeze({ ...entry })]),
  ));
  const api = Object.freeze({
    get: (id) => frozenEntries[id] || null,
    all: () => frozenEntries,
  });

  if (typeof window !== 'undefined') window.WoodFlowerPresentation = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
