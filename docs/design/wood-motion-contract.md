# Contrat motion WOOD — desktop et replis

Statut : contrat local versionné. Les hover, changements d'image, reveals et transitions donnent du rythme à WOOD sans retarder l'achat, déplacer la page ou réserver une information au mouvement.

## Périmètre et intention

Le périmètre couvre les cartes catalogue, le changement d'image, le zoom de fiche, les reveals au défilement, le bandeau, le feedback tactile et les transitions du shell public. `boutique.css`, `mobile.css`, `mobile-shell.js` et `boutique.js` portent le rendu ; les tests motion et responsive gardent la preuve locale.

L'inspiration TealerLab est adaptée à WOOD : mouvement court, composé et secondaire, sur les surfaces et médias déjà validés. Le texte, les prix, stocks, grammages, boutons, liens, erreurs, livraison, paiement et mentions légales restent compréhensibles avant, pendant et après l'animation.

## Transitions et interactions

Sur ordinateur, le hover de carte peut utiliser une translation bornée, l'image peut changer de scale/opacity et le zoom de fiche peut cloner le média avec `transform`/`opacity`. Le reveal ne doit pas capturer le scroll, empêcher le clavier, déplacer le conteneur ou modifier une donnée métier. Une image ou carte rendue après Supabase reçoit les mêmes comportements sans double observateur.

Sur tablette et mobile, le toucher, le focus et l'activation directe remplacent le hover. Les actions essentielles gardent un lien ou bouton HTML utilisable sans enhancement. Une action interrompue par navigation, fermeture ou erreur revient à un état stable ; un double clic ne crée pas de commande ni de ligne supplémentaire.

## Reduced-motion, faible donnée et fallback

Avec `prefers-reduced-motion: reduce`, les transitions deviennent immédiates ou sont supprimées ; le contenu, le focus, le visuel, le statut et les actions restent présents. En faible donnée ou sur un navigateur limité, le shell peut désactiver le reveal, le changement de photo et le mouvement décoratif sans masquer le catalogue.

Si `IntersectionObserver` est absent, si une image est lente ou si le média échoue, le HTML direct et le fallback WOOD restent visibles. Le chargement, l'état vide, l'erreur et le fallback ne dépendent jamais d'un délai d'animation. Les propriétés animées restent composées (`transform`, `opacity`, bordure, ombre) et les durées sont bornées.

## Responsive, accessibilité et performance

- Ordinateur : le hover est informatif, réversible et ne modifie pas la largeur de la grille ni l'ordre du catalogue.
- Tablette : les transitions gardent les safe areas, les titres, les prix et les actions dans leur bloc.
- Mobile : le feedback tactile reste court, l'action est visible sans survol et le shell ne bloque ni scroll ni clavier virtuel.

Les contrastes, noms accessibles, alternatives d'image, focus et cibles tactiles ne dépendent pas du mouvement. Les animations sont limitées aux composants WOOD nécessaires, n'ajoutent aucun script tiers et sont contrôlées par les préférences système et les signaux de faible donnée. Le budget local est vérifié par les tests et la preuve Chromium ; les appareils réels restent externes.

## Preuve, revue et rollback

La preuve locale est constituée par `test/wood-motion-contract.test.mjs`, `test/motion-guardrails.test.mjs`, `test/product-detail.test.mjs`, les suites responsive/accessibilité et les vérifications Playwright déjà documentées.

La propriétaire et son conjoint doivent valider le dosage, les reveals, le changement d'image et le zoom sur les parcours principaux. Les navigateurs et appareils réels restent une validation séparée. Pour revenir en arrière, retirer la classe, l'observateur ou la transition concernée et restaurer le style précédent, puis rejouer `npm run check`. Le rollback ne touche ni produits, ni prix, ni stocks, ni commandes, ni comptes, ni secrets, ni migrations.
