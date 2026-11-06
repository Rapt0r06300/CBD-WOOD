# Contrat micro-copy, emojis et humour WOOD

Statut : contrat local versionné. Les formulations doivent rester adultes, simples, non médicales et faciles à retirer ; l'humour sert la voix WOOD sans remplacer une information ni créer une promesse.

## Périmètre et source de vérité

Le périmètre couvre les titres courts, kickers, boutons, messages de chargement, états vides/erreur, libellés de catalogue, panier, checkout, compte, livraison et notifications éditoriales. `docs/design/wood-microcopy.md` est la bibliothèque canonique ; `wood-content-data-contract.md`, les templates HTML et les scripts ne peuvent pas fabriquer un synonyme commercial ou un état non validé.

Une formulation sensible doit être réutilisable telle quelle : `Découvrir WOOD`, `Ajouter au panier`, `Réessayer`, `Votre panier est vide.`, `Livraison à domicile disponible`, `Commande enregistrée` et `La commande n’a pas été confirmée. Votre panier est conservé.`. Les changements de ces phrases passent par la bibliothèque et sa revue.

## Lexique sensible et humour

Les prix sont en euros, les grammages en grammes, la disponibilité, la livraison, le paiement et les erreurs sont écrits littéralement. Ils ne portent ni emoji, ni jeu de mots, ni humour qui pourrait masquer un état. L'action garde le même verbe sur toutes les routes et un bouton indisponible explique son état au lieu de plaisanter.

Les signatures éditoriales comme `Si c’est WOOD, c’est GOOD.` peuvent rester directes et légèrement décalées ; elles ne constituent ni argument de santé, ni avis client, ni preuve de qualité, ni promotion. Un emoji est facultatif, décoratif et supprimable ; une phrase doit rester complète lorsque l'emoji est retiré. Toute nouvelle accroche dispose d'une formulation neutre de repli.

Sont interdits par défaut : bénéfice médical, effet garanti, taux non fourni, faux avis, note, compteur, `best-seller`, promotion, voucher, retrait, SMS et paiement Viva présenté comme actif. Une exception nécessite une décision écrite de la propriétaire et une preuve adaptée.

## États, fallback et suppression

Le chargement, le vide, l'erreur réseau, la disponibilité à confirmer et le fallback média restent explicites dans le texte. Une erreur récupérable propose `Réessayer` ; une panne de commande conserve le panier et ne prétend pas avoir confirmé la commande. Le contenu utile ne dépend ni d'un emoji, ni d'une animation, ni d'un hover.

Les touches d'humour sont attachées à leur section et n'ont aucun effet sur le panier, le prix, le stock, le paiement, la livraison, la session ou les données client. Leur retrait doit être possible sans migration ni changement de route. Les doublons et doubles actions n'ajoutent pas de phrase ou de notification trompeuse.

## Responsive, accessibilité et sécurité

- Ordinateur : les accroches restent courtes et ne déplacent pas les CTA, les cartes ou le panier.
- Tablette : le texte se replie sans masquer un état, une unité, un lien ou une erreur.
- Mobile : les phrases sont lisibles à largeur étroite, avec un repli neutre si l'emoji est absent et sans débordement sous les barres système.

Les labels, titres, boutons et erreurs sont sémantiques et compréhensibles par lecteur d'écran ; l'information essentielle est transmise par le texte. Aucune micro-copy ne révèle secret, donnée privée, rôle propriétaire ou état Supabase interne. `prefers-reduced-motion` conserve les mêmes mots et actions.

## Preuve, revue et rollback

La preuve locale est constituée par `test/wood-copy-humor-contract.test.mjs`, `test/microcopy-contract.test.mjs`, `test/content-data-contract.test.mjs`, `test/public-visual-guardrails.test.mjs`, les suites accessibilité/responsive et `npm run check`.

La propriétaire et son conjoint doivent relire les nouvelles accroches, emojis, doubles sens et formulations de commande avant publication. Les navigateurs et appareils réels restent une validation séparée. Pour revenir en arrière, restaurer `wood-microcopy.md`, le template ou le script concerné vers le snapshot validé, puis rejouer `npm run check`. Le rollback ne touche ni comptes, ni produits, ni prix, ni stocks, ni commandes, ni secrets, ni migrations.
