# Feuille de route — refonte visuelle WOOD inspirée de TealerLab

> Plan révisé le 5 novembre 2026 après audit local du site WOOD, vérification responsive Playwright et lecture des patterns éditoriaux publics de TealerLab.

> État complémentaire du 6 novembre 2026 : la checklist des 109 tâches actives,
> les portes externes et les preuves associées sont suivies dans
> `docs/validation/2026-11-06-109-task-status.md`.

## Objectif

Faire évoluer WOOD vers une expérience éditoriale premium, riche en photos, séquences, offres, preuves et animations, dans l’esprit de présentation de TealerLab, sans copier son identité, ses textes, ses promotions, ses avis ni ses visuels.

Le périmètre couvre uniquement ce qui est implémentable dans le dépôt actuel. Les décisions du propriétaire, les vraies photos, les données commerciales, les avis certifiés, les comptes externes et la validation finale restent explicitement séparés.

## État constaté

- Le socle WOOD est fonctionnel et responsive : la suite locale passe à 333/333 tests et la largeur mobile reste à 390 px sans débordement observé.
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
