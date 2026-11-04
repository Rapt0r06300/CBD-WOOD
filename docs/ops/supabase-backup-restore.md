# Sauvegarde et restauration Supabase

Cette procédure doit être exécutée par la propriétaire ou une personne autorisée avant toute migration de production. Elle ne contient aucun secret.

## Avant une modification

1. Vérifier que la commande `npm run check` passe dans le dépôt.
2. Dans Supabase, confirmer le bon projet et noter la date, le nom de la migration et le résultat attendu.
3. Créer ou conserver une sauvegarde du projet depuis les outils de sauvegarde Supabase disponibles sur le plan utilisé.
4. Exporter séparément, si nécessaire, les données métier indispensables : `products`, `product_prices`, `orders`, `order_items`, `customer_profiles`, `order_status_history` et `order_notification_outbox`.
5. Ne jamais copier une clé secrète dans GitHub, un fichier public ou un ticket.

## Après une modification

1. Vérifier les tables, contraintes, fonctions, triggers et politiques RLS concernées.
2. Contrôler qu’une commande existante reste lisible par son client et par la propriétaire, sans fuite entre clients.
3. Contrôler que le stock, l’idempotence, l’historique d’état et la file de notifications restent cohérents.
4. Conserver la référence de sauvegarde et le résultat des contrôles avec la migration.

## Restauration

La restauration ne doit pas être improvisée en production. La propriétaire doit d’abord restaurer une copie de test ou un projet Supabase de test, exécuter les contrôles ci-dessus, puis valider explicitement la fenêtre de maintenance et le plan de retour. Une restauration réelle reste à tester avant l’ouverture commerciale.

## Contrôles minimums avant ouverture

- une sauvegarde récente est retrouvable ;
- la restauration a été répétée sur un environnement de test ;
- les commandes persistées et leurs états restent présents ;
- l’absence d’e-mail ne supprime jamais une commande ;
- aucun paiement n’est annoncé comme confirmé sans webhook Viva vérifié.
