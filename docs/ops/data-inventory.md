# Inventaire des données WOOD

Cet inventaire décrit le périmètre technique. Les durées de conservation, le
texte légal et la base juridique doivent encore être validés par la propriétaire
et son conseil ; aucune durée n’est inventée ici.

| Donnée | Finalité | Accès prévu | Source / snapshot | Durée |
| --- | --- | --- | --- | --- |
| identité Auth et e-mail | connexion, compte, récupération | utilisateur concerné / owner selon besoin | Supabase Auth | à valider |
| profil client | personnaliser le compte et relier une commande | utilisateur concerné / owner opérationnel | `customer_profiles` | à valider |
| nom, téléphone, adresse | préparer et livrer une commande | client concerné / owner opérationnel | snapshot dans `orders` | à valider |
| lignes, grammage, prix, total | conserver ce qui a été commandé | client concerné / owner | `order_items` + snapshot commande | à valider |
| état commande, paiement, événements | suivre le traitement et éviter les faux reçus | client concerné / owner | historique append-only | à valider |
| notifications et tentatives | reprendre un e-mail sans perdre la commande | owner / worker serveur | outbox et tentatives | à valider |
| documents PDF | fournir confirmation, facture ou reçu autorisé | client concerné / owner | bucket privé + référence commande | à valider |
| newsletter et consentement | envoyer uniquement un marketing accepté | abonné concerné / owner marketing | consentement, suppression, campagnes | à valider |
| journaux techniques et audits | diagnostiquer sans exposer de secret | owner habilité / service | identifiants, états, acteurs | à valider |
| panier local | reprendre une saisie non envoyée | appareil du visiteur | stockage local du navigateur | à valider |

## Garde-fous

- Le navigateur ne reçoit ni clé service, ni refresh token, ni chemin durable de
  stockage privé.
- Une panne d’e-mail ne supprime jamais une commande.
- L’achat ne vaut pas consentement newsletter.
- Une demande de suppression client ne doit pas détruire une conservation légale
  sans décision documentée.
- Les exports, suppressions, sauvegardes et restaurations seront journalisés
  selon la politique finalement validée.

