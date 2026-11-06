# Contrat des preuves qualité WOOD

Les fiches fleur et produit générique réservent une zone « Qualité & preuves » en état vide tant qu’aucun avis, source, document ou résultat n’a été fourni et validé par WOOD. L’état vide est informatif, ne crée ni note, ni témoignage, ni promesse de qualité.

Une preuve future ne peut être rendue comme vérifiée que si elle possède un libellé, une valeur, une source et le statut `verified`. La fiche limite l’affichage à trois éléments et échappe le contenu avant rendu. Les éléments sans source ou sans validation restent absents de l’état publié.

La zone ne collecte aucune donnée, ne modifie ni prix, ni stock, ni commande, et ne donne pas d’allégation médicale ou commerciale. Le statut et la source restent textuels et lisibles sans dépendre de la couleur. La mise en page passe de trois colonnes à deux puis une colonne sur les écrans étroits.

La preuve locale est constituée par `test/quality-proof-contract.test.mjs`, `npm test` et la vérification Firefox à 390×844 sans débordement horizontal. La validation propriétaire des avis, sources, documents et formulations reste séparée et nécessaire avant toute publication réelle.

Pour revenir en arrière, retirer la zone et ses règles CSS, restaurer `produit.html`, `fleur.html`, `product-detail.js` et `boutique.css`, puis rejouer `npm run check`. Le rollback ne touche ni comptes, ni produits, ni prix, ni stocks, ni commandes, ni secrets, ni migrations.
