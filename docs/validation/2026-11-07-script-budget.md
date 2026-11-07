# Budget JavaScript de la démo — 7 novembre 2026

Les scripts publics sont locaux et chargés en fin de page selon leur rôle :

| Rôle | Modules |
| --- | --- |
| Parcours d'accueil | mood selector, FAQ search, engagement local, motion et shell mobile |
| Catalogue | storefront, recherche, comparaison, actions produit, disponibilité et shell mobile |
| Fiche | présentation, prix, détail, actions produit, motion et shell mobile |
| Checkout | mode démo, options, garde checkout, client Turnstile inactif et shell mobile |
| Compte/contact | mode démo ou préremplissage local, compte Supabase raccordable et shell mobile |

Aucun script promo, réseau social, analytics, chat ou bibliothèque distante n'est
activé dans le paquet public. Les modules d'achat restent présents uniquement
pour que le verrouillage du mode démo puisse les neutraliser avant toute action.

Contrat : test/script-budget.test.mjs.
