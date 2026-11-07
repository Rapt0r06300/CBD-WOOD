# CBD WOOD — FEUILLE DE ROUTE INTÉGRALE ET EXÉCUTABLE POUR CODEX

**Version :** 2.0 — 7 novembre 2026    
**Dépôt :** https://github.com/Rapt0r06300/CBD-WOOD — branche `main`    
**Objet :** SITE **DÉMO** pour la propriétaire, **pas une ouverture commerciale**.    
**Sources de vérité :** les plans GitHub préexistants reproduits en entier ci-dessous, tous les choix de la conversation WOOD jusqu'à la demande du 7 novembre, et le registre historique conservé.

## SYNTHÈSE : tout ce qui a été retenu

**Identité WOOD voulue par la propriétaire** : « On est à la fois chic / PREMIUM », « Et tout aussi Chill / graffiti lover », fleurs et résines présentées « sous cloche en verre », « du graffiti et des stickers de partout », humour/mèmes. Boutique physique WOOD, 7 rue Barla, Nice ; seconde adresse 16 avenue Alfred Borriglione à **vérifier avec elle avant publication commerciale**. Ne jamais utiliser « Port de Nice ». Conserver les slogans WOOD « Le CBD autrement » et « Si c'est WOOD, c'est GOOD » et le **vrai logo**. Marque forest green/noir/crème, touches anis et accents street maîtrisés, sans écrans tout verts ni texte illisible. TealerLab \= inspiration d'UX/merchandising, **pas collaboration ni copie**. Pas d'Halloween ni pin-up sexy.

**Mascotte approuvée par l'utilisateur** : la **dernière image générée** en conversation, montrant une mascotte botanique souriante avec casquette WOOD, lunettes, univers BD/sticker graffiti, fleurs sous cloches et trois badges. Cette illustration est **l'inspiration artistique préférée**. Corriger toute phrase qui promet un effet de santé avant de créer un actif final de publication. Créer la bulle fixe, discrète et visible en bas à droite : **« Besoin d’aide pour choisir ? »** ; elle ne bouge pas avec le défilement et ouvre l'assistant. Éviter les collisions avec le menu et le bas d'écran mobile.

**Conseiller** : uniquement des questions simples, sans taxonomie imposée ; extraction automatique des fiches dans la base ; détection des termes léger, fort, puissant, goût, arômes, etc. avec synonymes, négations et contexte ; toujours fournir **un résultat honnête** (meilleur candidat justifié + 2 alternatives quand existantes, ou expliquer absence de produit compatible et orienter vers contact). Pas de conseil médical. Générer trois **familles** de pictogrammes légers/forts/goûts avec explications uniquement lorsque le produit comporte des faits vérifiés ; jamais de promesses d'effets physiques.

**Cloudflare** : utiliser D1 + Workers **Free**, setup Codex avec skills/MCP déjà préparés, déclencher OAuth si disponible, **le titulaire doit consentir** ; aucun coût/upgrade automatique, aucun secret Git ; données fictives en démo, pas de vraie commande. Supabase existant intact. Aucun Shopify. Hébergement statique GitHub Pages conservé. Ne pas envoyer d'email/newsletter réel. Les comptes, paiements et ventes restent interdits dans la démo.

**Méthode Codex** : commencer par auditer l'existant, ne pas refaire les tâches déjà testées, isoler la démo, exécuter les tâches faisables en autonomie, tests à chaque groupe, % d'avancement authentique et captures mobile/desktop ; validations propriétaire et connexions externes marquées BLOCKED-EXTERNAL. Ne pas toucher au registre des **138 tâches différées**, ci-dessous reproduit en annexe.

## INVENTAIRE COMPLET ET COMPTAGE

| Bloc | Identifiants | Total | Source |  
|---|---|---:|---|  
| Design/identité de la démo | TXW-001–TXW-120 | 120 | Plan Signature existant, reproduit intégralement |  
| Parcours client/conversion | CRO-001–CRO-128 | 128 | Plan expérience client, reproduit intégralement |  
| 30 idées ultérieures acceptées | CRO-129–CRO-158 | 30 | Conversation |  
| Conseiller / base automatique | CRO-159–CRO-178 | 20 | Conversation |  
| Widget BD, langage, 3 badges, validation | CRO-179–CRO-226 | 48 | Conversation, spécifications supplémentaires |  
| Cloudflare D1 gratuit | D1-001–D1-025 | 25 | Plan D1 existant, reproduit intégralement |  
| **Total actif planifié** | | **371** | Aucun statut DONE déduit |  
| Tâches archivées en attente | registre A / externe | 138 | Archive originale reproduite, hors % actif |  
| **Total des tickets recensés** | | **509** | 371 actifs + 138 en attente |

**Attention :** les 109 anciennes tâches actives du dépôt sont un **historique de statut**, pas 109 tickets supplémentaires à recompter ; leur état est reproduit en annexe. Le très grand plan source 2026-11-04 est conservé inchangé à l'adresse : https://github.com/Rapt0r06300/CBD-WOOD/blob/main/docs/superpowers/plans/2026-11-04-wood-tealerlab-roadmap.md (archive historique volumineuse, ne pas l'effacer). Le plan `2026-11-05-wood-tealerlab-visual-rebuild-roadmap.md` et l'existence des 138 tâches archivées priment pour l'absence de perte d'historique.

## PRIORITÉS ET RÈGLES D'EXÉCUTION

**P0 — sécurité et réalité** : TXW-001–010, CRO-089–104, D1-001–010, audits réseau et démonstration isolée, bloqueurs légaux.    
**P1 — rendre WOOD irrésistible** : identité (TXW-011–052), accueil et produits (TXW-053–082), CRO-001–088, 129–178 ; puis 179–226 pour le conseiller et la mascotte.    
**P2 — finition prouvée** : performance, accessibilité, tests et livraison TXW-083–120, CRO-105–128, D1-011–025, le reste.  

Les numéros expriment l'identité des tickets, pas une obligation de travailler dans l'ordre numérique si les dépendances l'interdisent. Maintenir un journal de correspondances pour éviter les doublons entre sections anciennes et nouvelles. Bloquer la publication commerciale tant que la propriétaire n'a pas validé les sources et la conformité.

**Pourcentage actif** \= `100 × (tickets réellement DONE et vérifiés) / 371` ; documenter séparément les 138 différés, les blocages OAuth, les tests non faits et les approbations manquantes. Ne jamais marquer DONE sur l'unique base de la présence d'une checklist.

---

## SECTION A — PLAN SIGNATURE TXW-001 à TXW-120 (reproduction intégrale du fichier source)

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

`% \= (nombre de tickets DONE / 120) × 100`, arrondi à une décimale.

Afficher à chaque groupe de tickets : `Avancement 31/120 \= 25,8 % — DONE:31 | PARTIAL:7 | BLOCKED:4 | TODO:78 | Tests: OK/KO | Commit: \<sha>`. Les tâches déjà vérifiées comme satisfaites sont `DONE` même si aucun nouveau code n'a été écrit. **Ne pas ajouter les 138 tâches différées au dénominateur.** Afficher séparément l'état des validations externes et les tests non exécutés.

**Tests de base du dépôt :** `npm run check`, `npm run prepare:github-pages` ; utiliser si possible Playwright / Chromium et Safari iOS avec captures, sans revendiquer un test appareil non réalisé. Les scripts `npm run readiness`, `npm run audit`, `npm run check:js` et `npm run continuity` existent. Suivre le workflow GitHub Pages réellement configuré ; **ne pas mettre en ligne avant les garde-fous P0**.

**Stratégie de commits :** petits commits logiques après tests, une trace `TXW-xxx` dans message ou PR, rollback disponible. Ne jamais supprimer une assertion pour faire passer les tests.

**Fichiers envisageables :** `index.html`, `fleurs.html`, `resines.html`, `fleur.html`, `bien-etre.html`, `wood-shop.html`, `contact.html`, `compte.html`, `checkout.html`, `boutique.css`, `wood-graffiti.css`, `wood-editorial.css`, `wood-motion.css`, `wood-mobile-finish.css`, `wood-mobile-finish.js`, `assets/`, `test/`, `docs/design/`, `docs/validation/`. Inspecter avant création ; éviter toute multiplication de feuilles CSS ou duplication de composants.

---

## 4. Tâches numérotées — 120 tickets

### P0 — État réel, garde-fous et diagnostic — 10 tickets

- [x] **TXW-001 — Relever l'état GitHub.** Inspecter main, la branche de publication gh-pages et les commits récents ; consigner le SHA de départ et la procédure de publication réellement utilisée.    
  **Acceptation :** Référence exacte enregistrée ; aucune hypothèse sur le déploiement.

- [x] **TXW-002 — Réconcilier les plans existants.** Lire les feuilles de route 2026-11-04 et 2026-11-05, le statut des 109 tâches, les tests et le registre des 138 tâches différées ; dresser la table 'déjà livré / partiel / absent'.    
  **Acceptation :** Aucun chantier déjà achevé n'est recréé ni compté deux fois.

- [x] **TXW-003 — Créer un point de retour.** Produire un instantané réversible de la démo et noter les fichiers touchés ; ne pas réécrire le site de base ni les documents d'attente.    
  **Acceptation :** Rollback documenté et reproductible sans intervention commerciale.

- [x] **TXW-004 — Auditer toutes les routes de démonstration.** Lister accueil, fleurs, résines, bien-être, WOOD Shop, fiche fleur, contact, compte, panier et confirmation ; vérifier routes et liens à partir de /CBD-WOOD/demo/.    
  **Acceptation :** Toutes les routes attendues s'ouvrent, liens relatifs compris.

- [x] **TXW-005 — Auditer la séparation démo / données réelles.** Tracer les importations JS, configuration Supabase, appels HTTP, comptes, panier et page confirmation ; repérer tout effet de bord réel.    
  **Acceptation :** Carte exhaustive des appels distants et de leurs risques.

- [x] **TXW-006 — Interdire les commandes réelles dans la démo.** Isoler ou neutraliser côté démo les appels tels que create-pending-order ; implémenter une simulation locale explicite, sans créer de commande dans Supabase ni déclencher de transaction.    
  **Acceptation :** Test de bout en bout : aucune écriture distante, aucune commande commerciale ; retour explicite 'simulation'.

- [x] **TXW-007 — Interdire tous les envois réels.** Vérifier contact, newsletter, notifications, mails de commande, comptes et éventuelles intégrations ; aucune action utilisateur en /demo/ ne doit envoyer de message réel.    
  **Acceptation :** Tests négatifs et absence d'appels d'expédition dans le réseau de démo.

- [ ] **TXW-008 — Reproduire le symbole '?' sur iPhone.** Examiner la capture de l'utilisateur au-dessus de 'DROP 03 / STUDIO WOOD', puis reproduire avec Safari iOS et vérifier glyphe, SVG, chargement, police, décodage et cache.    
  **Acceptation :** Cause prouvée ou limitation documentée ; aucun carré/interrogation anormal sur le viewport concerné.

- [ ] **TXW-009 — Établir les captures de référence.** Créer des captures avant intervention de chaque page en 390px et 1440px, plus états panier et menus ; nommer par route, viewport, commit.    
  **Acceptation :** État initial consultable pour comparer les régressions.

- [x] **TXW-010 — Verrouiller le périmètre DÉMO.** Consigner les interdits : pas de paiement Viva, d'OAuth Gmail, de déploiement Hostinger commercial, de livraison réelle, de publication d'offres ni de demande de secrets.    
  **Acceptation :** Un test ou une règle de vérification bloque toute activation commerciale non autorisée.

### P1 — Identité WOOD et direction artistique — 10 tickets

- [x] **TXW-011 — Figer le véritable logo WOOD.** Réutiliser l'asset officiel du dépôt et le lettrage existant, sans régénérer ni redessiner un symbole approximatif.    
  **Acceptation :** Logo identique sur desktop, mobile, fiches et favicon ; origine tracée.

- [x] **TXW-012 — Figer les slogans officiels.** Garder 'LE CBD AUTREMENT' et 'SI C'EST WOOD, C'EST GOOD', sans appropriation d'expressions TealerLab.    
  **Acceptation :** Textes cohérents et sans slogan tiers dans l'interface publique.

- [x] **TXW-013 — Consolider les couleurs principales.** Centraliser #101610, #1B2C20, #CBF096, #F1F0E6, #D8D4BD, #E8E7D7, #1D281E en tokens existants.    
  **Acceptation :** Les composants consomment des tokens plutôt que des couleurs arbitraires.

- [x] **TXW-014 — Définir le dosage premium / street.** Fixer un repère de composition ~75 % sobre et 25 % accents, ajustable visuellement ; réserver le street aux scènes et détails, jamais aux formulaires ou prix.    
  **Acceptation :** Trois exemples documentés : calme, sélection, impact.

- [x] **TXW-015 — Créer une palette d'accents NON officielle.** Documenter rose #DC5AA3, violet #8B52B7, turquoise #5BCAC5, jaune #E9BD54, rouge #B44839 comme PROPOSITIONS facultatives issues des photos.    
  **Acceptation :** Aucune teinte secondaire n'est considérée validée par la propriétaire ni généralisée.

- [x] **TXW-016 — Établir la grille typographique.** Titres massifs, paragraphes lisibles, annotations manuscrites ponctuelles ; corriger coupes forcées et interlignages ; aucun texte essentiel en police décorative.    
  **Acceptation :** Titres non tronqués de 320 à 1440px, y compris zoom navigateur.

- [x] **TXW-017 — Définir les trois rythmes éditoriaux.** Établir les compositions impact (hero), produit (grille), confiance (histoire/contact) ; varier les blancs et fonds pour éviter la mosaïque monotone.    
  **Acceptation :** Page longue mais hiérarchisée, sans trois scènes visuellement équivalentes consécutives.

- [x] **TXW-018 — Adapter l'inspiration TealerLab sans copier.** Répertorier ce qui est transférable : densité maîtrisée, rails, angles de prise de vue, CTA, réassurance et interaction. Exclure graphismes, campagnes, personnages, slogans et ordre exact.    
  **Acceptation :** Matrice 'mécanisme / adaptation WOOD / exclusion' rédigée.

- [x] **TXW-019 — Corriger le brief de photographie.** Résoudre la contradiction des documents disant 'sans cloche' alors que la propriétaire demande une présentation qualitative sous cloche en verre ; autoriser une deuxième vue nette hors cloche.    
  **Acceptation :** Tous les docs de design cohérents avec la demande récente et l'état démo.

- [ ] **TXW-020 — Créer une planche de direction à faire valider.** Rassembler palette, typographies, hero, sticker, cartes fleurs/résines et photo boutique avec statuts 'proposé / approuvé'.    
  **Acceptation :** Aucun changement de charte définitif prétendument approuvé sans retour propriétaire.

### P2 — Accueil : impact visuel et histoire — 12 tickets

- [x] **TXW-021 — Recomposer le premier écran.** Garder WOOD lisible et prominent, 'LE CBD AUTREMENT', média botanique fort, message court et CTA Découvrir / Nous trouver.    
  **Acceptation :** Marque et proposition de valeur lisibles sans scroller en mobile.

- [x] **TXW-022 — Affiner le hero mobile.** Équilibrer photo, texte et sticker à 320–430px, sans rectangle vide ni élément coincé sous la barre navigateur.    
  **Acceptation :** Hero fluide et lisible sur iPhone et Android.

- [ ] **TXW-023 — Limiter les grands panneaux anis.** Conserver un panneau signature si utile, réduire sa hauteur excessive et son poids visuel ; préserver contraste et repère de lecture.    
  **Acceptation :** Le mobile évite deux écrans consécutifs de texte sur fond anis.

- [ ] **TXW-024 — Rationaliser les 'drops'.** Fusionner le surplus d'introductions DROP 01/02/03 lorsque leurs messages se recoupent ; une scène forte vaut mieux que trois prétextes.    
  **Acceptation :** Chaque drop conservé a un contenu unique et un CTA utile.

- [x] **TXW-025 — Clarifier les quatre catégories.** Rendre Fleurs, Résines, Accessoires, Bien-être immédiats et cliquables, en cohérence avec les vraies familles de la boutique.    
  **Acceptation :** Un visiteur retrouve sa catégorie en un seul choix évident.

- [x] **TXW-026 — Donner une place unique à la sélection de fleurs.** Le runway explore Euphoria, Purple, Bloody Mary et Orange Bud tandis que le coup de projecteur garde Nimbus, Ivory, Velvet Kush et Pastraweed ; preuve : docs/validation/2026-11-07-selection-rhythm.md, test/home-selection-rhythm.test.mjs.
  **Acceptation :** Aucune même grille produit répétée à l'identique dans l'accueil.

- [x] **TXW-027 — Conserver un choix par mood non médical.** Mettre en scène les intentions éditoriales sans laisser entendre des effets physiologiques garantis ni inventer disponibilité.    
  **Acceptation :** Composant utile au clavier, au tactile et au lecteur d'écran.

- [ ] **TXW-028 — Créer une scène 'Maison WOOD'.** Placer une section boutique authentique : façade noire à typographie blanche, végétation, mobilier bois, mur de stickers, présentation sous cloche (photos autorisées uniquement).    
  **Acceptation :** WOOD reconnu comme boutique réelle, sans images de banque génériques.

- [x] **TXW-029 — Recomposer 'sélection en images'.** Transformer le rail en micro-récit : matière, geste, lieu, ambiance ; supprimer les images répétitives sans rôle éditorial.    
  **Acceptation :** Un seul rail photo pertinent, contrasté et facile à parcourir.

- [x] **TXW-030 — Réduire le bruit des packs fictifs.** Garder au besoin un aperçu de composant désactivé mais retirer tout récit ambigu sur offres, '24h', réductions ou pack actuellement vendable.    
  **Acceptation :** Aucun pack/offre non validé n'apparaît comme actif.

- [x] **TXW-031 — Recomposer preuve sociale et confiance.** Afficher seulement les extraits Google vérifiables avec établissement/date/source ; pas de nombre '5.0' non sourcé ni compteur inventé. Preuve démo : `index.html`, `docs/validation/2026-11-07-google-review-sources.md`, fondu sans flèches ni compteur. La revalidation propriétaire reste dans TXW-109.    
  **Acceptation :** Preuves sourcées, actualisables ou état vide propre.

- [x] **TXW-032 — Faire un final d'accueil mémorable.** Clore sur 'SI C'EST WOOD, C'EST GOOD', deux boutiques, contact, carte/itinéraire et FAQ, sans multiplier des formulaires inactifs.    
  **Acceptation :** Fin de page orientée visite/contact et perception WOOD.

### P3 — Stickers, graffiti et micro-identité — 10 tickets

- [x] **TXW-033 — Inventorier les stickers déjà présents.** Réutiliser les SVG du dossier assets/graffiti et éliminer ceux qui se répètent inutilement.    
  **Acceptation :** Catalogue daté, identifiable et sans doublons cachés.

- [x] **TXW-034 — Créer une grammaire de stickers WOOD.** Prévoir tags, éclairs, étoiles, bulles, tampons, soulignements et griffonnages originaux inspirés de la boutique.    
  **Acceptation :** Une famille cohérente avec tailles d'usage définies.

- [x] **TXW-035 — Créer un sticker 'WOOD / GOOD' signature.** Concevoir une illustration originale compatible avec le logo authentique et le style des affiches en boutique, sans reproduire un sticker de marque tierce.    
  **Acceptation :** Sticker reconnaissable et lisible en faible taille.

- [x] **TXW-036 — Créer un langage rétro/comics ponctuel.** Préparer textures imprimées, bordures irrégulières et illustrations conceptuelles de campagne, sans recopier les affiches Transylvania/Halloween.    
  **Acceptation :** Graphismes distinctifs et propriété intellectuelle respectée.

- [x] **TXW-037 — Créer des accents végétaux.** Motifs feuilles/bois/botanique comme complément au street, cohérents avec la façade et les plantes de la boutique.    
  **Acceptation :** Les motifs ne couvrent jamais une légende ou un produit.

- [x] **TXW-038 — Associer stickers aux sections.** Ancrer les accents au bloc qui les contient, jamais au viewport ; utiliser positions responsives stables.    
  **Acceptation :** Aucun débordement horizontal ni chevauchement CTA/prix.

- [x] **TXW-039 — Limiter le nombre de stickers simultanés.** Instaurer une densité maximum par scène et des zones de respiration ; privilégier les moments de marque.    
  **Acceptation :** L'interface reste premium et pas une reproduction du mur entier.

- [x] **TXW-040 — Créer variations clair/sombre.** Prévoir contrastes des assets, arrière-plans et SVG accessibles pour la palette noir/anis/crème.    
  **Acceptation :** Chaque asset fonctionne sur toutes les surfaces autorisées.

- [x] **TXW-041 — Préparer un pack exportable.** Versionner sources SVG, exports WebP/PNG si nécessaires, fichiers de manifeste et usages autorisés.    
  **Acceptation :** Pack réutilisable, léger, avec source et statut 'demo'.

- [ ] **TXW-042 — Obtenir la validation artistique ultérieure.** Produire la planche garder/adapter/exclure sans suspendre les développements indépendants ; ne pas marquer 'approved' sans l'accord WOOD.    
  **Acceptation :** Décision propriétaire clairement distinguée des tests techniques.

### P4 — Photographie, supports et médias — 10 tickets

- [x] **TXW-043 — Inventorier les photos déjà disponibles.** Recenser assets du repo, photos de démo, photos boutique source et leurs droits ; ne pas supposer que les photos de la conversation sont automatiquement dans Codex.    
  **Acceptation :** Manifest clair source / titulaire / autorisation / statut.

- [ ] **TXW-044 — Prévoir une galerie boutique authentique.** Réserver des emplacements pour façade noire 'Wood', plantes et étagères en bois, avec fallback démo en attendant des fichiers réutilisables.    
  **Acceptation :** Même mise en page avant/après substitution d'image autorisée.

- [x] **TXW-045 — Valoriser la cloche de verre.** Créer une mise en scène photo éditoriale pour fleurs et résines sous cloche, souhaitée par la propriétaire ; distinguer photo réelle et rendu conceptuel. Preuve démo : scène `wood-cloche`, étiquettes d’état et contrat `demo-cloche`/`approved-real-photo`.    
  **Acceptation :** Étiquette état démo et produit visible sans effet trompeur.

- [x] **TXW-046 — Prévoir une seconde vue détaillée.** En complément du visuel sous cloche, cadrage macro qui montre texture et couleur sans filtre trompeur. Preuve démo : double média sur les cartes runway, comportement inspectable au toucher et test de contrat photo.    
  **Acceptation :** L'utilisateur peut inspecter la matière sur mobile.

- [x] **TXW-047 — Créer des gabarits média cohérents.** Ratios 1:1 produits, 4:5 mobile, 3:2 ou 4:5 hero desktop, cadrage réservé au sujet.    
  **Acceptation :** Pas de découpe de textes/produits à toutes tailles.

- [x] **TXW-048 — Créer un système de qualité d'image.** Contrôler finesse, artefacts IA, inscriptions, alt, contraste et faux emballages ; ne pas présenter une image IA comme vraie photo WOOD.    
  **Acceptation :** Chaque image est identifiée et traçable.

- [x] **TXW-049 — Optimiser les médias lourds.** WebP publics, dimensions natives, lazy loading raisonné et hero prioritaire ; preuve : docs/validation/2026-11-07-media-budget.md, scripts/add-media-dimensions.mjs, test/media-dimensions.test.mjs.
  **Acceptation :** LCP/CLS non dégradés par la refonte.

- [x] **TXW-050 — Rendre les états vides élégants.** Si photo ou donnée propriétaire manque, afficher une vignette de direction éditoriale sobre, sans 'photo à confirmer' répété partout.    
  **Acceptation :** Aucune confusion entre illustration et image réelle.

- [ ] **TXW-051 — Préparer une présentation des illustrations de saison.** Prévoir une couche activable pour les campagnes Halloween/été ; aucun sticker à thème ni prix temporaires automatiquement publiés.    
  **Acceptation :** Revenir à la version permanente sans toucher aux données de produits.

- [x] **TXW-052 — Préparer le circuit d'approbation média.** Définir l'emplacement et le protocole de remplacement des images avec droits, date et statut ; aucun compte extérieur requis à ce stade. Preuve : `docs/design/wood-supabase-media-contract.md` et `test/wood-supabase-media-contract.test.mjs`. L’upload Storage réel reste externe.    
  **Acceptation :** Un media approuvé se remplace sans refonte de page ni fuite de fichier sensible.

### P5 — Fleurs et résines : vitrines premium — 12 tickets

- [x] **TXW-053 — Auditer la carte fleurs actuelle.** Comparer noms, grammages, boutons et prix affichés aux seules données déjà autorisées ; ne pas inventer de nouveaux prix.    
  **Acceptation :** Aucune fausse disponibilité ni prix non sourcé.

- [x] **TXW-054 — Unifier le design des cartes fleurs.** Média sous cloche, nom lisible, profil court, détails accessibles et CTA de fiche ; même grille sur écran large et mobile.    
  **Acceptation :** Cartes homogènes et jamais illisibles.

- [x] **TXW-055 — Améliorer la fiche fleur.** Grand visuel, deuxième vue, description courte, faits neutres et choix de grammage visible, même si l'achat est désactivé ; preuve : `docs/validation/2026-11-07-flower-detail-review.md`, `flower-detail.js`, `test/product-detail.test.mjs`.
  **Acceptation :** Parcours fiche autonome, sans information commerciale fictive.

- [x] **TXW-056 — Refaire les états indisponibles.** Distinguer 'fiche démo' de 'rupture de stock réelle' ; bloquer achats non autorisés sans afficher 'indisponible' partout.    
  **Acceptation :** Aucun statut trompeur.

- [x] **TXW-057 — Assurer les liens entre accueil et fiches.** Tester les quatre liens fleurs et leurs éventuels paramètres d'URL, ainsi que le retour catalogue.    
  **Acceptation :** Zéro route cassée et état précédent restauré.

- [x] **TXW-058 — Mettre en scène les résines.** Créer une galerie de résines aussi qualitative que les fleurs, cohérente avec les cloches et la matière.    
  **Acceptation :** La page résines ne paraît plus vide malgré l'absence de données définitives.

- [x] **TXW-059 — Clarifier les cartes résines non validées.** Prévoir noms génériques seulement comme maquettes, sans prix/taux/origine inventés et avec un discret statut 'démo'.    
  **Acceptation :** Aucun produit fictif présentable comme réel.

- [x] **TXW-060 — Préparer des composants variantes.** Sélecteurs grammages/quantités en lecture seule ou simulation locale, jamais liés au paiement ni à un stock distant en mode démo.    
  **Acceptation :** Interaction sans commande réelle et sans incohérence de prix.

- [x] **TXW-061 — Renforcer les galeries accessibles.** Lightbox, fermeture Escape, retour focus, images alternatives, zoom tactile sans capturer le scroll de page.    
  **Acceptation :** Interaction complète clavier/touch, sans piège.

- [x] **TXW-062 — Introduire un récit produit WOOD.** De petites notes d'humour, profils visuels et badges originaux mais sans affirmations de santé ni notation inventée.    
  **Acceptation :** Identité WOOD perceptible en fiche sans brouiller données.

- [x] **TXW-063 — Tester les cartes et choix mobiles.** Viewport 320/360/375/390/430, menus, boutons, zoom, claviers et petits textes ; adapter les hauteurs sans cacher les actions.    
  **Acceptation :** Aucun prix/grammage/CTA coupé et aucun débordement horizontal.

- [x] **TXW-064 — Créer une recette catalogue de démonstration.** Du hero à la catégorie, à la fiche, au panier fictif et au retour, inclure états vides et erreurs.    
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

- [x] **TXW-073 — Revoir menu principal mobile.** Logo WOOD, menu, accès univers, compte et panier fictif cohérents ; réduire la densité de liens.    
  **Acceptation :** Tactile accessible et sortie de menu évidente.

- [x] **TXW-074 — Auditer la barre basse iPhone.** Corriger safe area, position fixe et disparition à la descente ; ne jamais masquer bouton ni contenu.    
  **Acceptation :** Barre utilisable sous Safari réel et lors du clavier virtuel.

- [x] **TXW-075 — Harmoniser pictogrammes.** Réutiliser la bibliothèque SVG existante (panier, localisation, compte, téléphone, catalogue), mêmes épaisseurs et textes associés.    
  **Acceptation :** Un seul système iconographique accessible.

- [x] **TXW-076 — Clarifier les appels à l'action.** Un CTA principal par zone ; action de visite/contact réelle, action d'achat clairement démo si simulée.    
  **Acceptation :** Aucun bouton n'annonce une fonctionnalité non disponible.

- [x] **TXW-077 — Améliorer recherche et FAQ.** Garder recherche FAQ utile et sans backend ; créer états vide, réinitialisation, focus et navigation clavier fiables.    
  **Acceptation :** Questions retrouvables et lien de contact direct.

- [x] **TXW-078 — Simplifier les formulaires inactifs.** Remplacer les formulaires newsletter/contact non envoyés par une démo explicite ou liens e-mail/téléphone, sans collecte.    
  **Acceptation :** Un visiteur n'entre pas ses coordonnées en croyant envoyer un message réel.

- [x] **TXW-079 — Améliorer la visite de boutique.** Deux adresses présentées clairement, téléphones et itinéraires cliquables ; éviter la formulation 'Port de Nice' et vérifier les horaires avant publication.    
  **Acceptation :** Accès à chaque boutique en un geste, pas d'informations inférées.

- [x] **TXW-080 — Rendre le panier 100 % local.** Si panier conservé dans la démo, le présenter comme simulation sans enregistrement ni paiement distant.    
  **Acceptation :** Les tests réseau constatent zéro écriture distante.

- [x] **TXW-081 — Soigner le retour arrière et les ancres.** Corriger histoire navigateur, ancres avec header sticky, liens base/demo et page 404, en évitant les boucles.    
  **Acceptation :** Navigation stable avec clavier, rechargement et liens profonds.

- [x] **TXW-082 — Définir un parcours de visite 3 minutes.** Accueil → personnalité WOOD → fleurs/résines → WOOD Shop → boutique physique → contact ; signaler les zones fictives discrètement.    
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

- [x] **TXW-089 — Corriger les contrastes.** Mesurer texte crème, anis, vert secondaire et textes sur fonds clairs ; repérer polices trop petites.    
  **Acceptation :** Contraste adapté au niveau AA quand applicable.

- [x] **TXW-090 — Vérifier clavier et focus.** Tab, Shift+Tab, Escape, activation Enter/Espace, focus restauré, noms accessibles et ordre DOM.    
  **Acceptation :** Aucune zone réservée à la souris ou au tactile.

- [x] **TXW-091 — Vérifier VoiceOver et les images.** Alt des photos produit ; SVG décoratifs non lus ; annonces de statut de formulaire ; titres hiérarchisés.    
  **Acceptation :** Parcours compréhensible sans vision des décorations.

- [x] **TXW-092 — Vérifier tous les targets tactiles.** Boutons, liens, croix, flèches et onglets de navigation : viser 44x44 CSS px, espaces de sécurité et aucun recouvrement.    
  **Acceptation :** Aucune cible critique difficile à toucher.

- [x] **TXW-093 — Garantir le mouvement réduit.** Les reveals, stickers, rails et navigation sont fonctionnels avec prefers-reduced-motion ou Save-Data.    
  **Acceptation :** Le contenu reste immédiatement visible sans animation.

- [ ] **TXW-094 — Faire une double revue après reflow.** Captures avant/après par appareil, y compris lignes de texte très longues, menu ouvert et panier vide.    
  **Acceptation :** Les régressions sont capturées et corrigées.

### P9 — Animation, performance et stabilité — 10 tickets

- [x] **TXW-095 — Auditer le budget média.** Lister les images les plus lourdes de la page accueil et des fiches ; prioriser optimisation sans perte visible.    
  **Acceptation :** Budget et tableau avant/après documentés.

- [x] **TXW-096 — Optimiser la première image visible.** Prioriser hero avec dimensions/fetchpriority corrects et éviter les autres images eager trop nombreuses.    
  **Acceptation :** Temps d'affichage du premier écran amélioré ou non dégradé.

- [x] **TXW-097 — Réduire les décalages de mise en page.** Réserver dimensions des médias et des éléments sticky, chargement police et placeholders.    
  **Acceptation :** CLS faible et absence de saut gênant.

- [ ] **TXW-098 — Rationaliser les CSS ajoutées.** Examiner wood-graffiti.css, wood-editorial.css, wood-motion.css et mobile finish ; éviter règles contradictoires et surcharges historiques inutiles.    
  **Acceptation :** Cascade documentée sans casser les composants.

- [ ] **TXW-099 — Optimiser les scripts d'interaction.** Éviter doubles écouteurs, rerenders inutiles, animations globales et importations réseau non essentielles.    
  **Acceptation :** Pas de warning/error console et interactions fluides.

- [x] **TXW-100 — Limiter les effets GPU.** Utiliser transform/opacity pour micro-mouvements, pas d'effets continus gourmands.    
  **Acceptation :** Pas de saccade perceptible sur appareil moyen.

- [x] **TXW-101 — Améliorer les rails média.** Scroll-snap naturel, indices si plusieurs éléments, navigation clavier, arrêt réduit.    
  **Acceptation :** Aucun rail piégé ou silencieusement tronqué.

- [x] **TXW-102 — Assainir les images cassées.** Tester décodage, formats, fallbacks, caches et vrais liens d'assets depuis /demo/.    
  **Acceptation :** Aucun symbole de police brisée ou média disparu sur toutes pages.

- [ ] **TXW-103 — Contrôler réseau lent et déconnecté.** Tester interruptions, 3G/4G simulée, recharge et retour arrière avec données locales.    
  **Acceptation :** Site lisible même si médias tardifs ; pas de faux succès distant.

- [ ] **TXW-104 — Comparer mesures avant/après.** Collecter Lighthouse/Playwright si disponibles, résultats de tests, taille de paquet et captures ; consigner les écarts.    
  **Acceptation :** Aucune dégradation majeure d'accessibilité/performance sans justification.

### P10 — Textes, confiance et conformité de la démo — 8 tickets

- [x] **TXW-105 — Écrire une voix WOOD originale.** Ton chaleureux, direct, premium avec petites phrases amusantes ; bannir le jargon 'placeholder' et les emprunts de slogans concurrents.    
  **Acceptation :** Chaque section reste intelligible sans humour.

- [ ] **TXW-106 — Réduire les labels techniques visibles.** Remplacer les répétitions 'PHOTO DÉMO' et 'à confirmer' par un repère de maquette clair, non ambigu et plus discret.    
  **Acceptation :** Toutes les images fictives restent identifiables sans saturer l'interface.

- [x] **TXW-107 — Vérifier les affirmations commerciales.** Aucune livraison 24h, prix barré, réduction, code promo, laboratoire ou promesse de stock sans approbation ; données de référence non supposées actuelles.    
  **Acceptation :** Zéro promesse non sourcée dans la démo.

- [x] **TXW-108 — Vérifier les allégations CBD.** Supprimer ou neutraliser promesses thérapeutiques, slogans médicaux et catégories d'effets garantis ; garder un discours descriptif prudent.    
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

- [x] **TXW-113 — Exécuter la suite existante.** Lancer npm run check, documenter les résultats exacts et corriger sans supprimer des tests qui échouent.    
  **Acceptation :** Suite verte ou échecs expliqués, avec preuve.

- [x] **TXW-114 — Ajouter les tests de contrat identité.** Tester noms WOOD, couleurs de base, absence de scripts TealerLab/branding concurrent et usage correct du vrai logo.    
  **Acceptation :** Nouvelle identité verrouillée sans écrasement visuel.

- [x] **TXW-115 — Ajouter les tests de sécurité démo.** Intercept/spy les appels API des parcours compte/contact/checkout ; prouver qu'aucune commande, e-mail ou paiement réel ne part de /demo/.    
  **Acceptation :** Tests négatifs reproductibles et réussis.

- [x] **TXW-116 — Contrôler le paquet Pages.** Exécuter npm run prepare:github-pages ; vérifier /demo/, les chemins d'assets, l'absence de secrets, les images et les routes générées.    
  **Acceptation :** Artefact complet et aucune fuite de fichier interne.

- [ ] **TXW-117 — Inspecter le rendu réel.** Capture responsive complète de chaque page ; contrôles manuels Safari/Android si appareils accessibles, sinon signaler ces preuves comme manquantes.    
  **Acceptation :** Pas de déclaration 'testé sur iPhone' sans vraie preuve correspondante.

- [x] **TXW-118 — Préparer un avant / après décisionnel.** Comparer hero, galerie fleur, résines, boutique physique et mobile ; citer modifications et captures. Preuve : `docs/validation/2026-11-07-demo-before-after.md`. Les validations appareil réel et propriétaire restent séparées.    
  **Acceptation :** La propriétaire et son conjoint visualisent le gain et reconnaissent WOOD.

- [ ] **TXW-119 — Produire un état d'avancement sincère.** Pour chaque ticket, consigner statut DONE/PARTIAL/BLOCKED, commit, test et risque ; ne pas inclure les tâches externes dans le pourcentage livrable.    
  **Acceptation :** Pourcentage \= tickets réellement validés / 120, avec catégories distinctes.

- [x] **TXW-120 — Livrer une démonstration réversible.** Publier sur GitHub Pages uniquement après tests et sans activer production ; garder rollback et registre des tâches externes séparé.
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

## Extension conversion et parcours client (128 tickets)

La feuille de route [CRO-001 à CRO-128](2026-11-06-wood-cro-client-first-128-taches.md) approfondit les parcours d'achat, la navigation produit, la recherche, les filtres, les fiches, la confiance, les deux boutiques, la conformité et les tests de décision. **Ne pas recompter comme nouvelles tâches les contrôles TXW déjà faits.** P0 sécurité en premier, démo sans vente, approbation propriétaire exigée pour vrais produits et données.

---

## SECTION B — PLAN CLIENT CRO-001 à CRO-128 (reproduction intégrale du fichier source)

# WOOD SIGNATURE — audit conversion / UX et 128 tâches additionnelles pour Codex

**Date :** 6 novembre 2026    
**Nature :** feuille de route **complémentaire** à TXW-001…TXW-120 et D1-001…D1-025, NON une autorisation de vendre.    
**Dépôt :** Rapt0r06300/CBD-WOOD (`main`)    
**Démo :** https://rapt0r06300.github.io/CBD-WOOD/demo/    
**Positionnement :** qualité d'expérience inspirée de TealerLab, identité intégralement WOOD, **aucune collaboration officielle**.

## Pourquoi cette extension est nécessaire

L'existant couvre déjà le logo, les couleurs, les graffitis, l'accueil, les cartes génériques, la photographie de démo, une FAQ et le responsive. Il reste à optimiser **le choix d'un produit**, pas à ajouter une nouvelle accumulation de sections.

### Audit comparatif fondé sur les pages publiques

| Sujet | TealerLab observé (novembre 2026) | WOOD : réponse originale | Attention |  
|---|---|---|---|  
| Navigation | Univers détaillés, catégories, suggestions, accès recherche | Six univers WOOD cohérents et accès direct aux deux boutiques | Ne pas importer le menu exact |  
| Carte produit | Informations format/grammage/€/g, visuels multiples, badges | Vraies références WOOD, vue sous cloche + macro + prix vérifié uniquement | Pas d'avis/taux/prix inventés |  
| Fiche produit | Galerie, détails, variantes, preuves, recommandations et FAQ | Fiche éditoriale WOOD orientée matière et contact humain | Pas d'allégation médicale |  
| Découverte | Sélections, mood, découverte guidée | Recherche et filtres par critères **factuels et approuvés** | Pas de promesses d'effets |  
| Réassurance | Avis, contenus, garanties, informations de commande | Vraies boutiques, photos autorisées, avis traçables, informations exactes | Ne pas copier garanties concurrentes |  
| Ton | Streetwear, direct, forte personnalité | WOOD \= forêt/anis/crème, noir, stickers, bois, botanique, rétro ponctuel | Ne pas copier marque ni campagne |  
| Client local | TealerLab privilégie vente e-commerce | Avantage différenciant WOOD : découvrir, appeler, venir à Nice | Stock et horaires à confirmer |  
| Démo sécurisée | Paiement commercial réel | Démo WOOD **sans envoi, vente, commande, paiement ou données privées** | Pas de promesse de vente active |

La page d'accueil démo contient actuellement de nombreuses sections et étiquettes « PHOTO DÉMO » ; le catalogue comporte des références de démonstration et la présence de vrais produits ne doit pas être supposée. **Priorité : aider à choisir, montrer une marque réelle, guider vers l'échange et la visite.**

### Pourquoi ce plan privilégie ces fonctionnalités

- **Baymard, Product List UX 2025 :** variations regroupées, plusieurs miniatures, prix/unité, filtres combinables, résumé des filtres et tris — éléments évalués dans la recherche utilisateur.  
- **Baymard, Product Page UX 2026 :** images utiles, navigation manuelle dans la galerie, informations comparables et rassurantes, particulièrement sur mobile.  
- **TealerLab :** excellent exemple de merchandising dense et de navigation commerciale, mais ses arguments marketing/avis/promos ne sont **pas** des données WOOD.  
- **DGCCRF et Service-Public :** communication de vente honnête, caractéristiques, identité vendeur, conditions de vente et mentions réglementaires doivent être validées avant une boutique commerciale. Le CBD et ses catégories exigent un examen propre.  
- **CNIL :** les métriques d'audience et A/B tests utilisant des traceurs n'échappent au consentement que sous des conditions précises ; par défaut aucun tracker externe.  
- **web.dev :** objectifs Web Vitals à viser, mesurés réellement ; ne jamais afficher une performance imaginaire.

## Règles absolues

1. **100 % WOOD.** Ne jamais afficher « TealerLab × WOOD » comme partenariat public ; ne pas copier textes, photos, interfaces signature, promotions ou marque.  
2. **Aucune vente dans /demo/.** Aucun ordre réel, mail, paiement, stock réservé, compte créé, capture de données clients. Panier éventuel \= simulation locale honnête et effaçable.  
3. **Aucune publicité trompeuse.** Pas de faux compteurs de visiteurs, notes, avis, échantillons, promotions, livraisons 24h, résultats de laboratoire, labels, disponibilité, origine ou effets médicaux.  
4. **Photos et messages propriétaire :** le logo officiel et les couleurs existantes priment ; mise en scène sous cloche souhaitée ; photos réelles, droits et libellés doivent être validés.  
5. **Cloudflare D1 Free facultatif**, aucun service ou SaaS payant. Le site reste entièrement utilisable sans Cloudflare.  
6. **Respecter les 138 tâches différées** et l'existant. Ne pas refaire TXW ; ajouter la profondeur par CRO. Le travail commercial futur ne sera ouvert qu'après validation propriétaire + conformité.  
7. Légal : les catégories CBD ont des exigences distinctes ; **pas de conclusion juridique automatique**. Contenus et vente soumis à validation professionnelle avant production.

## Critères de recette orientés utilisateur

- En 5 secondes sur iPhone : identifier WOOD et comprendre quoi découvrir.  
- En 3 gestes raisonnables : trouver une catégorie puis la fiche d'une référence.  
- Depuis une fiche : voir plusieurs angles réels si disponibles, comprendre les attributs vérifiés et demander conseil.  
- Depuis n'importe quelle page : localiser et joindre **Barla** ou **Borriglione** sans confusion.  
- Recherche et filtres : résultats corrects, combinaison, remise à zéro, état vide utile, fonctionnement sans service payant.  
- Les médias de démonstration restent honnêtes, les prix inconnus ne sont pas inventés, et l'absence de photo réelle n'aboutit pas à une image cassée.  
- **Tous les parcours `/demo/` sont sans effet commercial réel**, confirmés par tests réseau.  
- Tests visuels et accessibilité : smartphone, desktop, clavier, reduced-motion, cache froid et réseau interrompu.

## Ordre d'exécution recommandé à Codex

**Priorité absolue P0 :** d'abord CRO-089 à CRO-096 (isolation panier/commande), puis CRO-097 à CRO-104 (réglementation, publicité loyale, droits, données) ; cela reprend/approfondit TXW-005 à TXW-010 sans les compter deux fois.    
**P1 conversion et marque :** CRO-001 à CRO-088, puis CRO-105 à CRO-112 et CRO-121 à CRO-128.    
**P2 optimisation :** CRO-113 à CRO-120, à lancer sans retarder la correction des blocages utilisateur.

Chaque tâche doit être classée `DONE | PARTIAL | BLOCKED-EXTERNAL | TODO | FAILED`, posséder un **commit/test/capture** et ne devenir `DONE` que lorsque ses critères sont vérifiés. Si l'exécution doit attendre un média réel ou la propriétaire, coder le slot/fallback, classer le reste `BLOCKED-EXTERNAL` et poursuivre.

**Avancement :** `CRO % \= 100 × nombre de CRO DONE / 128`. Ne pas mélanger avec le plan TXW (120) ni D1 (25). Un pourcentage global facultatif peut être calculé comme `(TXW DONE + CRO DONE + D1 DONE) / 273 × 100`, mais publier les compteurs `BLOCKED-EXTERNAL` séparément ; **ne pas appeler les tâches différées « terminées »**.

## Tâches de conversion et UX — 128 tickets

### 01 — Comprendre les visiteurs et les décisions d'achat — P1, complément de TXW-082, TXW-112

- [x] **CRO-001 — Définir quatre intentions client**   
  - **Livrable :** Décrire première découverte, connaisseur, achat cadeau non réglementé et visite locale sans supposer les préférences de santé.  
  - **Critère de validation :** Tableau intention → questions → page → action ; aucune catégorie médicale.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-002 — Lister les dix objections avant achat**   
  - **Livrable :** Construire les interrogations prix, qualité, authenticité, disponibilité, usage autorisé, visite, retour, photos, confidentialité et conseils.  
  - **Critère de validation :** Chaque objection pointe vers une réponse sourcée ou un état « information indisponible ».  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-003 — Créer une carte des décisions par étape**   
  - **Livrable :** Documenter Accueil → Univers → Liste → Fiche → Contact ou visite ; prévoir panier fictif séparé.  
  - **Critère de validation :** Aucune étape ne force inscription ou paiement ; liens contrôlés.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-004 — Fixer cinq missions testables**   
  - **Livrable :** Scénarios : identifier marque en 5 s, retrouver une fleur, comprendre un format, trouver Barla et appeler la boutique.  
  - **Critère de validation :** Tâches observables sur mobile sans aide ni explication orale.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-005 — Définir les preuves de confiance nécessaires**   
  - **Livrable :** Associer à chaque hésitation une preuve : photo autorisée, source publique, donnée validée, conseil ou adresse.  
  - **Critère de validation :** Matrice preuve/source/date/propriétaire ; les trous sont signalés.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-006 — Dessiner le parcours local versus catalogue**   
  - **Livrable :** Préparer parcours visite immédiate et parcours exploration produit, chacun avec un CTA clair.  
  - **Critère de validation :** Sur chaque page une action naturelle sans incitation trompeuse.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-007 — Construire un inventaire des frictions**   
  - **Livrable :** Comparer le parcours réel actuel aux cinq missions ; identifier défilement excessif, redondance, écrans vides.  
  - **Critère de validation :** Rapport priorisé avec captures avant correction et risque business.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-008 — Faire valider la promesse WOOD**   
  - **Livrable :** Proposer deux formulations originales courtes, compatibles avec les slogans WOOD et le ton confirmé.  
  - **Critère de validation :** Relecture propriétaire requise avant marquage « approuvé ».  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 02 — Premier écran convaincant — P1, complément de TXW-021 à TXW-024

- [ ] **CRO-009 — Tester la compréhension en cinq secondes**   
  - **Livrable :** Le premier écran doit donner nom WOOD, type de boutique, différence visuelle et destination du prochain clic.  
  - **Critère de validation :** Test sans scroller à 375/390/1440 px et capture.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-010 — Hiérarchiser la proposition de valeur**   
  - **Livrable :** Intégrer une phrase compacte expliquant l'univers indépendant WOOD sans promesse d'effet ni argument inventé.  
  - **Critère de validation :** Un titre, une phrase, une action principale par variante.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-011 — Séparer explorer et venir en boutique**   
  - **Livrable :** Deux intentions distinctes : découvrir les univers et localiser WOOD ; empêcher deux boutons de même poids.  
  - **Critère de validation :** Test parcours jusqu'à la catégorie et l'itinéraire en un petit nombre de gestes.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-012 — Composer un hero photo + signature**   
  - **Livrable :** Prévoir la façade, l'ambiance bois/stickers ou un rendu démo déclaré, en complément du logo authentique.  
  - **Critère de validation :** Pas de ressemblance avec un hero TealerLab ni de fausse photo réelle.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-013 — Préparer variantes éditoriales A/B hors ligne**   
  - **Livrable :** Créer deux variantes de composition seulement, pas deux offres ni des expériences collectant des données.  
  - **Critère de validation :** Comparatif captures et grille de sélection propriétaire.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-014 — Éliminer bruit visuel initial**   
  - **Livrable :** Compter visuels, tags, badges et CTA du premier viewport et supprimer ce qui concurrence la marque.  
  - **Critère de validation :** Révision : la lecture WOOD → message → CTA reste immédiate.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-015 — Contrôler disponibilité de la preuve locale**   
  - **Livrable :** Relier le hero à une vraie photo/coordonnée WOOD, si son usage est autorisé ; sinon montrer une scène neutre.  
  - **Critère de validation :** L'emplacement n'affiche ni source absente ni adresse non vérifiée.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-016 — Soigner état dégradé du hero**   
  - **Livrable :** Tester image absente, cache périmé, police fallback, réseau lent et zoom iPhone.  
  - **Critère de validation :** Aucun symbole cassé ni texte tronqué, CTA toujours accessible.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 03 — Récit de marque plutôt qu'empilement de sections — P1, complément de TXW-024 à TXW-032

- [ ] **CRO-017 — Définir cinq séquences maximales d'accueil**   
  - **Livrable :** Scénario : signature → univers → sélection → vie WOOD → visite/contact, avec FAQ et footer secondaires.  
  - **Critère de validation :** Chaque séquence répond à une question différente.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-018 — Supprimer les répétitions de produits**   
  - **Livrable :** Cartographier chaque occurrence d'une référence et limiter ses réapparitions éditoriales.  
  - **Critère de validation :** Un produit ne se répète que pour une intention explicitement différente.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-019 — Donner un rôle à chaque image**   
  - **Livrable :** Classer chaque photo comme ambiance, détail, produit, boutique, preuve ou décor.  
  - **Critère de validation :** Média sans rôle unique remplacé ou retiré.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-020 — Écrire des transitions narratives**   
  - **Livrable :** Créer de très courts textes entre univers produit, savoir-faire éditorial et boutique physique.  
  - **Critère de validation :** Aucun jargon 'maquette', 'module' ou explication de développement visible.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-021 — Scénariser une introduction à WOOD**   
  - **Livrable :** Faire découvrir boutique indépendante, décor, humour et équipe sans biographie imaginée.  
  - **Critère de validation :** Toute information historique attribuée à une source ou réservée à validation.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-022 — Poser une respiration avant le catalogue**   
  - **Livrable :** Alternance de zones sombres, éléments lime et photographies avec espace blanc volontaire.  
  - **Critère de validation :** Revue visuelle mobile/desktop sans monotonie ni saturation.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-023 — Concevoir une conclusion avec raison de revenir**   
  - **Livrable :** Finaliser par identité, coordonnées et découverte d'univers, pas promesse de promotions fictives.  
  - **Critère de validation :** Lien/contact fonctionne ; pas d'abonnement actif fictif.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-024 — Comparer longueur et pertinence des sections**   
  - **Livrable :** Mesurer scroll en multiples de viewport et temps de découverte des catégories sur mobile.  
  - **Critère de validation :** Réduction de friction mesurée sans supprimer des informations essentielles.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 04 — Architecture de l'information et navigation — P1, complément de TXW-025, TXW-073 à TXW-079

- [ ] **CRO-025 — Établir un menu par besoins réels**   
  - **Livrable :** Grouper Fleurs, Résines, Bien-être, Accessoires, WOOD Shop et Nos boutiques ; ne pas inventer de gamme.  
  - **Critère de validation :** Chaque entrée mène à un contenu effectif ou état de maquette compréhensible.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-026 — Corriger les catégories ambiguës**   
  - **Livrable :** Distinguer accessoires et vêtements si tous deux sont contenus actuellement dans WOOD Shop.  
  - **Critère de validation :** Plan de navigation validé par le catalogue et les photos.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-027 — Créer un chemin depuis chaque fiche**   
  - **Livrable :** Depuis une fiche, montrer la famille, le retour liste et une suggestion pertinente.  
  - **Critère de validation :** Parcours réversible avec liens vers les véritables routes.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-028 — Clarifier menus mobile versus desktop**   
  - **Livrable :** Utiliser des intitulés strictement cohérents, y compris sous-menu et navigation basse.  
  - **Critère de validation :** Aucune destination importante différente selon l'appareil.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-029 — Mettre les deux boutiques dans le menu**   
  - **Livrable :** Offrir un accès direct aux boutiques et coordonnées sans dépendre du footer.  
  - **Critère de validation :** Deux adresses nommées et testées en mobile.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-030 — Éviter les sous-menus excessifs**   
  - **Livrable :** Ne montrer sous-catégories que si elles contiennent effectivement des éléments validés.  
  - **Critère de validation :** Pas de lien vers zéro résultat trompeur.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-031 — Tester chemins de retour**   
  - **Livrable :** Valider liens breadcrumb, historique, ancres et absence de retour vers page 404.  
  - **Critère de validation :** Tests navigation depuis accès direct à un produit.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-032 — Créer une carte des parcours prioritaires**   
  - **Livrable :** Maintenir une table CTA source → destination → état, couvrant toutes les pages.  
  - **Critère de validation :** 0 lien critique cassé au préflight.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 05 — Recherche catalogue et exploration assistée — P1, complément de TXW-053 à TXW-064, TXW-077

- [x] **CRO-033 — Ajouter une recherche produits locale**   
  - **Livrable :** Chercher dans noms et familles du catalogue WOOD de démo sans service payant.  
  - **Critère de validation :** Résultats testés sur les 13 références connues et états vides.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-034 — Gérer variantes de formulation**   
  - **Livrable :** Index de synonymes prudents : fleurs/fleur, résine/hash, boutique/shop, sans inventer familles.  
  - **Critère de validation :** Test des synonymes, accents, casse et apostrophes.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-035 — Afficher un résumé de résultats**   
  - **Livrable :** Nombre réel de fiches trouvées, catégorie et requête, sans faux compteurs.  
  - **Critère de validation :** Résultat stable et exact pour chaque jeu de test.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-036 — Assurer recherche accessible sur mobile**   
  - **Livrable :** Icône, libellé visible, clavier 'search', bouton effacer, focus et Escape.  
  - **Critère de validation :** Tests clavier et petit iPhone ; aucune barrière tactile.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-037 — Fournir une issue à zéro résultat**   
  - **Livrable :** Proposer catégories existantes, effacer filtre et contacter WOOD.  
  - **Critère de validation :** Aucun 'aucun produit' sans action alternative.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-038 — Ajouter recherche par caractéristiques validées**   
  - **Livrable :** Champs texture/arôme/type uniquement si métadonnées sourcées ; pas de suggestions d'effet médical.  
  - **Critère de validation :** Champs manquants non filtrables, zéro caractéristique inventée.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-039 — Préserver le parcours sans JS**   
  - **Livrable :** Pages catégorie et liens restent consultables si l'index JS est bloqué.  
  - **Critère de validation :** Simulation JS disabled et navigation vérifiée.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-040 — Garder la recherche locale par défaut**   
  - **Livrable :** Éviter service de recherche externe ou API payante ; D1 facultatif, non bloquant.  
  - **Critère de validation :** La démo rend des résultats identiques sans réseau Cloudflare.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 06 — Filtres, comparaisons et cartes décisionnelles — P1, complément de TXW-053 à TXW-064, TXW-060

- [x] **CRO-041 — Définir les filtres disponibles réellement**   
  - **Livrable :** Créer un inventaire des attributs vérifiés par univers ; masquer un filtre alimenté de valeurs fictives.  
  - **Critère de validation :** Aucun filtre 'CBD %' ou origine si preuve manquante.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-042 — Permettre la combinaison de filtres**   
  - **Livrable :** Implémenter ET entre catégories de critères et OU entre valeurs d'un même critère.  
  - **Critère de validation :** Unit tests sur combinaisons et zéro résultat.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-043 — Visualiser les filtres actifs**   
  - **Livrable :** Afficher puces appliquées et bouton 'Tout effacer', aussi sur petit écran.  
  - **Critère de validation :** Le résultat correspond toujours aux puces affichées.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-044 — Créer tris honnêtes**   
  - **Livrable :** Nom alphabétique, nouveautés seulement datées, prix seulement quand validés ; pas de best-sellers inventés.  
  - **Critère de validation :** Tri stable et cohérent avec valeurs présentes.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-045 — Consolider les variantes d'un même produit**   
  - **Livrable :** Ne pas créer des doublons de cartes pour chaque grammage ; un produit avec options.  
  - **Critère de validation :** Un slug produit par référence, variantes internes.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-046 — Afficher vues miniatures sur les cartes**   
  - **Livrable :** Prévoir vues principale, macro, contexte si 3 visuels autorisés existent ; sinon ne pas dupliquer.  
  - **Critère de validation :** Contrôles tactile/clavier, pas d'image artificiellement répétée.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-047 — Créer un comparateur 2–3 références**   
  - **Livrable :** Comparer côte à côte propriétés descriptives confirmées et liens fiches.  
  - **Critère de validation :** Case inconnue \= 'Non renseigné' ; aucun profil inventé.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-048 — Mettre le prix au gramme sous condition**   
  - **Livrable :** Calculer €/g seulement sur prix TTC et poids approuvés ; aucun arrondi trompeur.  
  - **Critère de validation :** Tests décimaux, formats FR et absence si donnée invalide.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 07 — Studio produit WOOD : cloches et détails — P1, complément de TXW-043 à TXW-052

- [ ] **CRO-049 — Établir le storyboard photo par catégorie**   
  - **Livrable :** Fleurs/résines : hero sous cloche, macro produit et vue de taille ; textile : porté/détail ; soins : emballage.  
  - **Critère de validation :** Trois besoins informationnels documentés sans prétendre avoir les photos.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-050 — Définir la signature photo sous cloche**   
  - **Livrable :** Spécifier verre transparent, reflets contrôlés, fond vert profond, lumière et sujet fidèle.  
  - **Critère de validation :** La cloche sublime sans masquer la matière ni changer sa couleur.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-051 — Ajouter image d'échelle réaliste**   
  - **Livrable :** Prévoir repère physique neutre autorisé pour volume/taille quand pertinent.  
  - **Critère de validation :** Échelle authentique, produit non grossi artificiellement.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-052 — Séparer images conceptuelles et réelles**   
  - **Livrable :** Registre statut, source, consentement et rendu ; distinguer visuels IA de photos boutiques.  
  - **Critère de validation :** Aucune image conceptuelle déclarée 'photo du produit réel'.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-053 — Photographier l'univers boutique en séquences**   
  - **Livrable :** Préparer slots façade, plantes, étagères, mur stickers et accueil ; demander droits de publication.  
  - **Critère de validation :** Chaque slot possède état prêt/attente, responsable et fallback non mensonger.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-054 — Préparer variantes de recadrage responsive**   
  - **Livrable :** Cadrages 1:1, 4:5, 3:2 validés par photo, object-position documenté.  
  - **Critère de validation :** Aucun crop de logo, prix sur étiquette ou sujet essentiel à 320px.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-055 — Contrôler identité des visuels**   
  - **Livrable :** Écarter marques tierces, produits non WOOD, emballages fictifs et reconstitutions confondues avec le réel.  
  - **Critère de validation :** Checklist des droits, photo origine et validation conservée.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-056 — Tester chargement dégradé de galerie**   
  - **Livrable :** Prévoir placeholder lisible, alt exact, skeleton non permanent et repli image en cas d'erreur.  
  - **Critère de validation :** 0 case vide ou motif '❓' au réseau lent.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 08 — Fiche produit qui répond à toutes les questions — P1, complément de TXW-055 à TXW-062

- [x] **CRO-057 — Établir un ordre d'information par fiche** — nom, famille, média démo, description, faits, grammages, tarifs, validation et retour/contact sont ordonnés dans `fleur.html`/`flower-detail.js` ; preuve : `docs/validation/2026-11-07-flower-detail-review.md`.
  - **Livrable :** Nom, média, famille, description vérifiée, format, prix si réel, preuve, contact / action.  
  - **Critère de validation :** L'essentiel visible sans accordéons imposés sur smartphone.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-058 — Créer une grille de faits vérifiés**   
  - **Livrable :** Taxonomie source/provenance/format/matière/profil descriptif/lot ; aucun champ obligé fictif.  
  - **Critère de validation :** Les données inconnues restent absentes ou signalées honnêtement.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-059 — Présenter la texture et l'aspect**   
  - **Livrable :** Proposer macro, couleur, coupe et observations descriptives sans allégation thérapeutique.  
  - **Critère de validation :** Chaque phrase rattachée à une photo/donnée authentifiée ou marquée démo.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-060 — Clarifier variations et conditionnement** — les cinq grammages de la carte et du sélecteur gardent les mêmes libellés `g`, avec tarifs explicitement associés et simulation locale ; preuve : `flower-detail.js`, `test/product-detail.test.mjs`.
  - **Livrable :** Mêmes libellés de poids et unités sur carte, fiche, comparateur et simulation.  
  - **Critère de validation :** Test cohérence par référence et sélection.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-061 — Créer une FAQ contextuelle par famille**   
  - **Livrable :** Questions récurrentes réellement pertinentes pour fleurs, résines, huiles, vêtements et accessoires.  
  - **Critère de validation :** Réponses non médicales et sourcées ou validation requise.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-062 — Offrir contact conseil depuis fiche**   
  - **Livrable :** Lien téléphone ou page contact avec contexte produit non personnel, sans transmettre de donnée à un tiers.  
  - **Critère de validation :** Action fonctionne et reste explicite sur les horaires.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-063 — Afficher informations absentes clairement**   
  - **Livrable :** Disponibilité, analyse, composition ou provenance inconnue ne devient pas une promesse de qualité.  
  - **Critère de validation :** Pas de badge qualité automatique sans pièce justificative.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-064 — Contrôler la proximité des actions** — contrat mobile ajouté dans `wood-mobile-finish.css`, avec réserve de la navigation basse, cibles 44/48 px, espacements et preuve dédiée. `test/mobile-action-proximity.test.mjs` passe ; les validations physiques restent externes.
  - **Livrable :** Sur mobile, accès à la fiche et au contact sans sticky obstruant ; démo ne propose pas vente réelle.  
  - **Critère de validation :** Vérifié clavier, tactile, zoom et écran compact.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 09 — Prix, choix et valeur perçue sans tromperie — P1, complément de TXW-053, TXW-060, TXW-107

- [ ] **CRO-065 — Construire une source unique des prix**   
  - **Livrable :** Définir fichier/contrat prix unique, statut approbation, date effet, format TTC.  
  - **Critère de validation :** Chaque prix sur carte et fiche provient de la même donnée.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-066 — Gérer prix inconnus sans invention**   
  - **Livrable :** Affichage 'Prix et disponibilité en boutique' si nécessaire, sans fourchette inventée.  
  - **Critère de validation :** Aucun 0 €, prix barré ou faux chiffre affiché en production.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-067 — Clarifier le format avant la valeur**   
  - **Livrable :** Associer chaque tarif validé à sa quantité, unité et conditionnement exact.  
  - **Critère de validation :** Tests €/g et cohérence variante.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-068 — Différencier sélection et vente**   
  - **Livrable :** CTA 'Découvrir' ou 'Nous contacter' en démo ; boutons 'Acheter' désactivés ou fictifs explicitement.  
  - **Critère de validation :** Aucun CTA ne crée de commande réelle via Supabase.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-069 — Écarter urgence commerciale fictive**   
  - **Livrable :** Supprimer compteurs visiteurs, timers, rupture artificielle, dernières pièces et remises non prouvées.  
  - **Critère de validation :** Audit automatisé des chaînes interdites.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-070 — Préparer information coûts de vente future**   
  - **Livrable :** Créer slots frais de livraison, taxes, seuils, retrait ou retours mais désactivés sans règles approuvées.  
  - **Critère de validation :** Aucune promesse logistique publiée par défaut.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-071 — Préparer comparaisons de valeur honnêtes**   
  - **Livrable :** Valeur \= qualité visuelle, informations et service humain ; pas de 'le moins cher' invérifiable.  
  - **Critère de validation :** Tous les superlatifs factuels exigent preuve datée.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-072 — Contrôler mises à jour multi-pages**   
  - **Livrable :** Après changement de prix fictif en fixture, catalogue/fiche/panier démo affichent même somme.  
  - **Critère de validation :** Test d'intégrité unitaire et calculs arrondis.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 10 — Réassurance par vraies preuves WOOD — P1, complément de TXW-028, TXW-031, TXW-109

- [ ] **CRO-073 — Créer une matrice des preuves autorisées**   
  - **Livrable :** Pour chaque preuve : origine, date, consentement, périmètre, expiration, affichage autorisé.  
  - **Critère de validation :** Preuve sans source non rendue.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-074 — Distinguer établissement et note Google**   
  - **Livrable :** Associer avis exact à Barla ou Borriglione, vérifier adresse et auteur public avant citation.  
  - **Critère de validation :** Lien direct source, zéro mélange d'établissements.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-075 — Améliorer section témoignages existante** — extraits courts contextualisés, source accessible, fondu automatique sans flèches ni compteur et état compréhensible si la source est retirée ; les citations restent à revalider par WOOD avant publication finale.   
  - **Livrable :** Afficher extrait court vérifié et contexte, pas de synthèse inventée ni rafale de faux avis.  
  - **Critère de validation :** Page comprend toujours sans avis chargés.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-076 — Valoriser conseils humains**   
  - **Livrable :** Présentation équipe, expertise de service, téléphone et visite, sans inventer titres ou biographies.  
  - **Critère de validation :** Texte marqué 'à valider' hors page jusqu'à autorisation.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-077 — Créer contenu pédagogique non médical**   
  - **Livrable :** Petits guides sur différences de présentations, étiquetage et critères d'achat vérifiables.  
  - **Critère de validation :** Aucune promesse d'effet, traitement ou recommandation de dosage.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-078 — Rendre la source d'information visible**   
  - **Livrable :** Lien vers analyses/étiquettes si autorisées et existantes ; sinon ne pas afficher badge 'lab tested'.  
  - **Critère de validation :** Document vérifié, pas de COA générique inventé.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-079 — Garantir accessibilité des coordonnées**   
  - **Livrable :** Numéro et itinéraire à proximité des fiches et à la fin du catalogue.  
  - **Critère de validation :** Tests liens tel: / cartes, deux boutiques distinguées.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-080 — Créer le module 'Pourquoi WOOD ?'**   
  - **Livrable :** Trois preuves vraies maximum (boutiques, univers, accueil) avec médias autorisés.  
  - **Critère de validation :** Aucune statistique client ou historique non vérifié.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 11 — Du site vers la boutique physique — P1, complément de TXW-028, TXW-079, TXW-082

- [x] **CRO-081 — Créer deux fiches boutique distinctes**   
  - **Livrable :** Barla et Borriglione avec identité WOOD, adresse, coordonnées et statut de vérification.  
  - **Critère de validation :** Aucune confusion adresse/téléphone/horaires.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-082 — Préparer photos de localisation vérifiées**   
  - **Livrable :** Façades avec angle d'arrivée, enseigne lisible et droits ; proposer fallback sans photo.  
  - **Critère de validation :** Image d'établissement correcte pour chaque boutique.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-083 — Créer boutons d'itinéraire directs**   
  - **Livrable :** Générer itinéraire Google/Apple Maps depuis adresse validée ; pas de position de l'utilisateur collectée.  
  - **Critère de validation :** Lien testé sur iPhone/Android.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-084 — Créer lien téléphonique par magasin**   
  - **Livrable :** Affichage humain et href tel: propres à chaque lieu.  
  - **Critère de validation :** Aucune inversion des numéros, tests format E.164 quand pertinent.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-085 — Établir horaire source et fraîcheur**   
  - **Livrable :** Le statut 'horaires à confirmer' reste honnête tant qu'aucune validation propriétaire.  
  - **Critère de validation :** Ne jamais déclarer 'ouvert maintenant' sans calendrier fiable.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-086 — Préparer catalogue vers visite**   
  - **Livrable :** Sur fiche, un bloc 'Voir en boutique / demander conseil' sans inventer du stock local.  
  - **Critère de validation :** Action contact ne prétend pas réserver le produit.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-087 — Concevoir page rendez-vous WOOD**   
  - **Livrable :** Une vue immersive courte : ambiance, accès, deux adresses, CTA itinéraire et contact.  
  - **Critère de validation :** Utilisable sans API cartographique payante ni géolocalisation forcée.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-088 — Tester deux scénarios de visite**   
  - **Livrable :** Depuis l'accueil et depuis une fiche, atteindre le bon magasin et son téléphone.  
  - **Critère de validation :** Temps/clics mesurés pour les deux établissements.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 12 — Panier fictif et préparation d'une commande honnête — P0, complément de TXW-005 à TXW-010, TXW-080

- [x] **CRO-089 — Tracer chaque effet réseau de démo**   
  - **Livrable :** Inspecter appels Supabase, Workers, Gmail, Viva, formulaires et liens de checkout.  
  - **Critère de validation :** Journal et test prouvent 0 écriture/commande/email/paiement externe.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-090 — Neutraliser API de commande côté démo**   
  - **Livrable :** Refuser create-pending-order même si élément HTML redevient actif.  
  - **Critère de validation :** Test E2E: aucun POST vers production, même formulaire forcé.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-091 — Séparer panier conceptuel et production**   
  - **Livrable :** Adapter panier démo local sans authentification ni prix/stock réels supposés.  
  - **Critère de validation :** Panier peut être effacé sans appel serveur ni fuite de données.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-092 — Informer clairement avant confirmation**   
  - **Livrable :** Aucune page 'Commande enregistrée' si aucun backend de vente démo n'existe.  
  - **Critère de validation :** État 'simulation terminée' sans numéro de vraie commande.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-093 — Préparer récapitulatif transparent**   
  - **Livrable :** Afficher uniquement articles démo et sommes si tarif de simulation affiché comme fictif.  
  - **Critère de validation :** Total \= sous-totaux testés, sinon total absent.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-094 — Auditer tout lien d'achat caché**   
  - **Livrable :** Scanner liens, événements JS, raccourcis clavier, boutons, redirects et form submit.  
  - **Critère de validation :** 0 chemin déclenchant effet commercial réel en /demo/.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-095 — Préparer futur parcours sans engagement**   
  - **Livrable :** Documenter livraison, paiement, conditions et identité commerçant comme schéma non activé.  
  - **Critère de validation :** Aucune connexion Viva ni option livraison activée.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-096 — Tester refus d'accès hors démo**   
  - **Livrable :** Tests frontières entre Pages /demo et domaine commercial, scripts et endpoints.  
  - **Critère de validation :** Relecture de sécurité consignée avant publication.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 13 — Marketing responsable et conformité CBD — P0, complément de TXW-105 à TXW-112

- [ ] **CRO-097 — Classifier les produits réglementairement**   
  - **Livrable :** Séparer fleurs/résines, huiles, cosmétiques, comestibles et accessoires ; analyse au cas par cas.  
  - **Critère de validation :** Matrice catégorie → statut légal à vérifier → bloqueur publication.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-098 — Bloquer allégations thérapeutiques**   
  - **Livrable :** Scanner noms, descriptions, FAQ, alt et métadonnées contre formulations de soin/guérison sans justification.  
  - **Critère de validation :** Aucune affirmation santé non autorisée en page publique.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-099 — Vérifier contenu sensible d'usage**   
  - **Livrable :** Supprimer encouragement explicite à usages interdits ou affirmations de sécurité absolue.  
  - **Critère de validation :** Revue juridique humaine des catégories concernées requise.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-100 — Préparer conformité consommation**   
  - **Livrable :** Maquette des mentions vendeur, prix TTC, CGV, rétractation, livraison, politique données avant vente réelle.  
  - **Critère de validation :** Ne pas activer achat sans informations légales complètes validées.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-101 — Interdire dark patterns**   
  - **Livrable :** Contrôler urgence, faux avis, chiffres non prouvés, cases précochées, consentement asymétrique.  
  - **Critère de validation :** Checklist anti-tromperie avec tests de chaînes et capture.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-102 — Concevoir information âge adaptée**   
  - **Livrable :** Documenter contrôle d'âge pertinent par produit/réglementation, sans prétendre qu'un simple pop-up suffit.  
  - **Critère de validation :** Âge et vérification finale déterminés par conseil juridique avant commercialisation.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-103 — Sécuriser images et marques tierces**   
  - **Livrable :** Photos WOOD autorisées, pas de logos concurrents repris depuis le mur stickers ; vérifier licences.  
  - **Critère de validation :** Registre des droits et attribution archivée.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-104 — Contrôler politique confidentialité**   
  - **Livrable :** Aucun email/IP de suivi ou identifiant transmis sans base légale ; analyse CNIL des analytics futurs.  
  - **Critère de validation :** Consentement ou exemption correctement prouvé, sinon aucun traceur.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 14 — Mobile-first, accessibilité et interaction rassurante — P1, complément de TXW-083 à TXW-094

- [x] **CRO-105 — Définir premier viewport mobile cible** — hero compact contrôlé à 320/360/375/390/430 px, avec promesse WOOD, graffiti et CTA dans le flux ; captures Playwright conservées et correctif `<360px` documenté. Les appareils physiques restent externes.
  - **Livrable :** Vérifier logo, marque, promesse, visuel et au moins une action avant ou juste après pli.  
  - **Critère de validation :** Captures 320/360/375/390/430 sans chevauchement.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-106 — Tester les miniatures au toucher** — galerie fleur activable au clic/clavier et au balayage horizontal tactile contrôlé, avec `touch-action: pan-y`, libellé live et repli reduced-motion. `test/flower-touch-gallery.test.mjs` passe ; les appareils physiques restent externes.
  - **Livrable :** Geste swipe contrôlé et boutons accessibles ; carrousel sans scroll horizontal capturé.  
  - **Critère de validation :** iOS/Android avec touch, clavier et reduced-motion.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-107 — Créer barre d'action fiche non intrusive**   
  - **Livrable :** Sur fiche, contact/découverte accessible sans couvrir contenu ni navigation système.  
  - **Critère de validation :** Test clavier virtuel, safe area et zoom.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-108 — Améliorer affichage des prix et poids** — prix, statuts, grammages et actions ont un repli mobile documenté pour 320/390 px et le texte grossi ; aucune promotion ou valeur nouvelle n’est ajoutée. Contrat `test/mobile-price-weight.test.mjs`.
  - **Livrable :** Taille et contraste adaptés, sans casser unités ou cacher CTA.  
  - **Critère de validation :** Audits largeur 320 et grossissement texte.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-109 — Contrôler expérience une main** — menu, recherche, filtres et itinéraires disposent de cibles tactiles ≥44 px et restent dans le flux mobile ; contrôle documenté dans `test/one-hand-mobile.test.mjs`, appareils physiques restant externes.
  - **Livrable :** Menu, recherche, filtres et itinéraire accessibles au pouce sans déplacement forcé.  
  - **Critère de validation :** Protocole manuel et absence de cibles \<44px.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-110 — Rendre filtres manipulables au clavier**   
  - **Livrable :** Focus initial dans panneau, boutons effacer/appliquer, Escape, retour focus.  
  - **Critère de validation :** Test Playwright accessible.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-111 — Tester lecteur d'écran sur parcours client**   
  - **Livrable :** VoiceOver/NVDA ou équivalent sur liste, fiche, menu, contact et panier fictif.  
  - **Critère de validation :** Aucune action uniquement visuelle.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-112 — Tester sans animations ni réseau rapide**   
  - **Livrable :** reduced-motion, Save-Data, cache froid, image erreur et API D1 indisponible.  
  - **Critère de validation :** Toutes les missions achevables sans dépendance externe.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 15 — Visibilité, rapidité et mesure honnête — P2, complément de TXW-095 à TXW-104, D1-015

- [x] **CRO-113 — Documenter les objectifs Core Web Vitals** — seuils LCP/CLS/INP et limites de mesure consignés dans `docs/validation/2026-11-07-performance-budget.md`.   
  - **Livrable :** Cibles publiques LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1 au p75 terrain si données disponibles.  
  - **Critère de validation :** Labo vs terrain différenciés ; pas de score inventé.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-114 — Fixer un budget images par page** — rapport public WebP avec 52 références résolues, 0 PNG et 0 chemin manquant ; objectifs et limites consignés dans `docs/validation/2026-11-07-performance-budget.md`.   
  - **Livrable :** Lister et réduire médias coûteux à leur nécessité commerciale, galerie facultative lazy.  
  - **Critère de validation :** Comparaison poids et qualité réelle sur mobile.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-115 — Réduire scripts non indispensables** — budget des modules locaux, absence de scripts promo/social/analytics tiers et verrouillage démo conservés ; preuve : docs/validation/2026-11-07-script-budget.md, test/script-budget.test.mjs.
  - **Livrable :** Désactiver modules promo, sociale ou animation inactifs qui ralentissent le choix.  
  - **Critère de validation :** Mesure bundle et absence de régression fonctionnelle.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-116 — Créer métadonnées distinctes par univers** — titres, descriptions, OpenGraph, canoniques relatives et `noindex,nofollow` ajoutés aux 12 pages HTML ; contrat automatisé dans `test/public-metadata-contract.test.mjs`.   
  - **Livrable :** Titre, description, canonique, OpenGraph pertinents pour vraie mise en ligne ultérieure.  
  - **Critère de validation :** La démo garde noindex pour ne pas indexer des contenus provisoires.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-117 — Préparer données structurées honnêtes** — objet `Store` limité aux coordonnées Barla confirmées, sans horaires non confirmés, note globale ni avis ; preuve : `docs/validation/2026-11-07-structured-data.md`, `test/structured-data-contract.test.mjs`.
  - **Livrable :** Organization/LocalBusiness/Store seulement sur champs exacts approuvés, jamais Note aggregateRating inventée.  
  - **Critère de validation :** Validation schéma sans erreurs ni information non confirmée.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-118 — Ajouter plan de mesure UX sans cookies** — simulateur local borné, sans stockage ni envoi réseau, couvrant entrée, univers, fiche, téléphone et itinéraire ; preuve : `docs/validation/2026-11-07-ux-measurement-plan.md`, `test/ux-measurement-plan.test.mjs`.
  - **Livrable :** Tester scripts locaux de simulation d'événements ou métriques agrégées non envoyées.  
  - **Critère de validation :** Aucun tracking production activé sans conformité CNIL.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-119 — Définir entonnoir de découverte** — parcours `entrée → univers → fiche → téléphone/itinéraire` vérifié sur les liens locaux, sans événement d'achat ; preuve : `docs/validation/2026-11-07-discovery-funnel.md`, `test/discovery-funnel.test.mjs`.
  - **Livrable :** Événements théoriques entrée → catégorie → fiche → téléphone/itinéraire ; pas de 'achat' enregistré.  
  - **Critère de validation :** Rapport de test sur fixtures sans donnée personnelle.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-120 — Éviter quotas facturables et fragilité cloud**   
  - **Livrable :** Cloudflare D1/Workers Free en opt-in, cache/limites/fallback, aucune dépense.  
  - **Critère de validation :** Site fonctionne sans D1 ; zéro upgrade automatique.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

### 16 — Contrôles de goût, validation propriétaire et livraison — P1, complément de TXW-112 à TXW-120

- [x] **CRO-121 — Créer une grille qualité commerciale WOOD** — grille provisoire motivée sur clarté, désir, authenticité, lisibilité, confiance et visite ; preuve : `docs/validation/2026-11-07-commercial-quality-grid.md`, `test/commercial-quality-grid.test.mjs`.
  - **Livrable :** Évaluer clarté, désir de découvrir, authenticité, lisibilité, confiance et invitation à visiter (1–5).  
  - **Critère de validation :** Scores motivés par captures et tâches, pas une note auto-proclamée.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-122 — Construire planche avant/après client** — six scènes documentées, recommandation de présentation et limites de validation propriétaire ; preuve : `docs/validation/2026-11-07-demo-before-after.md`, `test/demo-before-after.test.mjs`.
  - **Livrable :** Cinq scènes : hero, produit sous cloche, liste, univers boutique, footer/localisation.  
  - **Critère de validation :** Deux variantes et une recommandation documentées.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-123 — Tester sur profils de visiteur distincts** — simulations novice et habitué vérifient les parcours locaux sans inventer de participants, taux ou conversion ; preuve : `docs/validation/2026-11-07-visitor-profiles.md`, `test/visitor-profiles.test.mjs`.
  - **Livrable :** Simuler novice et habitué en tâches sans collecte réelle ; observer obstacles.  
  - **Critère de validation :** Taux d'achèvement sur participants réels seulement si test réalisé.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-124 — Faire une passe 'anti-générique'** — marqueurs WOOD inventoriés sur les écrans importants et éléments génériques limités aux fonctions utiles ; preuve : `docs/validation/2026-11-07-anti-generic-review.md`, `test/anti-generic-copy.test.mjs`.
  - **Livrable :** Identifier blocs pouvant figurer sur n'importe quel site CBD et les remplacer par WOOD authentique.  
  - **Critère de validation :** Chaque écran important contient un marqueur de marque justifié.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-125 — Faire une passe 'anti-TealerLab-copie'** — mécanismes e-commerce adaptés, contenus, assets, campagnes, métriques et partenariat tiers exclus ; preuve : `docs/validation/2026-11-07-anti-tealer-copy.md`, `test/anti-generic-copy.test.mjs`.
  - **Livrable :** Contrôler illustrations, slogan, grilles signatures, couleurs et appels à l'action copiés.  
  - **Critère de validation :** Adaptation fonctionnelle originale, aucune publicité de partenariat.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-126 — Préparer validation propriétaire en 10 minutes** — checklist fermée identité, ambiance, médias, graffitis, produits, mobile, texte et limites, sans approbation présumée ; preuve : `docs/validation/2026-11-07-owner-validation-checklist.md`, `test/owner-validation-checklist.test.mjs`.
  - **Livrable :** Questions fermées sur ambiance, tons, photos, cloches, produits, mobile et texte.  
  - **Critère de validation :** Feedback de la propriétaire explicitement séparé des suppositions.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [x] **CRO-127 — Démontrer parcours complet sécurisé** — smoke test démo documenté de l'accueil au catalogue, filtre/recherche, fiche, itinéraire et checkout fictif ; preuve : `docs/validation/2026-11-07-demo-e2e-smoke.md`, `test/demo-e2e-smoke.test.mjs`.
  - **Livrable :** Playwright : accueil → catalogue → filtre/recherche → fiche → conseil/itinéraire ; checkout fictif isolé.  
  - **Critère de validation :** Zéro lien cassé, zéro réseau commercial, capture par étape.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-128 — Livrer un bilan mesurable et réversible**   
  - **Livrable :** Statuts CRO, preuves tests, changements git, gains/pertes de performance, recommandations restantes.  
  - **Critère de validation :** Aucune tâche owner ou source non reçue cochée DONE.  
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

## Traçabilité et dépendances

- **Plan Signature principal :** [TXW-001 à TXW-120](2026-11-06-wood-signature-edition-120-taches.md) ; ce plan contient les bases visuelles et les tests existants. Ne pas dupliquer une modification déjà prouvée.  
- **D1 gratuit :** [D1-001 à D1-025](2026-11-06-wood-cloudflare-d1-free-autonome.md) ; catalogue local toujours disponible, pas de service payant.  
- **Tâches humaines différées :** [Registre des 138](2026-11-06-wood-attente-identifiants-validations.md) ; photos réelles, prix, produits, avis, consentements, contrats et comptes.  
- **Statut historique :** [109 tâches](../../validation/2026-11-06-109-task-status.md) ; une tâche historiquement « faite » n'est pas automatiquement conforme au nouveau critère CRO.

## Sources vérifiées

- TealerLab (observations publiques, pas une licence) : https://tealerlab.com/ · https://tealerlab.com/collections/fleurs-de-cbd · https://tealerlab.com/products/tangerine-dream  
- Baymard, listes et filtres : https://baymard.com/research-articles/current-state-product-list-and-filtering  
- Baymard, fiches produits 2026 : https://baymard.com/research-articles/current-state-ecommerce-product-page-ux  
- Baymard, mobile : https://baymard.com/research/mcommerce-usability  
- France, commerce électronique (mise à jour 19 juin 2026) : https://entreprendre.service-public.gouv.fr/vosdroits/F23455  
- Ministère de l'Économie, encadrement CBD : https://www.economie.gouv.fr/cedef/CBD-cannabidiol-reglementation  
- CNIL, audience : https://www.cnil.fr/fr/mesurer-la-frequentation-de-vos-sites-web-et-de-vos-applications  
- Google web.dev, Core Web Vitals : https://web.dev/articles/vitals

## Rapport Codex obligatoire

Chaque groupe livré doit produire une matrice `CRO ID / parent TXW / état / commit / test / screenshot / éventuel besoin de validation propriétaire`, des captures avant/après, une preuve réseau « pas d'écriture de commande », un budget média comparé, puis la prochaine tâche non bloquée. Aucune approbation propriétaire présumée.

---

## SECTION C — PLAN CLOUDFLARE FREE D1-001 à D1-025 (reproduction intégrale du fichier source)

# CBD WOOD — feuille de route Codex autonome Cloudflare D1 Free (25 tâches)

**Date :** 6 novembre 2026    
**Statut initial :** plan préparé, **aucune installation utilisateur, connexion Cloudflare, création de base distante ou déploiement attesté**.    
**Dépôt :** `Rapt0r06300/CBD-WOOD` (`main`).    
**Démo :** https://rapt0r06300.github.io/CBD-WOOD/demo/    
**Référence officielle agent Cloudflare :** https://developers.cloudflare.com/agent-setup/prompt.md    
**Plan visuel principal :** [WOOD Signature Edition — TXW-001 à TXW-120](2026-11-06-wood-signature-edition-120-taches.md)

## Mandat — objectif « je n'ai rien à faire » dans les limites réelles

Codex agit **autonomement** sur toute tâche réalisable depuis son environnement et ses connexions, sans demander à l'utilisateur de copier des fichiers, d'écrire du code, d'exécuter des commandes techniques ou de réexpliquer le contexte. Les commandes ne s'exécutent que sur **la machine ou le cloud où Codex fonctionne réellement**, jamais à distance sur l'ordinateur personnel sans accès autorisé.

**Seule exception inévitable :** la création éventuelle d'un compte et le consentement OAuth Cloudflare, demandés par Cloudflare au titulaire. L'agent déclenche le flux OAuth et attend uniquement cette validation, sans demander de mots de passe, de clés ou de jetons à coller. Si OAuth n'est pas faisable dans l'environnement, classer `BLOCKED-EXTERNAL` et poursuivre les tâches locales. Ne jamais promettre d'autonomie totale ni prétendre être connecté.

**Contrat coût : zéro euro.** Utiliser strictement `Workers Free` et `D1 Free`. Avant toute création distante, lire l'offre effective et les limites Cloudflare officielles. Refuser toute carte bancaire obligatoire, upgrade, essai convertissant en payant, facturation ou dépassement facturable. Les quotas gratuits doivent échouer sans facturation : prévoir un repli statique. Ne jamais transformer une erreur de quota en passage automatique au plan payant.

## Contraintes invariantes

- Le site de démonstration reste accessible et sa marque WOOD, son logo, ses couleurs, ses photos et sa mise en scène sont préservés.  
- **Aucune donnée personnelle réelle** ne doit être copiée depuis Supabase. Aucune commande réelle, aucun email réel, aucun paiement Viva, aucun compte client réel, aucun déclenchement commercial en démo.  
- **Supabase existant ne doit être ni supprimé, ni migré en production, ni modifié.** Les éventuels tests de compatibilité reposent sur mocks ou données synthétiques.  
- Écrire seulement des fichiers statiques de code, scripts, migrations et configuration non secrète dans GitHub ; ni clés API privées, ni refresh token, ni secret, ni fichiers .env réels.  
- Le navigateur GitHub Pages n'interroge jamais D1 directement : API publique en lecture seule sur **Cloudflare Worker**, CORS limité à l'origine `https://rapt0r06300.github.io`.  
- S'il n'y a pas de compte Cloudflare, aucune tentative ne doit entraîner l'achat d'un service. La démo statique fonctionne jusqu'à validation de l'API.  
- **Ne pas recopier TealerLab** : uniquement sa qualité d'expérience comme inspiration, identité WOOD exclusivement.  
- Le document `docs/superpowers/plans/2026-11-06-wood-attente-identifiants-validations.md` conserve ses **138 tâches différées**. Ne les considérer ni terminées ni supprimées.  
- La référence visuelle `docs/design/wood-photo-brief.md` impose à tort « sans cloche » ; corriger la consigne du **site démo** pour respecter la préférence récente « sous cloche » de la propriétaire, tout en gardant les photos exactes et leur provenance.

## Déclenchement automatique

1. Lire `AGENTS.md`, ce plan, [plan Signature 120](2026-11-06-wood-signature-edition-120-taches.md), `docs/ops/cloudflare-agent-setup.md`, `.codex/config.toml`, `package.json`, `docs/validation/2026-11-06-109-task-status.md` et le code existant.  
2. Vérifier le dernier état de `main` et obtenir un point de retour Git avant modification.  
3. Repérer l'éventuelle présence des livrables D1 déjà créés ; **réutiliser** les fichiers corrects et ne coder que les différences manquantes. Les ZIP précédemment téléchargés dans ChatGPT ne doivent **pas** être présumés présents sur le disque de Codex.  
4. Exécuter `D1-001` à `D1-025` en tenant un journal `docs/validation/wood-d1-free-progress.md`.  
5. Après chaque tâche : état `DONE`, `PARTIAL`, `TODO`, `BLOCKED-EXTERNAL` ou `FAILED`, preuve (test/commit/log), et pourcentage **réel** calculé `100 × DONE / 25`. Une étape sans test n'est pas `DONE`.  
6. Reprendre automatiquement les autres étapes locales lorsque Cloudflare ou un service externe bloque. Ne pas ouvrir de demande utilisateur sauf consentement OAuth ou décision qui change le coût/le périmètre.

## Phase A — Préflight et agent Cloudflare

- [x] **D1-001 — Audit du dépôt.** Repérer l'architecture HTML/CSS/JS, le catalogue de 13 références démonstration, le flux de commandes actuel, les dépendances et la suite `npm run check`. Preuve : inventaire daté, sans modification distante.  
- [x] **D1-002 — Contrat de non-facturation.** Vérifier les plafonds `Workers Free`/`D1 Free` directement sur la documentation officielle, horodater l'examen et écrire une procédure de refus de service payant. Preuve : liens officiels et règle fail-closed.  
- [x] **D1-003 — Détection outils Codex.** Identifier OS, `node`, `npm`, `npx`, `codex`, `wrangler` et droits d'exécution. Utiliser l'environnement de l'agent, sans prétendre accéder au PC si non connecté. Preuve : commandes disponibles.  
- [ ] **D1-004 — Skills Cloudflare et MCP.** Vérifier `.codex/config.toml`, puis installer les Skills officiels dans l'environnement Codex s'ils manquent ; vérifier les endpoints MCP (API, docs, bindings, builds, observability) sans en créer en double. Le script `scripts/setup-cloudflare-codex.ps1` est utilisable sur Windows seulement si Codex y tourne. Preuve : `codex mcp list` ou diagnostic équivalent.  
- [ ] **D1-005 — OAuth Cloudflare.** Déclencher `codex mcp login cloudflare` ou l'authentification native adéquate. L'utilisateur doit consentir sur le site officiel ; sinon noter `BLOCKED-EXTERNAL`. Preuve : état de connexion vérifié sans divulguer de token.

## Phase B — Base portable SQLite et sécurité locale

- [x] **D1-006 — Inventaire du modèle.** Définir schéma `categories`, `products`, `product_media`, `product_variants`, `site_content` et `schema_migrations`. Les tables de commande/paiement/clients/newsletter sont **hors périmètre** de la démo. Preuve : dictionnaire de données.  
- [x] **D1-007 — Migrations D1.** Créer `backend/cloudflare-d1/migrations/0001_initial_schema.sql` et migrations ultérieures sûres (SQLite D1, clés, unicité, index, timestamps, statuts `demo`/`approved`). Preuve : migrations rejouables localement.  
- [x] **D1-008 — Seed WOOD honnête.** Créer un seed SQL reproductible de **4 catégories** et **13 références fleurs de maquette** basées uniquement sur le registre local `flower-presentation.js`. Pour produits indisponibles, utiliser des états de démo ; prix, stock et allégations inconnus restent `NULL`, jamais inventés. Preuve : comptages et audit des champs.  
- [x] **D1-009 — Tests de base.** Écrire et exécuter des tests SQLite de clés étrangères, contraintes d'unicité, validité des slugs, indices, réexécution idempotente, et absence de données personnelles et commerciales. Preuve : rapport reproductible.  
- [x] **D1-010 — Export et restauration.** Produire une commande d'export des seules données fictives et démontrer une restauration locale. Exclure jetons et données réelles. Preuve : comparaison du nombre de lignes et checksums.

## Phase C — Worker D1 Free, lecture seule

- [x] **D1-011 — Structure Worker.** Créer `backend/cloudflare-d1/wrangler.jsonc`, `src/index.mjs`, `README.md`, `.gitignore`; `database_id` reste un placeholder avant création réelle. `workers_dev` activé pour test, sans domaine payant. Preuve : configuration valide.  
- [x] **D1-012 — API catalog.** Fournir seulement `GET /health`, `GET /v1/categories`, `GET /v1/products`, `GET /v1/products/:slug` et éventuellement `HEAD/OPTIONS`. Réponses JSON stables, limite de résultats et pagination. Preuve : contrats et tests.  
- [x] **D1-013 — Méthodes interdites.** `POST`, `PUT`, `PATCH`, `DELETE` doivent être refusés sans écritures, y compris quand l'API est sollicitée par un client malveillant. Preuve : tests négatifs.  
- [x] **D1-014 — Origines, validation et headers.** CORS limité à GitHub Pages WOOD et localhost de développement ; aucune wildcard avec credentials, aucune clé d'admin côté navigateur, requêtes préparées, pagination bornée, no-store/ETag lorsque pertinent. Preuve : tests d'origines permises/refusées, erreurs 400/404/503.  
- [x] **D1-015 — Performance Free.** Indexer les recherches publiques, limiter les scans et le nombre d'appels Worker, proposer le cache pour les pages de catalogue et un fallback lors d'une panne ou d'une limite de quota. Preuve : tests quota simulé et lecture sans régression.

## Phase D — Création et tests distants (uniquement après OAuth)

- [ ] **D1-016 — Vérifier l'offre du compte.** Lire l'offre Cloudflare réelle via outil officiel. Si `Free` non disponible ou coût requis : STOP sur opérations distantes, consigner `BLOCKED-EXTERNAL`. Preuve : offre vérifiée à 0 €.  
- [ ] **D1-017 — Créer D1 `wood-cbd-demo`.** Exécuter dans le compte approuvé uniquement, sans base payante ni import de données réelles. Capturer l'UUID de la base dans le fichier Wrangler (identifiant non secret) et un journal. Preuve : base D1 existante dans l'offre Free.  
- [ ] **D1-018 — Appliquer les migrations D1 distantes.** Exécuter dans le compte autorisé ; vérifier 4 catégories et 13 références synthétiques, aucun client, aucune commande, aucun paiement. Preuve : requêtes de contrôle en lecture seule.  
- [ ] **D1-019 — Déployer Worker gratuit.** Déployer sur sous-domaine `workers.dev`, uniquement après validation des frais nuls. Pas de domaine commercial, pas d'automatisation d'envoi. Preuve : URL de test et HTTP 200.  
- [ ] **D1-020 — Recette API distante.** Valider schémas JSON, CORS, pagination, erreurs de quotas, 404, refus des mutations et aucune réponse contenant des secrets. Preuve : rapport sans aucune écriture dans la démo.

## Phase E — Intégration progressive et finition Codex

- [x] **D1-021 — Adaptateur frontend opt-in.** Lire le catalogue D1 uniquement lorsque `WOOD_D1_DEMO_ENABLED` est explicitement activé dans une configuration démo non secrète. **Valeur par défaut \= désactivé**. Même HTML, mêmes catégories, aucun prix ou stock inventé. Preuve : comparaison snapshot.  
- [x] **D1-022 — Fallback sûr.** En erreur réseau, quota ou Worker absent, afficher le catalogue local existant sans écran vide. Ne jamais permettre à un click de créer une commande Supabase ni d'envoyer un email depuis la démo. Preuve : tests navigateur et mocks réseau.  
- [ ] **D1-023 — Recette cross-device.** Tester mobile (320, 360, 375, 390, 430), tablette et desktop (768, 1024, 1440), clavier, tactile, focus, zoom, image manquante, a11y, reduced-motion, CLS. Preuve : captures datées et rapport Playwright si disponible.  
- [ ] **D1-024 — Non-régression et rollback.** Exécuter `npm run check`, comparer captures/pages avant-après, garder la bascule off et documenter la désactivation immédiate du Worker sans supprimer D1 ou Supabase. Preuve : journal de test et scénario rollback validé.  
- [ ] **D1-025 — Compte rendu et handoff.** Mettre à jour `docs/validation/wood-d1-free-progress.md` avec 25 statuts exacts, coûts réels (0 € si confirmé), commits, URL si déployée, blockers OAuth et prochaine tâche automatique. Ne pas cocher les validations owner ou secrets. Preuve : bilan final traçable.

## Règles GitHub, tests et arrêt

- Pour les tests, n'utiliser que des DB SQLite et mocks Workers isolés. Jamais de vrais appels qui insèrent chez Supabase, Cloudflare en production, Gmail ou Viva.  
- Faire les étapes locales même sans Cloudflare. Si OAuth absent : D1-005/016–020 en `BLOCKED-EXTERNAL`, et D1-021–025 préparées et testées avec mocks ; aucune confirmation de déploiement inventée.  
- Les fichiers `AGENTS.md`, `.codex/config.toml`, `scripts/setup-cloudflare-codex.ps1`, `scripts/Lancer-Cloudflare-Codex.cmd` et `docs/ops/cloudflare-agent-setup.md` existent déjà : **ne pas les recréer ou modifier sans raison démontrée**.  
- Source de vérité git : `main`. Faire des commits ciblés, ne jamais écraser un travail concurrent, et laisser un rollback documenté.  
- Lors d'une incertitude sur le tarif, ne pas faire l'opération distante et poursuivre le travail de code/test gratuit.  
- La base Cloudflare est un **prototype de lecture catalogue**. Tout basculement futur des comptes, commandes, stocks, emails, factures et paiements nécessite un audit indépendant et un accord spécifique.

## Sources de limites gratuites (à revérifier à l'exécution)

- https://developers.cloudflare.com/d1/platform/pricing/  
- https://developers.cloudflare.com/d1/platform/limits/  
- https://developers.cloudflare.com/workers/platform/limits/  
- https://developers.cloudflare.com/agent-setup/prompt.md

---

## SECTION E — 30 fonctionnalités acceptées (CRO-129 à CRO-158)

- [ ] **CRO-129 — Expérience WOOD animée unique.**  
  - **Livrable :** Animation originale graffiti → verre sous cloche, subtile, optionnelle et sans ralentir l'accès aux produits.  
  - **Recette :** Version statique si reduced-motion; LCP/CLS contrôlés; marque intacte.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-130 — Mur de stickers vivant.**  
  - **Livrable :** Galerie ludique des créations WOOD originales et des motifs autorisés visibles en boutique.  
  - **Recette :** Aucun sticker de tiers copié, navigation tactile/clavier accessible.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-131 — Matières de marque numériques.**  
  - **Livrable :** Créer une bibliothèque sobre de textures verre, bois, papier et encre.  
  - **Recette :** Lisibilité, contraste et poids médias contrôlés.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-132 — Mini-campagnes éditoriales.**  
  - **Livrable :** Prévoir emplacements de campagnes temporaires activables indépendamment.  
  - **Recette :** Aucune fausse promo, faux stock ou tarif ajouté.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-133 — Les petits mots de la propriétaire.**  
  - **Livrable :** Emplacements pour ses vrais commentaires, son ton drôle et ses préférences validées.  
  - **Recette :** Aucune citation attribuée sans accord et source.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-134 — Contrôle fidélité à la vraie boutique.**  
  - **Livrable :** Comparer chaque écran clé à la vraie identité visuelle, façade, déco, cloches et affiches.  
  - **Recette :** Dossier avant/après avec provenance des photos.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-135 — Aperçu rapide produit.**  
  - **Livrable :** Fiche condensée ouvrable depuis liste pour voir les visuels/faits sans perdre le contexte.  
  - **Recette :** Accessibilité, fermeture Escape, retour du focus et lien fiche.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-136 — Favoris WOOD personnels locaux.**  
  - **Livrable :** Ajouter/supprimer localement les références à retrouver plus tard.  
  - **Recette :** Sans compte, sans serveur, suppression accessible.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-137 — Produits récemment consultés.**  
  - **Livrable :** Historique facultatif local et effaçable des pages produit consultées.  
  - **Recette :** Pas de tracking externe, respect désactivation/effacement.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-138 — Comparaison partageable.**  
  - **Livrable :** Créer un comparateur sur les attributs vérifiés de 2 ou 3 références avec lien partageable.  
  - **Recette :** Comparaison reproductible, inconnu explicite, pas de fausse correspondance.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-139 — Recherche tolérante aux fautes.**  
  - **Livrable :** Corriger légères fautes et accents dans les noms et requêtes produits.  
  - **Recette :** Test orthographe, accents, casse et aucun résultat fictif.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-140 — Filtres persistants dans l'URL.**  
  - **Livrable :** Permettre de partager et retrouver une sélection filtrée.  
  - **Recette :** L'URL ne contient aucune donnée privée, état exact après reload.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-141 — Guide client seulement par questions.**  
  - **Livrable :** Offrir un conseiller en langage naturel par questions successives sans imposer de taxonomie.  
  - **Recette :** Je ne sais pas/Peu importe/Passer/Retour/Recommencer accessibles.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-142 — Sélection de la patronne authentique.**  
  - **Livrable :** Mettre à l'honneur ses vrais coups de cœur et ses mots après approbation.  
  - **Recette :** Aucune fausse sélection attribuée à la propriétaire.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-143 — Collections éditoriales WOOD.**  
  - **Livrable :** Créer sélections thématiques descriptives de produits présents dans le catalogue.  
  - **Recette :** Pas de bénéfice médical ou de collection fictive annoncée comme vente.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-144 — Liste à montrer en boutique.**  
  - **Livrable :** Sauvegarder localement des découvertes à demander à l'équipe lors de la visite.  
  - **Recette :** Pas de réservation ou commande; liste partageable/effaçable.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-145 — Partage natif d'une fiche.**  
  - **Livrable :** Partager lien et nom de référence par bouton natif/fallback copie.  
  - **Recette :** Mobile et desktop, pas d'envoi serveur automatique.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-146 — Suggestions expliquées.**  
  - **Livrable :** Présenter les références proches avec pourquoi (famille, format, goût descriptif sourcé).  
  - **Recette :** Explanations exactes, pas d'origine, prix, arôme ou effet inventés.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-147 — Visite photographique WOOD.**  
  - **Livrable :** Parcours dans la boutique via photos autorisées et zones d'intérêt.  
  - **Recette :** Fallback statique et vérification des droits.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-148 — QR codes produit pour vitrine.**  
  - **Livrable :** Générer des liens QR vers fiches publiques utilisables physiquement après approbation.  
  - **Recette :** Chaque QR pointe au bon slug, pas d'accès admin.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-149 — Conseil lié à une fiche.**  
  - **Livrable :** Préparer message de contact contenant uniquement le nom public du produit.  
  - **Recette :** Aucun envoi automatique ni collecte de coordonnées.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-150 — Sélections propres à chaque boutique.**  
  - **Livrable :** Préparer affichage différencié des univers Barla et Borriglione.  
  - **Recette :** Aucun stock local inventé, adresse/horaires vérifiés.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-151 — Itinéraire depuis fiche produit.**  
  - **Livrable :** Laisser choisir la boutique et ouvrir l'itinéraire adapté.  
  - **Recette :** Aucun statut ouvert/en stock non confirmé.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-152 — Test mobile en situation réelle.**  
  - **Livrable :** Scénarios devant vitrine : forte luminosité, réseau lent, navigation d'une main.  
  - **Recette :** Compte rendu avec captures, appareil testé ou preuve manquante.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-153 — Catalogue éditable sans toucher au HTML.**  
  - **Livrable :** Fichiers source structurés + import SQLite/D1 et rendu unique de fiches.  
  - **Recette :** Une modification de source se répercute sur toutes vues sans double saisie.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-154 — Contrôles automatiques de qualité contenu.**  
  - **Livrable :** Vérifier incohérences prix/poids, photos cassées, droits, allégations et titres.  
  - **Recette :** Fixture incorrecte échoue dans CI; pas de contenu fictif en réel.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-155 — Prévisualisation séparée.**  
  - **Livrable :** Préparer une version preview des futures modifications distincte du site démonstration.  
  - **Recette :** Diff et rollback accessibles sans secret.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-156 — Régression visuelle automatisée.**  
  - **Livrable :** Capturer et comparer toutes pages/états sur mobile et desktop.  
  - **Recette :** Contrôle des ruptures visuelles, CTA et Safe Area.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-157 — Registre des droits graphiques.**  
  - **Livrable :** Tracer autorisations et sources pour photos, stickers, citations et affiches.  
  - **Recette :** Un média non validé ne peut apparaître comme réel/official.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-158 — Démo scénarisée pour la propriétaire.**  
  - **Livrable :** Créer une revue de 10 min : hero, assistant, produits, magasins, mobile.  
  - **Recette :** Checklist propriétaire, choix et décisions en attente signalés.  
  - **Statut :** TODO (non implémenté).

---

## SECTION F — 20 tâches d'architecture du conseiller (CRO-159 à CRO-178)

- [x] **CRO-159 — Inventaire automatique des sources produits.**  
  - **Livrable :** Extraire les noms/visuels/variants attestés des sources WOOD existantes, dédupliquer par slug.  
  - **Recette :** Import idempotent; aucun vrai client ou donnée Supabase copiée.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-160 — Schéma D1 de faits extensibles.**  
  - **Livrable :** Tables product_facts, fact_sources, normalized_values, question_rules, import_runs, review_queue.  
  - **Recette :** Migrations SQLite testées; aucun profil de visiteur.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-161 — Extraction factuelle des fiches.**  
  - **Livrable :** Parser titres et descriptifs pour faits littéralement attestés, avec extrait exact.  
  - **Recette :** Aucune propriété non explicitée inventée.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-162 — Normalisation et synonymes.**  
  - **Livrable :** Normaliser fleurs/résines, grammes, millilitres, attributs sensoriels sans confondre effets.  
  - **Recette :** Tests de catégories ambiguës et d'unités.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-163 — Source/fiabilité par attribut.**  
  - **Livrable :** Conserver provenance, version, statut verified/needs_review/unknown et date.  
  - **Recette :** Un fait non confirmé n'est jamais affirmé comme certain.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-164 — File de contrôle des ambiguïtés.**  
  - **Livrable :** Signaler uniquement conflits, informations manquantes critiques et contenus non prouvés.  
  - **Recette :** Aucune obligation de classifier chaque produit manuellement.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-165 — Questions générées depuis les données.**  
  - **Livrable :** Sélectionner les questions parmi les propriétés réellement utiles et discriminantes.  
  - **Recette :** Aucune question sur critère absent; pas de question médicale.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-166 — Dialogue adaptatif déterministe.**  
  - **Livrable :** Poser question suivante selon réponses et candidats restant; gérer Passer, Peu importe, Retour.  
  - **Recette :** Nombre de questions borné, pas de boucle ni tunnel bloquant.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-167 — Contraintes dures et préférences souples.**  
  - **Livrable :** Distinguer exclusions non négociables des souhaits secondaires et du flou.  
  - **Recette :** Un candidat hors contrainte dure n'est pas annoncé compatible.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-168 — Score gratuit et explicable.**  
  - **Livrable :** Algorithme déterministe JS/SQLite sans API LLM payante, tie-break stable.  
  - **Recette :** Même base/choix \= même ordre, aucune faveur au prix ou promo.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-169 — Une recommandation et deux alternatives.**  
  - **Livrable :** Afficher classement transparent et faits qui justifient chaque suggestion.  
  - **Recette :** Références existantes, explanations sourcées, pas de faux avis.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-170 — Aucun match exact : aide honnête.**  
  - **Livrable :** Expliquer contraintes incompatibles et proposer assouplissement volontaire, fiches découvertes ou contact.  
  - **Recette :** Ne jamais dire « parfait » si produit ne répond pas.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-171 — Visiteur sans idée précise.**  
  - **Livrable :** Réponses 'Je ne sais pas' et sélection de découverte clairement non personnalisée.  
  - **Recette :** Toujours une issue utile, pas de produit inventé.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-172 — Disponibilité et données inconnues.**  
  - **Livrable :** Distinguer référence visible en démo d'un produit réellement en stock/à vendre.  
  - **Recette :** Aucun stock/prix/garantie déduits par le moteur.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-173 — Correction des conseils.**  
  - **Livrable :** Bouton 'Pas mon choix' suivi d'une question utile de départage, retour/edit de réponse.  
  - **Recette :** Pas de répétition infinie des mêmes produits.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-174 — Confidentialité des réponses.**  
  - **Livrable :** Conserver session en mémoire volatile et permettre effacement; ne pas demander santé/médicaments.  
  - **Recette :** Aucune donnée client, cookie de profil ou log personnel envoyé.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-175 — Résilience aux fiches incomplètes.**  
  - **Livrable :** Gérer NULL, valeurs contradictoires et catégories sans données.  
  - **Recette :** Pas d'exception SQL/JS; score n'invente pas.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-176 — Tests combinatoires exhaustifs raisonnables.**  
  - **Livrable :** Générer fixtures de réponses, conflits, égalités, aucun résultat et refus de critères.  
  - **Recette :** Invariants vérifiés : aucun faux match, scores stables.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-177 — Mode local sans Cloudflare.**  
  - **Livrable :** Exécuter le conseiller en frontend avec données statiques si Worker/D1 indisponible.  
  - **Recette :** Même UX et zero abonnement nécessaire.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-178 — Recette finale conseiller.**  
  - **Livrable :** Tester novice, connaisseur, aucune préférence, cas impossible, mobile et offline.  
  - **Recette :** Preuves commits/tests/captures et blocages externes séparés.  
  - **Statut :** TODO (non implémenté).

---

## SECTION G — 48 améliorations détaillées mascot/assistant/langage/badges (CRO-179 à CRO-226)

### Assistant flottant — design approuvé (12 tâches)

- [x] **CRO-179 — Direction artistique issue de l'image approuvée.**  
  - **Livrable :** Mascotte souriante type fleur/bourgeon illustré, casquette WOOD, lunettes, esprit sticker BD, graffiti maîtrisé, luxe/chill, verre et bois. Pas de pin-up, Halloween ou style sexuel.  
  - **Recette :** Brief visuel officiel écrit, distinction entre style approuvé et image commerciale finale.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-180 — Respecter le vrai logo WOOD.**  
  - **Livrable :** Maintenir le lettrage authentique existant plutôt que la typographie simulée dans l'illustration.  
  - **Recette :** Contrôle de l'asset officiel sur maquettes desktop et mobile.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-181 — Distinguer la référence d'un visuel publiable.**  
  - **Livrable :** Conserver l'image approuvée comme inspiration; régénérer l'actif final propre, retirer les allégations et textes médicaux présents dans la maquette.  
  - **Recette :** Validation qualité, copyright, textes et allégations avant usage.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-182 — Mascotte SVG/WEBP responsive.**  
  - **Livrable :** Produire une version nette détourée légère, une miniature 1:1 et une variante panneau.  
  - **Recette :** Fichiers optimisés, alt et dimensions stables, fallback.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-183 — Bulle BD 'Besoin d’aide pour choisir ?'.**  
  - **Livrable :** Concevoir la bulle à queue fine, texte exact et une action distincte pour ouvrir l'assistant.  
  - **Recette :** Lisibilité 320px, contraste, aucune phrase qui masque la page.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-184 — Ancrage fixe bas-droite.**  
  - **Livrable :** Position fixed bottom/right avec calcul safe-area, z-index maîtrisé et offsets selon barres de navigation.  
  - **Recette :** Le widget reste visible en montant/descendant et sans couvrir CTA.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-185 — Taille discrète sans devenir invisible.**  
  - **Livrable :** Définir taille réduite/bulle et positions par breakpoint ; privilégier 52–72px de mascotte mobile, bulle compacte.  
  - **Recette :** Test iPhone, Android, desktop et zoom sans obstacle.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-186 — Trois états du widget.**  
  - **Livrable :** Réduit, bulle + avatar, assistant ouvert ; conserver transition sans sollicitation intempestive.  
  - **Recette :** Chaque état atteignable en un clic et fermé par action claire.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-187 — Respecter rejet et réduction.**  
  - **Livrable :** Si le client ferme/réduit, ne pas rouvrir en boucle ni au scroll.  
  - **Recette :** Préférence locale discrète et réinitialisation possible sans suivi.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-188 — Ne pas masquer le bas de page.**  
  - **Livrable :** Repositionner au-dessus de nav, cookies, safe-area, panier local ou clavier virtuel.  
  - **Recette :** Tests de collision sur petits écrans et orientation paysage.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-189 — Ouverture panneau adapté.**  
  - **Livrable :** Drawer mobile, dialog ou panneau desktop bien dimensionné, focus trap et état de fermeture.  
  - **Recette :** Tactile, clavier, Escape, retour focus, aucune page bloquée.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-190 — Parcours de présentation visuelle.**  
  - **Livrable :** Capturer widget minifié/étendu/ouvert, section produit et scroll aux viewports principaux.  
  - **Recette :** Preuve visuelle des états et validation conformité à l'image approuvée.  
  - **Statut :** TODO (non implémenté).

### Assistant accessible et volontaire (8 tâches)

- [x] **CRO-191 — Visibilité sur toutes les routes utiles.**  
  - **Livrable :** Contrôler présence de l'aide sur accueil, fleurs, résines, fiches, WOOD Shop sans écran parasite.  
  - **Recette :** Comportement cohérent par route; pas sur processus sensibles.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-192 — Non-dépendance au cloud.**  
  - **Livrable :** L'avatar et le dialogue rendent sans D1 connecté.  
  - **Recette :** Couper réseau sans casser le bouton d'ouverture.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-193 — Accessible lecteur d'écran.**  
  - **Livrable :** Noms et rôles corrects, ARIA et annonces de changements sans spam.  
  - **Recette :** Parcours VoiceOver/NVDA, tabulation et Escape.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-194 — Animation réduite et autonomie batterie.**  
  - **Livrable :** Pas de clignotement, rebond continu ou GPU gourmand ; reduced-motion et Save-Data.  
  - **Recette :** Tests de fluidité et capture statique.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-195 — Gestion clavier mobile.**  
  - **Livrable :** Le clavier virtuel ne cache ni questions ni bouton passer/retour.  
  - **Recette :** Tests iOS Safari/Android paysage/portrait.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-196 — Bulle intelligible sans impression de chat humain réel.**  
  - **Livrable :** Expliquer que c'est un guide automatisé, non un conseiller humain derrière l'écran.  
  - **Recette :** Aucune confusion support live, pas de faux temps de réponse.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-197 — Invitation contextuelle douce.**  
  - **Livrable :** La bulle est discrète et explicite; pas de pop-up forcée, compte à rebours ni pressions.  
  - **Recette :** Aucun affichage modal automatiquement déclenché au scroll.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-198 — Essais comportementaux widget.**  
  - **Livrable :** Tests click, double click, fermeture, réouverture, scroll, URL directe, cache lent.  
  - **Recette :** Zéro overlay bloquant la navigation ou boutons inertes.  
  - **Statut :** TODO (non implémenté).

### Compréhension intelligente des mots (10 tâches)

- [ ] **CRO-199 — Lexique WOOD versionné.**  
  - **Livrable :** Dictionnaire de termes français connus : puissant, fort, intense, marqué, léger, doux, goût, fruité, terreux, boisé, agrumes, sucré, premium, etc.  
  - **Recette :** Synonymes modifiables sans recompilation du site.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-200 — Normaliser orthographe et variantes.**  
  - **Livrable :** Accents, pluriels, apostrophes, casse, tirets, fautes fréquentes et formes linguistiques.  
  - **Recette :** Test de 50 formulations anonymes de fixtures.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-201 — Détecter les négations.**  
  - **Livrable :** Exemple : « pas fort », « sans goût sucré », « je ne veux pas du lourd ».  
  - **Recette :** Interprétation inverse vérifiée; ne pas attribuer positivement une propriété rejetée.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-202 — Comprendre intensificateurs et atténuateurs.**  
  - **Livrable :** « Très doux », « plutôt léger », « légèrement fruité », « trop puissant ».  
  - **Recette :** Niveau de préférence ajusté seulement avec confiance suffisante.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-203 — Distinguer contexte et sens de « fort ».**  
  - **Livrable :** Ne pas assimiler « goût fort » à puissance de cannabinoïdes ou effet psychoactif ; demander « tu parles du goût ? » si ambigu.  
  - **Recette :** Tests de désambiguïsation, zéro revendication d'effets.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-204 — Discerner souhait et description.**  
  - **Livrable :** Séparer « je veux du fruité » de « je n'aime pas fruité » et « pas sûr du goût ».  
  - **Recette :** Le scoring respecte exclusions et incertitudes.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-205 — Appliquer seuil de confiance et traçabilité.**  
  - **Livrable :** Conserver pour chaque match produit la phrase/source, le motif lexical et état vérifié/proposé.  
  - **Recette :** Aucune inférence proposée comme fait mesuré ou vérité commerciale.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-206 — Réviser automatiquement les collisions.**  
  - **Livrable :** Si descriptions disent léger ET puissant sans contexte, remonter en file de vérification.  
  - **Recette :** Pas de badge public contradictoire.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-207 — Lexique sensoriel non médical.**  
  - **Livrable :** Séparer intensité aromatique, texture, format, provenance, force alléguée; exclure labels médicaux et effets de relaxation.  
  - **Recette :** Les attributs non autorisés n'entrent pas dans score.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-208 — Précision/erreurs sur jeux de test.**  
  - **Livrable :** Construire jeu de phrases positives/négatives/ambiguës et mesurer les faux positifs.  
  - **Recette :** Mauvais match critique \= blocage publication de l'attribut.  
  - **Statut :** TODO (non implémenté).

### Badges/3 logos produits automatiques (10 tâches)

- [x] **CRO-209 — Grammaire des 3 pictogrammes.**  
  - **Livrable :** Définir catégories 'DOUX/LÉGER' (profil descriptif), 'INTENSE/FORT' (intensité aromatique), 'GOÛT/ARÔMES' (notes validées) ; aucun effet médical.  
  - **Recette :** Lexique et sens exact explicites dans documentation.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-210 — Mise en scène premium graffiti.**  
  - **Livrable :** Trois badges originaux style sticker, fond transparent et contours premium ; respecter logo et couleurs.  
  - **Recette :** Cohérence avec mascotte approuvée et lisibilité 320px.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-211 — Règle de sélection automatique.**  
  - **Livrable :** Sur ajout/modif de fleur ou résine, calculer badges à partir de faits validés et métadonnées sourcées.  
  - **Recette :** Sans données, aucun badge fictif affiché.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-212 — Ne pas imposer 3 badges sans preuve.**  
  - **Livrable :** Prévoir 0,1,2 ou 3 pictogrammes affichés, avec 3 familles graphiques disponibles.  
  - **Recette :** Une fiche vide n'affiche pas automatiquement « fort » ou « léger ».  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-213 — Explications courtes et contextualisées.**  
  - **Livrable :** Sous chaque badge, expliquer 'arômes doux décrits dans la fiche' ou 'notes fruitées déclarées', pas 'effet relaxant'.  
  - **Recette :** Chaque mot est justifiable et non médical.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-214 — Conseils contextuels honnêtes.**  
  - **Livrable :** Pour 'Fort', expliquer qu'il s'agit de la description aromatique, non de la puissance médicale; renvoyer vers équipe pour questions de sécurité.  
  - **Recette :** Aucun dosage, consommation ni recommandation médicale.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-215 — Source accessible dans la fiche.**  
  - **Livrable :** Tooltip ou détail « Sur quelle info s'appuie ce pictogramme ? »  
  - **Recette :** Le visiteur peut voir la donnée d'origine/qualification.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-216 — Compatibilité fleurs/résines et variantes.**  
  - **Livrable :** Même pipeline d'icônes sur cartes, fiches, conseiller et comparateur.  
  - **Recette :** Aucune incohérence des libellés entre écrans.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-217 — Contrastes et états incomplets.**  
  - **Livrable :** Badges lisibles en mode sombre/clair, sans couleur seule comme information.  
  - **Recette :** WCAG, alt/texte visible, placeholder propre.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-218 — Vérifier faux badges et automatisation.**  
  - **Livrable :** Cas contradictoires, pièges de mots clés, taux inconnus, attributs NULL et édition de fiche.  
  - **Recette :** Le pipeline retire un badge devenu invalide sans cache obsolète.  
  - **Statut :** TODO (non implémenté).

### D1, automatisation et validation bout en bout (8 tâches)

- [ ] **CRO-219 — Pipeline nouvel article automatique.**  
  - **Livrable :** Entrée unique produit → extraction → analyse lexicale → contrôle source → badges et index questions.  
  - **Recette :** Pas de double saisie manuelle et test d'import idempotent.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-220 — Migrations D1 de labels et lexique.**  
  - **Livrable :** Définir lexicon_terms, attribute_evidence, badge_rules, badge_assignments avec versions/provenance et règles de publication.  
  - **Recette :** Tables SQLite migrations testées sur base fictive, pas de mutation Supabase.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-221 — Moteur de questions piloté par les mots.**  
  - **Livrable :** Les questions sur « goût », « léger », « fort » apparaissent uniquement si elles sont pertinentes et non ambiguës pour les fiches.  
  - **Recette :** Ne demande pas un attribut que le catalogue ne connaît pas.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-222 — Recommandation explicable avec badge.**  
  - **Livrable :** Proposer une référence et deux alternatives avec attributs et badges cohérents, différences justifiées.  
  - **Recette :** Le score n'utilise pas un indice non vérifié.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-223 — Optimiser toutes les combinaisons utilisateur.**  
  - **Livrable :** Tests génératifs : préférences, rejets, toutes réponses facultatives, aucun match, boutique et variantes.  
  - **Recette :** Aucune boucle, aucun faux produit et aucune classification fictive.  
  - **Statut :** TODO (non implémenté).

- [x] **CRO-224 — Écriture des tests de données et UI.**  
  - **Livrable :** Scénarios end-to-end incluant importer fleur, générer badges, poser questions, conseiller et partager.  
  - **Recette :** Suite automatique verte, réseau commercial coupé, captures incluses.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-225 — Recette propriétaire et validation des créations.**  
  - **Livrable :** Présenter mascotte finale, badges, ton, cloches et FAQ avec variantes de décision.  
  - **Recette :** Ne pas marquer « approuvé » sans preuve de validation.  
  - **Statut :** TODO (non implémenté).

- [ ] **CRO-226 — Rapport et rollback exhaustifs.**  
  - **Livrable :** Suivi ID/état/test/commit/risque, mode local si D1 absent, rollback si performance ou sécurité régressent.  
  - **Recette :** Démo réversible sans données client et coût confirmé nul.  
  - **Statut :** TODO (non implémenté).

---

## SECTION H — SPÉCIFICATION ARCHITECTURALE DU CONSEILLER

# WOOD — spécification du conseiller intelligent et de la base D1 (gratuits)

**Date** : 7 novembre 2026. **Statut** : spécification, non déployé.    
**Objectif** : un assistant WOOD accessible via mascotte BD fixe bas droite ; le client répond à des questions simples, et obtient la meilleure recommandation **justifiable** plus 2 alternatives si elles existent.

## 1. Direction artistique définitivement retenue  
**Référence approuvée par l'utilisateur : dernière image générée du conseiller WOOD.** Visuel : vignette d'une boutique aux cloches en verre, mur graffiti premium, palette noir/vert anis/crème avec touches violettes/orangées, petite mascotte botanique **souriante avec casquette WOOD et lunettes**, bulle BD « Besoin d’aide pour choisir ? », trois badges graphiques « Léger / Fort / Goût ». L'utilisateur adore ce style. **La photo-source de Halloween n'est pas la direction à reproduire** et il ne faut **pas** d'esthétique pin-up/« sexy ». Conserver « chic / PREMIUM », « chill / graffiti lover », stickers et humour de la propriétaire. Le vrai logo WOOD du dépôt prime sur le logo illustratif généré. L'image générée est une **référence** : elle montre des descriptions d'effets non autorisées ; elle ne doit pas être déployée telle quelle.

## 2. Widget et ergonomie  
- Petit avatar en bas à droite en `position:fixed`, état avatar+bulle BD ou réduit, ouverture par clic, panneau assistant.  
- Mobile : position calculée avec `env(safe-area-inset-bottom)`, au-dessus de toute barre sticky ; prévoir collision avec panier, bas de page et clavier virtuel. Le widget reste visible quand on scrolle, mais ne doit jamais cacher les commandes essentielles.  
- Pas de pop-up forcée. Fermeture, réduction et réouverture intuitives. Focus, Escape, lecteur d'écran, animation réduite et test iPhone 320–430px.  
- Bulle française exacte : **« Besoin d’aide pour choisir ? »**. Ce n'est pas un humain répondant en direct.

## 3. Guide intelligent : questions uniquement  
1. Le client n'a aucune taxonomie à remplir. Le site choisit automatiquement les questions pertinentes depuis les données **réelles ou explicitement indiquées comme de démonstration**.  
2. Options « Je ne sais pas », « Peu importe », « Passer », « Retour », « Recommencer ».  
3. Questions possibles : préférences descriptives de goût/arôme/texture, format, budget si **prix approuvés**, famille de produit ; aucune question médicale ni demande de traitement/effet thérapeutique.  
4. Moteur gratuit et déterministe de classement des produits. Respect des contraintes dures et critères souples, un premier choix et 2 alternatives justifiées. Aucune correspondance parfaite inventée ; sortie de secours : demander un conseil en boutique ou assouplir un critère **avec consentement du client**.  
5. Aucun modèle d'IA payant nécessaire et aucun profil client enregistré.

## 4. Compréhension des mots et sens  
- Dictionnaire versionné : `léger, doux, subtil, fort, puissant, intense, marqué, goût, arôme, fruité, agrume, terreux, boisé, floral, sucré, crémeux` plus variations.  
- Interpréter **négations**, intensifieurs et contexte. « Je veux un goût fort » décrit l'intensité **aromatique**, et **non** une force psychotrope ; si « puissant » est ambigu, demander « Parles-tu de l'intensité des arômes ? ».  
- Conserver extrait de preuve, source, statut verified/needs_review/unknown, confiance d'extraction. Une caractéristique non prouvée ne devient pas un conseil.  
- Ne pas annoncer CBD « fort » / « léger » en terme d'effet médical ; éviter les conseils de consommation et la classification sur impressions visuelles.

## 5. Trois familles de badges automatiques, sans hallucination  
- **LÉGER / DOUX** : uniquement pour un **profil aromatique doux décrit et vérifié**, jamais pour un effet physiologique.  
- **FORT / INTENSE** : uniquement pour une **intensité aromatique marquée et vérifiée**, pas puissance de CBD/THC.  
- **GOÛT / ARÔMES** : notes aromatiques attestées (fruité, terreux, etc.).  
- Trois dessins « stickers » originaux WOOD avec explication sur fiche, tooltip de provenance, couleurs distinctes et accessibilité.  
- **Ne pas forcer les trois logos sur tous les produits** : seulement ceux supportés par les données ; sinon badge absent ou « à découvrir » neutre.  
- Déclenchement automatique lors de l'ajout ou modification d'une fleur ou résine, propagation carte / fiche / assistant / comparateur ; ne pas recommander à partir de badges provisoires.

## 6. Base automatique D1 sans tri manuel  
- **D1/SQLite Free** si OAuth propriétaire validé ; préparation locale possible immédiatement sans compte.  
- Tables proposées : `products`, `product_variants`, `product_facts`, `fact_sources`, `lexicon_terms`, `badge_rules`, `badge_assignments`, `catalogue_imports`, `review_queue`.  
- Import source existante → extraction faits textuels → synonymes/unités → analyse négation/contexte → validation et provenance → règles de badges et moteur.  
- Une **file d'exceptions** seulement pour les ambiguïtés ; pas de formulaire de 100 champs par produit.  
- API publique **GET uniquement** ; D1 via Worker, CORS de domaine demo; pas d'authentification client ni commandes. Pas de modifications Supabase.  
- Repli catalogue local si D1 inaccessible ou quota Free atteint. Aucun paiement ou upgrade possible.

## 7. Sécurité, conformité et preuves  
- La vitrine actuelle reste une **DÉMO**. Pas de ventes, commande réelle, newsletter, paiement, email, collecte de données personnelles, stockage des préférences client.  
- Supprimer toute promesse d'effets de santé, faux avis, prix, origine, stock, COA, délais, scores marketing sans validation.  
- Test E2E intégral, property tests combinatoires, niveaux inconnus, réseau coupé, mobile responsive, non-obstruction du widget. Mesures Core Web Vitals quand possible.  
- Présentation de la direction artistique à la propriétaire avec validation écrite de l'image finale et des textes.

## 8. Erreurs à éviter  
- **Ne jamais** transformer « puissant » en « effet plus fort » et « léger » en « sûr pour débutant » sans preuves ; éviter les recommandations physiologiques/psychoactives.  
- **Ne jamais** forcer une recommandation fausse pour répondre au souhait de « toujours trouver un produit ». Le conseiller doit **toujours aider**, même si aucun produit ne convient exactement.  
- **Ne jamais** représenter TealerLab comme un partenaire ni reprendre son contenu.

---

## SECTION I — FEUILLE VISUELLE DE BASE DU DÉPÔT (conservée intégralement pour ne rien perdre)

# Feuille de route — refonte visuelle WOOD inspirée de TealerLab

> Plan révisé le 5 novembre 2026 après audit local du site WOOD, vérification responsive Playwright et lecture des patterns éditoriaux publics de TealerLab.

> État complémentaire du 6 novembre 2026 : la checklist des 109 tâches actives,  
> les portes externes et les preuves associées sont suivies dans  
> `docs/validation/2026-11-06-109-task-status.md`.

## Objectif

Faire évoluer WOOD vers une expérience éditoriale premium, riche en photos, séquences, offres, preuves et animations, dans l’esprit de présentation de TealerLab, sans copier son identité, ses textes, ses promotions, ses avis ni ses visuels.

Le périmètre couvre uniquement ce qui est implémentable dans le dépôt actuel. Les décisions du propriétaire, les vraies photos, les données commerciales, les avis certifiés, les comptes externes et la validation finale restent explicitement séparés.

## État constaté

- Le socle WOOD est fonctionnel et responsive : la suite locale passe à 413/413 tests et la largeur mobile reste à 390 px sans débordement observé.  
- La démo possède maintenant une page d’aide `contact.html`, un jeu d’icônes SVG cohérent et des annotations manuscrites optionnelles, sans collecte ni paiement réel.  
- La page d’accueil actuelle possède déjà une direction sombre, une accroche, des CTA, une illustration botanique, un ticker, des sections narratives, une FAQ et une navigation mobile.  
- Le catalogue contient des produits et des images de démonstration, mais l’expérience visible n’a pas encore la densité éditoriale observée chez TealerLab : rails photos, badges honnêtes, choix par humeur, blocs d’offres, séquences sociales, galerie produit et animations de récit.  
- Les graffitis originaux demandés ne sont pas encore livrés comme un pack visuel intégré et vérifiable.  
- Les emplacements de preuve qualité existent maintenant, mais restent vides tant qu’aucune donnée vérifiée n’est fournie.  
- Les éléments dépendant de données externes ne doivent pas être simulés : avis, promotions, prix barrés, résultats de laboratoire, stocks, photos propriétaires et validation juridique.

## Légende

- `[x]` déjà vérifié ou livré.  
- `[>]` faisable dans le dépôt, à implémenter.  
- `[~]` partiellement faisable : préparation locale possible, donnée ou décision externe requise.  
- `[!]` hors dépôt ou validation humaine/externe obligatoire.

## Feuille de route numérotée

### 01 — Référence et périmètre visuel `[x]`

- Conserver les patterns utiles relevés chez TealerLab : hero orienté conversion, catégories par intention, cartes produit riches, rails de photos, packs, preuve sociale, éditorial, FAQ et communauté.  
- Ne reprendre aucun contenu propriétaire : marque, textes, chiffres, avis, promos, photos ou promesses.  
- Critère : chaque future section WOOD doit avoir une justification fonctionnelle et un contenu WOOD réel ou clairement marqué comme attente de contenu.

### 02 — Cartographie WOOD / TealerLab `[x]`

- WOOD conserve son univers botanique, noir/vert, ses noms, son ton, son modèle de données et ses contraintes légales.  
- TealerLab sert uniquement de référence de rythme, hiérarchie, densité média, merchandising et interaction.  
- Critère : la direction finale ne doit pas être une copie visuelle reconnaissable.

### 03 — Direction artistique v2 `[>]`

- Rédiger `docs/design/wood-visual-direction-v2.md` : palette, typographies, grille, arrondis, bordures, textures, traitement photo, règles de badges et usages des graffitis.  
- Définir trois niveaux de hiérarchie : impact commercial, récit éditorial, information de confiance.  
- Ajouter un test de contrat afin que les nouvelles zones utilisent les tokens WOOD plutôt que des valeurs isolées.

### 04 — Pack de graffitis WOOD originaux `[>]`

- Créer `assets/graffiti/` avec au minimum huit assets SVG originaux : flèche, étoile, halo, tag, ligne de vitesse, sticker botanique, tampon de section et accent de carte.  
- Documenter leur usage, leurs variantes clair/sombre, leur taille minimale et leur alternative sans décoration dans `docs/design/wood-graffiti-pack.md`.  
- Intégrer les graffitis comme accents de mise en scène, jamais comme texte illisible, information critique ou imitation de TealerLab.  
- Ajouter un test qui vérifie la présence des assets, leur accessibilité décorative (`aria-hidden`) et l’absence d’impact sur le flux quand ils sont masqués.

### 05 — Intégration des graffitis par zones `[>]`

- Appliquer les assets aux zones hero, sélection, cartes, éditorial, FAQ et footer avec parcimonie.  
- Prévoir des classes de placement stables et des fallbacks CSS pour petit écran, `prefers-reduced-motion` et impression.  
- Vérifier visuellement desktop et mobile après chaque zone ; aucun graffiti ne doit recouvrir un CTA, un prix ou une image produit.

### 06 — Contrat média photos / illustrations `[>]`

- Formaliser les états `demo`, `prepared`, `approved`, `real-photo` dans le modèle et la documentation.  
- Afficher clairement les images de démonstration tant qu’elles ne sont pas remplacées par de vraies photos approuvées.  
- Préparer le contrat de galerie : ratio, focal point, alt, légende, crédit, lazy loading, poster vidéo et fallback.

### 07 — Homepage éditoriale en séquences `[>]`

- Restructurer l’accueil en séquence : hero, preuve immédiate, sélection par intention, meilleures ventes, histoire/atelier, sélection photo, offre ou pack, éditorial, FAQ, lieux/contact et communauté.  
- Chaque séquence doit comporter un titre, une raison de la regarder, un média adapté et une action explicite.  
- Ne publier une offre que si le prix, la disponibilité et la période viennent d’une source validée.

### 08 — Sélecteur d’humeur / intention `[>]`

- Ajouter un composant `mood-selector.js` avec des intentions neutres et propres à WOOD, par exemple découverte, détente, concentration et soirée.  
- Relier chaque intention à des produits réellement disponibles et à une explication courte, sans allégation médicale.  
- Prévoir état initial, sélection clavier, URL partageable, état vide et retour mobile.

### 09 — Cartes catalogue riches `[>]`

- Enrichir les cartes avec média, badge de disponibilité ou nouveauté, profil produit, poids, prix, prix au gramme, action panier et lien détail.  
- Ajouter rails horizontaux et filtres utiles sans sacrifier la lisibilité mobile.  
- Ne pas afficher de faux avis, faux compteurs, faux pourcentages de CBD, prix barrés ou badges promotionnels non sourcés.

### 10 — Pages produit immersives `[>]`

- Construire une galerie, un récit produit, des faits vérifiables, le choix de quantité, le prix au gramme, le CTA d’achat, les produits associés et le bloc qualité déjà prévu.  
- Ajouter zoom ou lightbox accessible, navigation clavier, alt text et fallback quand la photo réelle manque.  
- Maintenir une hiérarchie claire entre découverte, réassurance et achat.

### 11 — Packs et offres `[>]`

- Préparer des composants réutilisables pour pack, économie, sélection saisonnière et bundle de découverte.  
- Les composants restent inactifs ou neutres tant que prix, stock, période et règles d’éligibilité ne sont pas confirmés.  
- Tester calculs, arrondis, panier, état expiré et affichage mobile.

### 12 — Preuves sociales et laboratoire `[>]`

- Prévoir des emplacements pour avis, note, UGC, vidéo, résultats qualité et labels.  
- N’afficher qu’une preuve avec source, date et contexte vérifiables ; sinon afficher un état vide honnête.  
- Ajouter les contrats de données et tests anti-fausse-preuve.

### 13 — Système d’animation `[>]`

- Définir une grammaire de mouvement : révélation au scroll, transitions de rail, zoom photo, changement de sélection et feedback panier.  
- Ajouter durées, easing, seuils d’intersection et règles d’arrêt média documentés.  
- Respecter `prefers-reduced-motion`, `Save-Data`, clavier, tactile et absence de dépendance à l’animation pour comprendre ou acheter.

### 14 — Interactions éditoriales inspirées du pattern TealerLab `[>]`

- Ajouter des rails photos/produits, médias pause/play explicites, légendes, CTA de séquence et retours de progression.  
- Prévoir une expérience sans autoplay sonore, avec contrôle utilisateur et fallback statique.  
- Tester focus, scroll horizontal, lecteurs d’écran et écrans étroits.

### 15 — Univers photo réel `[~]`

- Préparer l’emplacement, les dimensions, le traitement et les alt text des photos de culture, produits, atelier, équipe et lieux.  
- Remplacer les démonstrations uniquement après réception et validation des photos par le propriétaire.  
- Le dépôt peut préparer la structure ; il ne peut pas inventer les photos attendues.

### 16 — Cohérence des pages secondaires `[>]`

- Appliquer la même densité éditoriale aux pages fleurs, résines, huiles, accessoires, histoire, FAQ et contact.  
- Ajouter navigation contextuelle, produits associés et fil de lecture cohérent.  
- Vérifier qu’aucune page ne reste un simple écran catalogue après enrichissement de l’accueil.

### 17 — Accessibilité visuelle et interaction `[>]`

- Contraster textes, prix, badges et boutons ; valider focus visible, ordre de tabulation, noms accessibles et contrôles tactiles.  
- Ajouter tests d’images, SVG décoratifs, lightbox, rails et reduced motion.  
- Vérifier les états vides et erreurs sur chaque composant média.

### 18 — Performance média `[>]`

- Utiliser formats adaptés, dimensions explicites, `loading`, `decoding`, lazy loading et préchargement limité au hero.  
- Éviter que les photos, graffitis ou animations dégradent le LCP, le CLS et l’INP.  
- Mesurer au minimum mobile 4G simulé et bureau avant publication.

### 19 — Légal et commercial `[~]`

- Le gabarit légal interne existe ; compléter avec les textes, mentions, prix, conditions, livraison, âge et preuves validés par le propriétaire.  
- Maintenir les zones non publiables clairement séparées des pages publiques.  
- Bloquer toute affirmation santé, origine, laboratoire ou promotion sans source et validation.

### 20 — Revue visuelle propriétaire `[!]`

- Le propriétaire et sa conjointe doivent valider la direction, le choix des graffitis, le ton, les photos, les offres et la ressemblance de rythme avec la référence.  
- Produire une checklist de validation desktop/mobile avec captures et décisions datées.  
- Cette étape ne peut pas être clôturée par du code seul.

### 21 — Publication et services externes `[!]`

- Vérifier domaine, hébergement, paiements, e-mails, Turnstile, stockage des médias, analytics, recherche et comptes sociaux.  
- Exécuter le préflight Hostinger, la suite complète et les contrôles de sécurité avant mise en ligne.  
- Conserver une procédure de rollback et une liste des secrets/variables fournis hors dépôt.

## Ordre d’exécution faisable dans le dépôt

1. 03 Direction artistique v2.  
2. 04 Pack de graffitis.  
3. 05 Intégration des graffitis.  
4. 06 Contrat média.  
5. 07 Homepage en séquences.  
6. 08 Sélecteur d’humeur.  
7. 09 Cartes catalogue.  
8. 10 Pages produit.  
9. 11 Packs et offres neutres.  
10. 12 Preuves honnêtes.  
11. 13–14 Animation et interactions.  
12. 16 Pages secondaires.  
13. 17–18 Accessibilité et performance.  
14. 19 Compléments légaux dès réception des sources.  
15. 20–21 Validation propriétaire et publication externe.

## Critère de fin de la partie implémentable

La partie locale est considérée prête lorsque les sections 03 à 18 sont codées, les tests passent, les captures desktop/mobile montrent la nouvelle hiérarchie, les graffitis sont originaux et intégrés, les photos de démonstration sont identifiées, les animations ont leur fallback, et aucune donnée commerciale ou preuve non vérifiée n’est présentée comme réelle.

## Hors périmètre automatique

La génération de vraies photos de marque, la validation artistique finale, les prix/promotions/stocks, les avis et preuves de laboratoire, les comptes tiers, les clés de production et la publication finale nécessitent des entrées ou validations externes.

## Extension prioritaire — Cloudflare D1 Free et feuille Signature 120

**Ajout du 6 novembre 2026.** La feuille de route complète **TXW-001 à TXW-120** est maintenant versionnée dans le dépôt : [WOOD Signature Edition 120 tâches](2026-11-06-wood-signature-edition-120-taches.md). Le plan technique pour la base gratuite est [Cloudflare D1 Free autonome — D1-001 à D1-025](2026-11-06-wood-cloudflare-d1-free-autonome.md).

Ces deux plans sont **complémentaires**, non des remplacements : Codex doit réconcilier les tâches déjà réalisées dans `docs/validation/2026-11-06-109-task-status.md`, conserver le registre des **138 tâches externes**, exécuter d'abord les garde-fous de sécurité démo et le travail local faisable, puis gérer les étapes Cloudflare sans services payants.

### Tâche 22 — Intégration Cloudflare dans Codex, offre gratuite uniquement `[>]`

- Appliquer [D1-001 à D1-005](2026-11-06-wood-cloudflare-d1-free-autonome.md) à partir des fichiers déjà présents : `.codex/config.toml`, `AGENTS.md`, `scripts/setup-cloudflare-codex.ps1`.  
- Installer dans l'environnement **effectivement accessible** de Codex et déclencher OAuth Cloudflare si possible. Le consentement du titulaire reste humain ; toute autre étape est automatisable.  
- Aucun abonnement, aucun token dans GitHub, aucune affirmation d'installation distante sans preuve.

### Tâche 23 — Base SQLite/D1 et Worker en lecture seule `[>]`

- Réaliser D1-006 à D1-015 : 4 catégories et 13 références fictives WOOD, API GET, tests SQL, CORS, quota et failover local.  
- Aucun compte, vraie commande, paiement, donnée personnelle, email, promotion ou stock inventé.  
- Conserver Supabase en l'état et GitHub Pages comme site démo principal.

### Tâche 24 — Cloudflare Free distant quand l'OAuth est prêt `[~]`

- Réaliser D1-016 à D1-020 seulement si le plan `Workers Free / D1 Free` est vérifié à **0 €** ; sinon tâches `BLOCKED-EXTERNAL` et poursuite des autres tests.  
- Tester la base distante, Worker `workers.dev`, sécurité et limites ; ne pas publier une boutique commerciale.

### Tâche 25 — Connexion optionnelle, non-régression et preuves `[>]`

- Réaliser D1-021 à D1-025 ; adaptateur D1 **désactivé par défaut**, repli catalogue local, contrôles responsive et sécurité, `npm run check`, journal de progression et rollback.  
- Aucune migration réelle ou coupure de Supabase sans consentement explicite à une phase ultérieure.

**Priorité nouvelle :** P0 sécurité et isolation démo → D1 local gratuit et plan Signature → D1 distant uniquement après OAuth gratuit → recette visuelle et responsive, sans bloquer les autres tâches sur les identifiants.

## Extension orientation client / décision d'achat

À cette feuille visuelle s'ajoute [la feuille CRO client-first de 128 tâches](2026-11-06-wood-cro-client-first-128-taches.md) : catalogue trouvable, résultats filtrables et comparables, fiche produit qui répond aux hésitations, provenance des contenus, localisateur des deux boutiques, contrôle anti-faux arguments et épreuves de navigation client. Elle apporte des critères plus fins à la conception TXW sans la remplacer. P0 : isolation démo et légalité ; P1 : parcours ; P2 : performance/mesure.

---

## SECTION J — REGISTRE INTÉGRAL DES 138 TÂCHES DIFFÉRÉES (en lecture seule, ne rien supprimer)

# WOOD — Tâches en attente d’informations, d’identifiants et de validations

**Date de séparation :** 6 novembre 2026    
**Projet :** site **DÉMO** CBD WOOD, dépôt `Rapt0r06300/CBD-WOOD` (branche `main`).    
**Source :** [feuille de route principale](./2026-11-04-wood-tealerlab-roadmap.md).    
**Statut :** mises en attente, **pas réalisées**, **pas abandonnées**.

Ce document conserve les **138 cases ouvertes retirées de la feuille active** : 102 dépendantes de la propriétaire ou de données finales, 32 nécessitant des comptes/configurations externes et 4 des validations physiques sur appareils. Les **109 autres cases ouvertes** restent dans la feuille de route active pour poursuivre l'amélioration de la démo.

**Règle :** ne jamais envoyer de mots de passe, secrets OAuth, clés Viva, clés Supabase privilégiées ou jetons de messagerie dans GitHub ni dans des fichiers du site. Les configurer plus tard dans les gestionnaires de secrets prévus. Ne jamais considérer une case déplacée comme validée et ne jamais déclencher de vente ou e-mail réel sur la démo.

## Porte de clôture commerciale — hors feuille active

Ces huit groupes concernent la recette finale et non les améliorations réalisables de la démo. Ils restent volontairement séparés du code déjà vérifié ; aucun identifiant ou secret n’est demandé avant cette étape finale.

1. **Décisions de la propriétaire :** fournir stocks, photos réelles sans bocal ni cloche, descriptions validées, références graffiti/stickers, données légales et règles finales de livraison (zones, transporteur, frais, délais, minimum, suivi, emballage et retours).  
2. **Catalogue réel :** saisir les produits, prix, stocks et disponibilités dans Supabase ; vérifier les 13 fleurs, les règles propres à chaque variété et les univers résines, bien-être/huiles et WOOD Shop sans inventer de contenu manquant.  
3. **Sécurité Supabase :** décider l’application de `supabase/migrations/20261105232000_rate_limit_rls.sql`, activer Leaked Password Protection, renseigner les URL/redirects finales, confirmer Turnstile et exécuter la recette anon/client/owner.  
4. **E-mails Gmail :** connecter le compte de la propriétaire par OAuth serveur, configurer l’expéditeur et le domaine, publier SPF/DKIM/DMARC, lancer des tests reçus avec PDF et vérifier les rebonds ; aucune newsletter réelle avant cette validation.  
5. **Paiement Viva :** fournir les identifiants professionnels, tester le sandbox puis le webhook signé, l’idempotence, la réconciliation et les scénarios refus/expiration/remboursement ; le paiement reste séparé et désactivé avant cela.  
6. **Hébergement et domaine :** transférer le paquet contrôlé dans l’hébergeur choisi, relier le domaine `.fr`, vérifier DNS/HTTPS/404/cache/retour arrière et rejouer le smoke test sans publier secrets, tests ou route admin.  
7. **Recettes humaines :** tester sur Safari iOS/macOS, Chrome Android/Windows, Edge, Firefox, Linux, appareils réels, zoom 200/400 %, clavier virtuel et orientation ; obtenir séparément l’accord « c’est toujours WOOD » de la propriétaire et « la présentation est aussi travaillée que TealerLab » de son conjoint.  
8. **Passation :** remettre les comptes, sauvegardes et procédures à la propriétaire, vérifier qu’elle peut gérer seule, puis retirer ou rétrograder les accès de construction après son accord écrit.

Tant que ces huit groupes ne sont pas prouvés, la prévisualisation GitHub Pages reste une démonstration et le dépôt reste la version de travail ; aucune ouverture commerciale n’est déclarée.

**Spécification détaillée :** `docs/audits/2026-11-04-tealerlab-wood-compatibility-audit.md` et les contraintes validées ci-dessous.

## Cases d'origine, archivées sans perte

Les numéros de ligne indiquent l'emplacement dans la feuille de route **avant** cette extraction. Les identifiants `Axxx` sont conservés à l'identique pour préserver le suivi global des 700 tags.

### Informations, supports et validations de la propriétaire (102)

- [ ] Attendre les exemples graphiques de la propriétaire avant de définir les formes, textures, personnages ou motifs définitifs.

  _Source : Tâche 4 — Créer le système d’accents graffiti et chill · ancienne ligne 186._

- [ ] Générer les futurs visuels à partir de ces références validées, sans remplacer le logo ni modifier les couleurs WOOD.

  _Source : Tâche 4 — Créer le système d’accents graffiti et chill · ancienne ligne 187._

- [ ] Ajouter plus tard une zone “sélection WOOD” uniquement lorsque les produits, stocks et photos sont réels.

  _Source : Tâche 5 — Améliorer la hiérarchie de l’accueil sans changer son identité · ancienne ligne 198._

- [ ] Préparer des emplacements pour avis, photos produit réelles sans contenant et preuves de qualité lorsque la propriétaire les transmettra.

  _Source : Tâche 7 — Structurer la preuve de confiance · ancienne ligne 213._

- [ ] Faire valider et documenter la règle exacte pour les quantités entre les paliers affichés (`2 g`, `4 g`, `6–9 g`, `11–24 g`) avant d’autoriser leur achat ; ne jamais arrondir silencieusement ni inventer un tarif.

  _Source : Tâche 12 — Implémenter le moteur de prix exact · ancienne ligne 267._

- [ ] Définir côté propriétaire : code, période, type de réduction, montant, plafond, produits concernés et nombre d’utilisations.

  _Source : Tâche 18 — Préparer les vouchers sans les activer · ancienne ligne 323._

- [ ] Remplacer les images temporaires uniquement après réception et validation des originaux.

  _Source : Tâche 27 — Préparer l’intégration des vraies photos produit · ancienne ligne 423._

- [ ] Retirer l’accès de Florent uniquement lorsque la propriétaire confirme qu’elle est autonome.

  _Source : Tâche 35 — Préparer la passation à la propriétaire · ancienne ligne 499._

- [ ] Montrer d’abord l’accueil et les quatre univers.

  _Source : Tâche 38 — Validation humaine avec la propriétaire · ancienne ligne 525._

- [ ] Montrer ensuite une fleur avec son prix réel et son sélecteur de grammes.

  _Source : Tâche 38 — Validation humaine avec la propriétaire · ancienne ligne 526._

- [ ] Montrer le panier et le parcours livraison.

  _Source : Tâche 38 — Validation humaine avec la propriétaire · ancienne ligne 527._

- [ ] Montrer enfin l’espace propriétaire séparé visuellement des comptes clients.

  _Source : Tâche 38 — Validation humaine avec la propriétaire · ancienne ligne 528._

- [ ] Noter les retours sans modifier au hasard ; chaque changement doit être relié à une tâche et retesté.

  _Source : Tâche 38 — Validation humaine avec la propriétaire · ancienne ligne 529._

- [ ] Toutes les tâches bloquantes sont validées.

  _Source : Tâche 39 — Feu vert final · ancienne ligne 535._

- [ ] Les stocks réels sont renseignés par la propriétaire.

  _Source : Tâche 39 — Feu vert final · ancienne ligne 536._

- [ ] Les règles de livraison sont confirmées.

  _Source : Tâche 39 — Feu vert final · ancienne ligne 537._

- [ ] Faire valider une première planche visuelle par la propriétaire avant de généraliser les accents.

  _Source : Tâche 40 — Valider la direction WOOD chic, premium, chill et graffiti · ancienne ligne 552._

- [ ] Ajouter une réassurance WOOD authentique, une FAQ lisible et une présentation photographique réelle sans contenant.

  _Source : Tâche 43 — Ajouter seulement les mécanismes TealerLab compatibles · ancienne ligne 576._

- [ ] Exiger une prise de vue sans bocal ni cloche, avec cadrage photographe et éclairage maîtrisé.

  _Source : Tâche 45 — Préparer les vraies photos de fleurs et résines · ancienne ligne 595._

- [ ] Remplacer les illustrations temporaires uniquement après validation des originaux.

  _Source : Tâche 45 — Préparer les vraies photos de fleurs et résines · ancienne ligne 597._

- [ ] Présenter la photo réelle sans contenant, le nom, le niveau, la description, la sélection de grammes, le prix et l’ajout.

  _Source : Tâche 57 — Mettre en scène la fiche produit · ancienne ligne 977._

- [ ] Ajouter plus tard une zone de présentation détaillée, uniquement avec les informations réelles fournies par la propriétaire.

  _Source : Tâche 57 — Mettre en scène la fiche produit · ancienne ligne 978._

- [ ] Attendre les photos réelles sans contenant et les références graffiti de la propriétaire.

  _Source : Tâche 58 — Préparer les visuels WOOD · ancienne ligne 985._

- [ ] Générer ou préparer les images uniquement après validation de la direction graphique.

  _Source : Tâche 58 — Préparer les visuels WOOD · ancienne ligne 986._

- [ ] Faire valider deux phrases séparément : « c’est toujours WOOD » pour la propriétaire et « la présentation est aussi travaillée que TealerLab » pour son conjoint.

  _Source : Tâche 64 — Recette visuelle WOOD × TealerLab · ancienne ligne 1042._

- [ ] **A10 — Créer la future sélection WOOD :** uniquement avec produits, photos, stocks et prix validés.

  _Source : Sous-tâches ajoutées — `A01–A40` · ancienne ligne 1101._

- [ ] **A40 — Faire valider en deux temps :** d’abord `c’est toujours WOOD` par la propriétaire, puis `la présentation est aussi forte que TealerLab` par son conjoint.

  _Source : Sous-tâches ajoutées — `A01–A40` · ancienne ligne 1131._

- [ ] **A41 — Identité légale de la boutique :** recueillir raison sociale, adresse légale, SIRET, contact et informations nécessaires aux pages légales ; validation : propriétaire et conseil compétent valident les données publiées.

  _Source : Conformité, données personnelles et comptes clients · ancienne ligne 1184._

- [ ] **A42 — Âge et public autorisé :** confirmer avec la propriétaire et le conseil si un contrôle d’âge ou un message majeur est requis pour les produits exacts ; validation : règle écrite, parcours non bloquant pour les visiteurs autorisés.

  _Source : Conformité, données personnelles et comptes clients · ancienne ligne 1185._

- [ ] **A46 — Conservation et effacement :** documenter la durée des comptes, paniers, commandes, e-mails, logs et sauvegardes ; validation : une suppression demandée ne détruit jamais une obligation légale de conservation sans décision documentée.

  _Source : Conformité, données personnelles et comptes clients · ancienne ligne 1189._

- [ ] **A47 — Règles de livraison finales :** confirmer zones, transporteur, frais, délais, minimum éventuel, suivi, emballage et retours ; validation : un document propriétaire alimente les textes et le calcul réel.

  _Source : Livraison et traitement de commande · ancienne ligne 1193._

- [ ] **A54 — Annulation et remboursement :** définir qui peut annuler, à quel état, avec quel justificatif et comment l’e-mail client est déclenché ; validation : aucun remboursement fictif n’est confirmé avant Viva.

  _Source : Livraison et traitement de commande · ancienne ligne 1200._

- [ ] **A76 — Passation propriétaire :** transférer dépôt, Supabase, domaine, hébergeur, e-mail, paiement et sauvegardes avec accès séparés ; validation : la propriétaire peut gérer sans Florent.

  _Source : Supervision, continuité et passation · ancienne ligne 1234._

- [ ] **A77 — Retrait des accès de construction :** prévoir suppression ou rétrogradation de l’accès de Florent après validation écrite ; validation : les comptes clients et l’administration restent fonctionnels.

  _Source : Supervision, continuité et passation · ancienne ligne 1235._

- [ ] **A87 — Intégrer le logo officiel exact :** utiliser uniquement le fichier transmis par la propriétaire, sans branche ajoutée, déformation, recoloration ou reconstruction ; validation : comparaison visuelle avec l’original et test sur fond clair/sombre.

  _Source : Direction artistique, composition et identité · ancienne ligne 1255._

- [ ] **A123 — Prévoir les emojis avec parcimonie :** utiliser uniquement un petit jeu choisi par WOOD dans les zones éditoriales ou badges, jamais dans le prix, le paiement ou les erreurs ; validation : le rendu reste premium si les emojis sont désactivés ou absents.

  _Source : Fiches, textes, emojis, animations et contrôle final · ancienne ligne 1303._

- [ ] **A125 — Ajouter l’humour WOOD :** prévoir des micro-formules et annotations qui donnent du caractère sans gêner la compréhension ni banaliser une commande ; validation : chaque phrase humoristique a une version neutre et n’apparaît pas dans les messages d’erreur.

  _Source : Fiches, textes, emojis, animations et contrôle final · ancienne ligne 1305._

- [ ] **A139 — Faire une revue “propriétaire” :** contrôler identité WOOD, couleurs, logo, ton premium/chill/graffiti, photographie produit, simplicité et absence de promotion ; validation : aucune modification graphique majeure n’est retenue sans accord.

  _Source : Fiches, textes, emojis, animations et contrôle final · ancienne ligne 1319._

- [ ] **A140 — Faire une revue “conjoint” :** contrôler énergie de la page d’accueil, présentation des produits, densité, menu, animations et ressemblance de structure avec TealerLab ; validation : la ressemblance porte sur l’expérience, jamais sur les assets ou textes copiés.

  _Source : Fiches, textes, emojis, animations et contrôle final · ancienne ligne 1320._

- [ ] **A159 — Organiser la validation propriétaire/conjoint :** produire une planche avant/après centrée sur l’accueil, la présentation des fleurs, le menu et les animations ; validation : la propriétaire valide l’identité WOOD et son conjoint valide l’énergie de présentation, séparément.

  _Source : Audit de production visuelle et contenu catalogue — tags `A141–A160` · ancienne ligne 1409._

- [ ] **A160 — Remplacer les assets de démo au dernier moment :** conserver un commit/branche de sauvegarde, remplacer uniquement les fichiers et le registre approuvés, puis rejouer la recette complète ; validation : rollback possible et aucun changement non demandé de couleur, logo, carte, prix ou navigation.

  _Source : Audit de production visuelle et contenu catalogue — tags `A141–A160` · ancienne ligne 1410._

- [ ] **A168 — Installer un bloc “sélection du moment” :** mettre en avant quelques fleurs réellement publiées avec intro éditoriale, visuels distincts et lien `Voir toutes les fleurs` ; validation : la sélection ne crée pas de faux best-seller ni de préférence inventée.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1446._

- [ ] **A170 — Ajouter un état éditorial de nouveauté sans promesse :** prévoir un badge `Nouveau` uniquement lorsqu’une référence est réellement nouvelle et validée ; validation : aucun badge `best-seller`, `populaire`, `pro` ou note n’est généré automatiquement.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1448._

- [ ] **A175 — Ajouter une galerie produit sans surcharge :** prévoir une image principale et quelques vues réelles futures sans contenant, sans carrousel obligatoire pour une seule photo ; validation : chaque image a un alt text, une taille réservée et une fermeture tactile fiable.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1453._

- [ ] **A176 — Ajouter un bloc de garanties seulement avec des preuves WOOD :** réserver l’emplacement à conformité, qualité, préparation et service, mais n’afficher aucune phrase avant validation documentaire ; validation : le bloc peut rester vide ou masqué sans créer de trou visuel.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1454._

- [ ] **A179 — Préparer une zone communauté non active :** étudier un futur bloc de photos/stickers/graffiti de la boutique, sans faux témoignage, faux compte social ou contenu récupéré ; validation : aucun contenu communautaire n’est affiché sans autorisation.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1457._

- [ ] **A180 — Préparer les avis sans les simuler :** réserver la hiérarchie visuelle d’une note et de commentaires comme sur TealerLab, mais afficher un état vide tant que la propriétaire ne fournit pas de données vérifiables ; validation : aucun nombre ou étoile inventé.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1458._

- [ ] **A190 — Faire signer la version de référence :** conserver une capture desktop, mobile et tablette validée par la propriétaire et son conjoint avant d’engager la refonte ; validation : tout changement ultérieur est comparé à cette référence et peut être restauré.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1468._

- [ ] **A201 — Définir le vocabulaire graffiti WOOD :** formes, épaisseurs, énergie, irrégularités et niveau de contraste à partir des références de la propriétaire ; validation : vocabulaire original et documenté.

  _Source : Graffiti et stickers WOOD · ancienne ligne 1522._

- [ ] **A240 — Faire signer le langage animé WOOD :** choisir les animations retenues, refusées et optionnelles avec la propriétaire et son conjoint ; validation : document de référence archivé avant déploiement.

  _Source : Animations et expérience premium · ancienne ligne 1570._

- [ ] **A242 — Obtenir une capture plane de meilleure qualité :** demander un scan ou une photo sans perspective, reflet ni ombre pour les futurs découpages ; validation : texte, pictogrammes et tarifs sont lisibles à 100 %.

  _Source : Décomposition visuelle constatée · ancienne ligne 1587._

- [ ] **A256 — Recenser les pictogrammes par variété :** associer chaque icône visible à son nom exact sans deviner sa signification ; validation : registre propriétaire relu avec la photo originale.

  _Source : Pictogrammes, catégories et données · ancienne ligne 1604._

- [ ] **A257 — Créer une bibliothèque d’icônes WOOD :** vectoriser ou redessiner uniquement les pictogrammes validés, sans les lisser jusqu’à perdre leur personnalité ; validation : chaque icône possède une version couleur, monochrome et sans image.

  _Source : Pictogrammes, catégories et données · ancienne ligne 1605._

- [ ] **A280 — Faire valider la direction de la carte :** soumettre une planche `conservé / adapté / exclu` à la propriétaire ; validation : aucune intégration finale avant son accord.

  _Source : Transposition web et campagne · ancienne ligne 1631._

- [ ] Ajouter, si la propriétaire le valide, un mini-guide très simple : `CBD boosté (strong)`, `CBD soft (medium)` et `CBD classique`.

  _Source : Tâche 65 — Ajouter un guide de choix WOOD sans recherche ni filtre · ancienne ligne 1673._

- [ ] Préparer l’emplacement d’un avis, d’une note ou d’un témoignage uniquement lorsque de vraies données seront disponibles.

  _Source : Tâche 67 — Prévoir les avis et preuves de qualité sans les fabriquer · ancienne ligne 1691._

- [ ] Afficher la source et le statut vérifié si la propriétaire valide le principe.

  _Source : Tâche 67 — Prévoir les avis et preuves de qualité sans les fabriquer · ancienne ligne 1692._

- [ ] Réserver une zone de qualité/laboratoire uniquement aux documents et affirmations fournis par la boutique.

  _Source : Tâche 67 — Prévoir les avis et preuves de qualité sans les fabriquer · ancienne ligne 1694._

- [ ] Garder les coordonnées et horaires uniquement s’ils sont confirmés par la propriétaire.

  _Source : Tâche 69 — Clarifier l’aide et le contact · ancienne ligne 1711._

- [ ] Vérifier que les réponses restent cohérentes avec les règles de livraison que la propriétaire doit encore préciser.

  _Source : Tâche 70 — Construire une FAQ courte et sûre · ancienne ligne 1721._

- [ ] Ajouter plus tard les informations de paiement, de confidentialité et de service seulement après validation.

  _Source : Tâche 72 — Ajouter une barre de réassurance non promotionnelle · ancienne ligne 1739._

- [ ] Faire valider les futures créations graffiti avant intégration définitive.

  _Source : Tâche 74 — Vérifier les contenus et la propriété intellectuelle · ancienne ligne 1759._

- [ ] Recueillir auprès de la propriétaire les informations exactes de l’entreprise et les textes validés pour les mentions légales, CGV, confidentialité, cookies éventuels, livraison, retours et contact.

  _Source : Tâche 75 — Préparer les pages légales sans inventer de contenu · ancienne ligne 1782._

- [ ] Ajouter les liens légaux depuis le footer, le compte et le parcours de commande lorsque les textes sont validés.

  _Source : Tâche 75 — Préparer les pages légales sans inventer de contenu · ancienne ligne 1783._

- [ ] Ne publier aucun texte juridique, délai, frais, droit de retour ou engagement réglementaire supposé par le code.

  _Source : Tâche 75 — Préparer les pages légales sans inventer de contenu · ancienne ligne 1784._

- [ ] **A286 — Établir la matrice garder/adapter/exclure :** faire relire la matrice avant intégration ; validation : promotions, fidélité, parrainage, jeu, faux avis et compteurs sont exclus par défaut.

  _Source : 77.1 — Observer et cartographier l’accueil de référence · ancienne ligne 1809._

- [ ] **A322 — Ajouter un bloc “Sélection résines” :** créer la même qualité de présentation après validation des données résines ; validation : aucun prix coupé ou supposé n’est affiché.

  _Source : 79.1 — Sélection de fleurs et résines sur l’accueil · ancienne ligne 1857._

- [ ] **A341 — Créer une section photo produit :** préparer un récit visuel sur la présentation qualitative de vraies fleurs/résines photographiées sans bocal ni cloche ; validation : la section reste un contenu de marque, pas une promesse d’effet.

  _Source : 80.1 — Blocs de confiance et contenu d’accueil · ancienne ligne 1882._

- [ ] **A343 — Ajouter une section qualité vérifiable :** réserver des emplacements aux informations réellement fournies par WOOD ; validation : aucun faux laboratoire, taux ou label.

  _Source : 80.1 — Blocs de confiance et contenu d’accueil · ancienne ligne 1884._

- [ ] **A349 — Réserver une zone éditoriale WOOD :** histoire, humour, graffiti ou coulisses uniquement après validation des textes et images ; validation : la zone peut rester vide proprement.

  _Source : 80.1 — Blocs de confiance et contenu d’accueil · ancienne ligne 1890._

- [ ] **A360 — Réaliser la recette visuelle finale :** comparer WOOD desktop/mobile aux storyboards, vérifier chaque lien et faire valider une planche par la propriétaire et son conjoint ; validation : aucun changement final sans accord explicite.

  _Source : 80.2 — Footer, animation et sensation d’application · ancienne ligne 1904._

- [ ] **A367 — Fixer le seuil d’usage acceptable de Gmail :** validation : le volume prévu est comparé aux limites Google avant de choisir Gmail pour les newsletters.

  _Source : 81 — Cadre, décisions et séparation des responsabilités · ancienne ligne 1936._

- [ ] **A391 — Vérifier l’identité d’expédition :** validation : l’adresse Gmail autorisée est affichée au propriétaire avant activation.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1966._

- [ ] **A392 — Définir `From`, `Reply-To` et nom d’expéditeur :** validation : les trois valeurs sont cohérentes et testées.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1967._

- [ ] **A447 — Ajouter le pied de page légal :** validation : coordonnées et liens nécessaires sont validés avant activation.

  _Source : 86 — E-mails de commande et de paiement · ancienne ligne 2031._

- [ ] **A456 — Définir les données légales de la boutique :** validation : raison sociale, adresse, contact et régime applicable sont confirmés avant production.

  _Source : 87 — Factures, reçus et pièces jointes PDF · ancienne ligne 2043._

- [ ] **A458 — Capturer les frais de livraison :** validation : aucun frais inventé tant que la règle commerciale n’est pas confirmée.

  _Source : 87 — Factures, reçus et pièces jointes PDF · ancienne ligne 2045._

- [ ] **A460 — Définir le traitement TVA/taxe :** validation : aucune mention fiscale n’est inventée ; le document reste bloqué si l’information manque.

  _Source : 87 — Factures, reçus et pièces jointes PDF · ancienne ligne 2047._

- [ ] **A473 — Définir la conservation documentaire :** validation : durée et suppression sont documentées avant production.

  _Source : 87 — Factures, reçus et pièces jointes PDF · ancienne ligne 2060._

- [ ] **A479 — Décider les zones livrées :** validation : le système refuse proprement une zone non desservie.

  _Source : 88 — Livraison et suivi de la commande · ancienne ligne 2069._

- [ ] **A480 — Décider les frais de livraison :** validation : le total affiché avant paiement correspond à la règle validée.

  _Source : 88 — Livraison et suivi de la commande · ancienne ligne 2070._

- [ ] **A481 — Décider les délais annoncés :** validation : aucun délai public n’est affiché avant confirmation de la propriétaire.

  _Source : 88 — Livraison et suivi de la commande · ancienne ligne 2071._

- [ ] **A498 — Prévoir la confirmation d’inscription :** validation : la newsletter n’est active qu’après confirmation si cette règle est retenue.

  _Source : 89 — Newsletter, consentement et désinscription · ancienne ligne 2091._

- [ ] **A507 — Prévoir des segments minimaux :** validation : seuls les critères validés par la propriétaire sont utilisables.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2103._

- [ ] **A521 — Ajouter un rythme d’envoi :** validation : le worker respecte les limites choisies au lieu d’envoyer en rafale.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2117._

- [ ] **A522 — Ajouter un plafond journalier :** validation : le système se met en pause avant dépassement.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2118._

- [ ] **A538 — Définir la conservation :** validation : campagnes, destinataires, erreurs et consentements ont une durée documentée.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2134._

- [ ] **A551 — Décider si les ouvertures sont mesurées :** validation : aucun pixel de suivi n’est activé sans décision de confidentialité.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2147._

- [ ] **A554 — Valider les textes légaux newsletter :** validation : les textes sont relus avant activation.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2150._

- [ ] **A560 — Fermer la porte de mise en ligne newsletter :** validation : consentement, désinscription, quotas, RLS, tests et validation propriétaire sont tous verts.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2156._

- [ ] **A580 — Archiver les versions approuvées :** validation : chaque asset et chaque texte accepté possède une date et une origine documentées.

  _Source : 91 — Registre de direction artistique et contenus WOOD · ancienne ligne 2225._

- [ ] **A588 — Préparer la liste des 13 variétés :** validation : une photo réelle distincte est associée à chaque nom exact.

  _Source : 92 — Photographie réelle et pipeline des visuels · ancienne ligne 2236._

- [ ] **A589 — Prévoir la liste des résines :** validation : aucune photo ni fiche résine n’est validée avant réception des données réelles.

  _Source : 92 — Photographie réelle et pipeline des visuels · ancienne ligne 2237._

- [ ] **A600 — Valider la planche photo :** validation : la propriétaire valide l’ensemble des visuels avant leur statut de production.

  _Source : 92 — Photographie réelle et pipeline des visuels · ancienne ligne 2248._

- [ ] **A620 — Faire valider le storyboard :** validation : la propriétaire et son conjoint valident la direction avant refonte visuelle importante.

  _Source : 93 — Accueil WOOD inspiré de TealerLab sans copie · ancienne ligne 2271._

- [ ] **A681 — Figer l’expéditeur Gmail :** validation : adresse, nom affiché et compte propriétaire sont confirmés avant OAuth.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2344._

- [ ] **A695 — Définir les règles de conservation :** validation : commandes, documents, logs et consentements possèdent une durée validée.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2358._

- [ ] **A696 — Recueillir les données légales :** validation : raison sociale, coordonnées, CGV, confidentialité, livraison et retours sont fournis par la propriétaire.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2359._

- [ ] **A697 — Relier les pages légales :** validation : footer, compte et checkout pointent vers des textes validés et non inventés.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2360._

- [ ] **A698 — Préparer la passation :** validation : la propriétaire possède ses comptes GitHub, Supabase, Gmail, hébergeur et domaine, sans dépendre du développeur.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2361._

- [ ] **A699 — Préparer la rotation des accès :** validation : les accès de démonstration sont remplacés et les anciens secrets révoqués.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2362._

- [ ] **A700 — Fermer la porte de mise en production :** validation : la propriétaire signe la recette fonctionnelle, visuelle, e-mail, données et hébergement.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2363._

### Identifiants, plateformes et services à activer plus tard (32)

- [ ] Valider le code côté serveur Supabase.

  _Source : Tâche 18 — Préparer les vouchers sans les activer · ancienne ligne 324._

- [ ] Afficher un message précis si le code est invalide, expiré ou non applicable.

  _Source : Tâche 18 — Préparer les vouchers sans les activer · ancienne ligne 325._

- [ ] Journaliser l’usage pour empêcher les abus.

  _Source : Tâche 18 — Préparer les vouchers sans les activer · ancienne ligne 326._

- [ ] Utiliser un relais SMTP/API transactionnel configuré hors du dépôt ; garder les secrets dans Supabase et documenter SPF, DKIM, DMARC et les rebonds.

  _Source : Tâche 19 — Préparer les e-mails de commande · ancienne ligne 336._

- [ ] Vérifier l’URL Supabase et les redirections de production/test.

  _Source : Tâche 20 — Auditer le schéma actuel avant modification · ancienne ligne 347._

- [ ] Ne modifier aucune table de production sans sauvegarde et plan de retour.

  _Source : Tâche 20 — Auditer le schéma actuel avant modification · ancienne ligne 348._

- [ ] Les identifiants Viva sont disponibles ou le paiement reste explicitement désactivé.

  _Source : Tâche 39 — Feu vert final · ancienne ligne 538._

- [ ] Activer Leaked Password Protection dans Supabase Auth.

  _Source : Tâche 46 — Activer la protection Supabase contre les mots de passe compromis · ancienne ligne 603._

- [ ] Vérifier que la création de compte et la réinitialisation restent fonctionnelles.

  _Source : Tâche 46 — Activer la protection Supabase contre les mots de passe compromis · ancienne ligne 604._

- [ ] Retester l’espace propriétaire après le changement.

  _Source : Tâche 46 — Activer la protection Supabase contre les mots de passe compromis · ancienne ligne 605._

- [ ] Confirmer l’activation effective de Turnstile dans les secrets Supabase.

  _Source : Tâche 47 — Vérifier la protection de la fonction de commande · ancienne ligne 611._

- [ ] **A56 — Vérification du paiement :** vérifier signature/webhook, montant, devise, commande, idempotence et origine côté serveur ; validation : le navigateur ne peut jamais marquer une commande payée.

  _Source : Viva Wallet et paiements · ancienne ligne 1205._

- [ ] **A58 — Réconciliation paiements-commandes :** comparer périodiquement les événements Viva aux commandes et faire remonter les écarts ; validation : un paiement sans commande et une commande sans paiement sont détectés.

  _Source : Viva Wallet et paiements · ancienne ligne 1207._

- [ ] **A61 — Domaine d’envoi :** configurer fournisseur, expéditeur, SPF, DKIM, DMARC, rebonds et adresse de réponse hors dépôt ; validation : test reçu côté client et propriétaire avec en-têtes contrôlés.

  _Source : E-mails, PDF et notifications · ancienne ligne 1213._

- [ ] **A75 — Sauvegarde et restauration réelle :** exécuter un export, restaurer dans un environnement de test et vérifier commandes, prix, rôles et historiques ; validation : preuve datée et durée de reprise documentées.

  _Source : Supervision, continuité et passation · ancienne ligne 1233._

- [ ] **A80 — Préproduction et transfert :** produire le paquet final, vérifier `public_html`, HTTPS, DNS, domaine `.fr`, 404, redirections, cache, retour arrière et smoke test ; validation : transfert reproductible en peu d’étapes, sans publier `admin.*`, secrets ou données de test.

  _Source : Qualité, navigateurs et mise en service · ancienne ligne 1241._

- [ ] **A381 — Créer le projet Google Cloud dédié :** validation : le projet est au nom de la propriétaire ou de la structure qui exploite le site.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1956._

- [ ] **A382 — Activer Gmail API :** validation : un appel de test contrôlé répond sans erreur d’API.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1957._

- [ ] **A383 — Configurer l’écran de consentement OAuth :** validation : nom, logo, domaine et coordonnées correspondent à WOOD.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1958._

- [ ] **A385 — Déclarer les URI de redirection séparément :** validation : local, staging et production ne se mélangent jamais.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1960._

- [ ] **A386 — Générer le client OAuth serveur :** validation : le secret reste dans les secrets Edge Function.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1961._

- [ ] **A395 — Ajouter la rotation sans interruption :** validation : ancien et nouveau secret sont vérifiés avant retrait de l’ancien.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1970._

- [ ] **A396 — Tester une adresse de destination contrôlée :** validation : l’e-mail de test est explicitement marqué comme test.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1971._

- [ ] **A400 — Ajouter une recette OAuth complète :** validation : autoriser, envoyer, révoquer, réautoriser et confirmer les états dans le tableau de bord.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1975._

- [ ] **A420 — Préparer le rollback de schéma :** validation : chaque migration e-mail peut être annulée ou restaurée avec une sauvegarde vérifiée.

  _Source : 84 — Modèle de données e-mail et outbox · ancienne ligne 1998._

- [ ] **A444 — Ajouter les liens absolus de production :** validation : aucun lien `localhost`, GitHub temporaire ou URL de test n’est envoyé.

  _Source : 86 — E-mails de commande et de paiement · ancienne ligne 2028._

- [ ] **A545 — Vérifier l’authentification du domaine d’expédition :** validation : SPF, DKIM et DMARC sont documentés avant campagne réelle.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2141._

- [ ] **A559 — Tester une campagne en staging :** validation : aucune adresse ou donnée de production ne fuit vers le test.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2155._

- [ ] **A677 — Tester les sauvegardes :** validation : sauvegarde, restauration et vérification de cohérence sont prouvées sur un environnement de test.

  _Source : 96 — Commandes, comptes, Supabase et continuité · ancienne ligne 2337._

- [ ] **A682 — Configurer Gmail sans mot de passe :** validation : OAuth serveur, scope minimal et refresh token privé sont utilisés.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2345._

- [ ] **A683 — Tester l’autorisation Gmail :** validation : autoriser, envoyer un test, révoquer puis réautoriser produisent des états explicites.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2346._

- [ ] **A694 — Vérifier SPF/DKIM/DMARC :** validation : le domaine d’envoi est authentifié avant tout envoi réel.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2357._

### Appareils et validation physique externe (4)

- [ ] Tester petits iPhone/Android, grands téléphones, iPad portrait/paysage, ordinateur Windows, macOS et Linux.

  _Source : Tâche 29 — Vérifier tous les formats d’écran · ancienne ligne 439._

- [ ] **A79 — Matrice navigateurs/appareils :** tester Safari iOS, Chrome Android, Safari macOS, Chrome/Edge/Firefox Windows et Firefox/Linux ; validation : aucune route, grille, panier ou compte ne change de comportement critique.

  _Source : Qualité, navigateurs et mise en service · ancienne ligne 1240._

- [ ] **A138 — Tester les navigateurs graphiques :** Safari iOS/macOS, Chrome Android/Windows, Edge, Firefox et Linux ; validation : aucun défaut de police, image, animation, grille ou menu ne reste sans décision.

  _Source : Fiches, textes, emojis, animations et contrôle final · ancienne ligne 1318._

- [ ] **A624 — Tester les navigateurs WebKit :** validation : Safari iPhone/iPad et Safari macOS ne coupent aucun élément critique.

  _Source : 94 — Responsive réel mobile, tablette et ordinateur · ancienne ligne 2278._

## Réactivation future

Après réception d'une autorisation, d'une photo validée, de données réelles ou d'un accès externe, réintroduire **uniquement les cases correspondantes** dans la feuille active, avec leur identifiant d'origine et un test de non-régression. Vérifier avec la propriétaire avant toute bascule commerciale. Les fonctions de paiement et d'e-mails réels restent désactivées pendant la démonstration.

---

## SECTION K — ÉTAT HISTORIQUE DES 109 TÂCHES (à réconcilier, ne pas recompter)

# WOOD — état des 109 tâches actives

Date de contrôle : 6 novembre 2026

Cette matrice reprend les 109 numéros transmis pour la démo WOOD. Les plages  
sont contiguës et couvrent chaque numéro une seule fois.

Légende :

- `[x]` livrable local présent et contrôle local passé ;  
- `[~]` préparation locale présente, mais recette manuelle, données ou service externe encore nécessaires ;  
- `[!]` porte externe ou validation propriétaire indispensable avant de cocher.

| Tâches | État | Preuve ou prochaine action |  
|---:|:---:|---|  
| 01–04 | [x] | Accents, zones protégées, variété et humour sont couverts par le pack graffiti, les contrats de décor et les tests de non-interférence. |  
| 05–09 | [~] | Les contrats et la recette locale couvrent zoom, clavier, tactile, safe areas, 404 et assets ; Firefox/Safari, orientation et réglages DNS restent à tester hors dépôt. |  
| 10–12 | [~] | Les parcours compte, commande, dashboard et erreurs sont codés et testés statiquement ; une recette Supabase avec comptes de test reste nécessaire. |  
| 13–14 | [x] | WOOD reste la fondation visuelle ; les accents sont optionnels, block-anchored et réduits sans perte d’information. |  
| 15–19 | [~] | Les fonctions server-only, allow-list, anti-double soumission, reduced motion, low-data et matrices responsive existent ; la recette Edge réelle et les appareils moyens restent externes. |  
| 20 | [x] | Réservation/libération atomique et verrouillage concurrent couverts par la migration stock et les tests de sécurité. |  
| 21 | [x] | Jeu SVG WOOD homogène : panier, compte, livraison, boutique, téléphone, itinéraire, FAQ, accueil, catalogue et repère. |  
| 22–26 | [~] | Voix, stickers propriétaires, relecture, médias admin et barre d’achat mobile sont préparés ; validation artistique, photos et essai ergonomique propriétaire restent ouverts. |  
| 27–35 | [x] | Séparateurs, compositions, revue premium, stickers navigation/catégorie/matière et ancrage desktop/mobile sont présents dans les contrats et la feuille CSS. |  
| 36–39 | [~] | Les structures résines, bien-être, WOOD Shop et la voix de démonstration sont en place ; les textes commerciaux définitifs nécessitent la propriétaire. |  
| 40–43 | [~] | Concepts, essais de stickers et mouvement d’introduction sont locaux et originaux ; choix final et contrôle visuel propriétaire restent ouverts. |  
| 44 | [!] | Les photos originales reçues doivent être archivées dans le dépôt ou l’espace de référence par la propriétaire ; aucune retouche ni copie n’est inventée. |  
| 45–51 | [~] | Texture, cadres, saisonnalité, bordures et pictogrammes disposent de variantes locales ; l’édition Halloween reste une couche à activer après validation. |  
| 52–61 | [~] | Lightbox, transcription, hero menu, entrées fleurs/résines, rails, zoom et exports sont partiellement présents ; la carte complète et ses droits/source restent à recevoir. |  
| 62–69 | [~] | États vides, aide, collecte minimale, reprise réseau et non-duplication sont couverts localement ; avis, preuves, conservation et reprise distante doivent être validés avec les sources réelles. |  
| 70–76 | [x] | Accents contrôlés, humour WOOD, sobriété premium, sélections, liens, rails secondaires et remplacement média sont intégrés ou contractuellement bornés. |  
| 77–86 | [!] | Gmail OAuth minimal, state/PKCE, refresh token, reconnexion, migrations et revue RLS nécessitent identifiants, projet de test et validation sécurité. |  
| 87–88 | [x] | Signature WOOD validée dans le système local ; emojis décoratifs et jamais porteurs d’une information essentielle. |  
| 89–93 | [~] | Impression, double opt-in, export et suppression sont documentés et bornés ; la recette externe des appareils et des données réelles reste à faire. |  
| 94–95 | [x] | Bibliothèques graffiti et pictogrammes nommées, versionnées, accessibles et testées. |  
| 96–101 | [~] | Fiche d’approbation, droits, sélections, photographie et histoire sont préparés ; approbation, droits et textes authentiques restent propriétaires. |  
| 102–106 | [~] | Chromium et la matrice locale sont couverts ; Firefox, zoom 200/400 %, taille système et clavier virtuel nécessitent une recette appareils. |  
| 107–109 | [!] | Migrations distantes, fiabilité commerciale et e-mails mobiles restent des portes de production ; aucun paiement ni e-mail réel n’est activé dans la démo. |

## Livrables ajoutés pendant cette passe

- `contact.html` : aide structurée sans collecte ni envoi réel ;  
- `wood-contact.css` : composition mobile/desktop de la page d’aide ;  
- `wood-detail-accents.css` : annotations manuscrites optionnelles et imprimables ;  
- `test/wood-icons-contract.test.mjs` : contrat du jeu d’icônes WOOD ;  
- paquet public et readiness étendus à la nouvelle route.

## Règle de clôture

Une tâche `[~]` ou `[!]` ne devient `[x]` qu’après réception de la donnée ou de  
l’autorisation concernée, exécution de la recette et conservation de sa preuve.

---

## SECTION L — SOURCES ET CONSIGNES DE CONTRÔLE

- Brief de photographie réel : https://github.com/Rapt0r06300/CBD-WOOD/blob/main/docs/design/wood-photo-brief.md — corriger la contradiction « sans cloche » en faveur de la volonté de la propriétaire « sous cloche en verre » sans changer silencieusement les photos originales.  
- Setup Cloudflare officiel : https://developers.cloudflare.com/agent-setup/prompt.md  
- GitHub Codex MCP: `.codex/config.toml`, `scripts/setup-cloudflare-codex.ps1`, `docs/ops/cloudflare-agent-setup.md`. Authentification OAuth titulaire requise, **aucun paiement**.  
- Étude fiches : https://baymard.com/research-articles/current-state-ecommerce-product-page-ux  
- Étude recherche et filtres : https://baymard.com/research-articles/current-state-product-list-and-filtering  
- Étude mobile : https://baymard.com/research/mcommerce-usability  
- Réglementation e-commerce : https://entreprendre.service-public.gouv.fr/vosdroits/F23455  
- Cadre CBD : https://www.economie.gouv.fr/cedef/CBD-cannabidiol-reglementation  
- CNIL : https://www.cnil.fr/fr/mesurer-la-frequentation-de-vos-sites-web-et-de-vos-applications  
- Web Vitals : https://web.dev/articles/vitals  
- **Illustration approuvée** : dernière image générée dans cette conversation. Elle doit être remise au développeur/Codex comme **référence artistique**, pas une capture prétendue disponible dans le dépôt. Tout libellé d'effets/efficacité se supprime avant publication.

## LIVRABLE FINAL EXIGÉ DE CODEX

1. Liste de tâches source/ID/état, avec `DONE`, `PARTIAL`, `TODO`, `BLOCKED-EXTERNAL`, `FAILED`, preuves tests et commits.  
2. Démo GitHub Pages préservée, aucun checkout/email/paiement/collecte réelle, Supabase intact.  
3. Images et captures desktop/mobile, illustrations et badges originaux corrigés, vrais contenus soumis à validation propriétaire.  
4. Guide uniquement par questions, lexique contextuel (y compris « puissant / léger / fort / goût »), recommandation explicable, fallback honnête, données traçables et import automatique.  
5. Connecteur D1 gratuit opérationnel **uniquement** si le compte Cloudflare est autorisé; sinon même fonctionnalité en local et `BLOCKED-EXTERNAL` distants.  
6. Vérifier `npm run check`, `npm run prepare:github-pages`, tests API, tests combinatoires, capture Safari/Android si accessibles (sinon preuve manquante).  
7. Compte rendu propriétaire, ordre de mise en œuvre, tableau de progression, historique des 138 différés intact et procédure de rollback.  


---

## ANNEXE M — VISUEL WOOD APPROUVÉ DANS CETTE CONVERSATION

L'utilisateur a explicitement approuvé la dernière image générée pour l'assistant WOOD (mascotte souriante avec lunettes et casquette WOOD, sticker BD, graffiti premium, fond forêt/anis, trois pictogrammes et cloches en verre). Le ZIP joint à cette feuille inclut le fichier `assets/WOOD_WIDGET_REFERENCE_ARTISTIQUE_APPROUVEE.png` pour faciliter son passage à Codex. **Ce visuel est une référence de direction artistique** : corriger les textes du mockup qui pourraient faire des allégations d'effets non vérifiées ; garder le vrai logo WOOD et n'activer aucun panier, paiement ou conseil médical.

La feuille `.md` est autonome pour toutes les consignes, même sans la PNG ; l'image source est incluse seulement dans le ZIP facultatif.
