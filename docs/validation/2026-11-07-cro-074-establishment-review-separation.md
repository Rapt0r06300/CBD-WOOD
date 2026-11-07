# CRO-074 — Séparer établissement et avis Google

## Statut

`validated-local-preparation` — 7 novembre 2026

La démo conserve une preuve sociale honnête : les avis et notes restent
`pending` tant que la propriétaire n'a pas revalidé la fiche, l'adresse,
l'auteur public, la date, le texte exact et l'autorisation de citation.

## Matrice de rattachement

| Établissement | Adresse à vérifier | Source directe consultée | Statut |
| --- | --- | --- | --- |
| Barla | 7 rue Barla, 06300 Nice | [Fiche publique Barla](https://magasin.tel/f/cbd-nice-wood-shop-cbd-nice-barla-14353109/) | `needs-owner-revalidation` |
| Borriglione | 16 avenue Alfred Borriglione, 06100 Nice | [Fiche publique Borriglione](https://magasin-de-cannabis.autour-de-moi.com/f/cbd-nice-wood-shop-cbd-nice-borriglione-14353446/) | `needs-owner-revalidation` |

## Règles de preuve

- Zéro mélange d'établissements : un extrait ne peut être associé qu'à la
  fiche qui expose son auteur public, sa date et son adresse.
- Le lien direct, l'adresse, l'auteur public et la date doivent être contrôlés
  avant toute citation.
- Les extraits repérés sur la fiche Barla restent des éléments à revalider ;
  aucun extrait Borriglione n'est déduit de la note agrégée de sa fiche.
- Une publication nécessite l'autorisation explicite de WOOD et la formulation
  exacte validée par la propriétaire.
- Aucun nombre d'avis, note globale, moyenne ou affirmation « tous les avis
  sont 5/5 » n'est publié dans la démo.

## État public de la démo

La section `#preuve` affiche uniquement `AVIS GOOGLE · À REVALIDER`,
`Fiche Google · source à confirmer` et `En attente de validation WOOD`.
Elle ne contient ni auteur, ni date, ni extrait, ni note, afin d'éviter une
publication prématurée ou une confusion entre Barla et Borriglione.

## Vérification

- Test : `test/cro-074-establishment-review-separation.test.mjs`
- Commande attendue : `npm run check`
- La revalidation externe et l'autorisation de citation restent une porte
  propriétaire séparée de cette préparation locale.
