# Carte des contraintes WOOD

Statut : inventaire local des routes et frontières qui portent le contrat WOOD. Une entrée indique où lire ou modifier une règle ; elle ne remplace pas la validation de la propriétaire ni les contrôles externes.

## Routes publiques auditées

Les 11 routes ci-dessous sont déclarées dans `scripts/site-readiness.mjs`. Elles partagent le shell mobile, la palette et les règles de contenu ; aucune route admin publique n'est exposée.

| Route | Responsabilité | Modules et garde-fous |
| --- | --- | --- |
| `index.html` | Identité, hero, quatre univers, sélection et réassurance | `home-selection.css`, `home-engagement.css`, `wood-engagement.js`, `mobile-shell.js` |
| `fleurs.html` | Catalogue des fleurs et disponibilité | `storefront.js`, `catalog-demo-hydration.js`, `boutique.js`, `mobile-shell.js` |
| `resines.html` | Catalogue résines | `storefront.js`, `catalog-demo-hydration.js`, `boutique.js`, `mobile-shell.js` |
| `bien-etre.html` | Catalogue bien-être/huiles | `storefront.js`, `catalog-demo-hydration.js`, `boutique.js`, `mobile-shell.js` |
| `wood-shop.html` | Catalogue WOOD Shop | `storefront.js`, `catalog-demo-hydration.js`, `boutique.js`, `mobile-shell.js` |
| `fleur.html` | Fiche fleur, paliers et achat contrôlé | `flower-detail.js`, `flower-presentation.js`, `flower-pricing.js`, `order-api.js` |
| `produit.html` | Fiche générique des trois autres univers | `product-detail.js`, `order-api.js`, `order-options.js` |
| `compte.html` | Session client et espace propriétaire conditionnel | `account.js`, `owner-dashboard.js`, `owner-dashboard.css`, `owner-media.mjs`, `owner-product-validation.mjs` |
| `checkout.html` | Récapitulatif, livraison, coordonnées corrigeables | `checkout-required.js`, `order-api.js`, `order-options.js` |
| `confirmation.html` | Confirmation d'une commande réellement persistée | `confirmation.js`, `order-api.js` |
| `404.html` | Repli lisible et retour vers l'accueil | CSS local et repli mobile intégré |

## Frontières de données et d'accès

- `storefront.js`, `flower-detail.js` et `product-detail.js` rendent les données Supabase sans inventer prix, stock, disponibilité ou niveau. Les illustrations de `catalog-demo-hydration.js` restent des médias `demo` tant qu'elles ne sont pas approuvées.
- `order-api.js`, `order-options.js` et `checkout-required.js` forment la frontière de commande côté navigateur. La validation serveur et les migrations Supabase restent la source de vérité ; le panier local sert uniquement à préserver la continuité d'interface.
- `account.js` garde la session client dans le navigateur. `owner-dashboard.js` ne devient visible qu'après confirmation de `owner_users` et passe par les fonctions contrôlées pour les commandes, stocks, adresses et statuts.
- `scripts/prepare-hostinger.mjs` matérialise la frontière de publication par allow-list. Les migrations et fonctions Supabase restent hors du paquet public.
- Supabase est la source de vérité pour les comptes, rôles, produits, stocks, commandes et événements. Les secrets de service ne traversent jamais les routes publiques.
- Viva Wallet reste hors périmètre tant que ses identifiants professionnels et sa validation ne sont pas disponibles ; aucun état payé n'est créé par le navigateur.

## Sources de décision et preuves

| Sujet | Source versionnée | Vérification |
| --- | --- | --- |
| Identité, palette, mouvement et non-copie | `docs/design/wood-direction-register.md` | `test/direction-register.test.mjs`, `test/design-foundation.test.mjs`, `test/motion-guardrails.test.mjs` |
| Champs, disponibilité, médias et achat | `docs/design/wood-content-data-contract.md` | `test/content-data-contract.test.mjs`, `test/product-availability.test.mjs`, `test/catalog-contract.test.mjs` |
| Origine et statut des images | `docs/design/wood-asset-register.md` | `test/asset-register.test.mjs`, `test/store-demo-media.test.mjs` |
| Libellés sensibles | `docs/design/wood-microcopy.md` | `test/microcopy-contract.test.mjs`, `test/public-visual-guardrails.test.mjs` |
| Routes locales, ancres et limites externes | `scripts/site-readiness.mjs` | `test/local-readiness.test.mjs`, `npm run readiness` |
| Paquet de transfert | `scripts/prepare-hostinger.mjs` | `test/public-package-boundary.test.mjs`, `npm run hostinger:preflight` |

## Maintenance et retour arrière

Lorsqu'une contrainte change, modifier d'abord le registre ou le contrat concerné, puis les modules listés ici et leurs tests. Une donnée commerciale non confirmée peut être remise à `incomplete`, un média à `demo` et une action désactivée sans supprimer l'historique. `npm run check` doit rester vert avant toute préparation de paquet.
