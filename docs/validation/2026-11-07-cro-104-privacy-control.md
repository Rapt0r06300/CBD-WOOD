# CRO-104 — Contrôle de confidentialité

Statut : **préparé pour la démo, sans activation de mesure non essentielle**.

## État actuel de la démo

La démo WOOD n'active aucun analytics, pixel publicitaire, cookie de suivi ou
autre traceur non essentiel. Elle ne transmet pas d'email, d'adresse IP ou
d'identifiant à un service de mesure. Les parcours restent locaux et aucun
consentement marketing n'est demandé pour rendre la démo utilisable.

## Registre des mesures futures

| Mesure envisagée | Finalité | Données | Base légale / consentement | Conservation | Responsable | État |
|---|---|---|---|---|---|---|
| Analytics de fréquentation | À définir | À minimiser | Analyse CNIL à faire avant choix ; consentement ou exemption à prouver | À définir | WOOD | `pending` |
| Mesure de conversion | À définir | À minimiser | Base légale et consentement à documenter | À définir | WOOD | `pending` |
| Suivi publicitaire | Non retenu pour la démo | Aucun | Aucun | Aucune | WOOD | `pending` |

La règle de publication est : **aucun traceur non essentiel** tant que le
consentement ou l'exemption n'est pas correctement prouvé. Toute adresse IP,
identifiant ou donnée de contact devra avoir une finalité documentée, une base
légale, une durée de conservation et une procédure de suppression.

## Porte de validation

aucune mesure future n’est activée.

Avant toute mesure future, WOOD devra faire relire le dispositif au regard des
recommandations CNIL, choisir la base légale applicable, préciser si un
consentement est requis et documenter la suppression. Aucune mesure future
n’est activée dans cette livraison.

La politique de confidentialité publique n'est pas inventée ici : le gabarit
interne `docs/ops/legal-content-template.md` reste à compléter et à valider
avant toute ouverture commerciale.

## Vérification

- `test/cro-104-privacy-control.test.mjs`
- `test/privacy-surface.test.mjs`
- `npm run check`

