# Contrat WOOD — données Supabase

Statut : contrat local vérifiable, migrations préparées mais production non activée.

## Périmètre des tables et contrats

Le socle de vérité est composé des produits et prix, des profils clients, de la allow-list `owner_users`, des commandes et de leurs lignes. `products` porte la catégorie, le nom, le prix, le stock, le média, le statut et la disponibilité. `product_prices` porte les paliers de fleurs. `customer_profiles` porte les informations de compte non sensibles. `orders` et `order_items` conservent la commande réellement créée, ses états et son contenu au moment de l’achat.

Les tables opérationnelles complémentaires — historique, idempotence, notifications, documents, livraison et campagnes — sont additives et restent rattachées à leur commande, leur client ou leur acteur. Une valeur absente reste explicitement absente ; aucune migration ne fabrique un prix, un stock, une photo réelle, un paiement ou une livraison confirmée.

## Intégrité, snapshots et idempotence

Les contraintes SQL bornent catégories, statuts, prix positifs ou nuls, stocks non négatifs, quantités positives et références uniques. Au moment de la commande, le nom, le prix unitaire, le grammage, la quantité, l’adresse, le client et le total sont copiés dans le snapshot de commande afin que l’historique ne change pas quand le catalogue évolue.

La clé d’idempotence est validée, indexée et revendiquée avant la création. Une répétition concurrente retrouve la première commande au lieu d’en créer une seconde. Les lignes produit sont verrouillées avec `for update`, le stock est décrémenté atomiquement et toute erreur annule l’ensemble de la transaction. Les fonctions client et serveur ne mélangent pas les états de paiement, livraison et préparation.

## RLS, rôles et historique append-only

Chaque table métier publique possède la RLS. Un visiteur peut lire uniquement les produits publiés. Un client authentifié lit et modifie uniquement son profil et lit uniquement ses propres commandes et lignes. Les opérations owner exigent la présence de l’utilisateur dans `owner_users`; le rôle explicite `customer` ne peut pas se transformer en rôle owner.

Les tables d’idempotence, de stock, de documents, de notifications et d’historique ne donnent pas de lecture ou d’écriture publique implicite. L’historique de statut est append-only, rattaché à la commande et écrit par les triggers ou fonctions prévues. Les changements opérationnels sensibles passent par des fonctions validées, jamais par une mise à jour client directe non contrôlée.

## Évolution additive et compatibilité

Les migrations sont versionnées, rejouables et ordonnées. Une extension de livraison, paiement, rôle ou notification ajoute ses colonnes, tables, contraintes, index, politiques et fonctions sans supprimer brutalement l’historique. Les `drop policy if exists`, `create ... if not exists` et backfills idempotents permettent de rejouer la préparation sur une base de test.

Chaque nouvelle contrainte doit prévoir le succès, l’absence de donnée, l’erreur, une valeur trop grande, une double action, l’accès anon, l’accès client et l’accès owner. Les fonctions serveur fixent leur `search_path`, limitent leurs grants et n’acceptent aucun secret ou chemin privé fourni par le navigateur.

## Évolution additive, preuve et rollback

La preuve locale regroupe `test/rls-matrix.test.mjs`, `test/rls-negative.test.mjs`, les tests de commande et de stock, `test/wood-supabase-data-contract.test.mjs`, la syntaxe, l’audit statique, la readiness et la continuité. Les réglages Supabase production, la protection contre les mots de passe compromis et la restauration réelle restent à exécuter sur un projet de test puis à faire valider.

En cas d’échec, on conserve les données et les logs, on arrête l’activation de la migration concernée, puis on restaure la sauvegarde validée ou la version legacy dans un projet isolé. Le retour arrière se fait par une migration corrective documentée ou par restauration contrôlée ; il ne se fait pas avec une suppression destructive improvisée. Les secrets et identifiants restent hors dépôt.
