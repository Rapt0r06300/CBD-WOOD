# WOOD — Feuille de route complète inspirée de TealerLab

> **Pour l’exécution :** réaliser les tâches dans l’ordre, sur `main` comme demandé par Florent, avec un test de non-régression après chaque bloc. Ne jamais remplacer une version fonctionnelle sans conserver un point de retour.

**Objectif :** faire évoluer WOOD vers une expérience plus forte, premium et street, en reprenant les bonnes idées d’expérience de TealerLab sans copier son identité, tout en conservant les couleurs, le logo, la structure de marque et la simplicité voulue par la propriétaire.

**Architecture :** le site reste un site statique HTML/CSS/JavaScript hébergé séparément de Supabase. Supabase reste la source de vérité pour les comptes, rôles, produits, stocks, commandes et éventuels vouchers futurs, désactivés par défaut. Viva Wallet reste volontairement hors périmètre tant que les identifiants professionnels ne sont pas disponibles.

**Technologies :** HTML, CSS, JavaScript vanilla, Supabase Auth/Postgres/Edge Functions, génération locale du paquet Hostinger, tests Playwright et scripts de préproduction existants.

**Référence :** audit de [TealerLab](https://tealerlab.com/), site actuel WOOD, échanges avec la propriétaire et exigences de Florent.

**Contrôle de cohérence :** cette feuille contient 76 tâches uniques, numérotées de 1 à 76. Les tâches 75 et 76 ajoutent les deux garde-fous indispensables à une ouverture commerciale : conformité éditoriale/légale et continuité des données. Les décisions commerciales inconnues restent bloquées ; elles ne peuvent pas être déduites par le code.

**Architecture d’administration retenue :** après connexion, le compte dont le rôle propriétaire est confirmé affiche directement le tableau de bord dans `compte.html`. Les nouveaux comptes restent clients. Aucun fichier ou route `admin.*` n’est publié ; RLS et les fonctions serveur restent obligatoires.

**Spécification détaillée :** `docs/audits/2026-11-04-tealerlab-wood-compatibility-audit.md` et les contraintes validées ci-dessous.

## Contraintes globales non négociables

- Conserver l’univers WOOD, ses couleurs, sa typographie, son logo officiel et son ton général.
- Ne pas inventer ni retoucher le logo fourni ; intégrer uniquement le fichier validé par la propriétaire.
- Garder une base chic/premium, avec des touches graffiti, stickers et humour maîtrisées.
- Ne pas transformer WOOD en copie de TealerLab : on reprend des mécanismes utiles, pas ses textes, images, logo, slogans ou mise en page exacte.
- Garder une interface simple pour tous les âges, sans menu surchargé ni animation extravagante.
- Ne générer ni intégrer les graphismes graffiti/stickers finaux qu’après réception et validation des références de la propriétaire.
- Adapter réellement l’affichage au mobile, à la tablette et à l’ordinateur ; le mobile doit donner une sensation d’application sans application native.
- Boutique : 3 produits par ligne sur ordinateur ; 4 cases carrées bien alignées sur mobile lorsque la largeur le permet, sans débordement ni cartes coupées.
- Livraison uniquement pour le moment ; ne pas réintroduire le retrait Barla/Borriglione dans le parcours d’achat.
- Conserver la carte actuelle de WOOD dans `Nous trouver` ; ne pas la remplacer par une carte TealerLab ou une nouvelle carte graphique.
- Ne pas ajouter de QR code.
- Fleurs : départ à 1 g, boutons `−` et `+`, présélection possible sur la fiche, choix conservé dans le panier, prix exacts de l’affiche fournie.
- Les paliers et réductions doivent rester propres à chaque variété ; aucune grille de prix générique ne doit être appliquée à toutes les fleurs.
- La réduction ne doit pas dépasser le palier 25 g, sauf règle explicite validée pour deux lots de 25 g ; toute quantité supérieure doit être traitée par répétition contrôlée, jamais par une remise inventée.
- Les vouchers/coupons seront validés côté serveur, jamais seulement dans le JavaScript public.
- Les promotions et vouchers restent désactivés pour l’instant ; aucune offre, remise ou rubrique promotionnelle ne doit apparaître sans validation explicite.
- Le menu peut être riche et structuré, mais ne doit pas devenir un énorme mega-menu illisible.
- Les visiteurs et comptes clients ne doivent jamais voir le menu, les routes ou les données d’administration.
- La propriétaire doit accéder à la gestion dès la connexion si son compte possède le rôle admin ; les nouveaux comptes sont clients par défaut.
- Aucun secret Supabase, Viva Wallet ou clé privilégiée dans les fichiers publics.
- Ne pas toucher à Google, au référencement ou à la Search Console sans demande séparée.
- Ne pas connecter Viva Wallet avant d’avoir les identifiants officiels et les paramètres de production.
- Ne pas héberger ni déployer pendant cette feuille de route ; préparer seulement un paquet transférable et une procédure courte.
- Notifications de la première version : préparer l’e-mail transactionnel ; aucun SMS ni promesse de réception ne doit être activé sans fournisseur, configuration et test de délivrabilité validés.

## Review Focus

- **Prix hors paliers affichés :** 2 g, 4 g, 6–9 g et 11–24 g ne doivent jamais recevoir un prix inventé ; la règle approuvée doit être testée dans `flower-pricing.test.js` (tâche 12).
- **Accès direct à l’administration :** aucune route `admin.html` publique n’est conservée ; le tableau de bord est intégré à `compte.html`, reste masqué par défaut et ne se monte qu’après confirmation serveur de `owner_users` (tâches 21–22).
- **Commande interrompue :** double clic, rafraîchissement, panne réseau et stock concurrent ne doivent pas créer de doublon ni perdre le panier ; tests de commande idempotente (tâches 16 et 23).
- **Affichage extrême :** titres longs, mobile étroit, orientation, zoom 200 %, encoche et clavier virtuel ne doivent pas couper un prix, une action ou la carte WOOD ; tests responsive (tâches 10, 29–30 et 60).
- **Session propriétaire et e-mail :** une session active ne doit pas être déconnectée inutilement et un e-mail ne doit être annoncé qu’après persistance fiable et statut d’envoi traçable ; tests de session et documentation transactionnelle (tâches 19 et 24).

## Critères de revue permanents

1. Un double clic, un rafraîchissement ou une reconnexion ne doit jamais créer deux commandes.
2. Une session propriétaire longue ne doit pas la déconnecter pendant la gestion normale ; les erreurs de session doivent être explicites et récupérables.
3. Un mobile étroit, un écran avec encoche, un iPad en portrait/paysage et un ordinateur très large ne doivent provoquer ni débordement horizontal ni contenu masqué.
4. Un stock vide, une image absente, un prix incomplet ou un produit désactivé doivent produire un état propre, jamais une fiche cassée.
5. Une erreur Supabase ou réseau doit laisser le panier local intact et afficher une action claire pour réessayer.
6. Le menu et les fiches restent utilisables au clavier, au toucher et avec `prefers-reduced-motion` activé.
7. Une animation ne doit jamais modifier la géométrie d’une carte, déplacer le prix, cacher un bouton ou créer un débordement horizontal.
8. Un changement de rôle, une session expirée ou un token ancien doit refuser l’action sensible proprement et proposer une récupération claire.

## État de vérification locale — 4 novembre 2026

- `npm run check` passe avec **54 tests**, la syntaxe JavaScript contrôlée sur 24 fichiers et l’audit statique sans erreur.
- `npm run hostinger:preflight` reconstruit un paquet de **33 fichiers** depuis une sortie nettoyée ; aucun `admin.html`, `admin.js` ou `admin.css` n’est publié.
- Le contrôle responsive Playwright confirme l’absence de débordement horizontal sur les quatre catégories aux largeurs `320`, `390`, `430`, `768`, `1024` et `1440`, avec la navigation mobile chargée sur les vues étroites.
- La disponibilité est maintenant une donnée Supabase explicite (`available`, `soon`, `rupture`, `incomplete`) et le serveur refuse de traiter un produit qui n’est pas `available`.
- Le projet Supabase connecté possède maintenant la colonne `availability_state` ; la fonction de commande vérifie cet état et le calcul serveur refuse les grammages intermédiaires tout en facturant 50 g comme deux lots de 25 g.
- Ces preuves ne remplacent pas la recette finale sur 375 px, les orientations, le clavier virtuel, les navigateurs réels, les réglages Auth/Turnstile/e-mail et les sauvegardes Supabase : ces points restent volontairement ouverts dans les tâches concernées.

## Phase 0 — Sécuriser l’existant avant toute évolution

### Tâche 1 — Figer la base de référence

- [ ] Conserver l’état actuel de `main` comme point de comparaison.
- [ ] Générer une capture de référence des pages publiques, des pages boutique, du panier et du compte.
- [ ] Vérifier que `npm run hostinger:preflight` passe avant toute modification.
- [ ] Vérifier que le dépôt est propre après le point de sauvegarde.

**Validation :** les tests actuels passent et aucune régression n’est introduite avant le travail visuel.

### Tâche 2 — Écrire l’inventaire des routes et boutons

Référence d’exécution : `docs/ops/public-routes.md` et `test/links.test.mjs`.

- [x] Documenter les routes publiques : `index.html`, `wood-shop.html`, `fleurs.html`, `resines.html`, `bien-etre.html`, `compte.html`, `checkout.html` et `confirmation.html`.
- [x] Vérifier chaque bouton de navigation, chaque carte produit, le panier, le compte et le retour à la boutique.
- [x] Ajouter un test de liens qui détecte les liens morts et les mauvais `href`.

**Validation :** aucun bouton public ne mène à une page inexistante ou au mauvais univers.

### Tâche 3 — Définir la charte visuelle WOOD à ne pas dépasser

- [ ] Relever les couleurs, tailles, espacements, bordures, traitements d’images et niveaux de contraste actuels.
- [ ] Définir ce qui reste strictement identique et ce qui peut évoluer.
- [ ] Faire valider le principe : `premium calme` majoritaire, `street/graffiti` en accents contrôlés.

**Validation :** aucune nouvelle section ne pourra introduire une couleur, une police ou un effet hors charte sans validation.

## Phase 1 — Direction artistique WOOD × inspiration TealerLab

L’audit de TealerLab montre surtout une hiérarchie commerciale très lisible : offres visibles, catégories immédiatement compréhensibles, cartes produit informatives, preuves de confiance, FAQ et contenus de marque. Le site utilise aussi des programmes de fidélité, parrainage, quiz, jeu, newsletter et contenus éditoriaux ; ces éléments seront étudiés mais ne seront pas ajoutés en bloc à WOOD. [TealerLab](https://tealerlab.com/)

### Tâche 4 — Créer le système d’accents street

- [ ] Prévoir des badges type sticker, sous-titres manuscrits, petites annotations et micro-illustrations.
- [ ] Attendre les exemples graphiques de la propriétaire avant de définir les formes, textures, personnages ou motifs définitifs.
- [ ] Générer les futurs visuels à partir de ces références validées, sans remplacer le logo ni modifier les couleurs WOOD.
- [ ] Garder ces accents hors des zones critiques : prix, stock, boutons, paiement et formulaires.
- [ ] Éviter la répétition automatique d’un même sticker sur toutes les cartes.

**Validation :** l’interface paraît plus vivante sans perdre la lisibilité premium.

### Tâche 5 — Améliorer la hiérarchie de l’accueil sans changer son identité

- [ ] Conserver le hero WOOD, son message et ses couleurs.
- [ ] Ajouter seulement une accroche courte de marque, un CTA principal et un CTA secondaire clair.
- [ ] Faire remonter les quatre univers existants : fleurs, résines, cosmétiques/huiles et textile/goods.
- [ ] Ajouter plus tard une zone “sélection WOOD” uniquement lorsque les produits, stocks et photos sont réels.

**Validation :** en quelques secondes, un visiteur comprend ce que vend WOOD et où cliquer.

### Tâche 6 — Ajouter un bandeau d’information utile en haut des boutiques

- [x] Informer avant l’achat que la livraison est disponible.
- [x] Ne pas annoncer de délai, frais ou condition qui n’a pas été confirmé par la propriétaire.
- [x] Prévoir un texte modifiable dans un emplacement unique, pas dupliqué manuellement sur chaque page.

**Validation :** le message est visible avant les produits et reste lisible sur mobile.

### Tâche 7 — Structurer la preuve de confiance

- [ ] Mettre en avant uniquement les faits vérifiés : boutique ouverte depuis 2020, conseil en boutique, présence à Nice si confirmé.
- [ ] Préparer des emplacements pour avis, photos sous cloche et preuves de qualité lorsque la propriétaire les transmettra.
- [ ] Ne pas fabriquer de note, de nombre de clients ou de test de laboratoire.

**Validation :** aucune preuve commerciale non vérifiée n’est affichée.

### Tâche 8 — Décider ce qui reste hors périmètre visuel

- [x] Ne pas ajouter pour l’instant de compte à rebours, jeu, fidélité, parrainage, quiz, blog ou réseau social.
- [x] Prévoir un menu structuré et compact, mais ne pas créer un énorme mega-menu qui surcharge l’écran.
- [x] Les garder comme options de phase ultérieure, seulement si elles servent WOOD et si la propriétaire les demande.

**Validation :** la page reste forte, simple et rapide au lieu de devenir un catalogue surchargé.

## Phase 2 — Boutique et produits

### Tâche 9 — Normaliser les quatre univers

- [x] Conserver quatre entrées distinctes : fleurs, résines, bien-être/cosmétiques/huiles, textile/goods.
- [x] Utiliser la même structure de page pour les quatre catégories.
- [x] Corriger tous les boutons pour qu’ils ouvrent la bonne catégorie et le bon détail.

**Fichiers concernés :** `wood-shop.html`, `fleurs.html`, `resines.html`, `bien-etre.html`, future page textile/goods.

**Validation :** chaque carte mène à son univers réel ; aucune page ne mélange deux maquettes.

### Tâche 10 — Finaliser la grille responsive

- [x] Ordinateur : trois cartes par ligne avec largeur, hauteur, image et contrôles alignés.
- [x] Mobile : quatre cases carrées en grille deux par deux quand cela reste lisible ; basculer proprement à une colonne seulement sur les écrans vraiment trop étroits.
- [x] Interpréter « quatre cases en carré » comme une disposition `2 × 2` ; ne pas forcer une carte produit à être carrée au point de couper son titre, son prix ou son action.
- [x] Tablette : choisir automatiquement la grille la plus lisible selon la largeur disponible.
- [x] Réserver une hauteur stable aux images, titres, prix et actions pour supprimer le décalage observé.

**Fichiers concernés :** `boutique.css`, `responsive.css`, `mobile.css`.

**Validation :** les quatre catégories ont été contrôlées à `320`, `390`, `768` et `1440` px : aucune largeur ne déborde et les cartes de chaque ligne restent alignées. Les orientations, le clavier virtuel et les navigateurs réels restent à exécuter avant ouverture.

### Tâche 11 — Définir les données minimales d’une fiche fleur

- [ ] Nom de la variété.
- [ ] Niveau affiché : `CBD boosté (strong)`, `CBD soft (medium)` ou `CBD classique`.
- [ ] Image réelle ou état “photo à venir” propre.
- [ ] Description courte et description détaillée.
- [ ] Tableau de prix par gramme issu de l’affiche de la propriétaire.
- [ ] Stock et statut actif/inactif.

**Validation :** une fiche incomplète ne peut pas afficher un prix inventé ou un bouton d’achat incohérent.

### Tâche 12 — Implémenter le moteur de prix exact

- [x] Stocker les paliers séparément pour chaque variété ; ne jamais appliquer la grille de Nimbus à Ivory, Velvet Kush ou une autre fleur.
- [x] Calculer `1 g`, `3 g`, `5 g`, `10 g`, `25 g` selon l’affiche fournie.
- [x] Afficher clairement le grammage sélectionné, le prix total et le prix au gramme.
- [x] Partir de 1 g et augmenter ou réduire avec `+` et `−`.
- [ ] Faire valider et documenter la règle exacte pour les quantités entre les paliers affichés (`2 g`, `4 g`, `6–9 g`, `11–24 g`) avant d’autoriser leur achat ; ne jamais arrondir silencieusement ni inventer un tarif.
- [x] Tant que cette règle n’est pas validée, afficher `Tarif à confirmer` pour ces grammages et désactiver leur ajout à une commande réelle ; une proposition locale ne doit jamais devenir un prix facturé.
- [x] Pour deux lots de `25 g`, calculer exactement deux fois le prix validé de `25 g`, sauf règle commerciale écrite différente ; aucune nouvelle remise automatique.
- [x] Encadrer toute quantité supérieure à `25 g` par la règle validée de répétition des lots, sans remise inventée.

**Fichiers concernés :** `flower-pricing.js`, `boutique.js`, futur module de calcul partagé.

**Validation :** tests automatisés pour toutes les variétés et tous les paliers de la photo ; chaque résultat est vérifié manuellement avec la carte papier.

### Tâche 13 — Rendre l’ajout au panier explicite

- [x] Garder la présélection du grammage directement sur la carte.
- [x] Afficher le choix près de `Ajouter au panier`.
- [x] Conserver le grammage et la quantité dans l’article du panier.
- [x] Empêcher les doubles ajouts accidentels sur double clic.

**Validation :** le panier affiche exactement la variété, le grammage, le prix unitaire et le total.

### Tâche 14 — Concevoir le détail produit avec zoom fluide

- [x] Au clic sur une fleur, ouvrir une fiche dédiée ou un panneau propre avec animation courte.
- [x] Préférer une transition `transform/opacity` stable, sans recalcul de mise en page ni saut de scroll.
- [x] Garder le même bloc d’achat : `−`, grammage, `+`, prix, `Ajouter au panier`.
- [x] Prévoir un bouton retour et une fermeture accessible au clavier/tactile.

**Validation :** animation fluide sur mobile moyen, sans latence visible ni déplacement de la page.

### Tâche 15 — Répliquer la qualité sur résines, bien-être et goods

- [ ] Appliquer la même grille, la même fiche détaillée et les mêmes états de stock aux autres pages boutique.
- [ ] Adapter les options uniquement quand elles existent réellement ; ne pas afficher un choix de grammes sur un t-shirt.
- [ ] Garder les quatre univers distincts.

**Validation :** aucune page de boutique n’est laissée avec l’ancien défilement ou une carte d’un autre univers.

## Phase 3 — Panier, livraison et promotions futures

### Tâche 16 — Stabiliser le panier local et distant

- [ ] Conserver le panier lors d’un rafraîchissement, d’une navigation et d’une erreur réseau.
- [ ] Recalculer les totaux depuis des données fiables, jamais depuis un prix envoyé librement par le navigateur.
- [ ] Ajouter un état vide clair et un état de chargement court.

**Validation :** panier intact après rafraîchissement et après reconnexion.

### Tâche 17 — Remplacer le retrait par un parcours livraison uniquement

- [x] Supprimer toute option de retrait en magasin du panier, checkout, résumé et confirmation.
- [x] Afficher avant l’achat que la livraison est disponible.
- [x] Demander les informations nécessaires à la livraison uniquement lorsque le client avance dans le parcours.

**Validation :** aucun texte ou bouton ne propose Barla ou Borriglione comme mode de retrait.

### Tâche 18 — Préparer les vouchers sans les activer

- [ ] Garder toute l’interface promotionnelle masquée et toute règle de voucher désactivée tant que la propriétaire ne l’a pas validée.
- [ ] Définir côté propriétaire : code, période, type de réduction, montant, plafond, produits concernés et nombre d’utilisations.
- [ ] Valider le code côté serveur Supabase.
- [ ] Afficher un message précis si le code est invalide, expiré ou non applicable.
- [ ] Journaliser l’usage pour empêcher les abus.

**Validation :** un client ne peut pas modifier la réduction depuis la console du navigateur.

### Tâche 19 — Préparer les e-mails de commande

- [ ] Générer un récapitulatif de commande à partir des données serveur.
- [ ] Préparer un e-mail client et un e-mail propriétaire ; la première version utilise l’e-mail transactionnel, sans SMS.
- [ ] Ajouter la pièce jointe PDF uniquement après validation du format et après persistance réussie de la commande.
- [ ] Prévoir une file/outbox, des tentatives contrôlées et un statut `à envoyer / envoyé / échec` ; ne jamais prétendre qu’un e-mail a été reçu uniquement parce qu’il a été demandé au fournisseur.
- [ ] Utiliser un relais SMTP/API transactionnel configuré hors du dépôt ; garder les secrets dans Supabase et documenter SPF, DKIM, DMARC et les rebonds.
- [ ] N’envoyer la confirmation qu’après création fiable de la commande.
- [ ] Prévoir une trace d’envoi et un statut d’erreur visible côté propriétaire.

**Validation :** aucune commande confirmée sans identifiant permanent ni trace exploitable.

## Phase 4 — Supabase, comptes et espace propriétaire

### Tâche 20 — Auditer le schéma actuel avant modification

- [ ] Inventorier tables, colonnes, fonctions, Edge Functions, politiques RLS et migrations.
- [ ] Vérifier l’URL Supabase et les redirections de production/test.
- [ ] Ne modifier aucune table de production sans sauvegarde et plan de retour.

**Fichiers concernés :** `supabase/`, `supabase-config.js`, `order-api.js`, `account.js`, `owner-dashboard.js`.

**Validation :** l’état réel de Supabase est documenté avant toute migration.

### Tâche 21 — Séparer les rôles client et propriétaire

- [ ] Créer un rôle client par défaut pour chaque nouvelle inscription.
- [ ] Définir l’admin dans `app_metadata` ou une table de rôles protégée, jamais dans `user_metadata` modifiable par le client.
- [ ] Vérifier les autorisations côté serveur avec l’utilisateur réel et ne pas considérer un JWT ancien comme une preuve définitive après changement de rôle.
- [ ] Afficher le bouton de gestion dès la connexion uniquement si le rôle admin est confirmé.
- [ ] Ne jamais exposer les produits, stocks ou commandes d’administration aux comptes clients.
- [x] Ne pas conserver de route `admin.html` : un visiteur ou un client ne reçoit aucune interface administrative et aucune donnée admin.
- [x] Retenir une seule architecture : tableau de bord rendu dans `compte.html` après contrôle serveur du rôle propriétaire ; aucune route/admin publique alternative.

**Validation :** un nouveau compte ne voit aucun menu admin et ne peut pas appeler les routes admin même en tapant leur URL.

### Tâche 22 — Renforcer RLS et les autorisations

- [ ] Activer RLS sur chaque table exposée.
- [ ] Écrire des politiques explicites par opération et par rôle (`TO anon`, `TO authenticated`) avec `auth.uid()` non nul lorsque nécessaire.
- [ ] Ajouter les clauses `WITH CHECK` aux insertions/modifications et les index nécessaires sur les colonnes utilisées par les politiques.
- [ ] Autoriser un client à lire/modifier uniquement ses propres données.
- [ ] Réserver produits, stocks, commandes globales et coupons au rôle admin ou aux fonctions serveur prévues.
- [ ] Garder les clés privilégiées uniquement côté serveur.
- [ ] Ajouter des tests négatifs : client qui tente de lire une autre commande, modifier un stock ou s’attribuer admin.

**Validation :** les tests d’accès refusé passent aussi bien depuis l’interface que depuis des appels directs.

### Tâche 23 — Fiabiliser les commandes et le stock

- [ ] Ajouter une clé d’idempotence par tentative de commande.
- [ ] Créer la commande et réserver/décrémenter le stock dans une opération atomique.
- [ ] Dans chaque Edge Function sensible, transmettre le contexte d’autorisation de la requête et vérifier l’utilisateur côté serveur avant toute opération.
- [ ] Gérer explicitement le stock insuffisant.
- [ ] Ne jamais faire confiance au prix ou au stock transmis par le navigateur.
- [ ] Garder un journal de statut : créée, en attente de paiement, payée, annulée, erreur.

**Validation :** tests de double clic, deux clients simultanés, stock nul, rafraîchissement et panne réseau.

### Tâche 24 — Simplifier l’espace propriétaire

- [x] Première vue après connexion admin : commandes à traiter et alertes importantes.
- [ ] Sections simples : commandes, produits, stocks, paramètres ; afficher la rubrique promotions uniquement lorsqu’elle sera activée et validée.
- [ ] Actions limitées et explicites : ajouter, modifier, désactiver, marquer traité.
- [ ] Éviter toute déconnexion automatique pendant une session active raisonnable ; afficher une reconnexion claire si Supabase invalide réellement la session.
- [x] Rendre cette vue dans l’espace compte après vérification du rôle ; la propriétaire voit les commandes et alertes en premier, tandis qu’un client voit uniquement son compte.
- [x] Extraire la logique réutilisable vers un module de tableau de bord intégré au compte et retirer la dépendance à `admin.html`/`admin.js` avant le paquet final.

**Validation :** la propriétaire peut comprendre l’état de la boutique sans connaître Supabase ni SQL.

### Tâche 25 — Laisser Viva Wallet isolé mais prêt

- [ ] Garder le statut de paiement séparé du statut de commande.
- [ ] Préparer l’emplacement d’un futur webhook signé et idempotent.
- [ ] Ne stocker aucun identifiant Viva fictif dans le dépôt.

**Validation :** la boutique peut être testée sans appeler Viva Wallet et aucune fausse confirmation de paiement n’est possible.

## Phase 5 — Informations boutique et contenus transmis plus tard

### Tâche 26 — Nettoyer la page des boutiques

- [x] Afficher les numéros avec leur boutique : `Barla · 04 22 16 35 70` et `Borriglione · 04 23 13 03 05`, après confirmation finale.
- [x] Afficher les adresses sans point ajouté à `BARLA` ou `BORRIGLIONE`.
- [x] Garder les itinéraires et appels comme liens séparés.

**Validation :** le visiteur sait immédiatement quel numéro correspond à quel lieu.

### Tâche 27 — Préparer l’intégration des photos sous cloche

- [ ] Créer des emplacements image stables avec ratio défini.
- [ ] Prévoir `alt`, compression et version haute résolution.
- [ ] Remplacer les images temporaires uniquement après réception et validation des originaux.

**Validation :** aucun saut de mise en page lorsqu’une vraie photo est ajoutée.

### Tâche 28 — Préparer le ton et les contenus de la propriétaire

- [ ] Utiliser le chic/premium dans les titres et la clarté produit.
- [ ] Utiliser le graffiti, les stickers et l’humour dans les détails et messages secondaires.
- [ ] Ne pas inventer les promesses produits, effets, avis ou informations légales.

**Validation :** chaque texte est compréhensible seul et peut être validé par la propriétaire.

## Phase 6 — Responsive, accessibilité et robustesse

### Tâche 29 — Vérifier tous les formats d’écran

- [ ] Tester petits iPhone/Android, grands téléphones, iPad portrait/paysage, ordinateur Windows, macOS et Linux.
- [ ] Tester zoom navigateur à 100 %, 125 %, 200 % et taille de texte augmentée.
- [ ] Utiliser les media/container queries et la mise en page fluide pour choisir la composition ; ne pas dépendre d’un User-Agent fragile pour décider mobile, tablette ou ordinateur.
- [ ] Tester clavier, tactile, souris et absence de hover.
- [ ] Vérifier safe areas, barre du navigateur mobile, orientation et clavier virtuel.

**Validation :** aucune page ne déborde horizontalement, aucun bouton n’est inaccessible et aucun texte ne sort de son bloc.

### Tâche 30 — Ajouter les garde-fous d’affichage

- [ ] Prévoir des titres longs, noms en plusieurs mots et prix larges.
- [ ] Gérer l’image lente, l’image absente, le chargement lent et l’erreur Supabase.
- [ ] Désactiver les animations si `prefers-reduced-motion` est activé.
- [ ] Conserver une action fonctionnelle même si l’animation ne se lance pas.

**Validation :** les erreurs d’affichage se transforment en états propres et compréhensibles.

### Tâche 31 — Accessibilité et lisibilité

- [ ] Contrôler contraste, focus visible, labels, boutons et ordre de tabulation.
- [ ] Ne pas utiliser la couleur seule pour indiquer un stock, une erreur ou un niveau.
- [ ] Garder des zones tactiles confortables et des textes lisibles sans zoom manuel.

**Validation :** parcours boutique et compte utilisables au clavier et sur écran étroit.

### Tâche 32 — Performance sans perte visuelle

- [ ] Réserver les dimensions d’images pour éviter les sauts.
- [ ] Charger les images hors écran progressivement.
- [ ] Limiter les scripts et animations aux interactions utiles.
- [ ] Vérifier que la boutique reste utilisable sur réseau mobile lent.

**Validation :** aucun écran blanc prolongé, aucun clic bloqué et aucune animation ne retarde l’achat.

## Phase 7 — Préparation du transfert vers Hostinger, sans héberger maintenant

### Tâche 33 — Nettoyer le paquet transférable

- [x] Inclure uniquement les fichiers publics nécessaires dans le paquet final.
- [x] Exclure `.git`, tests internes, secrets, fichiers locaux, caches et données de développement.
- [x] Ne pas publier `admin.html`, `admin.js` ou une autre route admin directement accessible ; utiliser l’espace compte protégé.
- [x] Après intégration du tableau de bord dans `compte.html`, retirer les fichiers admin publics du dépôt et du paquet ; une requête directe sur `/admin.html` tombe sur le 404 de l’hébergeur sans données.
- [x] Mettre à jour l’allow-list de `scripts/prepare-hostinger.mjs` et le contrôle `hostinger-preflight.mjs` pour refuser toute route admin publique, puis tester le paquet depuis une copie vierge.
- [x] Conserver les fichiers `.htaccess`, `404.html` et la configuration de sécurité déjà préparée.

**Validation :** `npm run hostinger:preflight` passe et le paquet est lisible depuis une copie vierge.

### Tâche 34 — Vérifier les chemins d’hébergement

- [ ] Tester les chemins relatifs depuis la racine publique.
- [ ] Tester les URLs avec et sans slash final selon la configuration.
- [ ] Vérifier la casse des fichiers, les accents et les extensions.
- [ ] Vérifier HTTPS, 404, redirections et chargement des assets.

**Validation :** le paquet fonctionne depuis une racine web propre sans dépendre du chemin local GitHub.

### Tâche 35 — Préparer la passation à la propriétaire

- [ ] Rédiger une procédure courte : connexion propriétaire, gestion d’un produit, modification du stock, lecture d’une commande, désactivation d’un produit.
- [ ] Prévoir une liste séparée des comptes et accès à transférer : dépôt GitHub, Supabase, hébergeur, domaine, paiement et e-mail.
- [ ] Retirer l’accès de Florent uniquement lorsque la propriétaire confirme qu’elle est autonome.

**Validation :** la propriétaire peut reprendre le projet sans dépendre d’une adresse personnelle ou d’un mot de passe de test.

## Phase 8 — Recette finale avant de considérer le site terminé

### Tâche 36 — Tests fonctionnels complets

- [ ] Parcours visiteur : accueil → univers → catégorie → détail → panier.
- [ ] Parcours client : création de compte → connexion → commande test → historique.
- [ ] Parcours admin : connexion → commandes → produits → stocks ; vérifier que les promotions restent absentes et désactivées.
- [ ] Parcours négatifs : mauvais mot de passe, session expirée, stock nul, réseau coupé, rôle client sur route admin.

**Validation :** chaque parcours nominal et négatif produit le résultat attendu, sans doublon, fuite de données ou confirmation de paiement fictive.

### Tâche 37 — Tests visuels complets

- [ ] Comparer les pages avant/après pour vérifier que l’identité WOOD est conservée.
- [ ] Vérifier chaque page sur mobile, tablette et ordinateur.
- [ ] Vérifier les quatre catégories de boutique et toutes les cartes d’une ligne.
- [ ] Vérifier l’animation de détail produit sans saut.

**Validation :** les captures et contrôles de débordement confirment une présentation WOOD cohérente sur les trois familles d’appareils.

### Tâche 38 — Validation humaine avec la propriétaire

- [ ] Montrer d’abord l’accueil et les quatre univers.
- [ ] Montrer ensuite une fleur avec son prix réel et son sélecteur de grammes.
- [ ] Montrer le panier et le parcours livraison.
- [ ] Montrer enfin l’espace propriétaire séparé visuellement des comptes clients.
- [ ] Noter les retours sans modifier au hasard ; chaque changement doit être relié à une tâche et retesté.

**Validation :** la propriétaire valide explicitement l’identité WOOD, la simplicité, la livraison et l’espace de gestion, ou les retours sont transformés en tâches avant toute mise en ligne.

### Tâche 39 — Feu vert final

- [ ] Toutes les tâches bloquantes sont validées.
- [ ] Les stocks réels sont renseignés par la propriétaire.
- [ ] Les règles de livraison sont confirmées.
- [ ] Les identifiants Viva sont disponibles ou le paiement reste explicitement désactivé.
- [ ] Les tests et le paquet Hostinger sont verts.
- [ ] Aucun secret ou accès de test ne reste dans le dépôt public.

**Validation :** aucune ouverture commerciale n’est déclarée tant que toutes les portes de sortie externes et techniques ne sont pas vertes.

## Phase 9 — Mise à jour après l’audit TealerLab et WOOD

L’audit complet ordinateur/mobile est documenté dans `docs/audits/2026-11-04-tealerlab-wood-compatibility-audit.md`. Il confirme que le conjoint aime surtout la hiérarchie commerciale, l’énergie street et la richesse des cartes de TealerLab, tandis que la propriétaire veut garder WOOD, ses couleurs, son logo, son côté premium et ses présentations sous cloche.

### Tâche 40 — Valider la direction WOOD premium/street

- [ ] Garder WOOD comme fondation visuelle.
- [ ] Ajouter les accents graffiti, stickers et humour en touches contrôlées.
- [ ] Faire valider une première planche visuelle par la propriétaire avant de généraliser les accents.

**Validation :** le conjoint reconnaît l’énergie TealerLab et la propriétaire reconnaît immédiatement l’identité WOOD.

### Tâche 41 — Corriger les libellés de la navigation mobile

- [x] Rendre `Nous trouver` entièrement lisible à 320, 375 et 390 px.
- [x] Vérifier que les quatre labels de la barre basse ne se chevauchent pas.
- [x] Conserver les mêmes icônes, couleurs et destinations.

**Validation :** aucun libellé n’est tronqué dans les captures mobile. Vérifié à 390 × 844 avec cache CSS invalidé, puis `npm run check` : 29 tests passés, syntaxe JavaScript validée et audit statique OK.

### Tâche 42 — Étendre l’audit responsive à toutes les pages

- [x] Tester accueil, catégories, fiches produit, panier, checkout, confirmation et compte.
- [x] Tester 320, 375, 390, 430, 768, 1024 et 1440 px.
- [ ] Contrôler débordement, cartes, boutons, images, clavier virtuel, orientation et zones sûres.

**Validation :** chaque page garde une structure cohérente sur mobile, tablette et ordinateur.

### Tâche 43 — Ajouter seulement les mécanismes TealerLab compatibles

- [ ] Préparer une hiérarchie visuelle extensible, mais laisser toute promotion et tout voucher désactivé jusqu’à validation de la propriétaire.
- [ ] Renforcer les cartes produit avec niveau, grammage, prix total, prix au gramme et disponibilité.
- [ ] Ajouter une réassurance WOOD authentique, une FAQ lisible et la présentation sous cloche.
- [ ] Ne pas ajouter de contenus, avis, chiffres ou promesses non validés.

**Validation :** la boutique est plus vendeuse sans devenir un clone ni un catalogue surchargé.

### Tâche 44 — Refuser les pop-ups et animations bloquants

- [ ] Ne pas recouvrir le premier affichage avec une collecte d’e-mail ou une promotion.
- [ ] Ne jamais masquer le prix, le grammage, le stock ou le bouton d’achat.
- [ ] Respecter `prefers-reduced-motion` et garder une interaction fonctionnelle sans animation.
- [ ] Tester le focus, la fermeture par `Échap`, le retour du focus au bouton déclencheur et l’absence de piège clavier dans le menu et les panneaux.
- [ ] Réserver les animations aux propriétés composées (`transform`, `opacity`) et réserver les dimensions des médias avant chargement.

**Validation :** l’utilisateur peut comprendre et acheter sans fermer une fenêtre avant chaque action.

### Tâche 45 — Préparer les vraies photos sous cloche

- [ ] Prévoir un ratio d’image stable pour les fiches et les cartes.
- [ ] Ajouter un texte alternatif précis.
- [ ] Charger les grandes images progressivement sans provoquer de saut.
- [ ] Remplacer les illustrations temporaires uniquement après validation des originaux.

**Validation :** les photos de la propriétaire sont nettes, cadrées et cohérentes sur desktop et mobile.

### Tâche 46 — Activer la protection Supabase contre les mots de passe compromis

- [ ] Activer Leaked Password Protection dans Supabase Auth.
- [ ] Vérifier que la création de compte et la réinitialisation restent fonctionnelles.
- [ ] Retester l’espace propriétaire après le changement.

**Validation :** l’alerte sécurité Supabase est résolue avant toute ouverture commerciale.

### Tâche 47 — Vérifier la protection de la fonction de commande

- [ ] Confirmer l’activation effective de Turnstile dans les secrets Supabase.
- [ ] Ajouter ou vérifier la limitation de débit côté serveur.
- [ ] Vérifier le token utilisateur dans l’Edge Function avec le contexte d’autorisation de la requête ; aucune clé privilégiée ne doit être envoyée au navigateur.
- [ ] Tester les origines autorisées, une commande invitée légitime, un token invalide et deux soumissions simultanées.
- [ ] Conserver l’idempotence et le recalcul serveur des prix/stocks.

**Validation :** les commandes légitimes passent, les abus et doubles commandes sont refusés proprement.

### Tâche 48 — Nettoyer définitivement les traces du retrait

- [ ] Vérifier qu’aucune commande réelle ne dépend de `pickup_code` ou des anciens modes Barla/Borriglione.
- [ ] Préparer une migration de nettoyage après sauvegarde et revue.
- [ ] Conserver la livraison comme seul mode autorisé dans les tables, fonctions, tests et interfaces.

**Validation :** le retrait n’apparaît plus dans le produit final sans casser l’historique des commandes.

## Décision de méthode

On commence par les tâches 1 à 15, puis 40 à 45 et 49 à 62 : elles améliorent l’expérience et l’apparence sans dépendre de Viva Wallet ni des stocks définitifs. Ensuite viennent les tâches Supabase 20 à 25 et 46 à 48, puis les compléments commerciaux 63 à 74 et les tests finaux. Les tâches Hostinger restent une préparation locale ; aucun hébergement n’est lancé dans cette feuille de route.

La priorité est donc : **préserver WOOD → reprendre la hiérarchie utile de TealerLab → rendre la boutique claire sur PC et mobile → fiabiliser les commandes → sécuriser Supabase → préparer le transfert → valider avec la propriétaire**.

## Annexe d’exécution technique — ordre, fichiers et validations

Cette annexe transforme les 48 tâches de base et les compléments 49 à 74 en consignes directement exploitables. Elle intègre les demandes de la propriétaire : **contraste suffisant sans perdre les couleurs WOOD, univers chic/premium mais aussi chill/graffiti, stickers et humour dosés, présentation qualitative des fleurs et résines sous cloche, logo officiel inchangé, simplicité pour tous les âges et aucune copie de TealerLab**.

### Règles d’exécution obligatoires

- Exécuter les tâches dans l’ordre indiqué, sans modifier plusieurs blocs à la fois.
- Pour chaque comportement nouveau : écrire d’abord un test qui échoue, implémenter le minimum, puis vérifier qu’il passe.
- Après chaque tâche : lancer le test ciblé puis `npm run check` ; conserver un commit identifiable.
- Ne jamais remplacer le logo, les couleurs principales ou la typographie WOOD sans validation de la propriétaire.
- Ne jamais utiliser une photo, un avis, un prix, une promotion ou une promesse non fournie/validée par la propriétaire.
- Toute opération Supabase, domaine, hébergement, e-mail ou Viva hors dépôt est séparée de l’implémentation locale et doit être vérifiée avant mise en production.

### Matrice technique des tâches 1 à 48 — socle

| N° | Livrable et sous-tâche précise | Fichiers / systèmes concernés | Validation attendue |
|---:|---|---|---|
| 1 | Figer une référence de `main`, capturer les pages et vérifier le préflight avant changement. | `README.md`, `docs/audits/`, scripts existants | `npm run hostinger:preflight` vert et dépôt documenté. |
| 2 | Inventorier routes, boutons, cartes, panier, compte et retours ; ajouter le contrôle des liens. | Tous les `.html`, `test/` | Test de liens : aucune destination inexistante ou incorrecte. |
| 3 | Écrire la charte verrouillée : couleurs WOOD, logo officiel, police, contraste, premium/chill/graffiti. | `README.md`, `docs/` | Revue visuelle : aucune décision hors charte non validée. |
| 4 | Créer les accents stickers/graffiti/humour sans les placer sur prix, stock ou paiement. | `responsive.css`, `mobile.css`, CSS de composants | Test visuel : accents présents mais lisibilité intacte. |
| 5 | Renforcer l’accueil sans le refaire : hero WOOD, CTA clair et quatre univers. | `index.html`, `storefront.js`, CSS global | Test visuel mobile/desktop et vérification des quatre CTA. |
| 6 | Ajouter un message livraison unique, visible en haut de chaque boutique. | `fleurs.html`, `resines.html`, `bien-etre.html`, `wood-shop.html`, module partagé | Test DOM : message présent une fois, avant les produits, sans délai inventé. |
| 7 | Préparer les preuves réelles : boutique depuis 2020, conseil, Nice, photos sous cloche et avis futurs. | `index.html`, pages boutique, `docs/` | Aucun chiffre, avis ou test de laboratoire non validé. |
| 8 | Maintenir hors périmètre les jeux, quiz, fidélité, blog, compte à rebours et énorme mega-menu ; garder seulement un menu WOOD compact et structuré. | `README.md`, tests statiques | Audit statique : aucune fonction bloquante ajoutée. |
| 9 | Normaliser les quatre univers et corriger chaque bouton vers sa page dédiée. | `wood-shop.html`, `fleurs.html`, `resines.html`, `bien-etre.html`, future page goods | Test de navigation : chaque carte arrive dans le bon univers. |
| 10 | Stabiliser les grilles : 3 cartes desktop, 4 cases carrées mobiles quand possible, tablette adaptative. | `boutique.css`, `responsive.css`, `mobile.css`, `catalog-grid.test.mjs` | Tests aux largeurs 320/375/390/430/768/1024/1440, sans débordement. |
| 11 | Définir le modèle d’une fleur : nom, niveau, image, descriptions, prix, stock, statut. | `flower-pricing.js`, `boutique.js`, Supabase `products`/`product_prices` | Produit incomplet : état propre, aucun prix ni bouton incohérent. |
| 12 | Implémenter les prix propres à chaque variété, 1/3/5/10/25 g, répétition contrôlée au-delà. | `flower-pricing.js`, tests de prix, fonctions Supabase | Toutes les valeurs de l’affiche vérifiées variété par variété. |
| 13 | Afficher grammage/prix près de l’action, persister le choix et bloquer le double clic. | `boutique.js`, `storefront.js`, `test/` | Panier exact : variété, grammes, prix unitaire, quantité, total. |
| 14 | Ouvrir une fiche/panneau avec zoom `transform/opacity`, sans saut de scroll, clavier ou tactile. | `fleur.html`, `flower-detail.js`, CSS, tests | Animation fluide sur mobile moyen et action utilisable sans animation. |
| 15 | Appliquer la même qualité aux résines, bien-être et goods, sans sélecteur de grammes erroné. | Pages catégories, `boutique.js`, CSS | Parcours complet testé sur les quatre catégories. |
| 16 | Rendre le panier résistant au rafraîchissement, à la navigation et à l’erreur réseau. | `storefront.js`, `checkout.html`, tests panier | Panier local conservé et état de reprise compréhensible. |
| 17 | Supprimer le retrait partout et garder la livraison comme unique mode. | `order-options.js`, `checkout.html`, `confirmation.html`, Supabase | `rg pickup` limité à l’historique/migration prévue ; aucune option visible. |
| 18 | Préparer les vouchers côté serveur, mais laisser toute promotion désactivée : période, plafond, produits, usages et messages d’erreur. | `order-api.js`, Edge Function, migration dédiée, tests | Aucun code promo n’est actif sans validation ; un client ne peut pas fabriquer une réduction côté navigateur. |
| 19 | Préparer les e-mails client/propriétaire après création fiable, avec trace d’erreur. | Edge Function, documentation opérationnelle | Chaque envoi est lié à un identifiant de commande permanent. |
| 20 | Documenter tables, colonnes, fonctions, migrations, RLS, redirections et URL Supabase. | `supabase/`, `supabase-config.js`, `docs/ops/` | État réel comparé au dépôt avant nouvelle migration. |
| 21 | Maintenir les nouveaux comptes en client et réserver le rôle propriétaire à l’allow-list protégée. | `account.js`, `owner-dashboard.js`, migration rôles, tests | Client et propriétaire ont des interfaces et droits différents. |
| 22 | Renforcer RLS, secrets serveur et tests négatifs d’accès aux données. | Migrations Supabase, Edge Functions, `test/order-security.test.mjs` | Client incapable de lire/modifier les données d’un autre ou son rôle. |
| 23 | Rendre commande/stock atomiques et idempotents ; gérer stock nul, double clic et réseau coupé. | `order-api.js`, `create-pending-order/index.ts`, migrations | Deux soumissions identiques ne créent qu’une commande. |
| 24 | Organiser le tableau de bord dans l’espace compte : commandes prioritaires, produits, stocks, paramètres ; promotions masquées jusqu’à activation validée. | `compte.html`, `account.js`, `owner-dashboard.js`, `owner-dashboard.css` | Test structurel : la propriétaire voit les commandes avant le catalogue et aucun `admin.html` public n’est nécessaire. |
| 25 | Garder Viva isolé : statut paiement distinct, aucun identifiant fictif, futur webhook signé. | `order-api.js`, Edge Function, `docs/ops/` | Aucun paiement confirmé sans preuve Viva officielle. |
| 26 | Afficher les deux boutiques, numéros associés et adresses sans point final ajouté aux noms. | `index.html`, page/localisation, `location-contact.test.mjs` | `Barla · 04 22 16 35 70` et `Borriglione · 04 23 13 03 05` sont compréhensibles. |
| 27 | Préparer les emplacements photo sous cloche avec ratio fixe, alt et chargement sans saut. | Pages produits, CSS image, `flower-detail.js` | Une photo réelle remplace l’illustration sans décaler la fiche. |
| 28 | Rédiger le ton : titres premium, détails graffiti/humour, descriptions simples et vérifiées. | HTML contenu, `docs/content/` | Validation humaine de la propriétaire avant publication. |
| 29 | Tester petits/grands mobiles, iPad, desktop Windows/macOS/Linux, zoom, clavier et orientation. | Tests Playwright, `responsive.css`, `mobile.css` | Aucun débordement, bouton inaccessible ou texte coupé. |
| 30 | Ajouter états robustes : titre long, image lente/absente, prix incomplet, réseau en erreur, reduced motion. | CSS, `boutique.js`, `flower-detail.js`, `mobile-shell.js` | Chaque défaut affiche un état propre et une action claire. |
| 31 | Corriger contraste, focus, labels, ordre de tabulation et zones tactiles. | `accessibility.test.mjs`, HTML/CSS | Parcours compte/boutique utilisable clavier et tactile. |
| 32 | Optimiser images, dimensions réservées, chargement hors écran et scripts utiles seulement. | CSS, HTML, JS, `package.json` | Réseau mobile lent : pas d’écran blanc ni clic bloqué. |
| 33 | Générer le paquet transférable sans `.git`, secrets, caches ni données de développement. | `scripts/prepare-hostinger.mjs`, `.gitignore` | `npm run hostinger:preflight` passe depuis une copie propre. |
| 34 | Vérifier racine web, chemins relatifs, casse, HTTPS, 404, redirections et assets. | `.htaccess`, `404.html`, `_redirects`, `_headers` | Le paquet fonctionne depuis une racine web vierge. |
| 35 | Rédiger la passation : accès, gestion produits/stocks/commandes et transfert des comptes. | `README.md`, `docs/ops/production-checklist.md` | La propriétaire peut reprendre sans dépendre d’un accès personnel. |
| 36 | Exécuter les parcours visiteur, client, propriétaire et tous les parcours négatifs. | Tests Node/Playwright, `test/` | `npm run test` et les scénarios fonctionnels sont verts. |
| 37 | Comparer visuellement avant/après sur quatre boutiques, panier, compte, mobile/tablette/desktop. | `docs/audits/`, captures Playwright | Identité WOOD conservée et animation sans saut. |
| 38 | Faire valider avec la propriétaire : accueil, univers, fleur réelle, panier, livraison et admin. | `docs/validation/` | Retours consignés par tâche ; aucun changement improvisé. |
| 39 | Obtenir le feu vert final : stocks, livraison, Viva, tests, paquet et secrets vérifiés. | `docs/ops/production-checklist.md` | Toutes les cases bloquantes sont validées avant transfert. |
| 40 | Faire valider la direction premium/street : WOOD d’abord, TealerLab seulement comme inspiration. | `docs/audits/`, plan visuel | La propriétaire reconnaît WOOD ; le conjoint retrouve l’énergie street. |
| 41 | Corriger `Nous trouver` et les quatre labels de navigation mobile. | `mobile.css`, `mobile-shell.js`, tests responsive | Aucun libellé tronqué à 320/375/390 px. |
| 42 | Étendre l’audit responsive à toutes les pages et toutes les largeurs cibles. | Tests Playwright, `docs/audits/` | Rapport de largeur complet sans débordement. |
| 43 | Ajouter seulement les mécanismes compatibles : cartes riches, réassurance, FAQ, cloches ; préparer les promotions sans les activer. | HTML/CSS/JS concernés, contenu validé | Boutique plus claire sans copie ni surcharge TealerLab. |
| 44 | Interdire les popups couvrants, animations bloquantes et masquage des prix/stock/actions. | CSS/JS, tests accessibilité | Achat compréhensible sans fermer de fenêtre. |
| 45 | Intégrer les vraies photos sous cloche après réception et validation. | Assets, pages produits, CSS image | Photos nettes, cadrées et cohérentes sur tous supports. |
| 46 | Activer la protection Supabase contre les mots de passe compromis et retester Auth. | Supabase Auth, `account.js`, `owner-dashboard.js`, checklist | Alerte Supabase résolue ; connexion propriétaire fonctionnelle. |
| 47 | Vérifier Turnstile, débit, origines, token invalide, invité légitime et double soumission. | Edge Function, secrets Supabase, `order-security.test.mjs` | Commandes légitimes acceptées, abus refusés proprement. |
| 48 | Nettoyer les traces du retrait après sauvegarde, sans casser l’historique. | Nouvelle migration Supabase, `order-options.js`, checkout/tests | Livraison seule dans le produit final ; historique conservé. |

### Matrice technique des tâches 49 à 74 — complément TealerLab × WOOD

| N° | Livrable et sous-tâche précise | Fichiers / systèmes concernés | Validation attendue |
|---:|---|---|---|
| 49 | Figer les captures WOOD avant adaptation sur toutes les largeurs cibles. | `docs/audits/`, captures Playwright | Une référence avant/après est archivée. |
| 50 | Cartographier la composition TealerLab et traduire chaque bloc en équivalent WOOD ou hors périmètre. | `docs/audits/`, feuille de route | Chaque inspiration a un objectif et une décision. |
| 51 | Définir le rythme narratif accueil → livraison → univers → cloche → réassurance → FAQ → boutiques. | `index.html`, `storefront.js`, contenu validé | Le parcours est compréhensible sans page monotone. |
| 52 | Verrouiller couleurs, logo, typographie, bordures, espacements et contraste WOOD. | `README.md`, CSS global, `docs/audits/` | Aucun bloc n’introduit une identité parallèle. |
| 53 | Recomposer l’en-tête sans déplacer le logo officiel ni exposer l’administration. | Pages HTML, `mobile-shell.js`, CSS | Actions principales alignées sur desktop, tablette et mobile. |
| 54 | Construire un menu WOOD structuré par univers avec sous-menu et retour. | `mobile-shell.js`, pages HTML, tests accessibilité | Navigation clavier/tactile sans route admin publique. |
| 55 | Repenser les cartes : média stable, badges, niveau, nom, grammage, prix, stock et CTA. | `boutique.js`, `boutique.css`, `responsive.css` | Toutes les cartes d’une ligne restent alignées. |
| 56 | Appliquer les prix propres à chaque fleur, les paliers exacts et la répétition validée. | `flower-pricing.js`, `test/flower-pricing.test.js` | Aucun prix d’une variété n’est réutilisé par erreur. |
| 57 | Mettre en scène la fiche produit avec zoom fluide et bloc d’achat conservé. | `fleur.html`, `flower-detail.js`, tests | Aucun saut de scroll et achat possible sans animation. |
| 58 | Préparer les photos sous cloche et les futurs assets graffiti après validation. | `assets/`, pages produits, `docs/content/` | Dimensions, alt et poids sont maîtrisés. |
| 59 | Ajouter les animations courtes, interruptibles et compatibles reduced motion. | CSS/JS concernés, tests performance/accessibilité | Aucun mouvement ne masque ou ne déplace une action. |
| 60 | Stabiliser les grilles desktop 3, mobile 2×2 lorsque lisible, tablette adaptative. | `boutique.css`, `responsive.css`, `mobile.css`, tests responsive | Aucun débordement ou bouton coupé aux largeurs cibles. |
| 61 | Garantir la performance des médias et animations sur réseau mobile lent. | CSS, HTML, JS, scripts d’audit | Pas d’écran blanc prolongé ni de décalage mesurable. |
| 62 | Rendre menu, cartes et fiches accessibles au clavier, toucher et lecteur d’écran. | `test/accessibility.test.mjs`, HTML/CSS/JS | Focus, labels, Échap et reduced motion sont validés. |
| 63 | Verrouiller livraison seule, promotions désactivées, données vérifiées et Viva séparé. | Contenu HTML, checkout, `docs/ops/` | Aucun engagement commercial non validé n’apparaît. |
| 64 | Réaliser la recette WOOD × TealerLab et faire valider les deux critères humains. | `docs/validation/`, captures, tests | Identité WOOD et qualité de présentation sont validées séparément. |
| 65 | Ajouter un guide de catégorie sans recherche par nom ni filtre. | Pages catégories, `storefront.js`, contenu validé | Le client comprend l’univers sans parcours complexe. |
| 66 | Gérer disponible, bientôt disponible, rupture et information incomplète sans commande impossible. | `boutique.js`, `storefront.js`, Supabase produits/stocks, tests | Chaque état conserve une hauteur et une action cohérentes. |
| 67 | Préparer avis et preuves de qualité uniquement avec des données réelles et validées. | Pages produits, Supabase futur, `docs/content/` | Aucun avis, score ou test de laboratoire inventé. |
| 68 | Ajouter les produits liés sans promotion ni vente forcée. | `boutique.js`, cartes produit, tests navigation | Les produits liés ne masquent pas l’achat principal. |
| 69 | Clarifier l’aide et le contact par type de demande sans promettre de délai. | Page aide/FAQ, formulaire, `docs/content/` | Une demande produit ou commande est orientée clairement. |
| 70 | Ajouter une FAQ accordéon courte, accessible et limitée aux informations confirmées. | Page FAQ, CSS/JS, `test/accessibility.test.mjs` | Ouverture, fermeture et contenu sont utilisables partout. |
| 71 | Organiser le footer mobile et conserver la carte WOOD actuelle, seulement responsive. | `mobile-shell.js`, `index.html`, page `Nous trouver`, CSS | Carte, adresses et numéros restent lisibles sans point final ajouté. |
| 72 | Préparer une réassurance sobre sur la livraison sans widget promotionnel. | Pages catégories, module contenu partagé | Message visible avant achat, sans délai ou frais inventé. |
| 73 | Faire un contrôle red-team des pop-ups, widgets, liens, superpositions et débordements. | Tous les HTML/CSS/JS, tests Playwright | Aucun élément ne masque prix, stock, CTA ou navigation. |
| 74 | Vérifier les droits d’utilisation de chaque logo, texte, photo et illustration. | `assets/`, `docs/content/`, validation propriétaire | Aucun contenu TealerLab n’est copié ou publié sans autorisation. |

### Ordre de réalisation recommandé

1. **Référence et direction :** tâches 1 à 8, puis 49 à 52.
2. **Boutique et expérience produit :** tâches 9 à 15, 40 à 45, puis 53 à 59 et 65 à 68.
3. **Panier, livraison et notifications :** tâches 16 à 19, puis 63 et 72.
4. **Supabase et commandes :** tâches 20 à 25, puis 46 à 48 et 66.
5. **Contenus, aide et responsive :** tâches 26 à 32, 60 à 62 et 69 à 71.
6. **Transfert et passation :** tâches 33 à 35, après retrait/protection de toute route admin publique.
7. **Recette complète, red-team et validation propriétaire :** tâches 36 à 39, 64, 73 et 74.

### Format de travail pour chaque tâche

1. Lire la tâche et ses fichiers concernés.
2. Écrire le test ciblé qui doit échouer.
3. Vérifier l’échec attendu.
4. Implémenter la correction minimale, sans refonte inutile.
5. Relancer le test ciblé puis `npm run check`.
6. Faire une capture si la tâche est visuelle.
7. Commiter avec le numéro de tâche dans le message.
8. Passer à la tâche suivante uniquement si la validation est verte.

## Décisions visuelles issues de l’audit TealerLab approfondi

L’audit détaillé est conservé dans `docs/audits/2026-11-04-tealerlab-wood-compatibility-audit.md`. Il ajoute les décisions suivantes à toutes les tâches concernées :

- **WOOD reste la référence visuelle obligatoire :** couleurs, logo officiel, typographie, contraste et ambiance ne changent pas.
- **TealerLab apporte uniquement la structure :** hero fort, bandeaux d’information, blocs d’offres, cartes riches, réassurance, FAQ et rythme éditorial.
- **Accueil WOOD proposé :** hero actuel → livraison → quatre univers → sélection WOOD → présentation sous cloche → réassurance → FAQ → boutiques.
- **Catalogue WOOD :** trois cartes par ligne sur ordinateur ; deux colonnes carrées sur mobile, donc quatre cartes visibles dans une structure `2 × 2` ; une colonne de secours uniquement lorsque l’écran est trop étroit.
- **Carte produit :** image ou état « photo à venir », nom, niveau `strong/medium/classique`, stock, grammage si applicable, prix exact et ajout au panier.
- **Fiche fleur :** grande présentation sous cloche, description courte, `− / grammes / +`, prix total, prix au gramme, ajout au panier et livraison ; pas de copie de la fiche TealerLab.
- **Street/graffiti :** stickers, annotations et humour en petites touches, jamais sur le prix, le stock, le paiement ou les contrôles essentiels.
- **Animations :** seulement `transform/opacity`, courtes, interruptibles et désactivées avec `prefers-reduced-motion` ; aucun zoom qui déplace le scroll.
- **Popups :** interdits sur le premier écran et interdits s’ils masquent le prix, le stock ou l’ajout au panier.
- **Défilements :** uniquement à l’intérieur d’un composant contrôlé ; le document et les cartes ne doivent jamais dépasser la largeur de l’écran.
- **Contenus futurs :** photos sous cloche, promotions, avis et éventuelle fidélité sont ajoutés seulement après validation de la propriétaire.

Ces décisions précisent la manière de réaliser les tâches 4–15, 29–32 et 40–45 sans dénaturer WOOD. Les blocs 49–74 ajoutent ensuite les tâches explicites issues de l’audit approfondi ; les tâches 75–76 ferment la préparation commerciale par la conformité et la continuité. Tous les blocs doivent être suivis dans l’ordre indiqué si la direction TealerLab × WOOD est retenue.

## Complément — animations et mouvement inspirés de TealerLab

Le copain de la propriétaire aime particulièrement le site lorsqu’il est vivant, graphique et animé. Ces animations sont donc ajoutées à la feuille de route, mais toujours dans le thème WOOD et sans copier les visuels de TealerLab.

### Sous-tâches motion à intégrer aux tâches existantes

1. **Bandeau défilant WOOD** — ajouter un texte court sur la livraison, la sélection ou l’univers WOOD ; vitesse lente, contenu lisible et arrêt possible au focus.
2. **Apparition au scroll** — faire apparaître progressivement les sections, cartes et blocs sous cloche avec `opacity` et `transform` uniquement.
3. **Zoom produit fluide** — au clic sur une fleur, agrandir la fiche avec une transition courte, stable et réversible, sans saut de scroll.
4. **Mouvement léger des images** — appliquer un déplacement très discret aux visuels botaniques ou photos sous cloche ; aucun mouvement qui déforme le produit.
5. **Transitions entre pages** — prévoir une sortie/entrée douce entre boutique, fiche, panier et compte sans écran blanc ni retard de navigation.
6. **Interactions ordinateur** — ajouter des effets `hover` sobres sur les cartes, boutons et stickers ; l’information ne doit jamais dépendre du hover.
7. **Interactions tactiles mobile** — remplacer le hover par une réaction courte au toucher, sans double clic obligatoire ni latence.
8. **Carrousels maîtrisés** — utiliser un carrousel uniquement pour photos, sélections ou témoignages validés ; garder les contrôles visibles et le balayage naturel.
9. **Cartes animées** — animer très légèrement bordure, image ou sticker au survol/toucher, sans déplacer le prix, le stock ou le bouton.
10. **Mode animations réduites** — désactiver les mouvements non essentiels avec `prefers-reduced-motion` tout en conservant toutes les actions.
11. **Performance motion** — limiter les animations à `transform` et `opacity`, respecter le budget réseau mobile et éviter les bibliothèques lourdes inutiles.
12. **Tests motion** — vérifier chaque animation sur 320/375/390/430/768/1024/1440 px, au clavier, au toucher, avec réseau lent et avec animations réduites.

### Ordre d’intégration des animations

1. Zoom de fiche produit et apparition au scroll.
2. Interactions des cartes et boutons.
3. Bandeau défilant WOOD.
4. Transitions de pages.
5. Mouvement léger des images et carrousels.
6. Tests de performance, accessibilité et absence de régression.

### Règle de validation propriétaire

Une animation ne sera conservée que si elle respecte simultanément : **identité WOOD inchangée, contraste lisible, ambiance chic/premium, touches chill/graffiti, simplicité pour tous les âges, aucun décalage et aucune information commerciale masquée**.

## Complément — présentation et mise en scène du site

Le conjoint apprécie aussi la manière dont TealerLab présente ses contenus, pas uniquement ses animations. La feuille de route doit donc améliorer la **mise en scène** de WOOD sans copier TealerLab ni modifier les couleurs, le logo, la typographie ou l’identité validée par la propriétaire.

### Principes de présentation à intégrer

1. **Hiérarchie immédiate** — un hero WOOD clair, un message court, une action principale et une action secondaire ; aucune information importante noyée dans un long texte.
2. **Rythme éditorial** — alterner hero, bandeau, univers, sélection, présentation sous cloche, réassurance, FAQ et boutiques pour éviter une page plate ou répétitive.
3. **Cartes produits fortes** — image en premier, niveau CBD visible, nom lisible, prix exact, grammes choisis et bouton d’ajout toujours accessibles.
4. **Mise en scène qualitative** — conserver la présentation des fleurs et résines sous cloche comme élément premium central ; les futures vraies photos remplaceront les états provisoires sans changer la structure.
5. **Touches street maîtrisées** — stickers, annotations, humour et détails graffiti dans les espaces éditoriaux, jamais au détriment de la lisibilité ou du parcours d’achat.
6. **Blocs de réassurance** — livraison, compte, paiement et contact présentés avec des phrases courtes et des icônes simples, sans promesse non validée.
7. **Respiration et densité** — garder des marges régulières, des alignements nets et des sections suffisamment aérées ; éviter l’effet catalogue compressé comme l’effet page vide.
8. **Responsive réellement distinct** — desktop avec grilles plus larges et trois produits par ligne ; mobile avec navigation basse, cartes en `2 × 2`, actions tactiles et aucun texte tronqué ; tablette avec composition intermédiaire.
9. **Parcours cohérent** — chaque bloc doit conduire naturellement au suivant : découvrir → choisir un univers → ouvrir une fiche → choisir les grammes → ajouter au panier → commander.
10. **Présentation du panier et du compte** — reprendre le même système de titres, cartes, bordures et repères WOOD pour que les pages fonctionnelles restent aussi soignées que l’accueil.

### Contrôles avant validation

- Comparer accueil, boutique, fiche produit, panier, compte et boutiques sur ordinateur, tablette et mobile.
- Vérifier qu’aucun élément ne déborde, ne se superpose ou ne se décale après animation, rotation ou changement de taille.
- Vérifier que les prix, grammages, stocks, boutons et informations de livraison restent visibles sans interaction cachée.
- Faire valider deux critères séparément : « cela ressemble bien à WOOD » pour la propriétaire et « la présentation est vivante et travaillée » pour son conjoint.

Ces sous-tâches complètent les tâches 4–15, 26–32 et 40–45 ; elles ne déclenchent aucune modification de code tant que la validation visuelle n’est pas faite.

## Complément — menu et navigation inspirés de TealerLab

L’audit du menu officiel de [TealerLab](https://tealerlab.com/) montre que son effet professionnel vient aussi de la présentation de la navigation : le menu s’ouvre comme un espace éditorial à part entière, sépare les familles de produits, propose des sous-niveaux lisibles et garde les accès importants à portée de main. Cette logique sera adaptée à WOOD sans copier son graphisme ni son contenu.

### Ce qui est retenu pour WOOD

1. **Menu principal dédié** — ouverture dans un panneau propre depuis l’en-tête, avec une transition courte et stable ; le contenu de la page reste intact derrière.
2. **Familles WOOD clairement séparées** — `Fleurs`, `Résines`, `Cosmétiques & huiles`, `Textile & produits dérivés` ; aucun mélange avec l’espace propriétaire.
3. **Sous-menu au même endroit** — lorsqu’une famille est sélectionnée, afficher ses liens et un bouton `Retour au menu` ; éviter les changements de page inutiles pour explorer.
4. **Accès rapides** — `Boutique`, `Panier`, `Compte`, `Nous trouver` et `FAQ`, avec des libellés explicites et des zones tactiles larges.
5. **Panier toujours identifiable** — conserver le compteur d’articles et l’accès direct au panier dans l’en-tête ; ne pas cacher une action commerciale essentielle dans une animation.
6. **Compte client séparé de l’administration** — un client voit uniquement son compte ; le bouton de gestion n’apparaît que pour le grade administrateur après connexion reconnue.
7. **Mobile façon application** — panneau presque plein écran, en-tête fixe du panneau, retour évident, défilement interne maîtrisé et fermeture facile par bouton ou geste prévu.
8. **Ordinateur et tablette** — panneau proportionné à la largeur disponible, sans occuper inutilement tout l’écran ; les accès rapides restent visibles et alignés.
9. **Footer organisé** — reprendre une organisation simple en rubriques `Boutique`, `Aide`, `WOOD` et `Légal`, avec les deux boutiques et les numéros explicitement associés à `Barla` et `Borriglione`.
10. **Pas de promotions pour l’instant** — aucune rubrique promotionnelle ou code promo n’est ajouté au menu tant que la propriétaire ne l’a pas validé.

### Comportements obligatoires

- Le menu doit fonctionner au clavier, au toucher et avec un lecteur d’écran : focus visible, fermeture avec `Échap`, retour cohérent et ordre de tabulation logique.
- L’ouverture ne doit provoquer ni saut de page, ni décalage horizontal, ni latence perceptible.
- Chaque lien doit être testé depuis ordinateur, tablette et mobiles étroits ; aucun intitulé ne doit être tronqué.
- Les liens `Fleurs`, `Résines`, `Cosmétiques & huiles` et `Textile & produits dérivés` doivent arriver sur la bonne page et conserver le même système de cartes produits.
- L’accès administrateur ne doit jamais apparaître dans le menu public, le footer, le code d’interface visible ou les éléments destinés aux comptes clients.

### Validation visuelle du menu

Le menu ne sera validé que si la propriétaire retrouve immédiatement WOOD et si son conjoint retrouve une navigation riche, structurée et vivante. Les couleurs, le logo officiel, la typographie, la simplicité d’utilisation et le parcours d’achat restent prioritaires sur tout effet décoratif.

Ces sous-tâches complètent les tâches 4, 5, 9, 13, 26, 31, 41, 42 et 44 ; elles ne modifient pas encore le site.

## Annexe — verrou de qualité avant toute implémentation

La feuille de route est considérée comme correcte seulement si elle satisfait simultanément les préférences de la propriétaire et les exigences de fiabilité du commerce. « Parfait » signifie ici : aucune décision visuelle inventée, aucun parcours critique non testé et aucun changement livré sans comparaison avant/après.

### Ce qui doit rester reconnaissable pour la propriétaire

- WOOD reste immédiatement identifiable : couleurs, logo officiel, typographie, contraste et ambiance ne changent pas.
- Le contraste est renforcé sans perdre le côté chic/premium.
- Les touches chill/graffiti, stickers et humour restent dosées et attendent ses exemples graphiques avant génération.
- Les fleurs et résines gardent leur présentation qualitative sous cloche.
- Le site gagne en rythme, en animation et en richesse de présentation, avec TealerLab comme inspiration de structure uniquement.
- La navigation reste simple pour tous les âges ; aucun menu, effet ou texte ne doit compliquer un achat.
- Les promotions restent absentes jusqu’à validation explicite ; les règles de livraison restent à confirmer par la propriétaire.

### Garde-fous techniques ajoutés après vérification

- **Navigation :** menu avec nom accessible, `aria-expanded`, focus visible, fermeture clavier, retour du focus et aucun piège clavier.
- **Mobile :** structure adaptée à la largeur réelle, zones tactiles utilisables, aucun défilement horizontal imposé et aucun intitulé tronqué.
- **Animations :** `transform/opacity`, dimensions réservées, `prefers-reduced-motion`, aucun déplacement du prix, du stock ou du bouton.
- **Supabase :** RLS sur chaque table exposée, rôles protégés dans `app_metadata`/table sécurisée, politiques par opération avec `USING` et `WITH CHECK`, index des colonnes d’autorisation et tests d’accès refusé.
- **Commandes :** idempotence, transaction stock/commande, recalcul serveur, reprise après réseau coupé, journal de statut et absence de confirmation avant preuve de paiement.
- **Outils :** le changelog Supabase du 4 novembre 2026 signale le changement majeur du CLI v3 ; le dépôt devra donc conserver une version CLI explicitement validée avant toute mise à niveau.

### Sources de référence contrôlées

- [MDN — checklist d’accessibilité mobile](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Mobile_accessibility_checklist)
- [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [web.dev — Cumulative Layout Shift](https://web.dev/articles/cls)
- [Supabase — Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase — changelog](https://supabase.com/changelog.md)

### Porte de sortie obligatoire

Avant toute implémentation, produire une capture de référence, une liste des routes et boutons, une planche WOOD avec les références graffiti reçues, puis faire valider la direction. Après chaque bloc, relancer les tests fonctionnels, responsive, accessibilité, commandes, sessions et non-régression. Tant qu’un de ces contrôles est rouge, la modification ne doit pas être considérée comme terminée.

## Bloc de tâches 49 à 64 — audit approfondi et adaptation WOOD × TealerLab

Ce bloc ajoute les enseignements de l’audit visuel et fonctionnel de [TealerLab](https://tealerlab.com/) à la feuille de route. Il ne s’agit pas de copier leur site : on récupère la qualité de présentation, la hiérarchie et le rythme, puis on les reconstruit avec le système WOOD déjà validé.

### Conclusion de l’audit à respecter

- **Ce qui fonctionne chez TealerLab :** un en-tête immédiatement lisible, un menu qui devient une vraie interface, des cartes produits complètes, des badges bien séparés, une sélection du format visible, un prix hiérarchisé, un bouton d’action évident et une succession de sections qui raconte une histoire.
- **Ce qui doit être adapté à WOOD :** le fond sombre WOOD, les tons existants, le logo officiel, la typographie actuelle, la présentation sous cloche, les quatre univers et le parcours de grammage propre aux fleurs.
- **Ce qui ne doit pas être repris :** couleurs blanc/noir/lime de TealerLab, textes, slogans, photos, logos, promotions, pop-ups, fidélité, jeux, promesses, chiffres ou mise en page exacte.
- **Règle de priorité :** la propriétaire doit reconnaître WOOD immédiatement ; son conjoint doit retrouver une présentation riche, travaillée, street et vivante.

### Tâche 49 — Figer la référence WOOD avant comparaison

- [ ] Capturer l’accueil, le menu, les quatre pages boutique, une fiche fleur, le panier, le compte et `Nous trouver`.
- [ ] Capturer les mêmes parcours sur 320, 375, 390, 430, 768, 1024 et 1440 px.
- [ ] Archiver les captures et les dimensions avant toute adaptation.

**Validation :** chaque amélioration peut être comparée à une version WOOD intacte.

### Tâche 50 — Cartographier la composition TealerLab sans la copier

- [ ] Documenter séparément l’en-tête, le hero, les bandeaux, les blocs de sélection, les cartes produits, les preuves de confiance, la FAQ, le contenu éditorial et le footer.
- [ ] Relever pour chaque bloc son objectif, son ordre, sa densité, son action et son comportement responsive.
- [ ] Traduire chaque bloc en équivalent WOOD ou le classer hors périmètre.

**Validation :** chaque inspiration est justifiée par une amélioration concrète de compréhension ou de conversion.

### Tâche 51 — Définir le nouveau rythme narratif WOOD

- [ ] Organiser l’accueil autour de : identité WOOD → livraison disponible → quatre univers → sélection WOOD → présentation sous cloche → réassurance → FAQ → boutiques.
- [ ] Utiliser des intertitres courts et une alternance de densité pour éviter une page monotone.
- [ ] Ne pas ajouter de section promotionnelle, newsletter, jeu ou fidélité sans validation séparée.

**Validation :** un visiteur comprend l’univers, les produits et la prochaine action sans parcourir une page confuse.

### Tâche 52 — Protéger le système visuel WOOD

- [ ] Extraire les valeurs actuelles des couleurs, bordures, espacements, typographies et états interactifs.
- [ ] Réutiliser ces valeurs pour les nouveaux blocs ; ne créer aucune palette TealerLab parallèle.
- [ ] Vérifier le contraste des textes, prix, badges, boutons et états désactivés sur le fond WOOD.

**Validation :** une comparaison côte à côte montre une évolution de structure, jamais un changement d’identité.

### Tâche 53 — Recomposer l’en-tête WOOD

- [ ] Conserver le logo officiel WOOD exactement tel qu’il est fourni.
- [ ] Organiser autour de lui l’accès au menu, à la boutique, au panier, au compte et à `Nous trouver`.
- [ ] Prévoir une version desktop aérée et une version mobile compacte façon application.
- [ ] Afficher l’accès propriétaire uniquement après authentification et confirmation du rôle admin.

**Validation :** les actions principales sont comprises en moins de quelques secondes, sans bouton caché ni chevauchement.

### Tâche 54 — Construire le menu éditorial WOOD

- [ ] Créer un panneau compact structuré par `Fleurs`, `Résines`, `Cosmétiques & huiles` et `Textile & produits dérivés`.
- [ ] Ajouter `Panier`, `Compte`, `Nous trouver` et `FAQ` comme accès rapides.
- [ ] Ajouter des sous-menus avec `Retour au menu`, sans énorme mega-menu.
- [ ] Ne jamais afficher l’administration, les stocks ou les commandes dans le menu public.

**Validation :** le menu est lisible, accessible et cohérent sur PC, tablette et mobile.

### Tâche 55 — Repenser les cartes produits WOOD

- [ ] Utiliser une zone média stable en haut de chaque carte.
- [ ] Afficher les badges dans un ordre fixe : univers, niveau `strong/medium/classique`, éventuelle information vérifiée.
- [ ] Garder un nom de produit lisible, même sur deux lignes.
- [ ] Afficher l’état photo à venir ou la vraie photo sans espace vide imprévisible.
- [ ] Garder le choix de grammage, le prix correspondant, le prix au gramme si validé, le stock et `Ajouter au panier` au même endroit.

**Validation :** toutes les cartes d’une ligne ont une structure et une ligne d’action parfaitement alignées.

### Tâche 56 — Respecter les règles propres aux fleurs

- [ ] Partir de 1 g avec les boutons `−` et `+`.
- [ ] Conserver les paliers 1/3/5/10/25 g et les prix propres à chaque variété.
- [ ] Ne jamais appliquer la grille d’une fleur à une autre.
- [ ] Au-delà de 25 g, appliquer uniquement la répétition contrôlée validée, sans inventer de remise.
- [ ] Afficher le grammage choisi et le prix près du bouton d’ajout.

**Validation :** la carte inspirée de TealerLab reste entièrement conforme à l’affiche WOOD fournie par la propriétaire.

### Tâche 57 — Mettre en scène la fiche produit

- [ ] Ouvrir une fiche fleur avec une transition fluide, sans saut de scroll.
- [ ] Présenter la photo sous cloche, le nom, le niveau, la description, la sélection de grammes, le prix et l’ajout.
- [ ] Ajouter plus tard une zone de présentation détaillée, uniquement avec les informations réelles fournies par la propriétaire.
- [ ] Prévoir une sélection de produits liés sans détourner l’utilisateur de l’achat.

**Validation :** la fiche donne envie de découvrir le produit sans masquer une information commerciale.

### Tâche 58 — Préparer les visuels WOOD

- [ ] Attendre les photos réelles sous cloche et les références graffiti de la propriétaire.
- [ ] Générer ou préparer les images uniquement après validation de la direction graphique.
- [ ] Prévoir plusieurs formats : carré pour cartes, portrait pour mobile, grand format pour fiche.
- [ ] Réserver les dimensions, compresser proprement et prévoir un texte alternatif.

**Validation :** aucun visuel temporaire ou généré ne ressemble à une invention non validée de la marque.

### Tâche 59 — Orchestrer les animations avec mesure

- [ ] Ajouter les apparitions au scroll, le bandeau WOOD, le zoom de fiche, les effets de carte et les transitions de page dans cet ordre.
- [ ] Utiliser uniquement des effets courts, réversibles et utiles à la compréhension.
- [ ] Éviter le scroll-jacking, les rotations permanentes, les flashs et les mouvements qui attirent l’attention loin du produit.
- [ ] Désactiver les mouvements non essentiels avec `prefers-reduced-motion`.

**Validation :** les animations donnent une impression premium et vivante sans latence, nausée, saut ou confusion.

### Tâche 60 — Adapter la grille aux trois familles d’appareils

- [ ] Desktop : trois produits WOOD par ligne, alignés sur la hauteur utile.
- [ ] Mobile : quatre cases carrées en `2 × 2` lorsque l’espace le permet, sans bouton coupé.
- [ ] Tablette : choisir entre deux ou trois colonnes selon la largeur réelle, pas selon le modèle du téléphone.
- [ ] Tester portrait, paysage, zoom navigateur, encoche, barre d’outils mobile et clavier virtuel.

**Validation :** aucune largeur cible ne produit de décalage, débordement ou carte illisible.

### Tâche 61 — Garantir la performance de la mise en scène

- [ ] Réserver les dimensions des images et des blocs avant leur chargement.
- [ ] Charger les images hors écran progressivement et éviter les bibliothèques d’animation lourdes.
- [ ] Limiter les animations aux propriétés composées et mesurer les décalages de mise en page.
- [ ] Tester réseau lent, batterie faible, appareil moyen et navigateur sans accélération visible.

**Validation :** le site reste immédiatement utilisable, même quand les visuels ou Supabase répondent lentement.

### Tâche 62 — Rendre menu et cartes accessibles

- [ ] Utiliser de vrais boutons et liens avec des noms accessibles.
- [ ] Gérer `aria-expanded`, le focus à l’ouverture, le retour du focus à la fermeture et `Échap`.
- [ ] Garantir un ordre de tabulation logique et une zone tactile confortable.
- [ ] Vérifier que les animations ne sont jamais indispensables pour comprendre ou acheter.

**Validation :** parcours complet au clavier, au toucher et avec lecteur d’écran sans blocage.

### Tâche 63 — Verrouiller les contenus commerciaux

- [ ] Garder les promotions, vouchers, fidélité et parrainage désactivés pour l’instant.
- [ ] Afficher seulement la disponibilité de la livraison ; ne pas inventer les délais ou frais.
- [ ] Ne publier aucun prix, stock, avis, photo, chiffre ou promesse sans validation de la propriétaire.
- [ ] Conserver le parcours de paiement Viva séparé jusqu’à réception des identifiants officiels.

**Validation :** le site ne promet jamais plus que ce que la boutique peut réellement assurer.

### Tâche 64 — Recette visuelle WOOD × TealerLab

- [ ] Comparer les parcours WOOD avant/après sur toutes les largeurs cibles.
- [ ] Vérifier les liens, menu, fiches, grammages, panier, compte, livraison et administration.
- [ ] Relancer les tests JavaScript, l’audit statique, l’accessibilité et les scénarios réseau.
- [ ] Faire valider deux phrases séparément : « c’est toujours WOOD » pour la propriétaire et « la présentation est aussi travaillée que TealerLab » pour son conjoint.

**Validation :** aucune mise en ligne ou transfert tant qu’une régression, un décalage ou une décision graphique non validée subsiste.

### Ordre d’exécution de ce nouveau bloc

1. Tâches 49–52 : référence et verrouillage de l’identité WOOD.
2. Tâches 53–57 : en-tête, menu, cartes et fiches produits.
3. Tâches 58–59 : visuels et animations après validation des références.
4. Tâches 60–62 : responsive, performance et accessibilité.
5. Tâches 63–64 : contenu commercial, recette et validation propriétaire.

## Bloc de tâches 65 à 74 — éléments supplémentaires récupérés de l’audit TealerLab

Cette extension reprend des mécanismes utiles observés sur les pages produit, les collections et l’aide de [TealerLab](https://tealerlab.com/), sans reprendre leurs textes, leurs visuels, leur identité, leurs couleurs ou leurs opérations commerciales.

### Tâche 65 — Ajouter un guide de choix WOOD sans recherche ni filtre

- [ ] Ajouter en haut de chaque univers une courte introduction expliquant ce que l’on trouve dans la catégorie.
- [ ] Ajouter, si la propriétaire le valide, un mini-guide très simple : `CBD boosté (strong)`, `CBD soft (medium)` et `CBD classique`.
- [ ] Ne pas ajouter de recherche par nom ni de filtre, conformément à la demande de la propriétaire.
- [ ] Ne pas transformer le guide en promesse d’effet, conseil médical ou classement non vérifié.

**Validation :** le client comprend la catégorie en quelques secondes sans complexifier la boutique.

### Tâche 66 — Préparer les états de stock et de disponibilité

- [x] Définir une carte claire pour `disponible`, `bientôt disponible`, `rupture` et `information à compléter`.
- [x] Désactiver l’ajout au panier en rupture au lieu de laisser un bouton ambigu.
- [x] Désactiver aussi l’ajout au panier pour toute carte sans prix validé, sans stock exploitable ou marquée `bientôt disponible` ; ne jamais créer une commande « à confirmer » par un simple clic.
- [x] Éviter tout espace vide ou changement de hauteur quand l’état d’un produit arrive depuis Supabase.
- [x] Ne jamais afficher un stock inventé avant que la propriétaire ait renseigné les stocks réels.

**Validation :** le client sait immédiatement s’il peut commander et aucune commande impossible ne peut être créée.

### Tâche 67 — Prévoir les avis et preuves de qualité sans les fabriquer

- [ ] Préparer l’emplacement d’un avis, d’une note ou d’un témoignage uniquement lorsque de vraies données seront disponibles.
- [ ] Afficher la source et le statut vérifié si la propriétaire valide le principe.
- [ ] Prévoir un état vide discret plutôt qu’un faux avis ou une note artificielle.
- [ ] Réserver une zone de qualité/laboratoire uniquement aux documents et affirmations fournis par la boutique.

**Validation :** aucune preuve sociale, donnée de laboratoire ou allégation non vérifiée n’est publiée.

### Tâche 68 — Ajouter une zone “produits liés” maîtrisée

- [ ] Proposer quelques produits du même univers ou d’un univers proche après la fiche produit.
- [ ] Conserver la même carte WOOD, les mêmes contrôles de grammage et les mêmes règles de prix.
- [ ] Ne pas afficher de recommandations trompeuses, de remise automatique ou de vente forcée.
- [ ] Ne pas faire passer les produits liés avant la description et l’ajout au panier.

**Validation :** la découverte de produits est utile sans détourner le client de sa fiche actuelle.

### Tâche 69 — Clarifier l’aide et le contact

- [ ] Organiser l’aide autour de `Question produit`, `Suivi de commande`, `Paiement`, `Livraison` et `Autre demande`.
- [ ] Prévoir un numéro de commande facultatif pour les demandes liées à une commande.
- [ ] Garder les coordonnées et horaires uniquement s’ils sont confirmés par la propriétaire.
- [ ] Ajouter un lien vers la FAQ sans inventer de délai de réponse ou de politique de retour.

**Validation :** un client sait où poser sa question sans exposer d’informations administratives.

### Tâche 70 — Construire une FAQ courte et sûre

- [ ] Répondre seulement aux questions confirmées : produits, grammage, paiement, livraison, compte et données personnelles.
- [ ] Prévoir un format accordéon accessible, utilisable au clavier et au toucher.
- [ ] Ne pas copier les réponses de TealerLab et ne pas faire de promesse juridique ou médicale.
- [ ] Vérifier que les réponses restent cohérentes avec les règles de livraison que la propriétaire doit encore préciser.

**Validation :** la FAQ réduit les hésitations sans créer d’engagement commercial non validé.

### Tâche 71 — Repenser le footer et le menu mobile

- [ ] Organiser le footer mobile en sections repliables : `Explorer`, `Aide`, `WOOD`, `Légal`.
- [ ] Garder les deux boutiques et les numéros clairement associés à `Barla` et `Borriglione`.
- [ ] Conserver la carte actuelle de WOOD dans `Nous trouver` ; ne pas la remplacer par une carte ou une présentation TealerLab.
- [ ] Adapter uniquement sa taille, son cadrage et ses contrôles aux écrans mobile, tablette et ordinateur, sans changer son identité visuelle.
- [ ] Enlever les points finaux indésirables dans les noms `BARLA` et `BORRIGLIONE`.
- [ ] Ne jamais afficher l’administration, les stocks ou les commandes propriétaires dans le footer public.

**Validation :** le bas de page reste lisible sur petit écran, sans texte coupé ni colonne décalée.

### Tâche 72 — Ajouter une barre de réassurance non promotionnelle

- [ ] Prévoir une petite zone sobre indiquant uniquement que la livraison est disponible, comme demandé.
- [ ] Ajouter plus tard les informations de paiement, de confidentialité et de service seulement après validation.
- [ ] Ne pas ajouter de compte à rebours, cadeau, pop-up, WhatsApp flottant, fidélité ou réduction sans décision explicite.
- [ ] Répéter l’information de livraison au bon endroit sans la dupliquer à chaque écran.

**Validation :** le client connaît le mode de réception avant son achat, sans que le site ressemble à une page promotionnelle.

### Tâche 73 — Auditer les risques d’ergonomie observés chez TealerLab

- [ ] Vérifier que le menu, les bannières et les widgets ne masquent jamais un bouton ou un prix.
- [ ] Éviter les pop-ups intrusifs, les superpositions multiples et les éléments flottants non essentiels.
- [ ] Tester les liens de toutes les cartes, les boutons d’achat et les retours arrière sur mobile et ordinateur.
- [ ] Tester l’absence de débordement horizontal, de texte tronqué et de saut lors du chargement des images.

**Validation :** WOOD récupère la richesse visuelle utile, pas les sources potentielles de confusion.

### Tâche 74 — Vérifier les contenus et la propriété intellectuelle

- [ ] Utiliser uniquement les photos, logos, textes, illustrations et références fournis ou validés par WOOD.
- [ ] Ne pas reprendre les images, le logo, les slogans, les noms de produits ou les textes de TealerLab.
- [ ] Conserver une trace de la source et de l’autorisation de chaque visuel ajouté.
- [ ] Faire valider les futures créations graffiti avant intégration définitive.

**Validation :** le résultat est inspiré par des mécanismes d’interface, mais reste une création WOOD identifiable et exploitable.

### Ordre d’exécution du bloc complémentaire

1. Tâches 65–67 : compréhension, disponibilité et contenus vérifiés.
2. Tâches 68–70 : découverte, aide et FAQ.
3. Tâches 71–73 : footer, réassurance et contrôle des risques d’ergonomie.
4. Tâche 74 : validation des assets et de la propriété intellectuelle avant toute intégration.
5. Tâches 75–76 : conformité éditoriale, sauvegarde et continuité avant ouverture.

### Références officielles utilisées pour ce complément

- [TealerLab — accueil](https://tealerlab.com/)
- [TealerLab — exemple de fiche produit](https://tealerlab.com/products/martian-kush-cbd)
- [TealerLab — catalogue](https://tealerlab.com/collections/all)
- [TealerLab — contact et aide](https://tealerlab.com/pages/contactez-nous)

## Phase 10 — Conformité éditoriale et continuité avant ouverture

### Tâche 75 — Préparer les pages légales sans inventer de contenu

- [ ] Recueillir auprès de la propriétaire les informations exactes de l’entreprise et les textes validés pour les mentions légales, CGV, confidentialité, cookies éventuels, livraison, retours et contact.
- [ ] Ajouter les liens légaux depuis le footer, le compte et le parcours de commande lorsque les textes sont validés.
- [ ] Ne publier aucun texte juridique, délai, frais, droit de retour ou engagement réglementaire supposé par le code.
- [ ] Vérifier que seules les données nécessaires à une commande sont demandées et que leur conservation/suppression est documentée côté Supabase.

**Validation :** les pages légales sont complètes, cohérentes avec le fonctionnement réel et validées par la propriétaire avant toute vente.

### Tâche 76 — Garantir la continuité des commandes et des notifications

- [ ] Documenter les sauvegardes Supabase, la conservation des commandes et une procédure de restauration testée avant l’ouverture.
- [ ] Conserver un journal exploitable des commandes, erreurs de stock, paiements et e-mails ; une panne d’e-mail ne doit jamais supprimer une commande.
- [ ] Prévoir une vue propriétaire des commandes en échec ou nécessitant une action, sans déconnexion automatique inutile.
- [ ] Tester la reprise après rafraîchissement, panne réseau, erreur fournisseur et restauration, avec preuve de non-duplication.

**Validation :** une commande persistée reste retrouvable et traitable même si le réseau, l’e-mail ou le paiement échoue.

## Décisions qui restent volontairement bloquées

Ces points ne doivent pas être devinés par l’implémentation : ils doivent être confirmés avant d’activer le parcours correspondant.

1. **Prix intermédiaires des fleurs :** règle pour `2 g`, `4 g`, `6–9 g` et `11–24 g` ; les tarifs visibles de l’affiche restent la référence absolue pour `1/3/5/10/25 g`.
2. **Quantités supérieures à 25 g :** deux lots de `25 g` et comportement exact pour les autres quantités ; aucune remise automatique.
3. **Livraison :** zones desservies, frais, délais, minimum éventuel et formulation publique.
4. **Stocks et photos :** valeurs réelles, visuels sous cloche et références graffiti de la propriétaire.
5. **E-mails :** fournisseur SMTP/API, expéditeur vérifié, contenu de l’e-mail et validation de la pièce jointe PDF ; aucun SMS en première version.
6. **Paiement Viva :** identifiants professionnels, webhook signé, états de succès/échec/remboursement et tests de production.
7. **Hébergement :** validation finale Hostinger, domaine, DNS, SSL et réglages Supabase ; ces étapes restent externes et ne sont pas simulées localement.

Tant qu’un de ces points est bloquant, le site peut être préparé et testé localement, mais il ne doit pas être présenté comme prêt pour une ouverture commerciale réelle.
