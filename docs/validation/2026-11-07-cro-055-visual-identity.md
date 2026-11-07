# CRO-055 — Contrôle d'identité des visuels

Date : 7 novembre 2026
Périmètre : site de démonstration WOOD uniquement.

## Checklist réalisée

| Famille | Origine contrôlée | Identité | Statut public |
| --- | --- | --- | --- |
| Fleurs et résines déjà affichées | registre `docs/design/wood-asset-register.md` | illustrations locales WOOD, aucune marque tierce | `demo`, conservées comme démonstration |
| Hero, éditorial et galerie | liste blanche `scripts/prepare-hostinger.mjs` | médias locaux documentés, aucun emballage fictif présenté comme réel | `demo`, publiables avec leurs libellés honnêtes |
| Photos `Bloody Mary`, `Nimbus`, `CBN Cream` | mail « Visuels Produits » de `woodcbdshop@gmail.com`, 4 novembre 2026 | visuels produits transmis par WOOD, sans logo tiers visible | `owner-provided-pending-approval`, non publiées |
| Logo et isotype vert/blanc | mail « Logo - isotype WOOD » de `woodcbdshop@gmail.com` | fichiers de marque transmis par WOOD, originaux conservés | reçus, publication finale à confirmer |

## Garde-fous

- Aucun visuel d'un tiers ou de TealerLab n'est copié dans le paquet public.
- Les pièces jointes propriétaires sont conservées dans
  `docs/validation/owner-materials/`, dossier ignoré par Git et absent de la
  liste blanche de publication.
- La présence d'un fichier, son nom ou son chemin ne transforme pas une photo
  en preuve commerciale et ne vaut pas approbation de publication.
- Aucun emballage, laboratoire, taux, stock, avis ou origine n'est déduit de
  ces images.
- Le passage à `approved` reste réservé à une confirmation propriétaire
  explicite, avec retour fichier par fichier possible.

## Verdict

L'identité des médias diffusés dans la démo est contrôlée et distincte des
photos reçues en attente. Une photo non approuvée ne peut pas entrer dans le
paquet GitHub Pages par inadvertance.

Preuve automatisée : `test/cro-055-visual-identity.test.mjs`.
