# Contrat de la boutique bien-être WOOD

Statut : contrat local versionné. La catégorie reste navigable et lisible avant la réception des photos et données commerciales réelles ; elle ne doit pas produire d'allégation médicale, de prix ou de stock inventé.

## Périmètre et source

Le périmètre couvre `bien-etre.html`, `storefront.js`, `boutique.js`, `product-detail.js`, les assets `cosmetiques.svg`, `mobile-shell.js` et les styles partagés. La page HTML fournit une structure de démonstration ; les références réelles, précautions, usages, prix, stocks et statuts viendront des sources WOOD validées puis de Supabase publié.

Les trois entrées actuelles sont `Cosmétiques`, `Huiles` et `Soins`. Leur illustration est conceptuelle et leur carte reste un placeholder. Aucun bénéfice santé, effet garanti, traitement, médicament ou conseil médical ne doit être déduit d'un nom, d'une image ou d'une phrase éditoriale.

## Références et contenu réglementaire

Chaque carte expose un nom, une description neutre, un statut et un CTA indisponible. Les prix, stocks, photos réelles, usages détaillés, précautions, composition et informations réglementaires restent à renseigner avant publication. La notice rappelle que les fiches seront finalisées avec les références réelles et les informations validées par la propriétaire.

Une référence future doit être publiée avec sa catégorie, son média autorisé, son état de disponibilité, son prix, son stock et ses textes validés. Le contenu doit distinguer présentation cosmétique, huile et soin sans promettre de résultat physiologique. Les labels et textes alternatifs restent descriptifs et sans diagnostic.

## Parcours et états

Le chemin prévu est `bien-être → fiche générique → retour au catalogue`. Une fiche peut afficher `Disponibilité à confirmer` et une grille de prix seulement après réception des données publiées ; sans prix ou stock, elle reste consultable mais non achetable.

Le chargement, l'état vide, l'erreur réseau et le fallback média conservent la catégorie, le nom et l'explication du manque. Les cartes restent marquées `data-product-unavailable`, leurs boutons sont désactivés et le panier refuse toute tentative. Les doubles actions ne créent aucune ligne et le reduced-motion conserve le contenu.

## Responsive, accessibilité et sécurité

- Ordinateur : trois cartes de hauteur stable et un visuel botanique conceptuel.
- Tablette : la grille partagée se resserre sans écraser les statuts ni la notice réglementaire.
- Mobile : deux colonnes puis une colonne étroite, textes contenus, boutons désactivés non focalisables et lien de contact atteignable.

Les images ont des textes alternatifs, les états sont écrits sans couleur seule et les cartes génériques sont navigables au clavier et au toucher. Les données publiées sont filtrées par catégorie et statut, protégées par RLS et les garde-fous de commande. Aucun secret, paiement Viva ou conseil de santé n'est exposé.

## Preuve, revue et rollback

La preuve locale est constituée par `test/wellness-shop-contract.test.mjs`, `test/product-availability.test.mjs`, `test/product-detail.test.mjs`, `test/catalog-contract.test.mjs`, les suites accessibilité/responsive/sécurité et la vérification de la page avant achat.

La propriétaire et son conjoint doivent valider les références, photos, précautions, formulations et informations réglementaires. Les navigateurs et appareils réels restent une validation séparée. Pour revenir en arrière, restaurer `bien-etre.html`, les scripts et styles partagés vers le snapshot validé, puis rejouer `npm run check`. Le rollback ne touche ni comptes, ni produits, ni stocks, ni commandes, ni secrets, ni migrations.
