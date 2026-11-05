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

## Largeurs contrôlées

Le navigateur Playwright a parcouru chaque parcours à `320`, `375`, `390`, `430`, `768`, `1024` et `1440` CSS px avec une hauteur de `900` px.

Résultat : chaque page a conservé `scrollWidth === clientWidth`; aucun débordement horizontal n’a été détecté sur les 56 combinaisons.

Des captures de référence ont également été produites à `320` et `1440` px dans la session Playwright `wood-roadmap`, sous `.playwright-cli/roadmap-*.png`. Ces artefacts restent locaux et ne contiennent aucune donnée client.

## Contrôles complémentaires

- Les tests automatisés du dépôt passent (`159 tests`).
- La syntaxe JavaScript et l’audit statique passent.
- Le paquet Hostinger est généré et contrôlé avant transfert.
- La version publique répond sur les routes principales ; la route historique `admin.html` répond `404`.
- Une vérification Playwright réelle en `390 × 844` a recontrôlé les neuf routes publiques : largeur du document égale à la fenêtre, navigation mobile présente et titres principaux chargés. Sur `fleurs.html`, les largeurs `375`, `390` et `430` affichent deux colonnes équilibrées ; `320` bascule proprement à une colonne, sans débordement et avec les boutons contenus dans les cartes.
- Après le déploiement du commit `512afd8`, un contrôle live a confirmé le CSS mobile à deux colonnes, le bandeau de livraison de `fleurs.html`, les réponses HTTP attendues et l’absence de `/admin.html`.
- Le même contrôle navigateur a vérifié `fleurs.html` à `1440`, `1024` et `768` px : trois colonnes régulières, 13 cartes présentes et aucune largeur de document supérieure à la fenêtre.

## Limite de cette preuve

Les captures prouvent la géométrie et l’absence de débordement dans un navigateur contrôlé. Elles ne valent pas validation finale des photos, des stocks, des règles de livraison, des textes légaux ou de la direction graffiti de la propriétaire.
