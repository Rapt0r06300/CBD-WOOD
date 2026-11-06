# Contrat WOOD — rôle propriétaire

Statut : contrat local vérifiable, sans activation de production.

## Périmètre et source de vérité

Le parcours couvre uniquement la détection d’un compte propriétaire autorisé et l’accès à l’espace de gestion intégré au compte client. La source de vérité d’autorisation est la session Supabase validée par `supabase.auth.getUser()`, puis la présence de l’utilisateur dans `public.owner_users`. Une adresse e-mail, un rôle client ou un contrôle visuel ne peut jamais accorder l’accès.

Le lien `ownerDashboardLink` et le conteneur `ownerDashboard` restent masqués, non focusables et `aria-hidden` tant que la vérification n’a pas confirmé la présence dans `owner_users`. Aucun itinéraire public `admin.html` n’est créé. Le rôle `customer` reste explicitement non privilégié.

## Parcours principal

1. La page compte conserve la session persistante et demande l’utilisateur courant à Supabase.
2. Le profil, les commandes filtrées par `customer_id` et l’existence éventuelle dans `owner_users` sont chargés.
3. Pour un propriétaire confirmé, le lien et le dashboard sont révélés, puis `mountOwnerDashboard` charge les données utiles.
4. Pour un client, une session absente, une erreur ou une réponse incomplète, l’interface reste dans son état client et expose un message compréhensible.

Les décisions métier non tranchées par la propriétaire ou son conjoint restent indiquées comme à confirmer. Cette passe ne transforme ni les promotions, ni les frais, ni les délais en promesse commerciale.

## Contrat de contenu et de données

Le dashboard owner présente les commandes, produits, stocks, documents, notifications et campagnes avec des états lisibles : vide, chargé, indisponible, erreur et action en cours. Les champs modifiables sont validés côté interface puis contrôlés par la base ou une fonction serveur.

Les changements d’état d’une commande passent par `owner_update_order_status`. Une correction d’adresse passe par `owner_update_order_address` avec un motif obligatoire. Les transitions, les rôles, les sessions, les longueurs de texte et les commandes inexistantes sont refusés par les contrôles serveur. Les tables `order_status_changes` et `order_address_changes` conservent l’acteur, l’ancien état ou l’ancienne adresse, la nouvelle valeur, le motif et la date.

## Écritures contrôlées et audit

Les fonctions owner sont `security definer`, fixent `search_path = public`, vérifient `owner_users`, verrouillent la commande avec `for update` et limitent leurs droits d’exécution. Les tables d’audit sont lisibles uniquement par un propriétaire authentifié ou par le rôle de service prévu ; elles ne sont pas des surfaces d’écriture client directes.

Le dashboard n’écrit donc pas directement le statut ou l’adresse dans `orders`. Il désactive le contrôle pendant l’action, recharge les données après erreur et affiche une confirmation quand l’audit est enregistré. L’annulation exige un motif et les doubles clics sont neutralisés par l’état désactivé du contrôle.

## États, erreurs et fallback

- Session absente ou expirée : conserver le parcours client et afficher `Session invalide.` pour une action protégée.
- Donnée absente : afficher un état vide explicite, sans inventer de produit, de commande ou de document.
- RPC refusée : conserver la valeur affichée, réactiver le contrôle, afficher l’erreur et recharger la commande.
- Autorisation incomplète : ne pas révéler le dashboard, le lien ou les données owner.
- Donnée manquante en démo : conserver les libellés de préparation, les documents non disponibles et les règles commerciales à confirmer.

## Responsive, clavier et reduced-motion

Le contrôle owner reste accessible à la souris, au clavier et au lecteur d’écran : bouton typé, libellé explicite, focus retiré quand le contrôle est masqué, dialogues fermables et messages d’état associés. Les tableaux passent par les libellés `data-label` et les formulaires restent utilisables sur mobile, tablette et ordinateur.

Les transitions décoratives restent secondaires au contenu. Une préférence `prefers-reduced-motion` doit supprimer ou raccourcir les mouvements non nécessaires ; l’action, le focus et les messages ne dépendent jamais d’une animation.

## Preuve, revue et rollback

La preuve locale est constituée par les tests owner existants, `test/wood-owner-role-contract.test.mjs`, les validations de syntaxe et les audits de préparation. La preuve navigateur/appareil réel et la revue de la propriétaire et de son conjoint restent des étapes humaines ouvertes.

Le retour arrière consiste à restaurer la version legacy sauvegardée et à retirer les migrations owner ajoutées après export contrôlé, après vérification de la sauvegarde et de l’ordre des dépendances. Aucun secret, compte réel ou réglage de production n’est requis pour cette passe. Toute activation de production attend la recette Supabase, l’hébergement, le domaine et les décisions commerciales officielles.
