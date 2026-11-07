# Portes externes encore ouvertes — feuille de route WOOD

Statut global : **24 tâches `BLOCKED-EXTERNAL` sur 509**, sans nouvelle tâche
créditée dans le compteur. Les préparations locales, les fallbacks et les tests
ne remplacent pas une preuve fournie par la propriétaire, un appareil réel ou
un compte externe autorisé.

## Tâches et preuve attendue

| Tâche | Porte externe | Preuve nécessaire pour clôturer |
| --- | --- | --- |
| TXW-008 | Safari iOS réel | Session sur iPhone avec cache froid/chaud, réseau lent, rotation et contrôle du glyphe `?`. |
| TXW-028 | Photos authentiques de la Maison WOOD | Photos de façade/intérieur, droits d’usage et accord de publication. |
| TXW-042 | Validation artistique | Décision propriétaire/conjoint sur la planche `garder / adapter / exclure`. |
| TXW-084 | Safari iOS réel | Captures et recette des safe areas, barre Safari, menu, images et liens. |
| TXW-085 | Chromium Android réel | Appareil Android, tactile, rails, clavier virtuel et chargement d’images. |
| TXW-109 | Avis Google | Fiche, établissement, auteur, date, formulation exacte et autorisation WOOD pour chaque extrait. |
| CRO-008 | Promesse de marque | Formulation validée par la propriétaire, sans allégation ni promesse implicite. |
| CRO-051 | Référence d’échelle | Photo authentique, objet de référence et association produit confirmée. |
| CRO-082 | Photos des boutiques | Photos Barla/Borriglione, droits, établissement représenté et accord WOOD. |
| CRO-111 | Lecteur d’écran réel | Session VoiceOver ou NVDA documentée sur le parcours client. |
| D1-004 | Compte Cloudflare | Skills/MCP officiels vérifiés dans l’environnement Codex. |
| D1-005 | OAuth Cloudflare | Connexion consentie sur le compte officiel, sans exposer de jeton. |
| D1-016 | Offre Cloudflare | Offre Free vérifiée à 0 € dans le compte autorisé. |
| D1-017 | Base D1 distante | Base `wood-cbd-demo` créée dans le compte autorisé. |
| D1-018 | Migrations D1 distantes | Migrations et requêtes de contrôle exécutées sans données commerciales. |
| D1-019 | Déploiement Worker | Worker gratuit déployé sur `workers.dev` après contrôle des coûts. |
| D1-020 | API D1 distante | Recette HTTP/CORS/erreurs/mutations refusées sur l’URL distante. |
| CRO-134 | Fidélité à la boutique réelle | Revue propriétaire de la ressemblance entre la démo et les boutiques. |
| CRO-142 | Sélection authentique | Noms, sélection et données propres à chaque boutique fournis par WOOD. |
| CRO-147 | Visite photo | Trois photos authentiques, droits et validation de la séquence. |
| CRO-148 | QR imprimables | Support imprimable et approbation propriétaire des liens/visuels. |
| CRO-150 | Sélections par boutique | Données Barla/Borriglione confirmées par la propriétaire. |
| CRO-152 | Mobile en situation réelle | Recette sur téléphone réel dans le contexte d’usage prévu. |
| CRO-225 | Validation finale | Revue finale propriétaire : identité, contenu, mobile, données et publication. |

## Ce qui est déjà préparé localement

- Les fallbacks, contrats, états `pending` et tests associés existent dans le
  dépôt ; ils restent explicitement séparés des preuves externes.
- Les avis ne sont pas affichés comme note, compteur ou preuve finale tant que
  la revalidation WOOD n’est pas reçue.
- Les photos reçues par e-mail sont archivées comme références fournies mais
  ne sont pas publiées comme photos actuelles sans confirmation de l’association
  produit et de leur actualité.
- Aucune opération Cloudflare distante, paiement réel, e-mail commercial ou
  mise en production n’est déclenchée par cette vérification.

## Règle de clôture

Une tâche passe à `DONE` seulement lorsque sa preuve externe est archivée dans
`docs/validation/`, que le test ou la recette correspondante passe, puis que le
compteur est recalculé. Tant qu’une porte manque, elle reste `BLOCKED-EXTERNAL`
et le compteur reste **347 / 509 — 68,17 %**.

## Vérification du 7 novembre 2026

- La recherche Gmail `from:woodcbdshop@gmail.com after:2026/11/05` ne renvoie
  aucun nouveau message de la propriétaire ; les visuels et validations
  reçus précédemment restent donc soumis à relecture.
- `codex mcp list` ne présente aucun endpoint Cloudflare et `wrangler` n'est
  pas disponible dans l'environnement courant. D1-004 reste `PARTIAL` et
  D1-005/D1-016 à D1-020 restent `BLOCKED-EXTERNAL` conformément au plan.
- Cette vérification ne modifie ni le compteur global ni les données de la
  démo.
