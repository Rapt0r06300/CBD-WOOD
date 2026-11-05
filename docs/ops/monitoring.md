# Supervision minimale WOOD

Ce document définit les contrôles à activer lors du transfert. Il ne prétend pas
qu’un fournisseur de monitoring est déjà connecté.

## Contrôles

| Contrôle | Seuil d’action | Première action propriétaire |
| --- | --- | --- |
| page d’accueil / 404 | deux échecs consécutifs | vérifier l’hébergeur, puis ouvrir le runbook incident |
| Edge Function de commande | une réponse 5xx ou 429 anormale | ne pas recréer la commande ; rechercher l’identifiant de requête |
| commandes bloquées | toute commande en état `blocked` | arrêter la préparation et vérifier paiement/stock |
| outbox e-mail | un job `failed` ou `dead_letter` | lire l’erreur puis utiliser `Reprendre` si la cause est corrigée |
| document PDF | job expiré ou sans document | ne pas envoyer de faux reçu ; relancer la génération contrôlée |
| stock | valeur négative ou incohérente | suspendre la référence et corriger depuis l’espace propriétaire |

## Règles

- Les alertes doivent contenir un identifiant de commande ou de job, jamais une
  adresse complète, un token, une clé ou un contenu de paiement.
- Une alerte ne confirme jamais un paiement : seul l’état serveur `paid` le fait.
- Les seuils et le canal d’alerte seront validés avec la propriétaire avant
  l’ouverture commerciale.
- Le contrôle externe doit tester au minimum `index.html`, `404.html`, la
  fonction de commande et la présence d’une reprise d’outbox.

