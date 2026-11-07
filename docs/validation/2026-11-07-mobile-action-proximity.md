# Proximité des actions mobile — 7 novembre 2026

Le parcours mobile garde les actions dans le flux de leur contenu : fiche,
conseil, téléphone et itinéraire ne dépendent pas d'une barre d'achat sticky.
La navigation basse est la seule surface persistante ; `body.has-mobile-app-nav`
réserve sa hauteur et sa safe area, tandis que les ancres utilisent la même
réserve pour éviter qu'un titre ou une action soit masqué après un défilement.

Le contrat de finition ajoute :

- au moins 48 px de hauteur aux boutons d'action principaux sur mobile ;
- 10 px d'espacement entre actions voisines et entre les contrôles d'achat ;
- des `min-width: 0` pour empêcher un prix ou un libellé de pousser l'action
  hors de la carte ;
- une hauteur minimale de 44 px pour le lien de fiche du runway ;
- aucun CTA fixe ajouté à la fiche, au contact ou au paiement de démonstration.

Vérifications réalisées :

- largeurs compactes 320, 360, 375, 390 et 430 px couvertes par le contrat
  CSS et le test statique ;
- navigation clavier : les liens et boutons restent dans le document et
  conservent un focus visible ;
- tactile : les cibles principales restent au-dessus de 44 px ;
- zoom : les contrôles ne reposent pas sur une largeur fixe et peuvent se
  replier dans le flux ;
- démo : aucune action de cette couche ne crée une commande ou un paiement.

Les captures Playwright mobile conservées dans `output/playwright/` servent de
contrôle visuel complémentaire. Les essais iOS/Android physiques et VoiceOver
restent des validations externes à effectuer avant publication commerciale.

Contrat : `test/mobile-action-proximity.test.mjs`.
