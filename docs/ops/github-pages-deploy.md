# Publication GitHub Pages

La publication GitHub Pages utilise le workflow `.github/workflows/pages.yml`.
Il prépare le même paquet public vérifié que la procédure Hostinger, puis le
déploie avec l’action officielle GitHub Pages. Les migrations Supabase, les
fonctions Edge, les scripts d’exploitation et les fichiers d’administration ne
sont donc pas publiés dans le site public.

## Réglage à conserver dans GitHub

Dans **Settings → Pages → Build and deployment**, la source doit être
**GitHub Actions**. Le workflow actuel est déclenché manuellement (`workflow_dispatch`) afin de ne pas publier une branche de travail par accident. Le paquet est contrôlé par `npm run verify:pages-package` avant l'upload.

Après la fin du workflow, exécuter `npm run verify:pages-live` avec l'URL du
projet pour vérifier que la racine et `/demo/` ne renvoient pas le même HTML.
Le contrôle échoue si la racine contient le runtime démo, si `/demo/` n'est
pas marqué démo, ou si les deux réponses sont identiques.

## Contrôle local

```text
npm run hostinger:preflight
```

Le workflow ne démarre pas une vente, ne modifie pas Supabase et ne nécessite
aucun secret de paiement. Le domaine, le DNS, les redirections Supabase, les
identifiants Viva et les secrets d’e-mail restent des réglages externes à
effectuer uniquement au moment de la mise en production.
