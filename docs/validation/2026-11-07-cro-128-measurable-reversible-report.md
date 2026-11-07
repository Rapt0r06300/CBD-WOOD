# CRO-128 — Bilan mesurable et réversible

Date : 7 novembre 2026  
Périmètre : **site de démonstration WOOD**, sans paiement, commande réelle,
email commercial ni modification de Supabase de production.

## Compteur et état

- Le compteur documenté avant ce bilan était **312 / 509 — 61,30 %**.
- Après validation de ce ticket, le compteur devient **313 / 509 — 61,49 %**.
- Il reste **58 tickets actifs** ouverts dans le plan ; les **138 tâches différées**
  restent hors exécution active et hors validation automatique.
- Le dénominateur inclut les 371 tickets actifs et le registre global conserve
  bien 509 tâches recensées.

## Preuves exécutées

- `npm run check` : **521 tests réussis**, syntaxe JavaScript OK, audit statique
  OK, readiness OK et continuité OK. Le précédent état avant les deux contrats
  de ce bilan comptait 519 tests ; le chiffre 521 est celui du run final.
- Le lot mobile `CRO-107` est vérifié aux largeurs 320, 375, 390 et 430 px ;
  la barre d’action démo reste au-dessus de la navigation mobile et sans
  débordement horizontal.
- Le commit `2f50df4` porte le lot `CRO-107` et son test ciblé ; il est
  poussable et réversible par `git revert 2f50df4`.
- La préparation GitHub Pages conserve la racine de sauvegarde séparée de
  `/demo/`, avec vérification de paquet avant publication.

## Mesure honnête

Les objectifs de performance et les budgets média existants restent la
référence ; ce bilan ne fabrique aucun gain LCP/CLS/INP sans mesure de terrain.
Le changement ajoute une barre mobile de 61 px et réserve l’espace nécessaire,
ce qui privilégie l’absence de recouvrement sur la densité visuelle.

## Portes restantes

Les validations propriétaire, les avis Google avec source et date, les photos
réelles autorisées, les tests sur appareil physique, les comptes Cloudflare,
les preuves commerciales, les textes légaux et la publication commerciale sont
encore `BLOCKED-EXTERNAL` ou ouverts. Aucune validation propriétaire n’est
marquée DONE et aucun avis Google n’est déclaré validé dans ce bilan.

## Recommandations réversibles

1. Faire relire la barre mobile et l’identité visuelle sur iPhone/Android avant
   toute décision artistique finale.
2. Remplacer les visuels démo uniquement après réception des sources et droits.
3. Conserver le point de retour `2f50df4` et la séparation `/demo/` / base lors
   des prochains lots.
