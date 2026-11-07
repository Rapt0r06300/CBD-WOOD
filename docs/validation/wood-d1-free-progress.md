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
