# E-mails de commande — mise en service

Le site enregistre aujourd’hui une commande avec le statut `pending` et ne prétend pas avoir envoyé un reçu. C’est volontaire tant qu’aucun expéditeur fiable n’est configuré.

## Architecture retenue

1. La commande est créée et recalculée par l’Edge Function Supabase.
2. Le paiement, lorsqu’il sera activé, confirme la commande par webhook signé.
3. Une fonction serveur envoie ensuite un e-mail transactionnel au client et à la boutique.
4. Le message contient le numéro de commande, le récapitulatif, l’adresse de livraison et le statut réel.
5. La pièce jointe PDF ne doit être générée qu’après la persistance réussie de la commande ; elle ne doit jamais servir de preuve de paiement avant le webhook.

## Fournisseur nécessaire

Construire le protocole SMTP complet soi-même ne rend pas l’envoi fiable. Il faut un relais SMTP/API transactionnel, avec :

- clé stockée dans les secrets Supabase, jamais dans le navigateur ou GitHub ;
- domaine d’envoi vérifié ;
- SPF, DKIM et DMARC ;
- gestion des erreurs, rebonds et limites ;
- adresse de réponse contrôlée.

Le fournisseur et les identifiants restent à choisir par la propriétaire. Aucun faux e-mail n’est envoyé par le site tant que cette étape n’est pas réalisée.
