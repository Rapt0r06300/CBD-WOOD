# CRO-100 — Porte de conformité consommation

Statut : **préparé et bloqué pour la démo**. Ce document transforme les
informations nécessaires avant une vente réelle en une checklist explicite ;
il ne remplace ni les textes de la propriétaire ni une validation juridique.

## Informations obligatoires avant activation

| Élément | État | Ce qui doit être fourni | Bloqueur |
|---|---|---|---|
| Vendeur | `pending` | identité, adresse, contact et responsable de publication | aucun achat réel |
| Prix TTC | `pending` | prix, devise, règle d’arrondi et source approuvée | aucun montant commercial affiché sans source |
| CGV | `pending` | commande, paiement, livraison, retours et responsabilités | aucun lien CGV public non validé |
| Rétractation | `pending` | règle applicable et exceptions validées | aucun engagement supposé |
| Livraison | `pending` | zones, frais, délais, suivi et retours réellement proposés | aucun délai ou frais inventé |
| Politique de confidentialité | `pending` | finalités, base juridique, conservation, suppression et droits | aucun suivi non justifié |

## Règle de démo

- Le checkout reste une simulation locale ; aucun paiement réel, aucune commande
  commerciale et aucun e-mail ne sont activés.
- Tant que chaque ligne n’est pas `approved` avec source, date et validation
  propriétaire, l’information reste masquée ou explicitement indiquée comme à
  renseigner.
- Une simple présence technique d’un formulaire, d’un bouton ou d’un prix de
  démonstration ne vaut pas conformité de vente.

## Vérification

- `node --test test/cro-100-consumer-compliance.test.mjs` : **1/1**.
- Le gabarit interne `docs/ops/legal-content-template.md` reste la source de
  collecte ; aucune page légale publique n’est activée par ce ticket.
