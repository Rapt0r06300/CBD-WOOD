# Registre des assets WOOD

Ce registre sépare les assets de démonstration des assets de production. Aucun
visuel de démonstration ne constitue une photo réelle, une preuve de qualité ou
une promesse sur un produit.

## Fleurs — démonstration actuelle

| Nom exact | Fichier | Usage | Statut | Alt à conserver |
| --- | --- | --- | --- | --- |
| Nimbus 3000 | `assets/flowers/fleurs-nimbus-3000.webp` | carte + fiche | demo | `Fleur Nimbus 3000 — visuel de démonstration` |
| Ivory | `assets/flowers/fleurs-ivory.webp` | carte + fiche | demo | `Fleur Ivory — visuel de démonstration` |
| Velvet Kush | `assets/flowers/fleurs-velvet-kush.webp` | carte + fiche | demo | `Fleur Velvet Kush — visuel de démonstration` |
| Pastraweed | `assets/flowers/fleurs-pastraweed.webp` | carte + fiche | demo | `Fleur Pastraweed — visuel de démonstration` |
| Euphoria | `assets/flowers/fleurs-euphoria.webp` | carte + fiche | demo | `Fleur Euphoria — visuel de démonstration` |
| Purple | `assets/flowers/fleurs-purple.webp` | carte + fiche | demo | `Fleur Purple — visuel de démonstration` |
| Bloody Mary | `assets/flowers/fleurs-bloody-mary.webp` | carte + fiche | demo | `Fleur Bloody Mary — visuel de démonstration` |
| Cosmic CBG | `assets/flowers/fleurs-cosmic-cbg.webp` | carte + fiche | demo | `Fleur Cosmic CBG — visuel de démonstration` |
| Charlotte | `assets/flowers/fleurs-charlotte.webp` | carte + fiche | demo | `Fleur Charlotte — visuel de démonstration` |
| Rainbow | `assets/flowers/fleurs-rainbow.webp` | carte + fiche | demo | `Fleur Rainbow — visuel de démonstration` |
| Orange Bud | `assets/flowers/fleurs-orange-bud.webp` | carte + fiche | demo | `Fleur Orange Bud — visuel de démonstration` |
| Plutonium | `assets/flowers/fleurs-plutonium.webp` | carte + fiche | demo | `Fleur Plutonium — visuel de démonstration` |
| Fanta Hazy | `assets/flowers/fleurs-fanta-hazy.webp` | carte + fiche | demo | `Fleur Fanta Hazy — visuel de démonstration` |

## Règles de remplacement

1. Une photo réelle approuvée sans bocal ni cloche remplace uniquement le
   fichier ou l’entrée approuvée correspondant au nom exact.
2. Une scène démo sous cloche peut rester dans le registre comme média
   éditorial `demo-cloche`, à condition d’être étiquetée et accompagnée d’une
   vue `demo-clean-view` hors cloche.
3. Le format, le poids, le cadrage, la source et l’autorisation sont ajoutés au
   registre avant publication.
4. Le statut passe de `demo` à `approved` seulement après validation de la
   propriétaire ; un rollback doit rester possible fichier par fichier.
5. Notre équipe crée et classe les futurs stickers, graffiti et illustrations
   des univers en statut `demo` à partir du brief reçu. La propriétaire valide
   les versions finales ; les photos réelles des produits restent distinctes.
6. Un chemin renseigné ne prouve ni une origine photographique réelle ni une
   approbation. Le futur contrat média doit porter explicitement ces statuts
   et alimenter les mêmes images dans boutique, fiche, accueil et gestion.

## Substitution par lots

Pour remplacer plusieurs visuels, travailler par univers et par commit réversible :

1. préparer les originaux, les exports WebP et les alt texts dans un dossier de revue ;
2. mettre à jour uniquement les entrées du registre du même univers ;
3. vérifier que les noms, prix, stocks, routes et contrôles d’achat n’ont pas changé ;
4. exécuter les tests d’assets, de catalogue, de liens et le préflight public ;
5. publier le lot uniquement après validation propriétaire, avec retour fichier par fichier possible.

## Contrôle local avant publication

Les visuels de démonstration actuels sont contrôlés par
`test/asset-quality.test.mjs` : fichier présent, signature WebP attendue,
dimensions carrées suffisantes et poids compatible avec une carte mobile. Ce
contrôle ne prétend pas remplacer la revue humaine d'une vraie photo : cadrage,
contraste, watermark, artefacts et autorisation restent à vérifier avant de
passer un asset de `demo` à `approved`.

