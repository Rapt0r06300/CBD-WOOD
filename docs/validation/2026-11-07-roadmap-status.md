# État sincère de la feuille de route — 7 novembre 2026

## Compteur réconcilié

Au commit `197b485`, l'inventaire source contient 371 tickets actifs :

- **249** cases `[x]` traçables avant ce ticket ;
- **115** cases `[ ]` encore ouvertes après le marquage de CRO-010 et CRO-011 ;
- **138** tâches différées conservées hors exécution active ;
- **509** tâches dans l'inventaire global.

Le compteur global vérifié après ces deux tickets était **256 / 509 — 50,29 %**.
Les deux validations précédemment présentes dans le ledger mais non rattachées
à une case ou à un identifiant de la feuille ne sont pas comptées. Elles restent
à réconcilier avant toute nouvelle progression créditée.

Le lot navigation/rythme `CRO-024`, `CRO-025`, `CRO-027` à `CRO-032` est
maintenant vérifié par `docs/validation/2026-11-07-cro-navigation-and-rhythm.md`
et son contrat automatisé. Le compteur courant est donc **264 / 509 — 51,87 %**,
avec **107** tickets actifs encore ouverts et **138 tâches différées**.

Le lot récit d’accueil `CRO-012`, `CRO-017`, `CRO-019` et `CRO-021` à
`CRO-023` est maintenant vérifié par `docs/validation/2026-11-07-cro-home-narrative.md`
et son contrat automatisé. Le compteur courant devient **270 / 509 — 53,05 %**,
avec **101** tickets actifs encore ouverts et **138 tâches différées**.

Le repli du hero `CRO-016` est livré et testé par
`docs/validation/2026-11-07-cro-hero-fallback.md`. Le compteur courant devient
**271 / 509 — 53,24 %**, avec **100** tickets actifs encore ouverts et
**138 tâches différées**.

Le lot démo `CRO-013`, `CRO-020`, `CRO-026`, `CRO-058`, `CRO-059`, `CRO-061`
et `CRO-129` est livré et vérifié par
`docs/validation/2026-11-07-cro-demo-detail-batch.md`. Le compteur courant devient
**278 / 509 — 54,62 %**, avec **93** tickets actifs encore ouverts et
**138 tâches différées**.

Le lot photo/répétition `CRO-018`, `CRO-049` et `CRO-050` est livré et vérifié
par `docs/validation/2026-11-07-cro-photo-storyboard.md`. Le compteur courant
devient **281 / 509 — 55,21 %**, avec **90** tickets actifs encore ouverts et
**138 tâches différées**.

Le lot bibliothèque visuelle `CRO-130` à `CRO-133` est livré et vérifié par
`docs/validation/2026-11-07-cro-visual-library.md`. Le compteur courant devient
**285 / 509 — 55,99 %**, avec **86** tickets actifs encore ouverts et
**138 tâches différées**.

Le guide démo `CRO-141` est complété dans
`docs/validation/2026-11-07-demo-advisor-recipe.md`. Le compteur courant devient
**286 / 509 — 56,19 %**, avec **85** tickets actifs encore ouverts et
**138 tâches différées**.

La cartographie des collections `CRO-143` est vérifiée par
`docs/validation/2026-11-07-cro-editorial-collections.md`. Le compteur courant
devient **287 / 509 — 56,39 %**, avec **84** tickets actifs encore ouverts et
**138 tâches différées**.

La mesure du premier viewport `CRO-014` est vérifiée par
`docs/validation/2026-11-07-cro-first-viewport-noise.md`. Le compteur courant
devient **288 / 509 — 56,58 %**, avec **83** tickets actifs encore ouverts et
**138 tâches différées**.

Le filtre par caractéristiques validées `CRO-038` est maintenant implémenté et
testé par `docs/validation/2026-11-07-cro-validated-characteristics.md`. Les
filtres type/texture/arôme restent invisibles tant qu'aucune carte ne porte une
source WOOD validée ; le compteur courant devient **289 / 509 — 56,78 %**, avec
**82** tickets actifs encore ouverts et **138 tâches différées**.

La matrice des preuves autorisées `CRO-073` est versionnée dans
`docs/design/wood-proof-evidence-matrix.md` et contrôlée par
`test/cro-proof-evidence.test.mjs`. Elle borne les avis Google, les photos et
les documents qualité sans les inventer ; le compteur courant devient **290 / 509
— 56,97 %**, avec **81** tickets actifs encore ouverts et **138 tâches
différées**.

Le module éditorial `CRO-080` « Pourquoi WOOD ? » est maintenant livré avec
trois preuves bornées — adresses, univers et accueil — dans
`index.html`, `wood-why.css`, `docs/validation/2026-11-07-cro-why-wood.md` et
`test/cro-why-wood.test.mjs`. Les visuels restent explicitement démo et chaque carte mène à une zone existante ; le compteur
courant devient **291 / 509 — 57,17 %**, avec **80** tickets actifs encore
ouverts et **138 tâches différées**.

Le guide non médical `CRO-077` est livré dans la démo avec trois accordéons
éditoriaux : présentation fleur/résine, lecture d'une carte WOOD et préparation
d'une visite. La preuve locale est `test/cro-wood-guide.test.mjs` et le rendu
mobile est documenté par `wood-guide.css` ; le compteur courant devient **292 / 509
— 57,37 %**, avec **79** tickets actifs encore ouverts et **138 tâches différées**.

La résilience `CRO-112` est vérifiée dans `docs/validation/2026-11-07-cro-112-resilience.md`
et `test/cro-112-resilience.test.mjs` : reduced-motion, faible donnée, cache
froid, image en erreur et indisponibilité D1 gardent un parcours local explicite.
Le compteur courant devient **293 / 509 — 57,56 %**, avec **78** tickets actifs
encore ouverts et **138 tâches différées**.

Le contrat prix démo `CRO-065` à `CRO-067` est livré dans
`wood-price-source.js` et contrôlé par `test/cro-price-source.test.mjs` : les
cartes et fiches fleurs utilisent la même fixture, les formats précèdent les
valeurs et les références inconnues restent à confirmer. Le compteur courant
devient **296 / 509 — 58,15 %**, avec **75** tickets actifs encore ouverts et
**138 tâches différées**.

Les contrôles multi-pages `CRO-072` et frontière démo `CRO-096` sont livrés
dans `test/cro-072-price-integrity.test.mjs` et
`test/cro-096-demo-boundary.test.mjs`, avec leurs preuves documentées. Les prix
restent cohérents entre carte/fiche/panier démo et la racine GitHub Pages reste
séparée de `/demo/`. Le compteur courant devient **298 / 509 — 58,55 %**, avec
**73** tickets actifs encore ouverts et **138 tâches différées**.

La capacité de mini-vues conditionnelles `CRO-046` est livrée dans
`wood-card-views.js` : les boutons n'apparaissent que pour des chemins WOOD
distincts et autorisés, donc aucun visuel démo n'est répété artificiellement.
Preuve : `test/cro-046-card-views.test.mjs`. Le compteur courant devient
**299 / 509 — 58,74 %**, avec **72** tickets actifs encore ouverts et **138
tâches différées**.

La comparaison visuelle `CRO-156` est livrée avec un manifeste de 24 vues
mobile/desktop, un comparateur SHA-256 et un renvoi explicite aux états
interactifs vérifiés séparément. Preuve : `docs/validation/2026-11-07-cro-156-visual-regression.md`
et `scripts/compare-visual-captures.mjs`. Le compteur courant devient
**300 / 509 — 58,94 %**, avec **71** tickets actifs encore ouverts et **138
tâches différées**.

Le registre des droits graphiques `CRO-157` est livré : chaque sticker ou
illustration dispose d'une source, d'un statut et d'une autorisation explicite.
Les références nécessitant la propriétaire restent `pending` et ne peuvent
pas être publiées comme officielles. Preuve :
`docs/validation/2026-11-07-cro-157-graphic-rights-registry.json` et
`test/cro-157-graphic-rights.test.mjs`. Le compteur courant devient
**301 / 509 — 59,14 %**, avec **70** tickets actifs encore ouverts et **138
tâches différées**.

Le conseiller explicable `CRO-222` est livré : la meilleure piste et deux
alternatives peuvent afficher des badges descriptifs portant leur raison et
leur source, uniquement à partir de faits vérifiés. Preuve :
`docs/validation/2026-11-07-cro-222-recommendation-badges.md` et
`test/cro-222-recommendation-badges.test.mjs`. Le compteur courant devient
**302 / 509 — 59,33 %**, avec **69** tickets actifs encore ouverts et **138
tâches différées**.

La matrice de combinaisons `CRO-223` est livrée : découverte, catégories,
notes, intensités, négations, ambiguïtés et demandes interdites restent
déterministes, bornées et limitées aux produits fournis. Preuve :
`docs/validation/2026-11-07-cro-223-advisor-combinations.md` et
`test/cro-223-advisor-combinations.test.mjs`. Le compteur courant devient
**303 / 509 — 59,53 %**, avec **68** tickets actifs encore ouverts et **138
tâches différées**.

Le rapport/rollback `CRO-226` est livré avec le suivi ID/état/tests/commit/
risque, les retours par commit et la frontière D1 désactivée par défaut.
Preuve : `docs/validation/2026-11-07-cro-226-report-rollback.md` et
`test/cro-226-report-rollback.test.mjs`. Le compteur courant devient
**304 / 509 — 59,72 %**, avec **67** tickets actifs encore ouverts et **138
tâches différées**.

Le lot langage du conseiller `CRO-199`, `CRO-205` et `CRO-208` est livré avec
un lexique séparé, une trace phrase/motif/source/état pour chaque match et une
matrice de précision sensorielle. Preuve :
`docs/validation/2026-11-07-cro-199-205-208-advisor-language.md` et
`test/cro-199-205-208-advisor-lexicon.test.mjs`. Le compteur courant devient
**307 / 509 — 60,31 %**, avec **64** tickets actifs encore ouverts et **138
tâches différées**.

La migration D1 de labels et lexique `CRO-220` est livrée et rejouée sur une
base SQLite fictive. Elle prépare les tables de termes, preuves, règles et
affectations avec versions, provenance et modes `hidden`/`demo`/`approved`.
Preuve : `docs/validation/2026-11-07-cro-220-advisor-label-migration.md` et
`test/cro-220-advisor-label-migration.test.mjs`. Le compteur courant devient
**308 / 509 — 60,51 %**, avec **63** tickets actifs encore ouverts et **138
tâches différées**.

La recette comportementale du conseiller `CRO-198` est vérifiée sur accueil et
fiche produit, en URL directe et à 390×844 : ouverture, fermeture, répétition,
résultat et défilement restent utilisables. Preuve :
`docs/validation/2026-11-07-cro-198-widget-behavior.md`,
`test/cro-198-widget-behavior.test.mjs` et la capture mobile associée. Le
compteur courant devient **309 / 509 — 60,71 %**, avec **62** tickets actifs
encore ouverts et **138 tâches différées**.

Le pipeline d’import conseiller `CRO-219` est livré et rejoué sur l’inventaire
local : déduplication, extraction, contrôle de source, règles de badges et
index questions restent bornés à la démo, avec revue obligatoire avant toute
publication. Preuve : `docs/validation/2026-11-07-cro-219-advisor-import-pipeline.md`,
`scripts/build-wood-advisor-index.mjs` et `test/cro-219-advisor-import-pipeline.test.mjs`.
Le compteur courant devient **310 / 509 — 60,90 %**, avec **61** tickets
actifs encore ouverts et **138 tâches différées**.

Le parcours visuel du conseiller `CRO-190` est documenté par quatre captures
locales : accueil compact/ouvert, fiche produit desktop après défilement et
fiche mobile 390×844. Le manifeste conserve les routes, états et viewports ;
la validation artistique propriétaire reste séparée. Preuve :
`docs/validation/2026-11-07-cro-190-widget-captures.md` et son manifeste. Le
compteur courant devient **311 / 509 — 61,10 %**, avec **60** tickets actifs
encore ouverts et **138 tâches différées**.

La barre d’action de fiche `CRO-107` est livrée dans la démo uniquement :
« Poser une question » et « Voir en boutique » restent au-dessus de la
navigation basse, avec safe areas et espace réservé. Les largeurs 320, 375,
390 et 430 px ont été vérifiées sans débordement ni recouvrement ; la
validation sur appareil physique reste séparée. Preuve :
`docs/validation/2026-11-07-cro-107-mobile-detail-action-bar.md` et
`test/cro-107-mobile-detail-action-bar.test.mjs`. Le compteur courant devient
**312 / 509 — 61,30 %**, avec **59** tickets actifs encore ouverts et
**138 tâches différées**.

Le bilan mesurable et réversible `CRO-128` est consigné dans
`docs/validation/2026-11-07-cro-128-measurable-reversible-report.md` : 521 tests,
commit de retour, séparation GitHub Pages et portes externes listées sans les
clôturer. Le compteur courant devient **313 / 509 — 61,49 %**, avec **58**
tickets actifs encore ouverts et **138 tâches différées**.

Le garde-fou cloud `CRO-120` est vérifié localement : D1 reste opt-in, le
Worker est en lecture seule, borné, cacheable et repliable sur le catalogue
local. OAuth, offre Free réelle et déploiement distant restent externes. Preuve :
`docs/validation/2026-11-07-cro-120-cloud-cost-fallback.md`. Le compteur
courant devient **314 / 509 — 61,69 %**, avec **57** tickets actifs encore
ouverts et **138 tâches différées**.

La présentation saisonnière `TXW-051` est maintenant préparée dans la démo :
`?wood-season=halloween` et `?wood-season=summer` activent une couche visuelle
réversible, sans toucher au catalogue ni publier de promotion. Sans paramètre,
la version WOOD permanente reste affichée. Preuve :
`docs/validation/2026-11-07-txw-051-seasonal-layer.md`. Le compteur courant
devient **315 / 509 — 61,89 %**, avec **56** tickets actifs encore ouverts et
**138 tâches différées**.

La galerie boutique `TXW-044` est maintenant structurée dans la démo avec trois
emplacements stables pour la façade, les plantes et les étagères en bois. Les
visuels actuels sont explicitement des fallbacks démo et pourront être remplacés
sans changer la mise en page dès réception des photos autorisées. Preuve :
`docs/validation/2026-11-07-txw-044-store-gallery.md`. Le compteur courant
devient **316 / 509 — 62,08 %**, avec **55** tickets actifs encore ouverts et
**138 tâches différées**.

La page bien-être reçoit une vraie scène éditoriale de démo pour les huiles,
cosmétiques et soins : matière, plantes suggérées, repères de conseil et
fallback explicite sont réunis sans allégation médicale. Preuve :
`docs/validation/2026-11-07-txw-065-wellbeing-scene.md`. Le compteur courant
devient **317 / 509 — 62,28 %**, avec **54** tickets actifs encore ouverts et
**138 tâches différées**.

Le lot `TXW-066` à `TXW-070` est maintenant couvert dans la démo : familles
Bien-être navigables, accessoires séparés, scène lifestyle WOOD Shop, galerie
textile et variantes taille/coloris désactivées tant que les données manquent.
Preuve : `docs/validation/2026-11-07-txw-066-070-care-shop.md`. Le compteur
courant devient **322 / 509 — 63,26 %**, avec **49** tickets actifs encore
ouverts et **138 tâches différées**.

La non-régression et le rollback local de `D1-024` sont maintenant validés :
`npm run check`, préparation GitHub Pages, vérification d'isolation base/démo,
bascule D1 désactivée par défaut et scénario d'arrêt du Worker sans suppression
de D1 ni de Supabase. Preuve :
`docs/validation/2026-11-07-d1-024-rollback.md` et
`test/d1-024-rollback.test.mjs`. Le compteur courant devient
**323 / 509 — 63,46 %**, avec **48** tickets actifs encore ouverts et
**138 tâches différées**.

La recette locale cross-device de `D1-023` est validée avec Playwright sur les
huit largeurs prévues, sans débordement, CLS mesuré à zéro, fallback d'image,
clavier, pointer tactile, focus et reduced-motion. Preuve :
`docs/validation/2026-11-07-d1-023-cross-device.md`, ses huit captures dans
`output/playwright/` et `test/d1-023-cross-device.test.mjs`. Les appareils
Safari iOS et Android réels restent explicitement séparés. Le compteur courant
devient **324 / 509 — 63,65 %**, avec **47** tickets actifs encore ouverts et
**138 tâches différées**.

Le handoff local `D1-025` est terminé avec les 25 statuts exacts, le bilan
**18 / 25 — 72,00 %** côté D1, les commits, les URLs Pages, les blocages OAuth
et la prochaine tâche automatique. Les validations Cloudflare distantes restent
ouvertes et aucun coût réel n'est déclaré confirmé. Preuve :
`docs/validation/wood-d1-free-progress.md` et
`test/d1-025-handoff.test.mjs`. Le compteur courant devient
**325 / 509 — 63,85 %**, avec **46** tickets actifs encore ouverts et
**138 tâches différées**.

Les tickets `CRO-087` et `CRO-088` sont validés pour la démo : la page
`rendez-vous.html` reprend l'ambiance WOOD, les deux adresses, les téléphones,
les itinéraires et le contact, avec un média explicitement marqué comme démo.
La recette couvre les deux entrées accueil → visite et fiche → visite, sans
géolocalisation forcée ni API cartographique intégrée. Preuve :
`docs/validation/2026-11-07-cro-087-088-visite.md` et
`test/cro-087-088-visit-page.test.mjs`. Le compteur courant devient
**327 / 509 — 64,24 %**, avec **44** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `TXW-009` est validé : une baseline locale complète est conservée
pour les 13 routes de démo en `390 × 844` et `1440 × 900`, avec des états menu
ouvert et panier vide. Elle est rattachée au commit `17a3c42` et distingue
explicitement la recette Chromium locale des validations Safari iOS, Android
réel et Firefox. Preuve :
`docs/validation/2026-11-07-txw-009-reference-captures.md` et
`test/txw-009-reference-captures.test.mjs`. Le compteur courant devient
**328 / 509 — 64,44 %**, avec **43** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `TXW-087` est validé par une recette Chromium locale de reflow à
200 % et 400 % sur l'accueil et la page rendez-vous : le `scrollWidth` reste
égal au viewport CSS, avec menus, boutons, cartes et footer rendus. La preuve
ne remplace pas les contrôles Safari/Dynamic Type sur appareil réel. Preuve :
`docs/validation/2026-11-07-txw-087-zoom.md` et
`test/txw-087-zoom.test.mjs`. Le compteur courant devient
**329 / 509 — 64,64 %**, avec **42** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `TXW-094` est validé par une double revue avant/après après reflow :
accueil, page visite et contact à texte long en `390 × 844` et `1440 × 900`,
avec menu mobile ouvert et panier vide. Les captures confirment que le
`scrollWidth` reste égal au viewport et qu'aucune action critique n'est coupée.
Preuve : `docs/validation/2026-11-07-txw-094-reflow-review.md` et
`test/txw-094-reflow-review.test.mjs`. Le compteur courant devient
**330 / 509 — 64,83 %**, avec **41** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `TXW-111` est validé : le paquet public est borné par une liste
blanche, le registre des assets WOOD trace source et autorisation, les images
distantes sont exclues et les références tierces restent limitées à la
documentation d'audit. L'asset WOOD encore soumis à validation propriétaire
reste explicitement `pending`. Preuve :
`docs/validation/2026-11-07-txw-111-third-party-sources.md` et
`test/txw-111-third-party-sources.test.mjs`. Le compteur courant devient
**331 / 509 — 65,03 %**, avec **40** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `CRO-015` est validé : le hero utilise une scène locale explicitement
marquée comme démonstration, sans preuve commerciale non sourcée ; les
coordonnées et les photos de boutique restent séparées dans leur page dédiée,
avec des fallbacks honnêtes. Preuve :
`docs/validation/2026-11-07-cro-015-local-proof.md` et
`test/cro-015-local-proof.test.mjs`. Le compteur courant devient
**332 / 509 — 65,23 %**, avec **39** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `CRO-054` est validé : les variantes `1:1`, `4:5` et `3:2` sont
préparées dans le contrat CSS avec un `object-position` ancré au média, une
recette 320–430 px et une zone sûre ; aucune donnée commerciale n'est embarquée
dans les images. Preuve :
`docs/validation/2026-11-07-cro-054-responsive-crops.md` et
`test/cro-054-responsive-crops.test.mjs`. Le compteur courant devient
**333 / 509 — 65,42 %**, avec **38** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `CRO-076` est validé : la page contact présente l'aide humaine,
trois usages concrets, le téléphone et la préparation de visite, tout en
laissant les noms et biographies dans un état « à valider ». Aucun titre ou
profil individuel n'est inventé. Preuve :
`test/cro-076-human-advice.test.mjs`. Le compteur courant devient
**334 / 509 — 65,62 %**, avec **37** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `TXW-088` est validé par une recette Chromium locale de taille de
texte simulée à 125 %, 150 % et 200 % sur l'accueil et la page rendez-vous,
en mobile et bureau. Le reflow garde le `scrollWidth` égal au viewport et
n'expose aucun texte coupé dans les conteneurs à overflow. Les cartes
« Pourquoi WOOD » passent en colonne sous 430 px pour préserver la largeur
de lecture. La preuve ne remplace pas Dynamic Type sur iPhone ou Android
réel. Preuve : `docs/validation/2026-11-07-txw-088-text-scaling.md` et
`test/txw-088-text-scaling.test.mjs`. Le compteur courant devient
**335 / 509 — 65,82 %**, avec **36** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `CRO-153` est validé : `wood-demo-catalog.js` devient la source
unique des 13 fleurs de démonstration, de leurs visuels, descriptions et
paliers inactifs. Les vues catalogue et fiche chargent ce registre avant leurs
hydrateurs, et la graine SQLite/D1 est contrôlée contre les mêmes identifiants
et noms sans prix ni stock persistés. Preuve :
`docs/validation/2026-11-07-cro-153-demo-catalog.md` et
`test/cro-153-demo-catalog.test.mjs`. Le compteur courant devient
**336 / 509 — 66,01 %**, avec **35** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `TXW-110` est validé : le site WOOD communiqué par la propriétaire,
le compte `@wood.cbdshop` et les variantes de logo reçues par Gmail sont
référencés avec leur source et leur statut. Le compte social reste `à
confirmer` et aucun lien officiel n'est activé automatiquement ; les visuels
transmis restent hors publication tant que leur approbation n'est pas
confirmée. Preuve : `docs/validation/2026-11-07-txw-110-brand-register.md` et
`test/txw-110-brand-register.test.mjs`. Le compteur courant devient
**337 / 509 — 66,21 %**, avec **34** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `CRO-055` est validé : les médias publics, les illustrations démo et
les pièces jointes propriétaires sont séparés par origine et statut. Le
registre conserve la source WOOD, interdit les médias tiers et exclut le
dossier local d'attente de la liste blanche GitHub Pages ; aucune photo reçue
n'est présentée comme approuvée. Preuve :
`docs/validation/2026-11-07-cro-055-visual-identity.md` et
`test/cro-055-visual-identity.test.mjs`. Le compteur courant devient
**338 / 509 — 66,41 %**, avec **33** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `TXW-086` est validé par une recette Firefox desktop locale à
1 440 × 900 sur le catalogue, la fiche fleur, le contact et l'accueil. Les
grilles, images, galerie, actions et formulaire restent contenus ; aucune
erreur console ou différence bloquante avec la recette Chromium n'a été
observée. La limite appareil réel reste explicitement ouverte. Preuve :
`docs/validation/2026-11-07-txw-086-firefox.md` et
`test/txw-086-firefox.test.mjs`. Le compteur courant devient
**339 / 509 — 66,60 %**, avec **32** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `CRO-053` est validé pour la préparation locale : la galerie
boutique possède maintenant cinq slots distincts — façade, plantes, étagères,
mur de stickers et accueil — chacun avec un état d'attente, un responsable,
un fallback démo et un garde-fou de droits. Les photos réelles restent à
fournir et autoriser par WOOD. Preuve :
`docs/validation/2026-11-07-cro-053-store-sequence.md` et
`test/cro-053-store-sequence.test.mjs`. Le compteur courant devient
**340 / 509 — 66,80 %**, avec **31** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `CRO-097` est validé pour la préparation de la démo : une matrice
sépare fleurs, résines, huiles, cosmétiques, comestibles et accessoires,
attribue l'état `pending`, nomme le bloqueur de publication et conserve la
validation propriétaire/conseil juridique comme porte de sortie. Aucune
qualification juridique n'est inventée et aucune catégorie n'est activée.
Preuve : `docs/validation/2026-11-07-cro-097-regulatory-category-matrix.md` et
`test/cro-097-regulatory-matrix.test.mjs`. Le compteur courant devient
**341 / 509 — 67,00 %**, avec **30** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `CRO-100` est validé pour la préparation de la démo : la porte de
conformité consommation recense vendeur, prix TTC, CGV, rétractation, livraison
et politique de confidentialité, tous en `pending` jusqu'aux sources et
validations requises. Le checkout reste explicitement une simulation locale,
sans paiement, commande commerciale ni e-mail réel. Preuve :
`docs/validation/2026-11-07-cro-100-consumer-compliance-gate.md` et
`test/cro-100-consumer-compliance.test.mjs`. Le compteur courant devient
**342 / 509 — 67,19 %**, avec **29** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `CRO-102` est validé pour la préparation locale : une matrice couvre
les fleurs, résines, huiles, cosmétiques, comestibles et accessoires, avec un
état `pending`, une règle de non-recours au simple pop-up et une validation
finale réservée au conseil juridique et à la propriétaire. Aucun contrôle d’âge
de production n’est prétendu actif dans la démo. Preuve :
`docs/validation/2026-11-07-cro-102-age-information.md` et
`test/cro-102-age-information.test.mjs`. Le compteur courant devient
**343 / 509 — 67,39 %**, avec **28** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `CRO-104` est validé pour le contrôle local de confidentialité : la
démo n'active aucun traceur non essentiel et ne transmet pas d'email, d'IP ou
d'identifiant à un service de mesure. Un registre des analytics futurs reste en
`pending` jusqu'à l'analyse CNIL, la preuve d'une base légale ou d'une
exemption, la décision de consentement et la procédure de suppression. Preuve :
`docs/validation/2026-11-07-cro-104-privacy-control.md` et
`test/cro-104-privacy-control.test.mjs`. Le compteur courant devient
**344 / 509 — 67,58 %**, avec **27** tickets actifs encore ouverts et
**138 tâches différées**.

Le ticket `CRO-099` est validé pour le contrôle local de la démo : les pages
publiques ne contiennent ni encouragement à un usage interdit ni garantie de
sécurité absolue. La revue juridique humaine des fleurs, résines, huiles,
cosmétiques, comestibles et accessoires reste `pending` avant toute publication
commerciale. Preuve : `docs/validation/2026-11-07-cro-099-sensitive-usage.md`
et `test/cro-099-sensitive-usage.test.mjs`. Le compteur courant devient
**345 / 509 — 67,78 %**, avec **26** tickets actifs encore ouverts et
**138 tâches différées**.

## Ce qui est prouvé

- le mode démo reste local et aucun paiement ou e-mail réel n'est activé ;
- la racine GitHub Pages et `/demo/` sont HTTP 200 et isolées ;
- les tests locaux, audits statique/readiness/continuité et captures Chromium
  sont documentés par commit et preuve ;
- les limites Safari/Android réels, avis Google à revalider, photos approuvées,
  droits, OAuth, Supabase production et publication commerciale restent ouvertes.

## Portes encore ouvertes

Les tickets externes ne sont pas convertis en DONE par la présence d'un
gabarit : validation propriétaire, appareil réel, compte Cloudflare/Gmail,
secrets, domaine, hébergement commercial et preuves source restent des portes
séparées.

Contrat : `test/roadmap-status.test.mjs`.
