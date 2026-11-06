# Contrat livraison WOOD

Statut : contrat local versionné. Le parcours public propose uniquement la livraison à domicile, annoncée avant l'achat et confirmée seulement après validation de la commande ; aucun retrait en magasin n'est simulé.

## Périmètre et source de vérité

Le contrat couvre l'annonce de livraison sur l'accueil et les quatre boutiques, le panier, le checkout, les coordonnées client, l'adresse structurée, la création de commande, les migrations de sécurité et les événements de suivi. `order-options.js` définit l'unique mode public, `boutique.js` compose le récapitulatif, `checkout-required.js` guide les champs et la validation serveur reste l'autorité de l'adresse, du stock, du prix et de la commande.

Les adresses des boutiques peuvent rester des coordonnées de contact, mais elles ne deviennent pas des options de retrait. Les frais, zones, délais et transporteur restent `à confirmer` tant que la propriétaire ne les a pas validés. Le texte public n'invente ni tarif, ni délai, ni disponibilité géographique.

## Annonce avant achat et parcours

Chaque boutique affiche `Livraison disponible à domicile` avant le catalogue et l'accueil explique que les frais, zones et délais seront précisés. Le parcours de référence est `accueil → boutique → fiche → panier → checkout → commande en attente/confirmation`.

Le checkout présente les lignes, quantités, prix provisoires et la livraison à domicile. Il ne contient aucun choix Barla, Borriglione, retrait ou pickup. Le mode persistant est validé avant l'envoi et la commande ne se poursuit pas si le panier est vide, si les coordonnées sont invalides ou si le service contrôlé n'est pas disponible.

## Adresse, validation et persistance

Le client peut corriger son nom, son e-mail, son téléphone et son adresse avant l'enregistrement. L'adresse structurée conserve ligne 1, ligne 2 facultative, code postal, ville et pays ; un snapshot texte accompagne les détails normalisés pour permettre la relecture propriétaire.

Les champs requis utilisent des labels et `aria-required`. La validation serveur borne les tailles, caractères, pays, code postal et téléphone, refuse les champs dangereux et n'accepte qu'une commande `delivery`. Le panier reste local jusqu'à l'acceptation de la commande ; une erreur ne le vide pas et propose un état récupérable.

## États, erreurs et fallback

Le chargement indique une vérification en cours et borne l'action pour empêcher les doubles soumissions. Un panier vide demande d'ajouter une référence ; une adresse incomplète explique le champ manquant ; une panne réseau dit que la commande n'est pas confirmée et conserve le panier. Une commande acceptée reçoit un numéro et mène à la page de confirmation, sans prétendre que Viva Wallet est déjà actif.

Si la configuration externe manque, le bouton reste dans un état sûr et le texte explique la séparation entre commande préparée, paiement futur et e-mail. Une erreur de suivi ne supprime pas l'historique : les événements sont idempotents, authentifiés et peuvent être repris par la propriétaire.

## Sécurité, conformité et limites externes

La migration finale verrouille `fulfillment_mode = 'delivery'`, conserve la colonne historique nullable sans la réactiver et refuse un `pickup_code`. La fonction SQL active vérifie le mode avant de persister, recalcule les produits et totaux depuis la source serveur, réserve le stock atomiquement et écrit l'historique sans accès public implicite.

Les événements de livraison exigent une session propriétaire, une clé d'idempotence et le rôle `owner_users`; ils ne révèlent pas de secret, de clé Supabase, de chemin de stockage ou de donnée client à un visiteur. Les réglages Gmail, Viva Wallet, Supabase production, Hostinger, DNS et zones de livraison restent des étapes externes et ne sont pas masqués par la démo.

## Preuve, revue et rollback

La preuve locale est `test/wood-delivery-contract.test.mjs`, complétée par `test/order-options.test.js`, `test/delivery-notice.test.mjs`, `test/checkout-address-contract.test.mjs`, `test/checkout-copy.test.mjs`, les tests de fonction livraison-only, de sécurité d'adresse, de stock et d'événements.

La propriétaire et son conjoint valident les zones desservies, frais, délais, texte final et état de confirmation ; les essais sur navigateurs et appareils réels restent séparés. Pour revenir en arrière, restaurer le snapshot validé des templates checkout, `order-options.js`, `checkout-required.js`, `boutique.js` et des migrations de garde, puis rejouer `npm run check`. Le rollback ne supprime pas l'historique de commandes.
