# Audit local — rythme d’accueil et navigation WOOD

## Périmètre

Audit de la démo locale au commit `2766cfa`, sans paiement réel, sans collecte
d’e-mail et sans donnée externe. Les mesures sont prises sur Chromium avec le
serveur local de prévisualisation.

## Rythme mesuré

| Format | Hauteur utile | Hauteur document | Début des univers | Lecture |
| --- | ---: | ---: | ---: | --- |
| 390 × 844 | 844 px | 20 128 px | 3 577 px, soit 4,24 vues | Le bouton « Découvrir WOOD » permet d’éviter le défilement imposé. |
| 1 440 × 900 | 900 px | 18 083 px | 3 401 px, soit 3,78 vues | Le header et le CTA « Venir chez WOOD » donnent un accès direct. |

La séquence d’entrée est mesurée comme `hero → bandeau de détail → services →
showcase → scène signature → univers`. Les grandes sections suivantes restent
identifiables par un id stable (`univers`, `histoire`, `boutique`, `questions`,
`selection-wood`, `preuve`, `communaute`) afin de conserver une lecture directe
et des ancres partageables.

## Carte de navigation par besoin

| Route | Entrées principales | Destination critique | État |
| --- | --- | --- | --- |
| `index.html` | Univers, histoire, boutique, FAQ | `#univers` / `#boutique` | actif |
| `fleurs.html` | Fleurs, résines, bien-être, WOOD Shop | catalogue fleurs | actif |
| `resines.html` | Fleurs, résines, bien-être, WOOD Shop | catalogue résines | actif |
| `bien-etre.html` | Fleurs, résines, bien-être, WOOD Shop | catalogue soins | actif |
| `wood-shop.html` | Fleurs, résines, bien-être, WOOD Shop | catalogue textile/goods | maquette locale |
| `fleur.html` | Accueil, catalogue fleurs, boutiques | fiche produit + retour catalogue | actif |
| `produit.html` | Accueil, univers, boutiques | fiche produit générique | maquette locale |
| `contact.html` | FAQ, téléphone, e-mail | demande de contact | démo sans envoi |
| `compte.html` | Accueil, compte, panier | session locale/Supabase selon config | démo |
| `checkout.html` | Accueil, panier | récapitulatif sans paiement | démo |
| `confirmation.html` | Fleurs, compte | retour achats/compte | démo |
| `404.html` | Accueil | sortie de secours | actif |

Le menu mobile expose les univers, « Nous trouver », FAQ, compte et panier.
Le catalogue ne crée pas de fausse route « accessoires » : la carte d’accueil
nomme les accessoires et le contenu effectif est regroupé dans `WOOD Shop`,
qui contient textile et produits dérivés à compléter.

## Boutiques et retours

La destination `#boutique` nomme les deux adresses (`7 rue Barla` et `16 avenue
Alfred Borriglione`) et conserve les téléphones, les boutons itinéraire/appeler
et les ancres. Les fiches `fleur.html` et `produit.html` ont un fil d’Ariane
vers l’accueil et leur catalogue. Le préflight des références locales vérifie
les fichiers et les ids de toutes les routes publiques.

## Vérification et limites

- Mesure Chromium locale : 390 × 844 et 1 440 × 900.
- Contrat automatisé : `test/cro-navigation-and-rhythm.test.mjs`.
- Non couvert par ce lot : validation propriétaire, Safari iOS réel, Android
  réel, photos authentiques, tarifs/stock finaux et comptes de production.
