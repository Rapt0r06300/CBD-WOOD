# Audit de la page d’accueil TealerLab → adaptation WOOD

Audit réalisé le 5 novembre 2026 à partir de la page publique [TealerLab](https://tealerlab.com/), complété par Exa et Parallel Search. Ce document décrit des principes d’interface à adapter, pas une copie graphique ou textuelle.

## Ce qui rend la page efficace

1. **Entrée immédiate dans le catalogue :** un en-tête compact, des accès rapides et des cartes produits visibles très tôt.
2. **Carte produit structurée :** image dominante, pastilles de contexte, nom très lisible, avis lorsque réels, paliers de grammage, prix au gramme et CTA.
3. **Rythme éditorial :** alternance entre sélections, catégories, produits, preuve de qualité, FAQ et communauté.
4. **Interaction légère :** variation d’image au survol, badges, carrousels et notifications visuelles ; chaque effet doit rester désactivable avec `prefers-reduced-motion`.
5. **Voix de marque :** micro-copy courte, directe, quelques emojis et humour dosé, sans sacrifier la lisibilité.
6. **Conversion répétée mais cohérente :** les mêmes chemins reviennent dans le menu, les cartes, les sections et le pied de page.
7. **Mobile pensé comme un parcours :** blocs empilés, contrôles tactiles, menu compact et aucune dépendance au survol.

## Adaptation WOOD retenue

| Principe observé | Décision WOOD |
| --- | --- |
| Header à accès rapides | Adapter l’organisation du menu et des utilitaires en gardant le logo, les couleurs et la typographie WOOD ; Compte/Panier restent faciles à atteindre, sans recherche par nom. |
| Cartes très visuelles | Afficher quatre aperçus sur l’accueil et conserver la grille boutique existante, avec les mêmes visuels WebP de démonstration et le même système de fiche. |
| Pastilles produit | Utiliser uniquement `CBD BOOSTÉ`, `CBD SOFT` et `CBD CLASSIQUE`, plus le nom de la catégorie ; aucun taux ou attribut non fourni. |
| Grammage et CTA | Prévoir les mêmes cartes riches sur l’accueil : 1/3/5/10/25 g, prix WOOD et état explicite. La démo montre les contrôles mais ne promet ni stock réel ni paiement actif. |
| Survol d’image | Sur ordinateur, l’illustration WOOD devient la fleur au survol ; sur mobile, la photo de démonstration reste directement visible car il n’y a pas de survol. |
| Notifications | Préparer un toast visuel explicitement marqué `APERÇU DÉMO`, sans nom de client, achat ou commande inventé. Les notifications réelles viendront uniquement des événements validés. |
| Pop-up fidélité/promo | Préparer la forme graphique, mais laisser offres et codes désactivés conformément à la demande de la propriétaire. |
| Couleurs et identité | Aucun fond blanc, orange, violet ou typographie TealerLab n’est importé : la grammaire reste vert WOOD, crème et lime. |

## Ce qui reste volontairement bloqué

- Pas de remise, code promo, avis, compteur de stock, achat ou preuve sociale fictive.
- Pas de photos commerciales définitives : les WebP actuelles sont des illustrations de démonstration et sont signalées comme telles.
- Pas de newsletter réellement envoyée : Gmail, consentement et fournisseur transactionnel restent externes.
- Pas de promesse de livraison, délai ou paiement tant que la propriétaire ne les a pas confirmés.

## Sources et limites

Les éléments d’interface ont été relevés sur la page publique [tealerlab.com](https://tealerlab.com/) et recoupés avec une extraction de la page officielle via les deux outils de recherche. La page ne constitue pas une spécification de leur code interne ; toute conclusion technique sur leur implémentation reste une inférence visuelle.
