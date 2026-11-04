# Préparation Hostinger

Cette procédure prépare un dossier local. Elle n’envoie rien sur Hostinger.

## Préparer le paquet

Depuis la racine du dépôt, une seule commande prépare et contrôle le paquet :

```bash
npm run hostinger:preflight
```

La commande lance les tests, l’audit statique, puis crée et contrôle `dist-hostinger/` avec uniquement les fichiers publics nécessaires : pages HTML, CSS, JavaScript, `assets/`, `.htaccess` et `404.html`.

## Mise en ligne future

Quand la propriétaire aura validé l’hébergement :

1. choisir le site **Custom PHP/HTML** dans Hostinger ;
2. connecter le domaine définitif ;
3. utiliser les serveurs de noms fournis par le hPanel, ou les enregistrements A fournis par Hostinger si la gestion DNS reste chez le registrar ;
4. vérifier que le domaine est actif, que tu as accès à sa zone DNS et que DNSSEC est désactivé ou correctement compatible ;
5. vérifier qu’aucun ancien enregistrement A ou AAAA ne pointe vers un autre serveur ;
6. tester le paquet sur le domaine temporaire Hostinger avant de modifier le domaine définitif ;
7. attendre la propagation DNS, qui peut prendre jusqu’à 24–48 heures ;
8. vérifier que le SSL est actif puis forcer HTTPS ;
9. envoyer le **contenu** de `dist-hostinger/` dans `public_html/` — pas le dossier parent ;
10. ouvrir la page d’accueil, une page de catégorie, le compte et la page 404 ;
11. tester sur mobile et ordinateur avant toute ouverture commerciale.

Si une adresse e-mail liée au domaine est utilisée, vérifier les enregistrements MX, SPF, DKIM et DMARC après le changement de DNS. Le site actuel utilise Supabase pour les données : aucune base MySQL Hostinger ne doit être créée ou importée.

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
npm run hostinger:preflight
```

Le dossier généré est ignoré par Git et peut être supprimé ou recréé sans modifier les sources.

La liste publiée est volontairement explicite dans `scripts/prepare-hostinger.mjs`. Si une nouvelle photo, page ou ressource doit être ajoutée plus tard, elle doit être ajoutée à cette liste puis vérifiée avant tout envoi.
