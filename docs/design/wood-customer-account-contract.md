# Contrat du compte client WOOD

Statut : contrat local versionné. Le compte client permet de créer une session, retrouver ses propres commandes et exercer ses droits sans exposer une fonction, une donnée ou une route propriétaire.

## Périmètre et source de vérité

Le contrat couvre la création de compte, la connexion, la déconnexion, la persistance de session, le profil, l'historique des commandes, les documents prêts, la réinitialisation du mot de passe, l'export et la demande de suppression. `compte.html` porte le parcours et les noms accessibles ; `account.js` orchestre Supabase ; les tables et policies RLS sont la source de vérité des droits.

Le client ne reçoit que son profil, ses commandes rattachées à `customer_id`, les documents auxquels il a droit et les messages nécessaires au parcours. Les informations de livraison, paiement, notification et propriétaire restent bornées par leurs policies et fonctions dédiées.

## Création, connexion et session

Le formulaire distingue `Se connecter` et `Créer un compte`, identifie l'e-mail et le mot de passe par des labels, des types et `autocomplete`, et utilise `signInWithPassword` ou `signUp`. Une confirmation e-mail peut être requise ; l'interface explique alors l'étape sans inventer une session active.

La session Supabase est persistante et se rafraîchit automatiquement entre les pages. Au chargement, `getSession` est complété par `getUser` avant de monter la vue ; `onAuthStateChange` traite la connexion et la sortie. Une session expirée revient clairement au login sans effacer les informations déjà saisies.

## Historique et droits client

Après authentification, le client voit son profil, un état vide explicite si aucune commande n'est enregistrée, puis ses commandes triées et les documents prêts associés. Les noms, numéros, états, totaux et documents sont échappés avant affichage ; un téléchargement passe par une fonction authentifiée et n'expose pas de chemin de stockage.

Les actions de sécurité sont séparées : réinitialisation du mot de passe, changement de mot de passe, export JSON sans jetons et demande de suppression non destructive. Une demande de suppression est idempotente, réservée à l'utilisateur authentifié et traitée côté serveur ou propriétaire ; le compte n'est pas supprimé par un simple clic public.

## Frontière propriétaire et sécurité

Le rôle de base est `customer`. Le dashboard propriétaire reste caché, non focalisable et `aria-hidden` tant que la table `owner_users` ne confirme pas l'utilisateur. Aucun e-mail codé en dur ne confère les droits ; la présence propriétaire est vérifiée depuis la source de vérité Supabase.

L'ancienne route publique `admin.html` n'existe pas. Un compte client ne peut ni lire les commandes d'un autre utilisateur, ni s'attribuer le rôle propriétaire, ni accéder aux réglages catalogue, stock, adresses, documents privés, newsletter ou notifications. Les erreurs de réseau et d'autorisation restent textuelles et ne révèlent pas de secret.

## Responsive, erreurs et fallback

Le compte conserve ses formulaires, boutons, tableaux et messages sur desktop, tablette et mobile, sous la barre mobile et dans les safe areas. Les champs et actions restent utilisables au clavier, au toucher et avec reduced-motion ; la vue propriétaire peut être montée ou masquée sans déplacer le parcours client.

Sans configuration Supabase, la page indique que la connexion sécurisée n'est pas disponible. Un échec de session conserve les informations saisies, une liste vide reste compréhensible et un document indisponible n'efface pas l'historique. Les transitions et l'animation n'ont jamais de rôle d'autorisation.

## Preuve, revue et rollback

La preuve locale est `test/wood-customer-account-contract.test.mjs`, complétée par `test/account-owner-role.test.mjs`, `test/account-rights.test.mjs`, `test/owner-dashboard-session-and-status.test.mjs`, les tests RLS, documents, accessibilité et responsive. Elle vérifie la session, le rôle client, le filtrage par utilisateur, les droits de suppression, l'exclusion admin et le masquage propriétaire.

La propriétaire et son conjoint relisent les libellés, les états de session, les messages de droits et la séparation client/propriétaire ; les essais sur navigateurs, lecteurs d'écran et appareils réels restent externes. Pour revenir en arrière, restaurer le snapshot validé de `compte.html`, `account.js`, `owner-dashboard.js`, `boutique.css` et des migrations de rôles/droits, puis rejouer `npm run check`. Le rollback ne supprime aucune commande ni donnée client.
