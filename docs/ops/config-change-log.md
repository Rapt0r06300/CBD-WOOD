# Journal des changements de configuration WOOD

Ce fichier est un modèle de journalisation. Une entrée est ajoutée après chaque
changement de configuration local, Supabase, Gmail ou hébergement. Il ne doit
jamais contenir de secret, de refresh token, d'adresse client complète ou de
contenu de commande.

| Date UTC | Auteur | Environnement | Composant | Raison | État abstrait avant | État abstrait après | Test effectué | Retour arrière |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| — | — | — | — | Aucune modification enregistrée dans ce modèle | — | — | — | — |

## Règles

- écrire uniquement des états abstraits (`configured`, `revoked`, `paused`,
  `verified`) et jamais les valeurs ;
- joindre un lien vers le commit, la migration ou le résultat de test ;
- noter séparément les changements Supabase, secrets et DNS ;
- obtenir la validation de la propriétaire pour une modification de production ;
- conserver ce journal avec la procédure de passation et les sauvegardes.
