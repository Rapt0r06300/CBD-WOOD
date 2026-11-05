# WOOD — site vitrine et boutique

Le projet reste un site statique HTML/CSS/JavaScript, avec Supabase pour l’authentification client, le compte propriétaire, le catalogue et l’enregistrement serveur des commandes. L’apparence existante — couleurs, typographies, cartes, responsive et animations — n’est pas remplacée par un framework.

## Vérifications locales

Pré-requis : Node.js 20 ou plus récent. Aucune dépendance npm n’est nécessaire.

```bash
npm run check
```

Cette commande exécute les tests de prix/livraison/sécurité, vérifie la syntaxe JavaScript et contrôle les références locales, les fichiers Cloudflare, les secrets publics et les protections de commande.

## Déploiement Cloudflare Pages

Paramètres recommandés dans Cloudflare Pages :

- dépôt GitHub : `Rapt0r06300/CBD-WOOD` ;
- branche de production : `main` ;
- framework preset : aucun ;
- commande de build : vide ;
- dossier de sortie : `.` (racine du dépôt) ;
- fonction de déploiement : automatique à chaque mise à jour de `main`.

Les fichiers `_headers`, `_redirects` et `404.html` sont déjà à la racine, comme l’attend Pages. Le fichier `.nojekyll` conserve aussi le bon comportement si GitHub Pages reste utilisé pour la démonstration.

La branche `main` reste la seule branche de travail conformément au choix du projet. Les déploiements de prévisualisation Cloudflare peuvent être utilisés pour contrôler une mise à jour avant de confirmer la version de production ; s’ils contiennent des données sensibles, ils doivent être protégés par Cloudflare Access. Un rollback Pages permet de revenir à la dernière version saine.

Le dépôt peut être privé après vérification de la connexion Cloudflare au dépôt. En revanche, GitHub Pages gratuit ne publie pas un dépôt privé : il faut donc confirmer que la version Cloudflare fonctionne avant de rendre le dépôt privé.

## Préparation locale pour Hostinger

Le site n’a pas besoin d’être converti en Python, PHP ou WordPress pour Hostinger. Pour préparer un paquet sans rien publier :

```bash
npm run hostinger:preflight
```

La commande vérifie le projet puis crée et contrôle `dist-hostinger/`. Seul son contenu devra être envoyé plus tard dans `public_html/`. Le paquet contient `.htaccess`, les pages publiques, les styles, les scripts, les assets et `404.html`, mais exclut les tests, la documentation, les migrations Supabase et les fichiers de dépôt. Voir `docs/ops/hostinger-deploy.md`.

Le fichier `.htaccess` est spécifique à un hébergement Apache comme Hostinger. Les fichiers `_headers`, `_redirects` et `netlify.toml` restent utiles pour d’autres plateformes mais ne remplacent pas `.htaccess` sur Hostinger.

## Sécurité des secrets

`supabase-config.js` ne contient qu’une URL et une clé publishable destinée au navigateur. Elle ne donne pas de droits administrateur par elle-même : les règles RLS Supabase et les contrôles serveur font foi.

Ne jamais ajouter dans un fichier public :

- `SUPABASE_SERVICE_ROLE_KEY` ;
- identifiants ou secret Viva ;
- secret Turnstile ;
- clé SMTP ou jeton d’e-mail.

Un chiffrement JavaScript dans le navigateur ne protégerait pas ces secrets : le navigateur devrait recevoir la clé pour les déchiffrer. La bonne architecture est donc de conserver les secrets dans les secrets des Edge Functions Supabase et de ne renvoyer au site que le résultat nécessaire.

## Commandes et stock

La fonction `create-pending-order` :

- refuse les origines non autorisées ;
- vérifie la structure de la commande et la livraison à domicile ;
- accepte une clé d’idempotence pour neutraliser les doubles clics ;
- peut exiger Cloudflare Turnstile quand `TURNSTILE_SECRET_KEY` et `REQUIRE_TURNSTILE=true` sont configurés ;
- recalcule les prix côté serveur ;
- réserve le stock dans la même transaction que la commande ;
- ne révèle pas les détails SQL au navigateur.

La migration `20261104120000_order_security_and_stock.sql` a été appliquée au projet Supabase connecté, puis la fonction Edge a été redéployée. La migration `20261104121000_order_security_advisor_cleanup.sql` ajoute la politique RLS explicite et les index associés.

## Réglages Supabase à finaliser avant ouverture

Ces réglages appartiennent au tableau de bord Supabase et ne doivent pas être mis dans Git :

1. remplacer l’URL d’authentification par le domaine de production dès que le `.fr` est acheté et relié ;
2. conserver uniquement les URL de redirection de production, de démonstration et de développement nécessaires ;
3. définir `ALLOWED_ORIGINS` avec les domaines exacts utilisés ;
4. créer le site Turnstile et enregistrer `TURNSTILE_SECRET_KEY` côté Edge Function ;
5. activer la protection contre les mots de passe compromis dans Auth ;
6. renseigner les stocks réels et vérifier chaque tarif avant publication ;
7. connecter Viva Wallet uniquement après réception des identifiants professionnels et validation d’un paiement de test.

Les migrations de fondation e-mail et de nettoyage sécurité ont été appliquées au projet Supabase connecté. Les fonctions Edge sont déployées comme socle, mais aucun envoi réel n’est actif tant que les secrets Gmail, les jetons internes, l’URL de désinscription, les informations légales et le planificateur ne sont pas renseignés et testés.

Le déclenchement récurrent est préparé dans `.github/workflows/supabase-workers.yml` et documenté dans `docs/ops/supabase-workers-scheduler.md`. Il reste inactif tant que les secrets GitHub correspondants ne sont pas configurés ; aucune valeur sensible n’est stockée dans le dépôt.

Le paiement Viva reste volontairement non activé tant que les identifiants professionnels et la validation du prestataire ne sont pas disponibles.

## Espace propriétaire

Le tableau de bord propriétaire est intégré à `compte.html` et reste masqué tant que l’utilisateur connecté n’est pas confirmé dans `owner_users`. L’ancienne route `admin.html` n’existe plus dans le dépôt ni dans le paquet public ; les protections RLS restent obligatoires.

## Limites connues et contrôle avant mise en ligne

- Le domaine `.fr` et les réglages Cloudflare restent des actions de compte externe.
- L’accord de l’hébergeur pour les produits exacts doit être conservé avant l’ouverture commerciale.
- Les informations légales et les photos définitives doivent encore être validées par la propriétaire.
- Le code des e-mails automatiques, des documents privés, de la livraison et de la newsletter est préparé et déployé comme socle, mais reste inactif sans configuration externe validée ; aucune fausse confirmation de paiement n’est envoyée aujourd’hui.

Avant ouverture : exécuter `npm run check`, tester les pages sur mobile et ordinateur, créer une commande de test sans paiement réel, vérifier la décrémentation du stock et confirmer les e-mails avec le fournisseur retenu.
