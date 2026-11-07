# WOOD — catalogue D1 Free en lecture seule

Ce Worker est une préparation locale pour le catalogue de démonstration WOOD.

- endpoints : `GET /health`, `GET /v1/categories`, `GET /v1/products`, `GET /v1/products/:slug` ;
- mutations refusées (`POST`, `PUT`, `PATCH`, `DELETE`) ;
- CORS limité à GitHub Pages WOOD et aux hôtes locaux de développement ;
- aucune table de comptes, commandes, paiements ou newsletter ;
- `database_id` reste un placeholder tant que la propriétaire n’a pas consenti à l’OAuth Cloudflare.

Le frontend garde le catalogue local par défaut. Le Worker ne doit être activé qu’après une validation de coût à 0 € et une recette externe distincte.

## Export / restauration locale

Le catalogue fictif peut être exporté puis restauré sans lire Supabase ni inclure de données personnelles :

```powershell
node scripts/export-wood-d1-demo.mjs --output .\test-results\wood-d1-demo-export.json --restore
```

La commande vérifie le checksum, les 4 catégories, les 13 références et l’absence de tables commerciales.
