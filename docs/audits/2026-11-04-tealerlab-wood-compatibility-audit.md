# Audit comparatif WOOD / TealerLab — ordinateur et mobile

Date de l’audit : 4 novembre 2026  
Référence observée : [tealerlab.com](https://tealerlab.com/)  
Projet audité : WOOD local, servi depuis le dépôt actuel

## 1. Conclusion

Le conjoint de la propriétaire peut retrouver dans WOOD ce qu’il aime chez TealerLab sans que WOOD perde son identité. La bonne direction n’est pas de copier TealerLab, mais de reprendre sa hiérarchie : une entrée forte, des univers immédiatement compréhensibles, des produits très lisibles, des preuves de confiance et des actions d’achat directes.

WOOD possède déjà une base plus calme et plus premium. C’est un avantage pour la propriétaire : il faut ajouter de l’énergie street par petites touches, pas remplacer toute la direction artistique.

## 2. Ce qui fonctionne chez TealerLab

### Ordinateur

- En-tête très orienté conversion : menu, recherche, compte, fidélité et panier accessibles.
- Hero très fort visuellement, avec une promesse, une offre et un bouton principal.
- Bandeaux animés qui donnent une sensation de mouvement et de campagne active.
- Sections commerciales distinctes : offres, best-sellers, produits, packs.
- Cartes produit très complètes : catégorie, intensité/type, avis, grammages, ancien prix, prix actuel, prix au gramme et ajout rapide.
- Réassurance répartie dans la page : avis, livraison, FAQ, communauté et informations produit.
- Fiche produit structurée autour d’une grande image, des informations, des variantes et du panier.

### Mobile

- En-tête réduit à menu, logo, recherche et panier.
- Menu mobile en cartes à deux colonnes, facile à parcourir avec le doigt.
- Fiche produit en colonne unique : image avant les informations, puis sélection de variante et achat.
- Les grandes images et les blocs de campagne conservent une vraie présence sur petit écran.
- Les offres et catégories restent visibles sans devoir comprendre une navigation desktop.

### Ce que cela signifie pour WOOD

À reprendre : la hiérarchie, la clarté des produits, la visibilité du panier, les blocs de réassurance et une navigation mobile dédiée.  
À ne pas reprendre automatiquement : les pop-ups agressifs, le volume de sections, les jeux, les programmes de fidélité, les slogans, les photos, les couleurs et les effets exacts de TealerLab.

## 3. Points faibles observés chez TealerLab à ne pas reproduire

- Un pop-up de collecte d’e-mail et un second pop-up promotionnel peuvent recouvrir la page produit dès l’arrivée, sur ordinateur comme sur mobile.
- Le site utilise de nombreux compteurs, marquages et bandeaux animés. Ils donnent de l’énergie, mais rendent la lecture plus chargée.
- Les mesures DOM montrent des contenus internes plus larges que leur conteneur : le document masque le débordement au lieu de l’éliminer complètement. Sur mobile 390 px, le `body` mesurait 411 px ; sur desktop 1440 px, 1513 px. Les bandeaux et certains éléments de menu sont les principaux responsables.
- La page d’accueil et la fiche produit chargent un grand nombre de boutons, sections, intégrations et scripts tiers. L’expérience est riche mais plus fragile.
- L’audit navigateur a aussi observé des erreurs côté scripts tiers sur la fiche produit, dont une ressource widget absente et des appels Klaviyo bloqués par CORS dans l’environnement de test. Ce n’est pas une raison de copier cette architecture dans WOOD.

## 4. État actuel de WOOD vérifié

### Résultats positifs

- Accueil : pas de débordement à 390 px ni à 1440 px, aucune image cassée.
- Fleurs : 13 cartes, trois colonnes calculées sur ordinateur, deux colonnes de 170 px sur mobile 390 px, aucun débordement détecté.
- WOOD Shop : trois cartes sur ordinateur, deux colonnes sur mobile.
- Produit : le clic sur Nimbus ouvre bien la fiche dédiée.
- Achat : `+` passe Nimbus de 1 g à 2 g, le prix passe à 30,00 €, puis l’ajout met le panier à 1 article.
- Panier : le contenu est conservé dans `wood-cart-v1` et le récapitulatif mène au checkout.
- Checkout : le mode affiché est uniquement la livraison, l’adresse est demandée et le paiement Viva reste désactivé comme prévu.
- Administration : l’ancienne route `admin.html` a été retirée ; le tableau de bord propriétaire est intégré à `compte.html` et reste masqué sans rôle confirmé.
- Images : aucune image cassée dans les pages testées.

### Point visuel détecté sur WOOD

- Sur mobile, le libellé de la navigation basse `NOUS TROUVER` est tronqué en `NOUS TROU...` dans la capture de l’accueil. Le bouton reste utilisable, mais ce n’est pas au niveau de finition souhaité.
- La barre basse mobile est très utile pour la sensation d’application, mais ses quatre libellés doivent rester entièrement compréhensibles sur 320–390 px.
- Le site WOOD est volontairement plus court et plus calme que TealerLab. Il ne faut pas ajouter des dizaines de sections pour créer artificiellement la même densité.

## 5. Direction recommandée pour satisfaire les deux personnes

### Le compromis visuel

**Fondation WOOD :** vert profond, crème, lime, typographie actuelle, logo officiel, composition éditoriale et images botaniques.  
**Énergie inspirée de TealerLab :** badges/stickers ponctuels, petites annotations graffiti, offres lisibles, cartes produit plus expressives, micro-animations contrôlées et ton un peu plus vivant.  
**Règle de dosage proposée :** environ 80 % premium calme, 15 % texture/street, 5 % surprise ou humour. Cette règle est une proposition de direction, pas un élément à appliquer sans validation visuelle.

### Accueil WOOD

1. Garder le hero actuel et son identité.
2. Ajouter un bandeau simple en haut pour la livraison, sans promesse non confirmée.
3. Mettre les quatre univers WOOD immédiatement après le hero.
4. Ajouter une sélection de produits réels lorsque les photos et stocks seront disponibles.
5. Créer un bloc “présentation sous cloche” avec les photos de la propriétaire.
6. Ajouter une réassurance courte : conseil, boutiques de Nice, qualité et disponibilité à confirmer.
7. Garder la FAQ et les boutiques accessibles sans les enfouir.

### Boutique WOOD

1. Conserver une page par univers : fleurs, résines, bien-être/cosmétiques/huiles et goods/textile.
2. Garder trois cartes par ligne sur ordinateur et la grille deux par deux sur mobile.
3. Utiliser une carte inspirée de TealerLab pour la densité d’information, mais avec le style WOOD.
4. Afficher le niveau `CBD boosté (strong)`, `CBD soft (medium)` ou `CBD classique` sans filtre compliqué.
5. Garder le sélecteur à partir de 1 g, le `+`, le `−`, le prix total et le prix au gramme.
6. Ne jamais mélanger les grilles de prix entre variétés.
7. Ajouter un détail produit avec grande photo sous cloche, description, grammage et achat.

### Mobile

1. Conserver la navigation basse app-like.
2. Corriger le libellé `Nous trouver` pour qu’il soit lisible à toutes les petites largeurs.
3. Garder un en-tête court, un panier toujours visible et un menu simple.
4. Éviter les pop-ups qui masquent immédiatement une fiche ou le bouton d’achat.
5. Tester les composants à 320, 375, 390, 430 et 768 px, puis sur ordinateur à 1024 et 1440 px.
6. Respecter les zones sûres, le clavier virtuel, l’orientation et `prefers-reduced-motion`.

## 6. Audit Supabase lié à la future évolution

- Projet actif et sain, région `eu-west-1`.
- RLS activé sur les tables publiques auditées : produits, prix, commandes, lignes de commande, profils clients, propriétaires et idempotence.
- Les politiques observées séparent globalement les clients de leur propre compte et les propriétaires des données d’administration.
- La fonction `create-pending-order` est active. Elle accepte les commandes invitées, vérifie le bearer token lorsqu’il est fourni, valide l’origine, l’idempotence et la livraison uniquement.
- Le conseiller sécurité Supabase signale une seule alerte : la protection contre les mots de passe compromis est désactivée. Elle doit être activée avant une vraie ouverture commerciale.
- Les conseillers performance indiquent cinq index actuellement inutilisés. Ce n’est pas bloquant avant trafic réel ; ils devront être réévalués après observation des requêtes.
- Le schéma conserve encore des colonnes et anciennes migrations liées au retrait (`pickup_code` et anciennes règles Barla/Borriglione), même si la contrainte et la fonction active imposent désormais `delivery`. Une migration de nettoyage devra être préparée, testée et appliquée seulement après sauvegarde et vérification qu’aucune commande réelle ne dépend de ces champs.
- Le système anti-robot est prévu dans le code, mais son activation effective et la limitation de débit doivent être vérifiées dans l’environnement Supabase avant production.

## 7. Tâches ajoutées à la feuille de route

Les tâches 40 à 48 ajoutées à la feuille de route reprennent directement cet audit :

40. Formaliser la direction WOOD premium/street avec validation visuelle de la propriétaire.
41. Corriger le libellé de navigation mobile `Nous trouver` et vérifier tous les textes courts.
42. Ajouter un audit responsive multi-largeurs sur toutes les pages publiques.
43. Ajouter les blocs TealerLab compatibles : offres sobres, cartes produit riches, réassurance, FAQ et sélection WOOD.
44. Refuser les pop-ups bloquants et les animations qui masquent un achat.
45. Préparer les vraies photos sous cloche avec ratios stables, `alt` et chargement progressif.
46. Activer la protection Supabase contre les mots de passe compromis avant production.
47. Vérifier Turnstile, limitation de débit, origines autorisées et scénarios de double soumission.
48. Nettoyer les traces de retrait dans Supabase après sauvegarde et validation des données.

## 8. Verdict

La base WOOD n’est pas à remplacer. Elle doit être enrichie par petites couches : **structure commerciale de TealerLab, identité WOOD, équilibre chic/premium et chill/graffiti, photos authentiques de la boutique, achat simple et sécurité Supabase**.

Le meilleur résultat pour les deux personnes sera un WOOD plus vivant et plus vendeur, mais plus lisible et moins agressif que TealerLab. Le conjoint reconnaîtra l’énergie qu’il aime ; la propriétaire reconnaîtra immédiatement sa marque.

## 9. Audit visuel approfondi — mesures observées

L’audit a été repris sur le site réel avec un navigateur à deux tailles représentatives : ordinateur `1440 × 900` et mobile `390 × 844`. Les chiffres ci-dessous décrivent les mécanismes observés, pas des éléments à copier tels quels.

### 9.1 Hiérarchie de la page d’accueil TealerLab

Sur ordinateur, la page enchaîne une longue histoire commerciale en blocs indépendants :

1. bandeau d’annonce et en-tête très contrasté ;
2. hero visuel d’environ `630 px` de haut ;
3. bandeau défilant d’environ `78 px` ;
4. bloc promotionnel ;
5. cartes de catégories/offres ;
6. preuve sociale et logos ;
7. grille produit ;
8. pack/bundle ;
9. contenu communautaire ;
10. jeu, éditorial, FAQ, newsletter et footer.

Sur mobile, la même logique devient verticale : hero d’environ `540 px`, cartes en deux colonnes et blocs pleine largeur. Les sections ne sont pas simplement réduites ; elles changent de rythme, de densité et parfois de composition.

**Adaptation WOOD :** conserver le hero actuel, puis reprendre seulement la séquence utile : `message livraison → quatre univers → sélection WOOD → présentation sous cloche → réassurance → FAQ → boutiques`. Ne pas ajouter le jeu, le parrainage, la fidélité ou la newsletter tant que la propriétaire ne les demande pas.

### 9.2 Cartes catalogue TealerLab

- Ordinateur : grille observée à quatre colonnes d’environ `278 px`.
- Mobile : grille observée à deux colonnes d’environ `181 px`.
- Image produit : environ `276 × 221 px` sur ordinateur et `179 × 143 px` sur mobile.
- Les cartes combinent badge de gamme, nom, avis, formats, ancien prix, prix remisé, prix au gramme, stock et action d’ajout.
- Les cartes restent visuellement denses, mais l’action principale est répétée et identifiable.

**Adaptation WOOD :** garder trois cartes par ligne sur ordinateur comme demandé par Florent, et deux colonnes carrées sur mobile, soit quatre cartes visibles dans un bloc `2 × 2`. La carte WOOD doit afficher uniquement ce qui est réel : image/état photo à venir, nom, niveau `strong/medium/classique`, grammage, prix exact de l’affiche, stock et ajout. Aucun faux avis, taux ou badge promotionnel.

### 9.3 Fiche produit TealerLab

La fiche observée est structurée en profondeur : présentation produit, achat, expédition, informations de qualité, produits complémentaires, choix de variété, description, avis, recommandations et FAQ. Elle mesure environ `1492 px` pour son premier grand bloc sur ordinateur et `1968 px` sur mobile.

**Adaptation WOOD :** créer une fiche plus courte et plus calme : grande photo sous cloche, nom et niveau, description claire, sélecteur `− / grammes / +`, prix total, prix au gramme, bouton d’ajout, livraison, puis informations complémentaires. L’animation de zoom doit être courte et stable ; elle ne doit jamais faire sauter le scroll ni masquer le prix.

### 9.4 Graphisme et langage visuel observés

- noir/blanc/lime très contrasté ;
- grandes capitales de type display pour les titres ;
- sans-serif neutre pour les informations ;
- photos et collages très présents ;
- stickers, badges, emojis, textes inclinés et bandeaux animés ;
- CTA très visibles, souvent en forme pleine et arrondie ;
- ton direct, humoristique et communautaire ;
- menus très riches et forte densité de collections.

**Ce que WOOD reprend :** hiérarchie, densité contrôlée des cartes, bandeaux d’information, preuve de qualité et petites touches street.  
**Ce que WOOD ne reprend pas :** noir/lime de TealerLab, sa police, ses images, ses slogans, ses badges exacts, ses promotions, ses emojis ou sa structure copiée.

### 9.5 Défauts à ne pas importer

L’audit a aussi relevé des points à éviter :

- le corps de TealerLab dépasse parfois la largeur du viewport et masque le problème avec `overflow: clip` ;
- plusieurs éléments défilants ont une largeur interne supérieure à l’écran ;
- des fenêtres promotionnelles et cookies recouvrent immédiatement le hero et le contenu mobile ;
- la page utilise de nombreux scripts et affiche des erreurs console dans l’environnement d’audit ;
- la densité de sections peut fatiguer un utilisateur qui veut simplement choisir un produit.

Pour WOOD, les défilements seront limités à des éléments internes explicitement contrôlés, jamais au document entier. Les popups resteront hors du premier écran et aucun élément ne recouvrira le prix ou le bouton d’achat.

## 10. Traduction concrète pour WOOD

### Priorité P0 — identité et stabilité

- conserver les couleurs, le logo officiel, la typographie et la composition WOOD ;
- garder le contraste minimum demandé par la propriétaire ;
- corriger d’abord les décalages et libellés mobiles ;
- vérifier que les cartes et boutons restent accessibles sans animation ;
- ne pas remplacer les illustrations actuelles avant réception des vraies photos.

### Priorité P1 — nouvelle hiérarchie commerciale

- accueillir avec le hero WOOD actuel ;
- ajouter un bandeau livraison discret ;
- placer les quatre univers dans une grille nette ;
- introduire une sélection WOOD de trois cartes desktop/deux colonnes mobile ;
- ajouter une section “qualité sous cloche” avec les photos authentiques ;
- terminer par FAQ et boutiques, sans enfouir les informations.

### Priorité P2 — cartes et fiches

- créer une carte produit WOOD riche mais lisible ;
- réserver des hauteurs fixes aux images, titres et actions ;
- garder la mécanique des grammes uniquement pour les produits qui se vendent au poids ;
- afficher les prix exacts variété par variété ;
- utiliser les stickers et l’humour seulement comme accents, jamais au détriment de la lecture.

### Priorité P3 — contenus futurs

- intégrer les photos sous cloche ;
- ajouter les vraies promotions et vouchers ;
- ajouter éventuellement avis, newsletter ou fidélité après décision de la propriétaire ;
- ne connecter Viva Wallet qu’avec les identifiants officiels.

## 11. Correspondance avec la feuille de route

Les mesures et décisions de cet audit précisent les tâches existantes sans en changer le nombre :

- tâches 4–8 : direction graphique WOOD premium/chill/graffiti ;
- tâches 9–15 : architecture des catégories, cartes et fiches produit ;
- tâches 16–19 : panier, livraison et promotions vérifiables ;
- tâches 29–32 : adaptation réelle mobile/tablette/ordinateur et garde-fous ;
- tâches 40–45 : intégration sélective de l’énergie TealerLab et validation des photos ;
- tâches 36–39 : recette complète avec la propriétaire et contrôle anti-régression.

La décision de conception est donc : **reproduire la hiérarchie, le rythme et la puissance commerciale appréciés dans TealerLab, mais conserver intégralement la signature WOOD**.

## 12. Vérification Supabase en direct — 4 novembre 2026

Contrôle en lecture seule du projet connecté après les migrations additives :

- `products`, `product_prices`, `orders`, `order_items`, `customer_profiles`, `owner_users` et `order_idempotency_keys` ont RLS activé ; la colonne `products.availability_state` existe avec l’état par défaut `incomplete`.
- Le projet contient 13 produits, 65 paliers de prix et une commande existante ; aucun stock réel n’a été modifié pendant cet audit.
- Deux comptes sont actuellement présents dans `owner_users` : le compte de la propriétaire et le compte de Florent pour la phase de construction. La suppression de l’accès de Florent reste volontairement conditionnée à la confirmation de la propriétaire, conformément à la tâche 35.
- `orders.fulfillment_mode` est limité à `delivery` ; `pickup_code` est conservé uniquement pour l’historique et ne doit pas être supprimé avant sauvegarde et revue des commandes existantes.
- Les migrations de disponibilité, de sécurisation des commandes et de garde tarifaire sont enregistrées côté Supabase ; les tarifs intermédiaires restent refusés par le serveur.
- L’avis sécurité Supabase restant est `Leaked Password Protection Disabled`. Il doit être activé dans Auth avant l’ouverture commerciale. Les avis de performance concernent uniquement des index encore inutilisés sur une base sans trafic et ne justifient pas de suppression préventive.
