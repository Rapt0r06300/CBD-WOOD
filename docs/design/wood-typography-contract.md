# Contrat typographique WOOD

Statut : contrat local versionné. Il décrit le système actuellement livré ; il ne vaut pas validation de nouvelle police, de nouvelle charte ou de nouvelle maquette par la propriétaire.

## Source de vérité

`boutique.css` porte la police et les règles de production partagées par les pages publiques. La police de référence reste `Arial, Helvetica, sans-serif`, sans import distant ni dépendance à Google Fonts. `responsive.css` complète les règles de composition de l'accueil et ne doit pas contredire les valeurs canoniques de `boutique.css`.

Les pages concernées sont l'accueil (`index.html`), les quatre univers (`fleurs.html`, `resines.html`, `bien-etre.html`, `wood-shop.html`), les fiches (`fleur.html`, `produit.html`), le panier et le checkout. Les textes réels, les prix, les stocks, les statuts et les libellés restent dans leurs sources de contenu respectives ; la typographie ne doit jamais fabriquer une information commerciale.

## Hiérarchie et tokens

La hiérarchie WOOD suit `kicker → titre → phrase courte → action`. Les titres d'impact utilisent une graisse forte et une chasse resserrée, tandis que les phrases de lecture conservent une taille et une hauteur de ligne qui restent confortables :

| Niveau | Règle locale | Usage |
| --- | --- | --- |
| Police | `Arial, Helvetica, sans-serif` | système sans téléchargement externe |
| Titres de campagne | `font-weight: 900`, capitales, `line-height` proche de `.9` | hero et grands titres |
| Titres de fiche | `clamp(48px, 6vw, 88px)`, `letter-spacing: -.075em` | produit ou fleur |
| Texte courant | 13–18px, `line-height` autour de 1.5–1.7 | description, aide et contenu métier |
| Kicker et métadonnée | 9–11px, graisse forte, capitales, espacement positif | repère, catégorie, statut |
| Action | hauteur tactile minimale existante, graisse forte, capitales | bouton, lien et ajout |

Les tokens WOOD restent ceux du registre (`--bg`, `--ink`, `--muted`, `--line`, `--lime`, `--wood`, `--pine`, `--card`, `--soft`, `--font`). Une nouvelle police, une graisse exceptionnelle ou une nouvelle échelle est une décision de charte à faire relire ; elle ne doit pas être introduite par une carte isolée.

## Répartition responsive

- Ordinateur : le hero et les titres de section utilisent des `clamp` bornés ; la largeur du conteneur et les colonnes déterminent la respiration, pas une réduction arbitraire du texte.
- Tablette : les grilles se réorganisent avant que les titres ou les actions ne se chevauchent ; les textes restent lisibles et les boutons gardent leur zone tactile.
- Mobile : les grands titres passent par des bornes dédiées (`page-hero`, `.section-title`, détails produit et checkout). Les noms longs sont contenus, les cartes gardent leur ordre et le texte essentiel n'est pas masqué par une animation.
- Téléphones étroits : le layout de fiche devient une colonne et les contrôles se replient sans supprimer le titre, le prix, la disponibilité ou l'action désactivée.

Les valeurs fluides doivent rester bornées par `clamp`, `minmax` ou une règle de repli explicite. Aucun texte ne doit être rendu illisible par `overflow: hidden`, une hauteur fixe ou une transformation décorative.

## États et accessibilité

Le chargement, l'état vide, l'erreur et le fallback conservent la même hiérarchie sémantique et annoncent leur état par du texte. Un libellé n'est pas transmis par la taille, la graisse ou la couleur seule ; les états de disponibilité, prix manquant, stock manquant, livraison et paiement restent explicitement écrits.

Les titres suivent l'ordre sémantique de la page (`h1`, puis `h2`, puis `h3`) sans sauter de niveau pour obtenir un effet graphique. Les liens, boutons, champs et contrôles de grammage gardent leurs noms accessibles et une zone tactile utilisable. Les images décoratives ou de démonstration ont un texte alternatif adapté au registre d'assets ; la typographie ne remplace jamais ce texte.

Les transitions typographiques restent limitées aux propriétés composées déjà acceptées (`transform`, `opacity`, bordure et ombre). `prefers-reduced-motion: reduce` retire les mouvements sans retirer le contenu, le focus, la lisibilité ou les actions.

## Preuve, décision et rollback

La preuve locale est constituée par `test/typography-contract.test.mjs`, les tests responsive/accessibilité existants et la vérification visuelle Playwright du parcours accueil → boutique → fiche → panier → checkout. Cette preuve locale ne remplace pas une comparaison sur Safari, Firefox et appareils réels.

La décision de conserver la police système et cette hiérarchie reste à faire confirmer par la propriétaire et son conjoint. Les validations navigateur/appareil réelles restent ouvertes, de même que l'acceptation finale de la maquette.

Pour revenir en arrière, restaurer les règles typographiques de `boutique.css` et `responsive.css`, retirer le contrat et son test si le contrat est abandonné, puis rejouer `npm run check`. Aucun rollback typographique ne doit toucher aux contenus, stocks, commandes, rôles, secrets ou migrations.
