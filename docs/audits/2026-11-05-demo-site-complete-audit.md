# Audit complet de la démo WOOD — 5 novembre 2026

## Objet

Ce document accompagne la mise à jour de la feuille de route. Il s’agit d’un audit de la démo existante et d’une préparation méthodique de la future adaptation WOOD ; ce n’est pas une validation commerciale et cela ne lance aucune implémentation visuelle.

La relecture montre que les matrices D/E contiennent des formulations mécaniques et parfois inapplicables : on ne peut pas tester le contraste d’un schéma SQL comme celui d’une carte produit. Elles restent un inventaire de questions à qualifier, et non une preuve de 1 220 développements utiles ou terminés. Le bloc G001–G120 de la feuille de route apporte des livrables spécifiques, des fichiers, dépendances et critères de validation pour la présente révision.

## Conclusion actuelle

**Révision du brief :** notre équipe doit créer et gérer les graffiti, stickers et illustrations de démonstration. Les références supplémentaires de la propriétaire ne sont plus un préalable à la conception ; son accord reste nécessaire avant publication finale. Les nouvelles captures réaffirment premium, chill, graffiti, stickers, humour et identité WOOD intacte.

**Constat Supabase en lecture seule :** le projet contient treize produits et soixante-cinq tarifs ; Storage présente uniquement le bucket privé `order-documents` et aucun objet. `products.image_path` ne constitue pas encore un circuit de médias approuvés. Dans `owner-media.mjs`, les slugs courts et préfixés ainsi que la présence d’un chemin doivent être revus pour ne pas confondre illustration démo, image absente et vraie photo. Aucune donnée distante n’a été modifiée.

La démo possède une base technique et fonctionnelle déjà avancée, mais elle n’est pas encore la version « waouh » attendue. Les captures contrôlées montrent des écarts visuels réels à traiter avant toute déclaration de finition : superpositions qui peuvent couvrir le hero, barre mobile fixe qui peut recouvrir du contenu, cartes encore plus simples que la référence, états de démonstration à mieux distinguer et validation humaine finale absente.

La bonne direction est une **adaptation** : reprendre chez TealerLab la hiérarchie, le rythme, la mise en scène produit et les micro-interactions utiles, mais traduire chaque élément dans l’univers WOOD.

## Contraintes non négociables

- Couleurs, logo officiel, typographie, carte et identité WOOD conservés.
- Contraste renforcé avec une direction chic/premium, chill, graffiti, stickers et humour dosés ; ne pas qualifier l’univers de « street ».
- Aucune copie du logo, des textes, des photos, des promotions, des avis, des clients, des chiffres ou de la fidélité TealerLab.
- Les futures fleurs et résines doivent être photographiées comme de vrais produits, avec un bel angle et une lumière soignée, sans bocal ni cloche comme présentation principale.
- Quatre univers conservés : fleurs, résines, bien-être/huiles et WOOD Shop.
- Pas de recherche par nom, pas de filtre produit, pas de QR code, pas de retrait en boutique et pas de promotion pour le moment.
- Boutique : trois produits par ligne sur ordinateur ; quatre cases carrées bien alignées sur mobile lorsque la largeur le permet, puis repli propre sur les téléphones étroits.
- Même visuel de démonstration dans la boutique et l’espace propriétaire.
- Fleurs : 1/3/5/10/25 g, départ à 1 g, boutons plus/minus, prix propres à chaque variété, réduction limitée à 25 g et répétition contrôlée au-delà.
- Les aperçus de popup et de notification restent explicitement démo tant qu’aucune donnée réelle et aucun consentement n’existent.
- Les clients ne voient jamais l’espace propriétaire ; les nouveaux comptes sont clients par défaut ; la propriétaire arrive directement sur sa gestion après authentification de son rôle.
- Les identifiants, clés Supabase, secrets Gmail, Viva et Turnstile restent hors du dépôt public.

## Écarts observés dans la démo

1. Le premier écran est parfois chargé par l’aperçu d’offre et la notification d’activité ; ces éléments doivent être différés, non bloquants, fermables et clairement marqués.
2. La barre de navigation mobile fixe doit réserver exactement sa hauteur et sa safe area ; elle ne doit recouvrir ni un formulaire, ni un prix, ni un bouton.
3. L’accueil doit faire entrer plus vite dans les produits, avec une hiérarchie de cartes plus riche et un rythme plus proche de la référence, tout en restant WOOD.
4. Les cartes doivent mieux distinguer média, catégorie, niveau, nom, description, grammage, disponibilité, prix au gramme et CTA.
5. Les visuels WebP actuels sont des illustrations de démonstration ; leur statut doit être visible et leur remplacement par les vraies photos doit être prévu sans modifier les prix ou règles.
6. Le changement d’image au survol doit être stable sur desktop et avoir une alternative tactile sur mobile.
7. Les révélations au scroll et le zoom de fiche ne doivent créer ni saut, ni trou vide lors d’un scroll rapide ou d’une capture pleine page.
8. Les fiches hydratées par JavaScript doivent posséder un fallback de titre et de résumé pour rester compréhensibles avant l’hydratation.
9. Le dashboard propriétaire doit être testé avec une fixture non productive ; son rendu et ses états vides doivent être validés séparément sur mobile et desktop.
10. La livraison, Gmail, Supabase production, Viva, domaine, DNS, HTTPS et Hostinger nécessitent encore une recette dans leurs environnements réels.

## Méthode anti-tâches inutiles

Chaque groupe de dix tâches correspond à une même zone du produit mais à dix risques différents : structure, contenu, adaptation de l’identité, interaction, responsive, accessibilité, résilience, sécurité, performance et preuve. Si une ligne est déjà couverte par une preuve existante, elle doit être transformée en tâche d’amélioration ou reliée à cette preuve ; elle ne doit pas être cochée uniquement parce qu’un fichier existe.

Les tâches d’identité ne demandent pas de changer les couleurs : elles vérifient que l’adaptation de la composition TealerLab reste WOOD. Les tâches de sécurité sont conservées même pour les écrans visuels lorsque ceux-ci touchent aux rôles, à la disponibilité, aux prix ou aux données. Les tâches de preuve empêchent de confondre « présent dans le code » avec « validé sur un appareil réel ».

## Recherche utilisée

La page publique [TealerLab](https://tealerlab.com/) a servi à observer le header, les accès rapides, l’entrée rapide dans le catalogue, les cartes à média dominant, les pastilles, le grammage, le prix au gramme, le CTA, le changement d’image, le popup et les notifications. La comparaison reste une inférence visuelle et ne prétend pas connaître leur code interne.

Pour la partie données, les repères proviennent de la [checklist de production Supabase](https://supabase.com/docs/guides/platform/going-into-prod), de la [sécurisation des Edge Functions](https://supabase.com/docs/guides/functions/auth) et des [sauvegardes Supabase](https://supabase.com/docs/guides/platform/backups.md). Ils imposent notamment de vérifier RLS, les secrets serveur, les fonctions authentifiées, les sauvegardes et la restauration.

## Preuves locales disponibles

- `npm run check` a été exécuté avant cette mise à jour documentaire : la suite locale a passé 257 tests ; la syntaxe JavaScript, l’audit statique, la readiness et la continuité passent.
- Les captures Playwright de la démo couvrent desktop 1440, tablette 768, mobile 390, fleurs, fiche produit, checkout et compte dans `output/playwright/`.
- Les contrôles locaux ne prouvent pas encore Safari réel, Firefox réel, appareils physiques, réglages Supabase production, Gmail, Viva, DNS, HTTPS ou Hostinger.
- La version legacy reste la sauvegarde ; la bascule ne doit intervenir qu’après les preuves et les validations humaines.

## Lien avec la feuille de route

La matrice D est complétée par le registre E001–E200, ajouté après la passe anti-oubli. Ce registre traite uniquement les angles morts opérationnels nouvellement identifiés : conformité des contenus, cycle de vie des données, parité des migrations, stockage, documents commerciaux, livraison, délivrabilité Gmail, OAuth, restauration, supervision et passation. Une tâche E recouvrante doit être fusionnée avec sa preuve existante au lieu d’être cochée deux fois.

La matrice détaillée est intégrée dans la feuille de route sous les blocs D0001–D1020 et E001–E200. Les tâches D et E sont atomiques et ne déclenchent aucune implémentation automatique.

## Règle de sortie

La feuille de route n’est pas terminée tant que les tâches applicables n’ont pas de preuve, que les décisions de la propriétaire ne sont pas renseignées et que la propriétaire et son conjoint n’ont pas validé séparément : « c’est toujours WOOD » et « la présentation est au niveau attendu ». Aucun résultat local ne doit être présenté comme une ouverture commerciale réelle.

