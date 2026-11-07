# Prix et grammages mobile — 7 novembre 2026

Les cartes fleurs conservent une hiérarchie lisible à largeur compacte : le
prix TTC de la variante reste distinct du sélecteur de grammage et du bouton
local « Ajouter ». Les références non tarifées utilisent leur état neutre
« Prix à renseigner » ou « Disponibilité boutique ».

Le contrat mobile ajoute une réduction bornée de la taille du prix, une largeur
flexible et un espacement de 8 px entre le statut/prix et l'action. Aucun
élément ne dépend d'un prix barré, d'un stock ou d'une promotion.

Contrôles réalisés :

- 320 px : deux cartes restent dans la grille sans chevauchement ;
- 390 px : le grammage et le prix restent associés à la bonne carte ;
- texte grossi / zoom : les libellés peuvent se replier dans le flux et le
  bouton conserve sa cible tactile ;
- fiche fleur : la quantité et le prix au gramme restent séparés et explicites.

Contrat : `test/mobile-price-weight.test.mjs`.
