# E-mails de commande — mise en service

Le site enregistre une commande avec le statut `pending` et ne prétend pas avoir envoyé un reçu. C’est volontaire tant qu’aucun expéditeur fiable n’est configuré. Le worker Gmail est maintenant préparé dans `supabase/functions/email-worker/`, mais il reste inactif tant que les secrets OAuth de la propriétaire ne sont pas renseignés.

## Architecture retenue

1. La commande est créée et recalculée par l’Edge Function Supabase.
2. Une ligne est ajoutée dans `order_notification_outbox` après la persistance, avec un identifiant unique par commande et type de notification.
3. Le paiement, lorsqu’il sera activé, confirme la commande par webhook signé et ajoute la notification de paiement correspondante.
4. La fonction Edge `email-worker` réserve ensuite l’e-mail avec un bail anti-doublon, l’envoie via Gmail OAuth, journalise la tentative et met à jour `pending / processing / sent / failed / dead_letter`.
5. Le message contient le numéro de commande, le récapitulatif, l’adresse de livraison et le statut réel.
6. La pièce jointe PDF ne doit être générée qu’après la persistance réussie de la commande ; elle ne doit jamais servir de preuve de paiement avant le webhook.

## Fournisseur nécessaire

Construire le protocole SMTP complet soi-même ne rend pas l’envoi fiable. Il faut un relais SMTP/API transactionnel, avec :

- clé stockée dans les secrets Supabase, jamais dans le navigateur ou GitHub ;
- domaine d’envoi vérifié ;
- SPF, DKIM et DMARC ;
- gestion des erreurs, rebonds et limites ;
- adresse de réponse contrôlée.

Le fournisseur et les identifiants restent à connecter par la propriétaire. La procédure exacte est dans `docs/ops/gmail-supabase-email-system.md`. Aucun faux e-mail n’est envoyé par le site tant que cette étape n’est pas réalisée.

La file d’attente est donc prête côté données, mais elle reste volontairement inactive tant que la propriétaire n’a pas choisi le fournisseur et renseigné ses secrets. Une panne d’envoi ne supprime pas la commande : la ligne reste disponible pour une nouvelle tentative ou une intervention propriétaire.
