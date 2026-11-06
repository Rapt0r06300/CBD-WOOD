# CBD WOOD — feuille de route Codex autonome Cloudflare D1 Free (25 tâches)

**Date :** 6 novembre 2026  
**Statut initial :** plan préparé, **aucune installation utilisateur, connexion Cloudflare, création de base distante ou déploiement attesté**.  
**Dépôt :** `Rapt0r06300/CBD-WOOD` (`main`).  
**Démo :** https://rapt0r06300.github.io/CBD-WOOD/demo/  
**Référence officielle agent Cloudflare :** https://developers.cloudflare.com/agent-setup/prompt.md  
**Plan visuel principal :** [WOOD Signature Edition — TXW-001 à TXW-120](2026-11-06-wood-signature-edition-120-taches.md)

## Mandat — objectif « je n'ai rien à faire » dans les limites réelles

Codex agit **autonomement** sur toute tâche réalisable depuis son environnement et ses connexions, sans demander à l'utilisateur de copier des fichiers, d'écrire du code, d'exécuter des commandes techniques ou de réexpliquer le contexte. Les commandes ne s'exécutent que sur **la machine ou le cloud où Codex fonctionne réellement**, jamais à distance sur l'ordinateur personnel sans accès autorisé.

**Seule exception inévitable :** la création éventuelle d'un compte et le consentement OAuth Cloudflare, demandés par Cloudflare au titulaire. L'agent déclenche le flux OAuth et attend uniquement cette validation, sans demander de mots de passe, de clés ou de jetons à coller. Si OAuth n'est pas faisable dans l'environnement, classer `BLOCKED-EXTERNAL` et poursuivre les tâches locales. Ne jamais promettre d'autonomie totale ni prétendre être connecté.

**Contrat coût : zéro euro.** Utiliser strictement `Workers Free` et `D1 Free`. Avant toute création distante, lire l'offre effective et les limites Cloudflare officielles. Refuser toute carte bancaire obligatoire, upgrade, essai convertissant en payant, facturation ou dépassement facturable. Les quotas gratuits doivent échouer sans facturation : prévoir un repli statique. Ne jamais transformer une erreur de quota en passage automatique au plan payant.

## Contraintes invariantes

- Le site de démonstration reste accessible et sa marque WOOD, son logo, ses couleurs, ses photos et sa mise en scène sont préservés.
- **Aucune donnée personnelle réelle** ne doit être copiée depuis Supabase. Aucune commande réelle, aucun email réel, aucun paiement Viva, aucun compte client réel, aucun déclenchement commercial en démo.
- **Supabase existant ne doit être ni supprimé, ni migré en production, ni modifié.** Les éventuels tests de compatibilité reposent sur mocks ou données synthétiques.
- Écrire seulement des fichiers statiques de code, scripts, migrations et configuration non secrète dans GitHub ; ni clés API privées, ni refresh token, ni secret, ni fichiers .env réels.
- Le navigateur GitHub Pages n'interroge jamais D1 directement : API publique en lecture seule sur **Cloudflare Worker**, CORS limité à l'origine `https://rapt0r06300.github.io`.
- S'il n'y a pas de compte Cloudflare, aucune tentative ne doit entraîner l'achat d'un service. La démo statique fonctionne jusqu'à validation de l'API.
- **Ne pas recopier TealerLab** : uniquement sa qualité d'expérience comme inspiration, identité WOOD exclusivement.
- Le document `docs/superpowers/plans/2026-11-06-wood-attente-identifiants-validations.md` conserve ses **138 tâches différées**. Ne les considérer ni terminées ni supprimées.
- La référence visuelle `docs/design/wood-photo-brief.md` impose à tort « sans cloche » ; corriger la consigne du **site démo** pour respecter la préférence récente « sous cloche » de la propriétaire, tout en gardant les photos exactes et leur provenance.

## Déclenchement automatique

1. Lire `AGENTS.md`, ce plan, [plan Signature 120](2026-11-06-wood-signature-edition-120-taches.md), `docs/ops/cloudflare-agent-setup.md`, `.codex/config.toml`, `package.json`, `docs/validation/2026-11-06-109-task-status.md` et le code existant.
2. Vérifier le dernier état de `main` et obtenir un point de retour Git avant modification.
3. Repérer l'éventuelle présence des livrables D1 déjà créés ; **réutiliser** les fichiers corrects et ne coder que les différences manquantes. Les ZIP précédemment téléchargés dans ChatGPT ne doivent **pas** être présumés présents sur le disque de Codex.
4. Exécuter `D1-001` à `D1-025` en tenant un journal `docs/validation/wood-d1-free-progress.md`.
5. Après chaque tâche : état `DONE`, `PARTIAL`, `TODO`, `BLOCKED-EXTERNAL` ou `FAILED`, preuve (test/commit/log), et pourcentage **réel** calculé `100 × DONE / 25`. Une étape sans test n'est pas `DONE`.
6. Reprendre automatiquement les autres étapes locales lorsque Cloudflare ou un service externe bloque. Ne pas ouvrir de demande utilisateur sauf consentement OAuth ou décision qui change le coût/le périmètre.

## Phase A — Préflight et agent Cloudflare

- [ ] **D1-001 — Audit du dépôt.** Repérer l'architecture HTML/CSS/JS, le catalogue de 13 références démonstration, le flux de commandes actuel, les dépendances et la suite `npm run check`. Preuve : inventaire daté, sans modification distante.
- [ ] **D1-002 — Contrat de non-facturation.** Vérifier les plafonds `Workers Free`/`D1 Free` directement sur la documentation officielle, horodater l'examen et écrire une procédure de refus de service payant. Preuve : liens officiels et règle fail-closed.
- [ ] **D1-003 — Détection outils Codex.** Identifier OS, `node`, `npm`, `npx`, `codex`, `wrangler` et droits d'exécution. Utiliser l'environnement de l'agent, sans prétendre accéder au PC si non connecté. Preuve : commandes disponibles.
- [ ] **D1-004 — Skills Cloudflare et MCP.** Vérifier `.codex/config.toml`, puis installer les Skills officiels dans l'environnement Codex s'ils manquent ; vérifier les endpoints MCP (API, docs, bindings, builds, observability) sans en créer en double. Le script `scripts/setup-cloudflare-codex.ps1` est utilisable sur Windows seulement si Codex y tourne. Preuve : `codex mcp list` ou diagnostic équivalent.
- [ ] **D1-005 — OAuth Cloudflare.** Déclencher `codex mcp login cloudflare` ou l'authentification native adéquate. L'utilisateur doit consentir sur le site officiel ; sinon noter `BLOCKED-EXTERNAL`. Preuve : état de connexion vérifié sans divulguer de token.

## Phase B — Base portable SQLite et sécurité locale

- [ ] **D1-006 — Inventaire du modèle.** Définir schéma `categories`, `products`, `product_media`, `product_variants`, `site_content` et `schema_migrations`. Les tables de commande/paiement/clients/newsletter sont **hors périmètre** de la démo. Preuve : dictionnaire de données.
- [ ] **D1-007 — Migrations D1.** Créer `backend/cloudflare-d1/migrations/0001_initial_schema.sql` et migrations ultérieures sûres (SQLite D1, clés, unicité, index, timestamps, statuts `demo`/`approved`). Preuve : migrations rejouables localement.
- [ ] **D1-008 — Seed WOOD honnête.** Créer un seed SQL reproductible de **4 catégories** et **13 références fleurs de maquette** basées uniquement sur le registre local `flower-presentation.js`. Pour produits indisponibles, utiliser des états de démo ; prix, stock et allégations inconnus restent `NULL`, jamais inventés. Preuve : comptages et audit des champs.
- [ ] **D1-009 — Tests de base.** Écrire et exécuter des tests SQLite de clés étrangères, contraintes d'unicité, validité des slugs, indices, réexécution idempotente, et absence de données personnelles et commerciales. Preuve : rapport reproductible.
- [ ] **D1-010 — Export et restauration.** Produire une commande d'export des seules données fictives et démontrer une restauration locale. Exclure jetons et données réelles. Preuve : comparaison du nombre de lignes et checksums.

## Phase C — Worker D1 Free, lecture seule

- [ ] **D1-011 — Structure Worker.** Créer `backend/cloudflare-d1/wrangler.jsonc`, `src/index.mjs`, `README.md`, `.gitignore`; `database_id` reste un placeholder avant création réelle. `workers_dev` activé pour test, sans domaine payant. Preuve : configuration valide.
- [ ] **D1-012 — API catalog.** Fournir seulement `GET /health`, `GET /v1/categories`, `GET /v1/products`, `GET /v1/products/:slug` et éventuellement `HEAD/OPTIONS`. Réponses JSON stables, limite de résultats et pagination. Preuve : contrats et tests.
- [ ] **D1-013 — Méthodes interdites.** `POST`, `PUT`, `PATCH`, `DELETE` doivent être refusés sans écritures, y compris quand l'API est sollicitée par un client malveillant. Preuve : tests négatifs.
- [ ] **D1-014 — Origines, validation et headers.** CORS limité à GitHub Pages WOOD et localhost de développement ; aucune wildcard avec credentials, aucune clé d'admin côté navigateur, requêtes préparées, pagination bornée, no-store/ETag lorsque pertinent. Preuve : tests d'origines permises/refusées, erreurs 400/404/503.
- [ ] **D1-015 — Performance Free.** Indexer les recherches publiques, limiter les scans et le nombre d'appels Worker, proposer le cache pour les pages de catalogue et un fallback lors d'une panne ou d'une limite de quota. Preuve : tests quota simulé et lecture sans régression.

## Phase D — Création et tests distants (uniquement après OAuth)

- [ ] **D1-016 — Vérifier l'offre du compte.** Lire l'offre Cloudflare réelle via outil officiel. Si `Free` non disponible ou coût requis : STOP sur opérations distantes, consigner `BLOCKED-EXTERNAL`. Preuve : offre vérifiée à 0 €.
- [ ] **D1-017 — Créer D1 `wood-cbd-demo`.** Exécuter dans le compte approuvé uniquement, sans base payante ni import de données réelles. Capturer l'UUID de la base dans le fichier Wrangler (identifiant non secret) et un journal. Preuve : base D1 existante dans l'offre Free.
- [ ] **D1-018 — Appliquer les migrations D1 distantes.** Exécuter dans le compte autorisé ; vérifier 4 catégories et 13 références synthétiques, aucun client, aucune commande, aucun paiement. Preuve : requêtes de contrôle en lecture seule.
- [ ] **D1-019 — Déployer Worker gratuit.** Déployer sur sous-domaine `workers.dev`, uniquement après validation des frais nuls. Pas de domaine commercial, pas d'automatisation d'envoi. Preuve : URL de test et HTTP 200.
- [ ] **D1-020 — Recette API distante.** Valider schémas JSON, CORS, pagination, erreurs de quotas, 404, refus des mutations et aucune réponse contenant des secrets. Preuve : rapport sans aucune écriture dans la démo.

## Phase E — Intégration progressive et finition Codex

- [ ] **D1-021 — Adaptateur frontend opt-in.** Lire le catalogue D1 uniquement lorsque `WOOD_D1_DEMO_ENABLED` est explicitement activé dans une configuration démo non secrète. **Valeur par défaut = désactivé**. Même HTML, mêmes catégories, aucun prix ou stock inventé. Preuve : comparaison snapshot.
- [ ] **D1-022 — Fallback sûr.** En erreur réseau, quota ou Worker absent, afficher le catalogue local existant sans écran vide. Ne jamais permettre à un click de créer une commande Supabase ni d'envoyer un email depuis la démo. Preuve : tests navigateur et mocks réseau.
- [ ] **D1-023 — Recette cross-device.** Tester mobile (320, 360, 375, 390, 430), tablette et desktop (768, 1024, 1440), clavier, tactile, focus, zoom, image manquante, a11y, reduced-motion, CLS. Preuve : captures datées et rapport Playwright si disponible.
- [ ] **D1-024 — Non-régression et rollback.** Exécuter `npm run check`, comparer captures/pages avant-après, garder la bascule off et documenter la désactivation immédiate du Worker sans supprimer D1 ou Supabase. Preuve : journal de test et scénario rollback validé.
- [ ] **D1-025 — Compte rendu et handoff.** Mettre à jour `docs/validation/wood-d1-free-progress.md` avec 25 statuts exacts, coûts réels (0 € si confirmé), commits, URL si déployée, blockers OAuth et prochaine tâche automatique. Ne pas cocher les validations owner ou secrets. Preuve : bilan final traçable.

## Règles GitHub, tests et arrêt

- Pour les tests, n'utiliser que des DB SQLite et mocks Workers isolés. Jamais de vrais appels qui insèrent chez Supabase, Cloudflare en production, Gmail ou Viva.
- Faire les étapes locales même sans Cloudflare. Si OAuth absent : D1-005/016–020 en `BLOCKED-EXTERNAL`, et D1-021–025 préparées et testées avec mocks ; aucune confirmation de déploiement inventée.
- Les fichiers `AGENTS.md`, `.codex/config.toml`, `scripts/setup-cloudflare-codex.ps1`, `scripts/Lancer-Cloudflare-Codex.cmd` et `docs/ops/cloudflare-agent-setup.md` existent déjà : **ne pas les recréer ou modifier sans raison démontrée**.
- Source de vérité git : `main`. Faire des commits ciblés, ne jamais écraser un travail concurrent, et laisser un rollback documenté.
- Lors d'une incertitude sur le tarif, ne pas faire l'opération distante et poursuivre le travail de code/test gratuit.
- La base Cloudflare est un **prototype de lecture catalogue**. Tout basculement futur des comptes, commandes, stocks, emails, factures et paiements nécessite un audit indépendant et un accord spécifique.

## Sources de limites gratuites (à revérifier à l'exécution)

- https://developers.cloudflare.com/d1/platform/pricing/
- https://developers.cloudflare.com/d1/platform/limits/
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/agent-setup/prompt.md
