# Direction visuelle WOOD v2

## Intention

WOOD adopte une présentation éditoriale dense et tactile : une grande image ou illustration, une phrase courte, une action nette, puis des preuves et des détails. TealerLab reste une référence de rythme et de merchandising, jamais une source de copie. WOOD conserve sa personnalité botanique, familiale, niçoise et indépendante.

## Tokens de base

```css
:root {
  --wood-ink: #101610;
  --wood-surface: #172319;
  --wood-surface-2: #233427;
  --wood-line: #455544;
  --wood-paper: #f1f0e6;
  --wood-lime: #cbf096;
  --wood-muted: #b8c8b4;
  --wood-max: 1440px;
}
```

Ces tokens sont des repères de direction, pas une permission de créer des couleurs isolées dans chaque composant. Les nouveaux composants doivent réutiliser les variables existantes ou expliquer leur exception.

## Trois niveaux de hiérarchie

### Impact commercial

Hero, sélection, cartes et CTA. Le prix, le stock, le grammage, le paiement et les erreurs restent sobres, contrastés et immédiatement lisibles. Aucun graffiti, animation ou texture ne doit passer devant une information d’achat.

### Récit éditorial

Histoire, atelier, humeur, séquences photo, éditorial et communauté. Le rythme alterne grands médias, phrases courtes, rails contrôlables et pauses visuelles. Une image de démonstration porte explicitement le label « photo démo ».

### Information de confiance

FAQ, origine, qualité, conditions, livraison, données de laboratoire et disponibilité. Toute preuve possède une source ou reste dans un état vide honnête. Une illustration ne remplace jamais une preuve réelle.

## Grille et responsive

- Desktop de référence : largeur utile maximale de `1440px`, marges généreuses, grilles de 2 à 4 colonnes selon la densité.
- Tablette : priorité aux rails contrôlables et aux grilles de 2 colonnes.
- Mobile : une colonne pour le récit, deux colonnes seulement pour des cartes courtes, aucune décoration ne doit provoquer de débordement horizontal.
- Les zones sensibles restent utilisables à 320–390 px et avec zoom navigateur.

## Images et graffitis

Les photos réelles remplacent les photos de démonstration uniquement après validation du propriétaire. Les graffitis WOOD sont des accents optionnels : ils peuvent être masqués, non chargés ou retirés sans perte de sens, de contraste ou de géométrie commerciale. Les SVG décoratifs exposés dans le DOM portent `aria-hidden="true"` et `focusable="false"`.

La direction ne copie pas la marque TealerLab, ne reproduit pas son lettrage et ne porte jamais seule une information comme le prix, le stock, une allégation ou une promotion.

## Motion

Les révélations au scroll, zooms d’image et transitions de rail sont courtes, réversibles et non indispensables à la compréhension. Avec `prefers-reduced-motion: reduce` ou `Save-Data`, les animations sont coupées et le contenu reste visible dans le même ordre.

## Critère de revue

Une capture desktop et une capture mobile doivent permettre de répondre en moins de cinq secondes à trois questions : qu’est-ce que WOOD propose, comment découvrir une sélection, et comment obtenir une information fiable avant d’acheter.
