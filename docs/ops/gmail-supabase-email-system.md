# Système e-mail WOOD — Gmail, Supabase et livraison

## Principe

Le site ne connecte pas un mot de passe Gmail à la base de données. Supabase conserve les commandes, les consentements, les documents et les états d’envoi. Une Edge Function privée utilise OAuth Gmail pour envoyer les messages.

```text
commande persistée
  → order_notification_outbox
  → email-worker (bail anti-doublon)
  → Gmail API OAuth
  → email_delivery_attempts
  → état visible dans l’espace propriétaire
```

Les confirmations de commande et les confirmations de paiement sont séparées. Un reçu disant que le paiement est confirmé ne peut partir qu’après un webhook Viva Wallet vérifié. Tant que Viva n’est pas connecté, le site ne doit envoyer qu’un statut d’enregistrement ou d’attente.

## Fichiers

- `supabase/migrations/20261105100000_email_automation_foundation.sql` : tables, RLS, nouvelles catégories et fonction de réservation atomique.
- `supabase/functions/email-worker/core.mjs` : normalisation, retries, MIME et encodage Gmail.
- `supabase/functions/email-worker/gmail.mjs` : échange du refresh token et appel Gmail `messages.send`.
- `supabase/functions/email-worker/message.mjs` : messages de commande sans affirmation de paiement prématurée.
- `supabase/functions/email-worker/worker-core.mjs` : traitement idempotent, retries et dead-letter.
- `supabase/functions/email-worker/index.ts` : fonction Edge privée qui loue les jobs puis les envoie.

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
10. Lancer un test vers une adresse contrôlée, puis vérifier la file, la tentative et l’état `sent`.

Références officielles : [OAuth Gmail côté serveur](https://developers.google.com/workspace/gmail/api/auth/web-server), [envoi Gmail API](https://developers.google.com/workspace/gmail/api/guides/sending), [scopes Gmail](https://developers.google.com/workspace/gmail/api/auth/scopes).

## Exécution

Le worker doit être appelé par un mécanisme serveur planifié, par exemple Supabase Cron/`pg_net`, ou manuellement depuis un outil propriétaire protégé. Il ne doit pas être appelé directement par le navigateur public.

Avant chaque lot :

- le worker valide le jeton interne ;
- il renouvelle le token Gmail ;
- seulement ensuite il réserve des jobs avec `FOR UPDATE SKIP LOCKED` ;
- chaque job est traité une seule fois grâce au bail et à l’identifiant fournisseur.

En cas de quota ou de panne réseau, le job revient en `pending` avec un délai borné. En cas de scope révoqué, d’adresse invalide ou d’échec durable, il passe en `dead_letter` et reste visible pour intervention.

## Newsletter

La newsletter ne doit pas réutiliser aveuglément la file des commandes. Elle exige : consentement prouvable, confirmation éventuelle, désinscription, suppression, lots bornés, quotas, gestion des rebonds et journal par destinataire. Un achat ne vaut pas consentement marketing automatique.

Gmail peut convenir à un faible volume après vérification des limites et de la délivrabilité. Pour un volume important, la décision doit être réévaluée avec un fournisseur transactionnel spécialisé ; aucun basculement ne doit être automatique.

## Contrôles avant activation

- Aucun secret dans les fichiers publics ou les logs.
- Aucun e-mail “payé” avant confirmation Viva.
- Aucune newsletter sans consentement.
- Une panne d’e-mail ne supprime jamais la commande.
- Une relance ne crée ni doublon de message ni doublon de commande.
- Les documents sont dans un stockage privé et restent accessibles uniquement au client concerné ou à la propriétaire.
- Les tests `npm run check` et les tests Edge ciblés passent avant tout déploiement.
