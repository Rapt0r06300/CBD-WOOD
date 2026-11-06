# Contrat du premier écran WOOD

Statut : contrat local versionné. Le hero reprend des mécanismes d'entrée et de rythme observés dans l'audit TealerLab, mais ne constitue ni une copie de leur identité ni une validation finale de la maquette WOOD.

## Périmètre et source de vérité

Le premier écran de référence est la section `.hero` de `index.html`. Son identité vient du registre de direction WOOD, sa composition est décrite par `docs/design/wood-home-storyboard.md`, ses garde-fous d'inspiration viennent de `docs/design/tealerlab-wood-homepage-audit-2026-11-05.md`, et ses règles de rendu sont portées par les styles de l'accueil, `responsive.css`, `home-engagement.css` et `home-selection.css`.

Le hero expose un message WOOD, un média de démonstration remplaçable, un CTA d'exploration et un lien de descente vers les univers. Le logo, les couleurs, la typographie et la carte WOOD restent ceux déjà livrés. Le premier écran ne devient pas une zone de promotion, de preuve sociale ou de paiement.

## Composition et parcours

La hiérarchie est `kicker → h1 → phrase courte → action`. Le chemin nominal est :

`accueil → découvrir WOOD ou descendre vers les univers → boutique → fiche produit → panier → checkout`.

Le lien de descente reste un lien simple vers `#univers`, utilisable au clavier et au toucher. Aucun script ne capture le scroll pour permettre d'acheter, et aucun aperçu flottant ne recouvre le premier écran. Les quatre univers structurels sont présents tôt dans la page et leurs visuels sont chargés immédiatement pour que l'accueil reste compréhensible même si les sections éditoriales sont remplacées.

Le hero peut reprendre un rythme de campagne, un ticker ou une variation visuelle légère, mais un seul moment d'impact est autorisé. Les zones prix, stock, disponibilité, livraison, paiement et légal restent en dehors de tout décor et ne dépendent pas du hero pour être compris.

## Données, états et fallback

Les textes de marque sont des contenus WOOD versionnés. Les visuels présents dans la démo sont explicitement marqués comme illustrations de démonstration ; ils ne sont ni des photos commerciales réelles ni une preuve de stock. Une image future doit recevoir une origine, une version, un statut `demo` ou `approved` et un texte alternatif avant publication.

Le chargement, l'absence de média, l'erreur de média et le fallback conservent le titre, le message et l'action. Une image absente ne crée pas un espace interactif trompeur et ne déplace pas le parcours d'achat. Les aperçus d'offre et d'activité restent `data-demo-only`, sans code promo, nom de client, commande ou achat inventé ; ils peuvent être masqués jusqu'à la lecture de la page et n'ont aucune valeur commerciale.

## Responsive, accessibilité et motion

- Ordinateur : la composition en deux zones garde un titre lisible, un média dominant et une action atteignable sans débordement.
- Tablette : la grille et les espacements se resserrent avant tout chevauchement ; la navigation et le CTA restent atteignables.
- Mobile : le hero s'empile, le premier écran reste libre de tout aperçu flottant, les visuels structurels apparaissent sans dépendre d'un long défilement et les univers deviennent des cartes tactiles.
- Safe areas : le contenu garde ses marges sous les barres système et n'est jamais ancré au-dessus de la navigation ou d'une action critique.

Le titre est un vrai `h1`, les liens portent un nom explicite et les images reçoivent un texte alternatif selon le registre. L'information ne dépend jamais d'une couleur, d'un sticker, d'un emoji, d'un survol ou d'une animation. Les transitions restent composées (`transform`, `opacity`, bordure, ombre) ; `prefers-reduced-motion: reduce` supprime les mouvements sans supprimer le contenu, le focus ou les actions.

## Preuve et rollback

La preuve locale est constituée par `test/hero-contract.test.mjs`, `test/homepage-shell.test.mjs`, `test/engagement-preview.test.mjs`, les tests responsive/accessibilité et la vérification Playwright du premier écran mobile et du parcours d'accueil. Les quatre visuels structurels sont vérifiés comme `loading="eager"` et les aperçus démo comme masqués avant lecture.

La validation Safari, Firefox et appareils réels reste externe. La décision finale de conserver cette adaptation et son niveau d'impact doit être revue par la propriétaire et son conjoint ; elle n'est pas déduite du test local.

Pour revenir en arrière, restaurer `index.html`, les styles d'accueil et `wood-engagement.js` vers le snapshot de site validé, puis rejouer `npm run check`. Le rollback ne supprime ni données client, ni stocks, ni commandes, ni rôles, ni secrets, ni migrations.
