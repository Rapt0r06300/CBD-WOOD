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
| Stickers, emojis et humour | créations originales et emplacements éditoriaux optionnels | notre équipe prépare les propositions ; la propriétaire valide la sélection |
| Pop-ups promotionnels, fidélité, jeux | aucun équivalent automatique | exclure |

## Tokens WOOD déjà en production

Les nouveaux composants doivent réutiliser les variables de `boutique.css` :

`--bg: #101610`, `--ink: #f1f0e6`, `--muted: #abb3a3`, `--line: #344338`, `--lime: #cbf096`, `--wood: #d8d4bd`, `--pine: #1b2c20`, `--card: #1d281e`, `--soft: #e8e7d7`, `--font: Arial, Helvetica, sans-serif`.

Les espacements, cadres, rayons, surfaces et états doivent suivre les composants existants avant toute extension. Une nouvelle teinte ou une nouvelle police est un changement de charte et nécessite l'accord de la propriétaire.

## Grille artistique et densité

- Le conteneur commun est borné à `1440px` avec des marges fluides ; les sections
  utilisent les mêmes rails que `container`, les grilles `minmax(0, 1fr)` et les
  espacements existants.
- Trois intensités sont prévues pour la composition, sans changer la palette :
  `calme` pour les zones de lecture et de confiance, `sélection` pour les
  catégories et cartes, `impact` pour le hero ou un seul moment éditorial.
- La hiérarchie reste `kicker → titre → phrase courte → action`. Les blocs
  alternent surface sombre, surface botanique, carte et respiration claire afin
  d'éviter une mosaïque ou une affiche saturée.
- Les ratios photo sont ceux du brief `wood-photo-brief.md` : carré pour carte,
  `4:5`/portrait pour mobile et `3:2` ou `4:5` pour desktop. Le cadrage ne doit
  jamais modifier la géométrie d'achat.

## Mouvement et accessibilité

- Les transitions restent bornées et composées : `transform`, `opacity`, bordure et ombre.
- Le scroll normal, le clavier et le toucher ne sont jamais capturés pour produire un effet de démonstration.
- `prefers-reduced-motion` conserve le contenu et les actions en supprimant les mouvements.
- Un sticker, un emoji ou une image décorative ne porte jamais seul une information essentielle ; le texte utile reste présent.
- Une section reste complète si l'asset décoratif est masqué, non chargé ou
  retiré ; aucun sticker n'est ancré au viewport ni placé au-dessus d'un prix,
  d'un stock, d'un panier, d'un menu ou de la barre système.

## Statut des assets décoratifs

Notre équipe prend en charge la création, la génération éventuelle, le classement et les exports des stickers, graffiti et illustrations. Les messages, la carte et le logo déjà reçus constituent le brief initial. Les références supplémentaires ne bloquent pas les propositions de démonstration. La propriétaire valide la sélection avant publication finale. Les photos commerciales réelles restent distinctes des illustrations générées. Voir les tâches G001–G120 de la feuille de route.

## Parcours principal sous contraintes

Le chemin de référence est `accueil → boutique fleurs → fiche produit → panier → checkout`. Il conserve la hiérarchie WOOD et ne permet l'ajout ou la poursuite d'achat qu'après contrôle des stocks, tarifs et disponibilité validés. Si ces données manquent, la fiche reste consultable mais l'action commerciale reste indisponible ; aucun paiement, retrait, code promotionnel ou avis n'est simulé. Le parcours est réversible tant que la propriétaire n'a pas validé les données commerciales et les photos réelles.

## Relecture avant intégration

1. La propriétaire confirme que le rendu reste WOOD.
2. Le conjoint confirme que la hiérarchie et la présentation sont assez fortes, sans exiger une copie.
3. Chaque asset reçoit une origine, une version, un statut `demo` ou `approved` et un texte alternatif.
4. Le parcours prix/stock/panier est retesté avant toute décoration supplémentaire.
