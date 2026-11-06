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
| Ton | Streetwear, direct, forte personnalité | WOOD = forêt/anis/crème, noir, stickers, bois, botanique, rétro ponctuel | Ne pas copier marque ni campagne |
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
2. **Aucune vente dans /demo/.** Aucun ordre réel, mail, paiement, stock réservé, compte créé, capture de données clients. Panier éventuel = simulation locale honnête et effaçable.
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

**Avancement :** `CRO % = 100 × nombre de CRO DONE / 128`. Ne pas mélanger avec le plan TXW (120) ni D1 (25). Un pourcentage global facultatif peut être calculé comme `(TXW DONE + CRO DONE + D1 DONE) / 273 × 100`, mais publier les compteurs `BLOCKED-EXTERNAL` séparément ; **ne pas appeler les tâches différées « terminées »**.

## Tâches de conversion et UX — 128 tickets

### 01 — Comprendre les visiteurs et les décisions d'achat — P1, complément de TXW-082, TXW-112

- [ ] **CRO-001 — Définir quatre intentions client** 
  - **Livrable :** Décrire première découverte, connaisseur, achat cadeau non réglementé et visite locale sans supposer les préférences de santé.
  - **Critère de validation :** Tableau intention → questions → page → action ; aucune catégorie médicale.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-002 — Lister les dix objections avant achat** 
  - **Livrable :** Construire les interrogations prix, qualité, authenticité, disponibilité, usage autorisé, visite, retour, photos, confidentialité et conseils.
  - **Critère de validation :** Chaque objection pointe vers une réponse sourcée ou un état « information indisponible ».
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-003 — Créer une carte des décisions par étape** 
  - **Livrable :** Documenter Accueil → Univers → Liste → Fiche → Contact ou visite ; prévoir panier fictif séparé.
  - **Critère de validation :** Aucune étape ne force inscription ou paiement ; liens contrôlés.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-004 — Fixer cinq missions testables** 
  - **Livrable :** Scénarios : identifier marque en 5 s, retrouver une fleur, comprendre un format, trouver Barla et appeler la boutique.
  - **Critère de validation :** Tâches observables sur mobile sans aide ni explication orale.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-005 — Définir les preuves de confiance nécessaires** 
  - **Livrable :** Associer à chaque hésitation une preuve : photo autorisée, source publique, donnée validée, conseil ou adresse.
  - **Critère de validation :** Matrice preuve/source/date/propriétaire ; les trous sont signalés.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-006 — Dessiner le parcours local versus catalogue** 
  - **Livrable :** Préparer parcours visite immédiate et parcours exploration produit, chacun avec un CTA clair.
  - **Critère de validation :** Sur chaque page une action naturelle sans incitation trompeuse.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-007 — Construire un inventaire des frictions** 
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

- [ ] **CRO-033 — Ajouter une recherche produits locale** 
  - **Livrable :** Chercher dans noms et familles du catalogue WOOD de démo sans service payant.
  - **Critère de validation :** Résultats testés sur les 13 références connues et états vides.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-034 — Gérer variantes de formulation** 
  - **Livrable :** Index de synonymes prudents : fleurs/fleur, résine/hash, boutique/shop, sans inventer familles.
  - **Critère de validation :** Test des synonymes, accents, casse et apostrophes.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-035 — Afficher un résumé de résultats** 
  - **Livrable :** Nombre réel de fiches trouvées, catégorie et requête, sans faux compteurs.
  - **Critère de validation :** Résultat stable et exact pour chaque jeu de test.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-036 — Assurer recherche accessible sur mobile** 
  - **Livrable :** Icône, libellé visible, clavier 'search', bouton effacer, focus et Escape.
  - **Critère de validation :** Tests clavier et petit iPhone ; aucune barrière tactile.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-037 — Fournir une issue à zéro résultat** 
  - **Livrable :** Proposer catégories existantes, effacer filtre et contacter WOOD.
  - **Critère de validation :** Aucun 'aucun produit' sans action alternative.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-038 — Ajouter recherche par caractéristiques validées** 
  - **Livrable :** Champs texture/arôme/type uniquement si métadonnées sourcées ; pas de suggestions d'effet médical.
  - **Critère de validation :** Champs manquants non filtrables, zéro caractéristique inventée.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-039 — Préserver le parcours sans JS** 
  - **Livrable :** Pages catégorie et liens restent consultables si l'index JS est bloqué.
  - **Critère de validation :** Simulation JS disabled et navigation vérifiée.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-040 — Garder la recherche locale par défaut** 
  - **Livrable :** Éviter service de recherche externe ou API payante ; D1 facultatif, non bloquant.
  - **Critère de validation :** La démo rend des résultats identiques sans réseau Cloudflare.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.


### 06 — Filtres, comparaisons et cartes décisionnelles — P1, complément de TXW-053 à TXW-064, TXW-060

- [ ] **CRO-041 — Définir les filtres disponibles réellement** 
  - **Livrable :** Créer un inventaire des attributs vérifiés par univers ; masquer un filtre alimenté de valeurs fictives.
  - **Critère de validation :** Aucun filtre 'CBD %' ou origine si preuve manquante.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-042 — Permettre la combinaison de filtres** 
  - **Livrable :** Implémenter ET entre catégories de critères et OU entre valeurs d'un même critère.
  - **Critère de validation :** Unit tests sur combinaisons et zéro résultat.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-043 — Visualiser les filtres actifs** 
  - **Livrable :** Afficher puces appliquées et bouton 'Tout effacer', aussi sur petit écran.
  - **Critère de validation :** Le résultat correspond toujours aux puces affichées.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-044 — Créer tris honnêtes** 
  - **Livrable :** Nom alphabétique, nouveautés seulement datées, prix seulement quand validés ; pas de best-sellers inventés.
  - **Critère de validation :** Tri stable et cohérent avec valeurs présentes.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-045 — Consolider les variantes d'un même produit** 
  - **Livrable :** Ne pas créer des doublons de cartes pour chaque grammage ; un produit avec options.
  - **Critère de validation :** Un slug produit par référence, variantes internes.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-046 — Afficher vues miniatures sur les cartes** 
  - **Livrable :** Prévoir vues principale, macro, contexte si 3 visuels autorisés existent ; sinon ne pas dupliquer.
  - **Critère de validation :** Contrôles tactile/clavier, pas d'image artificiellement répétée.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-047 — Créer un comparateur 2–3 références** 
  - **Livrable :** Comparer côte à côte propriétés descriptives confirmées et liens fiches.
  - **Critère de validation :** Case inconnue = 'Non renseigné' ; aucun profil inventé.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-048 — Mettre le prix au gramme sous condition** 
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

- [ ] **CRO-052 — Séparer images conceptuelles et réelles** 
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

- [ ] **CRO-056 — Tester chargement dégradé de galerie** 
  - **Livrable :** Prévoir placeholder lisible, alt exact, skeleton non permanent et repli image en cas d'erreur.
  - **Critère de validation :** 0 case vide ou motif '❓' au réseau lent.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.


### 08 — Fiche produit qui répond à toutes les questions — P1, complément de TXW-055 à TXW-062

- [ ] **CRO-057 — Établir un ordre d'information par fiche** 
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

- [ ] **CRO-060 — Clarifier variations et conditionnement** 
  - **Livrable :** Mêmes libellés de poids et unités sur carte, fiche, comparateur et simulation.
  - **Critère de validation :** Test cohérence par référence et sélection.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-061 — Créer une FAQ contextuelle par famille** 
  - **Livrable :** Questions récurrentes réellement pertinentes pour fleurs, résines, huiles, vêtements et accessoires.
  - **Critère de validation :** Réponses non médicales et sourcées ou validation requise.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-062 — Offrir contact conseil depuis fiche** 
  - **Livrable :** Lien téléphone ou page contact avec contexte produit non personnel, sans transmettre de donnée à un tiers.
  - **Critère de validation :** Action fonctionne et reste explicite sur les horaires.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-063 — Afficher informations absentes clairement** 
  - **Livrable :** Disponibilité, analyse, composition ou provenance inconnue ne devient pas une promesse de qualité.
  - **Critère de validation :** Pas de badge qualité automatique sans pièce justificative.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-064 — Contrôler la proximité des actions** 
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

- [ ] **CRO-068 — Différencier sélection et vente** 
  - **Livrable :** CTA 'Découvrir' ou 'Nous contacter' en démo ; boutons 'Acheter' désactivés ou fictifs explicitement.
  - **Critère de validation :** Aucun CTA ne crée de commande réelle via Supabase.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-069 — Écarter urgence commerciale fictive** 
  - **Livrable :** Supprimer compteurs visiteurs, timers, rupture artificielle, dernières pièces et remises non prouvées.
  - **Critère de validation :** Audit automatisé des chaînes interdites.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-070 — Préparer information coûts de vente future** 
  - **Livrable :** Créer slots frais de livraison, taxes, seuils, retrait ou retours mais désactivés sans règles approuvées.
  - **Critère de validation :** Aucune promesse logistique publiée par défaut.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-071 — Préparer comparaisons de valeur honnêtes** 
  - **Livrable :** Valeur = qualité visuelle, informations et service humain ; pas de 'le moins cher' invérifiable.
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

- [ ] **CRO-075 — Améliorer section témoignages existante** 
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

- [ ] **CRO-079 — Garantir accessibilité des coordonnées** 
  - **Livrable :** Numéro et itinéraire à proximité des fiches et à la fin du catalogue.
  - **Critère de validation :** Tests liens tel: / cartes, deux boutiques distinguées.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-080 — Créer le module 'Pourquoi WOOD ?'** 
  - **Livrable :** Trois preuves vraies maximum (boutiques, univers, accueil) avec médias autorisés.
  - **Critère de validation :** Aucune statistique client ou historique non vérifié.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.


### 11 — Du site vers la boutique physique — P1, complément de TXW-028, TXW-079, TXW-082

- [ ] **CRO-081 — Créer deux fiches boutique distinctes** 
  - **Livrable :** Barla et Borriglione avec identité WOOD, adresse, coordonnées et statut de vérification.
  - **Critère de validation :** Aucune confusion adresse/téléphone/horaires.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-082 — Préparer photos de localisation vérifiées** 
  - **Livrable :** Façades avec angle d'arrivée, enseigne lisible et droits ; proposer fallback sans photo.
  - **Critère de validation :** Image d'établissement correcte pour chaque boutique.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-083 — Créer boutons d'itinéraire directs** 
  - **Livrable :** Générer itinéraire Google/Apple Maps depuis adresse validée ; pas de position de l'utilisateur collectée.
  - **Critère de validation :** Lien testé sur iPhone/Android.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-084 — Créer lien téléphonique par magasin** 
  - **Livrable :** Affichage humain et href tel: propres à chaque lieu.
  - **Critère de validation :** Aucune inversion des numéros, tests format E.164 quand pertinent.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-085 — Établir horaire source et fraîcheur** 
  - **Livrable :** Le statut 'horaires à confirmer' reste honnête tant qu'aucune validation propriétaire.
  - **Critère de validation :** Ne jamais déclarer 'ouvert maintenant' sans calendrier fiable.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-086 — Préparer catalogue vers visite** 
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

- [ ] **CRO-089 — Tracer chaque effet réseau de démo** 
  - **Livrable :** Inspecter appels Supabase, Workers, Gmail, Viva, formulaires et liens de checkout.
  - **Critère de validation :** Journal et test prouvent 0 écriture/commande/email/paiement externe.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-090 — Neutraliser API de commande côté démo** 
  - **Livrable :** Refuser create-pending-order même si élément HTML redevient actif.
  - **Critère de validation :** Test E2E: aucun POST vers production, même formulaire forcé.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-091 — Séparer panier conceptuel et production** 
  - **Livrable :** Adapter panier démo local sans authentification ni prix/stock réels supposés.
  - **Critère de validation :** Panier peut être effacé sans appel serveur ni fuite de données.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-092 — Informer clairement avant confirmation** 
  - **Livrable :** Aucune page 'Commande enregistrée' si aucun backend de vente démo n'existe.
  - **Critère de validation :** État 'simulation terminée' sans numéro de vraie commande.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-093 — Préparer récapitulatif transparent** 
  - **Livrable :** Afficher uniquement articles démo et sommes si tarif de simulation affiché comme fictif.
  - **Critère de validation :** Total = sous-totaux testés, sinon total absent.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-094 — Auditer tout lien d'achat caché** 
  - **Livrable :** Scanner liens, événements JS, raccourcis clavier, boutons, redirects et form submit.
  - **Critère de validation :** 0 chemin déclenchant effet commercial réel en /demo/.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-095 — Préparer futur parcours sans engagement** 
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

- [ ] **CRO-098 — Bloquer allégations thérapeutiques** 
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

- [ ] **CRO-101 — Interdire dark patterns** 
  - **Livrable :** Contrôler urgence, faux avis, chiffres non prouvés, cases précochées, consentement asymétrique.
  - **Critère de validation :** Checklist anti-tromperie avec tests de chaînes et capture.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-102 — Concevoir information âge adaptée** 
  - **Livrable :** Documenter contrôle d'âge pertinent par produit/réglementation, sans prétendre qu'un simple pop-up suffit.
  - **Critère de validation :** Âge et vérification finale déterminés par conseil juridique avant commercialisation.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-103 — Sécuriser images et marques tierces** 
  - **Livrable :** Photos WOOD autorisées, pas de logos concurrents repris depuis le mur stickers ; vérifier licences.
  - **Critère de validation :** Registre des droits et attribution archivée.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-104 — Contrôler politique confidentialité** 
  - **Livrable :** Aucun email/IP de suivi ou identifiant transmis sans base légale ; analyse CNIL des analytics futurs.
  - **Critère de validation :** Consentement ou exemption correctement prouvé, sinon aucun traceur.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.


### 14 — Mobile-first, accessibilité et interaction rassurante — P1, complément de TXW-083 à TXW-094

- [ ] **CRO-105 — Définir premier viewport mobile cible** 
  - **Livrable :** Vérifier logo, marque, promesse, visuel et au moins une action avant ou juste après pli.
  - **Critère de validation :** Captures 320/360/375/390/430 sans chevauchement.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-106 — Tester les miniatures au toucher** 
  - **Livrable :** Geste swipe contrôlé et boutons accessibles ; carrousel sans scroll horizontal capturé.
  - **Critère de validation :** iOS/Android avec touch, clavier et reduced-motion.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-107 — Créer barre d'action fiche non intrusive** 
  - **Livrable :** Sur fiche, contact/découverte accessible sans couvrir contenu ni navigation système.
  - **Critère de validation :** Test clavier virtuel, safe area et zoom.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-108 — Améliorer affichage des prix et poids** 
  - **Livrable :** Taille et contraste adaptés, sans casser unités ou cacher CTA.
  - **Critère de validation :** Audits largeur 320 et grossissement texte.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-109 — Contrôler expérience une main** 
  - **Livrable :** Menu, recherche, filtres et itinéraire accessibles au pouce sans déplacement forcé.
  - **Critère de validation :** Protocole manuel et absence de cibles <44px.
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

- [ ] **CRO-113 — Documenter les objectifs Core Web Vitals** 
  - **Livrable :** Cibles publiques LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1 au p75 terrain si données disponibles.
  - **Critère de validation :** Labo vs terrain différenciés ; pas de score inventé.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-114 — Fixer un budget images par page** 
  - **Livrable :** Lister et réduire médias coûteux à leur nécessité commerciale, galerie facultative lazy.
  - **Critère de validation :** Comparaison poids et qualité réelle sur mobile.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-115 — Réduire scripts non indispensables** 
  - **Livrable :** Désactiver modules promo, sociale ou animation inactifs qui ralentissent le choix.
  - **Critère de validation :** Mesure bundle et absence de régression fonctionnelle.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-116 — Créer métadonnées distinctes par univers** 
  - **Livrable :** Titre, description, canonique, OpenGraph pertinents pour vraie mise en ligne ultérieure.
  - **Critère de validation :** La démo garde noindex pour ne pas indexer des contenus provisoires.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-117 — Préparer données structurées honnêtes** 
  - **Livrable :** Organization/LocalBusiness/Store seulement sur champs exacts approuvés, jamais Note aggregateRating inventée.
  - **Critère de validation :** Validation schéma sans erreurs ni information non confirmée.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-118 — Ajouter plan de mesure UX sans cookies** 
  - **Livrable :** Tester scripts locaux de simulation d'événements ou métriques agrégées non envoyées.
  - **Critère de validation :** Aucun tracking production activé sans conformité CNIL.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-119 — Définir entonnoir de découverte** 
  - **Livrable :** Événements théoriques entrée → catégorie → fiche → téléphone/itinéraire ; pas de 'achat' enregistré.
  - **Critère de validation :** Rapport de test sur fixtures sans donnée personnelle.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-120 — Éviter quotas facturables et fragilité cloud** 
  - **Livrable :** Cloudflare D1/Workers Free en opt-in, cache/limites/fallback, aucune dépense.
  - **Critère de validation :** Site fonctionne sans D1 ; zéro upgrade automatique.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.


### 16 — Contrôles de goût, validation propriétaire et livraison — P1, complément de TXW-112 à TXW-120

- [ ] **CRO-121 — Créer une grille qualité commerciale WOOD** 
  - **Livrable :** Évaluer clarté, désir de découvrir, authenticité, lisibilité, confiance et invitation à visiter (1–5).
  - **Critère de validation :** Scores motivés par captures et tâches, pas une note auto-proclamée.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-122 — Construire planche avant/après client** 
  - **Livrable :** Cinq scènes : hero, produit sous cloche, liste, univers boutique, footer/localisation.
  - **Critère de validation :** Deux variantes et une recommandation documentées.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-123 — Tester sur profils de visiteur distincts** 
  - **Livrable :** Simuler novice et habitué en tâches sans collecte réelle ; observer obstacles.
  - **Critère de validation :** Taux d'achèvement sur participants réels seulement si test réalisé.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-124 — Faire une passe 'anti-générique'** 
  - **Livrable :** Identifier blocs pouvant figurer sur n'importe quel site CBD et les remplacer par WOOD authentique.
  - **Critère de validation :** Chaque écran important contient un marqueur de marque justifié.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-125 — Faire une passe 'anti-TealerLab-copie'** 
  - **Livrable :** Contrôler illustrations, slogan, grilles signatures, couleurs et appels à l'action copiés.
  - **Critère de validation :** Adaptation fonctionnelle originale, aucune publicité de partenariat.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-126 — Préparer validation propriétaire en 10 minutes** 
  - **Livrable :** Questions fermées sur ambiance, tons, photos, cloches, produits, mobile et texte.
  - **Critère de validation :** Feedback de la propriétaire explicitement séparé des suppositions.
  - **Statut initial :** TODO ; preuve : à renseigner par Codex.

- [ ] **CRO-127 — Démontrer parcours complet sécurisé** 
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
