# TXW-044 — Galerie boutique WOOD

Statut : validé pour la démo locale, avec fallback explicite en attendant les
photos réutilisables de la propriétaire.

## Comportement livré

- La zone `#boutique` réserve trois emplacements stables : façade noire WOOD,
  plantes et étagères en bois.
- Chaque emplacement utilise actuellement une image éditoriale de démonstration
  et porte l'étiquette `PHOTO BOUTIQUE À REMPLACER`.
- Le texte distingue clairement le fallback démo d'une photo réelle validée ;
  aucune façade, plante ou étagère existante n'est présentée comme photographiée.
- La grille devient un rail tactile local sous 760 px, sans créer de
  débordement horizontal global. Les transitions s'arrêtent avec
  `prefers-reduced-motion`.
- Le remplacement futur conserve la même structure, le ratio, l'alt et la
  légende de chaque emplacement.

## Vérifications

- `node --test test/store-gallery-contract.test.mjs` : **2/2**.
- La galerie est rattachée à la section boutiques et reste dans le bundle
  GitHub Pages existant, sans nouvelle dépendance ni donnée commerciale.

## Limite conservée

Les photos authentiques de façade, de plantes et d'étagères restent à fournir
et à autoriser par WOOD. Elles ne sont pas inventées dans la démo.
