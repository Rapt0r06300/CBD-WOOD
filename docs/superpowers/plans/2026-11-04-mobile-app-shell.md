# Plan : interface mobile WOOD app-like

## Objectif

Faire évoluer l’affichage public du site GitHub Pages pour que chaque appareil
reçoive une présentation adaptée, tout en laissant le rendu ordinateur et le
contenu métier inchangés.

## Étapes

1. Ajouter une couche CSS publique chargée en dernier pour les safe areas,
   l’adaptation téléphone/tablette, les cibles tactiles et les états tactiles.
2. Ajouter une navigation mobile générée uniquement sur les pages publiques,
   avec accueil, boutique, panier et compte ; elle réutilise le panier existant
   au lieu de créer une seconde logique de commande.
3. Charger cette couche sur toutes les pages publiques et l’ajouter à la liste
   explicite du paquet Hostinger préparé localement.
4. Ajouter des tests statiques pour vérifier la présence de la couche sur toutes
   les pages, la sécurité des liens, les safe areas et l’absence d’impact sur la
   grille catalogue à trois colonnes.
5. Exécuter les tests du dépôt, le contrôle JavaScript, l’audit statique et le
   préflight Hostinger. Aucun déploiement ne sera effectué.

## Critères d’acceptation

- Le bureau conserve les styles actuels.
- Le mobile dispose d’une interface app-like sans contenu supprimé.
- Le site ne dépend pas d’une liste de modèles d’appareils.
- Aucun défilement horizontal involontaire n’est introduit.
- La navigation mobile ne duplique pas le panier et ne touche pas à Supabase.
