# CRO-111 — Recette lecteur d'écran du parcours client

## Statut

`BLOCKED-EXTERNAL` — préparation locale effectuée le 7 novembre 2026

La structure publique prépare une lecture séquentielle du parcours WOOD, mais
la validation réelle avec VoiceOver, NVDA ou un équivalent doit être exécutée
sur un environnement équipé d'un lecteur d'écran. Cette porte ne peut pas
être fermée par les assertions HTML seules.

## Parcours à tester

1. **Menu** : ouvrir et fermer la navigation, annoncer l'état ouvert/fermé,
   parcourir les liens et récupérer le focus sur le bouton d'origine.
2. **Liste** : atteindre le titre de page, les filtres, chaque carte et son
   lien de fiche sans dépendre d'une image, d'une couleur ou d'un hover.
3. **Fiche** : lire le nom, les faits connus, les informations manquantes, la
   galerie, les paliers de grammage et les actions locales.
4. **Contact** : parcourir chaque label, l'état des champs et le lien FAQ sans
   supposer qu'une icône ou un placeholder est une instruction.
5. **Panier fictif** : annoncer l'ajout local, le contenu, la quantité, le
   total de démonstration et le retour catalogue sans déclencher de commande.

## Critères d'écoute

- Aucune action uniquement visuelle : tout contrôle doit avoir un nom, un état
  et une cible compréhensibles au clavier et par synthèse vocale.
- Les accents graffiti, images décoratives et icônes restent ignorés quand ils
  sont purement décoratifs ; leur texte utile existe déjà dans le libellé.
- Les changements locaux utilisent une zone `aria-live` appropriée et ne
  déplacent pas le focus sans action de l'utilisateur.
- Les états démo, indisponible et source à fournir sont lus comme du contenu,
  pas comme une promesse commerciale.

## Pré-vérifications locales

Le test `test/cro-111-screen-reader.test.mjs` vérifie les repères de structure
des pages accueil, fiche, contact et panier fictif, ainsi que la présence de ce
protocole et de sa limite externe. Il ne remplace pas l'écoute manuelle.

Commande : `npm run check`

## Porte de sortie

Après une session réelle, consigner le lecteur utilisé, le système, les
parcours parcourus, les annonces problématiques, les corrections et la date.
Ne passer la tâche en `[x]` qu'après cette preuve et une nouvelle suite de
non-régression.
