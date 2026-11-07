# Smoke test e2e de la démo — 7 novembre 2026

Parcours contrôlé dans le paquet `/demo/` avec le navigateur Playwright :

1. accueil : hero WOOD et CTA visibles ;
2. catalogue fleurs : route locale ouverte, recherche et filtres présents ;
3. fiche fleur : galerie, vue alternative, conseil et retour catalogue ;
4. itinéraire : lien Google Maps présent mais non ouvert pendant la recette ;
5. checkout : simulation locale affichée, champs et soumission réels neutralisés.

Les captures de contrôle sont conservées dans `output/playwright/`, notamment
`demo-home-live-mobile-after-runway.png`,
`demo-home-live-runway-cards-mobile-after.png` et
`demo-flower-detail-mobile-after.png`. Le smoke test ne crée aucun compte,
ordre, paiement ou e-mail et ne déclenche pas les liens externes.

Contrat : `test/demo-e2e-smoke.test.mjs`.
