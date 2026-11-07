# Brief photo WOOD — fleurs, résines et catalogue

Ce document prépare la production des vraies photos demandées par la propriétaire. Les fichiers générés actuellement restent des visuels de démonstration et ne deviennent pas des photos de production sans validation.

## Direction commune

- Pour une photo produit approuvée : produit réel seul, sans bocal, cloche, sachet ou accessoire qui ferait croire à un autre produit.
- Pour la démo et les séquences éditoriales WOOD : une composition sous cloche en verre est autorisée quand elle sert la présentation qualitative demandée par la propriétaire. Elle doit porter l’état `demo` et ne doit pas être présentée comme une photo commerciale actuelle.
- Chaque présentation sous cloche doit prévoir une deuxième vue nette hors cloche (macro ou vue matière) afin que le produit reste compréhensible sans l’accessoire de mise en scène.
- Sujet lisible, propre et isolé ; angle de photographe, profondeur de champ légère et détails nets.
- Lumière douce mais directionnelle, sans surexposition ni dominante qui change les couleurs WOOD.
- Fond cohérent avec les surfaces WOOD existantes : sombre botanique, vert profond ou neutre texturé ; aucune nouvelle palette de marque.
- Aucun texte parasite, watermark, logo inventé, main, emballage ou élément d’une autre marque.

## Formats et cadrages

| Usage | Ratio de travail | Règle |
|---|---:|---|
| Carte catalogue | `1:1` | sujet centré dans une zone sûre ; rien d’important dans les 8 % extérieurs |
| Fiche mobile | `4:5` ou portrait | le point focal reste entier dans une largeur de 320–430 px |
| Fiche desktop | `3:2` ou `4:5` | image nette dans le cadre réservé sans modifier la hauteur du bloc |
| Fallback | WebP + JPEG/PNG | état `demo`/`approved` explicite, alt text associé |

## Nommage et remplacement

`<univers>-<slug>-<usage>-<version>-<statut>.<format>`

Exemple : `fleurs-nimbus-3000-card-v01-approved.webp`.

Le remplacement se fait par le registre de présentation et le même ratio : aucun HTML d’achat, prix, stock ou lien ne doit être modifié lors du remplacement d’une image. Toute image reçue doit conserver sa source, son autorisation, sa date, ses dimensions, son poids et son texte alternatif.

Les exports attendus sont l'original haute définition séparé, l'export web
moderne, une miniature lorsque nécessaire, un fallback JPEG/PNG et son alt text.
Le statut `demo`/`approved` reste attaché à chaque fichier ; un fichier sans
source ou autorisation est refusé avant publication.

## Règle cloche WOOD

La cloche est un élément de direction artistique pour le mode démo : elle
exprime le soin, la rareté et le côté galerie de la boutique sans fabriquer une
preuve produit. Elle est donc séparée du média `approved` utilisé pour une
fiche commerciale. Le registre doit distinguer `demo-cloche`, `demo-clean-view`
et `approved-real-photo`. Une carte ou une fiche peut montrer la scène sous
cloche, mais son label d’état reste visible et sa deuxième vue hors cloche doit
rester accessible au toucher, au clavier et sans animation.

## Contrôles avant approbation

1. Vérifier le produit, la variété et l’univers avec la propriétaire.
2. Contrôler netteté, artefacts, recadrage, transparence, texte parasite et dominante de couleur.
3. Vérifier le rendu dans la carte carrée mobile, la grille desktop et la fiche produit.
4. Tester l’état image absente et le chargement lent avant de remplacer le fallback.
5. Archiver l’original haute définition séparément de l’export web.
