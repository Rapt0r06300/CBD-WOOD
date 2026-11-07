# Recette locale — conseiller WOOD en mode démo

Date : 7 novembre 2026  
Périmètre : `/demo/` uniquement. Aucun paiement, compte, commande, e-mail ou profil visiteur n'est activé.

## Parcours validés

- Visiteur novice : ouvrir « Besoin d’aide pour choisir ? », choisir un univers, recevoir une piste de découverte avec les informations non validées clairement signalées.
- Visiteur sans préférence : utiliser « Passer » ; la sortie est une découverte non personnalisée, jamais une promesse.
- Visiteur sans repère : utiliser « Je ne sais pas » ou « Peu importe » ; les deux actions restent locales et renvoient une piste de découverte sans profil persistant.
- Correction : utiliser « Retour » ou « Recommencer » ; l'état reste en mémoire volatile et est effacé à la fermeture.
- Visiteur connaisseur : saisir un critère sensoriel descriptif comme « un goût fruité » ; le moteur ne classe que les faits vérifiés et sourcés.
- Critère impossible : saisir un critère qui ne correspond à aucun fait validé ; la sortie indique honnêtement l'absence de match et propose le contact WOOD.
- Critère ambigu : saisir « puissant » sans contexte de goût ; le moteur demande une clarification au lieu d'inférer un effet.
- Demande d'effet ou médicale : la sortie refuse le conseil d'effet et reste descriptive.
- Hors ligne : le widget ne fait aucun `fetch` ; les données locales et le fallback restent utilisables.

## Preuves locales

- `test/wood-advisor-engine.test.mjs` : 7 tests, dont la matrice de cas et les conflits.
- `test/wood-advisor-widget.test.mjs` : contrat du widget, options « Je ne sais pas » / « Peu importe », route démo, accessibilité structurelle et absence de persistance.
- `test/wood-advisor-inventory-schema.test.mjs` : inventaire idempotent et migration D1 rejouable.
- `output/playwright/demo-advisor-mobile-open-v2.png` : panneau ouvert sur 390 × 844 px.
- `npm run check` : 372 tests, syntaxe JavaScript validée sur 175 fichiers, audit statique, readiness et continuité verts.

## Limites conservées

Les faits aromatiques, badges, stocks, prix et disponibilité restent à renseigner et valider par WOOD. La migration D1 prépare la provenance et la file de revue ; elle n'est pas déployée à distance dans ce lot.
