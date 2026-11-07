# WOOD — budget média démo

Date : 7 novembre 2026  
Scope : références publiques du dépôt avant génération du paquet GitHub Pages.

- Références image analysées : **52**
- Références résolues : **52**
- Références manquantes : **0**
- PNG encore référencés : **0**
- PNG possédant un WebP voisin : **0**

## Plus lourds médias raster référencés

| Fichier | Poids | Format |
|---|---:|---|
| `assets/graffiti/wood-comic-sprite.webp` | 237.4 KiB | WEBP |
| `assets/editorial/wood-texture-dome.webp` | 230.9 KiB | WEBP |
| `assets/editorial/wood-campaign-collage.webp` | 176.7 KiB | WEBP |
| `assets/editorial/wood-jar-detail.webp` | 161.2 KiB | WEBP |
| `assets/editorial/wood-resin-concept-03.webp` | 147.8 KiB | WEBP |
| `assets/editorial/wood-drop-studio.webp` | 136.2 KiB | WEBP |
| `assets/editorial/wood-resin-concept-01.webp` | 110.3 KiB | WEBP |
| `assets/editorial/wood-resin-concept-02.webp` | 101.5 KiB | WEBP |
| `assets/flowers/fleurs-euphoria.webp` | 77.0 KiB | WEBP |
| `assets/flowers/fleurs-velvet-kush.webp` | 76.3 KiB | WEBP |
| `assets/flowers/fleurs-plutonium.webp` | 73.0 KiB | WEBP |
| `assets/flowers/fleurs-fanta-hazy.webp` | 72.8 KiB | WEBP |

## Décisions

- Les médias structurels de l’accueil qui possèdent déjà un WebP utilisent désormais le WebP : `wood-texture-dome`, `wood-campaign-collage`, `wood-jar-detail` et `wood-drop-studio`.
- Les dimensions HTML, le chargement prioritaire du hero, les fallbacks et les labels `demo` restent inchangés.
- Les PNG sources conservés hors référence publique ne sont pas supprimés : ils restent récupérables comme originaux maîtres.
- Une photo réelle ne sera jamais optimisée ou publiée comme approuvée sans source, droits et validation WOOD.

## Limites

Les médias raster locaux déclarent désormais leurs dimensions natives via
`npm run media:dimensions`, ce qui réduit les changements de géométrie au
chargement sans toucher aux SVG décoratifs.

- Ce rapport est un budget statique ; il ne remplace pas une mesure Lighthouse ou appareil réel.
- Safari iOS, réseau mobile réel, batterie et INP restent des validations externes.
