# CRO-107 — Barre d’action mobile de fiche

Statut : validé dans la démo locale, sans activation d’achat réel.

## Livré

- La fiche démo affiche une barre mobile dédiée avec deux actions utiles : « Poser une question » et « Voir en boutique ».
- La barre n’apparaît pas sur la version de base : elle est créée uniquement lorsque la page est en mode démo.
- Elle est placée juste au-dessus de la navigation mobile fixe, avec `env(safe-area-inset-bottom)` et un espace de contenu réservé pour éviter le recouvrement.
- La safe area est appliquée sur le bas et les côtés de la barre afin de préserver les gestes système.
- Aucun bouton ne déclenche de paiement ou de commande ; les deux destinations restent informatives.

## Recette locale Playwright

- 320 × 844 : deux liens de 44 px de haut, 146 px de large chacun, aucun débordement horizontal.
- 375 × 844 : barre de 61 px, navigation basse à 768 px, barre terminée à 768 px, aucun débordement horizontal.
- 390 × 844 : barre de 61 px, navigation basse à 768 px, barre terminée à 768 px, donc aucun recouvrement.
- 430 × 844 : barre de 61 px, navigation basse à 768 px, barre terminée à 768 px, aucun débordement horizontal.
- Les liens sont accessibles au clavier et possèdent des libellés visibles ; la règle `prefers-reduced-motion` supprime leurs transitions.
- La mise en page réserve `144 px` en bas sur le viewport 390 px : navigation mobile et barre d’action sont toutes deux prises en compte.

La validation sur appareils iOS/Android physiques et avec clavier virtuel reste une vérification externe, mais aucun chevauchement n’a été observé sur les largeurs locales couvertes.
