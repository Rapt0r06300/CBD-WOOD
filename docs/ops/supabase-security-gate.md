# Porte de sécurité Supabase avant ouverture

Ce document décrit le réglage Auth externe encore nécessaire et la revue de sécurité RPC avant toute ouverture commerciale. Ils ne doivent pas être remplacés par une valeur dans le dépôt et ne doivent pas être exécutés automatiquement depuis le navigateur.

## 1. Protéger la table privée de limitation de débit

La migration `supabase/migrations/20261105232000_rate_limit_rls.sql` a été appliquée au projet distant sous la version générée `20261105211227`. Le contrôle SQL confirme que `private.order_rate_limit_buckets` a RLS activé, que `anon` et `authenticated` n’ont aucun privilège de table et que `service_role` reste le seul rôle opérationnel.

Le pré-contrôle de la migration était :

```sql
alter table private.order_rate_limit_buckets enable row level security;

revoke all on table private.order_rate_limit_buckets from public, anon, authenticated;
grant all on table private.order_rate_limit_buckets to service_role;
```

La correction a été appliquée depuis une session Supabase autorisée, après vérification que l’Edge Function utilise bien `service_role`. Elle ne doit jamais être appliquée avec la clé publique du navigateur. Après application :

1. vérifier que `rls_enabled = true` pour la table ;
2. vérifier que `anon` et `authenticated` n’ont aucun privilège de table ;
3. vérifier que `service_role` peut encore exécuter `consume_order_rate_limit` ;
4. lancer une commande de test contrôlée puis vérifier que le panier et le rate limit restent fonctionnels ;
5. conserver le résultat daté dans la preuve de validation.

La preuve SQL distante est conservée dans `docs/validation/2026-11-05-local-readiness.md`. Règle de garde : tant que cette preuve distante n’existe pas, la porte de production reste fermée ; dans l’état courant, le test contrôlé de la fonction et les autres réglages Auth restent à terminer.

## 2. Activer la protection contre les mots de passe compromis

Le checkout sait maintenant afficher le widget Turnstile uniquement lorsque `turnstileSiteKey` est renseignée dans la configuration publique. Cette valeur est une sitekey publique, pas le secret de vérification ; tant que la clé et `REQUIRE_TURNSTILE=true` ne sont pas configurés dans le projet réel, le parcours local reste volontairement en mode démonstration.

Dans Supabase Auth, activer **Leaked Password Protection**. Ne pas désactiver la persistance de session WOOD ni modifier le rôle client par défaut. Après activation, vérifier :

- création d’un compte client avec un mot de passe acceptable ;
- refus explicite d’un mot de passe compromis ou trop faible ;
- réinitialisation par e-mail ;
- reconnexion de la propriétaire ;
- maintien du tableau de bord propriétaire après rafraîchissement ;
- absence de données client ou de menu propriétaire pour un compte ordinaire.

## 3. Advisor sur les RPC propriétaires

Après l’application des migrations `owner_order_status_rpc` et `owner_order_address_correction`, Supabase signale que les deux fonctions `SECURITY DEFINER` sont exécutables par `authenticated`. Cette exposition est volontaire pour permettre au compte propriétaire d’appeler les RPC depuis `compte.html` ; chaque fonction vérifie toutefois l’existence de l’acteur dans `owner_users`, borne les arguments et n’accorde aucun droit à `anon`. Cette décision doit être revue avec le réglage final d’exposition Data API avant l’ouverture commerciale.

## Preuve attendue

La feuille de route reste ouverte sur `A432` et `A46` tant que ces deux vérifications ne sont pas faites dans le projet Supabase réel. Le code local, les migrations, les tests négatifs et le runbook sont déjà prêts ; aucun identifiant n’est requis dans Git.
