# Contrat des cartes produit WOOD

Statut : contrat local versionné. Les cartes reprennent la richesse de lecture de la carte WOOD fournie comme inspiration, mais restent des composants HTML accessibles, pilotés par des données validées et distincts de toute copie graphique ou promesse commerciale non approuvée.

## Périmètre et hiérarchie

Le périmètre couvre les cartes des quatre univers publics, en particulier `fleurs.html`, `resines.html`, `bien-etre.html` et `wood-shop.html`, ainsi que `storefront.js`, `boutique.js`, `product-detail.js` et les styles de grille. Une carte expose dans un ordre stable le visuel, le repère de catégorie, les badges éventuels, le nom, la description, le grammage ou la métadonnée utile, le prix ou statut, puis l'action.

La direction WOOD peut conserver une énergie dessinée, des profils lisibles, des pictogrammes accompagnés d'un libellé et une séparation forte des univers. Elle ne remplace ni le logo officiel, ni la typographie fonctionnelle, ni les données du catalogue. Les profils, tarifs et noms sont ceux de la source validée ; l'inspiration TealerLab n'est jamais copiée comme interface ou contenu.

## Données et états

Les attributs `data-product-id`, `data-product-name`, `data-product-category`, `data-product-price` et `data-availability-state` relient la carte à sa source. Les états reconnus sont `available`, `soon`, `rupture` et `incomplete`. Une carte achetable exige un prix positif, un stock positif et un état `available` ; sinon elle reste visible avec un libellé textuel et un bouton désactivé marqué `aria-disabled` et `data-product-unavailable`.

Pour les fleurs, les paliers validés alimentent le sélecteur de grammage et le prix affiché ; un palier non validé reste visible mais non facturable. Pour les autres univers, prix, stock, média et statut doivent être publiés ensemble. Une image manquante reçoit le fallback WOOD et un texte alternatif descriptif ; aucune illustration ne crée un niveau, une qualité, un avis ou une promotion.

## Parcours et interaction

Une carte navigable mène à la fiche correspondante. Le clic ou le clavier sur la surface ouvre cette fiche uniquement quand l'événement ne vient pas d'un bouton, d'un sélecteur, d'un lien ou d'un contrôle de grammage. Le contrôle `Ajouter` reste indépendant, conserve son feedback local et ne peut pas contourner la disponibilité, le prix validé ou l'idempotence du panier.

Après un rendu Supabase, les cartes recréées récupèrent les mêmes comportements sans double liaison. Le chargement, l'état vide, l'erreur, le fallback et la rupture conservent la structure de lecture et annoncent le manque par du texte. Le mouvement reste décoratif, borné à `transform`/`opacity` et désactivable avec `prefers-reduced-motion`.

## Responsive, accessibilité et sécurité

- Ordinateur : grille bornée, visuel dominant, badges et prix alignés sans écraser le nom ou l'action.
- Tablette : densité réduite sans supprimer le statut, le grammage ou le retour de fiche.
- Mobile : deux colonnes puis une colonne étroite, titres contenus sur deux lignes, action maintenue dans la colonne et zones sûres respectées.

Les contrôles possèdent des labels, les images des alternatives, les statuts une formulation textuelle et les cibles tactiles une taille exploitable. Les cartes ne révèlent aucune donnée privée ; le filtrage par catégorie et publication, RLS, validation serveur, CORS et idempotence restent les barrières de commande. Le décor saisonnier et les accents peuvent être retirés sans modifier produits, prix, stocks ou panier.

## Preuve, revue et rollback

La preuve locale est constituée par `test/wood-product-card-contract.test.mjs`, `test/catalog-contract.test.mjs`, `test/catalog-grid.test.mjs`, `test/product-availability.test.mjs`, `test/store-demo-media.test.mjs`, les suites responsive, accessibilité, motion et sécurité, ainsi que `docs/design/wood-card-audit.md`.

La propriétaire et son conjoint doivent valider les profils, pictogrammes, photos, noms, prix, stocks et toute adaptation graphique. Les navigateurs et appareils réels restent une validation séparée. Pour revenir en arrière, restaurer les templates, `storefront.js`, `boutique.js` et les styles vers le snapshot validé, puis rejouer `npm run check`. Le rollback ne touche ni comptes, ni commandes, ni secrets, ni migrations.
