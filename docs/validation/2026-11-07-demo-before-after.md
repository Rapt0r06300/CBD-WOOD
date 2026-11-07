# WOOD démo — avant / après décisionnel

Date : 7 novembre 2026  
Périmètre : comparaison locale de la démo, sans publication commerciale.

## Règle de lecture

Les captures `current-*` représentent le point de comparaison disponible dans
le dépôt. Les captures `demo-*`, `wood-*-final*` et `wood-*-latest*` montrent
la direction démo après la refonte. Les noms de fichiers ne constituent pas
une validation artistique de la propriétaire.

| Zone | Avant | Après démo | Décision visible |
| --- | --- | --- | --- |
| Hero accueil | `output/playwright/current-home-desktop-1440.png`, `current-home-mobile.png` | `output/playwright/demo-home-1440.png`, `demo-home-mobile.png` | Hero en deux rythmes, CTA découverte/visite séparés, cloche et graffiti ancrés à la scène. |
| Galerie fleurs | `output/playwright/audit-fleurs-mobile-390.png` | `output/playwright/wood-fleurs-grid-mobile.png`, `wood-fleurs-desktop.png` | Grille/rail plus dense, statut média explicite, vue alternative et accès fiche. |
| Fiche fleur | `output/playwright/fleur-detail-mobile-audit.png` | `output/playwright/wood-flower-detail-desktop-latest.png`, `wood-flower-detail-mobile-latest.png` | Galerie, zoom accessible, grammage et état de disponibilité séparés. |
| Résines | `output/playwright/wood-resines-availability-mobile.png` | `output/playwright/wood-resines-availability-cards-mobile-390.png`, `wood-resines-availability-cards-mobile-390-scrolled.png` | Scènes conceptuelles sous cloche, copie neutre, aucune référence réelle inventée. |
| Boutiques | `output/playwright/location-cards-mobile.png` | `output/playwright/location-cards-mobile-v3.png`, `location-cards-desktop-v2.png` | Cartes plus lisibles, adresse/téléphone/actions regroupés, graffiti décoratif non critique. |
| Mobile complet | `output/playwright/audit-current-mobile-390.png` | `output/playwright/demo-home-mobile.png`, `demo-checkout-mobile.png`, `demo-advisor-mobile-open-v2.png` | Safe area, navigation basse, rail tactile, motion réduite et parcours démo verrouillé. |

## Points réellement améliorés

- la direction WOOD reste sombre, verte et premium, avec contrastes lime
  contrôlés ;
- les accents graffiti sont ancrés à leur bloc et n’occupent pas les zones de
  prix, stock, formulaire ou paiement ;
- la composition reprend le rythme e-commerce dense demandé : rails, vues
  alternatives, séquences campagne, carte de boutique et CTA explicites ;
- la cloche reste un dispositif éditorial de démo, tandis qu’une photo réelle
  approuvée devra montrer le produit seul selon le contrat média ;
- la démo reste isolée : aucun paiement, e-mail, compte ou ordre réel n’est
  activé.

## Limites restantes

- Les captures ne remplacent pas une validation manuelle Safari iOS,
  Android réel, zoom 400 % et réseau interrompu.
- Les photos, prix, stocks, textes commerciaux et citations d’avis réels
  restent à valider par WOOD.
- La comparaison n’est pas une preuve de conversion : elle documente les
  changements et les choix de composition avant la revue propriétaire.
