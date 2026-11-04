# Checklist de mise en production

## Dépôt et Cloudflare Pages

- [ ] `main` est la branche de production.
- [ ] Le projet Pages est connecté au bon dépôt et publie la racine `.` sans commande de build.
- [ ] Une URL de prévisualisation est testée sur mobile et ordinateur.
- [ ] Les previews sensibles sont protégées avant d’y mettre des données réelles.
- [ ] Le domaine `.fr` est acheté, relié et une seule variante (`www` ou sans `www`) est canonique.
- [ ] Un rollback Pages est connu et testé sur une version de démonstration.
- [ ] L’accord écrit de l’hébergeur pour les produits exacts est conservé.

## Préparation Hostinger

- [ ] `npm run check` passe avant la préparation.
- [ ] `npm run prepare:hostinger` crée `dist-hostinger`.
- [ ] Le contenu de `dist-hostinger` est vérifié avant tout envoi.
- [ ] Seul le contenu de `dist-hostinger` sera placé dans `public_html`.
- [ ] `.htaccess` est présent et le SSL Hostinger est actif avant de tester les formulaires.
- [ ] Les enregistrements A/AAAA précédents ne créent pas de conflit avec Hostinger.
- [ ] Le domaine canonique et la variante éventuelle `www` sont décidés avant de modifier Supabase.
- [ ] Aucun dossier `.git`, `docs`, `test`, `scripts` ou `supabase` n’est envoyé dans `public_html`.
- [ ] Rien n’est déployé depuis ce dépôt sans validation explicite de la propriétaire.

## Supabase

- [ ] Site URL et Redirect URLs contiennent le domaine réel, sans remplacer les URL locales par erreur.
- [ ] `ALLOWED_ORIGINS` contient uniquement les origines réellement utilisées.
- [ ] Turnstile est configuré côté serveur avant ouverture publique.
- [ ] La protection contre les mots de passe compromis est activée.
- [ ] L’utilisateur propriétaire est le seul présent dans `owner_users`.
- [ ] La migration `customer_account_roles` crée automatiquement le rôle `customer` pour chaque nouveau compte et interdit toute auto-promotion.
- [ ] Le bouton propriétaire reste masqué pour un client, y compris au clavier ; l’accès réel reste contrôlé par `owner_users` et les RLS.
- [ ] Un visiteur sans session qui ouvre directement `admin.html` est renvoyé vers `compte.html` avant affichage ; l’accès propriétaire conserve sa session.
- [ ] Les stocks et prix réels sont vérifiés dans le tableau de bord.
- [ ] `npm run check` passe après chaque changement.

## Commande

- [ ] Une commande de test en livraison est enregistrée une seule fois malgré un double clic.
- [ ] Le prix serveur correspond à la carte pour 1, 3, 5, 10 et 25 g.
- [ ] Une quantité hors stock est refusée sans décrément partiel.
- [ ] Le compte client retrouve uniquement ses propres commandes.
- [ ] Aucun paiement réel n’est activé avant la validation Viva.
- [ ] L’e-mail transactionnel est testé après persistance et, pour le paiement, après webhook signé.
