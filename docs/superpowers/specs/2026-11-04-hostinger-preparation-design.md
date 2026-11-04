# Préparation Hostinger — note de conception

## Intention

Préparer localement le site WOOD pour un hébergement Hostinger sans mettre le site en ligne, sans modifier son apparence et sans remplacer l’architecture statique + Supabase.

## Objectifs

- fournir les règles Apache nécessaires à une mise en ligne future ;
- produire un paquet qui contient uniquement les fichiers publics du site ;
- éviter d’envoyer `.git`, les tests, la documentation et les migrations Supabase dans `public_html` ;
- détecter automatiquement l’absence ou la dégradation de la configuration Hostinger ;
- documenter les réglages externes qui resteront à faire plus tard.

## Hors périmètre

- aucun déploiement, achat de domaine ou modification de compte externe ;
- aucun changement visuel ou fonctionnel du catalogue ;
- aucune activation de Viva ;
- aucune modification de la base Supabase dans cette étape.

## Approches considérées

1. **Ajouter uniquement une documentation.** Sans risque, mais les règles HTTPS/404/en-têtes resteraient faciles à oublier.
2. **Ajouter `.htaccess`, un paquet de production et des audits locaux.** Recommandé : cela prépare concrètement Hostinger sans toucher au site visible ni aux comptes externes.
3. **Migrer vers PHP, WordPress ou Python.** Rejeté : cela augmenterait la surface de maintenance et contredirait l’architecture actuelle.

## Décision

L’approche 2 est retenue. `.htaccess` reste compatible avec un hébergement Apache Hostinger ; `scripts/prepare-hostinger.mjs` copie les pages, styles, scripts, assets et la page 404 dans `dist-hostinger`. Les réglages Supabase, e-mails et Viva restent documentés comme opérations externes séparées.

## Contraintes de non-régression

- les pages HTML, CSS, JavaScript et assets existants restent inchangés ;
- la CSP reste en mode `Report-Only` afin de ne pas bloquer le parcours actuel ;
- la configuration Supabase publique reste limitée à la clé publishable ;
- le paquet local ne doit jamais contenir les migrations ou secrets serveur.
