# Référence responsive WOOD — 5 novembre 2026

Ce contrôle constitue la preuve de référence pour les tâches de capture, de grille et de non-débordement. Il ne remplace pas la validation visuelle de la propriétaire.

## Parcours contrôlés

- `index.html`
- `fleurs.html`
- `resines.html`
- `bien-etre.html`
- `wood-shop.html`
- `produit.html`
- `checkout.html`
- `compte.html`
- `confirmation.html`

## Largeurs contrôlées

Le navigateur Playwright a parcouru les dix parcours à `320`, `390`, `768` et `1440` CSS px avec une hauteur de `900` px, soit 40 combinaisons pour la passe la plus récente. Une passe complémentaire a contrôlé les mêmes routes en paysage (`844 × 390`), tablette (`900 × 768`) et desktop (`1366 × 768`), soit 30 combinaisons supplémentaires.

Résultat : chaque page a conservé `scrollWidth === clientWidth`; aucun débordement inattendu n’a été détecté. Les débordements intentionnels du ticker et du panneau panier transformé ont été exclus du contrôle des éléments visibles, tandis que la largeur globale du document et du body devait toujours rester exactement égale à la fenêtre.

Des captures de référence ont également été produites à `320` et `1440` px dans la session Playwright `wood-roadmap`, sous `.playwright-cli/roadmap-*.png`. Ces artefacts restent locaux et ne contiennent aucune donnée client.

## Contrôles complémentaires

- Les tests automatisés du dépôt passent (`240 tests`).
- La feuille de route contient `1 016` items d’exécution : `757` sont vérifiés localement ou sur le projet Supabase connecté et `259` restent ouverts pour validation propriétaire, accès externes ou données réelles ; les `700` tags `Axxx` sont continus. La transition de page locale, la garde livraison-only distante et la grille tarifaire HTML sont désormais incluses dans les vérifications ; les appareils et navigateurs réels restent distincts.
- Les captures TealerLab desktop/mobile et le storyboard WOOD correspondant sont archivés dans `docs/audits/2026-11-05-tealerlab-capture-log.md` et `docs/design/wood-home-storyboard.md` ; ils servent de référence structurelle et ne sont pas des assets publics.
- Le brief photo `docs/design/wood-photo-brief.md` fixe les prises de vue réelles sans bocal ni cloche, les ratios carte/fiche, le nommage, les alt texts et la procédure de remplacement sans toucher à l’achat.
- Le runbook `docs/ops/incident-runbook.md` couvre commande introuvable, e-mail échoué, stock incohérent et panne Supabase sans recréer ni confirmer une commande depuis le navigateur.
- La syntaxe JavaScript et l’audit statique passent.
- Le paquet Hostinger est généré et contrôlé avant transfert.
- La version publique répond sur les routes principales ; la route historique `admin.html` répond `404`.
- Les fiches fleur et génériques proposent une zone `Même univers` limitée aux références publiées de la catégorie, sans promotion, avis ou preuve sociale inventée ; la fiche générique et la fiche fleur conservent leur bloc d’achat.
- La fiche générique ne laisse plus sa colonne de texte imposer une largeur minimale sur les téléphones étroits : la grille mobile utilise `minmax(0, 1fr)` et les éléments de contenu ont `min-width: 0`.
- Les pages publiques qui chargent `boutique.css` utilisent maintenant `wood-responsive-v7-20261105`, afin qu’un cache navigateur ou GitHub Pages ne conserve pas l’ancien CSS après correction.
- Une vérification Playwright réelle en `390 × 844` a recontrôlé les dix routes publiques : largeur du document égale à la fenêtre, navigation mobile présente et titres principaux chargés. Sur `fleurs.html`, les largeurs `390` affichent deux colonnes équilibrées et `320` bascule proprement à une colonne, sans débordement et avec les boutons contenus dans les cartes.
- Après le déploiement du commit de code `34eac62`, un contrôle live a confirmé le CSS mobile à deux colonnes, le bandeau de livraison de `fleurs.html`, les réponses HTTP attendues et l’absence de `/admin.html`.
- Le même contrôle navigateur a vérifié `fleurs.html` à `1440`, `1024` et `768` px : trois colonnes régulières, 13 cartes présentes et aucune largeur de document supérieure à la fenêtre.
- Les artefacts de capture locaux restent disponibles dans `output/`, mais sont explicitement ignorés par Git et ne font pas partie du paquet public.
- Le test `test/homepage-shell.test.mjs` vérifie l’ordre du shell d’accueil, les quatre univers, les deux CTA, la FAQ, les deux boutiques, le footer et l’absence de route admin publique.
- Une simulation réseau a retardé chaque image de `fleurs.html` de `1,2 s` à `390 px` : dès `DOMContentLoaded`, le titre, les 13 cartes, les 14 actions et la largeur de 390 px étaient déjà conservés, puis identiques après chargement des images.
- Une passe de robustesse a injecté un nom de produit très long, un prix à six chiffres et une question/réponse FAQ très longue à `320`, `390` et `768` px sur l’accueil, les quatre catalogues et la fiche fleur : le document et le body sont restés exactement à la largeur de la fenêtre et aucun titre ne débordait.
- Une passe accessibilité navigateur à `390 × 844` a parcouru l’accueil, les fleurs, le checkout et le compte : aucun contrôle visible sans nom accessible n’a été trouvé après prise en compte des labels associés, et 18 tabulations par route sont restées sur des éléments visibles. Les tailles des liens de texte et la validation lecteur d’écran restent à vérifier sur appareils réels.
- Une baseline de performance locale a relevé `DOMContentLoaded = 26 ms`, `FCP = 56 ms`, `CLS = 0` et `891 ms` pour la navigation accueil → fleurs dans le navigateur de contrôle. Ces valeurs sont indicatives et ne valent pas mesure de production.
- La revue finale locale ne conserve aucun effet graphique qui masque une action commerciale : les CTA restent atteignables après révélation/zoom, le feedback tactile est borné et le mode mouvement réduit garde les actions disponibles ; la validation sur appareils et réseau réels reste distincte.
- Une vérification de la boutique a relu les `data-tiers` après enhancement JavaScript : les 13 fleurs ont chacune cinq paliers et aucun écart avec la matrice WOOD issue de la carte (`1/3/5/10/25 g`). La même matrice est désormais protégée par un test permanent.
- Une passe de contraste a inspecté les textes visibles de l’accueil, des catalogues, du checkout et du compte à `390 px` ; le seul échec trouvé était le kicker de l’histoire à `3,85:1` sur le panneau clair. Sa couleur WOOD a été assombrie à `#3c6c36`, soit `4,97:1`, sans modifier la palette générale.
- Le contrôle `test/public-visual-guardrails.test.mjs` verrouille aussi l’absence de widgets/pop-ups concurrents, de retrait en boutique, de QR code et de promotion publique tant que ces éléments ne sont pas validés.
- La navigation mobile structurée a été rejouée dans le navigateur à `390 × 844` : le bouton `Les univers` ouvre un sous-menu de quatre liens, `Retour au menu` revient au niveau racine et le focus est restauré. À `1440 × 900`, les déclencheurs de sous-menu restent masqués et les quatre liens desktop historiques restent visibles ; le document et le body restent à `1440` px.
- Une matrice complémentaire a rejoué `fleurs.html` à `320`, `360`, `375`, `390`, `414`, `430`, `768`, `834`, `1024`, `1280`, `1440` et `1920` px : les 13 cartes sont présentes, la grille passe d’une colonne à deux puis trois, et le document/body restent exactement à la largeur de la fenêtre. Les orientations `844 × 390`, `900 × 768` et `1366 × 768` ont aussi été contrôlées sur l’accueil sans débordement. Cette preuve reste Chromium local et ne remplace pas une recette Safari/Firefox sur appareils réels.
- Une vérification à écran très court `390 × 320` a fait défiler le CTA du hero puis le dernier bouton de `fleurs.html` : les deux restent atteignables, le dernier bouton reste au-dessus de la navigation basse et aucune largeur globale ne déborde.
- Une boucle Playwright de 25 ouvertures/fermetures du menu et du panier à `390 × 844` laisse un seul panneau, un seul backdrop, aucun menu ouvert et un `scrollWidth` égal au viewport ; aucune fuite DOM visible n’est observée.
- Le footer a été rejoué à `390 × 844` puis `1440 × 900` : ses deux groupes actuels sont repliés sur mobile, ouverts sur desktop, les deux numéros restent associés aux boutiques et le document reste à la largeur de la fenêtre.
- Le garde-fou de mouvement vérifie que les animations restent composées (`transform`/`opacity`), que le scroll n’est jamais intercepté et que `prefers-reduced-motion` conserve toutes les actions. Le chargement progressif garde des liens HTML directs si JavaScript ou un média échoue.
- Le shell public détecte aussi `Save-Data` et les connexions `2g`/`slow-2g` : les révélations et mouvements non essentiels sont neutralisés, tandis que les contrôles d’achat, le panier et la navigation restent disponibles. La mesure sur appareil et réseau réels reste distincte.
- Le hero conserve désormais un repère `Explorer` sous forme de lien HTML vers les univers : il ne devient jamais fixe, ne bloque pas le défilement et reste utilisable avec le mouvement réduit.
- Les transitions de page internes WOOD sont courtes, limitées aux navigations de document, ignorent ancres/téléchargements/panier et se désactivent avec `prefers-reduced-motion` ou un réseau lent ; le retour navigateur reste natif.
- Le projet Supabase de référence a été contrôlé avant application des gardes livraison-only : `0` commande, `0` mode non-livraison et `0` code de retrait ; les migrations distantes `20261105121321` et `20261105121329` sont maintenant présentes. Les contraintes imposent la livraison et l’exécution de la fonction est réservée à `service_role`.
- La revue Supabase a ensuite révélé une alerte critique distincte : RLS est désactivé sur `private.order_rate_limit_buckets`. Le dépôt contient maintenant `20261105232000_rate_limit_rls.sql` pour activer RLS et maintenir l’accès `service_role` uniquement ; son application distante est laissée en attente de validation, ainsi que la protection Auth contre les mots de passe compromis.
- Playwright a vérifié ce repère à `390 × 844` et `1440 × 900` : `href="#univers"`, boîte contenue dans le viewport et document respectivement large de `390` et `1440` px.
- Une passe console Chromium a parcouru les 10 routes publiques et n’a relevé ni `console.error` ni `pageerror`. Cette preuve concerne le navigateur local contrôlé ; les variantes Safari, Firefox, appareils réels et erreurs réseau restent distinctes.
- Les contrôles locaux de continuité couvrent aussi le panier conservé en cas de réseau indisponible, la clé d’idempotence, les snapshots de prix/adresse, le grade client par défaut, l’accès propriétaire confirmé par rôle et les refus RLS. La concurrence réelle de stock, la restauration et l’acceptation sur Supabase distant nécessitent encore un environnement de recette.
- Le garde-fou local de concurrence stock vérifie maintenant `FOR UPDATE`, le décrément conditionnel et le rollback transactionnel ; seule la double soumission sur un projet Supabase de recette reste à exécuter.
- Le contrôle du récapitulatif de commande vérifie maintenant les identifiants produit/grammage/quantité/total, l’adresse de livraison, le statut « paiement en attente » et l’absence de retrait ou de paiement Viva actif.
- Le checkout utilise maintenant des champs d’adresse structurés et accessibles, puis envoie aussi un snapshot texte canonique ; les validations serveur refusent les champs incomplets, les codes pays invalides et les caractères de contrôle sans décider des zones, frais ou délais.
- La stabilité média et tactile est couverte localement : dimensions réservées, chargement différé du catalogue, fallback WOOD, zones tactiles minimales, focus visible et absence de superposition dans la matrice contrôlée.
- Les fiches fleur et génériques gardent maintenant une découverte limitée aux références publiées du même univers, sans remise ni ajout forcé ; l’exclusion du produit courant est testée.
- La fiche fleur expose aussi les cinq paliers de prix en tableau HTML repliable (`1/3/5/10/25 g`) en complément du sélecteur d’achat ; aucune donnée tarifaire n’est affichée uniquement dans une image.
- Une session Supabase expirée revient à l’écran de connexion avec un message explicite, sans effacer les informations déjà saisies ; la déconnexion volontaire conserve son message distinct et le comportement de session persistante.
- Le registre de direction `docs/design/wood-direction-register.md` fige les contraintes WOOD, les tokens actuels, la matrice TealerLab à adapter/exclure et la règle de non-copie ; il laisse volontairement les stickers, photos et accents finaux en attente de validation propriétaire.
- Le socle e-mail local couvre les messages `pending`, les reçus uniquement après `paid`, les PDF privés/idempotents, l’absence de pièce jointe si le document manque, les alertes propriétaire, les transitions de livraison et l’opt-in/désinscription newsletter. Aucun envoi réel n’est affirmé tant que Gmail OAuth et le domaine d’envoi ne sont pas configurés.
- `test/operational-readiness.test.mjs` verrouille les huit événements transactionnels, les préconditions de paiement/annulation/remboursement, l’outbox et ses reprises, les documents privés, l’absence de SMS/retrait/QR/promotion, la séparation des environnements, l’hygiène des secrets et la présence du runbook incident.
- `test/design-foundation.test.mjs` verrouille la grille artistique, les niveaux de densité, la hiérarchie WOOD, les ratios photo, les fallbacks décoratifs et le tempo des animations ; les assets réels et les validations de la propriétaire restent séparés.
- `test/catalog-contract.test.mjs` verrouille l’annonce de livraison sans promesse non validée, les données manquantes non achetables et la séparation carte/fiche/achat.

## Limite de cette preuve

Les captures prouvent la géométrie et l’absence de débordement dans un navigateur contrôlé. Elles ne valent pas validation finale des photos, des stocks, des règles de livraison, des textes légaux ou de la direction graffiti de la propriétaire.
