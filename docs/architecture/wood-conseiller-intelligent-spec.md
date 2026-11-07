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
