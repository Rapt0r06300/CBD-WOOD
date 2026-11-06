# Contrat du menu mobile WOOD

Statut : contrat local versionné. Le menu mobile est une couche app-like publique ; il adapte l'accès au contenu sans devenir une application séparée ni masquer les routes essentielles.

## Périmètre et source

Le contrat couvre le bouton hamburger, le menu structuré, ses groupes et sous-vues, la barre de navigation basse, le panier mobile, le footer compact et la transition entre pages. `mobile-shell.js` porte la logique, `mobile.css` la géométrie et les safe areas, `boutique.css` les primitives de dialogue, de focus et de reduced-motion, et les templates HTML les routes.

Le shell s'applique aux pages publiques prévues et s'abstient dans l'espace propriétaire. Il détecte les capacités réelles (`matchMedia`, pointeur, IntersectionObserver, safe areas) plutôt qu'un nom d'appareil ou un user-agent. Les destinations restent les routes publiques WOOD ; aucune entrée admin n'est créée.

## Vues, actions et retour focus

La vue racine expose les groupes `Explorer WOOD`, `Les univers` et `Accès rapides`. Un bouton ouvre une sous-vue avec `aria-expanded` et `aria-controls`, un bouton `← Retour au menu` revient à la racine, un lien referme la vue et `Escape` réinitialise l'état. Le focus est envoyé au bouton de retour ou au déclencheur avec `preventScroll` pour que le contenu ne saute pas.

La barre basse conserve `Accueil`, `Boutique`, `Nous trouver` ou `Panier`, et `Compte`. Elle indique la page courante par `aria-current`, reste visible dans la zone sûre et transmet le clic panier au dialogue existant quand celui-ci est disponible. Un menu ouvert, un panier vide ou une page sans session ne doit jamais empêcher une destination directe.

## Safe areas et responsive

- Au-dessous de 800px, la navigation compacte se déploie sans débordement horizontal et garde les liens à 48px minimum.
- Les panneaux utilisent `100svh` et `env(safe-area-inset-top/bottom)` ; leur contenu reste défilable sous les barres système.
- Le toucher dispose d'équivalents au clavier ; le pointeur fin ne porte aucune action essentielle.
- Les téléphones étroits conservent les libellés, notamment `Nous trouver`, sans ellipsis qui supprimerait une information.

Le menu n'intercepte pas le scroll de la page pour produire un effet. Les transitions de page et d'ouverture sont annulées en low-data ou sous `prefers-reduced-motion: reduce`, sans supprimer le contenu, le focus ou les liens.

## États, accès et reduced-motion

Le chargement tardif du shell laisse le header HTML utilisable. Si un script, un média ou une sous-vue manque, le menu garde ses liens directs et son fallback statique. Une erreur de réseau ne déconnecte pas le client et ne modifie pas le panier local.

Le shell est absent de l'espace propriétaire (`admin-page`). Les contrôles propriétaire sont gardés par le compte et la source de vérité `owner_users`. Les labels restent textuels, les icônes sont décoratives, et les états actifs/ouverts ne dépendent pas de la couleur seule.

## Preuve et rollback

La preuve locale est constituée par `test/mobile-menu-contract.test.mjs`, `test/mobile-app-shell.test.mjs`, `test/navigation-accessibility.test.mjs`, les suites responsive/accessibilité et la vérification Playwright du premier écran mobile. Elle couvre les sous-vues, le focus, les liens, les safe areas, le compte, le panier et l'exclusion propriétaire.

La validation sur navigateurs et appareils réels reste à exécuter ; la revue propriétaire/conjoint est distincte de la preuve automatisée. Pour revenir en arrière, restaurer `mobile-shell.js`, `mobile.css`, `boutique.css` et les templates vers le snapshot validé, puis rejouer `npm run check`. Le rollback ne touche aucune donnée métier.
