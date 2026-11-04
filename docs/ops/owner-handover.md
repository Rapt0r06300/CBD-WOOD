# Passation WOOD — procédure courte

Cette procédure décrit la reprise du projet par la propriétaire. Elle ne contient aucun mot de passe, aucune clé Supabase et aucune clé de paiement.

## 1. Accès à remettre

La propriétaire doit devenir propriétaire ou administratrice de ses propres comptes :

- dépôt GitHub privé du site ;
- projet Supabase et adresse e-mail de récupération ;
- futur hébergeur et domaine ;
- fournisseur d’e-mail transactionnel ;
- compte Viva.com lorsque le paiement sera activé.

Les secrets restent dans les réglages sécurisés du service concerné. Ils ne doivent jamais être copiés dans un fichier HTML, JavaScript, un ticket ou un e-mail.

## 2. Connexion à l’espace propriétaire

1. Ouvrir `compte.html` et se connecter avec le compte propriétaire.
2. Après validation de la session et du rôle `owner_users`, le bouton de gestion apparaît dans le compte.
3. La première vue affiche les commandes à traiter et les alertes importantes.
4. Un compte créé normalement reste un compte client : il ne voit pas le tableau de bord, les stocks ni les commandes globales.

Si le bouton n’apparaît pas, ne pas créer un nouveau rôle dans le navigateur : vérifier le compte et la ligne propriétaire dans Supabase.

## 3. Gestion quotidienne

- **Commandes :** ouvrir une commande, vérifier le client, l’adresse, le total et le statut de paiement, puis changer uniquement l’état de traitement approprié.
- **Produits :** modifier un nom, une description ou une disponibilité validée ; désactiver une fiche incomplète plutôt que publier un prix ou un stock supposé.
- **Stocks :** renseigner uniquement les quantités réellement disponibles. Une fiche sans stock ou sans prix reste non commandable.
- **Compte client :** les clients ne doivent accéder qu’à leur propre profil et à leur propre historique.
- **Promotions :** elles restent masquées et désactivées jusqu’à validation commerciale séparée.
- **Paiement :** Viva.com reste séparé tant que les identifiants professionnels et le webhook officiel ne sont pas configurés.

## 4. Avant de retirer l’accès du créateur

1. La propriétaire se connecte elle-même.
2. Elle vérifie une commande de test et une modification réversible de produit.
3. Elle confirme par écrit qu’elle est autonome.
4. Une sauvegarde Supabase est réalisée et conservée.
5. Seulement après ces vérifications, retirer l’accès de Florent au dépôt, à Supabase et aux services externes si elle le demande.

La suppression de l’accès de Florent n’est pas automatique : elle nécessite la confirmation de la propriétaire.

## 5. Contrôle avant ouverture commerciale

- les règles de livraison, frais et délais sont écrites et validées ;
- les stocks, photos et informations produit réels sont renseignés ;
- les pages légales sont fournies et validées ;
- l’e-mail transactionnel est testé avec un statut d’envoi traçable ;
- le paiement Viva.com et son webhook signé sont testés séparément ;
- la procédure [sauvegarde et restauration Supabase](supabase-backup-restore.md) a été exécutée et la restauration a été testée ;
- `npm run hostinger:preflight` passe et le paquet ne contient aucune route admin publique.

