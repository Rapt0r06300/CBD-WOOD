# Exploitation e-mail WOOD — matrice, environnements et reprise

Ce document complète `gmail-supabase-email-system.md`. Il décrit ce qui peut
être préparé dans le dépôt sans connecter le compte Google de la propriétaire.
Les valeurs secrètes, les règles commerciales et les informations légales sont
volontairement absentes.

## Périmètre des messages

| Catégorie | Déclencheur | Destinataire | Paiement nécessaire | Marketing |
| --- | --- | --- | --- | --- |
| `order_created` | commande persistée | client | non | non |
| `owner_order_alert` | commande persistée | propriétaire | non | non |
| `payment_confirmed` | webhook Viva vérifié | client | oui | non |
| `invoice_ready` | document légal prêt | client | selon document | non |
| `delivery_update` | événement de livraison validé | client | non | non |
| `delivery_issue_alert` | événement de livraison `failed` | propriétaire | non | non |
| `order_cancelled` | annulation autorisée | client | non | non |
| `refund_confirmed` | remboursement confirmé | client | oui | non |
| newsletter | campagne `sending` + consentement actif | abonné | non | oui |

Une commande enregistrée n'est jamais présentée comme payée. Les e-mails
transactionnels restent séparés de la newsletter : le retrait marketing ne
supprime jamais une confirmation de commande, une facture ou une mise à jour de
livraison indispensable.

Aucun SMS n'est activé dans cette version : aucune interface ne promet un SMS
tant qu'un fournisseur, un consentement et un test de délivrabilité n'ont pas
été validés séparément.

## Sources de vérité

- **Supabase/Postgres** : commande, lignes immuables, état de paiement, stock,
  consentement, documents, file d'envoi et journal des tentatives.
- **Edge Functions** : secrets, contrôle d'accès, calcul serveur, génération
  des documents, appel Gmail et transitions idempotentes.
- **Navigateur** : présentation, panier local de secours et actions publiques ;
  il ne décide ni du prix final, ni du rôle, ni de l'état d'envoi.
- **GitHub Pages** : prévisualisation publique du paquet contrôlé uniquement ;
  aucun secret ou document client n'y est publié.

## Registre des décisions qui bloque l'activation

À confirmer par la propriétaire avant activation :

1. fournisseur et adresse d'expédition ;
2. volume transactionnel et éventuel volume newsletter ;
3. zones, frais, délais et minimum de livraison ;
4. identité légale à afficher sur les documents ;
5. contenu final des modèles et validation de la pièce jointe PDF ;
6. identifiants Viva Wallet et états de webhook ;
7. domaine de production et URL de redirection.

Tant qu'une décision manque, l'interface affiche « à confirmer » et le worker
reste inactif. Aucune valeur plausible ne doit être transformée en règle réelle.

## Matrice local / démonstration / production

| Environnement | Données | Origines autorisées | Secrets | Usage |
| --- | --- | --- | --- | --- |
| local | comptes et commandes fictifs | `http://localhost:3000`, `http://127.0.0.1:8765` | variables locales non commitées | développement |
| démonstration | données de maquette sans client réel | URL GitHub Pages exacte | secrets absents par défaut | validation visuelle |
| production | projet Supabase de la propriétaire | domaine final uniquement | secrets Edge Function | ouverture commerciale |

Les URL Supabase Auth, les redirections OAuth et `ALLOWED_ORIGINS` doivent être
définies séparément pour ces trois environnements. Une donnée de production ne
doit jamais être copiée dans local ou démonstration.

## Configuration non sensible et secrets

Le fichier `.env.example` ne contient que des noms et des valeurs fictives. Les
valeurs réelles sont saisies dans les secrets Supabase au dernier moment.

Secrets attendus côté serveur : `SUPABASE_SERVICE_ROLE_KEY`,
`EMAIL_WORKER_TOKEN`, `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`,
`GMAIL_REFRESH_TOKEN`, `GMAIL_FROM`, `DOCUMENT_WORKER_TOKEN`,
`NEWSLETTER_WORKER_TOKEN` et `NEWSLETTER_UNSUBSCRIBE_SECRET`.

Le mot de passe Gmail n'est jamais demandé, stocké ou envoyé. Le refresh token
OAuth est révocable et ne doit apparaître ni dans Postgres public, ni dans le
JavaScript public, ni dans les journaux.

## Rotation, révocation et restauration

1. Créer le nouveau secret dans le gestionnaire de secrets sans modifier le
   dépôt.
2. Déployer la fonction concernée et envoyer un message de test contrôlé.
3. Vérifier l'état de la file, l'identifiant fournisseur et l'absence de doublon.
4. Révoquer l'ancien secret seulement après cette vérification.
5. Si Google révoque l'accès, afficher « connexion à réautoriser », suspendre
   les tentatives non réessayables et conserver les commandes.
6. En cas de restauration, restaurer base, documents et secrets séparément,
   d'abord sur un projet de test, puis vérifier les migrations et les files
   avant toute reprise de production.

## Runbook simple pour la propriétaire

- **Voir une commande :** ouvrir l'espace propriétaire dans `compte.html`, puis
  consulter la section « Commandes ».
- **Voir un e-mail en erreur :** ouvrir « Notifications » ; l'état indique si
  une nouvelle tentative est possible.
- **Relancer :** utiliser uniquement l'action de reprise propriétaire ; ne pas
  supprimer manuellement une ligne dans Supabase.
- **Gmail révoqué :** reconnecter le compte Google via le parcours réservé à la
  propriétaire, puis envoyer un test avant de reprendre la file.
- **Document absent :** vérifier d'abord la file PDF ; une commande reste
  conservée même si la génération ou l'envoi est temporairement indisponible.
- **Panne générale :** ne pas recréer la commande ; relever son numéro et
  utiliser la reprise idempotente après rétablissement.

## Journal minimal des changements

Chaque modification de configuration doit être notée dans le journal de
passation (date, personne, environnement, raison, ancien état abstrait, nouvel
état abstrait, test effectué). Le journal ne contient jamais de secret, de
refresh token, d'adresse complète d'un client ou de contenu de commande réel.

## Menaces et réactions attendues

| Menace | Réaction obligatoire |
| --- | --- |
| double clic / double worker | clé d'idempotence + bail atomique |
| token Google révoqué | état visible, pause sûre, réautorisation |
| quota Gmail dépassé | délai borné, aucune duplication |
| adresse invalide | échec classé, commande conservée |
| PDF manquant | e-mail différé, pas de pièce jointe annoncée |
| double webhook Viva | transition idempotente et historique unique |
| accès client à l'outbox | refus RLS et absence de route publique |
| secret dans le paquet public | audit bloquant avant publication |

## Contrôle avant activation

`npm run check` doit passer, `npm run prepare:hostinger` doit produire le
paquet public attendu, les tests de sécurité doivent rester verts et un test
vers une adresse contrôlée doit confirmer le parcours complet. Sans secrets
réels, le résultat attendu est « prêt à connecter », jamais « e-mail envoyé ».
