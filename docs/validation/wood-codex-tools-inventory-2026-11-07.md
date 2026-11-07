# WOOD — inventaire des outils Codex et Cloudflare

Date : 7 novembre 2026
Environnement observé : Windows 10.0.26200, PowerShell 7.6.9.

## Outils disponibles

| Outil | État | Preuve observée |
|---|---|---|
| `node` | disponible | `C:\Program Files\nodejs\node.exe`, v24.12.0 |
| `npm` | disponible | `C:\Program Files\nodejs\npm.ps1`, v11.6.2 |
| `npx` | disponible | `C:\Program Files\nodejs\npx.ps1`, v11.6.2 |
| `codex` | disponible | `C:\Users\flo\AppData\Roaming\npm\codex.ps1` |
| `wrangler` | absent | aucune commande trouvée |

Les commandes locales Node, npm, npx et Codex s'exécutent dans le workspace. Aucun déploiement Cloudflare n'a été lancé.

## Configuration Codex

Le fichier utilisateur `C:\Users\flo\.codex\config.toml` est présent et le workspace est déclaré de confiance. La configuration observée ne contient pas d'identifiant Cloudflare ni de secret de déploiement.

## Diagnostic MCP

`codex mcp list` ne retourne que `codex_app` (désactivé/non supporté), `cua_repl` et `node_repl`. Aucun endpoint Cloudflare API, documentation, bindings, builds ou observability n'est actuellement configuré.

Le script projet `scripts/setup-cloudflare-codex.ps1` n'est pas présent dans ce checkout. Aucun Skill ou endpoint n'a été installé automatiquement : cela nécessiterait une décision d'environnement externe et ne doit pas modifier la démo locale.

## Statut

- D1-003 : `DONE` — inventaire local reproductible.
- D1-004 : `PARTIAL` — configuration et diagnostic effectués, endpoints Cloudflare absents.
- D1-005 : `BLOCKED-EXTERNAL` — aucune authentification OAuth Cloudflare déclenchée.
