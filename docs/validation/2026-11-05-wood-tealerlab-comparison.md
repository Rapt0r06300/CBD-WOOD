# Comparaison visuelle TealerLab → WOOD

Cette comparaison contrôle la structure et le rythme, pas une copie graphique. Les références observées sont archivées dans `docs/audits/2026-11-05-tealerlab-capture-log.md` ; les captures de contrôle WOOD sont produites par la session Playwright locale et restent hors du paquet public.

## Desktop

| Référence observée | Adaptation WOOD contrôlée | Décision |
| --- | --- | --- |
| Bandeau de service puis en-tête très lisible | annonce livraison, logo WOOD, navigation, panier, compte et CTA `Venir chez WOOD` | repris dans la hiérarchie WOOD, sans fidélité ni promotion |
| Grand premier écran éditorial | hero `LE CBD AUTRE-MENT`, média botanique WOOD, deux CTA et repère de défilement | repris avec les couleurs, le logo et le ton WOOD |
| Cartes produits riches et répétées | quatre univers WOOD, cartes de boutique et fiche fleur avec profil, grammage, prix et action | repris avec les prix de la carte WOOD ; faux avis, taux et promotions exclus |
| Rails et sélections de campagne | emplacement `#selection-wood` masqué tant que les données réelles manquent | préparé sans faux produit ni débordement horizontal |
| Alternance de blocs éditoriaux | histoire, valeurs, réassurance, FAQ, boutiques et footer | adaptée à Nice et aux faits fournis par la propriétaire |

## Mobile

| Besoin observé | Adaptation WOOD contrôlée | Contrôle |
| --- | --- | --- |
| En-tête recomposé, pas seulement réduit | logo, panier, menu et navigation basse dans une enveloppe app-like | testé à 320, 390 et 430 px, puis en tablette |
| Cartes produits denses | deux colonnes quand la largeur le permet, une colonne très étroite, actions contenues | aucune largeur globale ne déborde |
| Accès constants | `Accueil`, `Boutique`, `Nous trouver`, `Compte`, menu structuré et panier | focus, Échap et retour du focus contrôlés |
| Images et animation | dimensions réservées, fallback WOOD, reveal/zoom `transform/opacity` | reduced-motion et réseau lent gardent le contenu et les actions |
| Footer long | groupes repliables, numéros explicitement associés à Barla/Borriglione | vérifié à 390 × 844 |

## Garde-fous d’identité

- Palette, logo officiel, typographie, carte des prix et informations des deux boutiques restent WOOD.
- Les formes graffiti, stickers, emojis et l’humour restent réservés aux zones éditoriales, en attente des références de la propriétaire.
- Le site n’importe aucun texte, asset, slogan ou placement exact de TealerLab.
- Les promotions, avis, fidélité, parrainage, QR code et retrait en boutique restent exclus.
- Cette preuve technique ne remplace pas les validations humaines finales : « c’est toujours WOOD » et « la présentation est aussi travaillée que TealerLab ».

