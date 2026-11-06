# WOOD — Configurer Cloudflare dans Codex (sans abonnement payant)

Date : 6 novembre 2026  
Source officielle, relue : https://developers.cloudflare.com/agent-setup/prompt.md  
Documentation pour Codex : https://developers.cloudflare.com/agent-setup/codex/

## Périmètre réel

Le dépôt contient maintenant :
- `.codex/config.toml` : cinq serveurs MCP Cloudflare officiels pour le **projet Codex reconnu comme fiable** ;
- `scripts/setup-cloudflare-codex.ps1` : installe les Skills officiels globalement, enregistre les MCP au niveau utilisateur et ouvre l'authentification OAuth ;
- `AGENTS.md` : consignes strictes « Cloudflare D1 Free », aucune dépense ni donnée réelle.

La configuration des serveurs **ne crée pas un compte**, ne crée pas de base D1 et **ne connecte pas le compte Cloudflare automatiquement**. Seul l'utilisateur peut valider la demande d'accès OAuth depuis son navigateur. Ne pas déclarer « installation terminée » tant que Codex n'affiche pas un MCP Cloudflare opérationnel.

## Codex application / Codex CLI

**App Codex** : ouvrir l'application → Plugins → chercher **Cloudflare** → installer le plugin officiel. Selon la version, ceci peut installer compétences et connexions automatiquement. Redémarrer Codex si nécessaire. Cette approche est aussi décrite dans la page officielle Codex de Cloudflare.

**Codex CLI sur Windows** : utiliser le script versionné `scripts/setup-cloudflare-codex.ps1` à partir du poste de travail qui héberge réellement Codex. Il suppose que Node.js/`npx` et `codex` sont disponibles. Ne jamais exécuter un script téléchargé sans en avoir vérifié le contenu.

Il exécute les commandes officielles suivantes (les serveurs existants sont ignorés pour éviter les doublons) :

```powershell
npx -y skills add cloudflare/skills --skill '*' --yes --global
codex mcp add cloudflare --url https://mcp.cloudflare.com/mcp
codex mcp add cloudflare-docs --url https://docs.mcp.cloudflare.com/mcp
codex mcp add cloudflare-bindings --url https://bindings.mcp.cloudflare.com/mcp
codex mcp add cloudflare-builds --url https://builds.mcp.cloudflare.com/mcp
codex mcp add cloudflare-observability --url https://observability.mcp.cloudflare.com/mcp
codex mcp login cloudflare
```

Pour vérifier : `codex mcp list`, puis dans Codex `/mcp`. Si les serveurs du projet n'apparaissent pas, ouvrir Codex depuis la racine de ce dépôt et confirmer qu'il est déclaré comme projet fiable.

**Authentification :** sélectionner uniquement les autorisations nécessaires à D1/Workers. Ne jamais donner ses identifiants ni un token à l'assistant. L'approbation Cloudflare se fait dans la fenêtre OAuth officielle.

## D1 gratuit et site WOOD

- Choisir **Workers Free / D1 Free** uniquement. Vérifier l'offre affichée avant toute création d'une ressource distante.
- Débuter par une base de test et un Worker avec des endpoints GET publics filtrés. Pas d'accès direct de D1 depuis le navigateur GitHub Pages : passer par un Worker et CORS strict limité au domaine de démo.
- Séparer complètement `demo`, `staging` et `production`. Démonstration : pas de vraie commande, paiement, e-mail ou stockage de données personnelles.
- Prévoir cache, pagination, requêtes indexées et comportements d'erreur si le quota gratuit est atteint ; ne jamais dégrader le site entier quand l'API est indisponible.
- Faire un export/snapshot du schéma et du catalogue de test avant chaque migration.
- Conserver Supabase en lecture seule/état existant tant que la migration n'a pas été vérifiée et autorisée, et ne jamais supprimer ses tables ou secrets lors du setup Cloudflare.
- Ne pas activer automatiquement de déploiement GitHub Actions utilisant des secrets Cloudflare.

## Checklist d'acceptation

- [x] Configuration MCP Cloudflare pour le projet ajoutée au dépôt.
- [x] Script d'installation des Skills et de connexion Codex créé.
- [ ] Cloudflare Skills réellement installés sur le poste utilisateur.
- [ ] OAuth Cloudflare autorisé et MCP testés dans Codex.
- [ ] Compte Cloudflare vérifié en Workers Free.
- [ ] Base D1 Free distante créée et identifiant attribué.
- [ ] Schéma et données fictives migrés, puis API de test vérifiée.
- [ ] Démo connectée avec fallback et validation responsive, sans vente réelle.

## Ressources

- https://developers.cloudflare.com/d1/platform/pricing/
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/agent-setup/prompt.md
- https://developers.openai.com/codex/config-basic/
- https://developers.openai.com/codex/mcp/
