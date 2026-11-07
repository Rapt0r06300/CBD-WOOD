# Vérification GitHub Pages — démo WOOD

## Résultat

- Workflow : `WOOD Pages deployment`
- Run : `42334137039`
- Branche publiée : `codex/wood-tealerlab-visual-rebuild`
- Commit publié : `9f157cd`
- Statut : succès

## URLs vérifiées

- Base : https://rapt0r06300.github.io/CBD-WOOD/
- Démo : https://rapt0r06300.github.io/CBD-WOOD/demo/

Le contrôle `npm run verify:pages-live` a vérifié le 7 novembre 2026 :

| Réponse | HTTP | Octets | SHA-256 | Contrat |
| --- | ---: | ---: | --- | --- |
| Base | 200 | 71688 | `e3ef8c7af92d025a139ec2a9782d8ebac542471bd885011572e82b401893de57` | aucun runtime démo |
| Démo | 200 | 72293 | `4d844092721054bb4faa1aa60c105434263c321c2a22f505bc92118f8b21bee1` | `demo-mode.js` + adaptateur D1 présents |

Les deux empreintes sont différentes. La racine reste la version de base ; la
version démonstration est accessible uniquement sous `/demo/`. Le switcher n'est
pas affiché dans le header.

## Périmètre conservé

Cette publication reste une démonstration : aucun paiement réel, aucune
commande réelle, aucun e-mail réel et aucune donnée commerciale non validée ne
sont activés. La branche `main` n'a pas été modifiée.
