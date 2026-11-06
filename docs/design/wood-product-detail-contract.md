# Contrat des fiches produit WOOD

Statut : contrat local versionné. Une fiche permet de comprendre une référence et de choisir un grammage lorsque les données sont disponibles ; elle ne transforme jamais une démonstration, une donnée locale ou une information incomplète en commande confirmée.

## Périmètre et source

Le périmètre couvre `fleur.html` et `flower-detail.js` pour les fleurs, `produit.html` et `product-detail.js` pour les trois autres univers, ainsi que `boutique.js`, `flower-presentation.js`, les styles de détail et le panier local. La carte ouvre la fiche avec un identifiant déterministe ; le catalogue et Supabase publié restent les sources respectives de présentation et de données commerciales.

La fiche fleur conserve le nom exact, le profil WOOD reconnu, la description, le visuel de démonstration, les faits, les paliers et le tableau de tarifs. La fiche générique reprend la catégorie, le nom, le média, la description, la disponibilité et les tarifs publiés de la référence demandée, sans réutiliser un produit d'un autre univers.

## Contenu, prix et disponibilité

Le titre, le profil, le grammage et le prix sont des informations distinctes et lisibles. Les fleurs affichent les paliers `1 g`, `3 g`, `5 g`, `10 g` et `25 g` quand ils sont validés ; le contrôle transmet uniquement le palier sélectionné. Un prix, un stock ou une disponibilité absente produit `Disponibilité à confirmer`, un état non achetable et un message de repli plutôt qu'un zéro ou une promotion inventée.

Le bouton d'ajout n'est actif que lorsque le serveur reconnaît le produit, le prix, le stock, la catégorie, le grammage et l'état `available`. Les références réelles, les photos et les informations réglementaires restent à valider par la propriétaire. Viva, le retrait, un reçu payé et une confirmation de commande ne sont pas simulés par la fiche.

## Parcours et états

Le parcours nominal est `boutique → fiche → choix du grammage → panier → checkout`, avec un lien `Retour aux fleurs` ou un retour vers l'univers générique. La fiche propose au plus trois références du même univers, sans promotion, avis ou best-seller inventé, et exclut la référence courante.

Le chargement initial, l'absence d'identifiant, l'identifiant inconnu, l'erreur réseau et l'image manquante restent compréhensibles. Le fallback média conserve un texte alternatif descriptif et la mention de démonstration ; la sélection du grammage et le contenu déjà rendu ne disparaissent pas lors d'un échec. Toute double activation est bornée par les garde-fous du panier et du serveur.

## Responsive, accessibilité et motion

- Ordinateur : introduction, visuel, faits, tarifs et carte d'achat restent lisibles sans faire dépendre le contenu d'un survol.
- Tablette : la grille se resserre en conservant le titre, le tableau et le retour catalogue.
- Mobile : la fiche passe en colonne, les tableaux peuvent défiler horizontalement dans leur conteneur, les contrôles restent atteignables et les zones sûres sont respectées.

Le zoom d'image utilise uniquement `transform`/`opacity`, peut être fermé ou interrompu par une navigation et conserve l'accès clavier/toucher. `prefers-reduced-motion: reduce` rend la transition immédiate sans supprimer le visuel, le texte, le prix, le grammage ou l'action. Les titres de sections associées restent sémantiquement séparés et les alternatives d'image sont descriptives.

## Preuve, revue et rollback

La preuve locale est constituée par `test/wood-product-detail-contract.test.mjs`, `test/product-detail.test.mjs`, `test/flower-shop-contract.test.mjs`, `test/store-demo-media.test.mjs`, `test/product-availability.test.mjs`, les suites responsive/accessibilité/motion et la vérification du parcours fiche → panier → checkout synthétique.

La propriétaire et son conjoint doivent valider les photos réelles, profils, textes, tarifs, stocks, précautions et règles de commande. Les navigateurs et appareils réels restent une validation séparée. Pour revenir en arrière, restaurer `fleur.html`, `flower-detail.js`, `produit.html`, `product-detail.js`, `boutique.js` et les styles vers le snapshot validé, puis rejouer `npm run check`. Le rollback ne touche ni comptes, ni produits, ni stocks, ni commandes, ni secrets, ni migrations.
