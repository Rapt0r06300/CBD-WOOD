# TXW-111 — Sources tierces et droits des assets

Date : 7 novembre 2026  
Périmètre : site de démonstration WOOD uniquement.

## Contrôle réalisé

- Le paquet public est construit à partir de la liste blanche de
  `scripts/prepare-hostinger.mjs` ; aucun fichier ajouté par défaut ne peut
  devenir public sans revue.
- Le registre graphique
  `docs/validation/2026-11-07-cro-157-graphic-rights-registry.json` couvre le
  pack WOOD et associe chaque asset à un chemin local et une autorisation
  explicite.
- Les assets graffiti vectoriels sont créés dans le dépôt et marqués
  `demo-only` / `decorative-demo`.
- La planche BD `wood-comic-sprite.webp` est conservée comme asset WOOD de
  démonstration, mais reste `pending` avec `owner-validation-required` ; elle
  n'est pas présentée comme approuvée par la propriétaire.
- Les fichiers texte du paquet public ne contiennent aucune image HTML distante
  (`img/src`, `srcset`) ni aucun `background-image` distant (`url(https:)`).
- La démo ne reprend aucun sticker, logo, création ou photo TealerLab / tiers.
  Les références à TealerLab présentes dans la documentation restent des notes
  d'audit et ne sont pas des assets publiés.

## Verdict

Le contrôle local ne relève aucun média tiers injecté dans le paquet public et
chaque asset graphique diffusé possède une source traçable. Les droits des
photos réelles, la validation finale de la propriétaire et les futures images
transmises restent des portes externes séparées ; elles ne sont pas simulées.

Contrat : `test/txw-111-third-party-sources.test.mjs`.
