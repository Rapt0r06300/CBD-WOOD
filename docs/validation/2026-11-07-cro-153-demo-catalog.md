# CRO-153 — Catalogue démo éditable par source

Date : 7 novembre 2026
Périmètre : site de démonstration WOOD uniquement.

## Source unique

`wood-demo-catalog.js` contient les 13 références fleurs de la démo, leur nom,
leur média, leur description, leur statut `demo` et les paliers de la fixture
de prix. Les données restent explicitement inactives commercialement.

Les vues `fleurs.html` et `fleur.html` chargent cette source avant
`flower-presentation.js` et `wood-price-source.js`. Le catalogue hydrate depuis
elle le visuel, le nom, la description, le libellé accessible et les paliers,
pendant que la fiche détail réutilise le même registre.

## Cohérence D1

La graine SQLite/D1 conserve les mêmes 13 identifiants et noms, sans prix ni
stock persistés. Le test de contrat échoue dès qu'une référence de la source
manque dans la graine ou qu'une page oublie le registre. La base de démo reste
donc un import de catalogue fictif, sans tables de commandes ou de paiement.

Preuve : `test/cro-153-demo-catalog.test.mjs`.

## Limite

Les données commerciales réelles restent dans la source propriétaire prévue
par le contrat contenu ; cette tâche ne rend aucun prix, stock ou achat réel
actif et ne remplace pas une validation WOOD.
