# Contrat des accents graphiques WOOD

Statut : contrat local versionné. Les graphismes originaux, stickers, graffiti, emojis et touches d'humour sont des accents optionnels ; ils renforcent WOOD sans changer sa palette, sa lisibilité ou ses frontières commerciales.

## Périmètre et intention

Le périmètre couvre les accents du hero, les intertitres, les zones éditoriales, les états de découverte, les textures, pictogrammes et futurs stickers. `docs/design/wood-accent-grammar.md`, `docs/design/wood-direction-register.md` et `docs/design/wood-visual-library.md` sont les sources de vérité ; le logo officiel, les cartes tarifaires, le checkout et les informations légales restent hors de ce décor.

L'inspiration peut reprendre une énergie faite main, une texture papier ou un rythme chill, mais aucun texte, placement, logo, asset ou visuel concurrent n'est copié. Une planche `conservé / adapté / exclu` doit précéder une intégration généralisée ; les exemples non validés restent des propositions de démonstration.

## Règles WOOD et zones interdites

La base de chaque écran reste premium, calme et lisible. Un accent est ancré à son bloc, jamais au viewport, et ne recouvre ni un titre, ni un lien, ni un bouton, ni un prix. Les prix, stocks, grammages, disponibilité, boutons d'achat, formulaires, paiement, livraison, erreurs et mentions légales restent sobres, textuels et compréhensibles sans sticker, emoji ou couleur décorative.

Un emoji est facultatif et ne remplace jamais un libellé, une unité, un niveau ou une action. L'humour reste court, adulte et sans promesse médicale ou commerciale ; chaque phrase possède une formulation neutre de repli. Aucun accent ne crée une promotion, un code, un avis, un compteur, un widget, une collecte de données ou un accès propriétaire.

## États, fallback et motion

Le chargement, l'absence d'asset, l'erreur et le mode faible donnée gardent le contenu direct et retirent l'accent sans casser la section. Les médias décoratifs ont une origine, une version, un statut et des droits ; un fichier absent ou refusé revient à une forme CSS ou à un texte neutre.

Les révélations et micro-interactions restent composées, bornées et interrompables. `prefers-reduced-motion: reduce` supprime les déplacements, rotations et effets non essentiels sans supprimer le contenu, le focus ou les actions. Une répétition ou un double clic ne doit jamais déclencher une action commerciale supplémentaire.

## Responsive, accessibilité et sécurité

- Ordinateur : l'accent peut donner du rythme au hero ou à un intertitre sans déplacer la grille ni les actions.
- Tablette : les formes restent dans leur bloc, sans chevaucher les titres, cartes ou barres système.
- Mobile : les accents peuvent être masqués ou simplifiés ; le texte, les liens, les états et la navigation restent complets dans les zones sûres.

Les contrastes, alternatives textuelles, ordre clavier et cibles tactiles restent indépendants du décor. Les accents ne chargent aucun script tiers, traceur, cookie, donnée client ou secret. Leur retrait ne modifie ni produits, ni prix, ni stocks, ni commandes, ni routes publiques.

## Preuve, revue et rollback

La proposition locale est implémentée par les classes optionnelles de `responsive.css` (`wood-accent-rule`, `wood-accent-frame`, `wood-sticker`) et par `docs/design/wood-visual-library.md`. La preuve locale est constituée par `test/wood-accents-contract.test.mjs`, `test/design-foundation.test.mjs`, `test/direction-register.test.mjs`, `test/public-visual-guardrails.test.mjs`, `test/motion-guardrails.test.mjs` et `npm run check`.

La propriétaire et son conjoint doivent valider la planche, les formes, les textes, les éventuels emojis, l'origine, les droits et le dosage par route. Les navigateurs et appareils réels restent une validation séparée. Pour revenir en arrière, retirer l'accent ou restaurer le snapshot du bloc concerné, puis rejouer `npm run check`. Le rollback ne touche ni données commerciales, ni comptes, ni commandes, ni secrets, ni migrations.
