# Contrôle local de préparation — 5 novembre 2026

Ce contrôle porte uniquement sur le dépôt local. Il ne constitue pas une mise en ligne et ne remplace pas les validations de Supabase, Gmail, Viva Wallet ou Hostinger.

## Contrôles automatisés ajoutés

- `npm run readiness` parcourt les 11 routes publiques, leurs références locales et leurs ancres, vérifie la préparation mobile et refuse toute référence `admin.*` ou tout secret serveur.
- `npm run continuity` parcourt l’historique SQL local, vérifie les préfixes temporels uniques, les fichiers non vides, l’absence de secrets et le runbook sauvegarde/restauration.
- `npm run check` exécute désormais ces deux contrôles en plus des tests, de la syntaxe JavaScript et de l’audit statique.
- La configuration d’hébergement distingue maintenant le HTML privé et non cacheable des assets versionnés à cache borné, sur `.htaccess` et `_headers` ; le contrat est couvert par `test/security-headers.test.mjs`.
- Le formulaire de compte associe explicitement l’identifiant utilisateur aux champs de mot de passe, et la matrice navigateur locale ne signale plus d’avertissement console sur `compte.html`.

## Visuels de démonstration

- L’accueil montre maintenant une sélection de quatre fiches WOOD avec les visuels WebP de démonstration déjà utilisés par les fiches fleurs.
- La boutique fleurs applique les treize mêmes visuels au chargement, via `catalog-demo-hydration.js`, et l’espace propriétaire réutilise ces chemins dans la colonne `Média`.
- Chaque rendu est explicitement marqué `PHOTO DÉMO` ou `Illustration de démonstration`. Ces images ne valent ni validation de stock ni photo commerciale et pourront être remplacées par les vraies photos sans changer les produits.
- Sur ordinateur, les cartes d’accueil et de fleurs prévisualisent l’illustration WOOD puis révèlent la fleur WebP au survol ; sur tactile, la fleur reste visible directement.
- Le pop-up d’offre et le toast d’activité sont des maquettes visuelles marquées `Aperçu démo`. Aucun code promo, client, avis ou commande fictive n’est exploité.

## Limites assumées

- La restauration réelle doit encore être exécutée sur un projet Supabase de test avec une sauvegarde réelle.
- Safari iOS/macOS, Firefox et les appareils physiques restent à valider séparément.
- Gmail, Viva Wallet, le domaine, le DNS, le SSL et Hostinger restent des réglages externes.
- Les stocks, photos réelles, règles de livraison et contenus légaux restent à fournir ou valider par la propriétaire.

## Règle de sécurité

Aucun secret, identifiant de paiement ou donnée client réelle n’a été ajouté au dépôt pendant ce contrôle.

## Parcours navigateur local — reprise du 5 novembre 2026

- Parcours contrôlé avec Playwright CLI : accueil → boutique fleurs → fiche Nimbus 3000 → panier vide protégé → panier local synthétique non publié → checkout.
- La fiche produit et la boutique affichent l’indisponibilité lorsque les stocks et tarifs réels ne sont pas validés ; aucune commande réelle n’a été créée et aucun paiement n’a été déclenché.
- Le panier synthétique placé uniquement dans `wood-cart-v1` a vérifié la continuité d’affichage du panier et du checkout : produit, catégorie, quantité, prix provisoire, mode livraison et formulaire sont cohérents.
- Console navigateur sur la page checkout : **0 erreur, 0 avertissement**.
- Cette preuve ne valide ni Supabase, ni Viva Wallet, ni les stocks réels ; elle valide seulement le chemin local réversible et son garde-fou d’absence de données commerciales.

## Preuve de la dernière passe

- `npm run check` : **333/333 tests réussis**, syntaxe JavaScript OK, audit JavaScript OK, readiness OK et continuité OK.
- Matrice Playwright locale : **32 routes × tailles** sans débordement ni erreur JavaScript, puis **20 contrôles d’orientation** sans échec.
- Parcours interactif : la fiche Nimbus s’ouvre depuis la boutique ; le grammage passe de `1 g` à `2 g` puis `3 g`, avec le tarif validé de `42,00 €` à `3 g`.
- `npm run prepare:hostinger` puis pré-contrôle : **57 fichiers publics**, paquet accepté localement, aucun déploiement effectué.

## État Supabase live — migrations vérifiées et réglages restants

- L’URL du projet live `https://fautpphrrhwcmcywzsbk.supabase.co` correspond à la valeur publique versionnée dans `supabase-config.js` ; aucune clé privilégiée n’a été ajoutée au dépôt.
- Le contrôle Supabase du 5 novembre 2026 recense maintenant **36 migrations distantes** jusqu’à `20261105212609` et **37 fichiers de migration locaux**. Les cinq migrations locales postérieures ont été appliquées dans l’ordre depuis le connecteur autorisé, sous les versions distantes générées `20261105211227` (`rate_limit_rls`), `20261105211247` (`customer_account_rights`), `20261105211249` (`owner_order_status_rpc`), `20261105211250` (`owner_order_address_correction`) et `20261105212609` (`auth_role_compatibility`).
- Les vérifications SQL confirment RLS sur `private.order_rate_limit_buckets`, `public.account_deletion_requests`, `public.order_status_changes`, `public.order_stock_releases` et `public.order_address_changes`, ainsi que l’existence des RPC propriétaires ; aucun privilège `anon` n’est accordé aux RPC opérationnelles. La source locale de la première correction reste `supabase/migrations/20261105232000_rate_limit_rls.sql`. Aucune donnée de commande ou de client n’a été écrite.
- L’audit de sécurité distant conserve trois portes explicites : la protection Auth contre les mots de passe compromis est désactivée ; l’alerte informative « RLS sans policy » est attendue pour la table privée opérée exclusivement par `service_role` ; les deux RPC propriétaires `SECURITY DEFINER` restent intentionnelles, protégées par `owner_users`, mais doivent être revues avant production selon l’advisor Supabase.
