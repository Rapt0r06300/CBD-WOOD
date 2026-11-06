# WOOD mobile finish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transformer la démo mobile WOOD en une expérience tactile plus compacte, animée et proche du rythme desktop/TealerLab sans toucher aux garde-fous de contenu.

**Architecture:** Une feuille CSS de finition mobile surcharge les règles existantes après `wood-motion.css`. Un petit module JavaScript natif ajoute le masquage directionnel de la barre basse, les indices de rails et les états tactiles. Les contenus HTML existants restent la source de vérité.

**Tech Stack:** HTML statique, CSS natif, JavaScript navigateur, Node test runner, Playwright CLI.

**Spec:** `docs/superpowers/specs/2026-11-06-mobile-finish-design.md`

## Global Constraints

- WOOD conserve son identité sombre, lime, chic, chill, humoristique et graffiti.
- Aucune action essentielle ne dépend du hover.
- Les photos de démonstration, prix et stocks non validés restent explicitement identifiés.
- `prefers-reduced-motion`, faible donnée, clavier et tactile restent supportés.
- Aucun framework ni dépendance d’animation n’est ajouté.

## Review Focus

- Barre mobile visible pendant une ancre profonde : le contenu doit rester atteignable.
- Rail avec un seul élément ou des cartes cachées : l’indication ne doit pas mentir.
- Écran étroit de 360 px : aucune carte ni CTA ne doit déborder.
- Reduced-motion : aucune transformation ou transition mobile ne doit rester active.
- Navigation vers une section depuis la barre basse : l’ancre doit garder une marge de lecture.

### Task 1: Mobile finish contract

**Files:**
- Create: `test/mobile-finish-contract.test.mjs`
- Modify: `docs/superpowers/plans/2026-11-06-mobile-finish.md`

- [x] Écrire les assertions pour les nouveaux fichiers CSS/JS, les liens de chargement, les seuils tactiles, les classes de rail, la zone sûre et le fallback reduced-motion.
- [x] Exécuter `node --test test/mobile-finish-contract.test.mjs` en RED avant l’implémentation, puis en GREEN après intégration.

### Task 2: Mobile composition layer

**Files:**
- Create: `wood-mobile-finish.css`
- Modify: `index.html`

- [x] Ajouter la feuille après `wood-motion.css` avec les règles de rails tactiles, grilles compactes, CTA, graffitis et safe-area.
- [x] Ajouter le chargement versionné dans `index.html`.
- [x] Vérifier le contrat ciblé.

### Task 3: Touch motion and bottom navigation

**Files:**
- Create: `wood-mobile-finish.js`
- Modify: `index.html`

- [x] Ajouter le module natif qui crée les indices de rails, suit la progression, anime l’entrée au toucher et masque la barre basse pendant la descente.
- [x] Gérer les rails vides/simples, les écrans étroits, reduced-motion et faible donnée.
- [x] Ajouter le script versionné après `wood-motion.js`.
- [x] Vérifier le contrat ciblé puis la suite complète.

### Task 4: Browser verification and deployment

**Files:**
- Modify: `docs/audits/2026-11-06-mobile-finish-verification.md`

- [x] Tester la démo à 360, 375, 390, 430 et 1440 px.
- [x] Contrôler overflow racine, hauteur, ancres, barre basse, rails, avis sans contrôles, images et reduced-motion.
- [x] Générer le paquet GitHub Pages, publier la démo et recontrôler l’URL publique.

## Ledger

- Ruling: conserver une couche mobile dédiée — le contenu doit rester identique au desktop et le risque de divergence doit rester faible.
