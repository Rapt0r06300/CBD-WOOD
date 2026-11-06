# Contrat de sélection produits sur l'accueil WOOD

Statut : contrat local versionné. Les cartes d'accueil sont une présentation de démonstration et ne valent ni validation des références, ni promesse de stock, ni activation d'une vente.

## Périmètre et sources

La sélection concernée est la section `#selection-wood` de `index.html`, actuellement composée de quatre cartes fleurs. Le registre d'assets et `flower-presentation.js` portent les visuels et leurs descriptions de démonstration ; `catalog-demo-hydration.js` conserve le fallback et réhydrate les interactions après un rendu Supabase ; `home-selection.css` porte la géométrie de la grille.

Les cartes utilisent les mêmes illustrations WebP que la boutique fleurs, mais leurs noms, badges, descriptions, prix et stocks ne doivent pas être interprétés comme des données commerciales approuvées. Une vraie référence ne remplace une carte démo qu'après validation de la source Supabase, du prix, du stock, de la disponibilité, du média et des droits associés.

## Carte et parcours

Chaque carte expose une image, la mention `PHOTO DÉMO`, des badges WOOD, un nom lisible, une courte description et un lien vers la fiche. La sélection sert à découvrir un univers et à rejoindre la fiche ; elle ne crée pas un bouton d'achat autonome ni une fausse quantité en stock. Le client peut ensuite revenir au catalogue complet, au panier ou au checkout selon les données réellement publiées.

L'identité de la carte reste WOOD : palette existante, logo officiel, typographie système, surfaces et bordures déjà livrées. Les inspirations de menu affiché, de rythme et de densité ne deviennent pas une affiche promotionnelle, un code promo ou une preuve sociale.

## Données, disponibilité et fallback

L'état `data-state="demo"` et la mention de démonstration restent visibles tant que les produits et photos réels ne sont pas approuvés. Les données absentes ou incomplètes produisent une carte consultable mais non achetable. Les états `available`, `soon`, `rupture` et `incomplete` sont annoncés par texte et attributs accessibles, jamais par la couleur seule.

Une image manquante revient à l'illustration botanique WOOD ou au visuel à venir ; un rendu Supabase ultérieur récupère les mêmes comportements sans double liaison. Le panier refuse toute carte indisponible et les doubles actions rapides ne doivent pas dupliquer une ligne.

## Responsive, interaction et accessibilité

- Ordinateur : quatre colonnes bornées, cartes de hauteur stable, visuel dominant et CTA de fiche atteignable.
- Tablette : deux colonnes avant tout écrasement, avec texte et badges contenus.
- Mobile : deux colonnes quand la largeur le permet, puis repli étroit sans débordement horizontal ; le nom, le statut et le lien restent lisibles.
- Interaction : survol fin, focus clavier et alternative tactile peuvent changer l'image, mais aucun geste n'est requis pour connaître le nom, l'état ou le lien.

Les cartes sont des liens nommés, les visuels ont un texte alternatif et la mention démo reste dans le contenu. Les transitions utilisent `transform`, `opacity`, bordure ou ombre ; `prefers-reduced-motion: reduce` désactive le mouvement sans supprimer la carte, le focus ou le parcours.

## Preuve, revue et rollback

La preuve locale est constituée par `test/selection-contract.test.mjs`, `test/store-demo-media.test.mjs`, `test/product-availability.test.mjs`, les tests de carte et d'accessibilité, ainsi que la vérification Playwright de l'accueil et de la fiche. Le contrat couvre la cohérence des quatre visuels, le statut démo, la grille responsive, le fallback et la réhydratation.

La décision de publier les noms, visuels et références réelles doit encore être revue par la propriétaire et son conjoint. Les navigateurs et appareils réels restent à tester séparément ; aucune preuve Chromium locale ne vaut acceptation universelle.

Pour revenir en arrière, restaurer `index.html`, `home-selection.css`, `catalog-demo-hydration.js` et le registre d'assets vers la version validée, puis rejouer `npm run check`. Le rollback ne modifie ni produits, ni stocks, ni commandes, ni comptes, ni secrets, ni migrations.
