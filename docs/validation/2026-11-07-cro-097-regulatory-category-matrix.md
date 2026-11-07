# CRO-097 — Matrice de catégories réglementaires

Statut : **préparé et bloquant par défaut** pour la démo. Cette matrice ne
constitue pas une qualification juridique : elle sépare les familles, nomme
le statut légal à vérifier au cas par cas et empêche toute publication
commerciale avant validation de la propriétaire et du conseil juridique.

## Matrice de publication

| Catégorie | Statut légal à vérifier | Bloqueur publication | Responsable de validation |
|---|---|---|---|
| Fleurs | `pending` — produit exact, origine, conformité et présentation à confirmer | Aucun nom, prix, stock ou achat réel ne passe en production | Propriétaire + conseil juridique |
| Résines | `pending` — produit exact et cadre applicable à confirmer | Fiche et vente réelles bloquées sans données et validation | Propriétaire + conseil juridique |
| Huiles | `pending` — composition, usage et catégorie réglementaire à confirmer | Aucune promesse d’usage ou de conformité ne peut être publiée | Propriétaire + conseil juridique |
| Cosmétiques | `pending` — composition, étiquetage et mentions obligatoires à confirmer | Aucun claim, bénéfice ou fiche commerciale sans dossier validé | Propriétaire + conseil juridique |
| Comestibles | `pending` — catégorie non ouverte dans la démo et à examiner séparément | Publication et achat interdits tant que le statut n’est pas établi | Propriétaire + conseil juridique |
| Accessoires | `pending` — nature exacte, sécurité et règles de vente à confirmer | Aucun modèle, prix ou disponibilité supposé | Propriétaire + conseil juridique |

## Règles de sortie

- `pending` est l’état public de préparation ; il ne signifie ni autorisé ni
  interdit définitivement.
- Une catégorie ne peut sortir de `pending` qu’avec le produit exact, la source
  documentaire, la date de revue, la validation propriétaire et l’avis du
  conseil juridique lorsque nécessaire.
- Aucune catégorie n’est autorisée à passer en production sur la seule base de
  son nom, d’une photo, d’un exemple de carte ou d’un visuel de démonstration.
- La démo conserve les textes neutres, les prix inactifs et les CTA bloqués tant
  que la matrice n’est pas alimentée par des données validées.

## Vérification

- `node --test test/cro-097-regulatory-matrix.test.mjs` : **1/1**.
- La matrice est séparée du gabarit légal interne et ne crée aucun lien légal
  public ni aucune activation commerciale.
