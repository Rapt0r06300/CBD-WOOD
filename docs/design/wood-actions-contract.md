# Contrat des actions publiques WOOD

Statut : contrat local versionné. Il décrit les destinations et les retours du shell public ; il ne vaut pas activation du paiement Viva ni validation finale de la propriétaire.

## Périmètre et destinations

Les actions couvertes sont `Découvrir WOOD`, les liens d'univers et de boutique, `Nous trouver`, `Se connecter`, `Créer un compte`, le bouton panier, le lien checkout et les retours de fiche. Les routes publiques sont des fichiers HTML versionnés ; aucune action publique ne pointe vers `admin.html` ou ne révèle une zone propriétaire.

Le parcours de référence est `accueil → univers → fiche → panier → checkout`. Un lien d'exploration peut descendre vers `#univers`, un bouton de fiche ouvre une destination déterministe et le panier conserve son contenu local lors d'une navigation. Le compte reste un espace client ; les contrôles propriétaire sont cachés jusqu'à la confirmation du rôle côté source de vérité.

## États et retours

Chaque action possède un état de réussite, un état vide ou indisponible, une erreur récupérable et un retour explicite. Le panier vide affiche son état, désactive le checkout et ne laisse pas un lien faux focalisable. Un problème réseau conserve les lignes locales et propose `Réessayer` sans prétendre que la commande ou le paiement est confirmé.

Le dialogue panier expose `role="dialog"`, `aria-modal="true"`, un bouton de fermeture et un retour du focus vers le déclencheur. Le menu mobile conserve son état accessible, ses sous-menus, son retour au menu et ses liens directs. Les doubles clics rapides sont bornés ; un second événement ne doit ni dupliquer une ligne ni envoyer deux actions commerciales.

## Clavier, toucher et responsive

Les liens, boutons, contrôles de quantité, menu et panier sont utilisables au clavier comme au toucher. Les zones tactiles suivent les minima existants, le focus reste visible et le scroll n'est pas capturé pour simuler une interaction. Les transitions de panneau et de menu restent composées et se désactivent sous `prefers-reduced-motion: reduce`.

Sur ordinateur, les utilitaires compte/panier restent atteignables dans le header. Sur tablette, le menu se compacte avant débordement. Sur mobile, le menu structuré et la navigation basse gardent leurs retours, le checkout reste lisible et les actions ne passent jamais sous les safe areas.

## Données et sécurité

Les destinations statiques ne contiennent ni prix, ni stock, ni statut de paiement inventé. Les données de panier sont normalisées et bornées avant réinjection ; les noms, catégories et prix rendus sont échappés. Les états d'achat viennent des données de disponibilité validées, et l'accès propriétaire dépend de `owner_users`, jamais d'un e-mail codé en dur.

La frontière Viva reste préparée mais inactive tant que les identifiants professionnels ne sont pas disponibles. Les actions de commande côté serveur gardent leurs limites de méthode, CORS, idempotence et rôle ; le navigateur ne reçoit aucune session ou clé secrète.

## Preuve et rollback

La preuve locale est constituée par `test/actions-contract.test.mjs`, `test/navigation-accessibility.test.mjs`, `test/cart-resilience.test.mjs`, `test/cart-feedback.test.mjs`, les suites responsive/accessibilité et la vérification Playwright du passage fiche → panier → checkout synthétique. Ce dernier parcours ne vaut pas commande réelle.

La revue propriétaire/conjoint et les tests sur navigateurs/appareils réels restent ouverts. Pour revenir en arrière, restaurer les templates publics, `boutique.js`, `mobile-shell.js` et les styles vers le snapshot validé, puis rejouer `npm run check`. Le rollback ne touche ni les comptes, ni les produits, ni les stocks, ni les commandes, ni les secrets, ni les migrations.
