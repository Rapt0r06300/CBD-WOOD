# Mesure UX locale de la démo — 7 novembre 2026

La démo ne charge aucun outil d'analytics et ne dépose aucun cookie. Le
simulateur local `scripts/ux-measurement-sim.mjs` réduit une fixture à cinq
événements agrégés :

1. entrée ;
2. ouverture d'un univers ;
3. ouverture d'une fiche ;
4. clic téléphone ;
5. clic itinéraire.

Le résultat reste en mémoire et indique explicitement `sent: false`,
`stored: false` et `purchase: false`. Il ne contient ni adresse, ni identifiant,
ni information de commande. La mesure d'un achat est volontairement absente.

Commande de reprise : `npm run ux:measure`.
Contrat : `test/ux-measurement-plan.test.mjs`.
