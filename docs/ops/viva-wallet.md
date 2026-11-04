# Viva Wallet — frontière de paiement

Le site ne lance actuellement aucun paiement Viva. Le bouton de commande enregistre seulement une commande en attente ; cette limite protège la boutique tant que le compte professionnel n’est pas prêt.

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
