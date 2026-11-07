# CRO-053 — Séquence photo de l’univers boutique

Statut : **préparé et vérifié pour la démo locale**. Les photos authentiques
et les droits de publication restent en attente de la propriétaire ; aucun
fallback n’est présenté comme une image réelle de boutique.

## Slots livrés

| Slot | État public | Responsable du prochain apport | Fallback démo | Remplacement attendu |
|---|---|---|---|---|
| Façade | attente | Propriétaire WOOD | composition locale marquée démo | photo d’arrivée avec enseigne lisible |
| Plantes | attente | Propriétaire WOOD | matière botanique locale marquée démo | photo des plantes de la boutique |
| Étagères | attente | Propriétaire WOOD | détail produit local marqué démo | photo des meubles et étagères |
| Mur de stickers | attente | Propriétaire WOOD | scène graphique locale marquée démo | photo du mur et de ses stickers autorisés |
| Accueil | attente | Propriétaire WOOD | composition sous cloche locale marquée démo | photo de l’accueil et/ou de l’équipe autorisée |

Chaque slot possède un ratio stable, un texte alternatif provisoire, une légende
éditoriale et un repère `PHOTO BOUTIQUE À REMPLACER`. Le remplacement pourra
être effectué fichier par fichier sans changer la structure ni le parcours.

## Garde-fous

- Les cinq emplacements utilisent uniquement des assets locaux de démonstration.
- La propriétaire doit confirmer l’origine, les droits, les personnes visibles,
  l’établissement représenté et le texte alternatif avant publication.
- Une photo reçue par e-mail reste `owner-provided-pending-approval` tant que
  cette validation n’est pas explicitement donnée.
- La séquence est une aide de préparation visuelle : elle ne fabrique ni
  réputation, ni disponibilité, ni preuve commerciale.

## Vérification

- `node --test test/cro-053-store-sequence.test.mjs` : **2/2**.
- `npm run check` : suite complète, audit statique, readiness et continuité
  requis avant clôture.
