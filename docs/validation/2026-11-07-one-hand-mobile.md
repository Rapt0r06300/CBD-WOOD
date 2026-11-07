# Parcours une main mobile — 7 novembre 2026

Le shell mobile garde les actions prioritaires à portée du pouce : menu en
haut, recherche et filtres dans le flux du catalogue, itinéraire dans chaque
carte boutique et navigation basse persistante. Aucune action n'est déplacée
dans une barre d'achat sticky.

Le filtre généré par `wood-catalog-search.js` reçoit désormais au moins 44 px
de hauteur à partir de 520 px et moins, en complément des champs de recherche,
du bouton Effacer, du menu hamburger, des boutons d'itinéraire et des items de
la navigation basse déjà dimensionnés pour le toucher.

Contrôles locaux :

- aucun scroll horizontal global à 320/390 px ;
- cibles principales ≥ 44 px ;
- libellés écrits conservés avec les pictogrammes ;
- itinéraire et conseil restent des actions indépendantes ;
- le mode démo bloque les actions commerciales sans masquer la découverte.

Les essais physiques de pouce, encoche, clavier virtuel iOS et Android restent
à confirmer sur appareils réels.

Contrat : `test/one-hand-mobile.test.mjs`.
