# CRO-199, CRO-205 et CRO-208 — langage du conseiller

## Périmètre

Ce lot ferme trois contrôles locaux du conseiller de la démo : le lexique
versionné, la traçabilité des correspondances et la mesure de phrases
sensorielles positives, négatives ou ambiguës.

## CRO-199 — lexique modifiable

`wood-advisor-lexicon.js` est chargé séparément avant le moteur. Il contient
une version, les catégories, les intensités, les notes et les thèmes bloqués.
Le moteur utilise ce fichier lorsqu'il est présent et garde un repli local pour
les tests isolés. Modifier le lexique ne demande donc pas de recompiler le
site : le fichier de configuration publié est relu au prochain chargement.

## CRO-205 — traçabilité

Chaque recommandation personnalisée expose dans `best.trace` et dans les
alternatives les champs `phrase`, `motif`, `field`, `source` et `state`.
Seuls les faits vérifiés entrent actuellement au classement ; leur état est
donc `verified`. Un état `proposed` reste réservé à une future source préparée
mais non publiée et ne peut pas être affiché comme une preuve.

## CRO-208 — matrice de précision

Le test couvre goût fruité, notes boisées, négations, intensité ambiguë,
atténuation, découverte et demande d'effet. Le jeu de test échoue si un cas
attendu n'est pas détecté ou si une demande interdite entre dans le classement.

Preuve exécutée :

```text
node --test test/cro-199-205-208-advisor-lexicon.test.mjs
```

Résultat : **3 tests réussis, 0 échec**. Le lot reste limité à la démo et ne
crée aucun attribut produit, prix, avis ou promesse commerciale.
