# Brief photo WOOD — fleurs, résines et catalogue

Ce document prépare la production des vraies photos demandées par la propriétaire. Les fichiers générés actuellement restent des visuels de démonstration et ne deviennent pas des photos de production sans validation.

## Direction commune

- Produit réel seul, sans bocal, cloche, sachet ou accessoire qui ferait croire à un autre produit.
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

## Contrôles avant approbation

1. Vérifier le produit, la variété et l’univers avec la propriétaire.
2. Contrôler netteté, artefacts, recadrage, transparence, texte parasite et dominante de couleur.
3. Vérifier le rendu dans la carte carrée mobile, la grille desktop et la fiche produit.
4. Tester l’état image absente et le chargement lent avant de remplacer le fallback.
5. Archiver l’original haute définition séparément de l’export web.
