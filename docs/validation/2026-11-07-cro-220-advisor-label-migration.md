# CRO-220 — migrations D1 de labels et lexique

La migration additive `backend/cloudflare-d1/migrations/0003_advisor_labels.sql`
prépare quatre tables locales et versionnées : `lexicon_terms`,
`attribute_evidence`, `badge_rules` et `badge_assignments`.

Chaque enregistrement conserve une version, un état de revue, un mode de
publication (`hidden`, `demo` ou `approved`) et, quand il existe, une source
`fact_sources`. Les associations vers produit, règle et preuve restent
bornées par des clés étrangères. Aucune table client, commande ou paiement
n'est ajoutée.

La migration est idempotente et se rejoue dans SQLite avec les migrations D1
fictives `0001` et `0002`. La recette insère une source et un terme `demo`
pour vérifier la provenance et le statut publiable, sans mutation Supabase.

Preuve exécutée :

```text
node --test test/cro-220-advisor-label-migration.test.mjs test/wood-advisor-inventory-schema.test.mjs
```

Résultat : **5 tests réussis, 0 échec**.
