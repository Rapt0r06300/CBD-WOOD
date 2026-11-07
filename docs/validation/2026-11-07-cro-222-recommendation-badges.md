# CRO-222 — Recommandation explicable avec badge

Le moteur du conseiller expose désormais, pour la meilleure piste et jusqu'à
deux alternatives, les badges dérivés uniquement des faits `verified` qui
possèdent une source. Chaque badge porte un libellé, une raison et sa source.
Les caractéristiques non vérifiées sont exclues du classement et du rendu.

Le widget affiche les deux alternatives, leurs badges descriptifs et la
différence justifiée, sans score opaque ni promesse d'effet. Les combinaisons
restent locales, déterministes et bornées à deux alternatives.

Preuve : `test/cro-222-recommendation-badges.test.mjs`,
`test/wood-advisor-engine.test.mjs`, `test/wood-advisor-widget.test.mjs`.
