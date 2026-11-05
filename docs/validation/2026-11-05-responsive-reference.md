# Référence responsive WOOD — 5 novembre 2026

Ce contrôle constitue la preuve de référence pour les tâches de capture, de grille et de non-débordement. Il ne remplace pas la validation visuelle de la propriétaire.

## Parcours contrôlés

- `index.html`
- `fleurs.html`
- `resines.html`
- `bien-etre.html`
- `wood-shop.html`
- `produit.html`
- `checkout.html`
- `compte.html`
- `confirmation.html`

## Largeurs contrôlées

Le navigateur Playwright a parcouru les dix parcours à `320`, `390`, `768` et `1440` CSS px avec une hauteur de `900` px, soit 40 combinaisons pour la passe la plus récente. Une passe complémentaire a contrôlé les mêmes routes en paysage (`844 × 390`), tablette (`900 × 768`) et desktop (`1366 × 768`), soit 30 combinaisons supplémentaires.

Résultat : chaque page a conservé `scrollWidth === clientWidth`; aucun débordement inattendu n’a été détecté. Les débordements intentionnels du ticker et du panneau panier transformé ont été exclus du contrôle des éléments visibles, tandis que la largeur globale du document et du body devait toujours rester exactement égale à la fenêtre.

Des captures de référence ont également été produites à `320` et `1440` px dans la session Playwright `wood-roadmap`, sous `.playwright-cli/roadmap-*.png`. Ces artefacts restent locaux et ne contiennent aucune donnée client.

## Contrôles complémentaires

- Les tests automatisés du dépôt passent (`177 tests`).
- La syntaxe JavaScript et l’audit statique passent.
- Le paquet Hostinger est généré et contrôlé avant transfert.
- La version publique répond sur les routes principales ; la route historique `admin.html` répond `404`.
- La fiche fleur propose trois recommandations `Même univers` dans une grille dédiée, sans promotion, avis ou preuve sociale inventée ; la fiche générique et la fiche fleur conservent leur bloc d’achat.
- La fiche générique ne laisse plus sa colonne de texte imposer une largeur minimale sur les téléphones étroits : la grille mobile utilise `minmax(0, 1fr)` et les éléments de contenu ont `min-width: 0`.
- Les pages publiques qui chargent `boutique.css` utilisent maintenant `wood-responsive-v7-20261105`, afin qu’un cache navigateur ou GitHub Pages ne conserve pas l’ancien CSS après correction.
- Une vérification Playwright réelle en `390 × 844` a recontrôlé les dix routes publiques : largeur du document égale à la fenêtre, navigation mobile présente et titres principaux chargés. Sur `fleurs.html`, les largeurs `390` affichent deux colonnes équilibrées et `320` bascule proprement à une colonne, sans débordement et avec les boutons contenus dans les cartes.
- Après le déploiement du commit de code `34eac62`, un contrôle live a confirmé le CSS mobile à deux colonnes, le bandeau de livraison de `fleurs.html`, les réponses HTTP attendues et l’absence de `/admin.html`.
- Le même contrôle navigateur a vérifié `fleurs.html` à `1440`, `1024` et `768` px : trois colonnes régulières, 13 cartes présentes et aucune largeur de document supérieure à la fenêtre.
- Les artefacts de capture locaux restent disponibles dans `output/`, mais sont explicitement ignorés par Git et ne font pas partie du paquet public.
- Le test `test/homepage-shell.test.mjs` vérifie l’ordre du shell d’accueil, les quatre univers, les deux CTA, la FAQ, les deux boutiques, le footer et l’absence de route admin publique.
- Une simulation réseau a retardé chaque image de `fleurs.html` de `1,2 s` à `390 px` : dès `DOMContentLoaded`, le titre, les 13 cartes, les 14 actions et la largeur de 390 px étaient déjà conservés, puis identiques après chargement des images.
- Une passe de robustesse a injecté un nom de produit très long, un prix à six chiffres et une question/réponse FAQ très longue à `320`, `390` et `768` px sur l’accueil, les quatre catalogues et la fiche fleur : le document et le body sont restés exactement à la largeur de la fenêtre et aucun titre ne débordait.
- Une passe accessibilité navigateur à `390 × 844` a parcouru l’accueil, les fleurs, le checkout et le compte : aucun contrôle visible sans nom accessible n’a été trouvé après prise en compte des labels associés, et 18 tabulations par route sont restées sur des éléments visibles. Les tailles des liens de texte et la validation lecteur d’écran restent à vérifier sur appareils réels.
- Une baseline de performance locale a relevé `DOMContentLoaded = 26 ms`, `FCP = 56 ms`, `CLS = 0` et `891 ms` pour la navigation accueil → fleurs dans le navigateur de contrôle. Ces valeurs sont indicatives et ne valent pas mesure de production.
- Une vérification de la boutique a relu les `data-tiers` après enhancement JavaScript : les 13 fleurs ont chacune cinq paliers et aucun écart avec la matrice WOOD issue de la carte (`1/3/5/10/25 g`). La même matrice est désormais protégée par un test permanent.
- Une passe de contraste a inspecté les textes visibles de l’accueil, des catalogues, du checkout et du compte à `390 px` ; le seul échec trouvé était le kicker de l’histoire à `3,85:1` sur le panneau clair. Sa couleur WOOD a été assombrie à `#3c6c36`, soit `4,97:1`, sans modifier la palette générale.
- Le contrôle `test/public-visual-guardrails.test.mjs` verrouille aussi l’absence de widgets/pop-ups concurrents, de retrait en boutique, de QR code et de promotion publique tant que ces éléments ne sont pas validés.
- La navigation mobile structurée a été rejouée dans le navigateur à `390 × 844` : le bouton `Les univers` ouvre un sous-menu de quatre liens, `Retour au menu` revient au niveau racine et le focus est restauré. À `1440 × 900`, les déclencheurs de sous-menu restent masqués et les quatre liens desktop historiques restent visibles ; le document et le body restent à `1440` px.
- Une matrice complémentaire a rejoué `fleurs.html` à `320`, `360`, `375`, `390`, `414`, `430`, `768`, `834`, `1024`, `1280`, `1440` et `1920` px : les 13 cartes sont présentes, la grille passe d’une colonne à deux puis trois, et le document/body restent exactement à la largeur de la fenêtre. Les orientations `844 × 390`, `900 × 768` et `1366 × 768` ont aussi été contrôlées sur l’accueil sans débordement. Cette preuve reste Chromium local et ne remplace pas une recette Safari/Firefox sur appareils réels.
- Le garde-fou de mouvement vérifie que les animations restent composées (`transform`/`opacity`), que le scroll n’est jamais intercepté et que `prefers-reduced-motion` conserve toutes les actions. Le chargement progressif garde des liens HTML directs si JavaScript ou un média échoue.
- Une passe console Chromium a parcouru les 10 routes publiques et n’a relevé ni `console.error` ni `pageerror`. Cette preuve concerne le navigateur local contrôlé ; les variantes Safari, Firefox, appareils réels et erreurs réseau restent distinctes.
- Les contrôles locaux de continuité couvrent aussi le panier conservé en cas de réseau indisponible, la clé d’idempotence, les snapshots de prix/adresse, le grade client par défaut, l’accès propriétaire confirmé par rôle et les refus RLS. La concurrence réelle de stock, la restauration et l’acceptation sur Supabase distant nécessitent encore un environnement de recette.

## Limite de cette preuve

Les captures prouvent la géométrie et l’absence de débordement dans un navigateur contrôlé. Elles ne valent pas validation finale des photos, des stocks, des règles de livraison, des textes légaux ou de la direction graffiti de la propriétaire.
