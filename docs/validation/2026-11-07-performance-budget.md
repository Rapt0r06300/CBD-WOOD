# WOOD démo — budget performance et objectifs

Date : 7 novembre 2026  
Périmètre : paquet local de démonstration, mobile et bureau.

## Objectifs de référence

Ces seuils servent de garde-fou avant toute publication commerciale :

| Mesure | Cible | Règle WOOD |
| --- | --- | --- |
| LCP | ≤ 2,5 s sur mobile 4G simulé | Une seule image hero prioritaire ; les autres médias restent différés. |
| CLS | ≤ 0,10 | Dimensions réservées sur les visuels et éléments fixes ; aucun graffiti ne doit déplacer le contenu. |
| INP | ≤ 200 ms | Interactions locales bornées ; aucun appel réseau n’est requis par la démo. |
| Média | 0 PNG référencé, 0 chemin manquant | Formats WebP publics résolus par le rapport automatique. |
| JavaScript | seulement les fichiers source nécessaires | Les paquets générés `.github-pages/`, `site-versions/` et `.headless-public-runway-final/` ne sont pas recompilés comme sources. |

## Mesure du lot actuel

- `npm run media:budget` : **52 références résolues, 0 manquante, 0 PNG
  référencé**.
- Le hero utilise `fetchpriority="high"`; les rails, galeries et scènes
  secondaires restent en `loading="lazy"` lorsqu’ils ne sont pas dans le
  premier écran.
- `npm run check:js` : **34 fichiers source** contrôlés avec délai individuel
  borné ; les paquets de sortie sont exclus pour éviter de compter plusieurs
  fois le même runtime copié.
- `npm run verify:pages-package` : paquet base/démo isolé, aucune commande
  réelle et aucune dépendance runtime externe non autorisée.
- Responsive local : captures disponibles à 390 × 844 et 1440 × 900, sans
  débordement observé.

## Limites honnêtes

Un score Lighthouse, une mesure INP sur appareil réel, un réseau 3G/4G réel et
une vérification Safari/Firefox ne sont pas exécutés dans cet environnement.
Les seuils restent donc des objectifs de recette, pas une certification de
performance finale.

## Commandes de reprise

```text
npm run media:budget
npm run check:js
npm run readiness
npm run verify:pages-package
```
