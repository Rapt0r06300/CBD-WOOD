# Grammaire WOOD — attente et retour tactile

Ce document fixe les règles des états courts de chargement et du toucher. L’objectif est de rendre l’action lisible sans transformer la boutique en interface spectaculaire.

## Chargement

- L’action affiche un libellé explicite (`Enregistrement…`) et `aria-busy="true"`.
- Le bouton reste désactivé pendant la requête afin d’éviter un double envoi.
- Le signal visuel est borné à deux pulsations de 0,8 seconde (`wood-loading-pulse`) : aucune animation infinie ne doit laisser croire qu’une commande travaille encore.
- Le panier et les données saisies restent conservés en cas d’échec ; l’état revient au bouton `Enregistrer la commande` avec un message réessayable.
- `prefers-reduced-motion: reduce` supprime les transitions et animations non essentielles sans supprimer le texte d’attente ni l’action.

## Toucher mobile

- Les boutons d’achat, `+/-`, panier et fermeture ont une zone tactile stable et un feedback immédiat par `transform` borné.
- Le feedback ne modifie jamais la géométrie de la grille, le prix, le grammage ou la zone de clic ; il disparaît naturellement au relâchement du doigt.
- Aucun état ne dépend du hover et aucun gestionnaire ne bloque le défilement ou le geste retour.

## Contrôle

Le garde-fou est couvert par `test/motion-guardrails.test.mjs` et `npm run check`. Toute nouvelle animation d’attente doit rester courte, accessible et réversible avant d’être ajoutée.
