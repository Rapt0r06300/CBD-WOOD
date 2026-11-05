# Système e-mail WOOD — Gmail, Supabase et livraison

## Principe

**État du socle — 5 novembre 2026 :** les migrations `email_automation_foundation` et `email_security_cleanup` sont appliquées au projet Supabase connecté et les fonctions Edge sont déployées. Aucun secret Gmail, jeton interne ou réglage de production n’est fourni dans le dépôt : les fonctions restent donc volontairement inactives tant que la propriétaire n’a pas validé la connexion et les identifiants finaux.

Le site ne connecte pas un mot de passe Gmail à la base de données. Supabase conserve les commandes, les consentements, les documents et les états d’envoi. Une Edge Function privée utilise OAuth Gmail pour envoyer les messages.

```text
commande persistée
  → order_notification_outbox (client + owner_order_alert)
  → email-worker (bail anti-doublon)
  → Gmail API OAuth
  → email_delivery_attempts
  → état visible dans l’espace propriétaire
```

Les confirmations de commande et les confirmations de paiement sont séparées. Un reçu disant que le paiement est confirmé ne peut partir qu’après un webhook Viva Wallet vérifié. Tant que Viva n’est pas connecté, le site ne doit envoyer qu’un statut d’enregistrement ou d’attente.

Les documents PDF restent dans le bucket privé `order-documents`. Le navigateur ne reçoit jamais de chemin de stockage durable : `document-download` vérifie le compte client ou le rôle propriétaire puis délivre une URL signée limitée à cinq minutes.

## Fichiers

- `supabase/migrations/20261105100000_email_automation_foundation.sql` : tables, RLS, nouvelles catégories et fonction de réservation atomique.
- `supabase/migrations/20261105180000_newsletter_safety_gates.sql` : adresses de test exclues des campagnes commerciales et une seule campagne active par version de modèle.
- `supabase/migrations/20261105190000_newsletter_action_policy.sql` : journal d’actions explicitement lisible uniquement par les propriétaires et indexé par acteur.
- `supabase/migrations/20261105120000_owner_order_alerts.sql` : alerte propriétaire créée après persistance d’une nouvelle commande.
- `supabase/functions/email-worker/core.mjs` : normalisation, retries, MIME et encodage Gmail.
- `supabase/functions/email-worker/gmail.mjs` : échange du refresh token et appel Gmail `messages.send`.
- `supabase/functions/email-worker/message.mjs` : messages de commande sans affirmation de paiement prématurée.
- `supabase/functions/email-worker/worker-core.mjs` : traitement idempotent, retries et dead-letter.
- `supabase/functions/email-worker/index.ts` : fonction Edge privée qui loue les jobs puis les envoie.
- `supabase/functions/notification-retry/index.ts` : reprise JWT réservée au propriétaire pour les jobs `failed` ou `dead_letter`.
- `supabase/functions/document-worker/index.ts` : génération et stockage privé des PDF.
- `supabase/functions/document-download/index.ts` : URL signée courte pour le client authentifié ou la propriétaire.
- `owner-dashboard.js` : suivi des notifications et ouverture des documents prêts via URL signée courte.
- `supabase/functions/delivery-events/index.ts` : transitions de livraison propriétaire, idempotence et notification.
- `supabase/functions/newsletter-subscribe/index.ts` et `newsletter-unsubscribe/index.ts` : consentement et retrait.
- `supabase/functions/newsletter-campaign/index.ts` : campagnes séparées, lots, désinscription et reprise.
- `supabase/functions/newsletter-control/index.ts` : création de brouillons, aperçu, pause, reprise et annulation réservés au rôle propriétaire.

## Secrets Edge Function — à renseigner à la fin

Les noms suivants sont nécessaires. Les valeurs ne doivent être écrites ni dans GitHub, ni dans un fichier public, ni dans Postgres :

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
EMAIL_WORKER_TOKEN
GMAIL_CLIENT_ID
GMAIL_CLIENT_SECRET
GMAIL_REFRESH_TOKEN
GMAIL_FROM
EMAIL_WORKER_BATCH_SIZE (facultatif)
DOCUMENT_WORKER_TOKEN
NEWSLETTER_WORKER_TOKEN
NEWSLETTER_UNSUBSCRIBE_SECRET (au moins 32 caractères aléatoires)
NEWSLETTER_UNSUBSCRIBE_URL (URL publique de la fonction newsletter-unsubscribe)
NEWSLETTER_CAN_SEND (doit rester false/absent jusqu’à validation complète)
NEWSLETTER_TEST_RECIPIENT (adresse dédiée contrôlée par la propriétaire)
NEWSLETTER_PROVIDER_EVENTS_TOKEN (uniquement si un fournisseur d’envoi expose des événements authentifiés)
LEGAL_ENTITY_NAME (nécessaire uniquement pour une facture)
LEGAL_ENTITY_ADDRESS (nécessaire uniquement pour une facture)
```

`EMAIL_WORKER_TOKEN` protège l’appel du worker. Il doit être différent des clés Supabase. Le refresh token est obtenu par le flux OAuth Google et reste un secret serveur.

## Connexion Gmail à faire en dernier

1. Créer ou sélectionner le projet Google Cloud de la propriétaire.
2. Activer Gmail API.
3. Configurer l’écran de consentement OAuth avec l’identité WOOD.
4. Déclarer uniquement le scope `https://www.googleapis.com/auth/gmail.send`.
5. Déclarer l’URI de redirection de la fonction de connexion, distincte pour local, staging et production.
6. Faire autoriser le compte Google de la propriétaire dans le navigateur.
7. Échanger le code à usage unique côté serveur contre le refresh token.
8. Enregistrer les secrets dans Supabase Edge Functions.
9. Déployer la fonction `email-worker` avec vérification du jeton d’appel.
10. Renseigner `NEWSLETTER_TEST_RECIPIENT`, lancer d’abord le bouton `Envoyer un test` depuis l’espace propriétaire, puis vérifier la réception et l’action `test_send` ; ne passer `NEWSLETTER_CAN_SEND=true` qu’après cette validation.

Références officielles : [OAuth Gmail côté serveur](https://developers.google.com/workspace/gmail/api/auth/web-server), [envoi Gmail API](https://developers.google.com/workspace/gmail/api/guides/sending), [scopes Gmail](https://developers.google.com/workspace/gmail/api/auth/scopes).

## Exécution

Le worker doit être appelé par un mécanisme serveur planifié, par exemple Supabase Cron/`pg_net`, ou manuellement depuis un outil propriétaire protégé. Il ne doit pas être appelé directement par le navigateur public.

Avant chaque lot :

- le worker valide le jeton interne ;
- il renouvelle le token Gmail ;
- seulement ensuite il réserve des jobs avec `FOR UPDATE SKIP LOCKED` ;
- chaque job est traité une seule fois grâce au bail et à l’identifiant fournisseur.

En cas de quota ou de panne réseau, le job revient en `pending` avec un délai borné. En cas de scope révoqué, d’adresse invalide ou d’échec durable, il passe en `dead_letter` et reste visible pour intervention.
Depuis l’espace propriétaire, une notification `failed` ou `dead_letter` peut être remise en file avec `notification-retry`; cette action ne modifie jamais directement l’outbox depuis le navigateur.

## Newsletter

La newsletter ne doit pas réutiliser aveuglément la file des commandes. Elle exige : consentement prouvable, confirmation éventuelle, désinscription, suppression, lots bornés, quotas, gestion des rebonds et journal par destinataire. Un achat ne vaut pas consentement marketing automatique.

Le tableau de bord propriétaire peut maintenant créer un brouillon texte, le prévisualiser, simuler uniquement l’audience consentante et envoyer un test isolé. Le bouton d’envoi de test appelle `newsletter-test-send` : l’adresse vient exclusivement de `NEWSLETTER_TEST_RECIPIENT`, elle est conservée comme `is_test=true`, aucun destinataire fourni par le navigateur n’est accepté et aucune ligne de livraison réelle n’est créée. Les actions `start`, `pause`, `resume` et `cancel` passent par `newsletter-control`, sont contrôlées par `owner_users` et écrites dans `newsletter_campaign_actions`. `start` et l’envoi de test restent refusés tant que `NEWSLETTER_CAN_SEND=true` n’est pas configuré après validation Gmail ; aucun envoi n’est donc activé par défaut.

Un brouillon peut aussi recevoir une date future. Il reste `scheduled` jusqu’à ce que le worker vérifie que l’heure est atteinte ; un démarrage manuel anticipé est refusé. La planification ne contourne jamais la porte Gmail.

Les abonnés marqués `is_test` sont conservés séparément et exclus des lots, des workers et de la simulation commerciale. Une contrainte unique partielle empêche aussi deux campagnes `scheduled` ou `sending` de réutiliser simultanément la même version de modèle. Les aperçus HTML utilisent une largeur fluide, une largeur maximale, un retour de ligne sûr et un lien de désinscription explicitement libellé et suffisamment contrasté.

Les adresses frappées par un rebond définitif ou une plainte passent dans `newsletter_suppressions` via `newsletter-provider-events`. Le webhook exige `NEWSLETTER_PROVIDER_EVENTS_TOKEN`, refuse les types inconnus et déduplique `provider_event_id` ; le marketing est bloqué sans toucher aux e-mails transactionnels. Les deux tables restent fermées aux rôles publics par RLS.

Chaque événement de livraison possède aussi sa propre notification (`delivery_event_id`). Une commande ne peut donc plus écraser silencieusement la notification précédente : `in_progress`, `delivered` et `failed` restent visibles séparément. Un événement `failed` ajoute une alerte propriétaire distincte afin que l’adresse ou l’instruction soit vérifiée sans perdre la commande.

Gmail peut convenir à un faible volume après vérification des limites et de la délivrabilité. Pour un volume important, la décision doit être réévaluée avec un fournisseur transactionnel spécialisé ; aucun basculement ne doit être automatique.

Le lien de désinscription est un jeton signé et expirant qui contient l’identifiant de l’abonné, mais aucun secret. La base conserve uniquement son empreinte. Le worker revalide le consentement juste avant chaque envoi, ce qui évite qu’une désinscription concurrente reçoive encore une campagne.

Le worker newsletter ne traite qu’une campagne `sending`, réserve les destinataires avec `FOR UPDATE SKIP LOCKED`, limite les tentatives et conserve une trace par destinataire dans `newsletter_delivery_attempts`. Les campagnes `draft`, `paused` ou `cancelled` ne sont jamais consommées.

Une campagne sans destinataire éligible est clôturée proprement sans tenter de se connecter à Gmail. Si le renouvellement OAuth Gmail échoue avant la réservation d’un lot, la campagne est automatiquement mise en pause et l’espace propriétaire reçoit une indication de reconnexion. Les réponses temporaires comme `429` sont différées avec le bail et le nombre de tentatives, sans créer de nouveau destinataire ni de doublon.

Si un worker tombe après avoir réservé un destinataire, le bail expire ; le prochain worker peut reprendre uniquement les lignes `processing` expirées grâce à `FOR UPDATE SKIP LOCKED`. L’identifiant campagne/destinataire et les états déjà acceptés empêchent une seconde livraison confirmée.

## Contrôles avant activation

- Aucun secret dans les fichiers publics ou les logs.
- Aucun e-mail “payé” avant confirmation Viva.
- Aucune newsletter sans consentement.
- Une panne d’e-mail ne supprime jamais la commande.
- Une relance ne crée ni doublon de message ni doublon de commande.
- Les documents sont dans un stockage privé et restent accessibles uniquement au client concerné ou à la propriétaire.
- Les tests `npm run check` et les tests Edge ciblés passent avant tout déploiement.
