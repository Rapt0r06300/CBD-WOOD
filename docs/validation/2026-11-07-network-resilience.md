# Résilience réseau locale — 7 novembre 2026

## Scénario navigateur

La démo a été vérifiée en Chromium local à `390 × 780` :

1. chargement de `index.html` avec une réponse CSS volontairement ralentie ;
2. contrôle du titre, du hero et du texte WOOD pendant le chargement ;
3. écriture d'un panier de démonstration dans `localStorage`, puis
   rechargement ;
4. ouverture de `fleurs.html`, passage hors ligne et retour navigateur vers
   l'accueil déjà chargé.

## Résultat observé

- premier écran lisible avec le ralentissement simulé ;
- passage observé : environ **718 ms** pour le DOM initial ralenti ;
- panier local retrouvé après rechargement ;
- hors ligne : `navigator.onLine === false`, hero et catalogue déjà chargés
  toujours présents ;
- retour navigateur hors ligne réussi vers `/index.html`.

Les scripts détectent aussi `saveData` et les types de connexion lents pour
réduire les mouvements non essentiels. Le panier de démo reste local et ne
déclenche aucune commande réelle.

## Limites

Cette preuve couvre une interruption après chargement et un ralentissement
simulé dans Chromium. Elle ne prétend pas remplacer une mesure 3G/4G réelle,
un appareil moyen, une batterie faible ou Safari/Android ; ces validations
restent externes.

Contrat : `test/network-resilience.test.mjs`.
