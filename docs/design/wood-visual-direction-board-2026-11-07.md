# Planche de direction WOOD — 7 novembre 2026

Cette planche prépare la revue de la propriétaire. Elle reprend le rythme
éditorial, la densité média et la lisibilité commerciale attendus pour la
démonstration WOOD, sans importer les assets, textes ou placements de
TealerLab.

## Statuts

- **Approuvé — brief** : exigence explicitement exprimée par la propriétaire
  dans les messages reçus ; cela ne vaut pas approbation d'un export final.
- **Proposé** : composition ou asset de démonstration à revoir.
- **À fournir** : média, texte ou donnée externe manquante.

## Planche de revue

| Zone | Direction proposée | Source locale | Statut | Décision attendue |
| --- | --- | --- | --- | --- |
| Palette | Vert WOOD profond, crème, anis et lignes fines ; contraste net sans nouvelle teinte | `wood-direction-register.md`, tokens de `boutique.css` | Approuvé — brief | confirmer les nuances finales |
| Typographie | Sans-serif compacte, titres en capitales, kicker espacé et paragraphes courts | `wood-typography-contract.md` | Approuvé — brief | confirmer les tailles sur mobile |
| Hero | Accroche en trois temps, logo WOOD, sticker original, grande scène botanique, deux CTA directs | `index.html`, `wood-hero-contract.md` | Proposé | garder, déplacer ou réduire le sticker |
| Sticker / graffiti | Trait peint WOOD, GOOD, feuille, cloche, flèche et smiley ; décor ancré au bloc et masquable | `docs/design/wood-graffiti-pack.md`, `assets/graffiti/` | Proposé | choisir les familles à conserver |
| Carte fleurs | Image, nom exact, profil, grammage, prix de la carte et disponibilité séparés | `fleurs.html`, `wood-product-card-contract.md` | Approuvé — brief | revoir densité et ordre des informations |
| Carte résines | Même hiérarchie que les fleurs, sans inventer texture, origine, taux ou stock | `resines.html`, `wood-resin-shop-contract.md` | Proposé | fournir les textes et photos réels |
| Séquence photo | Grand média, légende courte, repère « maquette » discret et action de découverte | `wood-photo-brief.md`, `wood-editorial.css` | Proposé | remplacer par photos autorisées quand disponibles |
| Présentation sous cloche | Scène éditoriale de démonstration uniquement ; vraie photo produit sans cloche pour le catalogue | `wood-photo-brief.md`, registre média | Approuvé — brief | valider le rôle éditorial de la cloche |
| Boutique / maison WOOD | Façade noire, végétation, bois, mur de stickers et accueil humain, en fallback illustré | messages de la propriétaire, `index.html` | À fournir | recevoir une photo autorisée ou confirmer le fallback |
| Packs / vouchers | Emplacements préparés mais inactifs ; aucun prix barré, code ou économie inventée | `index.html`, contrat commercial | Approuvé — brief | fournir règles et offres si publication souhaitée |
| Preuve | Extraits Google sourcés, fondus automatiques, sans compteur ni promesse globale | `wood-quality-proof-contract.md`, sources Google | Proposé | validation des extraits avant publication finale |

## Règles de composition

1. Une seule zone peut porter l'impact visuel maximal par écran ; les prix,
   stocks, boutons, formulaires et mentions restent calmes.
2. Chaque graffiti est attaché à son bloc, porte `aria-hidden="true"` quand il
   est décoratif et disparaît sans déplacer le contenu utile.
3. Une photo de démonstration est étiquetée comme telle ; une photo réelle ne
   passe à `approved` qu'avec source, date, autorisation et validation WOOD.
4. La planche est revue à 390 px et 1440 px avant toute validation esthétique.

