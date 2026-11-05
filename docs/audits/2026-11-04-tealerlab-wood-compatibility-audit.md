# Audit comparatif WOOD / TealerLab — ordinateur et mobile

Date de l’audit : 4 novembre 2026  
Référence observée : [tealerlab.com](https://tealerlab.com/)  
Projet audité : WOOD local, servi depuis le dépôt actuel

## 1. Conclusion

Le conjoint de la propriétaire peut retrouver dans WOOD ce qu’il aime chez TealerLab sans que WOOD perde son identité. La bonne direction n’est pas de copier TealerLab, mais de reprendre sa hiérarchie : une entrée forte, des univers immédiatement compréhensibles, des produits très lisibles, des preuves de confiance et des actions d’achat directes.

WOOD possède déjà une base plus calme et plus premium. C’est un avantage pour la propriétaire : il faut ajouter de l’énergie graffiti et chill par petites touches, pas remplacer toute la direction artistique.

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

- Le libellé de la navigation basse `NOUS TROUVER` a été corrigé et contrôlé sur les largeurs mobiles ciblées ; il reste entièrement lisible.
- La barre basse mobile est très utile pour la sensation d’application ; ses quatre libellés doivent rester entièrement compréhensibles sur 320–390 px lors de toute future modification.
- Le site WOOD est volontairement plus court et plus calme que TealerLab. Il ne faut pas ajouter des dizaines de sections pour créer artificiellement la même densité.

## 5. Direction recommandée pour satisfaire les deux personnes

### Le compromis visuel

**Fondation WOOD :** vert profond, crème, lime, typographie actuelle, logo officiel, composition éditoriale et images botaniques.  
**Énergie inspirée de TealerLab :** badges/stickers ponctuels, petites annotations graffiti, offres lisibles, cartes produit plus expressives, micro-animations contrôlées et ton un peu plus vivant.  
**Règle de dosage proposée :** environ 80 % premium calme, 15 % texture/graffiti, 5 % surprise ou humour. Cette règle est une proposition de direction, pas un élément à appliquer sans validation visuelle.

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
- Les conseillers performance indiquent huit index actuellement inutilisés, dont les index de l’historique des commandes et de la file d’outbox. Ce n’est pas bloquant avant trafic réel ; ils devront être réévalués après observation des requêtes.
- Le schéma conserve encore des colonnes et anciennes migrations liées au retrait (`pickup_code` et anciennes règles Barla/Borriglione), même si la contrainte et la fonction active imposent désormais `delivery`. Une migration de nettoyage devra être préparée, testée et appliquée seulement après sauvegarde et vérification qu’aucune commande réelle ne dépend de ces champs.
- Le système anti-robot est prévu dans le code, mais son activation effective et la limitation de débit doivent être vérifiées dans l’environnement Supabase avant production.

## 7. Tâches ajoutées à la feuille de route

Les tâches 40 à 48 ajoutées à la feuille de route reprennent directement cet audit :

40. Formaliser la direction WOOD chic/premium/chill/graffiti avec validation visuelle de la propriétaire.
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

**Ce que WOOD reprend :** hiérarchie, densité contrôlée des cartes, bandeaux d’information, preuve de qualité et petites touches graffiti/chill.
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
- Le projet contient 13 produits, 65 paliers de prix et aucune commande actuellement enregistrée ; aucun stock réel n’a été modifié pendant cet audit.
- Deux comptes sont actuellement présents dans `owner_users` : le compte de la propriétaire et le compte de Florent pour la phase de construction. La suppression de l’accès de Florent reste volontairement conditionnée à la confirmation de la propriétaire, conformément à la tâche 35.
- `orders.fulfillment_mode` est limité à `delivery` ; `pickup_code` est conservé uniquement pour l’historique et ne doit pas être supprimé avant sauvegarde et revue des commandes existantes.
- Les migrations de disponibilité, de sécurisation des commandes et de garde tarifaire sont enregistrées côté Supabase ; les tarifs intermédiaires restent refusés par le serveur.
- La migration `order_status_history` est maintenant enregistrée côté Supabase ; la table est protégée par RLS, le trigger `orders_record_status_history` est présent et l’historique est vide car aucune commande n’existe actuellement.
- L’avis sécurité Supabase restant est `Leaked Password Protection Disabled`. Il doit être activé dans Auth avant l’ouverture commerciale. Les huit avis de performance concernent uniquement des index encore inutilisés sur une base sans trafic et ne justifient pas de suppression préventive.

## 13. Audit approfondi de l’architecture d’accueil — 5 novembre 2026

Une seconde passe a été réalisée sur les pages officielles [Accueil](https://tealerlab.com/), [Produits](https://tealerlab.com/collections/all), [Nos Fleurs](https://tealerlab.com/collections/nos-fleurs) et [Échantillons Résines](https://tealerlab.com/products/echantillons-resines), avec Exa, Parallel Search, l’arbre d’accessibilité du navigateur et un viewport mobile `390 × 844`. Cette section décrit les mécanismes observés et leur adaptation possible ; elle ne transforme pas TealerLab en spécification de WOOD.

### 13.1 Architecture de contenu observée

L’accueil TealerLab est construit comme une suite de modules éditoriaux indépendants, plutôt que comme une seule page hero suivie d’un catalogue :

1. annonce de service ;
2. en-tête global ;
3. hero de campagne ;
4. bandeau défilant ;
5. cartes de découverte ;
6. preuve média ;
7. rail de produits principal ;
8. guide ou quiz ;
9. second rail de produits ;
10. pack ou composition ;
11. fidélité/parrainage ;
12. autre rail de produits ;
13. contenu communautaire vidéo ;
14. jeu ou animation de marque ;
15. blog ;
16. FAQ filtrable ;
17. statistiques et manifeste de marque ;
18. newsletter ;
19. réseaux sociaux ;
20. footer accordéon.

La leçon utile n’est pas de copier ces vingt modules. C’est de comprendre que chaque module possède un rôle et un rythme : découverte, choix, preuve, transaction, relation. Pour WOOD, le même principe devient une version plus courte : `identité → livraison → univers → sélection → cloche → réassurance → FAQ → boutiques`.

### 13.2 Architecture d’interface observée

- **En-tête :** les actions sont séparées par rôle ; le panier reste une action de premier niveau, la recherche et le compte sont identifiables, et le menu ouvre un espace de navigation distinct.
- **Sections :** un kicker court précède un titre fort ; un lien `voir tout` reste près du titre ; le contenu vient ensuite. Cette répétition donne un rythme reconnaissable.
- **Rails :** les sections de découverte et de communauté utilisent des carrousels locaux avec contrôles et pagination ; elles ne devraient pas élargir la page entière.
- **Carte produit :** le média est la première zone, puis viennent les métadonnées, la variante, le prix et l’action. Les états épuisés désactivent explicitement l’achat.
- **Fiche produit :** la page commence par le produit et l’achat, puis ajoute les explications, recommandations et FAQ ; l’information commerciale n’est pas enfouie en bas.
- **FAQ/footer :** la densité est repoussée dans des accordéons, ce qui conserve une page riche sans afficher tout le détail en permanence.

### 13.3 Adaptation exacte à WOOD

| Élément observé | Adaptation WOOD | Garde-fou |
|---|---|---|
| Hero de campagne | Hero WOOD botanique/éditorial, future photo sous cloche, message court et deux CTA | Ne pas copier campagne, texte ou visuel TealerLab |
| Cartes de découverte | Quatre univers WOOD avec une promesse descriptive par carte | Pas de filtre, pas de recherche par nom |
| Rail produit | `Sélection WOOD` avec cartes riches et achat rapide | Prix, stock et photos doivent être réels |
| Badges et métadonnées | Univers + niveau `strong/medium/classique` | Aucun taux, avis ou label inventé |
| Formats | Contrôle `− / grammage / +` à partir de 1 g | Prix par variété issus de l’affiche |
| Prix | Total choisi + prix au gramme à côté de l’action | Pas de remise générique ni prix barré sans validation |
| Pack/composition | Hors périmètre pour l’instant | Pas de promotion actuellement |
| Vidéos/UGC | Emplacement futur pour contenus WOOD validés | Pas de contenu fabriqué ni de widget tiers bloquant |
| FAQ | Accordéon WOOD court et factuel | Livraison/frais/délais seulement après validation |
| Footer accordéon | Liens utiles, contacts des deux boutiques et carte actuelle | Noms `BARLA` et `BORRIGLIONE` sans point final |

### 13.4 Responsive : ce qui change réellement

Sur desktop, TealerLab privilégie la densité et la comparaison côte à côte. Sur mobile, il ne se contente pas de réduire les tailles : il recompose l’expérience avec un en-tête compact, des cartes en deux colonnes, des rails tactiles, des blocs pleine largeur et des accordéons. WOOD doit reprendre cette logique de recomposition, mais avec sa grille demandée (`3` cartes desktop, `2 × 2` mobile quand possible) et sa navigation basse app-like.

Les tests WOOD doivent donc vérifier non seulement le nombre de colonnes, mais aussi : largeur interne des carrousels, zone de clic, hauteur réservée, titres longs, prix, encoche, orientation, clavier virtuel, zoom 200 %, `prefers-reduced-motion` et absence de débordement horizontal.

### 13.5 Animations à retenir et animations à refuser

À retenir plus tard : apparition douce des sections, bandeau de marque non promotionnel, déplacement léger du média, transition de fiche, feedback d’ajout au panier et accordéons. À refuser : scroll-jacking, carrousels qui déplacent le document, pop-ups au premier écran, compteurs artificiels, rotations permanentes et animation qui masque un prix ou un bouton.

### 13.6 Décision d’architecture WOOD

La refonte doit créer quelques primitives visuelles partagées — `section-shell`, `product-card`, `product-rail`, `product-detail`, `mobile-nav`, `faq-accordion` — plutôt que des corrections page par page. Les données WOOD alimentent ces primitives : quatre univers, niveaux strong/medium/classique, paliers par fleur, disponibilité, livraison uniquement et compte client/admin séparé par rôle. Cette architecture rend possible une ressemblance forte dans la présentation tout en gardant WOOD propriétaire de ses couleurs, de ses contenus, de ses prix et de son identité.

### 13.7 Source de décision

TealerLab est traité comme **inspiration vérifiée** pour l’architecture de présentation et les interactions. Les messages de la propriétaire, les couleurs, le logo officiel, la carte, les prix de l’affiche, l’absence de promotion, l’absence de retrait et la simplicité pour tous les âges restent les **contraintes d’autorité**. En cas de conflit, WOOD gagne systématiquement.

## 14. Audit des angles morts opérationnels — 5 novembre 2026

La feuille de route couvrait correctement l’interface et le socle de commande, mais elle ne détaillait pas encore toute la chaîne nécessaire à une vente réelle fiable. Les manques identifiés sont maintenant suivis par les tags `A41–A80` de la roadmap :

- identité légale, âge/public autorisé, RGPD, conservation, cookies et droits du compte client ;
- règles de livraison finales, adresse robuste, préparation, expédition, suivi, annulation et remboursement ;
- réservation/libération atomique du stock et instantané immuable des informations facturées ;
- états Viva, webhook signé, réconciliation, doublons, paiements incomplets et remboursements ;
- modèles e-mail, PDF, SPF/DKIM/DMARC, rebonds, worker d’outbox, reprise et absence de SMS non configuré ;
- séparation des environnements, rotation des secrets, matrice RLS négative, anti-abus réel, CSP/CORS et dépendances ;
- surveillance, corrélation des journaux, procédure d’incident, sauvegarde/restauration et retrait des accès de construction ;
- passation propriétaire, guide simple, matrice navigateurs/appareils et transfert Hostinger reproductible.

Ces tags restent des exigences de préparation et ne signifient pas que ces éléments sont déjà activés. Aucune ouverture commerciale ne doit être déclarée tant que les preuves de validation correspondantes ne sont pas réunies.

## 15. Audit visuel et textuel des manques WOOD — 5 novembre 2026

Une comparaison supplémentaire a été faite entre l’accueil WOOD actuellement visible et les versions desktop/mobile de [TealerLab](https://tealerlab.com/), avec contrôle des pages [catalogue](https://tealerlab.com/collections/all), [fleurs](https://tealerlab.com/collections/nos-fleurs) et d’une [fiche produit](https://tealerlab.com/products/tangerine-dream). Le but est de récupérer les mécanismes de présentation que le conjoint de la propriétaire apprécie, pas leurs assets, leur texte, leur palette ou leur identité.

### 15.1 Diagnostic concret de WOOD actuel

La base WOOD est cohérente et reconnaissable : hero éditorial, univers, histoire, expérience, deux boutiques, FAQ et footer. Visuellement, elle reste toutefois plus proche d’une vitrine institutionnelle que d’une boutique éditoriale vivante. Les manques principaux sont :

- un premier écran moins scénarisé qu’une page de campagne : il manque un enchaînement clair `message → découverte → sélection` ;
- peu de modules intermédiaires qui donnent envie de continuer à parcourir la page ;
- une sélection de produits et des cartes riches absentes de l’accueil tant que les vrais produits/photos ne sont pas injectés ;
- une hiérarchie de carte à formaliser : média, niveau `strong/medium/classique`, nom, disponibilité, grammage, prix et action ;
- une mise en scène des fleurs et résines sous cloche à préparer lorsque les photos de la propriétaire seront disponibles ;
- des rails locaux, liens `Voir tout`, progressions et états vides à définir pour éviter une page trop statique ;
- un menu et un footer qui doivent reprendre une organisation plus éditoriale, avec des groupes simples et une version accordéon mobile ;
- des textes à harmoniser : kickers courts, titres forts, descriptions brèves, microcopies de boutons, états de stock et messages d’erreur ;
- des accents graffiti, stickers, emojis et humour à intégrer avec mesure, uniquement après réception des références de la propriétaire ;
- une chorégraphie d’animations à prévoir : révélation au scroll, bandeau de marque, feedback panier et zoom produit, avec version sans mouvement ;
- une validation visuelle systématique des cartes et sections sur les petits mobiles, tablettes, grands écrans et orientations paysage.

### 15.2 Ce qui est récupérable de TealerLab

| Mécanisme observé | Traduction WOOD | Ce qui reste interdit |
|---|---|---|
| Enchaînement de modules indépendants | `hero WOOD → livraison → univers → sélection → cloche → réassurance → FAQ → boutiques` | Copier leur ordre au pixel près ou importer leurs blocs promotionnels |
| Header d’e-commerce très lisible | Logo, menu, panier, compte et CTA WOOD avec hiérarchie équivalente | Copier leur wordmark, police, icônes ou palette |
| Cartes produits denses | Média, badges WOOD, nom, grammage, prix total, prix au gramme, stock et ajout | Faux avis, faux taux, prix barrés, promotions ou badges TealerLab |
| Choix de formats dans la carte | `− / g / +` à partir de 1 g, avec prix spécifique à chaque fleur | Appliquer la grille d’une variété à toutes les autres |
| Rails/carrousels locaux | Sélection WOOD et produits liés avec overflow limité | Carrousel qui élargit le document ou empêche le clic |
| Fiche produit approfondie | Photo sous cloche, identité, achat, livraison, qualité et FAQ | Copier leurs descriptions, claims ou visuels |
| Footer et FAQ repliables | Footer structuré, FAQ courte et accessible, boutiques bien identifiées | Cacher les informations essentielles ou ajouter un retrait non validé |
| Stickers, emojis, avis visuels et humour | Accents WOOD dosés dans les zones éditoriales après validation | Remplir chaque carte d’emojis ou dégrader la lisibilité premium |
| Animations de découverte | Révélations douces, zoom stable et feedback d’ajout | Scroll-jacking, popups recouvrants, mouvements permanents |

### 15.3 Règle éditoriale WOOD

Les textes doivent être visuellement plus directs et plus rythmés, sans devenir agressifs :

1. un kicker court (`01 / BOTANICAL`, `02 / TEXTURES`, etc.) ;
2. un titre WOOD fort et lisible ;
3. une phrase de contexte qui explique l’univers sans promesse médicale ;
4. une action claire (`Découvrir`, `Voir la sélection`, `Ajouter au panier`) ;
5. un état explicite si la photo, le stock, le prix ou la livraison ne sont pas encore confirmés.

Les emojis ne sont pas utilisés comme décoration automatique : ils sont réservés aux annotations, stickers ou repères validés par la propriétaire. Les mêmes règles s’appliquent aux mots humoristiques et aux références graffiti. Les prix, quantités, erreurs, paiements et informations légales restent sobres.

### 15.4 Règle responsive

La ressemblance recherchée doit venir de la recomposition, pas d’un simple zoom du desktop :

- **desktop :** hero en composition forte, navigation complète, trois produits par ligne et sections capables d’alterner pleine largeur, grille et rail ;
- **mobile :** header compact, navigation basse app-like, grille `2 × 2` lorsque possible, CTA accessibles au pouce, accordéons et rails tactiles locaux ;
- **tablette :** composition intermédiaire sans forcer trois colonnes si les titres ou contrôles deviennent trop serrés ;
- **tous supports :** aucun texte coupé, aucun prix déplacé, aucun bouton masqué, aucun défilement horizontal global et aucun saut au chargement.

Ces décisions sont maintenant détaillées dans les tags `A81–A140` de la feuille de route. Les tags ne valident pas encore une nouvelle direction graphique : la propriétaire doit d’abord confirmer que la proposition reste WOOD, puis son conjoint peut confirmer que la puissance de présentation lui rappelle bien TealerLab.

## 16. Seconde vérification de l’accueil TealerLab — 5 novembre 2026

Une nouvelle lecture de l’accueil, du catalogue et d’une fiche produit TealerLab confirme plusieurs mécanismes à récupérer pour WOOD : bandeau de service, navigation par intentions, hero immersif, ticker, blocs éditoriaux, rails de sélection, cartes avec variantes et prix au gramme, guide d’orientation, bloc livraison, garanties, produits liés et FAQ. TealerLab affiche aussi promotions, fidélité, parrainage, avis, compteurs et claims de laboratoire ; ces éléments ne sont pas copiés et restent hors WOOD tant qu’ils ne sont pas documentés et validés.

### 16.1 Ce que WOOD peut reprendre

- **Scénarisation de l’accueil :** faire vivre la page comme un parcours `message WOOD → découverte des quatre univers → sélection fleurs/résines → présentation sous cloche → informations pratiques → boutiques/FAQ`.
- **Densité contrôlée :** alterner un hero fort, une sélection courte, une section pleine largeur, une grille et un bloc d’aide afin que la page paraisse riche sans devenir confuse.
- **Cartes orientées achat :** maintenir l’ordre média, catégorie, nom exact, description, grammage, prix choisi, disponibilité et bouton ; le client ne doit pas chercher l’action.
- **Fiche détaillée :** afficher le visuel et l’achat tôt, puis descendre progressivement vers les informations de livraison et les détails validés.
- **Guidage sans filtre :** utiliser les quatre univers WOOD comme point de départ visuel ; ne pas ajouter de recherche par nom ni de filtre, conformément aux demandes de la propriétaire.
- **Micro-interactions :** prévoir ticker non promotionnel, apparition douce, hover desktop, feedback tactile, zoom de fiche et accordéons, avec réduction de mouvement.
- **Responsive recomposé :** ne pas réduire le desktop ; réordonner et densifier les zones pour une expérience mobile app-like, garder trois colonnes desktop et quatre cases `2 × 2` sur mobile quand la largeur l’autorise.

### 16.2 Ce que WOOD doit explicitement ne pas reprendre

- promotions, prix barrés, compteurs, cadeaux, fidélité, parrainage ou jeu ;
- faux avis, fausses notes, faux volumes de vente, faux labels ou données laboratoire ;
- promesses d’effets, de délai, de transporteur, de conformité ou de remboursement non validées ;
- logos, wordmark, textes, slogans, photographies, illustrations et assets de TealerLab ;
- pop-ups, widgets ou mouvements qui cachent un bouton, un prix ou l’accès au contenu.

### 16.3 Décision de feuille de route

Les observations de cette seconde passe sont enregistrées dans les tags `A161–A190` : elles enrichissent la composition, la fiche produit, les rails, le menu, le responsive, la motion, la performance et les validations propriétaire/conjoint. Elles ne changent pas la palette WOOD, le logo officiel, la carte tarifaire, les noms des variétés, la livraison seule, l’absence actuelle de promotion ni la carte des boutiques.

## 17. Direction artistique WOOD — premium, chill, graffiti, stickers et humour

La propriétaire ne demande pas un simple site sombre avec quelques décorations : elle veut une identité capable de tenir ensemble quatre qualités qui peuvent se contredire si elles sont mal dosées. La base doit rester premium et lisible ; l’énergie chill doit rendre la navigation accueillante ; le graffiti et les stickers doivent donner une signature vivante ; l’humour doit apporter de la proximité sans dégrader la confiance nécessaire à une commande.

### 17.1 Règle de dosage

La base visuelle reste majoritaire : espaces, alignements, photos propres, titres forts, prix lisibles et CTA évidents. Les accents graffiti/chill sont ponctuels : un sticker par zone forte, une annotation dans un hero ou une micro-formule dans une section éditoriale. Aucun sticker ne porte seul une information importante et aucun mouvement ne doit attirer l’œil au détriment du prix ou du panier.

### 17.2 Ce qui doit être créé, pas copié

- un vocabulaire de formes WOOD inspiré des références de la propriétaire ;
- des stickers originaux dans la palette actuelle ;
- des compositions de cloche, botanique, papier, matière et graffiti ;
- une voix courte, directe, chic et accessible ;
- des emojis décoratifs facultatifs ;
- des micro-interactions qui donnent de la vie sans scroll-jacking ;
- des variantes mobile et desktop réellement composées, pas simplement réduites.

Les assets générés peuvent servir de prototypes de direction artistique. Ils doivent être contrôlés pour les artefacts, ne pas contenir de texte ou logo parasite et rester identifiés comme maquettes tant que la propriétaire n’a pas fourni ou validé les photos et références finales.

### 17.3 Nouvelles tâches de la roadmap

Les points précédents sont désormais détaillés en `A191–A240` : art direction, grille, densité, graffiti, stickers, humour, emojis, briefs photo, génération d’images, registre d’assets, animations, mode mouvement réduit, performance basse, responsive et validation finale par la propriétaire et son conjoint.
