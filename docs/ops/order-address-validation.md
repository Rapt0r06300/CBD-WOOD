# Validation de l’adresse de livraison WOOD

Le checkout collecte maintenant une adresse structurée :

- ligne d’adresse principale ;
- complément facultatif ;
- code postal ;
- ville ;
- pays.

La fonction de commande normalise les espaces, les accents et la casse du pays, refuse les caractères de contrôle et conserve aussi un `delivery_address` lisible comme snapshot au moment de la commande. Les anciens appels qui ne fournissent que le texte `delivery_address` restent acceptés pendant la transition.

Cette validation ne décide pas des zones, des frais, du transporteur ou des délais : ces règles commerciales doivent encore être fournies par la propriétaire avant l’ouverture réelle. Le code ne doit pas transformer une adresse valide en promesse de livraison. Pour l’instant, la base conserve volontairement le snapshot texte canonique ; une future recherche par champ pourra ajouter une colonne JSONB dans une migration séparée.

Une correction nécessaire après contact client ne passe pas par une écriture directe du navigateur : `owner_update_order_address` vérifie le rôle propriétaire, verrouille la commande, exige un motif et écrit une trace dans `order_address_changes`.

Avant mise en production :

1. tester une commande invitée et une commande connectée avec complément d’adresse ;
2. vérifier le PDF et l’e-mail avec le snapshot complet ;
3. ajouter une migration JSONB seulement si l’exploitation a réellement besoin de filtrer par ville ou code postal ;
4. décider les zones, frais, délais et retours séparément.
