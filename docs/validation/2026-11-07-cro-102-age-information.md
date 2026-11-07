# CRO-102 — Information d’âge et parcours autorisé

Statut : **préparé et inactif dans la démo**. Le besoin d’âge dépend du produit
exact, de sa réglementation et de l’avis du conseil juridique. Un simple
pop-up ne constitue pas un contrôle suffisant et aucun contrôle fictif n’est
présenté comme une preuve.

## Matrice de décision

| Catégorie | État actuel | Question à trancher | Contrôle final |
|---|---|---|---|
| Fleurs | `pending` | règle d’âge applicable au produit exact et au canal | conseil juridique + propriétaire |
| Résines | `pending` | règle d’âge applicable au produit exact et au canal | conseil juridique + propriétaire |
| Huiles | `pending` | composition, usage et public autorisé | conseil juridique + propriétaire |
| Cosmétiques | `pending` | statut cosmétique, étiquetage et public concerné | conseil juridique + propriétaire |
| Comestibles | `pending` | catégorie et restrictions spécifiques avant toute ouverture | conseil juridique + propriétaire |
| Accessoires | `pending` | nature de l’accessoire et éventuelles restrictions | conseil juridique + propriétaire |

## Règles de parcours

- La démo reste consultable par un visiteur autorisé sans prétendre qu’une
  question d’âge est une vérification légale.
- Aucun message `J’ai 18 ans`, badge `18+` ou écran de blocage n’est ajouté
  avant que le produit exact et la règle applicable soient connus.
- Si une vérification est requise, elle devra être choisie selon le produit,
  le canal, la conservation minimale des données et le contrôle final validé ;
  elle ne sera pas déduite d’un simple pop-up côté navigateur.
- Les CTA commerciaux restent désactivés dans le mode démo tant que les règles
  de conformité et les informations de vente ne sont pas approuvées.

## Vérification

- `node --test test/cro-102-age-information.test.mjs` : **1/1**.
- La matrice reste `pending` et n’active aucun contrôle d’âge de production.
