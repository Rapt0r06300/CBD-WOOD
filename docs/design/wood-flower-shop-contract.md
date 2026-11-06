# Contrat de la boutique fleurs WOOD

Statut : contrat local versionné. Les 13 références et leurs tarifs sont une base de démonstration issue de la carte WOOD ; ils ne valent pas validation de stock réel, de photo commerciale ou d'ouverture finale par la propriétaire.

## Périmètre et sources

Le périmètre couvre `fleurs.html`, `flower-presentation.js`, `storefront.js`, `flower-detail.js`, `catalog-demo-hydration.js`, `boutique.js` et les styles de catalogue. `flower-presentation.js` est la source de vérité des noms, visuels et descriptions de démonstration ; les données Supabase deviennent la source commerciale quand elles sont publiées et validées.

Les 13 entrées sont `Nimbus 3000`, `Ivory`, `Velvet Kush`, `Pastraweed`, `Euphoria`, `Purple`, `Bloody Mary`, `Cosmic CBG`, `Charlotte`, `Rainbow`, `Orange Bud`, `Plutonium` et `Fanta Hazy`. Les illustrations WebP portent un statut démo, un texte alternatif et une direction sans bocal ni cloche. Les descriptions restent visuelles et ne promettent aucun effet médical ou taux de CBD.

## Catalogue, prix et fiches

Chaque carte relie la référence à une fiche fleur dédiée, expose le niveau WOOD reconnu, les paliers de grammage et les prix de la carte lorsqu'ils sont connus. Les paliers d'affichage restent `1 g`, `3 g`, `5 g`, `10 g` et `25 g` ; la garde serveur peut refuser un palier non validé et le navigateur affiche alors `Tarif à confirmer` avec un CTA désactivé.

La fiche conserve le nom, le profil, la description, le média, les faits et le tableau de prix séparés. Elle peut être consultée sans autoriser l'achat d'une donnée incomplète. Le parcours nominal est `fleurs → fiche fleur → grammage → panier`, mais l'ajout ne devient actif qu'après contrôle du prix, du stock et de la disponibilité.

## États, disponibilité et fallback

Une donnée absente, un prix nul, un stock nul, une erreur Supabase ou une image manquante reste visible par un état textuel et un CTA indisponible. Le fallback image revient au visuel botanique WOOD ou à `Visuel à venir`, sans masquer le nom ni inventer une photo réelle.

Les cartes recréées après un rendu Supabase récupèrent les mêmes interactions, sans double liaison. Un double clic rapide ne duplique pas une ligne. Les états `available`, `soon`, `rupture` et `incomplete` sont compréhensibles sans couleur seule ; une référence indisponible ne peut pas rejoindre le panier.

## Responsive, accessibilité et sécurité

- Ordinateur : trois colonnes et zones de carte stables, avec image, nom, badges, paliers et CTA visibles.
- Tablette : la grille se resserre sans recouvrir les prix ni les sélecteurs.
- Mobile : deux colonnes puis une colonne étroite, noms longs contenus sur deux lignes, contrôles de grammage tactiles et CTA atteignable.

Les cartes sont sémantiques, les images ont des textes alternatifs, les libellés de grammage sont associés aux contrôles, et le clavier/toucher ne dépend pas du survol. Les transitions sont composées et `prefers-reduced-motion: reduce` conserve le contenu. Les prix et stocks commerciaux suivent les garde-fous serveur, RLS et fonctions de commande ; aucune clé ou session n'est exposée.

## Preuve, revue et rollback

La preuve locale est constituée par `test/flower-shop-contract.test.mjs`, `test/flower-presentation.test.mjs`, `test/flower-pricing-guard.test.mjs`, `test/store-demo-media.test.mjs`, `test/product-availability.test.mjs`, les suites responsive/accessibilité et la vérification Playwright de la boutique, de la fiche et du checkout synthétique.

La propriétaire et son conjoint doivent encore revoir les noms, profils, prix et photos ; les navigateurs et appareils réels restent séparés de la preuve Node/Chromium locale. Pour revenir en arrière, restaurer le registre, les templates, les scripts et les styles fleurs vers le snapshot validé, puis rejouer `npm run check`. Le rollback ne modifie ni commandes, ni comptes, ni stocks réels, ni secrets, ni migrations.
