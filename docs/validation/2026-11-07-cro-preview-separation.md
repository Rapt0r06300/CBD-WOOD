# CRO-155 — prévisualisation séparée

Le script `npm run prepare:github-pages` construit deux arbres distincts :

- la racine reprend les fichiers de `origin/main` et n'injecte aucun garde-fou démo ;
- `demo/` reprend le paquet courant, injecte les garde-fous locaux et conserve les interactions de démonstration ;
- `base/` reste un alias de lecture vers la racine.

Cette séparation est locale et réversible par commit. Elle ne signifie pas que le déploiement public actuel a déjà été remplacé : la publication GitHub Pages reste une étape externe finale à vérifier sur les deux URLs.
