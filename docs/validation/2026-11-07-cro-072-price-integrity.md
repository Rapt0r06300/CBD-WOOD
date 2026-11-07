# CRO-072 — Intégrité des prix entre pages

Le contrôle local compare les treize références fleurs entre la grille
`fleurs.html`, la fiche dynamique `flower-detail.js`, la fixture
`wood-price-source.js` et le panier local. Une mise à jour d'un palier ne peut
donc pas laisser une somme divergente entre carte, fiche et sélection.

La preuve est automatisée par `test/cro-072-price-integrity.test.mjs`. Elle
contrôle aussi les valeurs positives, les grammes explicites et l'état vide
pour une référence inconnue. Les données commerciales réelles restent hors
démo et doivent venir de la source WOOD validée.
