# CRO-065 à CRO-067 — Prix démo, format et inconnus

## Décision

La démo possède une seule fixture tarifaire locale dans `wood-price-source.js`.
Elle fournit les cinq paliers validés de chacune des treize fleurs, en euros et
grammages explicites. Les cartes et la fiche fleur la lisent avant d'alimenter
les contrôles du panier local ; le format apparaît toujours avant la valeur.

Cette fixture n'est pas la source commerciale de production. En production,
Supabase reste la source de vérité après validation WOOD. Une référence absente
de la fixture renvoie une liste vide : aucun `0 €`, prix barré, fourchette ou
stock ne doit être déduit.

## Vérification

`test/cro-price-source.test.mjs` vérifie :

- 13 références fleurs et 5 paliers positifs chacune ;
- l'état vide pour une référence inconnue ;
- le branchement de la fixture sur cartes, fiche et hydration ;
- la séparation explicite entre fixture démo et source commerciale future.
