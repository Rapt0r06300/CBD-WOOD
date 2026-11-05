# Déclenchement des workers Supabase

Le dépôt contient maintenant un déclencheur GitHub Actions préparé dans
`.github/workflows/supabase-workers.yml`. Il ne déploie rien et n’envoie aucun
message tant que les secrets GitHub ne sont pas renseignés.

## Worker transactionnel

Le workflow appelle `email-worker` toutes les cinq minutes. Si les secrets ne
sont pas présents, le job est volontairement inactif et ne révèle aucune valeur.

Secrets à créer plus tard dans les secrets du dépôt GitHub :

- `SUPABASE_FUNCTIONS_URL` : uniquement l’URL HTTPS finissant par
  `/functions/v1` du projet Supabase ;
- `EMAIL_WORKER_TOKEN` : la même valeur que le secret configuré sur la fonction
  `email-worker`.

Le workflow utilise uniquement une requête POST et le header serveur attendu.
Le refresh token Gmail, le client secret Gmail, la clé `service_role` et toute
clé Viva restent dans les secrets Supabase : ils ne doivent jamais être copiés
dans GitHub Actions, le dépôt ou le navigateur.

## Newsletter

La newsletter n’est pas lancée par le cron. La propriétaire doit déclencher
manuellement le workflow avec l’UUID d’une campagne explicitement validée. Le
secret supplémentaire `NEWSLETTER_WORKER_TOKEN` doit correspondre à la fonction
`newsletter-campaign`.

## Contrôles avant activation

1. Configurer Gmail/OAuth et les secrets Supabase sans les écrire dans Git.
2. Créer une campagne de test séparée, avec une adresse de test autorisée.
3. Lancer le workflow manuellement et vérifier l’outbox, le PDF et le journal
   des tentatives.
4. Vérifier qu’un échec laisse la commande conservée et relançable.
5. Ne jamais activer une newsletter réelle avant consentement, désinscription,
   SPF/DKIM/DMARC et validation de la propriétaire.
