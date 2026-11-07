# CRO-046 — Vues produit conditionnelles

Les cartes fleurs savent afficher plusieurs mini-vues uniquement lorsqu'un
registre WOOD fournit des sources distinctes dans `entry.cardViews`. Le module
`wood-card-views.js` déduplique les chemins, exige au moins deux vues, ajoute des
boutons clavier/tactile nommés et conserve l'alt text de chaque vue.

Le registre actuel ne fournit pas encore de macro ou de contexte autorisé :
aucun contrôle n'est donc rendu et aucune image de démonstration n'est répétée
artificiellement. La fonctionnalité est prête pour les futures photos approuvées
et reste invisible tant que les fichiers manquent.

Preuve : `test/cro-046-card-views.test.mjs`.
