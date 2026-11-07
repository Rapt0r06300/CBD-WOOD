# Contrat photo des produits WOOD

Statut : contrat local versionné. Les visuels actuels montrent la structure de la démo ; ils ne deviennent pas des photos commerciales réelles sans source, autorisation, contrôle et validation de la propriétaire.

## Périmètre et statut des médias

Le périmètre couvre les 13 visuels fleurs de `flower-presentation.js`, le registre `docs/design/wood-asset-register.md`, le brief `docs/design/wood-photo-brief.md`, `storefront.js`, `flower-detail.js`, `product-detail.js` et les fallbacks du catalogue. Chaque entrée conserve un nom, un chemin, un usage, une origine, un statut `demo` ou `approved` et un texte alternatif.

Les WebP actuelles restent `demo` et servent à vérifier la composition, le poids, le cadrage et le parcours. Une future photo `approved` doit correspondre au produit et à l'univers annoncés, être sourcée et autorisée, puis être validée avant publication. Le chemin ou la présence d'un fichier ne prouve ni une photo réelle, ni une qualité, ni un stock.

## Direction photo et formats

Pour une photo approuvée, le sujet est le produit réel seul, sans bocal,
cloche, sachet, emballage, main, accessoire d'une autre marque, watermark ou
texte parasite. La démo peut toutefois utiliser une présentation sous cloche
en verre comme scène éditoriale WOOD : cet état reste explicitement `demo`, ne
prouve ni une photo actuelle ni une disponibilité, et doit être accompagné
d'une deuxième vue nette hors cloche. La lumière, le fond et la couleur restent
compatibles avec WOOD sans créer une nouvelle palette. Le brief impose les usages
`1:1` pour la carte, `4:5` ou portrait pour la fiche mobile et `3:2` ou `4:5`
pour la fiche desktop, avec export WebP et fallback JPEG/PNG.

Les exports conservent l'original haute définition à part, la source, l'autorisation, la date, les dimensions, le poids, le ratio, le statut et l'alt text. Le nommage et le registre permettent un remplacement fichier par fichier. Une photo ne change jamais le HTML d'achat, le nom, le prix, le grammage, le stock ou le lien de fiche.

## Raccordement et états de secours

Le registre de présentation est consommé avant le rendu des cartes et fiches ; la même référence peut donc recevoir une scène `demo-cloche`, une vue `demo-clean-view`, puis une photo `approved-real-photo`, sans changer son identifiant. Une image absente, lente ou en erreur masque le média cassé, affiche le fallback WOOD et conserve le nom, le statut, le texte alternatif et l'action applicable. La seconde vue ne dépend jamais d'un hover.

Le catalogue et la fiche restent utilisables sans `IntersectionObserver`, sur réseau lent et en `prefers-reduced-motion`. Un statut `demo` ne rend pas une carte achetable ; les données prix/stock/disponibilité restent soumises aux gardes de catalogue et de commande. Le remplacement ne doit pas créer de double chargement, de saut de mise en page ou de nouvelle promesse commerciale.

## Responsive, accessibilité et sécurité

- Ordinateur : le sujet reste net dans la carte, la grille et la fiche sans recadrer le point focal.
- Tablette : le ratio et la zone sûre sont conservés dans la grille resserrée.
- Mobile : la carte carrée et le portrait restent lisibles à 320–430 px, avec alternative textuelle et fallback visible si besoin.

Les images ont un texte alternatif descriptif, les médias décoratifs sont distingués des médias produit et aucune information n'est transmise par la couleur seule. Les fichiers publics ne contiennent ni secret ni donnée client ; les droits et la source sont vérifiés avant publication. Les transitions de révélation ou de zoom restent composées et désactivables.

## Preuve, revue et rollback

La preuve locale est constituée par `test/wood-product-photo-contract.test.mjs`, `test/asset-register.test.mjs`, `test/asset-quality.test.mjs`, `test/flower-presentation.test.mjs`, `test/store-demo-media.test.mjs`, les suites fallback/responsive/accessibilité et `npm run check`.

La propriétaire et son conjoint doivent valider le produit photographié, le cadrage, la lumière, les droits, le texte alternatif et le passage de `demo` à `approved`. Les navigateurs et appareils réels restent une validation séparée. Pour revenir en arrière, restaurer le chemin et le statut précédents dans le registre, puis rejouer `npm run check`. Le rollback ne touche ni produits, ni prix, ni stocks, ni commandes, ni comptes, ni secrets, ni migrations.
