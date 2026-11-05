# Validation de l’adresse de livraison WOOD

Le checkout collecte maintenant une adresse structurée :

- ligne d’adresse principale ;
- complément facultatif ;
- code postal ;
- ville ;
- pays.

La fonction de commande normalise les espaces, les accents et la casse du pays, refuse les caractères de contrôle et conserve aussi un `delivery_address` lisible comme snapshot au moment de la commande. Les anciens appels qui ne fournissent que le texte `delivery_address` restent acceptés pendant la transition.

Cette validation ne décide pas des zones, des frais, du transporteur ou des délais : ces règles commerciales doivent encore être fournies par la propriétaire avant l’ouverture réelle. Le code ne doit pas transformer une adresse valide en promesse de livraison.

Avant mise en production :

1. appliquer la migration finale de fonction après sauvegarde Supabase ;
2. vérifier que le projet distant utilise bien la version qui accepte `delivery_address_details` ;
3. tester une commande invitée et une commande connectée avec complément d’adresse ;
4. vérifier le PDF et l’e-mail avec le snapshot complet ;
5. décider les zones, frais, délais et retours séparément.
