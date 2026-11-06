# Contrat du header desktop WOOD

Statut : contrat local versionné. Le header conserve l'organisation WOOD existante et les utilités publiques ; il ne transforme pas l'accueil en copie d'un site concurrent et n'ouvre aucune route propriétaire.

## Périmètre et source

Le périmètre couvre le bandeau, le logo/marque, les liens d'univers, le CTA de découverte, le compte, le panier et le menu structuré partagé par les pages publiques. Les templates HTML portent les destinations, `boutique.css` et `responsive.css` portent le rendu, `mobile.css` et `mobile-shell.js` portent le repli mobile, et le contrat de logo garde l'origine du mark WOOD.

Le header ne dépend pas d'une recherche par nom imposée. Les quatre univers, le compte et le panier restent visibles ou accessibles par une route directe ; aucune entrée `admin.html` ne doit apparaître dans le shell public. Le compte n'affiche les fonctions propriétaire qu'après confirmation serveur du rôle.

## Structure et destinations

La structure stable est `announcement → header.nav → brand → nav-links → utilités compte/panier → CTA`. Les liens rejoignent les pages publiques déterministes (`fleurs.html`, `resines.html`, `bien-etre.html`, `wood-shop.html`, `compte.html`, `checkout.html`) et conservent le chemin de retour naturel via l'URL et le panier local.

Le menu et le panier sont des dialogues contrôlables. Une ouverture garde le déclencheur, une fermeture rend le focus, et un état vide ou indisponible reste annoncé dans le DOM. Une double activation rapide ne duplique ni une ligne de panier ni une navigation inattendue.

## Responsive et safe areas

- Ordinateur : les liens et utilités restent sur une ligne stable, sans recherche ni débordement caché.
- Tablette : le header passe en mode compact avant que les liens ne se chevauchent ; le CTA secondaire peut disparaître sans supprimer les destinations compte/panier.
- Mobile : le bouton menu garde une zone tactile suffisante, le menu structuré propose ses sous-vues et un retour, et le panier reste atteignable.
- Safe areas : le contenu sous les barres système conserve ses marges, `100svh` et le padding bas nécessaires ; aucune couche fixe ne recouvre un lien ou un prix.

Le clavier, le toucher et le pointeur fin disposent d'équivalents. Le focus visible est conservé, le scroll n'est pas capturé, et `prefers-reduced-motion: reduce` supprime les transitions sans retirer la navigation.

## États, accès et fallback

Le header supporte le chargement local des scripts, l'absence de session, le panier vide, une erreur réseau et un fallback statique. Le logo et les libellés restent compréhensibles si un asset décoratif ne se charge pas. Les liens client ne révèlent ni données privées ni secrets.

Les routes publiques ne promettent pas le paiement Viva, la livraison détaillée, un stock ou une promotion. Le CTA de compte mène à l'espace client ; l'accès propriétaire passe par `owner_users` et les fonctions contrôlées, jamais par une adresse codée en dur.

## Preuve et rollback

La preuve locale est constituée par `test/desktop-header-contract.test.mjs`, `test/navigation-accessibility.test.mjs`, `test/logo-contract.test.mjs`, les suites responsive/accessibilité/motion et le contrôle du package public. Elle couvre les routes, le focus, les menus structurés, le point de rupture tablette, les safe areas et l'absence d'admin public.

La validation sur navigateurs et appareils réels reste à exécuter ; la revue propriétaire/conjoint demeure nécessaire pour l'intensité et les choix de présentation. Pour revenir en arrière, restaurer les templates de header, `boutique.css`, `responsive.css`, `mobile.css` et `mobile-shell.js` vers le snapshot validé, puis rejouer `npm run check`. Le rollback ne touche aucune donnée métier.
