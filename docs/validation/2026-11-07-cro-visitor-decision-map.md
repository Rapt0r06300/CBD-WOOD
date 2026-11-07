# WOOD — carte des visiteurs, décisions et frictions

Date : 7 novembre 2026
Périmètre : démonstration locale, sans paiement, compte réel ni collecte.

## Quatre intentions non médicales

| Intention | Question à résoudre | Page de départ | Action attendue |
|---|---|---|---|
| Première découverte | « Qui est WOOD et par où commencer ? » | Accueil | Ouvrir un univers puis revenir à l'accueil |
| Connaisseur | « Quelle référence et quelle fiche consulter ? » | Fleurs ou Résines | Ouvrir une fiche et comparer les informations publiées |
| Cadeau non réglementé | « Quel objet ou univers découvrir sans promesse d'effet ? » | WOOD Shop ou Bien-être | Consulter une fiche de maquette clairement non achetable |
| Visite locale | « Où trouver WOOD et comment appeler ? » | Accueil, Contact ou boutiques | Ouvrir l'itinéraire ou le téléphone d'une boutique |

Les formulations parlent de découverte, de matière, de boutique et d'information. Elles ne classent jamais un produit par effet physiologique ou médical.

## Dix objections avant achat ou visite

| Objection | Réponse démo | Source / état |
|---|---|---|
| Quel est le prix ? | Les prix de démonstration ne sont affichés que lorsqu'ils proviennent du registre autorisé ; sinon l'action reste inactive. | `flower-pricing.js`, données locales |
| Est-ce une vraie photo ? | Le média est marqué démo tant qu'une photo WOOD approuvée n'est pas reçue. | registre média |
| Comment la qualité est-elle prouvée ? | Les emplacements de preuve restent vides tant qu'une source datée n'est pas fournie. | contrat de preuve |
| Le produit est-il disponible ? | L'état de maquette n'est pas présenté comme un stock réel. | catalogue local / D1 démo |
| Puis-je acheter ici ? | Le panier et le checkout sont explicitement simulés en `/demo/`. | frontière démo |
| Où est la boutique ? | Les deux adresses et téléphones sont accessibles par les pages boutiques et Contact. | `docs/ops/public-routes.md` |
| Quels horaires sont garantis ? | Les horaires affichés restent à confirmer si aucune source actuelle n'est attachée. | état de contenu |
| Puis-je demander un conseil ? | Le conseiller local explique seulement des faits vérifiés ; sinon il indique l'absence d'information. | moteur conseiller |
| Que deviennent mes données ? | Aucun formulaire démo n'envoie ni ne conserve une demande réelle. | `demo-mode.js` |
| Puis-je revenir en arrière ? | Chaque fiche garde le retour vers son univers et l'accueil. | tests de liens |

## Carte des décisions

`Accueil → Univers → Liste → Fiche → Contact ou visite`

Le panier fictif est une branche séparée : `Fiche → panier local → checkout simulé → retour accueil`. Aucun chemin de démonstration ne force une inscription ou un paiement.

## Cinq missions testables

1. Identifier WOOD et sa nature en cinq secondes sur 375/390/1440 px.
2. Retrouver une référence fleur depuis l'accueil.
3. Comprendre qu'un grammage et un prix peuvent être une maquette non achetable.
4. Trouver l'adresse Barla et l'action d'itinéraire.
5. Trouver le numéro de la boutique et l'action d'appel.

La mission est réussie si la personne atteint la destination sans aide et sans dépendre d'un effet de survol.

## Matrice de preuve

| Besoin | Preuve attendue | État local |
|---|---|---|
| Identité | logo et slogan WOOD | disponible |
| Produit | photo autorisée, nom, fiche | visuels démo identifiés |
| Qualité | source, date, contexte | en attente de données vérifiées |
| Disponibilité | état explicite | démo / inconnu, jamais stock réel |
| Visite | adresse, téléphone, itinéraire | présent dans les pages locales |
| Conseil | faits sourcés | moteur local, aucune promesse |

## Parcours local versus catalogue

- Parcours visite : `Accueil → Nos boutiques → fiche adresse → itinéraire / appeler`.
- Parcours catalogue : `Accueil → univers → liste → fiche → découverte associée`.
- Les deux parcours ont un CTA dominant différent et ne mélangent pas une action de visite avec une commande réelle.

## Frictions relevées

| Friction | Preuve existante | Priorité | Action suivante |
|---|---|---:|---|
| Densité de contenu mobile | `output/playwright/demo-home-mobile.png`, `demo-advisor-mobile-open-v2.png` | haute | revue visuelle multi-hauteurs |
| Médias démonstration versus photos réelles | `docs/validation/2026-11-05-wood-tealerlab-comparison.md` | haute | remplacer uniquement après approbation |
| Offre et preuve commerciale | tests de garde-fous et états vides | haute | conserver la démo neutre |
| Retour liste/fiche | `test/links.test.mjs`, `docs/ops/public-routes.md` | moyenne | maintenir la recette après chaque build |
| Compatibilité appareils réels | rapport readiness | externe | tester Safari/Firefox sur appareils accessibles |

## Statut

CRO-001 à CRO-007 : `DONE` pour la conception et la preuve locale. CRO-008 reste ouvert : la formulation finale doit être relue par la propriétaire avant approbation.
