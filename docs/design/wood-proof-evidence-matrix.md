# Matrice des preuves WOOD — démo

Cette matrice est la porte d'entrée interne de toute preuve affichée dans la
démonstration. Elle ne transforme jamais un emplacement préparé en preuve
commerciale publiée.

| Famille | Source attendue | Champs obligatoires | Affichage public dans la démo |
|---|---|---|---|
| Avis Google | Fiche Google exacte de l'établissement | établissement, auteur public, date, extrait court, lien direct, date de relecture | Oui seulement si les champs sont présents ; sinon état vide honnête |
| Photo produit | Fichier remis ou autorisé par WOOD | référence, source, autorisation, statut média, texte alternatif, date | `demo` tant que l'autorisation et la photo réelle ne sont pas validées |
| Photo de boutique | Fichier remis ou autorisé par WOOD | adresse, source, autorisation, date, texte alternatif | Non publiée par défaut ; emplacement éditorial prêt |
| Qualité / laboratoire | Document officiel par lot | lot, résultat, date, source consultable, périmètre | Jamais affiché sans document vérifié |
| Histoire / équipe | Texte relu par la propriétaire | auteur interne, date de validation, périmètre éditorial | Texte démo marqué jusqu'à validation |
| Sticker / graffiti | Création WOOD ou fichier autorisé | source, droits, famille, version, zones autorisées | Décoratif, masquable, jamais preuve d'un produit |

## Règles de publication

1. Une preuve porte un établissement et ne peut pas être réutilisée pour une
   autre adresse.
2. La source et la date de relecture restent accessibles dans le contrat de
   contenu, même lorsqu'un extrait est présenté en fondu dans la page.
3. Une preuve incomplète reste hors de la zone publique ; le code préfère un
   état vide à une note, un avis ou un résultat inventé.
4. Un lien Google ne vaut pas validation de l'extrait : l'association auteur,
   adresse et date doit être relue par WOOD.
5. Les photos de démonstration ne sont jamais présentées comme des photos
   propriétaires ou comme une preuve de qualité.

## État actuel de la démo

La page d'accueil conserve un seul rail d'avis Google identifié comme extrait
public à revalider, avec un lien vers la fiche Barla. Les noms, dates et textes
présents dans le HTML restent soumis à la relecture WOOD avant une publication
commerciale. Aucun avis Borriglione n'est mélangé à cette séquence.

La zone laboratoire ne présente aucun résultat en attente : elle reste hors de
la page publique jusqu'à réception d'un document officiel vérifiable.
