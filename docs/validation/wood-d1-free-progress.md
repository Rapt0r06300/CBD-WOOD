# WOOD — suivi D1 Free local

Date : 7 novembre 2026

## Livré localement

- Schéma SQLite/D1 idempotent : catégories, produits, médias, variantes, contenu et migrations.
- Seed reproductible : 4 catégories et 13 références de fleurs déjà présentes dans le registre de démonstration.
- Aucun prix, stock, compte, client, commande, paiement ou newsletter dans le seed.
- Worker GET-only local avec CORS allow-list, pagination bornée, headers de sécurité, 404/405/503 et fallback.
- Adaptateur navigateur opt-in : `WOOD_D1_DEMO_ENABLED` doit être exactement `true`; sinon aucun appel réseau D1.
- Fallback catalogue local lorsque D1 est absent, vide, indisponible ou en erreur.
- Export JSON checksumé et restauration SQLite locale :
  `node scripts/export-wood-d1-demo.mjs --output .\test-results\wood-d1-demo-export.json --restore`
- Non-régression et rollback local validés dans
  `docs/validation/2026-11-07-d1-024-rollback.md` : la bascule reste off par
  défaut, le fallback local est conservé, et la désactivation du Worker ne
  demande ni suppression de D1 ni suppression de Supabase.

## Vérification

Tests ciblés :

- `test/wood-d1-local.test.mjs`
- `test/wood-d1-worker.test.mjs`
- `test/wood-d1-adapter.test.mjs`
- `test/wood-d1-export.test.mjs`

Les étapes Cloudflare distantes restent `BLOCKED-EXTERNAL` tant que la propriétaire n’a pas fourni l’autorisation OAuth et la confirmation explicite de l’offre gratuite à 0 €.

## Compte rendu D1-025 — handoff traçable

La préparation locale D1 est terminée sans prétendre à une connexion Cloudflare
distante. Le coût réel d'une opération distante reste **non confirmé** ; aucune
opération payante, création de compte, migration distante ou déploiement Worker
n'a été exécuté.

| Ticket | Statut | Preuve ou limite |
|---|---|---|
| D1-001 | DONE | audit dépôt et périmètre démo |
| D1-002 | DONE | contrat de non-facturation officiel |
| D1-003 | DONE | inventaire Node/npm/npx/Codex/Wrangler |
| D1-004 | PARTIAL | configuration vérifiée, endpoints Cloudflare absents |
| D1-005 | BLOCKED-EXTERNAL | OAuth Cloudflare non consenti |
| D1-006 | DONE | dictionnaire SQLite/D1 local |
| D1-007 | DONE | migrations rejouables |
| D1-008 | DONE | seed 4 catégories / 13 références fictives |
| D1-009 | DONE | tests de contraintes et absence de données commerciales |
| D1-010 | DONE | export checksumé et restauration locale |
| D1-011 | DONE | Worker local GET-only préparé |
| D1-012 | DONE | endpoints de catalogue bornés |
| D1-013 | DONE | mutations refusées |
| D1-014 | DONE | CORS, headers et validation locale |
| D1-015 | DONE | limites, cache et fallback local |
| D1-016 | BLOCKED-EXTERNAL | offre effective du compte non accessible |
| D1-017 | BLOCKED-EXTERNAL | création D1 distante interdite sans compte approuvé |
| D1-018 | BLOCKED-EXTERNAL | migrations distantes non exécutées |
| D1-019 | BLOCKED-EXTERNAL | Worker distant non déployé |
| D1-020 | BLOCKED-EXTERNAL | recette API distante non applicable |
| D1-021 | DONE | adaptateur opt-in désactivé par défaut |
| D1-022 | DONE | fallback local prouvé |
| D1-023 | DONE | matrice Playwright locale et captures |
| D1-024 | DONE | non-régression et rollback non destructif |
| D1-025 | DONE | présent compte rendu et handoff |

### Bilan chiffré D1

**18 / 25 — 72,00 % DONE**. Les 7 autres entrées restent explicitement
`PARTIAL` ou `BLOCKED-EXTERNAL` ; elles ne sont pas converties en tâches
terminées par ce document.

### Commits et URLs

- socle D1 local : `9beff38` — `security: isolate demo and prepare local D1 catalog` ;
- recette cross-device : `ed2be17` — `test: validate D1 cross-device demo matrix` ;
- rollback : `8f04f6a` — `docs: validate D1 demo rollback` ;
- version Pages courante : `ed2be17` ;
- base de sauvegarde : https://rapt0r06300.github.io/CBD-WOOD/ ;
- démo WOOD : https://rapt0r06300.github.io/CBD-WOOD/demo/ ;
- dernier contrôle live : base et démo HTTP 200, paquets isolés.

### Prochaine tâche automatique

La prochaine tâche automatique est la poursuite des tickets locaux de la
feuille principale, en priorité une page rendez-vous/visite WOOD et ses
scénarios de navigation si aucune donnée propriétaire n'est nécessaire. Les
étapes Cloudflare `D1-004`, `D1-005` et `D1-016` à `D1-020` restent en attente
d'une autorisation externe et ne déclenchent aucune action distante.
