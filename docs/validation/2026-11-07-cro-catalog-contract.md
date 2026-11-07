# WOOD — contrat catalogue local et filtres honnêtes

Date : 7 novembre 2026

## Attributs réellement disponibles

| Univers | Recherche | Tri | Faits sensoriels | Filtres supplémentaires |
|---|---|---|---|---|
| Fleurs | nom, famille, texte de fiche | ordre WOOD / nom A–Z | non publiés sans source | aucun |
| Résines | nom, famille, texte de fiche | ordre WOOD / nom A–Z | non publiés sans source | aucun |
| Bien-être | nom, famille, texte de fiche | ordre WOOD / nom A–Z | non publiés sans source | aucun |
| WOOD Shop | nom, famille, texte de fiche | ordre WOOD / nom A–Z | non publiés sans source | aucun |

La démo ne rend donc aucun filtre « CBD % », origine, puissance ou arôme sans fait vérifié. Le conseiller reste séparé et ne transforme pas une absence de donnée en filtre catalogue.

## Contrat de recherche et tri

- La recherche est locale et fonctionne sans D1, sans Supabase et sans service payant.
- `q` et `sort=name` sont les seuls paramètres partageables ; aucune donnée privée n'est placée dans l'URL.
- Le tri par nom est alphabétique stable ; l'ordre WOOD revient à l'ordre de la source.
- Une recherche vide garde toutes les cartes et affiche leur nombre réel.
- Une recherche sans résultat propose Effacer, les autres univers et Contact.
- Les 13 fleurs restent une carte chacune ; les cinq grammages sont des variantes internes.
- Le prix au gramme apparaît seulement lorsque poids et tarif sont validés.

## Preuves

- `wood-catalog-search.js`
- `wood-catalog-search.css`
- `test/wood-catalog-search.test.mjs`
- `test/flower-shop-contract.test.mjs`
- `test/flower-pricing-guard.test.mjs`
- `test/rich-product-presentation.test.mjs`

## Statut

CRO-041, CRO-044, CRO-045 et CRO-048 sont vérifiables localement. CRO-042, CRO-043 et CRO-047 restent ouverts car aucun attribut vérifié ne justifie encore un système de filtres ou de comparaison plus riche.
