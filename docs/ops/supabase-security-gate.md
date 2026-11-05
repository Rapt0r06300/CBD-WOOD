# Porte de sécurité Supabase avant ouverture

Ce document décrit les deux réglages externes encore nécessaires avant toute ouverture commerciale. Ils ne doivent pas être remplacés par une valeur dans le dépôt et ne doivent pas être exécutés automatiquement depuis le navigateur.

## 1. Protéger la table privée de limitation de débit

L’audit distant du 5 novembre 2026 a constaté que `private.order_rate_limit_buckets` existe mais que RLS n’est pas activé sur cette table. La migration locale prête à appliquer est :

```sql
alter table private.order_rate_limit_buckets enable row level security;

revoke all on table private.order_rate_limit_buckets from public, anon, authenticated;
grant all on table private.order_rate_limit_buckets to service_role;
```

Cette correction doit être appliquée depuis une session Supabase autorisée, après vérification que l’Edge Function utilise bien `service_role`. Elle ne doit pas être appliquée avec la clé publique du navigateur. Après application :

1. vérifier que `rls_enabled = true` pour la table ;
2. vérifier que `anon` et `authenticated` n’ont aucun privilège de table ;
3. vérifier que `service_role` peut encore exécuter `consume_order_rate_limit` ;
4. lancer une commande de test contrôlée puis vérifier que le panier et le rate limit restent fonctionnels ;
5. conserver le résultat daté dans la preuve de validation.

La migration versionnée est `supabase/migrations/20261105232000_rate_limit_rls.sql`. Tant que cette preuve distante n’existe pas, la porte de production reste fermée.

## 2. Activer la protection contre les mots de passe compromis

Dans Supabase Auth, activer **Leaked Password Protection**. Ne pas désactiver la persistance de session WOOD ni modifier le rôle client par défaut. Après activation, vérifier :

- création d’un compte client avec un mot de passe acceptable ;
- refus explicite d’un mot de passe compromis ou trop faible ;
- réinitialisation par e-mail ;
- reconnexion de la propriétaire ;
- maintien du tableau de bord propriétaire après rafraîchissement ;
- absence de données client ou de menu propriétaire pour un compte ordinaire.

## Preuve attendue

La feuille de route reste ouverte sur `A432` et `A46` tant que ces deux vérifications ne sont pas faites dans le projet Supabase réel. Le code local, les migrations, les tests négatifs et le runbook sont déjà prêts ; aucun identifiant n’est requis dans Git.
