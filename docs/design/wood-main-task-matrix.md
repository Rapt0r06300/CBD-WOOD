# WOOD — matrice de preuve des tâches principales M001–M076

## Objet

Cette matrice clôt les sous-tâches atomiques des 76 tâches principales uniquement lorsque le dépôt contient un livrable et une preuve locale correspondante. Elle ne transforme pas une documentation en mise en production : les décisions de la propriétaire, les appareils réels, les réglages de services externes, les contenus encore à fournir et la restauration réelle restent des portes séparées.

## Couverture locale

- **M001.a–M076.a :** cadrage et sources reliés à la feuille de route, aux contrats WOOD, aux guides opératoires et aux tests ciblés.
- **M001.b–M076.b, sauf M045, M046, M047, M058, M067 et M075 :** livrables locaux présents et contrôlés.
- **M001.c–M076.c, sauf M029, M046, M047 et M067 :** états nominaux, vides, erreurs, accessibilité, sécurité et doubles actions contrôlés par les tests locaux applicables ; M061.c est couvert par la simulation réseau et la baseline de performance locale.
- **M001.d–M076.d, sauf M003, M007, M028, M029, M034, M035, M037, M038, M039, M040, M042, M045, M046, M047, M049, M058, M061, M062, M063, M064, M067, M073, M074, M075 et M076 :** preuve locale, réversibilité et journalisation suffisantes pour fermer la sous-tâche.

## Contrats et preuves de référence

Les preuves transversales sont réparties dans les contrats de conception `docs/design/wood-*.md`, les tests `test/*.test.mjs`/`test/*.test.js`, les guides `docs/ops/` et les validations suivantes :

- `docs/validation/2026-11-05-local-readiness.md`
- `docs/validation/2026-11-05-responsive-reference.md`
- `docs/validation/2026-11-05-wood-tealerlab-comparison.md`
- `docs/ops/production-checklist.md`
- `docs/ops/supabase-backup-restore.md`
- `docs/ops/owner-handover.md`
- `docs/ops/owner-quick-guide.md`

Les contrats spécifiques qui portent la majorité de la couverture sont `wood-home-storyboard`, `wood-hero-contract`, `wood-selection-contract`, `wood-shop-contract`, `wood-product-card-contract`, `wood-product-detail-contract`, `wood-product-photo-contract`, `wood-motion-contract`, `wood-mobile-motion-contract`, `wood-accessibility-contract`, `wood-cart-contract`, `wood-delivery-contract`, `wood-customer-account-contract`, `wood-owner-role-contract`, `wood-owner-dashboard-contract`, `wood-supabase-data-contract`, `wood-supabase-media-contract`, `wood-email-document-contract` et `wood-hosting-package-contract`.

## Portes encore ouvertes

| Sous-tâche | Cause | Action de fermeture |
|---|---|---|
| M045.b/d, M058.b/d | Les photos réelles sans contenant et les assets graffiti futurs ne sont pas fournis/validés. | Recevoir les fichiers, leurs droits et la validation propriétaire, puis remplacer fichier par fichier. |
| M046.b/c/d, M047.b/c/d | Protection Supabase contre les mots de passe compromis, Turnstile, débit et origines exigent les services externes. | Régler les services, exécuter les scénarios négatifs sur projet de test et archiver les journaux. |
| M061.d | La mesure réelle réseau mobile lent et la preuve de performance hors dépôt restent à réaliser. | Capturer une recette réseau représentative et consigner les seuils observés. |
| M067.b/c/d | Les avis, preuves de qualité et données réelles ne peuvent pas être inventés. | Recevoir les sources validées puis exécuter la recette de contenu. |
| M075.b/d | Les textes légaux et informations exactes de l’entreprise manquent. | Recevoir les textes validés, publier les liens légaux et obtenir la validation propriétaire. |
| M029.c/d, M034.d, M035.d, M037.d, M038.d, M039.d, M040.d, M042.d, M049.d, M062.d, M063.d, M073.d | Appareils/navigateurs réels, transfert externe, captures finales, validation humaine ou red-team final. | Exécuter la recette externe et archiver les captures, décisions et journaux requis. |
| M003.d, M007.d, M028.d, M074.d | Charte, preuves éditoriales, ton et droits d’usage nécessitent la décision explicite de la propriétaire. | Obtenir la décision propriétaire et la conserver dans `docs/validation/`. |
| M064.d | La recette WOOD × TealerLab doit être approuvée séparément par la propriétaire et son conjoint. | Faire la revue humaine et consigner les deux critères séparément. |
| M076.d | La restauration Supabase réelle n’a pas encore été exécutée sur un projet de test. | Restaurer une sauvegarde réelle, vérifier les commandes/notifications et archiver le résultat. |

## Règle de progression

Le pourcentage global additionne les 304 atomiques M et les 4 224 atomiques R. Une ligne M ne sera cochée qu’après présence du livrable, passage de la preuve locale et conservation d’un retour arrière lorsque la tâche le demande.
