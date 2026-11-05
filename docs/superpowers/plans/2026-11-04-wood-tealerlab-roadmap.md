# WOOD — Feuille de route complète inspirée de TealerLab

> **Pour l’exécution :** réaliser les tâches dans l’ordre, sur `main` comme demandé par Florent, avec un test de non-régression après chaque bloc. Ne jamais remplacer une version fonctionnelle sans conserver un point de retour.

**Objectif :** faire évoluer WOOD vers une expérience plus forte, chic, premium, chill et graffiti, en reprenant les bonnes idées d’expérience de TealerLab sans copier son identité, tout en conservant les couleurs, le logo, la structure de marque et la simplicité voulue par la propriétaire.

**Architecture :** le site reste un site statique HTML/CSS/JavaScript hébergé séparément de Supabase. Supabase reste la source de vérité pour les comptes, rôles, produits, stocks, commandes et éventuels vouchers futurs, désactivés par défaut. Viva Wallet reste volontairement hors périmètre tant que les identifiants professionnels ne sont pas disponibles.

**Technologies :** HTML, CSS, JavaScript vanilla, Supabase Auth/Postgres/Edge Functions, génération locale du paquet Hostinger, tests Playwright et scripts de préproduction existants.

**Référence :** audit de [TealerLab](https://tealerlab.com/), site actuel WOOD, échanges avec la propriétaire et exigences de Florent.

**Contrôle de cohérence :** cette feuille contient 76 tâches principales uniques, numérotées de 1 à 76. Elle contient aussi 280 tags d’exécution `A01–A280` : chaque tag possède un périmètre et un contrôle de validation, sans modifier le contrat de numérotation testé par le dépôt. Les tâches 75 et 76 ajoutent les deux garde-fous indispensables à une ouverture commerciale : conformité éditoriale/légale et continuité des données. Les décisions commerciales inconnues restent bloquées ; elles ne peuvent pas être déduites par le code.

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

## État de vérification locale — 5 novembre 2026

- `npm run check` passe avec **71 tests**, la syntaxe JavaScript contrôlée sur 26 fichiers et l’audit statique sans erreur.
- `npm run hostinger:preflight` reconstruit un paquet de **47 fichiers** depuis une sortie nettoyée ; aucun `admin.html`, `admin.js` ou `admin.css` n’est publié.
- Le contrôle responsive Playwright confirme l’absence de débordement horizontal sur les **70 combinaisons** (10 routes publiques × `320`, `375`, `390`, `430`, `768`, `1024`, `1440`), avec des titres non vides et la navigation mobile chargée sur les vues étroites.
- La disponibilité est maintenant une donnée Supabase explicite (`available`, `soon`, `rupture`, `incomplete`) et le serveur refuse de traiter un produit qui n’est pas `available`.
- Le projet Supabase connecté possède maintenant la colonne `availability_state` ; la fonction de commande vérifie cet état et le calcul serveur refuse les grammages intermédiaires tout en facturant 50 g comme deux lots de 25 g.
- Le contrôle navigateur confirme que l’ouverture du panier donne le focus à son dialogue (`role="dialog"`, `aria-modal="true"`) et que `Échap` le ferme en rendant le focus au bouton déclencheur ; le menu applique le même retour de focus dans le code testé.
- Le dernier contrôle distant Supabase signale une seule alerte sécurité active : la protection contre les mots de passe compromis est désactivée ; la tâche 46 reste donc ouverte et doit être activée dans Auth avant production. Les huit avis de performance sont informatifs (index encore inutilisés sur une base sans trafic, dont les index d’historique et d’outbox) et ne justifient pas une suppression prématurée.
- Ces preuves ne remplacent pas la recette finale des orientations, du clavier virtuel, des navigateurs réels, des réglages Auth/Turnstile/e-mail et des sauvegardes Supabase : ces points restent volontairement ouverts dans les tâches concernées.
- Une copie `dist-hostinger` servie depuis sa racine a également été parcourue : les 10 routes principales répondent, `/admin.html` répond 404 et la largeur reste contenue à 390 px.
- Le panier nettoie les données locales avant réutilisation, échappe les valeurs affichées, plafonne une quantité locale à 99, se resynchronise entre onglets et garde le focus dans son dialogue au clavier ; ces garde-fous sont couverts par `test/cart-resilience.test.mjs`.
- La tentative d’enregistrement de commande possède aussi un délai maximum, annule une requête bloquée et laisse le panier intact avec un message de reprise ; `test/order-client-resilience.test.mjs` le vérifie.
- Le menu public mobile regroupe maintenant les quatre univers WOOD et les accès rapides `Nous trouver`, `FAQ`, `Compte` et `Panier`, sans exposer l’administration ; `test/navigation-accessibility.test.mjs` le vérifie.
- La FAQ d’accueil couvre maintenant la livraison disponible, le compte invité et l’état séparé de Viva sans inventer de frais, délais ou promotions ; `test/location-contact.test.mjs` le vérifie.
- Le tableau de bord propriétaire affiche maintenant l’état de la file `order_notification_outbox` (`à envoyer`, `en cours`, `envoyé`, `échec`) sans présenter l’envoi comme actif ; `test/order-notification-outbox.test.mjs` le vérifie.
- La migration locale `20261104150000_order_status_history.sql` a été appliquée au projet Supabase sous `20261104215031_order_status_history` ; la table est protégée par RLS, le trigger est présent et aucune commande n’existait au moment du contrôle.
- La migration locale `20261104160000_order_notification_outbox.sql` a été appliquée au projet Supabase sous `20261104220305_order_notification_outbox` ; la file est idempotente, protégée par RLS, vide au contrôle et ne lance aucun e-mail tant qu’aucun fournisseur n’est configuré.
- Le 5 novembre 2026, l’accueil officiel [TealerLab](https://tealerlab.com/) a été revu avec Exa, Parallel Search et un navigateur réel en desktop et en viewport mobile `390 × 844`. L’audit confirme une architecture de sections réutilisables, des rails de cartes produits, une hiérarchie de fiche dense et une version mobile réellement recomposée ; ces constats sont traduits dans les tags d’exécution `A01–A40` et `A81–A240` ci-dessous.
- Cette observation ne valide aucun changement graphique WOOD : elle sert uniquement de référence d’inspiration. Les couleurs, le logo, la typographie, la carte, les prix et les contraintes de la propriétaire restent prioritaires.
- L’audit de cohérence du 5 novembre 2026 a identifié 40 angles morts opérationnels supplémentaires, ajoutés comme tags `A41–A80` : conformité et données personnelles, parcours d’expédition, états de paiement, e-mails/PDF, sécurité, observabilité, transfert propriétaire et recette de mise en service.
- La passe visuelle et éditoriale du 5 novembre 2026 a identifié 60 manques supplémentaires, ajoutés comme tags `A81–A140` : composition de l’accueil, menu, cartes, textes, emojis, stickers, photos sous cloche, animations, responsive et contrôles visuels.
- La passe de production de maquette du 5 novembre 2026 ajoute `A141–A160` : registre exact des variétés, visuels de démonstration distincts, descriptions éditoriales, pipeline de remplacement par les photos réelles, performance des images et validation de cohérence entre accueil, boutique, fiche et Supabase.
- La seconde relecture officielle du 5 novembre 2026 ajoute `A161–A190` : le site TealerLab confirme une page d’accueil scénarisée par rails, blocs éditoriaux, sélections produits, guide, réassurance, livraison, contenus de fiche et produits liés ; WOOD récupère cette architecture d’expérience uniquement, en retirant promotions, fidélité, avis, promesses et claims non validés.
- La passe direction artistique du 5 novembre 2026 ajoute `A191–A240` : elle détaille le dosage premium/chill/graffiti/stickers/humour, la création d’assets WOOD originaux, les règles de composition, les microcopies, les animations responsables et les contrôles finaux sur tous les supports.
- La carte imprimée des fleurs et résines fournie le 5 novembre 2026 ajoute `A241–A280` : elle révèle le langage graphique propriétaire de WOOD — poster illustré, papier texturé, cadres irréguliers, coulures, pictogrammes par variété, badges de profil, hiérarchie tarifaire, éditions saisonnières et composition narrative — à transposer sur le site sans intégrer ses promotions actuelles.

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
- [ ] Faire valider le principe : `premium calme` majoritaire, `graffiti/chill` en accents contrôlés.

**Validation :** aucune nouvelle section ne pourra introduire une couleur, une police ou un effet hors charte sans validation.

## Phase 1 — Direction artistique WOOD × inspiration TealerLab

L’audit de TealerLab montre surtout une hiérarchie commerciale très lisible : offres visibles, catégories immédiatement compréhensibles, cartes produit informatives, preuves de confiance, FAQ et contenus de marque. Le site utilise aussi des programmes de fidélité, parrainage, quiz, jeu, newsletter et contenus éditoriaux ; ces éléments seront étudiés mais ne seront pas ajoutés en bloc à WOOD. [TealerLab](https://tealerlab.com/)

### Tâche 4 — Créer le système d’accents graffiti et chill

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

- [x] Conserver le panier lors d’un rafraîchissement, d’une navigation et d’une erreur réseau ; le stockage local est normalisé, synchronisé entre onglets et n’est vidé qu’après succès serveur.
- [x] Recalculer les totaux depuis des données fiables, jamais depuis un prix envoyé librement par le navigateur ; le total client est provisoire et la fonction serveur recalcule le prix depuis Supabase.
- [x] Ajouter un état vide clair et un état de chargement court ; le bouton de commande indique l’enregistrement et un délai réseau maximal est géré.

**Validation :** `test/cart-resilience.test.mjs`, `test/order-client-resilience.test.mjs` et le contrôle navigateur du stockage local ; le panier reste intact si la commande échoue.

### Tâche 17 — Remplacer le retrait par un parcours livraison uniquement

- [x] Supprimer toute option de retrait en magasin du panier, checkout, résumé et confirmation.
- [x] Afficher avant l’achat que la livraison est disponible.
- [x] Demander les informations nécessaires à la livraison uniquement lorsque le client avance dans le parcours.

**Validation :** aucun texte ou bouton ne propose Barla ou Borriglione comme mode de retrait.

### Tâche 18 — Préparer les vouchers sans les activer

- [x] Garder toute l’interface promotionnelle masquée et toute règle de voucher désactivée tant que la propriétaire ne l’a pas validée.
- [ ] Définir côté propriétaire : code, période, type de réduction, montant, plafond, produits concernés et nombre d’utilisations.
- [ ] Valider le code côté serveur Supabase.
- [ ] Afficher un message précis si le code est invalide, expiré ou non applicable.
- [ ] Journaliser l’usage pour empêcher les abus.

**Validation :** un client ne peut pas modifier la réduction depuis la console du navigateur.

### Tâche 19 — Préparer les e-mails de commande

- [x] Préparer la persistance d’un récapitulatif de commande dans la file `order_notification_outbox` à partir d’une commande créée côté serveur.
- [ ] Préparer un e-mail client et un e-mail propriétaire ; la première version utilise l’e-mail transactionnel, sans SMS.
- [ ] Ajouter la pièce jointe PDF uniquement après validation du format et après persistance réussie de la commande.
- [x] Prévoir une file/outbox, des tentatives contrôlées et un statut `à envoyer / envoyé / échec` ; ne jamais prétendre qu’un e-mail a été reçu uniquement parce qu’il a été demandé au fournisseur.
- [ ] Utiliser un relais SMTP/API transactionnel configuré hors du dépôt ; garder les secrets dans Supabase et documenter SPF, DKIM, DMARC et les rebonds.
- [ ] N’envoyer la confirmation qu’après création fiable de la commande.
- [ ] Prévoir une trace d’envoi et un statut d’erreur visible côté propriétaire.

**Validation :** aucune commande confirmée sans identifiant permanent ni trace exploitable.

## Phase 4 — Supabase, comptes et espace propriétaire

### Tâche 20 — Auditer le schéma actuel avant modification

- [x] Inventorier tables, colonnes, fonctions, Edge Functions, politiques RLS et migrations.
- [ ] Vérifier l’URL Supabase et les redirections de production/test.
- [ ] Ne modifier aucune table de production sans sauvegarde et plan de retour.

**Fichiers concernés :** `supabase/`, `supabase-config.js`, `order-api.js`, `account.js`, `owner-dashboard.js`.

**Validation :** l’état réel de Supabase est documenté avant toute migration.

### Tâche 21 — Séparer les rôles client et propriétaire

- [x] Créer un rôle client par défaut pour chaque nouvelle inscription.
- [x] Définir l’admin dans `app_metadata` ou une table de rôles protégée, jamais dans `user_metadata` modifiable par le client.
- [x] Vérifier les autorisations côté serveur avec l’utilisateur réel et ne pas considérer un JWT ancien comme une preuve définitive après changement de rôle ; `compte.html` valide désormais l’utilisateur via `auth.getUser()` avant de monter le tableau de bord propriétaire.
- [x] Afficher le bouton de gestion dès la connexion uniquement si le rôle admin est confirmé.
- [x] Ne jamais exposer les produits, stocks ou commandes d’administration aux comptes clients.
- [x] Ne pas conserver de route `admin.html` : un visiteur ou un client ne reçoit aucune interface administrative et aucune donnée admin.
- [x] Retenir une seule architecture : tableau de bord rendu dans `compte.html` après contrôle serveur du rôle propriétaire ; aucune route/admin publique alternative.

**Validation :** un nouveau compte ne voit aucun menu admin et ne peut pas appeler les routes admin même en tapant leur URL.

### Tâche 22 — Renforcer RLS et les autorisations

- [x] Activer RLS sur chaque table exposée.
- [x] Écrire des politiques explicites par opération et par rôle (`TO anon`, `TO authenticated`) avec `auth.uid()` non nul lorsque nécessaire.
- [x] Ajouter les clauses `WITH CHECK` aux insertions/modifications et les index nécessaires sur les colonnes utilisées par les politiques ; les migrations et l’audit distant les confirment.
- [x] Autoriser un client à lire/modifier uniquement ses propres données ; `customer_profiles` et les commandes utilisent `auth.uid()`.
- [x] Réserver produits, stocks et commandes globales au rôle propriétaire ou aux fonctions serveur prévues ; aucun coupon n’est exposé tant que les promotions restent désactivées.
- [x] Garder les clés privilégiées uniquement côté serveur.
- [ ] Ajouter des tests négatifs : client qui tente de lire une autre commande, modifier un stock ou s’attribuer admin.

**Validation :** les tests d’accès refusé passent aussi bien depuis l’interface que depuis des appels directs.

### Tâche 23 — Fiabiliser les commandes et le stock

- [x] Ajouter une clé d’idempotence par tentative de commande.
- [x] Créer la commande et réserver/décrémenter le stock dans une opération atomique.
- [x] Dans chaque Edge Function sensible, transmettre le contexte d’autorisation de la requête et vérifier l’utilisateur côté serveur avant toute opération.
- [x] Gérer explicitement le stock insuffisant.
- [x] Ne jamais faire confiance au prix ou au stock transmis par le navigateur.
- [x] Garder un journal de statut : créée, en attente de paiement, payée, annulée, avec historique append-only des états de commande ; les erreurs de fonction restent journalisées côté Edge Function jusqu’à la mise en place d’un fournisseur d’observabilité dédié.

**Validation :** migration atomique et idempotente, fonction serveur, `test/order-security.test.mjs`, `test/order-status-history.test.mjs`, historique Supabase protégé et contrôle client de panne réseau. Le scénario réel à deux clients reste à exécuter avec un environnement de test et des stocks renseignés.

### Tâche 24 — Simplifier l’espace propriétaire

- [x] Première vue après connexion admin : commandes à traiter et alertes importantes.
- [x] Sections simples : commandes, produits, stocks, paramètres ; afficher la rubrique promotions uniquement lorsqu’elle sera activée et validée. La section paramètres expose seulement la livraison disponible, Viva en attente et les promotions désactivées, sans inventer de frais ou de délais.
- [x] Actions limitées et explicites : ajouter, modifier, désactiver via l’état de disponibilité, et mettre à jour l’état de traitement.
- [x] Éviter toute déconnexion automatique pendant une session active raisonnable ; la session Supabase est persistante et auto-rafraîchie, avec message clair si son chargement échoue.
- [x] Rendre cette vue dans l’espace compte après vérification du rôle ; la propriétaire voit les commandes et alertes en premier, tandis qu’un client voit uniquement son compte.
- [x] Extraire la logique réutilisable vers un module de tableau de bord intégré au compte et retirer la dépendance à `admin.html`/`admin.js` avant le paquet final.

**Validation :** la propriétaire peut comprendre l’état de la boutique sans connaître Supabase ni SQL.

### Tâche 25 — Laisser Viva Wallet isolé mais prêt

- [x] Garder le statut de paiement séparé du statut de commande.
- [ ] Préparer l’emplacement d’un futur webhook signé et idempotent.
- [x] Ne stocker aucun identifiant Viva fictif dans le dépôt.

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

- [x] Tester les chemins relatifs depuis la racine publique.
- [ ] Tester les URLs avec et sans slash final selon la configuration.
- [x] Vérifier la casse des fichiers, les accents et les extensions.
- [ ] Vérifier HTTPS, 404, redirections et chargement des assets.

**Validation :** le paquet fonctionne depuis une racine web propre sans dépendre du chemin local GitHub.

### Tâche 35 — Préparer la passation à la propriétaire

- [x] Rédiger une procédure courte : `docs/ops/owner-handover.md` couvre la connexion propriétaire, la gestion d’un produit, la modification du stock, la lecture d’une commande et la désactivation d’un produit.
- [x] Prévoir une liste séparée des comptes et accès à transférer : dépôt GitHub, Supabase, hébergeur, domaine, paiement et e-mail, sans écrire de secret dans le dépôt.
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

L’audit complet ordinateur/mobile est documenté dans `docs/audits/2026-11-04-tealerlab-wood-compatibility-audit.md`. Il confirme que le conjoint aime surtout la hiérarchie commerciale, l’énergie visuelle et la richesse des cartes de TealerLab, tandis que la propriétaire veut garder WOOD, ses couleurs, son logo, son côté premium et ses présentations sous cloche.

### Tâche 40 — Valider la direction WOOD chic, premium, chill et graffiti

- [ ] Garder WOOD comme fondation visuelle.
- [ ] Ajouter les accents graffiti, stickers et humour en touches contrôlées.
- [ ] Faire valider une première planche visuelle par la propriétaire avant de généraliser les accents.

**Validation :** le conjoint reconnaît l’énergie TealerLab et la propriétaire reconnaît immédiatement l’identité WOOD.

### Tâche 41 — Corriger les libellés de la navigation mobile

- [x] Rendre `Nous trouver` entièrement lisible à 320, 375 et 390 px.
- [x] Vérifier que les quatre labels de la barre basse ne se chevauchent pas.
- [x] Conserver les mêmes icônes, couleurs et destinations.

**Validation :** aucun libellé n’est tronqué dans les captures mobile. Vérifié à 390 × 844 avec cache CSS invalidé, puis `npm run check` : 69 tests passés, syntaxe JavaScript validée et audit statique OK.

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
- [x] Ne jamais masquer le prix, le grammage, le stock ou le bouton d’achat.
- [x] Respecter `prefers-reduced-motion` et garder une interaction fonctionnelle sans animation.
- [x] Tester le focus, la fermeture par `Échap`, le retour du focus au bouton déclencheur et l’absence de piège clavier dans le menu et les panneaux.
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
| 40 | Faire valider la direction chic/premium/chill/graffiti : WOOD d’abord, TealerLab seulement comme inspiration. | `docs/audits/`, plan visuel | La propriétaire reconnaît WOOD ; le conjoint retrouve une présentation riche et vivante. |
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
- **Graffiti/chill :** stickers, annotations et humour en petites touches, jamais sur le prix, le stock, le paiement ou les contrôles essentiels.
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
5. **Touches graffiti et chill maîtrisées** — stickers, annotations, humour et détails graphiques dans les espaces éditoriaux, jamais au détriment de la lisibilité ou du parcours d’achat.
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
- **Règle de priorité :** la propriétaire doit reconnaître WOOD immédiatement ; son conjoint doit retrouver une présentation riche, travaillée et vivante.

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

- [x] Créer un panneau compact structuré par `Fleurs`, `Résines`, `Cosmétiques & huiles` et `Textile & produits dérivés` dans le menu mobile, sans modifier l’en-tête desktop.
- [x] Ajouter `Panier`, `Compte`, `Nous trouver` et `FAQ` comme accès rapides.
- [ ] Ajouter des sous-menus avec `Retour au menu`, sans énorme mega-menu.
- [x] Ne jamais afficher l’administration, les stocks ou les commandes dans le menu public ; un test parcourt toutes les pages publiques.

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

- [x] Utiliser de vrais boutons et liens avec des noms accessibles.
- [x] Gérer `aria-expanded`, le focus à l’ouverture, le retour du focus à la fermeture et `Échap`.
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

## Addendum — audit approfondi de l’architecture d’accueil TealerLab et traduction WOOD

Audit effectué le 5 novembre 2026 sur [l’accueil](https://tealerlab.com/), [le catalogue](https://tealerlab.com/collections/all), [la collection fleurs](https://tealerlab.com/collections/nos-fleurs) et [une fiche produit](https://tealerlab.com/products/echantillons-resines). TealerLab est une **référence d’expérience et de placement**, pas une autorité graphique : WOOD garde intégralement son identité.

### Ce qui a été observé sur ordinateur

- La page commence par un bandeau d’annonce, puis un en-tête global qui sépare clairement marque, menu, recherche, compte/fidélité et panier.
- Le hero occupe la première scène : visuel très grand, promesse courte, action principale et preuve immédiatement visible.
- Chaque grande section réutilise le même patron : petit libellé éditorial, titre fort, éventuellement `Voir tout`, puis un rail ou une grille.
- Les produits ne sont pas présentés dans un seul catalogue monotone : ils sont regroupés en séquences éditoriales distinctes (`sélection`, fleurs, résines, nouveautés, etc.).
- Une carte produit réutilise un composant stable : média, badge, titre, preuve éventuelle, variantes, prix hiérarchisé, prix au gramme, état de stock et action d’ajout.
- La page termine par des blocs de réassurance, FAQ, contenu éditorial, communauté et footer repliable. Cette longue narration explique pourquoi l’accueil paraît travaillé, mais tout n’est pas nécessaire pour WOOD.

### Ce qui a été observé sur mobile

- Le bandeau et l’en-tête deviennent compacts ; menu, logo, recherche et panier restent les repères principaux.
- Les rails deviennent des groupes horizontaux à faire défiler dans leur propre zone, sans faire défiler le document entier horizontalement.
- Les cartes passent en deux colonnes ; leurs contrôles restent dans la carte et l’action d’achat reste visible.
- Les sections conservent leur ordre mais changent de densité : hero vertical, blocs pleine largeur, carrousels tactiles et footer en accordéons.
- Le site réel affiche aussi une fenêtre de consentement et des widgets promotionnels dès l’arrivée. WOOD ne doit pas reproduire ce recouvrement : la propriétaire veut une interface simple et aucune promotion pour l’instant.

### Architecture à retenir pour WOOD

1. **Un shell de section partagé** : kicker WOOD, titre, texte court, lien facultatif, contenu.
2. **Un composant de rail partagé** : grille desktop, grille mobile ou carrousel local selon la section ; jamais de largeur forcée sur `body`.
3. **Une carte produit unique et paramétrable** : même structure dans l’accueil et les pages boutique, avec des données différentes selon l’univers.
4. **Un modèle de fiche produit** : média principal, identité du produit, grammage, prix, état de disponibilité, action d’achat et informations complémentaires.
5. **Un modèle d’état** : photo à venir, disponible, bientôt disponible, rupture, incomplet ; aucun espace vide ou bouton trompeur.
6. **Un modèle d’animation** : apparition, déplacement léger, zoom de fiche et feedback d’ajout ; les animations ne sont jamais la source de vérité.
7. **Un modèle de navigation** : desktop aéré, mobile app-like, accès constant au panier, compte et quatre univers ; aucun accès admin public.

### Traduction visuelle WOOD — direction retenue

- Reprendre la **force du placement** TealerLab, mais dans la palette verte/crème/lime WOOD et avec le logo officiel exact.
- Donner au hero WOOD une mise en scène plus éditoriale : repère `01 / WOOD`, grand message, visuel botanique ou future photo sous cloche, CTA principal et CTA secondaire.
- Présenter les quatre univers comme quatre entrées éditoriales fortes, pas comme quatre boutons ordinaires.
- Introduire plus tard une section `Sélection WOOD` de produits réels, avec la même cohérence de cartes sur l’accueil et la boutique.
- Utiliser la présentation sous cloche comme signature visuelle de qualité ; ne pas la remplacer par des photos génériques du web.
- Ajouter des stickers, annotations et touches graffiti uniquement dans les zones éditoriales, après réception et validation des références de la propriétaire.
- Garder les prix calmes et lisibles : pas de faux prix barré, pas de badge promo, pas de faux avis, pas de taux inventé.
- Conserver la carte actuelle dans `Nous trouver` et ne pas ajouter le retrait en magasin au parcours d’achat.

### Sous-tâches ajoutées — `A01–A40`

Ces sous-tâches détaillent la refonte à exécuter plus tard. Elles ne valent pas validation graphique et ne remplacent aucune décision de la propriétaire.

- [ ] **A01 — Cartographier le shell d’accueil :** bandeau, en-tête, hero, sections, footer et ordre de lecture.
- [ ] **A02 — Définir les patrons de section :** kicker, titre, texte, lien et contenu avec les espacements WOOD existants.
- [ ] **A03 — Définir les variantes de section :** pleine largeur, grille, rail tactile, bloc éditorial et FAQ.
- [ ] **A04 — Figer la hiérarchie desktop :** marque, navigation, découverte, panier et compte sans concurrence visuelle.
- [ ] **A05 — Figer la hiérarchie mobile :** menu, logo, panier et navigation basse sans doublon ni chevauchement.
- [ ] **A06 — Placer un bandeau livraison non promotionnel :** visible avant les produits, modifiable à un seul endroit.
- [ ] **A07 — Recomposer le hero WOOD :** message, visuel, CTA et preuve de marque sans reprendre la campagne TealerLab.
- [ ] **A08 — Créer la séquence des quatre univers :** fleurs, résines, cosmétiques/huiles et textile/goods.
- [ ] **A09 — Prévoir un bloc d’introduction par univers :** une phrase utile, aucune promesse d’effet ou de qualité non vérifiée.
- [ ] **A10 — Créer la future sélection WOOD :** uniquement avec produits, photos, stocks et prix validés.
- [ ] **A11 — Stabiliser la zone média des cartes :** ratio, hauteur, fond et état photo à venir.
- [ ] **A12 — Stabiliser la zone d’identification :** univers puis `CBD boosté (strong)`, `CBD soft (medium)` ou `CBD classique`.
- [ ] **A13 — Stabiliser les titres :** deux lignes maximum avec hauteur réservée et nom complet accessible.
- [ ] **A14 — Stabiliser le sélecteur de grammes :** départ à 1 g, `−`, valeur, `+`, clavier et toucher.
- [ ] **A15 — Stabiliser le bloc de prix :** grammage choisi, total et prix au gramme près de l’action.
- [ ] **A16 — Stabiliser le stock :** disponible, à venir, rupture et incomplet avec actions cohérentes.
- [ ] **A17 — Interdire les données décoratives inventées :** avis, taux, réductions, économies, badges et chiffres non fournis.
- [ ] **A18 — Créer la fiche produit WOOD :** grande image, présentation, achat et informations dans cet ordre.
- [ ] **A19 — Ajouter le zoom de fiche sans saut :** transition courte, centrée, annulable et compatible avec le bouton retour.
- [ ] **A20 — Prévoir les recommandations :** produits du même univers uniquement, sans détourner l’action d’achat.
- [ ] **A21 — Mettre en scène la cloche :** emplacement réservé aux vraies photos de la propriétaire et à leurs ratios.
- [ ] **A22 — Préparer le bloc de réassurance :** conseil, Nice, boutiques et livraison seulement lorsque chaque formulation est validée.
- [ ] **A23 — Préparer la FAQ WOOD :** accordéon simple, recherche non nécessaire, réponses confirmées uniquement.
- [ ] **A24 — Préparer le footer :** quatre liens utiles, contacts séparés par boutique, carte conservée et aucun point final ajouté aux noms Barla/Borriglione.
- [ ] **A25 — Adapter la grille ordinateur :** trois produits par ligne, hauteur de carte alignée et marge régulière.
- [ ] **A26 — Adapter la grille mobile :** deux colonnes formant quatre cases visibles dans un bloc `2 × 2` quand la largeur le permet.
- [ ] **A27 — Adapter la tablette :** deux ou trois colonnes selon la largeur réelle, sans dépendre du nom du modèle.
- [ ] **A28 — Isoler les carrousels :** overflow local contrôlé, boutons précédent/suivant accessibles et aucun débordement de page.
- [ ] **A29 — Vérifier les zones sûres :** encoche, barre d’outils Safari, orientation et navigation basse.
- [ ] **A30 — Vérifier les contenus extrêmes :** nom long, prix élevé, absence d’image, état incomplet et texte de FAQ long.
- [ ] **A31 — Ajouter les apparitions au scroll :** une fois les dimensions réservées, sans déplacer les contrôles.
- [ ] **A32 — Ajouter le bandeau animé WOOD :** message de service ou de marque, jamais promotion inventée.
- [ ] **A33 — Ajouter les micro-interactions :** hover desktop, feedback tactile mobile, ajout panier et focus clavier.
- [ ] **A34 — Respecter `prefers-reduced-motion` :** aucune information ne dépend d’un mouvement.
- [ ] **A35 — Mesurer la performance :** images, CLS, temps d’interaction et comportement sur réseau lent.
- [ ] **A36 — Garder les scripts sobres :** pas de dépendance lourde ou de widget tiers nécessaire à l’achat.
- [ ] **A37 — Tester l’accessibilité :** clavier, lecteur d’écran, contraste, focus, noms accessibles et tailles tactiles.
- [ ] **A38 — Tester les parcours :** accueil → univers → fiche → panier → compte/checkout, sur desktop et mobile.
- [ ] **A39 — Comparer avant/après :** captures aux largeurs cibles, aucun changement non expliqué de l’identité WOOD.
- [ ] **A40 — Faire valider en deux temps :** d’abord `c’est toujours WOOD` par la propriétaire, puis `la présentation est aussi forte que TealerLab` par son conjoint.

### Fiche d’exécution mise à jour des tags `A01–A40`

Chaque tag ci-dessous précise les fichiers à examiner ou modifier et la preuve attendue. Cette fiche sert à travailler proprement plus tard ; elle ne signifie pas que la refonte graphique est déjà réalisée.

- **A01** — Fichiers : `index.html`, `wood-shop.html`, `compte.html`, `checkout.html`, `docs/ops/public-routes.md`. Validation : carte de l’accueil et des routes sans route oubliée.
- **A02** — Fichiers : `boutique.css`, `responsive.css`, `mobile.css`. Validation : mêmes espacements et mêmes patrons sur les quatre univers.
- **A03** — Fichiers : `index.html`, `boutique.js`, `boutique.css`. Validation : chaque section choisit explicitement grille, rail, bloc ou accordéon.
- **A04** — Fichiers : `index.html`, `mobile.css`, `responsive.css`. Validation : desktop affiche marque, navigation, panier et compte sans concurrence.
- **A05** — Fichiers : `mobile-shell.js`, `mobile.css`, `index.html`, `compte.html`. Validation : mobile affiche menu, logo, panier et navigation basse sans chevauchement.
- **A06** — Fichiers : `index.html`, `wood-shop.html`, `boutique.js`. Validation : le message livraison est unique, visible avant les produits et facilement modifiable.
- **A07** — Fichiers : `index.html`, `boutique.css`, `assets/`. Validation : le hero WOOD conserve couleurs, logo et message validés avec deux actions lisibles.
- **A08** — Fichiers : `wood-shop.html`, `fleurs.html`, `resines.html`, `bien-etre.html`, future page goods. Validation : les quatre univers sont distincts et leurs liens sont corrects.
- **A09** — Fichiers : les quatre pages boutique, `boutique.css`. Validation : chaque introduction reste descriptive, courte et sans promesse non confirmée.
- **A10** — Fichiers : `index.html`, `storefront.js`, `boutique.js`, Supabase `products`. Validation : aucun produit fictif n’entre dans la sélection WOOD.
- **A11** — Fichiers : `boutique.css`, `responsive.css`, `assets/`. Validation : image réelle, photo à venir et absence d’image conservent la même hauteur utile.
- **A12** — Fichiers : `storefront.js`, `boutique.js`, `fleurs.html`, `resines.html`. Validation : les niveaux strong/medium/classique sont affichés sans filtre supplémentaire.
- **A13** — Fichiers : `boutique.css`, `responsive.css`, `test/catalog-grid.test.mjs`. Validation : deux lignes maximum visuellement, nom complet accessible et aucune carte décalée.
- **A14** — Fichiers : `boutique.js`, `flower-pricing.js`, `test/flower-pricing.test.js`. Validation : `− / valeur / +` part de 1 g, reste clavier-compatible et ne descend jamais sous 1 g.
- **A15** — Fichiers : `boutique.js`, `flower-pricing.js`, `test/flower-pricing-guard.test.mjs`. Validation : grammage, total et prix au gramme correspondent au palier de la variété.
- **A16** — Fichiers : `storefront.js`, `boutique.js`, `supabase/functions/create-pending-order/`. Validation : chaque état de stock désactive ou adapte l’action sans faux achat.
- **A17** — Fichiers : `storefront.js`, `boutique.js`, `scripts/static-audit.mjs`. Validation : audit négatif sur faux avis, faux taux, fausse réduction et chiffre inventé.
- **A18** — Fichiers : `fleur.html`, `flower-detail.js`, `boutique.css`. Validation : média, identité, achat et informations apparaissent dans cet ordre.
- **A19** — Fichiers : `flower-detail.js`, `responsive.css`, `test/product-detail.test.mjs`. Validation : zoom limité à `transform/opacity`, retour fluide et absence de saut de scroll.
- **A20** — Fichiers : `flower-detail.js`, `boutique.js`, `storefront.js`. Validation : recommandations du même univers, sans remplacer ni masquer l’achat.
- **A21** — Fichiers : `assets/`, `fleur.html`, `resines.html`, documentation des médias. Validation : seules les photos transmises et validées par la propriétaire sont utilisées.
- **A22** — Fichiers : `index.html`, `docs/ops/public-routes.md`, contenu validé propriétaire. Validation : chaque preuve affichée possède une source ou une validation explicite.
- **A23** — Fichiers : `index.html`, `location-contact.test.mjs`, FAQ partagée. Validation : accordéons utilisables au clavier et réponses limitées aux faits confirmés.
- **A24** — Fichiers : `index.html`, `mobile.css`, `assets/` carte, `location-contact.test.mjs`. Validation : contacts Barla/Borriglione sont identifiés et sans point final après les noms.
- **A25** — Fichiers : `boutique.css`, `responsive.css`, `test/catalog-grid.test.mjs`. Validation : trois cartes par ligne sur ordinateur avec actions alignées.
- **A26** — Fichiers : `boutique.css`, `mobile.css`, `test/responsive-layout.test.mjs`. Validation : deux colonnes mobiles forment le bloc `2 × 2` sans couper prix ni bouton.
- **A27** — Fichiers : `responsive.css`, `mobile.css`, `test/responsive-layout.test.mjs`. Validation : la tablette choisit deux ou trois colonnes selon la largeur réelle.
- **A28** — Fichiers : `boutique.js`, `responsive.css`, `mobile-shell.js`. Validation : tout overflow horizontal est local au rail et aucun `body` ne déborde.
- **A29** — Fichiers : `mobile.css`, `responsive.css`, `test/mobile-app-shell.test.mjs`. Validation : encoche, orientation, barre Safari et navigation basse ne masquent rien.
- **A30** — Fichiers : `boutique.css`, `mobile.css`, `test/responsive-layout.test.mjs`. Validation : titres longs, prix élevés, photo absente et FAQ longue restent lisibles.
- **A31** — Fichiers : `mobile-shell.js`, `boutique.js`, `responsive.css`. Validation : les dimensions sont réservées avant l’apparition et aucun bouton ne bouge.
- **A32** — Fichiers : `index.html`, `boutique.css`, `mobile.css`. Validation : le bandeau animé ne contient ni promotion ni promesse non validée.
- **A33** — Fichiers : `boutique.js`, `mobile-shell.js`, `accessibility.test.mjs`. Validation : hover, toucher, ajout panier et focus donnent un retour sans déplacement de layout.
- **A34** — Fichiers : `mobile.css`, `responsive.css`, `test/accessibility.test.mjs`. Validation : `prefers-reduced-motion` supprime le mouvement non essentiel sans supprimer l’information.
- **A35** — Fichiers : `scripts/static-audit.mjs`, `package.json`, captures Playwright. Validation : images, CLS, interaction et réseau lent sont mesurés avant validation.
- **A36** — Fichiers : toutes les pages publiques, `package.json`, `README.md`. Validation : aucune librairie ou widget tiers n’est requis pour consulter ou acheter.
- **A37** — Fichiers : `test/accessibility.test.mjs`, `test/navigation-accessibility.test.mjs`, CSS responsive. Validation : clavier, lecteur d’écran, contraste, focus et toucher passent.
- **A38** — Fichiers : `test/links.test.mjs`, `test/product-detail.test.mjs`, `test/cart-resilience.test.mjs`, `test/owner-dashboard-session-and-status.test.mjs`. Validation : accueil → univers → fiche → panier → compte/checkout est cohérent.
- **A39** — Fichiers : captures de référence de la tâche 49, `docs/audits/2026-11-04-tealerlab-wood-compatibility-audit.md`. Validation : comparaison avant/après sur toutes les largeurs sans dérive WOOD.
- **A40** — Fichiers : compte-rendu de validation propriétaire, roadmap et captures finales. Validation : deux validations distinctes sont recueillies avant toute publication.

## Audit des oublis — tags supplémentaires `A41–A80`

Les 76 tâches principales et les tags `A01–A40` ne couvraient pas encore toute la chaîne d’une vente réelle. Les tags suivants complètent la feuille de route sans modifier le site maintenant. Ils restent ouverts tant que la preuve indiquée n’existe pas.

### Conformité, données personnelles et comptes clients

- [ ] **A41 — Identité légale de la boutique :** recueillir raison sociale, adresse légale, SIRET, contact et informations nécessaires aux pages légales ; validation : propriétaire et conseil compétent valident les données publiées.
- [ ] **A42 — Âge et public autorisé :** confirmer avec la propriétaire et le conseil si un contrôle d’âge ou un message majeur est requis pour les produits exacts ; validation : règle écrite, parcours non bloquant pour les visiteurs autorisés.
- [ ] **A43 — Cartographie RGPD :** inventorier compte, commande, adresse, e-mail, journaux, notifications et sauvegardes ; validation : chaque donnée possède une finalité, une base et une durée.
- [ ] **A44 — Droits du compte client :** prévoir changement de mot de passe, réinitialisation, confirmation d’e-mail, export et demande de suppression ; validation : le client ne voit ni données d’un autre client ni données propriétaire.
- [ ] **A45 — Cookies et consentements :** inventorier les scripts non essentiels et n’ajouter une bannière que si un consentement est réellement nécessaire ; validation : aucun traceur tiers n’est chargé en silence.
- [ ] **A46 — Conservation et effacement :** documenter la durée des comptes, paniers, commandes, e-mails, logs et sauvegardes ; validation : une suppression demandée ne détruit jamais une obligation légale de conservation sans décision documentée.

### Livraison et traitement de commande

- [ ] **A47 — Règles de livraison finales :** confirmer zones, transporteur, frais, délais, minimum éventuel, suivi, emballage et retours ; validation : un document propriétaire alimente les textes et le calcul réel.
- [ ] **A48 — Adresse robuste :** gérer champs obligatoires, caractères accentués, longueur maximale, code postal, ville, pays et correction avant validation ; validation : les adresses invalides sont expliquées sans perdre le panier.
- [ ] **A49 — États de traitement :** distinguer reçue, à préparer, expédiée, livrée, annulée, remboursée et bloquée ; validation : chaque état est visible selon le rôle et enregistré dans l’historique.
- [ ] **A50 — Travail de la propriétaire :** afficher les informations nécessaires pour préparer, expédier et suivre une commande sans ouvrir Supabase ; validation : une commande réelle est traitable depuis le tableau de bord.
- [ ] **A51 — Instantané de commande :** conserver nom, prix, grammage, quantité, adresse et frais tels qu’acceptés au moment de la commande ; validation : une modification future du catalogue ne réécrit jamais une ancienne commande.
- [ ] **A52 — Réservation et libération du stock :** réserver atomiquement, libérer sur échec/expiration/annulation et empêcher la vente concurrente ; validation : deux clients ne peuvent pas consommer le même dernier stock.
- [ ] **A53 — Corrections administratives :** prévoir correction contrôlée d’une adresse ou d’un état avec motif et journal ; validation : aucune modification sensible n’est silencieuse.
- [ ] **A54 — Annulation et remboursement :** définir qui peut annuler, à quel état, avec quel justificatif et comment l’e-mail client est déclenché ; validation : aucun remboursement fictif n’est confirmé avant Viva.

### Viva Wallet et paiements

- [ ] **A55 — Machine d’états Viva :** définir en attente, autorisé, payé, refusé, expiré, annulé, remboursé et contesté ; validation : les états inconnus restent non payés.
- [ ] **A56 — Vérification du paiement :** vérifier signature/webhook, montant, devise, commande, idempotence et origine côté serveur ; validation : le navigateur ne peut jamais marquer une commande payée.
- [ ] **A57 — Parcours de test Viva :** documenter sandbox, retour réussi, retour refusé, abandon, webhook en retard et doublon avant production ; validation : chaque scénario possède un résultat attendu et une preuve.
- [ ] **A58 — Réconciliation paiements-commandes :** comparer périodiquement les événements Viva aux commandes et faire remonter les écarts ; validation : un paiement sans commande et une commande sans paiement sont détectés.

### E-mails, PDF et notifications

- [ ] **A59 — Modèles transactionnels :** rédiger e-mail client et propriétaire pour commande reçue, paiement confirmé, échec, annulation, expédition et remboursement ; validation : aucun texte ne promet un envoi avant l’événement correspondant.
- [ ] **A60 — PDF de commande :** définir contenu, identité, numéro, date, articles, grammage, total et adresse ; validation : PDF lisible, non vide, attaché uniquement après persistance.
- [ ] **A61 — Domaine d’envoi :** configurer fournisseur, expéditeur, SPF, DKIM, DMARC, rebonds et adresse de réponse hors dépôt ; validation : test reçu côté client et propriétaire avec en-têtes contrôlés.
- [ ] **A62 — Worker d’outbox :** définir verrouillage, tentatives, délai progressif, limite, statut bloqué et reprise manuelle ; validation : un doublon n’envoie pas deux confirmations.
- [ ] **A63 — Contrôle des notifications :** tester panne fournisseur, pièce jointe refusée, adresse invalide, timeout, reprise et affichage propriétaire ; validation : la commande reste traitable même si le mail échoue.
- [ ] **A64 — SMS explicitement hors périmètre :** ne rien activer tant qu’aucun fournisseur et consentement ne sont validés ; validation : aucune promesse SMS ne figure dans l’interface.

### Supabase, sécurité et secrets

- [ ] **A65 — Environnements séparés :** distinguer local, démonstration et production avec URL, redirect Auth, clés et données propres ; validation : aucune URL localhost ne subsiste dans le paquet de production.
- [ ] **A66 — Inventaire et rotation des secrets :** documenter secrets Edge Functions, e-mail, Turnstile et Viva, leur propriétaire et leur rotation ; validation : aucune clé privilégiée n’est dans GitHub, l’HTML ou les logs.
- [ ] **A67 — Matrice RLS complète :** tester lecture/écriture client, propriétaire, invité et rôle inconnu sur chaque table ; validation : les tests négatifs refusent toute donnée étrangère.
- [ ] **A68 — Anti-abus en production :** vérifier Turnstile, limitation de débit, origine, taille de requête, payload malformé et répétition rapide ; validation : l’abus est bloqué sans bloquer une commande normale.
- [ ] **A69 — Entrées et fichiers :** tester XSS, HTML injecté, Unicode, valeurs numériques, images trop lourdes et noms de fichiers dangereux ; validation : aucune donnée utilisateur n’est interprétée comme code.
- [ ] **A70 — En-têtes et politique navigateur :** finaliser HTTPS, CSP progressive, CORS allow-list, `nosniff`, anti-iframe, referrer et permissions ; validation : la recette couvre Supabase, paiement et e-mail sans exception large.
- [ ] **A71 — Dépendances et intégrité :** verrouiller versions, vérifier vulnérabilités connues et limiter les CDN ; validation : le contrôle est reproductible avant chaque transfert.

### Supervision, continuité et passation

- [ ] **A72 — Surveillance minimale :** définir contrôle de disponibilité, erreurs Edge Function, commandes bloquées, outbox en échec et seuils d’alerte ; validation : la propriétaire sait qu’une commande nécessite une action.
- [ ] **A73 — Journal exploitable :** corréler commande, paiement, stock et notification sans exposer d’adresse ou de secret ; validation : une commande peut être retrouvée sans lire des logs dispersés.
- [ ] **A74 — Procédure incident :** écrire quoi faire en cas de paiement douteux, stock incohérent, mail bloqué, panne Supabase ou fuite de secret ; validation : responsable, escalade et action de reprise sont identifiés.
- [ ] **A75 — Sauvegarde et restauration réelle :** exécuter un export, restaurer dans un environnement de test et vérifier commandes, prix, rôles et historiques ; validation : preuve datée et durée de reprise documentées.
- [ ] **A76 — Passation propriétaire :** transférer dépôt, Supabase, domaine, hébergeur, e-mail, paiement et sauvegardes avec accès séparés ; validation : la propriétaire peut gérer sans Florent.
- [ ] **A77 — Retrait des accès de construction :** prévoir suppression ou rétrogradation de l’accès de Florent après validation écrite ; validation : les comptes clients et l’administration restent fonctionnels.
- [ ] **A78 — Guide opérationnel simple :** documenter ajouter produit, modifier prix/stock, traiter commande, reprendre erreur et contacter le support ; validation : test réalisé par une personne non technique.

### Qualité, navigateurs et mise en service

- [ ] **A79 — Matrice navigateurs/appareils :** tester Safari iOS, Chrome Android, Safari macOS, Chrome/Edge/Firefox Windows et Firefox/Linux ; validation : aucune route, grille, panier ou compte ne change de comportement critique.
- [ ] **A80 — Préproduction et transfert :** produire le paquet final, vérifier `public_html`, HTTPS, DNS, domaine `.fr`, 404, redirections, cache, retour arrière et smoke test ; validation : transfert reproductible en peu d’étapes, sans publier `admin.*`, secrets ou données de test.

## Audit visuel et éditorial approfondi — tags `A81–A140`

Cette passe ajoute les manques visibles qui n’étaient pas assez détaillés dans les 80 premiers tags. Elle vise une expérience **WOOD fortement inspirée par la hiérarchie de TealerLab**, mais avec les couleurs, le logo, la typographie, la carte, le ton et les règles commerciales de WOOD. Ces tâches décrivent ce qu’il faudra construire ; elles ne signifient pas que ces changements sont déjà appliqués.

### Direction artistique, composition et identité

- [ ] **A81 — Photographier l’état visuel actuel :** capturer accueil, menu, quatre univers, fiche, panier, compte, FAQ, boutiques et footer en desktop, tablette et mobile ; validation : une base avant/après complète est conservée.
- [ ] **A82 — Définir la proportion WOOD :** valider une direction `premium/chic` dominante, `graffiti/chill` en accent et humour en ponctuation ; validation : chaque future section indique son niveau d’intensité et ne surcharge pas l’écran.
- [ ] **A83 — Cartographier les manques de rythme :** repérer les longues zones vides, les répétitions, les changements de densité et les sections qui arrivent trop brutalement ; validation : l’accueil possède une progression lisible du premier écran au footer.
- [ ] **A84 — Figer les tokens visuels WOOD :** documenter couleurs, surfaces, bordures, ombres, rayons, espacements et états sans introduire de palette TealerLab ; validation : tout nouveau composant utilise les tokens validés.
- [ ] **A85 — Auditer la typographie :** vérifier police, graisse, casse, interlettrage, hauteur de ligne, titres très longs et accents français ; validation : aucun titre ne déborde et la police WOOD reste reconnaissable sur tous les écrans.
- [ ] **A86 — Réserver les accents graphiques :** définir les zones où stickers, traits, annotations, emojis et graffiti sont autorisés ; validation : aucun accent ne recouvre un prix, un stock, un bouton ou une information légale.
- [ ] **A87 — Intégrer le logo officiel exact :** utiliser uniquement le fichier transmis par la propriétaire, sans branche ajoutée, déformation, recoloration ou reconstruction ; validation : comparaison visuelle avec l’original et test sur fond clair/sombre.
- [ ] **A88 — Harmoniser les pictogrammes :** créer un petit jeu d’icônes cohérent pour panier, compte, livraison, boutiques, téléphone, itinéraire et FAQ ; validation : les icônes ont une taille, une épaisseur et un nom accessible constants.
- [ ] **A89 — Définir la grammaire des badges :** limiter les badges aux informations réelles `univers`, `strong/medium/classique`, disponibilité et livraison ; validation : aucun badge ne ressemble à une promotion ou à un avis inventé.
- [ ] **A90 — Créer une bibliothèque de micro-copy :** recenser les libellés courts, états, confirmations, erreurs, boutons et textes d’aide dans le ton WOOD ; validation : même action = même formulation sur toutes les pages.

### Accueil WOOD façon TealerLab, sans copie

- [ ] **A91 — Recomposer le premier écran :** conserver le hero WOOD mais lui donner une composition plus éditoriale avec repère de section, message fort, visuel et deux actions hiérarchisées ; validation : le visiteur comprend WOOD et la prochaine action sans scroller.
- [ ] **A92 — Écrire le texte du hero :** garder le ton `Nice, France · depuis 2020` et l’idée du CBD autrement, avec une phrase courte et concrète ; validation : aucun slogan, argument ou promesse n’est repris de TealerLab.
- [ ] **A93 — Préparer le média principal :** réserver un emplacement pour une photo ou création WOOD sous cloche, avec ratio, cadrage et état de chargement stables ; validation : aucun écran vide ou saut de mise en page si la photo manque.
- [ ] **A94 — Ajouter un bandeau de service maîtrisé :** afficher la disponibilité de la livraison avant la boutique dans un bandeau WOOD, sans prix, délai ou promotion non validé ; validation : le bandeau ne masque jamais le menu ou le hero.
- [ ] **A95 — Construire les cartes des quatre univers :** reprendre la logique de découverte de TealerLab avec image, numéro, titre, phrase et action, en gardant fleurs, résines, cosmétiques/huiles et textile/goods ; validation : chaque carte mène à la bonne page.
- [ ] **A96 — Rédiger les introductions de catégories :** produire un texte court, précis et non médical pour chaque univers ; validation : pas de promesse d’effet, de taux, de disponibilité ou de prix inventé.
- [ ] **A97 — Préparer une sélection WOOD sur l’accueil :** prévoir une section de produits réellement disponibles, avec titre, courte introduction et lien `Voir tout` ; validation : la section reste masquée tant que photos, prix et stocks ne sont pas validés.
- [ ] **A98 — Concevoir les rails locaux :** si une sélection dépasse une ligne, prévoir un rail ou carrousel local avec contrôles, indicateur de progression et fallback en grille ; validation : le document et le body ne débordent jamais horizontalement.
- [ ] **A99 — Ajouter une réassurance visuelle :** mettre en scène conseil, sélection, boutiques de Nice et livraison dans des blocs courts, éventuellement accompagnés d’icônes ; validation : chaque fait a été confirmé et aucune statistique n’est fabriquée.
- [ ] **A100 — Organiser le rythme éditorial :** alterner hero, bandeau, univers, sélection, cloche, réassurance, FAQ et boutiques comme une histoire WOOD ; validation : aucune section TealerLab inutile n’est importée par automatisme.

### Menu, header, navigation et footer

- [ ] **A101 — Auditer le header desktop :** équilibrer logo, navigation, panier, compte et CTA `Venir chez WOOD` sans concurrence ni espace mort ; validation : le header reste stable sur 1024, 1280, 1440 et très grand écran.
- [ ] **A102 — Recomposer le header mobile :** créer un header compact avec logo officiel, menu, panier et compte, sans le réduire artificiellement depuis le desktop ; validation : aucune icône n’est sous la zone sûre ou sous la barre du navigateur.
- [ ] **A103 — Concevoir le panneau de menu :** organiser les quatre univers, `Nous trouver`, `FAQ`, `Compte` et `Panier` en groupes simples, avec fermeture évidente ; validation : le client ne voit jamais une entrée admin.
- [ ] **A104 — Ajouter une hiérarchie au menu :** distinguer découverte, boutique, aide et contact par espaces, séparateurs et micro-labels ; validation : un utilisateur de tout âge trouve les quatre univers sans comprendre une logique technique.
- [ ] **A105 — Prévoir les états de navigation :** définir hover, focus, actif, pressé, désactivé et retour arrière avec transitions sobres ; validation : chaque état reste lisible en clavier, tactile et contraste renforcé.
- [ ] **A106 — Repenser le CTA d’accueil :** réserver un bouton principal à l’action utile et un bouton secondaire à la découverte ou aux boutiques ; validation : aucun bouton décoratif ne renvoie vers une mauvaise page.
- [ ] **A107 — Structurer le footer :** organiser `Explorer`, `Aide`, `WOOD`, `Légal` et contacts en colonnes desktop puis accordéons mobile ; validation : numéros associés à Barla/Borriglione, adresses exactes et aucun point final indésirable.
- [ ] **A108 — Harmoniser les liens de boutiques :** associer explicitement chaque numéro, adresse, itinéraire et bouton d’appel à `BARLA` ou `BORRIGLIONE` ; validation : aucun visiteur ne doit deviner quel numéro appartient à quelle boutique.

### Cartes, grille et présentation des produits

- [ ] **A109 — Définir la carte produit WOOD finale :** média, badge d’univers, niveau, nom, disponibilité, grammage, prix et action dans un ordre stable ; validation : la carte reste lisible sans photo réelle et sans données décoratives.
- [ ] **A110 — Mettre en scène la photo sous cloche :** réserver un cadre visuel constant pour les fleurs et résines, sans étirer ni recadrer abusivement les futures photos ; validation : ratio identique sur les quatre catégories et sur les deux thèmes d’écran.
- [ ] **A111 — Définir le bloc d’identification :** afficher `CBD boosté (strong)`, `CBD soft (medium)` ou `CBD classique` juste sous l’univers, avec une hiérarchie discrète ; validation : aucune recherche par nom ni filtre n’est ajouté.
- [ ] **A112 — Aligner les titres :** réserver une hauteur stable, autoriser deux lignes visibles et conserver le nom complet pour l’accessibilité ; validation : Nimbus, Ivory, Velvet Kush et les noms futurs restent alignés.
- [ ] **A113 — Reproduire la richesse utile des cartes :** afficher uniquement les métadonnées WOOD validées, jamais des avis, taux, économies ou prix barrés inventés ; validation : un audit statique détecte toute donnée décorative non sourcée.
- [ ] **A114 — Repenser le sélecteur de grammage :** rendre le bloc `− / quantité en g / +` immédiatement compréhensible, avec départ à 1 g et feedback discret ; validation : aucune action n’est cachée par une animation ou par une carte voisine.
- [ ] **A115 — Afficher prix et grammage près de l’action :** maintenir le format `grammage choisi · total` et le prix au gramme à proximité du bouton ; validation : chaque variété utilise ses propres paliers de l’affiche et sa propre réduction à 25 g.
- [ ] **A116 — Définir les actions de carte :** différencier consulter la fiche et ajouter au panier, sans clic ambigu sur toute la carte ; validation : le clic image/titre ouvre la fiche, le bouton ajoute seulement la variante choisie.
- [ ] **A117 — Définir les états visuels de disponibilité :** disponible, bientôt disponible, rupture, photo à venir et fiche incomplète ; validation : l’état est visible sans inventer un stock et interdit l’achat si les données sont insuffisantes.
- [ ] **A118 — Stabiliser la grille desktop :** conserver trois produits par ligne, égaliser médias, titres, contrôles et actions, sans cartes étirées artificiellement ; validation : les quatre pages boutique sont alignées à 1024, 1280 et 1440 px.
- [ ] **A119 — Stabiliser la grille mobile :** afficher quatre cases dans un bloc `2 × 2` quand la largeur le permet, puis réduire proprement sans couper titre, prix ou bouton ; validation : test à 320, 360, 375, 390, 430 et 480 px.
- [ ] **A120 — Finaliser la tablette et les grands écrans :** choisir 2/3 colonnes, largeur de conteneur, espaces et taille des médias selon la place réelle ; validation : aucune dépendance à un modèle d’appareil et aucune barre horizontale.

### Fiches, textes, emojis, animations et contrôle final

- [ ] **A121 — Composer la fiche produit :** grande photo, identité, description, achat, livraison, qualité et produits liés dans cet ordre ; validation : le client voit le prix et l’action avant les informations secondaires.
- [ ] **A122 — Écrire les textes de fiches :** créer une voix WOOD directe, chic et accessible, sans copier le vocabulaire de TealerLab ni faire d’allégation médicale ; validation : textes courts, relus et validés par la propriétaire.
- [ ] **A123 — Prévoir les emojis avec parcimonie :** utiliser uniquement un petit jeu choisi par WOOD dans les zones éditoriales ou badges, jamais dans le prix, le paiement ou les erreurs ; validation : le rendu reste premium si les emojis sont désactivés ou absents.
- [ ] **A124 — Préparer les stickers et graffiti :** intégrer les futurs visuels transmis par la propriétaire dans des emplacements réservés, avec variantes desktop/mobile ; validation : aucun asset inventé n’est publié avant validation.
- [ ] **A125 — Ajouter l’humour WOOD :** prévoir des micro-formules et annotations qui donnent du caractère sans gêner la compréhension ni banaliser une commande ; validation : chaque phrase humoristique a une version neutre et n’apparaît pas dans les messages d’erreur.
- [ ] **A126 — Ajouter les transitions de page :** prévoir une transition courte entre accueil, univers et fiche, avec conservation du scroll et respect du bouton retour ; validation : aucune transition ne bloque la navigation ou ne fait sauter le contenu.
- [ ] **A127 — Ajouter les animations de cartes :** hover desktop, feedback tactile mobile, apparition douce et zoom de fiche limité à `transform/opacity` ; validation : aucune animation ne change la géométrie, le prix ou la zone de clic.
- [ ] **A128 — Ajouter une chorégraphie de scroll :** révéler les sections avec une cadence régulière, sans scroll-jacking ni déplacement de document ; validation : le contenu reste complet sans JavaScript et avec `prefers-reduced-motion`.
- [ ] **A129 — Prévoir un fallback sans mouvement :** désactiver les animations non essentielles, garder les états actifs et afficher immédiatement l’information ; validation : recette avec réduction de mouvement, faible puissance et réseau lent.
- [ ] **A130 — Prévenir les sauts de chargement :** réserver les dimensions, utiliser des placeholders WOOD et charger les médias progressivement ; validation : aucun bouton ou prix ne se déplace pendant le chargement.
- [ ] **A131 — Harmoniser les états d’attente et d’erreur :** créer des skeletons sobres, erreurs compréhensibles et boutons `Réessayer` cohérents ; validation : panier et formulaire restent utilisables après panne réseau.
- [ ] **A132 — Contrôler les microcopies de panier :** confirmer produit, variété, grammage, quantité, total et livraison sans jargon ; validation : le client sait exactement ce qu’il va payer avant Viva.
- [ ] **A133 — Contrôler FAQ et aides :** utiliser accordéons, pictogrammes et réponses courtes avec la même hiérarchie que TealerLab, mais avec le contenu WOOD confirmé ; validation : aucune réponse n’invente frais, délais, promotions ou retrait.
- [ ] **A134 — Contrôler la page boutiques :** rendre les deux adresses, numéros, horaires à confirmer, itinéraires et carte actuelle lisibles sur chaque largeur ; validation : aucun point après `BARLA` ou `BORRIGLIONE` et aucun numéro non associé.
- [ ] **A135 — Vérifier les textes visibles globalement :** orthographe, accents, casse, ponctuation, libellés `WOOD`, `CBD / NICE`, titres, CTA et messages d’état ; validation : une relecture manuelle propriétaire est enregistrée.
- [ ] **A136 — Vérifier les icônes et zones tactiles :** taille minimale, espacement, focus, contraste et absence de clics superposés ; validation : le menu, le panier, les `+/-` et les CTA sont utilisables au pouce.
- [ ] **A137 — Constituer la matrice visuelle :** captures de toutes les routes à `320/375/390/430/768/1024/1280/1440/1920` px en portrait et paysage ; validation : chaque capture est comparée à la référence et classée par anomalie.
- [ ] **A138 — Tester les navigateurs graphiques :** Safari iOS/macOS, Chrome Android/Windows, Edge, Firefox et Linux ; validation : aucun défaut de police, image, animation, grille ou menu ne reste sans décision.
- [ ] **A139 — Faire une revue “propriétaire” :** contrôler identité WOOD, couleurs, logo, ton premium/chill/graffiti, cloches, simplicité et absence de promotion ; validation : aucune modification graphique majeure n’est retenue sans accord.
- [ ] **A140 — Faire une revue “conjoint” :** contrôler énergie de la page d’accueil, présentation des produits, densité, menu, animations et ressemblance de structure avec TealerLab ; validation : la ressemblance porte sur l’expérience, jamais sur les assets ou textes copiés.

### Fiche d’exécution visuelle mise à jour des tags `A81–A140`

Chaque tag doit être traité avec une capture avant/après et un test de non-régression. Les fichiers indiqués sont les premiers points d’entrée ; une validation propriétaire est obligatoire dès qu’un contenu ou un visuel est nouveau.

- **A81** — Fichiers : captures Playwright, `docs/audits/`, `docs/ops/visual-baseline.md`. Validation : inventaire desktop/tablette/mobile archivé.
- **A82** — Fichiers : roadmap, compte-rendu propriétaire, `boutique.css`. Validation : proportions premium/chill/graffiti/humour approuvées.
- **A83** — Fichiers : `index.html`, `boutique.css`, captures. Validation : progression de l’accueil lisible sans zone vide inexpliquée.
- **A84** — Fichiers : `boutique.css`, `responsive.css`, `mobile.css`. Validation : aucun composant ne crée une couleur ou un effet hors tokens.
- **A85** — Fichiers : CSS global, toutes les pages HTML, test responsive. Validation : titres, accents et textes longs ne débordent pas.
- **A86** — Fichiers : `index.html`, assets graphiques validés, CSS éditorial. Validation : aucun accent ne recouvre une action critique.
- **A87** — Fichiers : asset logo officiel, header partagé, test visuel. Validation : logo pixel-identique au fichier validé, sans branche basse inventée.
- **A88** — Fichiers : icônes partagées, `mobile-shell.js`, CSS. Validation : pictogrammes cohérents, accessibles et utilisables au toucher.
- **A89** — Fichiers : composants de carte, `storefront.js`, audit statique. Validation : badges limités aux données WOOD confirmées.
- **A90** — Fichiers : textes partagés, `README.md`, pages HTML. Validation : libellés et états utilisent le même vocabulaire partout.
- **A91** — Fichiers : `index.html`, hero CSS, assets. Validation : hero lisible au premier écran, CTA hiérarchisés et sans copie de campagne.
- **A92** — Fichiers : contenu validé par la propriétaire, `index.html`. Validation : ton WOOD, français relu, aucune promesse non autorisée.
- **A93** — Fichiers : `assets/`, `index.html`, CSS médias. Validation : ratio stable, placeholder propre et aucune mise en page vide.
- **A94** — Fichiers : bandeau partagé, `index.html`, quatre pages boutique. Validation : livraison annoncée sans frais/délai inventés.
- **A95** — Fichiers : `index.html`, `wood-shop.html`, `boutique.css`. Validation : quatre univers et destinations vérifiés.
- **A96** — Fichiers : textes de catégories, `fleurs.html`, `resines.html`, `bien-etre.html`. Validation : descriptions courtes, factuelles et sans allégation médicale.
- **A97** — Fichiers : `index.html`, `storefront.js`, Supabase `products`. Validation : zéro produit fictif ou non disponible dans la sélection.
- **A98** — Fichiers : `boutique.js`, CSS rails, tests responsive. Validation : overflow local uniquement, boutons et fallback fonctionnels.
- **A99** — Fichiers : sections réassurance, `location-contact.test.mjs`, contenu propriétaire. Validation : chaque preuve affichée est sourcée.
- **A100** — Fichiers : `index.html`, captures desktop/mobile, roadmap. Validation : séquence WOOD validée avant intégration.
- **A101** — Fichiers : header partagé, `responsive.css`, captures 1024–1920. Validation : header stable sans concurrence visuelle.
- **A102** — Fichiers : `mobile-shell.js`, `mobile.css`, `index.html`. Validation : logo, menu, panier et compte restent dans la zone sûre.
- **A103** — Fichiers : menu partagé, `navigation-accessibility.test.mjs`. Validation : aucune entrée admin côté public.
- **A104** — Fichiers : menu CSS/HTML, textes de navigation. Validation : groupes compréhensibles par un utilisateur non technique.
- **A105** — Fichiers : navigation JS/CSS, tests clavier/tactile. Validation : focus, hover, actif et désactivé sont visibles.
- **A106** — Fichiers : hero et CTA, `links.test.mjs`. Validation : chaque CTA a une destination réelle et unique.
- **A107** — Fichiers : `index.html`, footer partagé, `mobile.css`. Validation : footer desktop/mobile sans colonnes coupées.
- **A108** — Fichiers : contacts et page boutiques, `location-contact.test.mjs`. Validation : numéro et adresse associés au bon magasin.
- **A109** — Fichiers : `storefront.js`, `boutique.css`, composants carte. Validation : ordre média → identité → prix → action identique partout.
- **A110** — Fichiers : assets cloche, CSS média, documentation des photos. Validation : pas d’étirement, de recadrage trompeur ou d’image inventée.
- **A111** — Fichiers : données produit, `boutique.js`, cartes. Validation : niveau strong/medium/classique visible sans filtre ajouté.
- **A112** — Fichiers : CSS cartes, test catalog grid. Validation : titres longs alignés et accessibles.
- **A113** — Fichiers : `storefront.js`, audit statique, fixtures produits. Validation : aucune métadonnée fictive.
- **A114** — Fichiers : `boutique.js`, `flower-pricing.js`, CSS contrôles. Validation : `− / g / +` part de 1 g et répond au clavier/toucher.
- **A115** — Fichiers : `boutique.js`, `flower-pricing-guard.test.mjs`, affiche tarifaire. Validation : total et prix au gramme propres à chaque variété.
- **A116** — Fichiers : cartes, `links.test.mjs`, détail produit. Validation : image/titre ouvrent la fiche et seul le CTA ajoute.
- **A117** — Fichiers : `storefront.js`, disponibilité Supabase, CSS états. Validation : aucun achat possible sans prix/stock validés.
- **A118** — Fichiers : `boutique.css`, `responsive.css`, `catalog-grid.test.mjs`. Validation : trois cartes desktop alignées dans tous les univers.
- **A119** — Fichiers : `mobile.css`, `responsive-layout.test.mjs`. Validation : grille mobile 2 × 2 lisible à toutes les largeurs cibles.
- **A120** — Fichiers : `responsive.css`, captures tablette/large écran. Validation : colonnes et marges s’adaptent sans barre horizontale.
- **A121** — Fichiers : `fleur.html`, `flower-detail.js`, CSS fiche. Validation : achat avant contenu secondaire, sans déplacement du prix.
- **A122** — Fichiers : textes de fiches, documentation de validation. Validation : copie WOOD relue et non copiée.
- **A123** — Fichiers : badges éditoriaux, assets emojis, CSS. Validation : emojis optionnels, modérés et jamais critiques.
- **A124** — Fichiers : assets graffiti/stickers transmis, `index.html`, CSS. Validation : aucun graphisme généré sans référence validée.
- **A125** — Fichiers : micro-copy, états d’erreur, FAQ. Validation : humour séparé des erreurs, commandes et informations légales.
- **A126** — Fichiers : navigation JS, transitions CSS, tests retour arrière. Validation : retour et scroll restaurés sans blocage.
- **A127** — Fichiers : `boutique.js`, `flower-detail.js`, CSS motion. Validation : transform/opacity uniquement pour les zooms et feedbacks.
- **A128** — Fichiers : `mobile-shell.js`, CSS reveal, test motion. Validation : pas de scroll-jacking ni de contenu dépendant du mouvement.
- **A129** — Fichiers : CSS `prefers-reduced-motion`, tests accessibilité. Validation : contenu et actions restent immédiatement disponibles.
- **A130** — Fichiers : CSS médias, placeholders, Playwright. Validation : aucun CLS visible sur les cartes, prix ou CTA.
- **A131** — Fichiers : états partagés, panier, formulaire, tests réseau. Validation : attente/erreur/retry ne perdent jamais le panier.
- **A132** — Fichiers : `checkout.html`, panier, textes de commande. Validation : grammage, quantité, total et livraison sont explicites.
- **A133** — Fichiers : FAQ, `location-contact.test.mjs`, accordéons. Validation : réponses factuelles, accessibles et sans retrait/promo inventés.
- **A134** — Fichiers : page boutiques, carte existante, contacts. Validation : les deux magasins restent lisibles et la carte est conservée.
- **A135** — Fichiers : toutes les pages publiques, dictionnaire de textes. Validation : relecture zéro faute bloquante et libellés cohérents.
- **A136** — Fichiers : CSS interactif, navigation et contrôles grammes. Validation : zones tactiles non superposées et focus visible.
- **A137** — Fichiers : captures Playwright, `docs/ops/visual-matrix.md`. Validation : matrice complète signée avec anomalies classées.
- **A138** — Fichiers : scripts Playwright et navigateurs listés dans A79. Validation : aucune différence critique non expliquée.
- **A139** — Fichiers : compte-rendu propriétaire, captures finales, roadmap. Validation : identité WOOD confirmée avant intégration.
- **A140** — Fichiers : compte-rendu conjoint, captures accueil/boutique, roadmap. Validation : énergie TealerLab validée sans copie d’assets, de textes ou de couleurs.

## Audit de production visuelle et contenu catalogue — tags `A141–A160`

Ce bloc transforme l’audit TealerLab en un système WOOD exploitable sans inventer de variété, de tarif, de stock, d’avis ou de promesse produit. Les visuels ajoutés maintenant sont des images de maquette distinctes, à remplacer par les photos validées de la propriétaire avant une mise en production réelle.

- [x] **A141 — Marquer clairement les visuels de maquette :** conserver le statut de démonstration non officielle du site et documenter que les images générées ne sont pas les photos réelles des produits ; validation : aucun visiteur ne peut raisonnablement les confondre avec une preuve de stock ou d’origine.
- [x] **A142 — Verrouiller le registre des variétés :** conserver exactement les 13 noms actuels — Nimbus 3000, Ivory, Velvet Kush, Pastraweed, Euphoria, Purple, Bloody Mary, Cosmic CBG, Charlotte, Rainbow, Orange Bud, Plutonium et Fanta Hazy — sans ajout de nom inventé ; validation : contrôle automatique des IDs, noms et compte total.
- [x] **A143 — Associer un visuel distinct à chaque variété :** créer un registre local déterministe liant chaque ID à une image différente sous cloche ; validation : aucune variété ne retombe silencieusement sur le visuel générique quand son asset de maquette existe.
- [x] **A144 — Préserver les prix et le parcours de grammage :** ne modifier ni la carte 1/3/5/10/25 g, ni les tarifs par variété, ni les contrôles `+/-`, ni l’ajout au panier ; validation : comparaison avant/après des options et calculs de prix.
- [x] **A145 — Ajouter des descriptions éditoriales de démonstration :** donner à chaque variété une phrase différente, sobre et visuelle, avec quelques emojis cohérents avec l’énergie WOOD ; validation : aucun effet, bénéfice, taux, avis ou argument légal n’est inventé.
- [x] **A146 — Conserver la hiérarchie produit TealerLab adaptée à WOOD :** visuel d’abord, catégorie WOOD ensuite, nom exact, description courte, choix du grammage, prix calculé et CTA ; validation : le chemin de lecture reste identique sur carte statique, catalogue Supabase et fiche détail.
- [x] **A147 — Définir le langage des emojis :** utiliser les emojis comme ponctuation éditoriale légère, sans transformer les fiches en publicité criarde ; validation : maximum maîtrisé, aucun emoji ne remplace une information essentielle et chaque carte reste lisible sans emoji.
- [x] **A148 — Préparer les stickers et touches graffiti WOOD :** réserver les stickers aux emplacements validés par la propriétaire et au système graphique WOOD ; validation : aucun asset TealerLab, logo tiers ou slogan copié n’est intégré.
- [x] **A149 — Maintenir la présentation sous cloche :** garder une mise en scène qualitative et homogène des fleurs/résines, avec un cadrage produit stable ; validation : pas de coupe de la fleur, du contenant ou de la cloche sur les trois paliers responsive.
- [x] **A150 — Rendre le remplacement des images sans risque :** centraliser les chemins dans `flower-presentation.js` plutôt que disperser les URLs dans les pages ; validation : remplacer une image ne demande pas de toucher aux prix, au panier ou aux données Supabase.
- [x] **A151 — Définir le contrat des images réelles futures :** prévoir photo nette, fond cohérent, nom de fichier contrôlé, alt text, crédit/source et validation propriétaire ; validation : une photo fournie peut remplacer le visuel de démo sans changement de structure.
- [x] **A152 — Éviter le conflit avec `image_path` Supabase :** faire primer le registre local de démonstration pour les fleurs pendant la maquette, sans écrire la base de production ; validation : aucune migration ni mise à jour de produit n’est déclenchée par le simple affichage.
- [x] **A153 — Aligner le rendu dynamique et statique :** appliquer le même visuel, texte et alt text aux cartes HTML de secours, au catalogue Supabase et à la fiche produit ; validation : comparaison DOM des trois parcours pour les 13 IDs.
- [ ] **A154 — Préparer le futur espace propriétaire des médias :** permettre plus tard de valider une photo réelle, son statut et son remplacement depuis l’administration sans exposer le chemin technique au client ; validation : permission admin séparée et fallback sûr.
- [ ] **A155 — Ajouter un contrôle de qualité des assets :** vérifier dimensions, format, poids, contraste, présence de texte parasite, watermark et transparence inattendue ; validation : un asset non conforme est refusé avant publication.
- [ ] **A156 — Optimiser sans dégrader la qualité :** produire une version moderne compressée avec fallback, lazy-loading hors écran et priorité mesurée pour le premier visuel ; validation : budget mobile défini et absence de CLS ou de flou visible.
- [ ] **A157 — Réserver les animations aux moments utiles :** apparition douce, léger mouvement d’image, zoom de fiche et transitions de page inspirés de l’expérience TealerLab, sans scroll-jacking ; validation : `prefers-reduced-motion`, clavier et tactile restent pleinement fonctionnels.
- [ ] **A158 — Tester les cartes sur les vraies compositions :** desktop en grille, tablette en densité intermédiaire, mobile en deux colonnes quand la largeur le permet et une colonne seulement si la lisibilité l’exige ; validation : aucun prix, CTA, emoji ou nom ne déborde.
- [ ] **A159 — Organiser la validation propriétaire/conjoint :** produire une planche avant/après centrée sur l’accueil, la présentation des fleurs, le menu et les animations ; validation : la propriétaire valide l’identité WOOD et son conjoint valide l’énergie de présentation, séparément.
- [ ] **A160 — Remplacer les assets de démo au dernier moment :** conserver un commit/branche de sauvegarde, remplacer uniquement les fichiers et le registre approuvés, puis rejouer la recette complète ; validation : rollback possible et aucun changement non demandé de couleur, logo, carte, prix ou navigation.

### Fiche d’exécution catalogue et images des tags `A141–A160`

- **A141** — Fichiers : `README.md`, pied de page, audit. Validation : statut de maquette visible et documenté.
- **A142** — Fichiers : `flower-presentation.js`, `flower-detail.js`, `test/flower-presentation.test.mjs`. Validation : 13 IDs, 13 noms exacts, zéro doublon.
- **A143** — Fichiers : `assets/products/fleurs/`, `flower-presentation.js`. Validation : 13 chemins distincts accessibles.
- **A144** — Fichiers : `fleurs.html`, `boutique.js`, `flower-pricing.js`. Validation : carte tarifaire et prix intermédiaires inchangés.
- **A145** — Fichiers : registre éditorial, cartes et fiche. Validation : une description par variété, sans allégation.
- **A146** — Fichiers : `storefront.js`, `boutique.js`, `flower-detail.js`. Validation : même ordre de lecture sur les trois rendus.
- **A147** — Fichiers : registre de textes, tests visuels. Validation : les emojis restent décoratifs et non indispensables.
- **A148** — Fichiers : `assets/`, CSS WOOD, validation propriétaire. Validation : aucune reprise d’asset tiers.
- **A149** — Fichiers : assets produits, `boutique.css`, matrice responsive. Validation : cadrage stable et cloche lisible.
- **A150** — Fichiers : `flower-presentation.js`, script de préparation Hostinger. Validation : remplacement centralisé.
- **A151** — Fichiers : procédure médias, fiche de validation. Validation : photo réelle traçable et validée.
- **A152** — Fichiers : `storefront.js`, Supabase, tests réseau. Validation : zéro écriture au chargement.
- **A153** — Fichiers : trois pages de rendu, test d’intégration. Validation : visuel et texte identiques selon la source du catalogue.
- **A154** — Fichiers : dashboard propriétaire, RLS et stockage Supabase. Validation : média privé tant qu’il n’est pas publié.
- **A155** — Fichiers : script d’audit média, CI. Validation : rejet explicite des assets non conformes.
- **A156** — Fichiers : pipeline assets, HTML, CSS, Playwright. Validation : poids et CLS sous budget défini.
- **A157** — Fichiers : CSS motion, navigation, tests clavier/tactile. Validation : animation fluide et désactivable.
- **A158** — Fichiers : `responsive.css`, `mobile.css`, `boutique.css`, captures. Validation : aucune anomalie d’alignement classée critique.
- **A159** — Fichiers : planche de revue, captures desktop/mobile, roadmap. Validation : deux validations distinctes consignées.
- **A160** — Fichiers : branche de sauvegarde, registre, assets, recette. Validation : diff minimal, rollback testé et recette verte.

## Seconde passe d’audit TealerLab → WOOD — tags `A161–A190`

La relecture de l’accueil, du catalogue et d’une fiche produit TealerLab confirme que son impact vient surtout de la scénarisation : une barre de service, une navigation très actionnable, un hero immersif, un rythme de rails éditoriaux, des cartes riches, puis des blocs de guide, de sélection et de réassurance. Les opérations TealerLab — promotions, fidélité, parrainage, avis, compteurs, promesses de délai et données d’effets — restent volontairement exclues de WOOD tant qu’elles ne sont pas demandées et validées.

- [ ] **A161 — Créer une annonce de service WOOD :** reprendre l’idée d’un bandeau immédiatement visible pour signaler la livraison disponible, sans inventer de frais, de délai ou de seuil ; validation : le message est court, stable et cohérent sur chaque page boutique.
- [ ] **A162 — Conserver un accès direct au contenu :** reprendre le lien d’évitement et une hiérarchie sémantique nette avant les animations ; validation : clavier, lecteur d’écran et utilisateur pressé atteignent le contenu sans traverser le hero.
- [ ] **A163 — Organiser le header par intentions :** distinguer menu, recherche éventuelle non activée, compte, panier et CTA `Venir chez WOOD`, sans ajouter de fonctionnalité non validée ; validation : chaque action est identifiable au premier regard et aucune concurrence visuelle ne détruit le logo.
- [ ] **A164 — Construire le menu comme un mini-catalogue :** groupes `Nos univers`, `Aide`, `Compte` et `Panier`, avec labels et séparateurs simples inspirés de la profondeur TealerLab ; validation : pas de recherche par nom, pas de filtre et jamais de menu admin côté public.
- [ ] **A165 — Recomposer le hero WOOD en scène éditoriale :** associer manifeste court, indication `Nice, France · depuis 2020`, bouton principal et visuel botanique sous cloche ; validation : le hero reste WOOD, conserve ses couleurs et n’imite pas une campagne TealerLab.
- [ ] **A166 — Ajouter un repère de défilement discret :** reprendre l’idée d’un `Scroll`/repère de progression sans forcer le mouvement ; validation : le clic défile naturellement, le clavier et la réduction de mouvement restent prioritaires.
- [ ] **A167 — Prévoir un ticker WOOD non promotionnel :** faire défiler une phrase de service, de sélection ou d’identité validée, sans remise, cadeau, compte à rebours ou affirmation non sourcée ; validation : le ticker ne masque jamais un prix, un CTA ou un contenu.
- [ ] **A168 — Installer un bloc “sélection du moment” :** mettre en avant quelques fleurs réellement publiées avec intro éditoriale, visuels distincts et lien `Voir toutes les fleurs` ; validation : la sélection ne crée pas de faux best-seller ni de préférence inventée.
- [ ] **A169 — Créer des rails produits lisibles :** reprendre l’énergie des rails TealerLab tout en gardant la grille WOOD demandée et un retour à la ligne contrôlé selon l’écran ; validation : desktop, tablette et mobile n’obligent jamais le client à deviner qu’il faut faire défiler horizontalement.
- [ ] **A170 — Ajouter un état éditorial de nouveauté sans promesse :** prévoir un badge `Nouveau` uniquement lorsqu’une référence est réellement nouvelle et validée ; validation : aucun badge `best-seller`, `populaire`, `pro` ou note n’est généré automatiquement.
- [ ] **A171 — Rendre le prix aussi informatif que chez TealerLab, sans remise :** afficher le grammage sélectionné, le total et éventuellement le prix au gramme uniquement si le calcul WOOD est exact ; validation : aucune comparaison barrée ou économie fictive n’est visible.
- [ ] **A172 — Présenter les variantes comme un choix clair :** transformer les contrôles 1/3/5/10/25 g en choix visibles ou `+/-` selon le contexte, avec un seul état actif ; validation : la carte tarifaire de chaque variété reste la source et 25 g reste le plafond de réduction connu.
- [ ] **A173 — Prévoir une action d’achat mobile persistante avec mesure :** étudier une barre d’ajout au panier en bas de la fiche, seulement si elle ne masque pas les contrôles ; validation : un prototype est testé à 320–430 px, puis retenu uniquement s’il réduit les erreurs.
- [ ] **A174 — Composer la fiche produit en profondeur progressive :** média, nom, profil WOOD, description, grammage, prix, disponibilité, ajout, livraison à confirmer, puis détails secondaires ; validation : l’action principale est visible sans sacrifier la présentation premium.
- [ ] **A175 — Ajouter une galerie produit sans surcharge :** prévoir une image principale et quelques vues réelles futures sous cloche, sans carrousel obligatoire pour une seule photo ; validation : chaque image a un alt text, une taille réservée et une fermeture tactile fiable.
- [ ] **A176 — Ajouter un bloc de garanties seulement avec des preuves WOOD :** réserver l’emplacement à conformité, qualité, préparation et service, mais n’afficher aucune phrase avant validation documentaire ; validation : le bloc peut rester vide ou masqué sans créer de trou visuel.
- [ ] **A177 — Préparer la section livraison sans la publier trop tôt :** reproduire la clarté d’un bloc livraison/expédition, mais laisser les zones inconnues à confirmer par la propriétaire ; validation : le site ne promet ni délai, ni transporteur, ni tarif non validé.
- [ ] **A178 — Encadrer les descriptions et claims :** autoriser une voix WOOD imagée, des emojis et un humour léger, mais interdire les effets, bénéfices médicaux, taux et qualités non fournis ; validation : revue éditoriale sur les 13 fiches avant publication.
- [ ] **A179 — Préparer une zone communauté non active :** étudier un futur bloc de photos/stickers/graffiti de la boutique, sans faux témoignage, faux compte social ou contenu récupéré ; validation : aucun contenu communautaire n’est affiché sans autorisation.
- [ ] **A180 — Préparer les avis sans les simuler :** réserver la hiérarchie visuelle d’une note et de commentaires comme sur TealerLab, mais afficher un état vide tant que la propriétaire ne fournit pas de données vérifiables ; validation : aucun nombre ou étoile inventé.
- [ ] **A181 — Prévoir les produits associés avec retenue :** proposer des liens vers le même univers ou une autre catégorie WOOD après l’achat, sans remise automatique ni ajout forcé ; validation : la fiche principale garde la priorité et les liens sont testés.
- [ ] **A182 — Étudier le “guide” sans créer de quiz :** transformer l’idée de guidage TealerLab en quatre entrées WOOD — Fleurs, Résines, Bien-être, WOOD Shop — puisque la propriétaire ne veut ni recherche ni filtre ; validation : le client comprend où commencer sans collecte supplémentaire.
- [ ] **A183 — Créer des sections éditoriales respirées :** alterner fond WOOD, visuel pleine largeur, texte court, grille et espace de respiration pour retrouver la mise en scène sans copier le layout ; validation : le hero, les produits et les informations pratiques ne se concurrencent pas.
- [ ] **A184 — Définir les états d’interaction des cartes :** hover desktop, appui mobile, focus clavier, chargement, rupture, image indisponible et retour d’erreur ; validation : chaque état est visible, stable et n’agrandit pas une colonne voisine.
- [ ] **A185 — Protéger les animations de contenu :** séquencer apparitions, zoom, ticker et transitions avec `transform/opacity`, délais courts et annulation sur navigation ; validation : pas de saut, pas de latence perceptible et pas de scroll-jacking.
- [ ] **A186 — Prévoir une version mobile réellement recomposée :** adapter ordre, densité, header, rails, CTA et footer comme une application mobile dans le thème WOOD, au lieu de réduire le desktop ; validation : tests à 320, 375, 390, 430 et 480 px.
- [ ] **A187 — Prévoir une version tablette et ordinateur distinctes :** utiliser les paliers de largeur et la place disponible pour choisir 2/3/4 colonnes, sans dépendre du modèle d’appareil ; validation : Windows, macOS, Linux, Safari, Chrome, Edge et Firefox restent cohérents.
- [ ] **A188 — Stabiliser le chargement réel :** réserver toutes les zones média, précharger uniquement le hero, charger les autres images progressivement et conserver un fallback si Supabase est lent ; validation : prix, CTA et boutons ne bougent pas.
- [ ] **A189 — Comparer l’expérience par captures :** constituer une grille avant/après de l’accueil TealerLab observé et du prototype WOOD, avec contrôles de structure, rythme, lisibilité, identité et accessibilité ; validation : la ressemblance est fonctionnelle et la différence de marque est évidente.
- [ ] **A190 — Faire signer la version de référence :** conserver une capture desktop, mobile et tablette validée par la propriétaire et son conjoint avant d’engager la refonte ; validation : tout changement ultérieur est comparé à cette référence et peut être restauré.

### Fiche d’exécution accueil et expérience des tags `A161–A190`

- **A161** — Fichiers : bandeau partagé, `mobile.css`, textes validés. Validation : livraison annoncée sans règle inventée.
- **A162** — Fichiers : HTML public, navigation clavier, tests accessibilité. Validation : contenu accessible avant animation.
- **A163** — Fichiers : header commun, `responsive.css`, `mobile-shell.js`. Validation : actions principales équilibrées.
- **A164** — Fichiers : menus des pages, textes de navigation, tests liens. Validation : groupes simples et aucun admin public.
- **A165** — Fichiers : `index.html`, assets WOOD validés, CSS hero. Validation : hero WOOD approuvé desktop/mobile.
- **A166** — Fichiers : hero, CSS scroll cue, tests retour. Validation : repère non bloquant.
- **A167** — Fichiers : ticker, CSS motion, dictionnaire éditorial. Validation : aucun message promotionnel non autorisé.
- **A168** — Fichiers : accueil, registre produit, tests catalogue. Validation : sélection réelle et lien complet.
- **A169** — Fichiers : `boutique.css`, `responsive.css`, captures. Validation : rails/grilles lisibles sans geste caché.
- **A170** — Fichiers : badges produit, données Supabase, validation propriétaire. Validation : badge uniquement sur donnée confirmée.
- **A171** — Fichiers : `boutique.js`, `flower-pricing.js`, panier. Validation : prix et grammage cohérents.
- **A172** — Fichiers : cartes fleurs, contrôles grammes, tests prix. Validation : une variante active et tarifs exacts.
- **A173** — Fichiers : fiche produit, CSS mobile, Playwright. Validation : CTA mobile non masquant.
- **A174** — Fichiers : `flower-detail.js`, `fleur.html`, CSS fiche. Validation : achat et informations dans le bon ordre.
- **A175** — Fichiers : registre média, galerie future, accessibilité. Validation : vues réelles remplaçables sans refonte.
- **A176** — Fichiers : bloc réassurance, documents propriétaires. Validation : aucun claim sans preuve.
- **A177** — Fichiers : checkout, FAQ, paramètres livraison. Validation : règles inconnues restent explicitement à confirmer.
- **A178** — Fichiers : descriptions, revue éditoriale, audit légal. Validation : voix WOOD sans allégation.
- **A179** — Fichiers : zone communauté future, consentements. Validation : aucun contenu tiers non autorisé.
- **A180** — Fichiers : composants avis, fixtures vides, audit. Validation : zéro note ou témoignage fabriqué.
- **A181** — Fichiers : fiches et routes catégories, tests liens. Validation : recommandations non intrusives.
- **A182** — Fichiers : quatre univers, menu et accueil. Validation : guidage sans recherche ni filtre.
- **A183** — Fichiers : `index.html`, `responsive.css`, assets. Validation : rythme visuel respiré.
- **A184** — Fichiers : cartes, états CSS/JS, tests pointer/keyboard. Validation : tous les états sont utilisables.
- **A185** — Fichiers : motion CSS/JS, navigation, tests performance. Validation : animations fluides et annulables.
- **A186** — Fichiers : `mobile.css`, `mobile-shell.js`, vues mobile. Validation : recomposition application-like sans suppression de contenu.
- **A187** — Fichiers : `responsive.css`, matrice navigateurs. Validation : paliers cohérents sur Windows/macOS/Linux.
- **A188** — Fichiers : assets, placeholders, Supabase fallback. Validation : zéro déplacement critique au chargement.
- **A189** — Fichiers : captures comparatives, `docs/audits/`, checklist. Validation : comparaison documentée et non copieuse.
- **A190** — Fichiers : captures signées, branche de sauvegarde, roadmap. Validation : référence propriétaire/conjoint archivée.

## Direction artistique WOOD approfondie — tags `A191–A240`

Ce bloc répond précisément à la demande de la propriétaire : WOOD doit rester chic et premium tout en assumant une énergie chill, graffiti, stickers et humoristique. Le principe est de créer une tension maîtrisée entre une base éditoriale propre — grands espaces, hiérarchie forte, photos de qualité, prix lisibles — et des accents graphiques plus spontanés. Aucun accent ne doit modifier la palette, le logo, la typographie validée ou la simplicité du parcours.

### Premium, rythme et composition

- [ ] **A191 — Définir la proportion premium/chill/graffiti :** établir une règle mesurable par page, avec une base premium dominante et des accents graffiti ponctuels ; validation : aucune page ne ressemble à une affiche saturée.
- [ ] **A192 — Créer une grille artistique WOOD :** fixer conteneur, marges, colonnes, lignes de base, espaces négatifs et points d’ancrage ; validation : hero, cartes, cloches et blocs texte partagent la même structure.
- [ ] **A193 — Définir trois niveaux de densité :** `calme`, `sélection`, `impact`, pour éviter que chaque section ait la même intensité ; validation : chaque page possède une respiration entre deux moments forts.
- [ ] **A194 — Construire un système de contraste interne :** utiliser les couleurs existantes par niveaux de fond, bordure, texte et accent, sans créer de nouvelle palette ; validation : contraste lisible et identité inchangée.
- [ ] **A195 — Préparer une hiérarchie de titres WOOD :** kicker, titre principal, sous-titre, phrase courte et action ; validation : le regard comprend la section avant de lire tous les détails.
- [ ] **A196 — Organiser les masses visuelles :** alterner bloc sombre, bloc botanique, carte et zone claire sans mosaïque aléatoire ; validation : la page garde un rythme haut de gamme sur mobile et desktop.
- [ ] **A197 — Créer des séparateurs propriétaires :** imaginer lignes, points, repères et cadres inspirés de WOOD, sans reprendre les signes TealerLab ; validation : chaque séparateur sert la lecture et peut disparaître sans perte d’information.
- [ ] **A198 — Définir les proportions d’images :** hero, cloche, carte, détail et galerie doivent avoir des ratios documentés ; validation : aucun recadrage ne coupe un produit réel ou son contenant.
- [ ] **A199 — Construire une bibliothèque de compositions :** prévoir variantes hero gauche/droite, média plein cadre, carte décalée et bloc éditorial ; validation : la variété vient de la composition, pas d’une modification des couleurs.
- [ ] **A200 — Faire une revue premium :** supprimer tout élément qui ressemble à un template générique, à un badge forcé ou à une décoration sans rôle ; validation : résultat plus élégant sans perte de personnalité.

### Graffiti et stickers WOOD

- [ ] **A201 — Définir le vocabulaire graffiti WOOD :** formes, épaisseurs, énergie, irrégularités et niveau de contraste à partir des références de la propriétaire ; validation : vocabulaire original et documenté.
- [ ] **A202 — Préparer des stickers de navigation :** créer des marqueurs pour `Découvrir`, `Nouveau`, `Voir la sélection` ou `WOOD Shop`, sans les utiliser pour une remise ; validation : chaque sticker reste compréhensible sans son illustration.
- [ ] **A203 — Créer des stickers de catégorie :** imaginer quatre signes distincts pour fleurs, résines, bien-être et textile ; validation : les signes ne remplacent jamais le nom de la catégorie.
- [ ] **A204 — Prévoir des stickers de matière :** réserver des motifs pour botanique, texture, soin et objet ; validation : aucun motif n’émet une allégation sur le produit.
- [ ] **A205 — Générer des planches de variations graphiques :** produire plusieurs propositions d’étoiles, flèches, bulles, tampons et formes manuscrites dans l’univers WOOD ; validation : la propriétaire choisit ou refuse chaque famille avant intégration.
- [ ] **A206 — Prévoir une version sans sticker :** chaque section doit rester belle si les stickers sont masqués, bloqués ou non chargés ; validation : aucune information essentielle dépend d’un asset décoratif.
- [ ] **A207 — Définir une règle d’ancrage :** attacher chaque sticker à un bloc et non au viewport pour éviter les décalages sur téléphone ; validation : aucun sticker ne recouvre prix, panier, menu ou barre système.
- [ ] **A208 — Créer des stickers desktop/mobile :** adapter échelle, rotation et placement sans simplement réduire la version desktop ; validation : lisibilité à 320, 375, 390, 430, 768 et 1440 px.
- [ ] **A209 — Contrôler les bords et débordements :** vérifier rotation, ombre, clipping et `overflow` sans masquer un vrai problème de largeur ; validation : aucune barre horizontale globale.
- [ ] **A210 — Documenter la propriété des assets :** enregistrer source, auteur, autorisation, date et statut de chaque sticker ou illustration ; validation : aucun asset de recherche web n’est intégré sans droit clair.

### Humour, ton et microcopies

- [ ] **A211 — Définir la voix WOOD :** écrire une mini-charte avec phrases courtes, ton direct, chic, accessible et légèrement décalé ; validation : le texte reste naturel pour une clientèle de tout âge.
- [ ] **A212 — Séparer humour et transaction :** autoriser une touche humoristique dans l’accueil et les zones éditoriales, jamais dans les erreurs, prix, paiement, livraison ou conformité ; validation : le parcours critique reste neutre.
- [ ] **A213 — Créer une banque de micro-formules :** préparer des textes pour hover, chargement, panier, fiche, retour et état vide ; validation : aucune formule ne promet un effet ou une disponibilité non confirmée.
- [ ] **A214 — Préparer les libellés de cartes :** décliner `Découvrir`, `Voir la fiche`, `Choisir le grammage` et `Ajouter au panier` avec variantes courtes ; validation : le bouton reste explicite sans jargon.
- [ ] **A215 — Écrire des descriptions de fleurs cohérentes :** conserver une phrase visuelle unique par variété, avec emojis facultatifs et aucune allégation ; validation : chaque description est relue et attribuée au bon nom.
- [ ] **A216 — Écrire les descriptions des résines :** préparer une structure similaire sans inventer les textures, origines ou niveaux tant que la propriétaire ne les fournit pas ; validation : état `fiche à compléter` disponible.
- [ ] **A217 — Écrire les textes bien-être :** distinguer cosmétiques, huiles et soins avec un vocabulaire prudent ; validation : aucun conseil médical ou promesse thérapeutique.
- [ ] **A218 — Écrire les textes WOOD Shop :** donner un ton plus objet/marque et moins catalogue CBD ; validation : textiles et produits dérivés restent dans le même système visuel.
- [ ] **A219 — Définir les emojis autorisés :** créer une liste courte, par famille et par intensité, en évitant les emojis dans les informations sensibles ; validation : suppression des emojis ne casse aucune phrase.
- [ ] **A220 — Faire une passe de lecture à voix haute :** vérifier que slogans, CTA, descriptions et FAQ sonnent comme WOOD et non comme une traduction ou une copie ; validation : relecture propriétaire consignée.

### Images, illustrations et génération d’assets

- [ ] **A221 — Définir les briefs photo WOOD :** fond, cloche, lumière, angle, distance, matière et niveau de retouche pour fleurs, résines, huiles et textile ; validation : un photographe peut reproduire le brief sans deviner.
- [ ] **A222 — Générer des concepts de décor :** créer des fonds botanique, béton, papier, bois et graffiti uniquement comme références de direction artistique ; validation : aucun concept n’est présenté comme une photo réelle.
- [ ] **A223 — Générer des essais de stickers :** produire des variations originales dans les couleurs WOOD, sans texte de marque tiers ; validation : planche de choix envoyée à la propriétaire avant intégration.
- [ ] **A224 — Générer des essais de cloches :** varier lumière et composition tout en gardant le produit central et lisible ; validation : pas de fleur anatomiquement bizarre, de texte parasite ou de watermark.
- [ ] **A225 — Générer des essais textile/goods :** créer des placeholders pour t-shirts et objets uniquement avec les noms exacts existants ; validation : aucun faux modèle, prix ou stock n’est affiché comme réel.
- [ ] **A226 — Contrôler les artefacts d’IA :** vérifier doigts, étiquettes, lettres, logos, bords, transparences, répétitions et proportions ; validation : asset rejeté dès qu’un défaut peut nuire à la marque.
- [ ] **A227 — Préparer les exports multi-formats :** produire source haute définition, version web, miniature, fallback et alt text ; validation : le pipeline conserve une version source non destructive.
- [ ] **A228 — Ajouter un registre d’assets :** lister nom, type, usage, dimensions, poids, statut, source et date de validation ; validation : chaque fichier public est traçable.
- [ ] **A229 — Créer un mode placeholder explicite :** afficher `visuel de démonstration` lorsqu’une image n’est pas réelle ; validation : le client ne confond pas maquette et stock disponible.
- [ ] **A230 — Organiser la substitution par lots :** remplacer les images par catégorie sans toucher aux prix, noms, panier ou routes ; validation : rollback fichier par fichier possible.

### Animations et expérience premium

- [ ] **A231 — Définir le tempo d’animation WOOD :** documenter durée, easing, délai et distance pour apparitions, hover, zoom et ticker ; validation : aucune animation ne semble lente ou gadget.
- [ ] **A232 — Animer les stickers avec retenue :** prévoir un léger décalage ou une entrée latérale, jamais une rotation permanente ; validation : l’animation s’arrête après l’introduction.
- [ ] **A233 — Animer les cloches au scroll :** utiliser un mouvement subtil de lumière ou de profondeur sans déplacer la fiche ; validation : `transform/opacity` seulement et CLS nul.
- [ ] **A234 — Animer les cartes au survol :** renforcer bordure, média ou détail sur desktop sans agrandir la grille ; validation : aucun voisin ne saute et le CTA reste à sa place.
- [ ] **A235 — Animer le feedback panier :** confirmer l’ajout par une micro-interaction locale et accessible, sans popup agressif ; validation : l’utilisateur sait que l’ajout est réussi et peut continuer.
- [ ] **A236 — Animer les transitions de fiche :** conserver le zoom fluide demandé, avec fallback immédiat sur appareil lent ou mouvement réduit ; validation : retour arrière et URL restent fiables.
- [ ] **A237 — Prévoir un mode mouvement réduit :** désactiver ticker animé, parallax, rotation et zoom non essentiel ; validation : tout le contenu et toutes les actions restent présents.
- [ ] **A238 — Prévoir un mode performance basse :** réduire les images, désactiver les animations coûteuses et conserver les contrôles ; validation : pas de latence perceptible sur mobile moyen.
- [ ] **A239 — Tester la motion au tactile :** vérifier appui, interruption, double-tap, scroll rapide et rotation d’écran ; validation : aucun geste ne déclenche une mauvaise page ou un double ajout.
- [ ] **A240 — Faire signer le langage animé WOOD :** choisir les animations retenues, refusées et optionnelles avec la propriétaire et son conjoint ; validation : document de référence archivé avant déploiement.

### Fiche d’exécution direction artistique `A191–A240`

- **A191–A200** — Fichiers : `docs/design/wood-art-direction.md`, `boutique.css`, `responsive.css`, captures. Validation : ratios premium/chill/graffiti et grille validés.
- **A201–A210** — Fichiers : `assets/graphics/`, registre d’assets, CSS stickers, tests overflow. Validation : assets originaux, optionnels et traçables.
- **A211–A220** — Fichiers : dictionnaire éditorial, cartes, fiches, FAQ, tests copy. Validation : ton WOOD cohérent et parcours critique neutre.
- **A221–A230** — Fichiers : briefs image, `assets/products/`, pipeline d’export, alt text. Validation : placeholders non trompeurs et remplacement réversible.
- **A231–A240** — Fichiers : CSS/JS motion, `prefers-reduced-motion`, Playwright, matrice mobile. Validation : animation fluide, interrompable et sans régression.

## Audit de la carte WOOD fleurs/résines — tags `A241–A280`

Les deux photos fournies montrent une carte imprimée qui constitue une référence graphique beaucoup plus précise que la simple consigne “ajouter du graffiti”. La première photo permet de lire la liste des fleurs et les paliers ; la seconde révèle la composition globale avec les résines, l’édition Halloween et une zone promotionnelle. La carte doit être traitée comme une source de direction artistique et de données à vérifier, pas comme une image à étirer sur le site.

### Décomposition visuelle constatée

- [ ] **A241 — Conserver l’original comme référence maître :** archiver les deux photos reçues sans les retoucher ni les remplacer ; validation : la référence originale reste récupérable.
- [ ] **A242 — Obtenir une capture plane de meilleure qualité :** demander un scan ou une photo sans perspective, reflet ni ombre pour les futurs découpages ; validation : texte, pictogrammes et tarifs sont lisibles à 100 %.
- [ ] **A243 — Décomposer la carte en couches :** identifier logo, explosion jaune, titre rouge, sous-titre, textures bleues, lune, château, chauves-souris, monstre, végétation, cadres et personnages ; validation : chaque couche possède un usage documenté.
- [ ] **A244 — Séparer le logo de campagne du logo officiel :** ne jamais remplacer automatiquement le logo WOOD officiel du site par le wordmark dessiné de la carte ; validation : utilisation distincte et validée par la propriétaire.
- [ ] **A245 — Analyser la typographie dessinée :** documenter les effets de pinceau, contour, ombre, irrégularité et volume sans remplacer la police principale du site ; validation : les textes fonctionnels restent dans la typographie WOOD validée.
- [ ] **A246 — Préserver la palette de la carte comme référence d’expression :** relever jaune papier, rouge, bleu, noir, crème et vert, puis les traduire uniquement avec les couleurs WOOD existantes ; validation : aucune nouvelle palette permanente n’est introduite.
- [ ] **A247 — Reproduire la texture papier avec mesure :** prévoir un fond grainé ou une image de texture légère pour les zones éditoriales ; validation : texture compressée, accessible et jamais appliquée derrière un prix difficile à lire.
- [ ] **A248 — Reproduire les contours irréguliers :** prévoir des cadres organiques, déchirés ou dessinés pour les titres de catégorie ; validation : le contour reste décoratif et ne réduit pas la zone de clic.
- [ ] **A249 — Étudier les coulures :** intégrer éventuellement des coulures rouges ou noires comme motifs contrôlés, jamais comme état d’erreur ou de disponibilité ; validation : aucun effet ne brouille un texte.
- [ ] **A250 — Documenter le décor narratif :** utiliser château, lune, chauves-souris, plantes et personnage comme inspiration de scène, jamais comme décoration automatique partout ; validation : chaque illustration a une intention et un emplacement.
- [ ] **A251 — Définir le traitement des grands titres :** adapter `LE MENU`, `FLEURS CBD`, `RÉSINES CBD` et les futures catégories en blocs forts ; validation : le titre reste lisible sur mobile et ne déborde pas.
- [ ] **A252 — Préserver l’asymétrie maîtrisée :** garder une composition vivante avec des éléments décalés, mais ancrer les zones commerciales sur une grille stable ; validation : l’irrégularité ne crée aucun décalage de prix ou CTA.
- [ ] **A253 — Relever les motifs de bordure :** documenter végétation, bords noirs, cadres rouges, personnages et éléments latéraux ; validation : les motifs peuvent être masqués sur mobile sans perte d’information.
- [ ] **A254 — Prévoir des variantes saisonnières :** rendre l’ambiance Halloween ou autre édition activable comme une couche, sans modifier le catalogue ; validation : retour à la version WOOD permanente en un seul changement.
- [ ] **A255 — Isoler la zone promotionnelle :** traiter le bloc `10G 30€` visible sur la photo comme une future zone désactivée ; validation : aucune promotion n’apparaît dans la maquette actuelle.

### Pictogrammes, catégories et données

- [ ] **A256 — Recenser les pictogrammes par variété :** associer chaque icône visible à son nom exact sans deviner sa signification ; validation : registre propriétaire relu avec la photo originale.
- [ ] **A257 — Créer une bibliothèque d’icônes WOOD :** vectoriser ou redessiner uniquement les pictogrammes validés, sans les lisser jusqu’à perdre leur personnalité ; validation : chaque icône possède une version couleur, monochrome et sans image.
- [ ] **A258 — Ajouter l’icône comme renfort, pas comme nom :** afficher nom écrit et pictogramme ensemble ; validation : un client comprend la variété si l’icône ne charge pas.
- [ ] **A259 — Reproduire les badges de profil :** transposer `STRONG`, `MEDIUM` et `CBD CLASSIQUE` en badges WOOD lisibles ; validation : les badges ne revendiquent aucun effet et suivent les profils validés.
- [ ] **A260 — Harmoniser les profils avec le site :** conserver `CBD BOOSTÉ (STRONG)`, `CBD SOFT (MEDIUM)` et `CBD CLASSIQUE` dans l’interface, même si la carte imprimée utilise des libellés plus courts ; validation : aucun mélange ambigu.
- [ ] **A261 — Construire la grille tarifaire accessible :** afficher les colonnes 1 g, 3 g, 5 g, 10 g et 25 g en HTML, pas uniquement dans une image ; validation : clavier, lecteur d’écran et zoom 200 % donnent les mêmes tarifs.
- [ ] **A262 — Aligner les colonnes de prix :** conserver une largeur constante et un alignement numérique propre ; validation : les prix des 13 fleurs et des résines ne se décalent pas.
- [ ] **A263 — Vérifier chaque tarif avec la source :** comparer la carte et les données `flower-pricing.js` variété par variété ; validation : aucune valeur n’est copiée d’une autre fleur.
- [ ] **A264 — Documenter les réductions visibles :** conserver les réductions de la carte jusqu’à 25 g, sans généraliser au-delà ; validation : la règle des deux lots de 25 g reste séparée et testée.
- [ ] **A265 — Préparer le schéma résines :** utiliser la même logique de grille sans inventer les prix masqués ou coupés dans la photo ; validation : aucune résine n’est activée avant lecture/validation complète.
- [ ] **A266 — Conserver les libellés exacts :** ne pas corriger automatiquement les noms de variétés ou de résines à partir d’une supposition ; validation : toute correction est confirmée par la propriétaire.
- [ ] **A267 — Prévoir l’état “donnée à confirmer” :** afficher proprement une icône, un prix ou une photo manquante sans inventer ; validation : la carte reste esthétique et l’achat est bloqué si nécessaire.
- [ ] **A268 — Relier la carte à la boutique sans image plate :** utiliser la carte comme référence puis proposer des cartes produits interactives ; validation : clic, gramme, prix et panier restent des éléments HTML séparés.
- [ ] **A269 — Créer une version “voir la carte” optionnelle :** afficher une vue complète haute qualité dans une visionneuse accessible ; validation : zoom, fermeture, retour clavier et mobile fonctionnent.
- [ ] **A270 — Ajouter une transcription structurée :** fournir une version texte des catégories, noms, profils et prix ; validation : aucun utilisateur ne dépend de la photo pour comprendre l’offre.

### Transposition web et campagne

- [ ] **A271 — Concevoir un hero “menu WOOD” :** reprendre l’idée du poster comme scène d’accueil boutique, avec composition originale et couleurs WOOD ; validation : le hero ne devient pas une simple capture de la carte.
- [ ] **A272 — Créer une entrée fleurs/résines :** placer les deux univers comme deux panneaux éditoriaux issus de la logique de la carte ; validation : les boutons renvoient aux bonnes pages.
- [ ] **A273 — Préparer une section “carte de la boutique” :** présenter la carte complète comme complément du catalogue, jamais comme unique interface d’achat ; validation : un bouton d’achat réel reste disponible dans les fiches.
- [ ] **A274 — Transformer les pictogrammes en micro-interactions :** léger mouvement au survol ou à l’appui, sans rotation permanente ; validation : animation désactivable et sans saut de carte.
- [ ] **A275 — Prévoir une animation de coulure contrôlée :** utiliser un masque ou une entrée courte pour les titres, jamais un effet continu ; validation : mouvement réduit et performance basse respectés.
- [ ] **A276 — Créer une édition saisonnière indépendante :** stocker décor, textes et actifs saisonniers séparément du catalogue et des prix ; validation : désactivation sans modification de Supabase.
- [ ] **A277 — Garder la promotion désactivée :** intégrer un drapeau de campagne par défaut à `false` ; validation : aucune remise ou prix spécial ne peut apparaître par accident.
- [ ] **A278 — Préparer les exports web :** produire SVG/PNG/WebP selon l’usage, avec source maître conservée ; validation : aucun fichier flou, trop lourd ou déformé.
- [ ] **A279 — Faire une comparaison visuelle carte/site :** vérifier logo, textures, pictogrammes, hiérarchie, couleurs, profils, tarifs et ambiance ; validation : la transposition est reconnaissable sans être une copie plate.
- [ ] **A280 — Faire valider la direction de la carte :** soumettre une planche `conservé / adapté / exclu` à la propriétaire ; validation : aucune intégration finale avant son accord.

### Fiche d’exécution carte fleurs/résines `A241–A280`

- **A241–A255** — Fichiers : références originales, `docs/design/wood-card-audit.md`, assets de décor. Validation : couches, saisonnalité et promotions séparées.
- **A256–A270** — Fichiers : registre pictogrammes, `flower-pricing.js`, catalogue résines, HTML accessible. Validation : icônes, profils, noms et tarifs exacts.
- **A271–A280** — Fichiers : accueil boutique, visionneuse carte, assets web, flag de campagne, captures de validation. Validation : transposition interactive et réversible.

### Interdits explicites issus de l’audit

- Ne pas copier la palette noir/blanc/lime, la police, le wordmark, les slogans, les photos, les badges exacts ou les textes de TealerLab.
- Ne pas importer ses promotions, compteurs, fidélité, parrainage, jeu, newsletter, avis ou preuve sociale sans demande et données WOOD validées.
- Ne pas reprendre ses pop-ups qui recouvrent l’accueil mobile, ni ses widgets tiers comme conditions de navigation.
- Ne pas utiliser `overflow: hidden` pour masquer un débordement ; la largeur doit être corrigée à la source.
- Ne pas transformer WOOD en copie de boutique généraliste : quatre univers, carte WOOD et parcours de grammage restent la structure de référence.

### Ordre d’exécution de ce nouveau bloc

1. Tâches 49–52 puis `A01–A10` : référence, architecture et verrouillage de l’identité WOOD.
2. Tâches 53–57 puis `A11–A24` : en-tête, menu, cartes, fiche et contenu vérifiable.
3. Tâches 58–59 puis `A31–A36` : visuels et animations après validation des références.
4. Tâches 60–62 puis `A25–A30` et `A37` : responsive, performance et accessibilité.
5. `A38–A40` puis tâches 63–64 : recette, validation propriétaire et validation du conjoint.
6. `A81–A100` : refondre la hiérarchie visuelle de l’accueil WOOD avant les cartes.
7. `A101–A120` : aligner menu, footer, cartes, prix et grilles sur toutes les tailles.
8. `A121–A140` : finaliser textes, emojis, stickers, animations, matrices visuelles et validations croisées.
9. `A141–A150` : intégrer le registre des 13 variétés, les visuels de maquette et les descriptions sans toucher au commerce existant.
10. `A151–A160` : préparer le remplacement par les photos réelles, optimiser les assets, tester les animations et obtenir les validations finales.
11. `A161–A175` : recomposer l’accueil WOOD avec la structure TealerLab utile, puis cadrer fiches, livraison et contenus vérifiables.
12. `A176–A190` : ajouter seulement les blocs prouvables, verrouiller le responsive, la motion, les performances et les validations croisées.
13. `A191–A220` : définir l’art direction, les stickers, le graffiti, l’humour, les emojis et la voix éditoriale avant de générer les assets.
14. `A221–A240` : générer, contrôler, animer et faire valider les images et micro-interactions sans toucher au socle WOOD.
15. `A241–A255` : numériser la carte comme référence graphique, séparer ses couches et isoler toute promotion saisonnière.
16. `A256–A280` : transposer pictogrammes, profils, grille tarifaire, carte interactive et édition saisonnière avec validation de la propriétaire.

## Bloc de tâches 65 à 74 — éléments supplémentaires récupérés de l’audit TealerLab

Cette extension reprend des mécanismes utiles observés sur les pages produit, les collections et l’aide de [TealerLab](https://tealerlab.com/), sans reprendre leurs textes, leurs visuels, leur identité, leurs couleurs ou leurs opérations commerciales.

### Tâche 65 — Ajouter un guide de choix WOOD sans recherche ni filtre

- [x] Ajouter en haut de chaque univers une courte introduction expliquant ce que l’on trouve dans la catégorie.
- [ ] Ajouter, si la propriétaire le valide, un mini-guide très simple : `CBD boosté (strong)`, `CBD soft (medium)` et `CBD classique`.
- [x] Ne pas ajouter de recherche par nom ni de filtre, conformément à la demande de la propriétaire.
- [x] Ne pas transformer le guide en promesse d’effet, conseil médical ou classement non vérifié.

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

- [x] Répondre seulement aux questions confirmées : produits, paiement, livraison et compte ; les données personnelles restent hors réponse tant que la politique n’est pas validée.
- [x] Prévoir un format accordéon accessible, utilisable au clavier et au toucher.
- [x] Ne pas copier les réponses de TealerLab et ne pas faire de promesse juridique ou médicale.
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

- [x] Documenter les sauvegardes Supabase, la conservation des commandes et la procédure de restauration dans `docs/ops/supabase-backup-restore.md` ; l’exécution et le test réel de restauration restent à faire par la propriétaire avant l’ouverture.
- [ ] Conserver un journal exploitable des commandes, erreurs de stock, paiements et e-mails ; une panne d’e-mail ne doit jamais supprimer une commande.
- [x] Prévoir une vue propriétaire des commandes en échec ou nécessitant une action, sans déconnexion automatique inutile ; le tableau de bord affiche l’état de la file de notifications et ses erreurs éventuelles.
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
