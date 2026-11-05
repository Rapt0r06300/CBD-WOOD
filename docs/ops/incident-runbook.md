# Runbook incident WOOD

Ce runbook sert à traiter un incident sans perdre une commande ni annoncer un paiement qui n’est pas confirmé.

## Commande introuvable

1. Chercher par numéro de commande, e-mail client et date dans le tableau de bord.
2. Vérifier `orders`, `order_items`, `order_status_history` et l’outbox ; ne jamais recréer la commande depuis le navigateur.
3. Si la commande existe, conserver son identifiant et relancer uniquement la notification autorisée.
4. Si elle n’existe pas, demander au client l’heure, le panier et le message reçu ; ne jamais promettre un paiement avant vérification Viva.

## E-mail échoué

1. Lire l’état `pending`, `processing`, `failed` ou `dead_letter` et le code fournisseur.
2. Corriger la configuration côté serveur, puis utiliser l’action propriétaire de reprise idempotente.
3. Vérifier le provider message id et l’absence de doublon avant de clore l’incident.

## Stock incohérent

1. Désactiver temporairement le produit concerné si le stock réel est incertain.
2. Ne pas corriger une commande historique en modifiant le catalogue ; utiliser l’historique et le snapshot de commande.
3. Comparer l’opération atomique côté serveur, le stock courant et les lignes persistées avant toute correction.

## Panne Supabase ou secret compromis

1. Ne pas exposer de clé dans un ticket, un navigateur ou un log.
2. Conserver le panier local et informer clairement que la commande n’est pas confirmée.
3. Révoquer et faire tourner le secret concerné côté fournisseur/Edge Function, puis vérifier les origines et les journaux.
4. Restaurer uniquement dans un environnement de test avant toute restauration de production.

## Après incident

- noter heure, commande, état avant/après, action et responsable ;
- rejouer les tests ciblés et `npm run check` ;
- ne déclarer l’incident clos qu’après vérification des commandes, stock, notification et paiement.
