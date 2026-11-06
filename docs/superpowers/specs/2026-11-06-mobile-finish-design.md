# WOOD mobile finish — design

## Intention

Amener la démo WOOD à un niveau mobile premium, proche du rythme e-commerce de TealerLab tout en conservant l’identité WOOD : vert profond, lime, cloches en verre, humour, graffitis et présentation éditoriale.

Le mobile doit rester le même site que le desktop dans son histoire et ses repères, mais avec une composition tactile dédiée : moins de hauteur inutile, davantage d’images visibles, des rails qui donnent envie de glisser, des réactions au toucher et une navigation qui ne masque jamais le contenu.

## Objectifs

- Réduire la longueur mobile sans supprimer les séquences WOOD importantes.
- Donner à chaque rail un indice tactile visible et une progression lisible.
- Rendre les animations perceptibles sur écran tactile sans dépendre du survol.
- Réserver l’espace de la barre mobile et la masquer pendant la lecture descendante.
- Garantir des contrôles tactiles d’au moins 44 × 44 px.
- Renforcer les graffitis comme ponctuation de composition, sans recouvrir textes, prix ou CTA.
- Préserver les garde-fous de la démo : photos et données commerciales restent identifiées comme démonstration.

## Hors objectifs

- Ne pas inventer de prix, stocks, promotions, avis ou photos propriétaires.
- Ne pas modifier l’identité visuelle desktop ni les parcours métier.
- Ne pas ajouter de dépendance JavaScript ou de librairie d’animation.

## Approches considérées

1. **Réécriture mobile complète** — offrirait un contrôle maximal, mais dupliquerait le contenu et créerait un risque de divergence desktop/mobile.
2. **Couche mobile dédiée sur le HTML actuel** — conserve le contenu et les contrats existants, tout en permettant de recomposer les sections avec CSS et quelques comportements natifs. C’est l’approche retenue.
3. **Framework ou librairie d’animation** — donnerait plus d’effets, mais alourdirait une démo statique et compliquerait le fallback reduced-motion.

## Décisions

- Créer `wood-mobile-finish.css` après les feuilles existantes afin d’isoler les réglages mobiles.
- Créer `wood-mobile-finish.js` pour les rails tactiles, les indications de geste et le masquage directionnel de la barre mobile.
- Garder les rails de preuves/avis sans flèches ni compteur ; leur fondu reste automatique.
- Utiliser `IntersectionObserver`, `matchMedia`, CSS scroll-snap et événements passifs uniquement.
- Tester les largeurs 360, 375, 390, 430 et 1440 px, ainsi que reduced-motion et overflow horizontal.

## Critères d’acceptation

- La page mobile ne présente aucun débordement horizontal au niveau racine.
- La barre basse ne recouvre pas durablement la lecture et réserve la zone sûre du téléphone.
- Les cartes `Univers`, `Runway`, `Packs` et communauté retrouvent un rythme compact ou tactile.
- Les indices de glissement restent visibles sans flèches dans la zone des avis.
- Les boutons et onglets interactifs font au moins 44 × 44 px.
- Le toucher déclenche un feedback visuel ; reduced-motion supprime les transformations et transitions.
- Les tests statiques et la vérification navigateur passent avant publication.
