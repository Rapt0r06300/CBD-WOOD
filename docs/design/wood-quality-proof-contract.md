# Contrat des preuves qualité WOOD

Les fiches fleur et produit générique réservent une ligne « Sources WOOD » compacte en état vide tant qu’aucun avis, source, document ou résultat n’a été fourni et validé par WOOD. L’ancien grand bloc « Qualité & preuves » n’est plus affiché : l’état vide reste informatif, sans note, témoignage ni promesse de qualité.

Une preuve future ne peut être rendue comme vérifiée que si elle possède un libellé, une valeur, une source et le statut `verified`. La fiche limite l’affichage à trois éléments et échappe le contenu avant rendu. Les éléments sans source ou sans validation restent absents de l’état publié.

La ligne ne collecte aucune donnée, ne modifie ni prix, ni stock, ni commande, et ne donne pas d’allégation médicale ou commerciale. Le statut et la source restent textuels et lisibles sans dépendre de la couleur. Les preuves vérifiées futures se replient en liste compacte sur les écrans étroits.

La preuve locale est constituée par `test/quality-proof-contract.test.mjs`, `npm test` et la vérification Firefox à 390×844 sans débordement horizontal. La validation propriétaire des avis, sources, documents et formulations reste séparée et nécessaire avant toute publication réelle.

Pour revenir en arrière, restaurer le grand bloc et ses règles CSS dans `produit.html`, `fleur.html`, `product-detail.js` et `boutique.css`, puis rejouer `npm run check`. Le rollback ne touche ni comptes, ni produits, ni prix, ni stocks, ni commandes, ni secrets, ni migrations.
