# Contrat WOOD — tableau de bord propriétaire

Statut : contrat local vérifiable, sans activation de fournisseur ou de production.

## Périmètre et source de vérité

Le tableau de bord est une vue de gestion intégrée à l’espace propriétaire du compte. Il donne d’abord une lecture simple des commandes reçues, puis du catalogue et des stocks, sans demander à la propriétaire de connaître Supabase. Les données affichées viennent des tables et fonctions autorisées par la session owner ; aucune donnée de démonstration ne doit être présentée comme une commande ou une vente réelle.

L’ordre de lecture est volontaire : commandes d’abord, puis produits et stocks, documents, notifications et réglages. Le résumé expose le nombre de produits, de produits publiés, de stocks à vérifier et de commandes reçues. Les règles commerciales encore non confirmées restent signalées comme telles.

## Parcours et contenu

À l’ouverture, `mountOwnerDashboard` révèle le tableau après confirmation du compte, charge les sections en parallèle et place les commandes avant le catalogue. Chaque section possède un titre, des colonnes compréhensibles et une action explicitement libellée : ajouter ou modifier un produit, corriger une adresse, changer un état autorisé, télécharger un document privé, relancer une notification ou préparer un brouillon de newsletter.

Les produits affichent catégorie, prix, stock, média, disponibilité et statut. Les fleurs gardent leurs cinq paliers WOOD. Les commandes affichent client, livraison, total, paiement, état et documents. Les notifications exposent l’état de file et l’erreur utile. La newsletter reste un brouillon ou une simulation tant que Gmail n’est pas configuré et validé.

## États de chargement, vide, erreur et fallback

Chaque tableau commence avec un état de chargement puis prévoit un état vide explicite : aucun produit, aucune commande, aucune notification ou aucun brouillon. Une erreur de section produit un message lisible et ne doit pas inventer une valeur. Un document absent reste indisponible ; une photo manquante reste signalée comme à fournir ou en démo ; un réglage non confirmé conserve son libellé de préparation.

Après une erreur d’écriture, le contrôle est réactivé, la valeur source reste protégée et la section concernée est rechargée. Une session expirée ou un appel serveur indisponible conserve le parcours sûr, sans révéler une donnée owner à un client.

## Actions modifiables et doubles actions

Les formulaires produits valident nom, catégorie, prix, stock, disponibilité et paliers avant l’écriture. Les changements de commande passent par les RPC contrôlées du contrat de rôle owner. Les boutons qui déclenchent un téléchargement, une relance ou une campagne sont désactivés pendant leur action, puis réactivés dans `finally` ou après erreur. Les actions newsletters restent bornées par des statuts explicites et le test d’envoi ne cible aucun client réel.

## Responsive, clavier, lecteur d’écran et motion

Les sections utilisent des titres associés, des tableaux avec en-têtes, des `data-label` pour le repli mobile, des contrôles `type="button"`, des labels de formulaire et des messages `role="status"` avec `aria-live`. Les dialogues et formulaires doivent rester utilisables au clavier et ne pas perdre le focus après une erreur.

Le dashboard est prévu pour ordinateur, tablette et mobile : les tableaux peuvent défiler dans leur carte, les formulaires se replient en une colonne et les actions restent atteignables dans la largeur disponible. `prefers-reduced-motion` supprime les transitions et animations non nécessaires ; la compréhension des états ne dépend jamais du mouvement ou de la couleur seule.

## Coût de chargement et source de vérité

Les sections indépendantes se chargent en parallèle. Les listes sont limitées et ne demandent que les colonnes nécessaires ; les données privées passent par la session et les fonctions prévues, jamais par un chemin Storage exposé. Une erreur de section ne doit pas bloquer le rendu des autres sections déjà disponibles.

## Preuve, revue humaine et rollback

La preuve locale est constituée par les tests de dashboard existants, `test/wood-owner-dashboard-contract.test.mjs`, la syntaxe JavaScript, l’audit statique, la readiness et la continuité. Les essais sur Safari, Firefox et appareils réels restent à exécuter. La propriétaire valide l’utilité opérationnelle ; son conjoint valide la qualité de présentation.

Le retour arrière consiste à restaurer la version legacy sauvegardée et à retirer les seuls ajouts du dashboard après export contrôlé, en conservant la preuve et l’ordre des migrations. Les réglages Gmail, Viva, Supabase production et hébergement restent externes et ne sont pas simulés par ce contrat.
