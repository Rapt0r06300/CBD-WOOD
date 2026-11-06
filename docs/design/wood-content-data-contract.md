# Contrat contenu et données WOOD

Statut : contrat local versionné, valable pour la démonstration et la préparation de production. Les valeurs commerciales réelles restent à saisir et à valider par la propriétaire.

## Source de vérité

- Le registre de direction `docs/design/wood-direction-register.md` est la source de vérité pour l'identité WOOD, la palette, la hiérarchie, les mouvements accessibles et les contraintes de non-copie.
- Le registre d'assets `docs/design/wood-asset-register.md` est la source de vérité pour l'origine, le chemin, le statut `demo` ou `approved`, le texte alternatif et le remplacement des médias.
- Supabase est la source de vérité pour les produits, stocks, commandes et rôles. Le champ `availability_state` doit être lu avec le stock et les tarifs validés ; le HTML, le panier local et les données de démonstration ne peuvent pas devenir une seconde base commerciale.
- `docs/design/wood-microcopy.md` est la source de vérité pour les libellés sensibles. Le code ne fabrique pas de promesse, de taux, de promotion ou de délai absent de cette bibliothèque.

## Contrat produit public

Chaque fiche ou carte publique peut exposer, dans cet ordre fonctionnel : média, univers, niveau WOOD reconnu, nom exact, description validée, grammage, disponibilité, prix total, prix au gramme quand calculable et action.

Les champs commerciaux sont des données, pas du décor :

| Champ | Règle | Fallback sûr |
| --- | --- | --- |
| `id` | Identifiant produit persistant, jamais un nom inventé | fiche non achetable si absent |
| `name` | Nom exact fourni par WOOD, échappé dans le HTML | nom manquant signalé à la propriétaire |
| `category` | `fleurs`, `resines`, `bien-etre` ou `wood-shop` | catégorie invalide refusée |
| `availability_state` | `available`, `soon`, `rupture` ou `incomplete` | `incomplete`, action désactivée |
| `stock` | Entier nul ou positif confirmé côté serveur | stock inconnu, action désactivée |
| `price_cents` / paliers | Prix validé côté serveur et associé au bon grammage | prix absent, action désactivée |
| `media_path` / statut | Image réelle ou illustration marquée `demo` | fallback WOOD distinct et annoncé |

Un produit sans prix ou stock confirmé reste visible comme fiche informative, mais ne peut ni être ajouté au panier ni atteindre une commande active. Une valeur inconnue n'est jamais remplacée par `0`, un faux stock, un prix d'exemple ou une promotion.

## États de disponibilité

- `available` : le prix, le stock, la catégorie et les règles de grammage applicables sont confirmés ; l'action peut être proposée après validation serveur.
- `soon` : le produit peut être présenté comme à venir, sans promesse de date et sans ajout au panier.
- `rupture` : la fiche reste informative, le stock n'est pas masqué et l'achat est désactivé.
- `incomplete` : une information nécessaire manque ; le message explique que la disponibilité ou les tarifs sont à confirmer.

Les états ne sont pas déduits d'un texte décoratif. La commande ne traite que les données relues par le serveur et refuse tout produit dont le prix, le stock, la disponibilité ou le grammage n'est pas validé.

## Médias et contenu éditorial

Les illustrations locales sont des médias de démonstration jusqu'à validation explicite. Elles peuvent montrer la composition, mais ne prouvent ni l'existence du stock ni la photo commerciale finale. Une photo réelle de fleur ou de résine doit suivre le brief sans bocal ni cloche et recevoir un statut `approved` avant publication commerciale.

Le contenu éditorial peut expliquer l'univers, la livraison à domicile disponible et le fonctionnement du compte. Il ne doit pas inventer d'effet médical, de taux, d'avis client, de code promotionnel, de QR code, de retrait en boutique, de frais ou de délai. Les accents graphiques restent séparés du prix, du stock, du paiement, de la livraison, des erreurs et du légal.

## Frontière d’achat

Le parcours public de référence est `accueil → boutique fleurs → fiche produit → panier → checkout`. Le panier conserve seulement les champs nécessaires au récapitulatif et ne transforme pas une donnée locale en preuve de stock.

Le checkout affiche les lignes, les quantités, le prix provisoire et la livraison à domicile. Les coordonnées sont corrigeables avant envoi. L'absence de configuration externe reste visible : Viva Wallet est désactivé tant que ses identifiants professionnels et sa validation ne sont pas disponibles. Aucun reçu payé, document final ou e-mail de confirmation de paiement n'est simulé.

## Contrôle et retour arrière

Toute nouvelle donnée commerciale doit être ajoutée à Supabase, vérifiée dans le dashboard propriétaire et retestée sur carte, fiche, panier et checkout. Les changements d'identité ou de contenu sont d'abord documentés dans les registres versionnés.

Pour revenir en arrière, retirer le statut `approved`, repasser le média en `demo`, remettre `availability_state` à `incomplete` et désactiver l'achat ; aucune suppression destructive d'historique de commande ou de stock n'est nécessaire. Les validations locales peuvent être rejouées avec `npm run check` et `npm run hostinger:preflight`.
