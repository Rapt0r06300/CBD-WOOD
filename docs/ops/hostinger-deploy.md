# Préparation Hostinger

Cette procédure prépare un dossier local. Elle n’envoie rien sur Hostinger.

## Préparer le paquet

Depuis la racine du dépôt :

```bash
npm run prepare:hostinger
```

Le script crée `dist-hostinger/` avec uniquement les fichiers publics nécessaires : pages HTML, CSS, JavaScript, `assets/`, `.htaccess` et `404.html`.

## Mise en ligne future

Quand la propriétaire aura validé l’hébergement :

1. choisir le site **Custom PHP/HTML** dans Hostinger ;
2. connecter le domaine définitif ;
3. attendre la propagation DNS ;
4. vérifier que le SSL est actif ;
5. envoyer le **contenu** de `dist-hostinger/` dans `public_html/` — pas le dossier parent ;
6. ouvrir la page d’accueil, une page de catégorie, le compte et la page 404 ;
7. tester sur mobile et ordinateur avant toute ouverture commerciale.

Ne pas envoyer dans `public_html/` : `.git/`, `docs/`, `test/`, `supabase/`, `scripts/`, `package.json`, `netlify.toml` ou des secrets.

## Réglages externes à faire séparément

Après attribution du domaine, dans Supabase :

- définir la Site URL de production ;
- ajouter uniquement les Redirect URLs nécessaires ;
- régler `ALLOWED_ORIGINS` avec le domaine exact ;
- vérifier que le rôle propriétaire et les règles RLS sont toujours corrects ;
- configurer un SMTP de production pour les e-mails transactionnels.

Pour Viva, ne rien activer avant d’avoir les identifiants professionnels, le webhook signé, l’idempotence et les tests de succès, annulation, expiration et remboursement.

## Contrôle local

```bash
npm run check
npm run prepare:hostinger
```

Le dossier généré est ignoré par Git et peut être supprimé ou recréé sans modifier les sources.

La liste publiée est volontairement explicite dans `scripts/prepare-hostinger.mjs`. Si une nouvelle photo, page ou ressource doit être ajoutée plus tard, elle doit être ajoutée à cette liste puis vérifiée avant tout envoi.
