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

- Les tests automatisés du dépôt passent (`165 tests`).
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

## Limite de cette preuve

Les captures prouvent la géométrie et l’absence de débordement dans un navigateur contrôlé. Elles ne valent pas validation finale des photos, des stocks, des règles de livraison, des textes légaux ou de la direction graffiti de la propriétaire.
