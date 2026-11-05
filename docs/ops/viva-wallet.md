# Viva Wallet — frontière de paiement

Le site ne lance actuellement aucun paiement Viva. Le bouton de commande enregistre seulement une commande en attente ; cette limite protège la boutique tant que le compte professionnel n’est pas prêt.

## Machine d’états retenue avant intégration

| Événement Viva | `payment_status` WOOD | Règle |
| --- | --- | --- |
| session créée / attente | `pending` | aucune preuve de paiement, aucun reçu payé |
| autorisation confirmée par webhook signé | `paid` | montant, devise et commande doivent correspondre |
| refus, expiration ou abandon | `failed` | la commande reste retrouvable et aucune confirmation payée n’est envoyée |
| annulation confirmée côté serveur | `failed` | idempotent, sans retour automatique en `paid` |
| remboursement confirmé côté serveur | `refunded` | le document et l’e-mail de remboursement peuvent être produits |
| état ou événement inconnu | `pending` | journaliser et demander une vérification, jamais marquer payé |

Le retour du navigateur n’est jamais une transition d’état. Toute transition
réelle devra produire un événement idempotent dans l’historique de commande,
avec identifiant Viva, montant et devise contrôlés côté serveur.

## Scénarios de recette sandbox à conserver

1. session créée puis webhook réussi ;
2. refus Viva ;
3. abandon sans webhook ;
4. webhook reçu avant le retour navigateur ;
5. même webhook reçu deux fois ;
6. montant ou devise divergents ;
7. expiration ;
8. remboursement confirmé.

Pour chaque scénario, conserver le statut final de la commande, l’événement
historique, le nombre de notifications et la règle « aucun faux paiement ».

## Activation future

1. Obtenir les identifiants professionnels et l’accord Viva pour le domaine de production.
2. Stocker les identifiants uniquement dans les secrets d’une Edge Function Supabase.
3. Créer la session de paiement côté serveur, jamais avec une clé privée dans le JavaScript public.
4. Rediriger le client vers la page Viva avec un identifiant de commande opaque.
5. Vérifier la signature du webhook côté serveur.
6. Rendre le webhook idempotent et ne passer la commande à `paid` qu’après vérification serveur.
7. Envoyer l’e-mail de confirmation uniquement après cette transition.
8. Tester succès, annulation, doublon, expiration et remboursement avant ouverture.

Ne jamais considérer le retour du navigateur comme une preuve de paiement.
