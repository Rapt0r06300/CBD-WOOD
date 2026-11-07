# CRO-219 — pipeline d’import conseiller

Le script `scripts/build-wood-advisor-index.mjs` prend l’inventaire local comme
entrée unique, déduplique par `slug`, extrait les termes sensoriels présents
dans les champs éditoriaux, conserve la source exacte, prépare les règles de
badge et construit l’index de questions.

Les extractions issues d’un texte ne sont pas publiées automatiquement : elles
restent `needs_review` et `hidden`, avec `commercialWrites: false`. Le résultat
porte un checksum SHA-256 et reste stable quand le même inventaire est rejoué.
Le script réel a été exécuté sur l’inventaire WOOD : 22 produits locaux,
aucune écriture commerciale et aucune preuve sensorielle inventée.

Preuves exécutées :

```text
node --test test/cro-219-advisor-import-pipeline.test.mjs
node scripts/build-wood-advisor-index.mjs --output output/wood-advisor-index-demo.json
```

Résultat : **2 tests réussis, 0 échec** ; import réel idempotent et limité au
catalogue démo local.
