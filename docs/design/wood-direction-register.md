# Registre de direction WOOD

Statut : fondation technique versionnée, à faire relire par la propriétaire avant toute nouvelle décoration.

## Contraintes bloquantes

- WOOD reste reconnaissable immédiatement : logo officiel, typographie actuelle, carte WOOD, ton et structure de marque ne sont pas remplacés.
- Les couleurs existantes restent la seule palette de production. Aucune couleur TealerLab n'est importée.
- L'expérience peut reprendre une hiérarchie commerciale forte, des cartes riches, un rythme éditorial, des bandeaux et des micro-interactions inspirés de l'audit TealerLab, mais aucun texte, visuel, slogan, logo, asset ou placement exact n'est copié.
- La base est chic/premium et lisible ; chill, graffiti, stickers, emojis et humour restent des accents contrôlés, hors prix, stock, paiement, livraison, erreurs et légal.
- Pas de promotion, voucher, QR code, retrait en boutique ou preuve sociale inventée sans nouvelle décision explicite.
- Les vraies photos de fleurs et résines devront être sans bocal ni cloche, prises comme des photos de produit par un photographe, avec un cadrage et une lumière validés.

## Matrice inspiration / identité

| Mécanisme observé chez TealerLab | Adaptation WOOD | Décision actuelle |
| --- | --- | --- |
| Hero fort et rythme de campagne | Hero WOOD actuel, message court, média remplaçable et CTA clair | garder et améliorer sans changer l'identité |
| Cartes produit denses | nom exact, profil WOOD, grammage, prix de la carte, disponibilité et ajout | garder la richesse, exclure faux avis/taux/promotions |
| Menu riche et panier visible | menu public structuré, compte client et panier accessibles | garder, aucune entrée admin publique |
| Bandeaux et mouvement | ticker WOOD neutre, reveal et zoom composés | garder seulement les mouvements accessibles |
| Stickers, emojis et humour | emplacements éditoriaux optionnels | attendre les références de la propriétaire |
| Pop-ups promotionnels, fidélité, jeux | aucun équivalent automatique | exclure |

## Tokens WOOD déjà en production

Les nouveaux composants doivent réutiliser les variables de `boutique.css` :

`--bg: #101610`, `--ink: #f1f0e6`, `--muted: #abb3a3`, `--line: #344338`, `--lime: #cbf096`, `--wood: #d8d4bd`, `--pine: #1b2c20`, `--card: #1d281e`, `--soft: #e8e7d7`, `--font: Arial, Helvetica, sans-serif`.

Les espacements, cadres, rayons, surfaces et états doivent suivre les composants existants avant toute extension. Une nouvelle teinte ou une nouvelle police est un changement de charte et nécessite l'accord de la propriétaire.

## Mouvement et accessibilité

- Les transitions restent bornées et composées : `transform`, `opacity`, bordure et ombre.
- Le scroll normal, le clavier et le toucher ne sont jamais capturés pour produire un effet de démonstration.
- `prefers-reduced-motion` conserve le contenu et les actions en supprimant les mouvements.
- Un sticker, un emoji ou une image décorative ne porte jamais seul une information essentielle ; le texte utile reste présent.

## Statut des assets décoratifs

La bibliothèque finale de stickers, graffiti, emojis et photographies reste vide tant que la propriétaire n'a pas fourni ses références et validé une planche. Les fallbacks `VISUEL À VENIR` sont des états de démonstration, pas des visuels de production.

## Relecture avant intégration

1. La propriétaire confirme que le rendu reste WOOD.
2. Le conjoint confirme que la hiérarchie et la présentation sont assez fortes, sans exiger une copie.
3. Chaque asset reçoit une origine, une version, un statut `demo` ou `approved` et un texte alternatif.
4. Le parcours prix/stock/panier est retesté avant toute décoration supplémentaire.
