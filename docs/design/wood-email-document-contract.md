# Contrat WOOD — e-mails, PDF et notifications

Statut : préparation locale vérifiable, **prêt à connecter**, sans activation Gmail, Viva ou production.

## Périmètre et séparation

Le périmètre couvre les confirmations de commande, alertes propriétaire, reçus après paiement confirmé, factures et documents prêts, mises à jour de livraison, annulations autorisées, remboursements confirmés et newsletter future. Les événements `order_created`, `payment_confirmed`, `invoice_ready`, `delivery_update`, `delivery_issue_alert`, `order_cancelled`, `refund_confirmed` et `newsletter` restent des catégories distinctes.

Un message transactionnel n’est pas du marketing. Une commande enregistrée n’est jamais présentée comme payée ; un reçu n’est généré qu’après l’état de paiement confirmé ; une newsletter exige un consentement actif et reste désactivée sans configuration métier. Aucun message commercial ou aucun e-mail réel n’est envoyé dans la démo locale.

## Sources de vérité et file

Supabase/Postgres conserve les commandes, états, consentements, documents, files et tentatives. Les Edge Functions gardent les secrets, contrôlent l’acteur, construisent le message, appellent Gmail et appliquent les transitions idempotentes. Le navigateur ne décide ni du prix, ni du paiement, ni du rôle, ni de l’état d’envoi.

Les jobs ont une clé métier, un nombre de tentatives, un bail et un état lisible. Le worker réclame les jobs avec `for update skip locked`, traite une unité à la fois, enregistre l’identifiant fournisseur sans enregistrer de secret, puis libère ou reprend un job expiré. Un double worker, un double clic ou un webhook répété ne doit pas créer de doublon.

## PDF privé et secrets

Les confirmations, reçus et factures PDF sont générés côté serveur dans une file idempotente, rattachés à une commande et stockés dans un espace privé. Le client ne lit jamais une table de génération par défaut, ne fournit pas un chemin Storage arbitraire et ne reçoit pas de faux reçu.

Les secrets `SUPABASE_SERVICE_ROLE_KEY`, `EMAIL_WORKER_TOKEN`, `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `DOCUMENT_WORKER_TOKEN` et les secrets de désinscription restent dans le gestionnaire de secrets. `.env.example` ne contient que des noms et des valeurs fictives. Aucun `SUPABASE_ANON_KEY` n’est utilisé pour écrire dans une file serveur.

## États, erreurs et fallback

- Paiement en attente : confirmation de commande possible, mais jamais reçu de paiement.
- PDF manquant : document différé ou état d’erreur visible ; la commande reste conservée.
- Gmail révoqué : suspendre les tentatives non réessayables, afficher une reconnexion nécessaire et garder les commandes.
- Quota ou panne temporaire : backoff borné, bail repris et absence de duplication.
- Adresse ou données invalides : rejet classé avant l’envoi, sans recréer la commande.
- Consentement marketing absent ou retiré : aucune newsletter, sans supprimer les messages transactionnels nécessaires.

Un échec d’un message ne doit pas effacer l’état métier source. Les messages et documents manquants restent vérifiables dans la file et dans le journal des tentatives.

## Parcours, accessibilité et revue

Le dashboard owner expose l’état de la file, l’erreur utile et l’action `Relancer` uniquement pour une session owner. Les libellés sont lisibles au clavier et avec un lecteur d’écran ; le contenu reste compréhensible sur mobile, tablette et ordinateur. Les animations ne portent aucune information indispensable et le mode reduced-motion conserve tous les contrôles.

Le compte de la propriétaire et son conjoint valident séparément les textes, l’identité légale, les pièces PDF, l’adresse d’expédition, les règles de livraison et la qualité de présentation. Tant qu’une décision manque, l’interface conserve « à confirmer » et le worker reste inactif.

## Preuve, revue et rollback

La preuve locale regroupe les tests des migrations d’automatisation, du worker Gmail, des documents PDF, des notifications, du runbook et `test/wood-email-document-contract.test.mjs`. Elle inclut les refus anon/client, l’absence de secret, les files à bail, les doublons, le PDF manquant et le mode test. Elle ne vaut pas connexion Gmail réelle ni test de délivrabilité.

Le rollback consiste à suspendre les workers, conserver les commandes et les journaux, révoquer ou remplacer le secret concerné, puis restaurer les migrations, files ou documents depuis une sauvegarde contrôlée sur un projet de test. Aucun secret n’est ajouté au dépôt et aucune activation production n’est déclarée avant le test contrôlé vers une adresse approuvée.
