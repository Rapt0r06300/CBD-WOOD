# Contrat de la boutique résines WOOD

Statut : contrat local versionné. La page résines prépare une structure de catalogue sans inventer de référence, photo, prix, stock ou disponibilité tant que la propriétaire ne les a pas validés.

## Périmètre et source

Le périmètre couvre `resines.html`, `storefront.js`, `boutique.js`, `product-detail.js`, `mobile-shell.js` et les styles de catalogue. La page HTML fournit uniquement des cartes de structure et des visuels conceptuels ; les données commerciales futures viendront de Supabase après validation de la source, du média, du prix, du stock et de l'état de publication.

Les trois entrées actuelles — sélection résine, texture du moment et découverte WOOD — sont des placeholders explicites. Elles ne doivent pas être présentées comme des produits réels ni comme des best-sellers, et aucun nom de fournisseur ou attribut de qualité ne doit être déduit de l'illustration abstraite.

## Références et données manquantes

Chaque carte affiche son univers, une description de ce qui reste à renseigner et un statut lisible (`Prix à renseigner`, disponibilité boutique ou fiche à compléter). Aucun `data-price`, `data-stock` ou `data-available` n'est ajouté tant que la donnée n'est pas confirmée. Un statut absent, incomplet ou en erreur garde la carte consultable mais non achetable.

Le catalogue de secours ne peut pas remplacer Supabase comme source commerciale. Une future référence publiée doit fournir un nom, une catégorie, un état de publication, un prix valide, un stock entier, un média autorisé et les informations nécessaires à la fiche générique. Sinon, le CTA reste désactivé et le panier refuse la carte.

## Parcours et états

Le chemin prévu est `résines → fiche générique → retour au catalogue`, avec une entrée possible depuis les univers et le footer. La fiche générique peut afficher une disponibilité à confirmer et des tarifs par paliers si les données publiées le permettent ; elle ne promet pas un achat lorsque le prix ou le stock manque.

Le chargement, l'état vide, l'erreur réseau et le fallback image conservent le titre, l'univers et le statut non achetable. Un double clic rapide ne crée aucune ligne. Les transitions de carte restent composées et le repli reduced-motion conserve le contenu et l'accès clavier.

## Responsive, accessibilité et sécurité

- Ordinateur : trois cartes de hauteur stable, avec visuel conceptuel, nom, description et état.
- Tablette : la grille partagée se resserre sans masquer le statut ni le CTA désactivé.
- Mobile : deux colonnes puis une colonne étroite, textes contenus et boutons non focalisables quand ils sont indisponibles.

Les images conceptuelles ont un texte alternatif, les états sont écrits et les boutons portent `disabled`, `aria-disabled` et le marqueur d'indisponibilité. Les données Supabase sont filtrées par catégorie et statut publié dans la fiche générique ; RLS, fonctions de commande, CORS et limites d'idempotence protègent les écritures. Aucun secret, prix inventé ou état Viva n'est exposé.

## Preuve, revue et rollback

La preuve locale est constituée par `test/resin-shop-contract.test.mjs`, `test/product-availability.test.mjs`, `test/product-detail.test.mjs`, les suites de catalogue, responsive, accessibilité et sécurité. Elle vérifie trois cartes non achetables, l'absence de champs commerciaux inventés et la destination générique.

La propriétaire et son conjoint doivent encore valider les références, médias, prix et profils. Les navigateurs et appareils réels restent une validation distincte. Pour revenir en arrière, restaurer `resines.html`, `storefront.js`, `product-detail.js` et les styles vers le snapshot validé, puis rejouer `npm run check`. Le rollback ne touche ni comptes, ni produits validés, ni stocks, ni commandes, ni secrets, ni migrations.
