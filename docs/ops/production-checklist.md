# Checklist de mise en production

## Dépôt et Cloudflare Pages

- [ ] `main` est la branche de production.
- [ ] Le projet Pages est connecté au bon dépôt et publie la racine `.` sans commande de build.
- [ ] Une URL de prévisualisation est testée sur mobile et ordinateur.
- [ ] Les previews sensibles sont protégées avant d’y mettre des données réelles.
- [ ] Le domaine `.fr` est acheté, relié et une seule variante (`www` ou sans `www`) est canonique.
- [ ] Un rollback Pages est connu et testé sur une version de démonstration.
- [ ] L’accord écrit de l’hébergeur pour les produits exacts est conservé.

## Supabase

- [ ] Site URL et Redirect URLs contiennent le domaine réel, sans remplacer les URL locales par erreur.
- [ ] `ALLOWED_ORIGINS` contient uniquement les origines réellement utilisées.
- [ ] Turnstile est configuré côté serveur avant ouverture publique.
- [ ] La protection contre les mots de passe compromis est activée.
- [ ] L’utilisateur propriétaire est le seul présent dans `owner_users`.
- [ ] Les stocks et prix réels sont vérifiés dans le tableau de bord.
- [ ] `npm run check` passe après chaque changement.

## Commande

- [ ] Une commande de test en livraison est enregistrée une seule fois malgré un double clic.
- [ ] Le prix serveur correspond à la carte pour 1, 3, 5, 10 et 25 g.
- [ ] Une quantité hors stock est refusée sans décrément partiel.
- [ ] Le compte client retrouve uniquement ses propres commandes.
- [ ] Aucun paiement réel n’est activé avant la validation Viva.
- [ ] L’e-mail transactionnel est testé après persistance et, pour le paiement, après webhook signé.
