# Contrat WOOD — paquet GitHub Pages / Hostinger

Statut : paquet public préparé localement ; aucun transfert Hostinger, DNS, SSL ou ouverture commerciale n’est exécuté par ce contrat.

## Périmètre du paquet public

Le paquet est construit par une allow-list explicite dans `scripts/prepare-hostinger.mjs`. Il contient seulement les pages, styles, scripts et assets nécessaires à la présentation publique, le compte client, l’espace owner intégré et la page 404. `dist-hostinger/` est la sortie générée ; son contenu, et non son dossier parent, est le seul contenu destiné à `public_html`.

La liste est contrôlée avant copie, après staging et lors du préflight. Un fichier nouveau n’est jamais publié par défaut. Le paquet public n’emporte ni migrations Supabase, ni Edge Functions, ni tests, ni documentation, ni scripts d’exploitation, ni `package.json`, ni route `admin.*`, ni secret.

GitHub Pages utilise le même paquet contrôlé via `.github/workflows/pages.yml`. La publication est une démonstration statique et ne modifie ni Supabase, ni Viva, ni les comptes, ni le domaine.

## Préflight, chemins et secrets

Le préflight exige `index.html`, `404.html`, `.htaccess` et le favicon. Il refuse les dossiers internes (`supabase`, `test`, `docs`, `scripts`, `.git`), les fichiers de configuration non publics, toute route admin, les liens symboliques, les secrets de service, les tokens Viva ou les références d’environnement local et d’hébergement temporaire.

Les URL HTTP non sécurisées sont rejetées hors exceptions de spécification. Les fichiers publics restent relatifs ou utilisent HTTPS. Le contrôle ne remplace pas la vérification finale du domaine, du certificat, du DNS, des redirections Supabase et des origines autorisées.

## Cache, en-têtes et chemins

HTML, page compte, checkout et documents de présentation sont non cacheables afin qu’une nouvelle version soit visible sans servir un ancien état privé. CSS, JavaScript, modules et images utilisent des query strings de version et un cache public borné avec revalidation.

Hostinger/Apache et GitHub Pages partagent les en-têtes de sécurité attendus : `nosniff`, referrer policy, permissions policy, frame denial, Content Security Policy en observation, HTTPS et page 404. Les caches ne doivent jamais rendre une session, une commande ou un document privé public.

## Snapshots demo/legacy et rollback

`scripts/create-site-snapshots.mjs` conserve une copie `demo` du paquet courant et une version `legacy` issue de la base suivie. `scripts/site-version.mjs` n’accepte que `demo` ou `legacy`, borne les chemins à la racine du dépôt, vérifie les manifestes et indique explicitement qu’aucun déploiement distant n’a été effectué.

Une bascule locale peut donc restaurer la version legacy sans effacer Supabase, comptes, produits, prix, stocks, commandes, secrets ou migrations. Avant tout transfert réel, la propriétaire valide la capture, le domaine, les parcours, la recette mobile/ordinateur et le retour arrière.

## Preuve, limites et passation

La preuve locale combine `test/public-package-boundary.test.mjs`, `test/security-headers.test.mjs`, `test/wood-hosting-package-contract.test.mjs`, `npm run check`, `npm run prepare:hostinger` et le préflight du dossier généré. Elle vérifie la liste publique, les routes, les secrets, les en-têtes, les caches et la réversibilité.

Les réglages Hostinger, DNS, SSL, domaine, GitHub Pages, Supabase production, Gmail, Viva et restauration distante sont externes. Le paquet reste « prêt à transférer » tant que la propriétaire n’a pas validé le contenu et la procédure ; aucune mise en ligne n’est déclarée par ce contrat.
