# Inventaire public des routes WOOD

Ce document décrit uniquement les routes publiques du site statique. Les rôles, les stocks et les commandes restent protégés par Supabase ; aucun écran d’administration public n’est conservé.

| Route | Rôle | Destinations principales |
|---|---|---|
| `index.html` | Accueil WOOD, univers, boutiques et FAQ | `fleurs.html`, `resines.html`, `bien-etre.html`, `wood-shop.html`, ancres `#univers`, `#boutique`, `#questions` |
| `wood-shop.html` | Textile et produits dérivés | `checkout.html`, `compte.html`, autres univers |
| `fleurs.html` | Catalogue fleurs, grammage et ajout au panier | `fleur.html?produit=...`, `checkout.html` |
| `resines.html` | Catalogue résines | `checkout.html`, autres univers |
| `bien-etre.html` | Cosmétiques, huiles et bien-être | `checkout.html`, autres univers |
| `fleur.html` | Fiche détaillée d’une fleur | `fleurs.html`, `checkout.html` |
| `produit.html` | Fiche générique résines, bien-être et WOOD Shop | retour vers l’univers, `checkout.html` |
| `checkout.html` | Récapitulatif, identité et livraison à domicile | `confirmation.html`, `compte.html?return=checkout.html` |
| `contact.html` | Aide structurée par sujet, numéro de commande facultatif et contact direct | `index.html#questions`, téléphone, e-mail |
| `confirmation.html` | Confirmation d’une commande enregistrée | `index.html`, `fleurs.html`, `compte.html` |
| `compte.html` | Connexion, création de compte et historique client | espace propriétaire intégré après rôle `owner_users` confirmé |
| `404.html` | Secours pour une route inexistante | retour vers `index.html` |

## Règles de navigation

- Les quatre univers restent distincts : fleurs, résines, bien-être/cosmétiques/huiles et textile/goods.
- Le panier est accessible depuis les pages boutique et conserve ses lignes dans le stockage local avant la validation serveur.
- Le parcours commercial ne propose que la livraison à domicile ; le retrait Barla/Borriglione n’est pas une destination de commande.
- La route publique `admin.html` a été supprimée ; un visiteur ou un client ne voit ni lien ni écran d’administration. L’espace propriétaire est rendu dans `compte.html` uniquement après confirmation de son rôle.
- Les liens externes (cartes, téléphone, e-mail et réseaux) sont séparés des références locales et ne sont pas considérés comme des routes du dépôt.

Le test `test/links.test.mjs` vérifie les fichiers et les ancres locales de cet inventaire à chaque contrôle.
