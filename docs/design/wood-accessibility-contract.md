# Contrat accessibilité WOOD

Statut : contrat local versionné. WOOD doit rester lisible, navigable et compréhensible pour tous les âges, sans dépendre d'un âge supposé, d'une souris, d'une couleur, d'un mouvement ou d'une session propriétaire.

## Périmètre et niveaux

Le contrat couvre les pages publiques, le header, le menu mobile, le panier, les cartes et fiches produit, le checkout, le compte client, les états de disponibilité, les médias et le footer. Les HTML et données validées sont la source de vérité ; les styles et scripts améliorent la présentation sans retirer le contenu direct.

Les critères locaux portent sur la structure sémantique, l'ordre de lecture, le clavier, le focus visible, les noms accessibles, les alternatives d'images, le contraste et les cibles tactiles. Ils ne prétendent pas remplacer une mesure humaine exhaustive WCAG ou une validation avec technologies d'assistance réelles.

## Clavier, focus et navigation

Tous les liens, boutons, champs, sélecteurs, accordéons et dialogues restent activables au clavier. Le focus visible utilise une outline contrastée ; l'ouverture du panier et du menu mémorise le déclencheur, enferme le parcours dans l'état ouvert quand nécessaire, puis rend le focus avec `preventScroll` ou sur le déclencheur à la fermeture.

Le menu expose `aria-expanded`, `aria-controls`, un retour de sous-vue et `Escape`. Le panier expose `role="dialog"`, `aria-modal="true"`, une fermeture et un état vide sans lien de checkout focalisable. Les liens directs restent présents si un enhancement JS, un média ou une donnée distante manque.

## Lecteur d’écran, contenu et états

Chaque page conserve un titre et des régions identifiables. Les liens ont un nom explicite, les icônes décoratives sont masquées, les images porteuses d'information ont un `alt` descriptif et les images décoratives restent vides pour éviter les doublons vocaux. Les champs client utilisent un type, un nom, un label et l'autocomplétion adaptés.

Les états critiques sont textuels et structurés : `Rupture de stock`, `Bientôt disponible`, `Disponibilité à confirmer` et `Prix à confirmer` ne sont jamais signalés par la couleur seule. Les chargements, erreurs, fallbacks et confirmations annoncent ce qui s'est passé sans exposer de secret, de rôle propriétaire ou de détail Supabase interne.

## Contraste, toucher et responsive

Les textes, surfaces, bordures, focus et états restent distinguables dans les densités desktop, tablette et mobile. Les contrôles tactiles principaux atteignent au moins 44px de largeur et 48px de hauteur lorsque le contexte mobile l'exige, avec safe areas autour de la barre basse et des panneaux.

Le zoom de page, le clavier virtuel, l'orientation paysage et les téléphones étroits ne suppriment ni action ni libellé. Les textes longs se replient, les erreurs restent visibles et le débordement horizontal global est évité sans couper une information essentielle.

## Motion, fallback et sécurité

`prefers-reduced-motion: reduce` conserve les mêmes mots, routes, contrastes, focus et actions en neutralisant les transitions et animations. Un pointeur fin, une souris absente, un lecteur d'écran ou un script non chargé ne peut pas bloquer une destination publique.

Les contrôles propriétaire restent cachés avant confirmation de `owner_users`, l'ancienne route admin n'est pas exposée et aucune donnée client ou session n'est injectée dans un texte non échappé. Les corrections visuelles ne modifient ni prix, ni stock, ni commande, ni RLS.

## Preuve, revue et rollback

La preuve locale est `test/wood-accessibility-contract.test.mjs`, complétée par `test/accessibility.test.mjs`, `test/navigation-accessibility.test.mjs`, les contrats d'actions, de logo, de cartes et la matrice responsive. Elle vérifie le clavier, les dialogues, les labels, les états textuels, le contraste déclaré, les cibles tactiles, le reduced-motion et l'exclusion propriétaire.

La propriétaire et son conjoint relisent les libellés, la densité, le contraste et les parcours sensibles ; les essais sur navigateurs, lecteurs d'écran et appareils réels restent une validation externe. Pour revenir en arrière, restaurer le snapshot validé des HTML, `boutique.js`, `mobile-shell.js`, `boutique.css` et `mobile.css`, puis rejouer `npm run check`. Le rollback ne supprime aucune donnée métier.
