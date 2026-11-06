# WOOD × TealerLab — SIGNATURE EDITION
## Feuille de route exécutable Codex — **SITE DÉMO**

**Version :** 1.0 — 6 novembre 2026  
**Dépôt unique :** https://github.com/Rapt0r06300/CBD-WOOD — branche `main`  
**Démo cible :** https://rapt0r06300.github.io/CBD-WOOD/demo/  
**Périmètre :** améliorer la présentation et le comportement de la **démo**. Aucune mise en production commerciale.  
**Nom interne du concept :** « WOOD × TealerLab — Signature Edition ». **Ne pas afficher ce nom comme une collaboration, partenariat ou co-branding officiel sur le site.**

> **Boussole** — L'impact éditorial, les fiches riches, les carrousels et la fluidité d'un grand e-commerce comme TealerLab, mais **100 % dans l'univers visuel WOOD** : fond noir forêt, vert pin, anis, crème, bois, cloche en verre, humour et graffiti originaux. Ne jamais copier de contenu, d'assets, de mise en page exacte, de slogans ni de promotions TealerLab.

## 0. Matériel de référence fourni et règles de vérité

- **Propriétaire** (messages gris des captures) : veut **chic / premium** et **chill / graffiti lover**, des stickers partout dans l'univers physique mais un site lisible, des produits présentés **sous cloche en verre**, de l'humour, un minimum de contraste en conservant l'identité et les couleurs WOOD.
- **Photos réelles de boutique** montrées en conversation : façade noire avec lettrage Wood blanc et fresque de feuilles vertes/bleues ; mur couvert de stickers multicolores ; présentoirs bois avec plantes, cosmétiques et huiles ; t-shirt noir à lettrage graphique ; carte/menu illustrés colorés ; affiches de fleurs retro/gothiques et humoristiques ; bocaux vitrés. **Ces photos ne sont pas automatiquement accessibles dans le dépôt ni autorisées pour publication : utiliser uniquement si leur fichier, les droits et l'accord sont disponibles.**
- **Captures iPhone** de la démo : base noire/verte/anisée satisfaisante, typographie très forte, navigation basse ; un petit carré/point d'interrogation visible dans une scène avant « DROP 03 / STUDIO WOOD » à diagnostiquer, sans supposer qu'il s'agit d'une image 404.
- **TealerLab** (référence de mécanismes uniquement) : hero marketing, catégories et produits denses, rails, visuels de campagne, choix par intention, CTA bien hiérarchisés, rythme de conversion. **Ne PAS reprendre ses offres, réductions, métriques, avis, illustrations, visuels ou style copié.** Référence : https://tealerlab.com/.
- **WOOD existant** : https://www.woodcbdshop.com/ et Instagram public trouvé `@wood.cbdshop`, à confirmer avec la propriétaire avant changement de lien ; conserver « Le CBD autrement » et « Si c'est WOOD, c'est GOOD ».
- **Docs et travaux déjà dans GitHub** : `docs/design/wood-direction-register.md`, `docs/design/wood-accent-grammar.md`, `docs/design/wood-photo-brief.md`, `docs/superpowers/plans/2026-11-05-wood-tealerlab-visual-rebuild-roadmap.md`, `docs/superpowers/plans/2026-11-06-mobile-finish.md`, `docs/validation/2026-11-06-109-task-status.md`.
- **Registre distinct** : `docs/superpowers/plans/2026-11-06-wood-attente-identifiants-validations.md` contient **138 tâches différées**. Ne pas les supprimer, réintroduire, clore, ni bloquer la démo à cause d'elles.
- **Important** : les 109 tâches historiques ont déjà des états `[x]`, `[~]`, `[!]`. Les tâches ci-dessous sont un **plan de vérification et de finition**, pas la preuve que tout reste à coder. Codex examine l'existant, **valide et coche sans réécrire lorsqu'une tâche est déjà satisfaite**.

## 1. Interdits absolus

1. Ne pas configurer ni activer de paiement Viva, encaissement, livraison, commande commerciale, emailing réel, OAuth Gmail, données personnelles réelles ou boutique de production.
2. **Audit obligatoire** : le code de démo a déjà exposé une voie `create-pending-order` vers Supabase. Aucun clic sur `/demo/` ne doit écrire dans un environnement réel. Protéger aussi le backend si nécessaire. Les tests ne doivent pas générer de commande réelle.
3. Ne pas envoyer de clés ou jetons dans les commits, captures, rapports ou prompts. Une clé publique Supabase existante **ne constitue pas une autorisation** à faire des écritures distantes depuis la démo.
4. Ne pas inventer prix, stocks, avis, photos de production, durée d'expédition, promos, coupons, analyses laboratoire, dates d'offre, ni témoignages. Les données explicitement existantes doivent garder leur statut et leurs réserves.
5. Ne pas afficher « TealerLab × WOOD » comme une collaboration, ne pas utiliser le logo TealerLab, ses assets, des stickers de marques tierces, ni annoncer un partenariat.
6. Ne pas perdre le vrai logo, la palette WOOD, le slogan, les parcours déjà codés, les tests, ni les 138 tâches différées.
7. Ne pas écrire « Port de Nice » comme accroche de marque. Préserver les adresses vérifiées : **7 rue Barla** et **16 avenue Alfred Borriglione**, à confirmer avant communication commerciale.
8. **Ne rien déclarer terminé sans test ni preuve.** Ne pas avancer des pourcentages fictifs.

## 2. Charte visuelle de référence

### Palette existante (vérité du code)

| Rôle | Token / couleur | Hex |
|---|---|---|
| Fond très sombre | `--bg` | `#101610` |
| Vert pin | `--pine` | `#1B2C20` |
| Vert anis accent | `--lime` | `#CBF096` |
| Texte crème | `--ink` | `#F1F0E6` |
| Bois/neutre | `--wood` | `#D8D4BD` |
| Surface claire | `--soft` | `#E8E7D7` |
| Cartes sombres | `--card` | `#1D281E` |

**Accents de campagne À FAIRE VALIDER, non officiels :** rose `#DC5AA3`, violet `#8B52B7`, turquoise `#5BCAC5`, jaune `#E9BD54`, rouge `#B44839`. Les utiliser dans les propositions de stickers/affiches ponctuelles, pas comme système général d'interface sans accord. Rechercher un dosage visuel proche de **75 % premium sobre / 25 % énergie graphique** (repère artistique, pas calcul strict).

### Règles d'assemblage

- Logo WOOD véritable ; grandes typographies d'impact ; labels et paragraphes accessibles.
- Fleurs et résines : **mises en scène sous cloche**, second angle rapproché possible pour voir le produit ; pas de faux rendus présentés comme vrais.
- Plantes, bois, façade noire, fresque végétale, stickers originaux, touches rétro-comics, humour sobre.
- Un composant doit fonctionner sans sticker, animation, survol ni photo propriétaire.
- Réserves « démo » discrètes mais explicites : pas de tromperie sur les produits, prix, comptes ou commandes.
- Priorité au **mobile Safari** et à la navigation tactile.

## 3. Mode opératoire Codex

**Première étape :** lire l'état actuel du dépôt et les six documents de référence ci-dessus, calculer le statut des 120 tâches à partir de preuves ; ne présumer ni que les tâches sont toutes inachevées, ni que la dernière vérification des 109 est toujours valable.

**Pour chaque ticket :** (1) vérifier l'existant, (2) écrire ou corriger le test ciblé si nécessaire, (3) n'implémenter que le delta manquant, (4) exécuter les tests locaux, (5) capturer la preuve responsive lorsque pertinent, (6) mettre à jour le statut et le lien de commit, (7) annoncer la progression.

**Statuts à utiliser :** `DONE` (test + preuve), `PARTIAL` (livré mais vérification restante), `BLOCKED-EXTERNAL` (droits, identifiants, validation humaine), `TODO`, `REGRESSION`. Une étape bloquée par autorisation externe reste **hors exécution** et **ne doit pas être déclarée terminée**.

**Formule unique de progression globale :**

`% = (nombre de tickets DONE / 120) × 100`, arrondi à une décimale.

Afficher à chaque groupe de tickets : `Avancement 31/120 = 25,8 % — DONE:31 | PARTIAL:7 | BLOCKED:4 | TODO:78 | Tests: OK/KO | Commit: <sha>`. Les tâches déjà vérifiées comme satisfaites sont `DONE` même si aucun nouveau code n'a été écrit. **Ne pas ajouter les 138 tâches différées au dénominateur.** Afficher séparément l'état des validations externes et les tests non exécutés.

**Tests de base du dépôt :** `npm run check`, `npm run prepare:github-pages` ; utiliser si possible Playwright / Chromium et Safari iOS avec captures, sans revendiquer un test appareil non réalisé. Les scripts `npm run readiness`, `npm run audit`, `npm run check:js` et `npm run continuity` existent. Suivre le workflow GitHub Pages réellement configuré ; **ne pas mettre en ligne avant les garde-fous P0**.

**Stratégie de commits :** petits commits logiques après tests, une trace `TXW-xxx` dans message ou PR, rollback disponible. Ne jamais supprimer une assertion pour faire passer les tests.

**Fichiers envisageables :** `index.html`, `fleurs.html`, `resines.html`, `fleur.html`, `bien-etre.html`, `wood-shop.html`, `contact.html`, `compte.html`, `checkout.html`, `boutique.css`, `wood-graffiti.css`, `wood-editorial.css`, `wood-motion.css`, `wood-mobile-finish.css`, `wood-mobile-finish.js`, `assets/`, `test/`, `docs/design/`, `docs/validation/`. Inspecter avant création ; éviter toute multiplication de feuilles CSS ou duplication de composants.

---

## 4. Tâches numérotées — 120 tickets


### P0 — État réel, garde-fous et diagnostic — 10 tickets

- [ ] **TXW-001 — Relever l'état GitHub.** Inspecter main, la branche de publication gh-pages et les commits récents ; consigner le SHA de départ et la procédure de publication réellement utilisée.  
  **Acceptation :** Référence exacte enregistrée ; aucune hypothèse sur le déploiement.

- [ ] **TXW-002 — Réconcilier les plans existants.** Lire les feuilles de route 2026-11-04 et 2026-11-05, le statut des 109 tâches, les tests et le registre des 138 tâches différées ; dresser la table 'déjà livré / partiel / absent'.  
  **Acceptation :** Aucun chantier déjà achevé n'est recréé ni compté deux fois.

- [ ] **TXW-003 — Créer un point de retour.** Produire un instantané réversible de la démo et noter les fichiers touchés ; ne pas réécrire le site de base ni les documents d'attente.  
  **Acceptation :** Rollback documenté et reproductible sans intervention commerciale.

- [ ] **TXW-004 — Auditer toutes les routes de démonstration.** Lister accueil, fleurs, résines, bien-être, WOOD Shop, fiche fleur, contact, compte, panier et confirmation ; vérifier routes et liens à partir de /CBD-WOOD/demo/.  
  **Acceptation :** Toutes les routes attendues s'ouvrent, liens relatifs compris.

- [ ] **TXW-005 — Auditer la séparation démo / données réelles.** Tracer les importations JS, configuration Supabase, appels HTTP, comptes, panier et page confirmation ; repérer tout effet de bord réel.  
  **Acceptation :** Carte exhaustive des appels distants et de leurs risques.

- [ ] **TXW-006 — Interdire les commandes réelles dans la démo.** Isoler ou neutraliser côté démo les appels tels que create-pending-order ; implémenter une simulation locale explicite, sans créer de commande dans Supabase ni déclencher de transaction.  
  **Acceptation :** Test de bout en bout : aucune écriture distante, aucune commande commerciale ; retour explicite 'simulation'.

- [ ] **TXW-007 — Interdire tous les envois réels.** Vérifier contact, newsletter, notifications, mails de commande, comptes et éventuelles intégrations ; aucune action utilisateur en /demo/ ne doit envoyer de message réel.  
  **Acceptation :** Tests négatifs et absence d'appels d'expédition dans le réseau de démo.

- [ ] **TXW-008 — Reproduire le symbole '?' sur iPhone.** Examiner la capture de l'utilisateur au-dessus de 'DROP 03 / STUDIO WOOD', puis reproduire avec Safari iOS et vérifier glyphe, SVG, chargement, police, décodage et cache.  
  **Acceptation :** Cause prouvée ou limitation documentée ; aucun carré/interrogation anormal sur le viewport concerné.

- [ ] **TXW-009 — Établir les captures de référence.** Créer des captures avant intervention de chaque page en 390px et 1440px, plus états panier et menus ; nommer par route, viewport, commit.  
  **Acceptation :** État initial consultable pour comparer les régressions.

- [ ] **TXW-010 — Verrouiller le périmètre DÉMO.** Consigner les interdits : pas de paiement Viva, d'OAuth Gmail, de déploiement Hostinger commercial, de livraison réelle, de publication d'offres ni de demande de secrets.  
  **Acceptation :** Un test ou une règle de vérification bloque toute activation commerciale non autorisée.


### P1 — Identité WOOD et direction artistique — 10 tickets

- [ ] **TXW-011 — Figer le véritable logo WOOD.** Réutiliser l'asset officiel du dépôt et le lettrage existant, sans régénérer ni redessiner un symbole approximatif.  
  **Acceptation :** Logo identique sur desktop, mobile, fiches et favicon ; origine tracée.

- [ ] **TXW-012 — Figer les slogans officiels.** Garder 'LE CBD AUTREMENT' et 'SI C'EST WOOD, C'EST GOOD', sans appropriation d'expressions TealerLab.  
  **Acceptation :** Textes cohérents et sans slogan tiers dans l'interface publique.

- [ ] **TXW-013 — Consolider les couleurs principales.** Centraliser #101610, #1B2C20, #CBF096, #F1F0E6, #D8D4BD, #E8E7D7, #1D281E en tokens existants.  
  **Acceptation :** Les composants consomment des tokens plutôt que des couleurs arbitraires.

- [ ] **TXW-014 — Définir le dosage premium / street.** Fixer un repère de composition ~75 % sobre et 25 % accents, ajustable visuellement ; réserver le street aux scènes et détails, jamais aux formulaires ou prix.  
  **Acceptation :** Trois exemples documentés : calme, sélection, impact.

- [ ] **TXW-015 — Créer une palette d'accents NON officielle.** Documenter rose #DC5AA3, violet #8B52B7, turquoise #5BCAC5, jaune #E9BD54, rouge #B44839 comme PROPOSITIONS facultatives issues des photos.  
  **Acceptation :** Aucune teinte secondaire n'est considérée validée par la propriétaire ni généralisée.

- [ ] **TXW-016 — Établir la grille typographique.** Titres massifs, paragraphes lisibles, annotations manuscrites ponctuelles ; corriger coupes forcées et interlignages ; aucun texte essentiel en police décorative.  
  **Acceptation :** Titres non tronqués de 320 à 1440px, y compris zoom navigateur.

- [ ] **TXW-017 — Définir les trois rythmes éditoriaux.** Établir les compositions impact (hero), produit (grille), confiance (histoire/contact) ; varier les blancs et fonds pour éviter la mosaïque monotone.  
  **Acceptation :** Page longue mais hiérarchisée, sans trois scènes visuellement équivalentes consécutives.

- [ ] **TXW-018 — Adapter l'inspiration TealerLab sans copier.** Répertorier ce qui est transférable : densité maîtrisée, rails, angles de prise de vue, CTA, réassurance et interaction. Exclure graphismes, campagnes, personnages, slogans et ordre exact.  
  **Acceptation :** Matrice 'mécanisme / adaptation WOOD / exclusion' rédigée.

- [ ] **TXW-019 — Corriger le brief de photographie.** Résoudre la contradiction des documents disant 'sans cloche' alors que la propriétaire demande une présentation qualitative sous cloche en verre ; autoriser une deuxième vue nette hors cloche.  
  **Acceptation :** Tous les docs de design cohérents avec la demande récente et l'état démo.

- [ ] **TXW-020 — Créer une planche de direction à faire valider.** Rassembler palette, typographies, hero, sticker, cartes fleurs/résines et photo boutique avec statuts 'proposé / approuvé'.  
  **Acceptation :** Aucun changement de charte définitif prétendument approuvé sans retour propriétaire.


### P2 — Accueil : impact visuel et histoire — 12 tickets

- [ ] **TXW-021 — Recomposer le premier écran.** Garder WOOD lisible et prominent, 'LE CBD AUTREMENT', média botanique fort, message court et CTA Découvrir / Nous trouver.  
  **Acceptation :** Marque et proposition de valeur lisibles sans scroller en mobile.

- [ ] **TXW-022 — Affiner le hero mobile.** Équilibrer photo, texte et sticker à 320–430px, sans rectangle vide ni élément coincé sous la barre navigateur.  
  **Acceptation :** Hero fluide et lisible sur iPhone et Android.

- [ ] **TXW-023 — Limiter les grands panneaux anis.** Conserver un panneau signature si utile, réduire sa hauteur excessive et son poids visuel ; préserver contraste et repère de lecture.  
  **Acceptation :** Le mobile évite deux écrans consécutifs de texte sur fond anis.

- [ ] **TXW-024 — Rationaliser les 'drops'.** Fusionner le surplus d'introductions DROP 01/02/03 lorsque leurs messages se recoupent ; une scène forte vaut mieux que trois prétextes.  
  **Acceptation :** Chaque drop conservé a un contenu unique et un CTA utile.

- [ ] **TXW-025 — Clarifier les quatre catégories.** Rendre Fleurs, Résines, Accessoires, Bien-être immédiats et cliquables, en cohérence avec les vraies familles de la boutique.  
  **Acceptation :** Un visiteur retrouve sa catégorie en un seul choix évident.

- [ ] **TXW-026 — Donner une place unique à la sélection de fleurs.** Supprimer les duplications Nimbus/Ivory/Velvet Kush/Pastraweed entre carrousels et cartes ; distinguer coup de projecteur vs exploration.  
  **Acceptation :** Aucune même grille produit répétée à l'identique dans l'accueil.

- [ ] **TXW-027 — Conserver un choix par mood non médical.** Mettre en scène les intentions éditoriales sans laisser entendre des effets physiologiques garantis ni inventer disponibilité.  
  **Acceptation :** Composant utile au clavier, au tactile et au lecteur d'écran.

- [ ] **TXW-028 — Créer une scène 'Maison WOOD'.** Placer une section boutique authentique : façade noire à typographie blanche, végétation, mobilier bois, mur de stickers, présentation sous cloche (photos autorisées uniquement).  
  **Acceptation :** WOOD reconnu comme boutique réelle, sans images de banque génériques.

- [ ] **TXW-029 — Recomposer 'sélection en images'.** Transformer le rail en micro-récit : matière, geste, lieu, ambiance ; supprimer les images répétitives sans rôle éditorial.  
  **Acceptation :** Un seul rail photo pertinent, contrasté et facile à parcourir.

- [ ] **TXW-030 — Réduire le bruit des packs fictifs.** Garder au besoin un aperçu de composant désactivé mais retirer tout récit ambigu sur offres, '24h', réductions ou pack actuellement vendable.  
  **Acceptation :** Aucun pack/offre non validé n'apparaît comme actif.

- [ ] **TXW-031 — Recomposer preuve sociale et confiance.** Afficher seulement les extraits Google vérifiables avec établissement/date/source ; pas de nombre '5.0' non sourcé ni compteur inventé.  
  **Acceptation :** Preuves sourcées, actualisables ou état vide propre.

- [ ] **TXW-032 — Faire un final d'accueil mémorable.** Clore sur 'SI C'EST WOOD, C'EST GOOD', deux boutiques, contact, carte/itinéraire et FAQ, sans multiplier des formulaires inactifs.  
  **Acceptation :** Fin de page orientée visite/contact et perception WOOD.


### P3 — Stickers, graffiti et micro-identité — 10 tickets

- [ ] **TXW-033 — Inventorier les stickers déjà présents.** Réutiliser les SVG du dossier assets/graffiti et éliminer ceux qui se répètent inutilement.  
  **Acceptation :** Catalogue daté, identifiable et sans doublons cachés.

- [ ] **TXW-034 — Créer une grammaire de stickers WOOD.** Prévoir tags, éclairs, étoiles, bulles, tampons, soulignements et griffonnages originaux inspirés de la boutique.  
  **Acceptation :** Une famille cohérente avec tailles d'usage définies.

- [ ] **TXW-035 — Créer un sticker 'WOOD / GOOD' signature.** Concevoir une illustration originale compatible avec le logo authentique et le style des affiches en boutique, sans reproduire un sticker de marque tierce.  
  **Acceptation :** Sticker reconnaissable et lisible en faible taille.

- [ ] **TXW-036 — Créer un langage rétro/comics ponctuel.** Préparer textures imprimées, bordures irrégulières et illustrations conceptuelles de campagne, sans recopier les affiches Transylvania/Halloween.  
  **Acceptation :** Graphismes distinctifs et propriété intellectuelle respectée.

- [ ] **TXW-037 — Créer des accents végétaux.** Motifs feuilles/bois/botanique comme complément au street, cohérents avec la façade et les plantes de la boutique.  
  **Acceptation :** Les motifs ne couvrent jamais une légende ou un produit.

- [ ] **TXW-038 — Associer stickers aux sections.** Ancrer les accents au bloc qui les contient, jamais au viewport ; utiliser positions responsives stables.  
  **Acceptation :** Aucun débordement horizontal ni chevauchement CTA/prix.

- [ ] **TXW-039 — Limiter le nombre de stickers simultanés.** Instaurer une densité maximum par scène et des zones de respiration ; privilégier les moments de marque.  
  **Acceptation :** L'interface reste premium et pas une reproduction du mur entier.

- [ ] **TXW-040 — Créer variations clair/sombre.** Prévoir contrastes des assets, arrière-plans et SVG accessibles pour la palette noir/anis/crème.  
  **Acceptation :** Chaque asset fonctionne sur toutes les surfaces autorisées.

- [ ] **TXW-041 — Préparer un pack exportable.** Versionner sources SVG, exports WebP/PNG si nécessaires, fichiers de manifeste et usages autorisés.  
  **Acceptation :** Pack réutilisable, léger, avec source et statut 'demo'.

- [ ] **TXW-042 — Obtenir la validation artistique ultérieure.** Produire la planche garder/adapter/exclure sans suspendre les développements indépendants ; ne pas marquer 'approved' sans l'accord WOOD.  
  **Acceptation :** Décision propriétaire clairement distinguée des tests techniques.


### P4 — Photographie, supports et médias — 10 tickets

- [ ] **TXW-043 — Inventorier les photos déjà disponibles.** Recenser assets du repo, photos de démo, photos boutique source et leurs droits ; ne pas supposer que les photos de la conversation sont automatiquement dans Codex.  
  **Acceptation :** Manifest clair source / titulaire / autorisation / statut.

- [ ] **TXW-044 — Prévoir une galerie boutique authentique.** Réserver des emplacements pour façade noire 'Wood', plantes et étagères en bois, avec fallback démo en attendant des fichiers réutilisables.  
  **Acceptation :** Même mise en page avant/après substitution d'image autorisée.

- [ ] **TXW-045 — Valoriser la cloche de verre.** Créer une mise en scène photo éditoriale pour fleurs et résines sous cloche, souhaitée par la propriétaire ; distinguer photo réelle et rendu conceptuel.  
  **Acceptation :** Étiquette état démo et produit visible sans effet trompeur.

- [ ] **TXW-046 — Prévoir une seconde vue détaillée.** En complément du visuel sous cloche, cadrage macro qui montre texture et couleur sans filtre trompeur.  
  **Acceptation :** L'utilisateur peut inspecter la matière sur mobile.

- [ ] **TXW-047 — Créer des gabarits média cohérents.** Ratios 1:1 produits, 4:5 mobile, 3:2 ou 4:5 hero desktop, cadrage réservé au sujet.  
  **Acceptation :** Pas de découpe de textes/produits à toutes tailles.

- [ ] **TXW-048 — Créer un système de qualité d'image.** Contrôler finesse, artefacts IA, inscriptions, alt, contraste et faux emballages ; ne pas présenter une image IA comme vraie photo WOOD.  
  **Acceptation :** Chaque image est identifiée et traçable.

- [ ] **TXW-049 — Optimiser les médias lourds.** WebP/AVIF appropriés, attributs width/height, lazy loading raisonné, hero prioritaire ; préserver originaux hors paquet public.  
  **Acceptation :** LCP/CLS non dégradés par la refonte.

- [ ] **TXW-050 — Rendre les états vides élégants.** Si photo ou donnée propriétaire manque, afficher une vignette de direction éditoriale sobre, sans 'photo à confirmer' répété partout.  
  **Acceptation :** Aucune confusion entre illustration et image réelle.

- [ ] **TXW-051 — Préparer une présentation des illustrations de saison.** Prévoir une couche activable pour les campagnes Halloween/été ; aucun sticker à thème ni prix temporaires automatiquement publiés.  
  **Acceptation :** Revenir à la version permanente sans toucher aux données de produits.

- [ ] **TXW-052 — Préparer le circuit d'approbation média.** Définir l'emplacement et le protocole de remplacement des images avec droits, date et statut ; aucun compte extérieur requis à ce stade.  
  **Acceptation :** Un media approuvé se remplace sans refonte de page ni fuite de fichier sensible.


### P5 — Fleurs et résines : vitrines premium — 12 tickets

- [ ] **TXW-053 — Auditer la carte fleurs actuelle.** Comparer noms, grammages, boutons et prix affichés aux seules données déjà autorisées ; ne pas inventer de nouveaux prix.  
  **Acceptation :** Aucune fausse disponibilité ni prix non sourcé.

- [ ] **TXW-054 — Unifier le design des cartes fleurs.** Média sous cloche, nom lisible, profil court, détails accessibles et CTA de fiche ; même grille sur écran large et mobile.  
  **Acceptation :** Cartes homogènes et jamais illisibles.

- [ ] **TXW-055 — Améliorer la fiche fleur.** Grand visuel, deuxième vue, description courte, faits neutres et choix de grammage visible, même si l'achat est désactivé.  
  **Acceptation :** Parcours fiche autonome, sans information commerciale fictive.

- [ ] **TXW-056 — Refaire les états indisponibles.** Distinguer 'fiche démo' de 'rupture de stock réelle' ; bloquer achats non autorisés sans afficher 'indisponible' partout.  
  **Acceptation :** Aucun statut trompeur.

- [ ] **TXW-057 — Assurer les liens entre accueil et fiches.** Tester les quatre liens fleurs et leurs éventuels paramètres d'URL, ainsi que le retour catalogue.  
  **Acceptation :** Zéro route cassée et état précédent restauré.

- [ ] **TXW-058 — Mettre en scène les résines.** Créer une galerie de résines aussi qualitative que les fleurs, cohérente avec les cloches et la matière.  
  **Acceptation :** La page résines ne paraît plus vide malgré l'absence de données définitives.

- [ ] **TXW-059 — Clarifier les cartes résines non validées.** Prévoir noms génériques seulement comme maquettes, sans prix/taux/origine inventés et avec un discret statut 'démo'.  
  **Acceptation :** Aucun produit fictif présentable comme réel.

- [ ] **TXW-060 — Préparer des composants variantes.** Sélecteurs grammages/quantités en lecture seule ou simulation locale, jamais liés au paiement ni à un stock distant en mode démo.  
  **Acceptation :** Interaction sans commande réelle et sans incohérence de prix.

- [ ] **TXW-061 — Renforcer les galeries accessibles.** Lightbox, fermeture Escape, retour focus, images alternatives, zoom tactile sans capturer le scroll de page.  
  **Acceptation :** Interaction complète clavier/touch, sans piège.

- [ ] **TXW-062 — Introduire un récit produit WOOD.** De petites notes d'humour, profils visuels et badges originaux mais sans affirmations de santé ni notation inventée.  
  **Acceptation :** Identité WOOD perceptible en fiche sans brouiller données.

- [ ] **TXW-063 — Tester les cartes et choix mobiles.** Viewport 320/360/375/390/430, menus, boutons, zoom, claviers et petits textes ; adapter les hauteurs sans cacher les actions.  
  **Acceptation :** Aucun prix/grammage/CTA coupé et aucun débordement horizontal.

- [ ] **TXW-064 — Créer une recette catalogue de démonstration.** Du hero à la catégorie, à la fiche, au panier fictif et au retour, inclure états vides et erreurs.  
  **Acceptation :** Scénario manuel et automatisé reproductible sans backend de production.


### P6 — Bien-être, accessoires et WOOD Shop — 8 tickets

- [ ] **TXW-065 — Refaire les scènes bien-être.** S'inspirer des véritables étagères bois, huiles, cosmétiques et plantes pour des scènes éditoriales de démo.  
  **Acceptation :** Page qualitative, sans promesse médicale.

- [ ] **TXW-066 — Structurer les familles bien-être.** Différencier soins, cosmétiques, huiles et produits divers uniquement si leur présence est attestée ; sinon placeholders neutres.  
  **Acceptation :** Navigation par type compréhensible et extensible.

- [ ] **TXW-067 — Valoriser les accessoires.** Créer une présentation spécifique aux accessoires visibles en boutique (feuilles, grinders, briquets), sans prix ni stock non validé.  
  **Acceptation :** Les accessoires ne sont pas confondus avec le textile.

- [ ] **TXW-068 — Développer WOOD Shop lifestyle.** Mettre en scène vêtements, sacs et objets dans un univers street plus expressif, ancré dans la vraie boutique.  
  **Acceptation :** Page à identité WOOD, pas catalogue générique.

- [ ] **TXW-069 — Prévoir galerie textile.** Faire place à une photo autorisée du t-shirt et des détails de marquage, avec fallback conceptuel.  
  **Acceptation :** Visuel adapté mobile/desktop et crédit image maîtrisé.

- [ ] **TXW-070 — Préparer les variantes vêtement.** Afficher tailles et coloris seulement s'ils sont confirmés ; les choix fictifs restent inactifs/locaux.  
  **Acceptation :** Aucun stock, variante ou prix inventé.

- [ ] **TXW-071 — Uniformiser catégories et pieds de page.** Associer pictogrammes, labels, CTA et retours au catalogue sur toutes les pages secondaires.  
  **Acceptation :** Identité cohérente malgré différences de produits.

- [ ] **TXW-072 — Créer une matrice de contenus approuvables.** Pour chaque univers, lister données encore manquantes : photos, produits, textes, prix, stocks, preuves ; les conserver dans le registre externe si besoin.  
  **Acceptation :** Le code avance sans déclencher de demande d'identifiants.


### P7 — Navigation et expérience utilisateur — 10 tickets

- [ ] **TXW-073 — Revoir menu principal mobile.** Logo WOOD, menu, accès univers, compte et panier fictif cohérents ; réduire la densité de liens.  
  **Acceptation :** Tactile accessible et sortie de menu évidente.

- [ ] **TXW-074 — Auditer la barre basse iPhone.** Corriger safe area, position fixe et disparition à la descente ; ne jamais masquer bouton ni contenu.  
  **Acceptation :** Barre utilisable sous Safari réel et lors du clavier virtuel.

- [ ] **TXW-075 — Harmoniser pictogrammes.** Réutiliser la bibliothèque SVG existante (panier, localisation, compte, téléphone, catalogue), mêmes épaisseurs et textes associés.  
  **Acceptation :** Un seul système iconographique accessible.

- [ ] **TXW-076 — Clarifier les appels à l'action.** Un CTA principal par zone ; action de visite/contact réelle, action d'achat clairement démo si simulée.  
  **Acceptation :** Aucun bouton n'annonce une fonctionnalité non disponible.

- [ ] **TXW-077 — Améliorer recherche et FAQ.** Garder recherche FAQ utile et sans backend ; créer états vide, réinitialisation, focus et navigation clavier fiables.  
  **Acceptation :** Questions retrouvables et lien de contact direct.

- [ ] **TXW-078 — Simplifier les formulaires inactifs.** Remplacer les formulaires newsletter/contact non envoyés par une démo explicite ou liens e-mail/téléphone, sans collecte.  
  **Acceptation :** Un visiteur n'entre pas ses coordonnées en croyant envoyer un message réel.

- [ ] **TXW-079 — Améliorer la visite de boutique.** Deux adresses présentées clairement, téléphones et itinéraires cliquables ; éviter la formulation 'Port de Nice' et vérifier les horaires avant publication.  
  **Acceptation :** Accès à chaque boutique en un geste, pas d'informations inférées.

- [ ] **TXW-080 — Rendre le panier 100 % local.** Si panier conservé dans la démo, le présenter comme simulation sans enregistrement ni paiement distant.  
  **Acceptation :** Les tests réseau constatent zéro écriture distante.

- [ ] **TXW-081 — Soigner le retour arrière et les ancres.** Corriger histoire navigateur, ancres avec header sticky, liens base/demo et page 404, en évitant les boucles.  
  **Acceptation :** Navigation stable avec clavier, rechargement et liens profonds.

- [ ] **TXW-082 — Définir un parcours de visite 3 minutes.** Accueil → personnalité WOOD → fleurs/résines → WOOD Shop → boutique physique → contact ; signaler les zones fictives discrètement.  
  **Acceptation :** La propriétaire peut tout comprendre sans compte ni mot de passe.


### P8 — Mobile, accessibilité et ergonomie — 12 tickets

- [ ] **TXW-083 — Établir la matrice viewport.** Tester 320/360/375/390/430/768/1024/1440px, portrait/paysage et petites hauteurs.  
  **Acceptation :** Aucun débordement racine et pas de zone invisible.

- [ ] **TXW-084 — Vérifier Safari iOS réel.** Reproduire captures utilisateur, barre Safari inférieure, safe area, titres, images, menu sticky et liens.  
  **Acceptation :** Écrans comparables à la capture, sans '?' ni masque d'action.

- [ ] **TXW-085 — Contrôler Chromium Android.** Tester interactions tactiles, rails scroll-snap, menu, boutons, clavier virtuel et chargement d'images.  
  **Acceptation :** Fonctions accessibles sans hover.

- [ ] **TXW-086 — Contrôler Firefox desktop.** Tester grid, images, pictogrammes, transitions, formulaires et polices fallback.  
  **Acceptation :** Pas de différence bloquante avec Chromium.

- [ ] **TXW-087 — Contrôler le zoom 200 et 400 %.** Vérifier libellés, titres massifs, menus, boutons, cartes, tableaux et footer.  
  **Acceptation :** Aucun blocage de lecture ou d'action.

- [ ] **TXW-088 — Tester textes système agrandis.** Vérifier Dynamic Type / text scaling, line-height et titres fragmentés sur mobile.  
  **Acceptation :** Texte jamais tronqué ni chevauché.

- [ ] **TXW-089 — Corriger les contrastes.** Mesurer texte crème, anis, vert secondaire et textes sur fonds clairs ; repérer polices trop petites.  
  **Acceptation :** Contraste adapté au niveau AA quand applicable.

- [ ] **TXW-090 — Vérifier clavier et focus.** Tab, Shift+Tab, Escape, activation Enter/Espace, focus restauré, noms accessibles et ordre DOM.  
  **Acceptation :** Aucune zone réservée à la souris ou au tactile.

- [ ] **TXW-091 — Vérifier VoiceOver et les images.** Alt des photos produit ; SVG décoratifs non lus ; annonces de statut de formulaire ; titres hiérarchisés.  
  **Acceptation :** Parcours compréhensible sans vision des décorations.

- [ ] **TXW-092 — Vérifier tous les targets tactiles.** Boutons, liens, croix, flèches et onglets de navigation : viser 44x44 CSS px, espaces de sécurité et aucun recouvrement.  
  **Acceptation :** Aucune cible critique difficile à toucher.

- [ ] **TXW-093 — Garantir le mouvement réduit.** Les reveals, stickers, rails et navigation sont fonctionnels avec prefers-reduced-motion ou Save-Data.  
  **Acceptation :** Le contenu reste immédiatement visible sans animation.

- [ ] **TXW-094 — Faire une double revue après reflow.** Captures avant/après par appareil, y compris lignes de texte très longues, menu ouvert et panier vide.  
  **Acceptation :** Les régressions sont capturées et corrigées.


### P9 — Animation, performance et stabilité — 10 tickets

- [ ] **TXW-095 — Auditer le budget média.** Lister les images les plus lourdes de la page accueil et des fiches ; prioriser optimisation sans perte visible.  
  **Acceptation :** Budget et tableau avant/après documentés.

- [ ] **TXW-096 — Optimiser la première image visible.** Prioriser hero avec dimensions/fetchpriority corrects et éviter les autres images eager trop nombreuses.  
  **Acceptation :** Temps d'affichage du premier écran amélioré ou non dégradé.

- [ ] **TXW-097 — Réduire les décalages de mise en page.** Réserver dimensions des médias et des éléments sticky, chargement police et placeholders.  
  **Acceptation :** CLS faible et absence de saut gênant.

- [ ] **TXW-098 — Rationaliser les CSS ajoutées.** Examiner wood-graffiti.css, wood-editorial.css, wood-motion.css et mobile finish ; éviter règles contradictoires et surcharges historiques inutiles.  
  **Acceptation :** Cascade documentée sans casser les composants.

- [ ] **TXW-099 — Optimiser les scripts d'interaction.** Éviter doubles écouteurs, rerenders inutiles, animations globales et importations réseau non essentielles.  
  **Acceptation :** Pas de warning/error console et interactions fluides.

- [ ] **TXW-100 — Limiter les effets GPU.** Utiliser transform/opacity pour micro-mouvements, pas d'effets continus gourmands.  
  **Acceptation :** Pas de saccade perceptible sur appareil moyen.

- [ ] **TXW-101 — Améliorer les rails média.** Scroll-snap naturel, indices si plusieurs éléments, navigation clavier, arrêt réduit.  
  **Acceptation :** Aucun rail piégé ou silencieusement tronqué.

- [ ] **TXW-102 — Assainir les images cassées.** Tester décodage, formats, fallbacks, caches et vrais liens d'assets depuis /demo/.  
  **Acceptation :** Aucun symbole de police brisée ou média disparu sur toutes pages.

- [ ] **TXW-103 — Contrôler réseau lent et déconnecté.** Tester interruptions, 3G/4G simulée, recharge et retour arrière avec données locales.  
  **Acceptation :** Site lisible même si médias tardifs ; pas de faux succès distant.

- [ ] **TXW-104 — Comparer mesures avant/après.** Collecter Lighthouse/Playwright si disponibles, résultats de tests, taille de paquet et captures ; consigner les écarts.  
  **Acceptation :** Aucune dégradation majeure d'accessibilité/performance sans justification.


### P10 — Textes, confiance et conformité de la démo — 8 tickets

- [ ] **TXW-105 — Écrire une voix WOOD originale.** Ton chaleureux, direct, premium avec petites phrases amusantes ; bannir le jargon 'placeholder' et les emprunts de slogans concurrents.  
  **Acceptation :** Chaque section reste intelligible sans humour.

- [ ] **TXW-106 — Réduire les labels techniques visibles.** Remplacer les répétitions 'PHOTO DÉMO' et 'à confirmer' par un repère de maquette clair, non ambigu et plus discret.  
  **Acceptation :** Toutes les images fictives restent identifiables sans saturer l'interface.

- [ ] **TXW-107 — Vérifier les affirmations commerciales.** Aucune livraison 24h, prix barré, réduction, code promo, laboratoire ou promesse de stock sans approbation ; données de référence non supposées actuelles.  
  **Acceptation :** Zéro promesse non sourcée dans la démo.

- [ ] **TXW-108 — Vérifier les allégations CBD.** Supprimer ou neutraliser promesses thérapeutiques, slogans médicaux et catégories d'effets garantis ; garder un discours descriptif prudent.  
  **Acceptation :** Aucune promesse de soin non étayée.

- [ ] **TXW-109 — Vérifier avis et notes.** N'utiliser que des extraits publics autorisés avec source précise, date et établissement ; pas de faux témoignage ou note globale forgée.  
  **Acceptation :** Chaque preuve est retracée ou masquée.

- [ ] **TXW-110 — Clarifier marque et Instagram.** Examiner www.woodcbdshop.com et compte social @wood.cbdshop identifié publiquement, mais ne modifier le lien officiel qu'après confirmation propriétaire.  
  **Acceptation :** Compte cible validé ou marqué 'à confirmer' dans le registre externe.

- [ ] **TXW-111 — Écarter les sources tiers non autorisées.** Ne pas copier les stickers d'autres marques, les créations TealerLab ou les photos de site tiers sans droits explicites.  
  **Acceptation :** Registre des droits par asset ; aucun élément litigieux diffusé.

- [ ] **TXW-112 — Préparer la validation propriétaire.** Créer une synthèse courte des propositions, une checklist oui/non pour logo, palette, photos, ton, pages et messages.  
  **Acceptation :** Les décisions externes restent non cochées jusqu'au retour de la propriétaire.


### P11 — Recette, preuve et livraison de la DÉMO — 8 tickets

- [ ] **TXW-113 — Exécuter la suite existante.** Lancer npm run check, documenter les résultats exacts et corriger sans supprimer des tests qui échouent.  
  **Acceptation :** Suite verte ou échecs expliqués, avec preuve.

- [ ] **TXW-114 — Ajouter les tests de contrat identité.** Tester noms WOOD, couleurs de base, absence de scripts TealerLab/branding concurrent et usage correct du vrai logo.  
  **Acceptation :** Nouvelle identité verrouillée sans écrasement visuel.

- [ ] **TXW-115 — Ajouter les tests de sécurité démo.** Intercept/spy les appels API des parcours compte/contact/checkout ; prouver qu'aucune commande, e-mail ou paiement réel ne part de /demo/.  
  **Acceptation :** Tests négatifs reproductibles et réussis.

- [ ] **TXW-116 — Contrôler le paquet Pages.** Exécuter npm run prepare:github-pages ; vérifier /demo/, les chemins d'assets, l'absence de secrets, les images et les routes générées.  
  **Acceptation :** Artefact complet et aucune fuite de fichier interne.

- [ ] **TXW-117 — Inspecter le rendu réel.** Capture responsive complète de chaque page ; contrôles manuels Safari/Android si appareils accessibles, sinon signaler ces preuves comme manquantes.  
  **Acceptation :** Pas de déclaration 'testé sur iPhone' sans vraie preuve correspondante.

- [ ] **TXW-118 — Préparer un avant / après décisionnel.** Comparer hero, galerie fleur, résines, boutique physique et mobile ; citer modifications et captures.  
  **Acceptation :** La propriétaire et son conjoint visualisent le gain et reconnaissent WOOD.

- [ ] **TXW-119 — Produire un état d'avancement sincère.** Pour chaque ticket, consigner statut DONE/PARTIAL/BLOCKED, commit, test et risque ; ne pas inclure les tâches externes dans le pourcentage livrable.  
  **Acceptation :** Pourcentage = tickets réellement validés / 120, avec catégories distinctes.

- [ ] **TXW-120 — Livrer une démonstration réversible.** Publier sur GitHub Pages uniquement après tests et sans activer production ; garder rollback et registre des tâches externes séparé.  
  **Acceptation :** Démo visitable, stable et présentable sans service commercial actif.


---

## 5. Portes d'arrêt / conditions d'acceptation

**Porte A — sécurité** (TXW-001 à 010) : aucun checkout ou formulaire démo ne déclenche une vente, un paiement ou un e-mail réel ; le symbole `?` est diagnostiqué, les routes sont inventoriées. *Tout code d'interface qui serait susceptible d'écrire à distance reste bloqué tant que cette porte n'est pas verte.*

**Porte B — identité** (TXW-011 à 042) : le vrai logo et la palette WOOD sont conservés, la section hero a l'impact attendu, les graffitis sont originaux et discrets, et aucune marque tierce n'est copiée.

**Porte C — contenu** (TXW-043 à 082) : fleurs/résines sous cloche, catégories cohérentes, photos fictives identifiées, boutique authentique valorisée sans publier de photo non autorisée ; liens et navigation utilisables.

**Porte D — qualité** (TXW-083 à 112) : Safari/Chromium/Firefox testés si disponibles, responsive 320–1440px, contrôle clavier/accessibilité, performance et absence d'allégations/promo inventées.

**Porte E — livraison** (TXW-113 à 120) : `npm run check` + paquet Pages + captures + rapport des 120 tickets + rollback, sans activation production.

**DÉFINITION DE 'PARFAIT POUR LA DÉMO' :** pas un jugement subjectif absolu, mais un livrable techniquement vérifié, mobile convaincant, fidèle aux codes WOOD, sans section trompeuse ni bug visible, et prêt à être présenté à la propriétaire pour avis. Les validations artistiques et commerciales restent explicitement ouvertes.

## 6. Registre des attentes EXTERNES — **ne pas traiter dans ces 120 tickets**

Les éléments suivants restent dans `docs/superpowers/plans/2026-11-06-wood-attente-identifiants-validations.md` : accès Supabase de production, Gmail OAuth, secrets Viva, domaine/Hostinger commercial, autorisation des photos, validation d'une palette élargie, vraie liste produits/prix/stocks, offres en cours, horaires officiels, mentions juridiques et approbation finale WOOD. **Ne pas demander les identifiants pour construire la démo.**

## 7. Rapport final attendu de Codex

Après exécution, produire :

1. Un tableau `TXW-ID | statut | preuve | fichier(s) | commit`, couvrant **120/120** numéros sans trous ni doublons ;
2. L'état des tests exécutés, précisément nommé et chiffré, avec les tests manuels non réalisés signalés ;
3. Les captures avant/après disponibles et les chemins des fichiers de preuve ;
4. Un résumé court : ce qui a changé, ce qui a été conservé, ce qui attend la propriétaire, risques résiduels ;
5. **L'avancement en pourcentage selon la formule unique** et la prochaine tâche non bloquée ;
6. Les liens de démo et du commit publié seulement si le déploiement a été fait après validation ;
7. La preuve que les **138 tâches différées sont restées intactes** et que le site commercial n'a pas été activé.

**Ordre de priorité : P0 sécurité → P1 identité → P2 accueil → P3 stickers → P4 médias → P5 fleurs/résines → P6 autres univers → P7 UX → P8 mobile → P9 performance → P10 contenus → P11 validation.**

## Mise à jour technique liée

La migration gratuite Cloudflare D1 et l'automatisation Codex se trouvent dans [D1-001 à D1-025](2026-11-06-wood-cloudflare-d1-free-autonome.md). Ce plan est complémentaire et ne change pas le comptage TXW-001 à TXW-120.
