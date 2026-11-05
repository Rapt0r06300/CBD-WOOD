# Contrat des documents PDF WOOD

Ce document décrit le socle local des confirmations, reçus et factures. Il ne
remplace pas la recette distante ni la validation des informations légales.

## Identité et numérotation

- une commande possède un `order_number` immuable ;
- la confirmation ajoute le suffixe `-C`, le reçu de paiement `-R` et la
  facture `-F` ;
- le numéro complet est conservé dans `invoice_documents.document_number` ;
- la base impose l'unicité du numéro et du couple `(order_id, document_kind)` ;
- une nouvelle tentative ne crée donc pas une seconde preuve pour le même
  événement ;
- le numéro de commande lui-même doit rester séquentiel selon la règle qui sera
  validée avec la propriétaire et le schéma Supabase distant.

## Mise en page

Le worker serveur produit une page A4, avec une hiérarchie courte et stable :
identité WOOD, type de document, numéro, client, adresse de livraison, lignes
de commande, grammage, total et pied de page. Le modèle vient uniquement de
l'instantané de la commande, jamais d'un catalogue relu après achat.

Avant l'ouverture commerciale, la recette doit vérifier au minimum :

1. commande contenant un nom de variété long ;
2. adresse longue avec complément ;
3. plusieurs lignes et quantités ;
4. accents français, `€`, apostrophes et tirets ;
5. total en bas de page sans chevauchement ;
6. affichage à 100 %, impression A4 et lecture sur téléphone.

La police standard du prototype n'est pas considérée comme une preuve de
compatibilité universelle. Une police embarquée compatible avec les caractères
réellement utilisés devra être choisie, contrôlée et versionnée avant le
premier document de production. Aucun PDF ne doit être envoyé si le rendu est
illisible ou si les données légales requises manquent.

## Reprise après incident

La file `document_generation_jobs` est réservée au serveur, unique par commande
et type de document, et récupérable après expiration du bail. Le worker peut
réessayer un traitement temporairement échoué, puis le placer en `dead_letter`
après le nombre maximal d'essais. Une reprise doit :

1. retrouver l'instantané de commande ;
2. vérifier le statut de paiement avant un reçu ;
3. réutiliser le même numéro et le même chemin privé ;
4. recalculer puis enregistrer le hash SHA-256 ;
5. ne remettre l'e-mail en file qu'après un document `ready` ;
6. laisser une trace exploitable si la génération reste impossible.

La génération ne doit jamais transformer une commande en paiement confirmé,
ni exposer un chemin Storage permanent. La restauration réelle de la base, du
bucket privé et des secrets sera testée séparément sur l'environnement de test.
