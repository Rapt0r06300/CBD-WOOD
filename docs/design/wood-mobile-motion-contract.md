# Contrat motion mobile WOOD

Statut : contrat local versionné. Les animations mobiles servent la compréhension et le retour d'action ; elles ne deviennent jamais une condition d'accès au contenu, à la navigation ou au panier.

## Périmètre et source de vérité

Le contrat couvre les transitions d'entrée et de sortie de page, les révélations au défilement, l'apparition progressive des visuels produit, les états actifs de la barre mobile et les feedbacks tactiles. `mobile-shell.js` porte la détection des capacités et l'observation des éléments, `mobile.css` porte la géométrie mobile, les zones sûres et les équivalents tactiles, et `boutique.css` porte les primitives communes de transition et de fallback.

La source de vérité reste le HTML public et ses liens directs. Le shell ne s'installe pas dans l'espace propriétaire et ne remplace pas une action métier par un geste réservé au hover. Les événements sont pilotés par les contrôles natifs et les capacités réellement disponibles (`matchMedia`, `IntersectionObserver`, connexion et pointeur), jamais par un user-agent.

## Parcours tactile et interactions

Chaque état révélé par hover dispose d'un équivalent de focus, de touche ou d'activation native : les cartes gardent leur lien, les boutons gardent leur `click`, et la barre mobile expose des liens de navigation de 48px minimum. Le pointeur fin peut enrichir l'affichage, mais aucune destination, ouverture de panier ou information essentielle ne dépend de lui.

Le shell ne capture pas `wheel`, `touchmove` ou `scroll` pour fabriquer un scroll-jacking. Les révélations sont opportunistes : l'absence d'`IntersectionObserver`, un média non chargé ou un script non exécuté laisse le contenu visible et les liens utilisables. Les cartes ajoutées après le rendu Supabase rejoignent le même observateur via `wood:catalog-rendered`.

## Motion mobile et bornes

- Les transitions restent composées (`transform`, `opacity`, couleur ou bordure) et sont courtes ; elles ne déplacent pas le document ni les barres système.
- Les seuils d'intersection sont explicites et chaque cible est désabonnée après sa première révélation pour éviter les boucles et les coûts répétés. Un délai global ne révèle pas les éléments hors écran avant que le client ne les fasse défiler ; le focus clavier et l’impression ont leur propre repli.
- La barre basse reste fixe dans la safe area, conserve ses libellés et utilise `touch-action: manipulation` pour limiter les délais de geste sans bloquer le défilement de la page.
- Les états actifs et focus fournissent un signal visuel complémentaire au mouvement et ne reposent pas sur la couleur seule.

Les animations d'image produit restent bornées à une mise à l'échelle courte et visible ; les cartes désactivent l'effet de survol lorsque le périphérique ne propose pas de hover et fournissent un retour à l'activation tactile. Les stickers dessinés WOOD apparaissent avec leur bloc au scroll. Aucune animation ne doit provoquer de clignotement, de zoom plein écran ou de modification persistante du layout.

## Reduced-motion, faible donnée et fallback

Quand `prefers-reduced-motion: reduce` est actif, les révélations sont immédiatement visibles, les transitions de la navigation sont supprimées et les transformations sont neutralisées. Le contenu, le focus, les liens directs et les confirmations restent identiques.

Quand `navigator.connection.saveData` ou un réseau `slow-2g`/`2g` est détecté, la classe `wood-low-data` neutralise les transitions et l'animation photo. Les transitions de page ne sont pas installées. Un fallback HTML ou le label `VISUEL À VENIR` remplace un média manquant sans erreur bloquante ni changement du panier local.

## Responsive, accessibilité et performance

Le contrat s'applique aux largeurs téléphone, tablette et desktop, en portrait comme en paysage. Les panneaux utilisent `100svh` et les variables `env(safe-area-inset-*)`; le contenu reste atteignable sous les barres système. Les contrôles tactiles gardent une cible d'au moins 48px et les libellés étroits, notamment `Nous trouver`, restent lisibles.

Le clavier, les lecteurs d'écran et les appareils sans enhancement mobile conservent les mêmes routes. Les tests vérifient le reduced-motion, le faible débit, l'absence de scroll-jacking, le rendu dynamique du catalogue et la stabilité des états après navigation. La couverture réelle Safari, Firefox et appareils physiques reste une étape de revue externe, non simulée par ce contrat.

## Preuve, revue et rollback

La preuve locale est `test/wood-mobile-motion-contract.test.mjs`, complétée par `test/motion-guardrails.test.mjs`, `test/mobile-app-shell.test.mjs`, les suites d'accessibilité et les tests responsive. Elle établit la source de vérité, les équivalents tactiles, les bornes CSS/JS et les replis reduced-motion/faible donnée.

La propriétaire et son conjoint valident séparément le ressenti, la vitesse et l'absence de surprise ; la validation sur navigateurs et appareils réels reste à obtenir. Pour revenir en arrière, restaurer le snapshot validé de `mobile-shell.js`, `mobile.css` et `boutique.css`, puis rejouer `npm run check`. Ce rollback ne supprime ni commande, ni panier, ni donnée propriétaire.
