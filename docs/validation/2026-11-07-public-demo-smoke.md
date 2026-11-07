# Smoke test public de la démo — 2026-11-07

## Cible

- URL : `https://rapt0r06300.github.io/CBD-WOOD/demo/`
- Publication : branche `gh-pages`, commit `8efc212`
- Outil : recette navigateur Chromium via Playwright CLI

## Résultats observés

- Desktop : la page répond, le titre WOOD est présent, 60 liens et 77 images
  sont rendus, et la largeur racine reste contenue dans la fenêtre.
- Mobile 390 × 844 : la page répond, la navigation mobile est présente, la
  largeur racine mesurée est de 375 px et aucune image réellement cassée n'est
  détectée.
- Interaction menu : le bouton « Ouvrir le menu » passe à `aria-expanded=true`
  et la navigation structurée devient visible.
- Interaction carte : le bouton de vue alternative d'Euphoria répond au
  toucher et active la seconde vue.
- Interaction FAQ : la question « Où se trouve WOOD CBD Shop ? » s'ouvre et
  affiche son contenu.
- Console publique : 0 erreur et 0 avertissement pendant la recette.

## Limites

Ce smoke test ne remplace pas Safari iOS réel, Chromium Android réel, une
session VoiceOver/NVDA, la validation propriétaire ou les données commerciales
réelles. Il confirme uniquement que la version démo publiée reste navigable et
interactive après le déploiement.
