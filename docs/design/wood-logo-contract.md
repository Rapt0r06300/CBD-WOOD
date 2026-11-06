# Contrat du logo original WOOD

Statut : contrat local versionné. Le logo officiel reste un asset fourni et intact ; la propriétaire doit encore confirmer la sélection finale avant toute publication commerciale.

## Source et intégrité

- La source unique est `assets/wood-mark.svg`, conservée sans réinterprétation, recoloration, étirement ou branche graphique alternative.
- Le fichier SVG garde sa géométrie intrinsèque et son `preserveAspectRatio`; les CSS ne changent que sa taille dans la zone de marque.
- Le wordmark texte `WOOD` qui accompagne le mark reste un libellé de navigation, pas une nouvelle version du logo. Aucun logo externe et aucune branche inventée ne sont introduits.
- Le mark n'est jamais remplacé par une capture, une illustration générée ou un asset TealerLab.

## Routes et variantes

Les 10 pages avec en-tête partagé (`index.html`, `wood-shop.html`, `fleurs.html`, `resines.html`, `bien-etre.html`, `fleur.html`, `produit.html`, `compte.html`, `checkout.html`, `confirmation.html`) utilisent le même chemin versionné `assets/wood-mark.svg?v=wood-logo-original-exact-20261103` dans le lien de marque. La route `404.html` conserve un repli textuel vers l'accueil sans fabriquer une nouvelle marque.

Le lien de marque renvoie à l'accueil : `#accueil` sur l'accueil et `index.html` sur les pages internes. Le texte `WOOD` et la mention `CBD / NICE` restent dans la même hiérarchie et ne sont pas séparés par un composant concurrent.

## Responsive et accessibilité

Le mark conserve une largeur de `30px` sur le shell desktop et `25px` sur les écrans étroits. Le lien parent porte `aria-label="WOOD CBD Nice, accueil"`; l'image du mark est décorative (`alt="" aria-hidden="true"`) afin d'éviter de lire deux fois le nom de marque. Le lien reste dans l'ordre clavier et sa zone tactile est incluse dans l'en-tête.

Les contrôles du menu et du panier restent séparés du lien de marque. Aucun zoom, hover ou animation n'est nécessaire pour comprendre la marque ; `prefers-reduced-motion` conserve la même géométrie et le même accès.

## États et fallback

Le logo est chargé avec l'en-tête, sans dépendre d'une donnée Supabase, d'un stock, d'un prix ou du panier. Si le fichier média échoue, le texte de marque et le lien d'accueil restent lisibles ; une section décorative ne doit jamais masquer la navigation. La route 404 utilise son repli local et conserve le retour vers l'accueil.

Les états `demo` ou `approved` des photos de produits ne s'appliquent pas au logo officiel. Le statut du logo reste `provided/original` jusqu'à une décision explicite de la propriétaire.

## Preuve et rollback

`test/logo-contract.test.mjs`, `test/homepage-shell.test.mjs`, `test/mobile-app-shell.test.mjs`, `test/navigation-accessibility.test.mjs`, `test/responsive-layout.test.mjs` et la matrice `docs/validation/2026-11-05-responsive-reference.md` vérifient l'usage du fichier, l'ordre du shell, les dimensions responsive, le clavier et l'absence de débordement.

Pour revenir en arrière, restaurer le fichier SVG fourni et le paramètre de version précédent, puis rejouer les tests ; aucune donnée commerciale, migration Supabase ou route publique ne doit être modifiée pour retirer une variante visuelle.
