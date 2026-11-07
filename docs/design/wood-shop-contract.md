# Contrat de la boutique textile et goods WOOD

Statut : contrat local versionné. La page WOOD Shop reste navigable et lisible avant la validation des modèles, tailles, matières, photos, prix et stocks réels ; elle ne doit produire aucune disponibilité ou promesse commerciale inventée.

## Périmètre et source

Le périmètre couvre `wood-shop.html`, `storefront.js`, `boutique.js`, `product-detail.js`, l'illustration `accessoires.svg`, `mobile-shell.js` et les styles partagés du catalogue. La page HTML fournit une structure de démonstration ; les futures références viendront des décisions WOOD validées puis de Supabase publié.

Les trois entrées actuelles sont `T-shirt WOOD`, `Vêtement WOOD` et `Produit dérivé`. Les libellés `T-SHIRT / À VALIDER`, `APPAREL / À VALIDER` et `GOODS / À VALIDER` signalent un périmètre de présentation, pas des articles disponibles. Aucun modèle, logo imprimé, matière, taille, fournisseur ou usage ne doit être déduit de l'illustration conceptuelle.

## Familles visibles dans la démo

La démo regroupe ces cartes en deux familles éditoriales explicites :
`TEXTILE WOOD` pour les vêtements et `OBJETS & ACCESSOIRES` pour les goods.
Cette séparation clarifie le parcours sans créer de nouvelles références. Les
trois cartes restent des placeholders non achetables et conservent leurs états
« à valider » ; une future sous-catégorie ne sera publiée qu'avec une donnée
WOOD approuvée.

## Références et données manquantes

Chaque carte expose un nom, une description neutre, un statut et un CTA désactivé. Les tailles, coupes, matières, couleurs, photos réelles, prix, stocks, délais et conditions de commande restent à renseigner avant publication. `Prix à renseigner`, `Disponibilité boutique` et `Fiche à compléter` sont des états lisibles, non des variantes commerciales.

Une référence future doit fournir sa catégorie, son média autorisé, ses variantes et tailles, son état de publication, son prix valide, son stock entier et ses textes approuvés. Tant que l'une de ces données manque, la carte reste consultable mais non achetable ; aucun `data-price`, `data-stock` ou `data-available` ne doit être ajouté par approximation.

## Parcours et états

Le chemin public est `WOOD Shop → fiche générique → retour au catalogue`. Une fiche générique ne devient achetable qu'après filtrage d'une référence publiée de la catégorie `wood-shop`, avec prix et stock confirmés. Sans ces données, elle affiche `Disponibilité à confirmer` et conserve un retour explicite vers la boutique.

Le chargement, l'état vide, l'erreur réseau et le fallback média conservent la catégorie, le nom et la raison de l'indisponibilité. Les cartes actuelles restent marquées `data-product-unavailable`, leurs boutons sont désactivés et le panier refuse toute tentative. Une double action rapide ne doit créer ni ligne ni promesse de commande.

## Responsive, accessibilité et sécurité

- Ordinateur : trois cartes de hauteur stable, une illustration WOOD distincte et un statut proche de chaque action.
- Tablette : la grille partagée se resserre sans masquer le statut, la description ou le lien de contact.
- Mobile : deux colonnes puis une colonne étroite, textes contenus, CTA indisponibles non focalisables et navigation basse compatible avec les zones sûres.

Les labels et textes alternatifs restent descriptifs ; les états ne reposent jamais sur la couleur seule. Les futures données sont filtrées par catégorie et publication, protégées par RLS et les garde-fous de commande. Aucun secret, stock privé, paiement Viva actif ou détail de production n'est exposé sur la page publique.

## Preuve, revue et rollback

La preuve locale est constituée par `test/wood-shop-contract.test.mjs`, `test/product-availability.test.mjs`, `test/product-detail.test.mjs`, `test/catalog-contract.test.mjs`, les suites de liens, accessibilité, responsive et sécurité, ainsi que `npm run check`.

La propriétaire et son conjoint doivent valider les modèles, tailles, matières, photos, prix, stocks, formulations et conditions de commande. Les navigateurs et appareils réels restent une validation séparée. Pour revenir en arrière, restaurer `wood-shop.html`, les scripts et styles partagés vers le snapshot validé, puis rejouer `npm run check`. Le rollback ne touche ni comptes, ni produits validés, ni stocks, ni commandes, ni secrets, ni migrations.
