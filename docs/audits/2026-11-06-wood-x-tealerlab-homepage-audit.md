# Audit d’exécution — WOOD x TealerLab — 6 novembre 2026

## Verdict

La cible demandée est une vraie page d’accueil e-commerce éditoriale : hero de campagne, rythme de drop, sélection de produits immédiatement achetable, rails locaux, cartes riches, transitions, images fortes et blocs de réassurance. La référence TealerLab sert de modèle de présentation et d’énergie commerciale ; WOOD conserve son univers propre : premium, chill, graffiti, stickers, humour, botanique et photographie qualitative sous cloche en verre.

La version locale a maintenant reçu la première implémentation de cette direction. Elle ne copie ni les assets, ni les textes, ni les promotions, ni les avis, ni les chiffres de TealerLab.

## Audit de la page d’accueil de référence

| Mécanisme observé | Traduction WOOD livrée localement | Limite volontaire |
|---|---|---|
| Bandeau de service et header e-commerce | Ticker WOOD, navigation, panier, progression de lecture | aucun délai ou avantage commercial non validé |
| Hero de campagne très visuel | Hero WOOD avec cloche, produit, tag décoratif, CTA et entrée animée | image générée marquée comme démonstration |
| Cartes d’opérations / drops | Deux cartes éditoriales WOOD avec images originales, rythme de campagne et liens | pas de prix barré, promo ou stock inventé |
| Cartes produit denses | Chrome de carte, état photo démo, profil, prix, quantité et action | pas de faux avis, compteurs, CBD ou badges promotionnels |
| Rails et navigation locale | Rails sélection, humeur et photos avec boutons précédent/suivant et progression | le document global ne défile jamais horizontalement |
| Guide par intention | Sélecteur d’humeur neutre et accessible | aucune allégation médicale ou promesse d’effet |
| Pack builder / bundle | Hero pack WOOD et cartes de composition | module neutre tant que prix, stock et règles ne sont pas confirmés |
| UGC / communauté | Mur de cartes WOOD éditoriales et emplacements sociaux | pas de faux contenu client présenté comme réel |
| Newsletter / activation | Bloc de démonstration non connecté et formulaire désactivé | aucune donnée n’est collectée dans la démo |
| Révélation, hover, progression, feedback | `wood-motion.css` + `wood-motion.js`, rails, parallax léger, pulse panier | fallback statique, reduced-motion et low-data intégrés |

## Écart corrigé par rapport à l’ancienne version

L’ancienne page ressemblait davantage à une vitrine narrative calme. Elle manquait de densité visuelle et de répétition commerciale : peu de médias, peu de rails, peu de cartes dans le premier parcours et pas de rythme de collection. La nouvelle composition alterne désormais :

`hero → preuve immédiate → drop visuel → univers → sélection produit → humeur → rail photo → pack → qualité → histoire → boutiques → communauté → FAQ → footer`.

Cette alternance reprend la logique de présentation recherchée sans transformer WOOD en copie de TealerLab.

## Règles d’identité WOOD

- La base reste sombre, botanique et premium ; les accents lime, crème, vert et graffiti donnent l’énergie.
- Les graffitis servent de ponctuation : ils ne remplacent jamais un titre, un prix, une image ou un contrôle.
- L’humour est réservé aux microcopies éditoriales et aux stickers, pas aux informations légales ou à l’achat.
- La photographie de fleurs et résines doit rester qualitative, lisible et présentée sous cloche en verre lorsque cette mise en scène est validée par la propriétaire.
- Les images générées présentes dans la démo sont des maquettes WOOD originales. Elles doivent être remplacées ou validées avant production.
- Les preuves, avis, stocks, offres, prix barrés, vouchers, résultats de laboratoire et photos propriétaires restent bloqués tant que leur source n’est pas fournie.

## Contrôle responsive attendu

- Desktop : hero immersif, grille produits lisible, rails avec contrôle, CTA visibles et sections alternées.
- Mobile : header compact, rails tactiles, cartes en deux colonnes, CTA accessibles au pouce, pas de recouvrement des prix.
- Reduced motion : contenu immédiatement lisible, pas de parallax ni de révélation nécessaire.
- Low data : médias secondaires allégés et expérience toujours compréhensible.

## Critère de validation finale

La partie code est prête quand les tests passent, les pages publiques ne débordent pas à 390 px, les rails fonctionnent au clavier et au toucher, les images démo sont identifiées, la console reste propre et les captures desktop/mobile confirment le rythme. La validation artistique de la propriétaire et le remplacement par les vraies photos restent des décisions externes au dépôt.

Références de mécanismes étudiés : [accueil TealerLab](https://tealerlab.com/), [collections TealerLab](https://tealerlab.com/collections), [sélection produit TealerLab](https://tealerlab.com/collections/best-seller-tealerlab).
