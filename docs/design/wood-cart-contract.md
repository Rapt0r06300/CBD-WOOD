# Contrat du panier WOOD

Statut : contrat local versionné. Le panier prépare une commande lisible et réversible ; il ne transforme jamais une démonstration, un prix inconnu ou une action répétée en vente confirmée.

## Périmètre et source de vérité

Le contrat couvre le déclencheur du panier, le dialogue, les lignes, quantités, variantes de grammage, prix, total, état vide, checkout, synchronisation entre onglets, compteurs et feedbacks. `boutique.js` porte la source locale et les contrôles d'intégrité ; les pages catalogue portent les données publiques ; la validation serveur reste l'autorité finale du prix, du stock et de la commande.

Une ligne est identifiée par sa variante produit et son grammage. Un ajout de la même variante augmente sa quantité au lieu de créer un doublon ; une autre variante garde sa propre ligne. Une carte indisponible, un prix vide ou une donnée non validée ne peut pas être ajouté.

## Quantités, variantes, grammes et totaux

Les valeurs réinjectées depuis `localStorage` sont normalisées, filtrées et plafonnées à 99 unités. Les boutons plus, moins et supprimer réutilisent la même normalisation ; une quantité qui tombe sous une unité retire la ligne. Le compteur reflète la somme des quantités et le total utilise le prix de chaque ligne multiplié par sa quantité.

Pour les fleurs, le gramme sélectionné est une variante contrôlée par les paliers WOOD. Un grammage intermédiaire visible mais non validé reste non achetable et ne participe pas à une fausse confirmation. Si une ligne possède un prix manquant, le total affiche `À confirmer` et aucune promesse de paiement n'est déduite.

## Dialogue, focus et états

Le panneau expose `role="dialog"`, `aria-modal="true"`, un titre, une fermeture, une liste défilable et un feedback `aria-live="polite"`. À l'ouverture, le focus entre dans le panneau ; `Escape`, le bouton de fermeture et le backdrop le ferment ; à la fermeture, le focus revient au dernier déclencheur sans déplacer la page.

Le panier vide explique comment ajouter une référence et rend le lien checkout non focalisable. Une ligne expose un nom, sa catégorie, son prix ou son état, sa quantité et des boutons nommés pour ajouter, retirer ou supprimer. L'ajout donne un feedback local discret, sans `alert` bloquant.

## Persistance, sécurité et résilience

La persistance est limitée au panier local WOOD et résiste à une navigation ou à un onglet voisin. L'écoute `storage` recharge une valeur normalisée ; une valeur JSON invalide revient à une sélection vide. Les noms, catégories, prix et grammages sont échappés avant réinjection HTML.

Un double-clic très rapide est ignoré pendant une fenêtre bornée ; un double rendu ou un événement de catalogue ne duplique pas une ligne. Le panier ne révèle ni session, ni secret, ni stock privé. La commande transmet des identifiants, grammages et quantités au service contrôlé, puis ne vide le panier qu'après une création acceptée.

## Responsive, motion et repli

Le dialogue reste visible sur desktop, tablette et mobile, sa liste défile indépendamment et les contrôles gardent des cibles tactiles. Le contenu s'adapte à la barre mobile et aux safe areas sans transformer le checkout en action cachée. Une animation de feedback ou d'ouverture n'est jamais nécessaire pour comprendre le contenu ; `prefers-reduced-motion` la neutralise.

Une panne réseau conserve le panier local et affiche une erreur récupérable. Une donnée manquante conserve le nom et l'état explicite sans inventer un tarif. Le rollback des styles ou du script ne supprime aucune ligne persistée ni aucune commande serveur.

## Preuve, revue et rollback

La preuve locale est `test/wood-cart-contract.test.mjs`, complétée par `test/cart-resilience.test.mjs`, `test/cart-feedback.test.mjs`, les tests de disponibilité, de commande et de navigation accessible. Elle vérifie la fusion des variantes, le plafond, le total, le dialogue, le focus, les états, l'échappement, la synchronisation et l'anti-double-clic.

La propriétaire et son conjoint relisent les libellés, le total à confirmer et le passage panier → récapitulatif ; les validations sur navigateurs et appareils réels restent externes. Pour revenir en arrière, restaurer le snapshot validé de `boutique.js`, `boutique.css`, `mobile.css` et des templates checkout, puis rejouer `npm run check`. Le rollback ne modifie ni catalogue, ni compte, ni commande.
