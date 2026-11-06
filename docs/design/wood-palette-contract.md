# Contrat de palette WOOD

Statut : contrat local versionné. Les couleurs de production restent celles déjà portées par WOOD ; aucune validation de nouvelle charte n'est déduite d'un rendu local.

## Palette source

La palette de référence est celle du registre de direction : fond forêt, encre claire, gris sourd, ligne végétale, lime WOOD, crème WOOD, pin, carte, surface douce et typographie système. Elle conserve le contraste et le ton chic/premium sans importer de couleur TealerLab.

Les composants peuvent reprendre une hiérarchie forte, mais aucune couleur étrangère, aucun dégradé de marque concurrente et aucun code couleur promotionnel ne doit devenir un nouveau token de production.

## Tokens de production

Les tokens canoniques sont déclarés dans `boutique.css` et réutilisés par les pages publiques :

| Token | Valeur | Usage |
| --- | --- | --- |
| `--bg` | `#101610` | fond principal |
| `--ink` | `#f1f0e6` | texte clair |
| `--muted` | `#abb3a3` | texte secondaire |
| `--line` | `#344338` | séparateurs |
| `--lime` | `#cbf096` | accent WOOD et action |
| `--wood` | `#d8d4bd` | crème WOOD |
| `--pine` | `#1b2c20` | surface pin |
| `--card` | `#1d281e` | surface carte |
| `--soft` | `#e8e7d7` | surface claire |
| `--font` | `Arial, Helvetica, sans-serif` | typographie existante |

Un composant doit préférer un token au lieu de créer une teinte isolée. Toute modification de valeur est une décision de charte et doit être tracée avant intégration.

## Surfaces dérivées

Les nuances ponctuelles nécessaires à un contraste, un état désactivé, un voile d'image ou une bordure peuvent rester des surfaces dérivées documentées dans les styles existants ; elles ne deviennent pas une nouvelle palette de marque. Elles ne peuvent pas masquer un prix, un stock, une erreur, une livraison, un paiement ou un libellé légal.

Les états `available`, `soon`, `rupture` et `incomplete` restent compréhensibles par le texte et la structure, pas par la couleur seule. Les focus, boutons tactiles et liens utilisent le lime et une bordure/outline visible. `prefers-reduced-motion` garde les mêmes contrastes et actions sans animation.

## Contrôles et rollback

`test/palette-contract.test.mjs`, `test/direction-register.test.mjs`, `test/design-foundation.test.mjs`, `test/accessibility.test.mjs` et `test/security-headers.test.mjs` vérifient les tokens, la direction WOOD, le contraste et l'absence d'import de charte concurrente.

Pour un retour arrière, restaurer les valeurs du tableau, retirer le token ajouté et rejouer `npm run check`. Les contenus produits, stocks, commandes, rôles et secrets ne sont jamais modifiés par une correction de palette.
