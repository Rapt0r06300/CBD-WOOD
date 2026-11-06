# WOOD — matrice navigateur du paquet Hostinger local

Date de vérification : 2026-11-05

Cette preuve concerne le paquet généré localement dans `dist-hostinger`. Elle ne prétend pas valider le serveur Hostinger, le DNS, le HTTPS réel ni les appareils physiques.

## Génération et parcours

- `npm run prepare:hostinger` a reconstruit une sortie propre de **57 fichiers publics**.
- `node scripts/hostinger-preflight.mjs` a accepté la liste publique et a contrôlé toutes les références locales `href`/`src` des HTML.
- Un serveur local a servi uniquement `dist-hostinger` depuis sa racine.
- Playwright CLI `1.64.1` a ouvert et capturé 12 combinaisons à `390 × 844` : Chromium, Firefox et WebKit × accueil, catalogue fleurs, fiche Nimbus et checkout.
- Les 12 commandes de capture ont terminé avec le code 0 ; le journal HTTP a répondu `200` pour les quatre documents et leurs scripts, notamment `checkout-required.js`.
- Une matrice Chromium complémentaire a capturé l’accueil et `fleurs.html` à `320`, `375`, `390`, `430`, `768`, `1024` et `1440` px ; la reprise séquentielle de `fleurs.html` à `390` px a également terminé avec le code 0. Les documents, scripts et médias observés ont répondu `200`.

## Limites

- La preuve reste locale : elle ne remplace pas la mise en ligne Hostinger, le contrôle DNS/SSL, les appareils réels, Safari iOS/macOS, Chrome Android ni la recette propriétaire.
- Le retour arrière reste local et reproductible en restaurant le snapshot/commit validé puis en relançant `npm run prepare:hostinger` et le préflight.
