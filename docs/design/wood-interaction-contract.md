# Contrat d’interaction WOOD

Statut : interaction locale versionnée, alignée sur le contrat contenu-données et la direction WOOD. Elle décrit les affordances et les garde-fous sans activer de paiement externe.

## Parcours principal

Le geste principal suit `découverte → sélection → panier → checkout`. Un lien ou un CTA HTML permet d'entrer dans chaque univers ; une carte ouvre sa fiche sans fusionner navigation et ajout au panier ; une fiche montre les informations validées avant de proposer l'action.

La sélection d'un grammage ne choisit qu'un palier reconnu. L'ajout au panier n'est actif que si prix, stock, catégorie, disponibilité et règles de grammage sont validés côté serveur. Le checkout récapitule les lignes, la quantité, le prix provisoire et la livraison avant toute opération externe.

## Interactions par état

| État | Interaction autorisée | Interaction refusée |
| --- | --- | --- |
| Produit validé | ouvrir la fiche, choisir un palier, ajouter une quantité bornée | double ajout non idempotent |
| Prix ou stock absent | lire la fiche et revenir au catalogue | ajouter au panier ou poursuivre un achat |
| Produit `soon` ou `rupture` | lire l'explication de disponibilité | simuler une réservation ou une date |
| Panier vide | fermer le panneau et retourner au catalogue | focaliser un checkout impossible |
| Donnée locale expirée ou invalide | nettoyer la ligne et expliquer le repli | afficher un total non vérifié |
| Session propriétaire absente | rester dans l'espace client | afficher une commande ou une action propriétaire |

## Équivalents clavier et tactile

Les changements d’image et les zooms répondent au hover, au focus et au toucher ; le contenu essentiel reste déjà présent sans hover. Les contrôles de menu, panier, grammage et quantité sont des boutons ou liens nommés, atteignables au clavier et dimensionnés pour le toucher.

Le menu mobile conserve un retour vers son niveau précédent et rend le focus au déclencheur. Le panneau panier se ferme par son bouton, par Escape lorsque disponible et par le retour clavier ; le focus ne doit jamais disparaître derrière le backdrop. Aucune capture du scroll n'est nécessaire pour découvrir ou acheter.

## Reduced-motion et résilience

Avec `prefers-reduced-motion`, les transitions, révélations, zooms, ticker et transitions de page cessent ou deviennent immédiats sans supprimer un texte, un lien ou une action. Un navigateur sans `IntersectionObserver`, une image lente ou un réseau lent conserve le HTML direct, le fallback WOOD et la géométrie d'achat.

Les doubles clics, doubles événements et réhydratations de cartes sont idempotents côté interface ; le serveur garde la validation finale, la clé d'idempotence et la réservation atomique. Une erreur réseau ne prétend jamais avoir créé une commande et laisse le panier corrigeable.

## Preuve et retour arrière

Les contrats `test/motion-guardrails.test.mjs`, `test/mobile-app-shell.test.mjs`, `test/cart-feedback.test.mjs`, `test/cart-resilience.test.mjs`, `test/product-availability.test.mjs` et `test/interaction-contract.test.mjs` couvrent les branches locales. La matrice Playwright dans `docs/validation/2026-11-05-responsive-reference.md` vérifie les mêmes gestes sur desktop, tablette et mobile.

Pour revenir en arrière, supprimer l'enhancement visuel tout en gardant les liens HTML et les boutons d'état ; l'achat reste borné par la validation serveur. Aucun changement de palette, de prix, de stock ou de statut de paiement n'est requis pour retirer une interaction décorative.
