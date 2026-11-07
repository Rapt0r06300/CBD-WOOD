# Contrat WOOD — médias Supabase

Statut : contrat local vérifiable ; aucun upload ou bucket de production n’est activé.

## Périmètre et statuts

Le contrat distingue quatre états qui ne doivent jamais être confondus : illustration `demo`, média préparé ou brouillon, média `approved` validé par la propriétaire, et photo réelle du produit. Un chemin de fichier, une image WebP ou une ligne de catalogue ne suffit pas à déclarer une photo réelle, son origine, ses droits ou son approbation.

Le registre `docs/design/wood-asset-register.md` est la source de vérité locale des treize visuels de fleurs actuels. Ils sont tous marqués `demo`, avec un nom exact, un fichier, un usage et un alt text. Une scène sous cloche peut être conservée comme `demo-cloche` si elle possède une vue `demo-clean-view` associée ; les futurs vrais visuels `approved` doivent être photographiés sans bocal ni cloche, décrits, autorisés et validés avant publication.

## Source de vérité et fallback

Le produit conserve son `image_path` comme référence de catalogue, tandis que `owner-media.mjs` détermine le statut lisible et le preview. Un chemin relatif sûr peut afficher une photo renseignée ; un chemin vide ou invalide revient à une illustration WOOD de catégorie ou à un visuel de démonstration déterministe. Le fallback reste marqué comme illustration de démonstration et n’active ni prix, ni stock, ni achat.

Les chemins distants, schémas arbitraires, fragments HTML et données fournies par un navigateur sont rejetés. La résolution d’un média absent ne doit pas interrompre le rendu de la carte, de la fiche, de l’accueil ou du dashboard owner.

## Fiche minimale avant remplacement

Tout remplacement futur est préparé dans une fiche réversible avant d’entrer
dans le catalogue :

| Champ | Règle |
| --- | --- |
| `media_id` / entrée | nom exact du produit ou de la scène concernée |
| `source` | fichier maître ou origine explicitement fournie par WOOD |
| `source_date` | date de réception ou de prise de vue connue |
| `authorization` | autorisation WOOD ou statut `pending` |
| `status` | `demo`, `prepared`, `approved` ou `real-photo` |
| `alt` / usage | texte alternatif et emplacements publics prévus |
| `replacement_commit` | point de retour permettant le rollback fichier par fichier |

Une fiche sans source, date ou autorisation reste `pending` et ne peut pas
passer le média en `approved`. Le même `media_id` doit alimenter l’accueil,
les cartes, la fiche produit et le dashboard sans changer le prix, le stock ou
la disponibilité.

## Alt text, responsive et accessibilité

Chaque média rendu possède un texte alternatif cohérent avec son état : photo de produit pour un média approuvé ou renseigné, illustration de démonstration pour un fallback. Le statut `Photo à fournir`, `Photo renseignée` ou équivalent reste lisible sans dépendre de la couleur.

Les cartes, fiches et tableaux réservent leur place, gardent le ratio WOOD et se reconfigurent sur mobile, tablette et ordinateur. Une image absente, lente, trop grande ou refusée ne crée pas de débordement, ne masque pas le nom et ne retire pas le lien HTML direct.

## Upload et Storage

Il n’existe pas d’upload fichier public ou owner dans cette passe. Supabase Storage réel, bucket privé, politiques d’upload, transformations, antivirus, quotas, métadonnées et suppression restent des étapes externes à préparer puis valider. Aucun `storage_path`, URL signée ou secret Storage ne doit être exposé dans le dashboard ou le HTML public.

Quand un futur upload sera autorisé, il devra être owner-only, limité par type, taille et dimensions, écrit dans un bucket privé, soumis à une validation humaine et relié à un statut explicite. Le chemin n’aura pas le droit de modifier prix, stock, statut de publication ou disponibilité.

## États, erreurs et remplacement

- Fichier absent : fallback WOOD marqué démo et libellé `Photo à fournir`.
- Chemin invalide : rejet du chemin et fallback neutre, sans chargement distant.
- Média approuvé indisponible : conserver le contenu textuel et afficher l’état à corriger.
- Erreur de chargement : réserver les dimensions, ne pas bloquer l’achat ou la navigation et ne pas inventer de photo.
- Remplacement : mettre à jour le registre, l’alt, le statut, l’origine et la preuve dans un commit réversible par fichier ou par lot.

## Preuve, validation humaine et rollback

La preuve locale est constituée par `test/asset-register.test.mjs`, `test/asset-quality.test.mjs`, `test/owner-media-status.test.mjs`, `test/wood-supabase-media-contract.test.mjs`, les audits de routes et la validation responsive. Elle prouve les formats, fallbacks, chemins sûrs et libellés ; elle ne remplace pas une revue de cadrage, de droits ou de photo réelle.

La propriétaire valide le passage de `demo` à `approved`; son conjoint peut relire la qualité de présentation. Supabase Storage réel et les appareils réels restent à tester séparément. Le rollback fichier par fichier restaure le registre et le média approuvé précédent, puis rejoue la suite locale sans toucher aux produits, prix, stocks ou commandes.
