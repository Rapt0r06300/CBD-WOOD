# WOOD — Tâches en attente d’informations, d’identifiants et de validations

**Date de séparation :** 6 novembre 2026  
**Projet :** site **DÉMO** CBD WOOD, dépôt `Rapt0r06300/CBD-WOOD` (branche `main`).  
**Source :** [feuille de route principale](./2026-11-04-wood-tealerlab-roadmap.md).  
**Statut :** mises en attente, **pas réalisées**, **pas abandonnées**.

Ce document conserve les **138 cases ouvertes retirées de la feuille active** : 102 dépendantes de la propriétaire ou de données finales, 32 nécessitant des comptes/configurations externes et 4 des validations physiques sur appareils. Les **109 autres cases ouvertes** restent dans la feuille de route active pour poursuivre l'amélioration de la démo.

**Règle :** ne jamais envoyer de mots de passe, secrets OAuth, clés Viva, clés Supabase privilégiées ou jetons de messagerie dans GitHub ni dans des fichiers du site. Les configurer plus tard dans les gestionnaires de secrets prévus. Ne jamais considérer une case déplacée comme validée et ne jamais déclencher de vente ou e-mail réel sur la démo.

## Porte de clôture commerciale — hors feuille active


Ces huit groupes concernent la recette finale et non les améliorations réalisables de la démo. Ils restent volontairement séparés du code déjà vérifié ; aucun identifiant ou secret n’est demandé avant cette étape finale.

1. **Décisions de la propriétaire :** fournir stocks, photos réelles sans bocal ni cloche, descriptions validées, références graffiti/stickers, données légales et règles finales de livraison (zones, transporteur, frais, délais, minimum, suivi, emballage et retours).
2. **Catalogue réel :** saisir les produits, prix, stocks et disponibilités dans Supabase ; vérifier les 13 fleurs, les règles propres à chaque variété et les univers résines, bien-être/huiles et WOOD Shop sans inventer de contenu manquant.
3. **Sécurité Supabase :** décider l’application de `supabase/migrations/20261105232000_rate_limit_rls.sql`, activer Leaked Password Protection, renseigner les URL/redirects finales, confirmer Turnstile et exécuter la recette anon/client/owner.
4. **E-mails Gmail :** connecter le compte de la propriétaire par OAuth serveur, configurer l’expéditeur et le domaine, publier SPF/DKIM/DMARC, lancer des tests reçus avec PDF et vérifier les rebonds ; aucune newsletter réelle avant cette validation.
5. **Paiement Viva :** fournir les identifiants professionnels, tester le sandbox puis le webhook signé, l’idempotence, la réconciliation et les scénarios refus/expiration/remboursement ; le paiement reste séparé et désactivé avant cela.
6. **Hébergement et domaine :** transférer le paquet contrôlé dans l’hébergeur choisi, relier le domaine `.fr`, vérifier DNS/HTTPS/404/cache/retour arrière et rejouer le smoke test sans publier secrets, tests ou route admin.
7. **Recettes humaines :** tester sur Safari iOS/macOS, Chrome Android/Windows, Edge, Firefox, Linux, appareils réels, zoom 200/400 %, clavier virtuel et orientation ; obtenir séparément l’accord « c’est toujours WOOD » de la propriétaire et « la présentation est aussi travaillée que TealerLab » de son conjoint.
8. **Passation :** remettre les comptes, sauvegardes et procédures à la propriétaire, vérifier qu’elle peut gérer seule, puis retirer ou rétrograder les accès de construction après son accord écrit.

Tant que ces huit groupes ne sont pas prouvés, la prévisualisation GitHub Pages reste une démonstration et le dépôt reste la version de travail ; aucune ouverture commerciale n’est déclarée.

**Spécification détaillée :** `docs/audits/2026-11-04-tealerlab-wood-compatibility-audit.md` et les contraintes validées ci-dessous.

## Cases d'origine, archivées sans perte

Les numéros de ligne indiquent l'emplacement dans la feuille de route **avant** cette extraction. Les identifiants `Axxx` sont conservés à l'identique pour préserver le suivi global des 700 tags.

### Informations, supports et validations de la propriétaire (102)

- [ ] Attendre les exemples graphiques de la propriétaire avant de définir les formes, textures, personnages ou motifs définitifs.

  _Source : Tâche 4 — Créer le système d’accents graffiti et chill · ancienne ligne 186._

- [ ] Générer les futurs visuels à partir de ces références validées, sans remplacer le logo ni modifier les couleurs WOOD.

  _Source : Tâche 4 — Créer le système d’accents graffiti et chill · ancienne ligne 187._

- [ ] Ajouter plus tard une zone “sélection WOOD” uniquement lorsque les produits, stocks et photos sont réels.

  _Source : Tâche 5 — Améliorer la hiérarchie de l’accueil sans changer son identité · ancienne ligne 198._

- [ ] Préparer des emplacements pour avis, photos produit réelles sans contenant et preuves de qualité lorsque la propriétaire les transmettra.

  _Source : Tâche 7 — Structurer la preuve de confiance · ancienne ligne 213._

- [ ] Faire valider et documenter la règle exacte pour les quantités entre les paliers affichés (`2 g`, `4 g`, `6–9 g`, `11–24 g`) avant d’autoriser leur achat ; ne jamais arrondir silencieusement ni inventer un tarif.

  _Source : Tâche 12 — Implémenter le moteur de prix exact · ancienne ligne 267._

- [ ] Définir côté propriétaire : code, période, type de réduction, montant, plafond, produits concernés et nombre d’utilisations.

  _Source : Tâche 18 — Préparer les vouchers sans les activer · ancienne ligne 323._

- [ ] Remplacer les images temporaires uniquement après réception et validation des originaux.

  _Source : Tâche 27 — Préparer l’intégration des vraies photos produit · ancienne ligne 423._

- [ ] Retirer l’accès de Florent uniquement lorsque la propriétaire confirme qu’elle est autonome.

  _Source : Tâche 35 — Préparer la passation à la propriétaire · ancienne ligne 499._

- [ ] Montrer d’abord l’accueil et les quatre univers.

  _Source : Tâche 38 — Validation humaine avec la propriétaire · ancienne ligne 525._

- [ ] Montrer ensuite une fleur avec son prix réel et son sélecteur de grammes.

  _Source : Tâche 38 — Validation humaine avec la propriétaire · ancienne ligne 526._

- [ ] Montrer le panier et le parcours livraison.

  _Source : Tâche 38 — Validation humaine avec la propriétaire · ancienne ligne 527._

- [ ] Montrer enfin l’espace propriétaire séparé visuellement des comptes clients.

  _Source : Tâche 38 — Validation humaine avec la propriétaire · ancienne ligne 528._

- [ ] Noter les retours sans modifier au hasard ; chaque changement doit être relié à une tâche et retesté.

  _Source : Tâche 38 — Validation humaine avec la propriétaire · ancienne ligne 529._

- [ ] Toutes les tâches bloquantes sont validées.

  _Source : Tâche 39 — Feu vert final · ancienne ligne 535._

- [ ] Les stocks réels sont renseignés par la propriétaire.

  _Source : Tâche 39 — Feu vert final · ancienne ligne 536._

- [ ] Les règles de livraison sont confirmées.

  _Source : Tâche 39 — Feu vert final · ancienne ligne 537._

- [ ] Faire valider une première planche visuelle par la propriétaire avant de généraliser les accents.

  _Source : Tâche 40 — Valider la direction WOOD chic, premium, chill et graffiti · ancienne ligne 552._

- [ ] Ajouter une réassurance WOOD authentique, une FAQ lisible et une présentation photographique réelle sans contenant.

  _Source : Tâche 43 — Ajouter seulement les mécanismes TealerLab compatibles · ancienne ligne 576._

- [ ] Exiger une prise de vue sans bocal ni cloche, avec cadrage photographe et éclairage maîtrisé.

  _Source : Tâche 45 — Préparer les vraies photos de fleurs et résines · ancienne ligne 595._

- [ ] Remplacer les illustrations temporaires uniquement après validation des originaux.

  _Source : Tâche 45 — Préparer les vraies photos de fleurs et résines · ancienne ligne 597._

- [ ] Présenter la photo réelle sans contenant, le nom, le niveau, la description, la sélection de grammes, le prix et l’ajout.

  _Source : Tâche 57 — Mettre en scène la fiche produit · ancienne ligne 977._

- [ ] Ajouter plus tard une zone de présentation détaillée, uniquement avec les informations réelles fournies par la propriétaire.

  _Source : Tâche 57 — Mettre en scène la fiche produit · ancienne ligne 978._

- [ ] Attendre les photos réelles sans contenant et les références graffiti de la propriétaire.

  _Source : Tâche 58 — Préparer les visuels WOOD · ancienne ligne 985._

- [ ] Générer ou préparer les images uniquement après validation de la direction graphique.

  _Source : Tâche 58 — Préparer les visuels WOOD · ancienne ligne 986._

- [ ] Faire valider deux phrases séparément : « c’est toujours WOOD » pour la propriétaire et « la présentation est aussi travaillée que TealerLab » pour son conjoint.

  _Source : Tâche 64 — Recette visuelle WOOD × TealerLab · ancienne ligne 1042._

- [ ] **A10 — Créer la future sélection WOOD :** uniquement avec produits, photos, stocks et prix validés.

  _Source : Sous-tâches ajoutées — `A01–A40` · ancienne ligne 1101._

- [ ] **A40 — Faire valider en deux temps :** d’abord `c’est toujours WOOD` par la propriétaire, puis `la présentation est aussi forte que TealerLab` par son conjoint.

  _Source : Sous-tâches ajoutées — `A01–A40` · ancienne ligne 1131._

- [ ] **A41 — Identité légale de la boutique :** recueillir raison sociale, adresse légale, SIRET, contact et informations nécessaires aux pages légales ; validation : propriétaire et conseil compétent valident les données publiées.

  _Source : Conformité, données personnelles et comptes clients · ancienne ligne 1184._

- [ ] **A42 — Âge et public autorisé :** confirmer avec la propriétaire et le conseil si un contrôle d’âge ou un message majeur est requis pour les produits exacts ; validation : règle écrite, parcours non bloquant pour les visiteurs autorisés.

  _Source : Conformité, données personnelles et comptes clients · ancienne ligne 1185._

- [ ] **A46 — Conservation et effacement :** documenter la durée des comptes, paniers, commandes, e-mails, logs et sauvegardes ; validation : une suppression demandée ne détruit jamais une obligation légale de conservation sans décision documentée.

  _Source : Conformité, données personnelles et comptes clients · ancienne ligne 1189._

- [ ] **A47 — Règles de livraison finales :** confirmer zones, transporteur, frais, délais, minimum éventuel, suivi, emballage et retours ; validation : un document propriétaire alimente les textes et le calcul réel.

  _Source : Livraison et traitement de commande · ancienne ligne 1193._

- [ ] **A54 — Annulation et remboursement :** définir qui peut annuler, à quel état, avec quel justificatif et comment l’e-mail client est déclenché ; validation : aucun remboursement fictif n’est confirmé avant Viva.

  _Source : Livraison et traitement de commande · ancienne ligne 1200._

- [ ] **A76 — Passation propriétaire :** transférer dépôt, Supabase, domaine, hébergeur, e-mail, paiement et sauvegardes avec accès séparés ; validation : la propriétaire peut gérer sans Florent.

  _Source : Supervision, continuité et passation · ancienne ligne 1234._

- [ ] **A77 — Retrait des accès de construction :** prévoir suppression ou rétrogradation de l’accès de Florent après validation écrite ; validation : les comptes clients et l’administration restent fonctionnels.

  _Source : Supervision, continuité et passation · ancienne ligne 1235._

- [ ] **A87 — Intégrer le logo officiel exact :** utiliser uniquement le fichier transmis par la propriétaire, sans branche ajoutée, déformation, recoloration ou reconstruction ; validation : comparaison visuelle avec l’original et test sur fond clair/sombre.

  _Source : Direction artistique, composition et identité · ancienne ligne 1255._

- [ ] **A123 — Prévoir les emojis avec parcimonie :** utiliser uniquement un petit jeu choisi par WOOD dans les zones éditoriales ou badges, jamais dans le prix, le paiement ou les erreurs ; validation : le rendu reste premium si les emojis sont désactivés ou absents.

  _Source : Fiches, textes, emojis, animations et contrôle final · ancienne ligne 1303._

- [ ] **A125 — Ajouter l’humour WOOD :** prévoir des micro-formules et annotations qui donnent du caractère sans gêner la compréhension ni banaliser une commande ; validation : chaque phrase humoristique a une version neutre et n’apparaît pas dans les messages d’erreur.

  _Source : Fiches, textes, emojis, animations et contrôle final · ancienne ligne 1305._

- [ ] **A139 — Faire une revue “propriétaire” :** contrôler identité WOOD, couleurs, logo, ton premium/chill/graffiti, photographie produit, simplicité et absence de promotion ; validation : aucune modification graphique majeure n’est retenue sans accord.

  _Source : Fiches, textes, emojis, animations et contrôle final · ancienne ligne 1319._

- [ ] **A140 — Faire une revue “conjoint” :** contrôler énergie de la page d’accueil, présentation des produits, densité, menu, animations et ressemblance de structure avec TealerLab ; validation : la ressemblance porte sur l’expérience, jamais sur les assets ou textes copiés.

  _Source : Fiches, textes, emojis, animations et contrôle final · ancienne ligne 1320._

- [ ] **A159 — Organiser la validation propriétaire/conjoint :** produire une planche avant/après centrée sur l’accueil, la présentation des fleurs, le menu et les animations ; validation : la propriétaire valide l’identité WOOD et son conjoint valide l’énergie de présentation, séparément.

  _Source : Audit de production visuelle et contenu catalogue — tags `A141–A160` · ancienne ligne 1409._

- [ ] **A160 — Remplacer les assets de démo au dernier moment :** conserver un commit/branche de sauvegarde, remplacer uniquement les fichiers et le registre approuvés, puis rejouer la recette complète ; validation : rollback possible et aucun changement non demandé de couleur, logo, carte, prix ou navigation.

  _Source : Audit de production visuelle et contenu catalogue — tags `A141–A160` · ancienne ligne 1410._

- [ ] **A168 — Installer un bloc “sélection du moment” :** mettre en avant quelques fleurs réellement publiées avec intro éditoriale, visuels distincts et lien `Voir toutes les fleurs` ; validation : la sélection ne crée pas de faux best-seller ni de préférence inventée.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1446._

- [ ] **A170 — Ajouter un état éditorial de nouveauté sans promesse :** prévoir un badge `Nouveau` uniquement lorsqu’une référence est réellement nouvelle et validée ; validation : aucun badge `best-seller`, `populaire`, `pro` ou note n’est généré automatiquement.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1448._

- [ ] **A175 — Ajouter une galerie produit sans surcharge :** prévoir une image principale et quelques vues réelles futures sans contenant, sans carrousel obligatoire pour une seule photo ; validation : chaque image a un alt text, une taille réservée et une fermeture tactile fiable.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1453._

- [ ] **A176 — Ajouter un bloc de garanties seulement avec des preuves WOOD :** réserver l’emplacement à conformité, qualité, préparation et service, mais n’afficher aucune phrase avant validation documentaire ; validation : le bloc peut rester vide ou masqué sans créer de trou visuel.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1454._

- [ ] **A179 — Préparer une zone communauté non active :** étudier un futur bloc de photos/stickers/graffiti de la boutique, sans faux témoignage, faux compte social ou contenu récupéré ; validation : aucun contenu communautaire n’est affiché sans autorisation.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1457._

- [ ] **A180 — Préparer les avis sans les simuler :** réserver la hiérarchie visuelle d’une note et de commentaires comme sur TealerLab, mais afficher un état vide tant que la propriétaire ne fournit pas de données vérifiables ; validation : aucun nombre ou étoile inventé.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1458._

- [ ] **A190 — Faire signer la version de référence :** conserver une capture desktop, mobile et tablette validée par la propriétaire et son conjoint avant d’engager la refonte ; validation : tout changement ultérieur est comparé à cette référence et peut être restauré.

  _Source : Seconde passe d’audit TealerLab → WOOD — tags `A161–A190` · ancienne ligne 1468._

- [ ] **A201 — Définir le vocabulaire graffiti WOOD :** formes, épaisseurs, énergie, irrégularités et niveau de contraste à partir des références de la propriétaire ; validation : vocabulaire original et documenté.

  _Source : Graffiti et stickers WOOD · ancienne ligne 1522._

- [ ] **A240 — Faire signer le langage animé WOOD :** choisir les animations retenues, refusées et optionnelles avec la propriétaire et son conjoint ; validation : document de référence archivé avant déploiement.

  _Source : Animations et expérience premium · ancienne ligne 1570._

- [ ] **A242 — Obtenir une capture plane de meilleure qualité :** demander un scan ou une photo sans perspective, reflet ni ombre pour les futurs découpages ; validation : texte, pictogrammes et tarifs sont lisibles à 100 %.

  _Source : Décomposition visuelle constatée · ancienne ligne 1587._

- [ ] **A256 — Recenser les pictogrammes par variété :** associer chaque icône visible à son nom exact sans deviner sa signification ; validation : registre propriétaire relu avec la photo originale.

  _Source : Pictogrammes, catégories et données · ancienne ligne 1604._

- [ ] **A257 — Créer une bibliothèque d’icônes WOOD :** vectoriser ou redessiner uniquement les pictogrammes validés, sans les lisser jusqu’à perdre leur personnalité ; validation : chaque icône possède une version couleur, monochrome et sans image.

  _Source : Pictogrammes, catégories et données · ancienne ligne 1605._

- [ ] **A280 — Faire valider la direction de la carte :** soumettre une planche `conservé / adapté / exclu` à la propriétaire ; validation : aucune intégration finale avant son accord.

  _Source : Transposition web et campagne · ancienne ligne 1631._

- [ ] Ajouter, si la propriétaire le valide, un mini-guide très simple : `CBD boosté (strong)`, `CBD soft (medium)` et `CBD classique`.

  _Source : Tâche 65 — Ajouter un guide de choix WOOD sans recherche ni filtre · ancienne ligne 1673._

- [ ] Préparer l’emplacement d’un avis, d’une note ou d’un témoignage uniquement lorsque de vraies données seront disponibles.

  _Source : Tâche 67 — Prévoir les avis et preuves de qualité sans les fabriquer · ancienne ligne 1691._

- [ ] Afficher la source et le statut vérifié si la propriétaire valide le principe.

  _Source : Tâche 67 — Prévoir les avis et preuves de qualité sans les fabriquer · ancienne ligne 1692._

- [ ] Réserver une zone de qualité/laboratoire uniquement aux documents et affirmations fournis par la boutique.

  _Source : Tâche 67 — Prévoir les avis et preuves de qualité sans les fabriquer · ancienne ligne 1694._

- [ ] Garder les coordonnées et horaires uniquement s’ils sont confirmés par la propriétaire.

  _Source : Tâche 69 — Clarifier l’aide et le contact · ancienne ligne 1711._

- [ ] Vérifier que les réponses restent cohérentes avec les règles de livraison que la propriétaire doit encore préciser.

  _Source : Tâche 70 — Construire une FAQ courte et sûre · ancienne ligne 1721._

- [ ] Ajouter plus tard les informations de paiement, de confidentialité et de service seulement après validation.

  _Source : Tâche 72 — Ajouter une barre de réassurance non promotionnelle · ancienne ligne 1739._

- [ ] Faire valider les futures créations graffiti avant intégration définitive.

  _Source : Tâche 74 — Vérifier les contenus et la propriété intellectuelle · ancienne ligne 1759._

- [ ] Recueillir auprès de la propriétaire les informations exactes de l’entreprise et les textes validés pour les mentions légales, CGV, confidentialité, cookies éventuels, livraison, retours et contact.

  _Source : Tâche 75 — Préparer les pages légales sans inventer de contenu · ancienne ligne 1782._

- [ ] Ajouter les liens légaux depuis le footer, le compte et le parcours de commande lorsque les textes sont validés.

  _Source : Tâche 75 — Préparer les pages légales sans inventer de contenu · ancienne ligne 1783._

- [ ] Ne publier aucun texte juridique, délai, frais, droit de retour ou engagement réglementaire supposé par le code.

  _Source : Tâche 75 — Préparer les pages légales sans inventer de contenu · ancienne ligne 1784._

- [ ] **A286 — Établir la matrice garder/adapter/exclure :** faire relire la matrice avant intégration ; validation : promotions, fidélité, parrainage, jeu, faux avis et compteurs sont exclus par défaut.

  _Source : 77.1 — Observer et cartographier l’accueil de référence · ancienne ligne 1809._

- [ ] **A322 — Ajouter un bloc “Sélection résines” :** créer la même qualité de présentation après validation des données résines ; validation : aucun prix coupé ou supposé n’est affiché.

  _Source : 79.1 — Sélection de fleurs et résines sur l’accueil · ancienne ligne 1857._

- [ ] **A341 — Créer une section photo produit :** préparer un récit visuel sur la présentation qualitative de vraies fleurs/résines photographiées sans bocal ni cloche ; validation : la section reste un contenu de marque, pas une promesse d’effet.

  _Source : 80.1 — Blocs de confiance et contenu d’accueil · ancienne ligne 1882._

- [ ] **A343 — Ajouter une section qualité vérifiable :** réserver des emplacements aux informations réellement fournies par WOOD ; validation : aucun faux laboratoire, taux ou label.

  _Source : 80.1 — Blocs de confiance et contenu d’accueil · ancienne ligne 1884._

- [ ] **A349 — Réserver une zone éditoriale WOOD :** histoire, humour, graffiti ou coulisses uniquement après validation des textes et images ; validation : la zone peut rester vide proprement.

  _Source : 80.1 — Blocs de confiance et contenu d’accueil · ancienne ligne 1890._

- [ ] **A360 — Réaliser la recette visuelle finale :** comparer WOOD desktop/mobile aux storyboards, vérifier chaque lien et faire valider une planche par la propriétaire et son conjoint ; validation : aucun changement final sans accord explicite.

  _Source : 80.2 — Footer, animation et sensation d’application · ancienne ligne 1904._

- [ ] **A367 — Fixer le seuil d’usage acceptable de Gmail :** validation : le volume prévu est comparé aux limites Google avant de choisir Gmail pour les newsletters.

  _Source : 81 — Cadre, décisions et séparation des responsabilités · ancienne ligne 1936._

- [ ] **A391 — Vérifier l’identité d’expédition :** validation : l’adresse Gmail autorisée est affichée au propriétaire avant activation.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1966._

- [ ] **A392 — Définir `From`, `Reply-To` et nom d’expéditeur :** validation : les trois valeurs sont cohérentes et testées.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1967._

- [ ] **A447 — Ajouter le pied de page légal :** validation : coordonnées et liens nécessaires sont validés avant activation.

  _Source : 86 — E-mails de commande et de paiement · ancienne ligne 2031._

- [ ] **A456 — Définir les données légales de la boutique :** validation : raison sociale, adresse, contact et régime applicable sont confirmés avant production.

  _Source : 87 — Factures, reçus et pièces jointes PDF · ancienne ligne 2043._

- [ ] **A458 — Capturer les frais de livraison :** validation : aucun frais inventé tant que la règle commerciale n’est pas confirmée.

  _Source : 87 — Factures, reçus et pièces jointes PDF · ancienne ligne 2045._

- [ ] **A460 — Définir le traitement TVA/taxe :** validation : aucune mention fiscale n’est inventée ; le document reste bloqué si l’information manque.

  _Source : 87 — Factures, reçus et pièces jointes PDF · ancienne ligne 2047._

- [ ] **A473 — Définir la conservation documentaire :** validation : durée et suppression sont documentées avant production.

  _Source : 87 — Factures, reçus et pièces jointes PDF · ancienne ligne 2060._

- [ ] **A479 — Décider les zones livrées :** validation : le système refuse proprement une zone non desservie.

  _Source : 88 — Livraison et suivi de la commande · ancienne ligne 2069._

- [ ] **A480 — Décider les frais de livraison :** validation : le total affiché avant paiement correspond à la règle validée.

  _Source : 88 — Livraison et suivi de la commande · ancienne ligne 2070._

- [ ] **A481 — Décider les délais annoncés :** validation : aucun délai public n’est affiché avant confirmation de la propriétaire.

  _Source : 88 — Livraison et suivi de la commande · ancienne ligne 2071._

- [ ] **A498 — Prévoir la confirmation d’inscription :** validation : la newsletter n’est active qu’après confirmation si cette règle est retenue.

  _Source : 89 — Newsletter, consentement et désinscription · ancienne ligne 2091._

- [ ] **A507 — Prévoir des segments minimaux :** validation : seuls les critères validés par la propriétaire sont utilisables.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2103._

- [ ] **A521 — Ajouter un rythme d’envoi :** validation : le worker respecte les limites choisies au lieu d’envoyer en rafale.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2117._

- [ ] **A522 — Ajouter un plafond journalier :** validation : le système se met en pause avant dépassement.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2118._

- [ ] **A538 — Définir la conservation :** validation : campagnes, destinataires, erreurs et consentements ont une durée documentée.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2134._

- [ ] **A551 — Décider si les ouvertures sont mesurées :** validation : aucun pixel de suivi n’est activé sans décision de confidentialité.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2147._

- [ ] **A554 — Valider les textes légaux newsletter :** validation : les textes sont relus avant activation.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2150._

- [ ] **A560 — Fermer la porte de mise en ligne newsletter :** validation : consentement, désinscription, quotas, RLS, tests et validation propriétaire sont tous verts.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2156._

- [ ] **A580 — Archiver les versions approuvées :** validation : chaque asset et chaque texte accepté possède une date et une origine documentées.

  _Source : 91 — Registre de direction artistique et contenus WOOD · ancienne ligne 2225._

- [ ] **A588 — Préparer la liste des 13 variétés :** validation : une photo réelle distincte est associée à chaque nom exact.

  _Source : 92 — Photographie réelle et pipeline des visuels · ancienne ligne 2236._

- [ ] **A589 — Prévoir la liste des résines :** validation : aucune photo ni fiche résine n’est validée avant réception des données réelles.

  _Source : 92 — Photographie réelle et pipeline des visuels · ancienne ligne 2237._

- [ ] **A600 — Valider la planche photo :** validation : la propriétaire valide l’ensemble des visuels avant leur statut de production.

  _Source : 92 — Photographie réelle et pipeline des visuels · ancienne ligne 2248._

- [ ] **A620 — Faire valider le storyboard :** validation : la propriétaire et son conjoint valident la direction avant refonte visuelle importante.

  _Source : 93 — Accueil WOOD inspiré de TealerLab sans copie · ancienne ligne 2271._

- [ ] **A681 — Figer l’expéditeur Gmail :** validation : adresse, nom affiché et compte propriétaire sont confirmés avant OAuth.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2344._

- [ ] **A695 — Définir les règles de conservation :** validation : commandes, documents, logs et consentements possèdent une durée validée.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2358._

- [ ] **A696 — Recueillir les données légales :** validation : raison sociale, coordonnées, CGV, confidentialité, livraison et retours sont fournis par la propriétaire.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2359._

- [ ] **A697 — Relier les pages légales :** validation : footer, compte et checkout pointent vers des textes validés et non inventés.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2360._

- [ ] **A698 — Préparer la passation :** validation : la propriétaire possède ses comptes GitHub, Supabase, Gmail, hébergeur et domaine, sans dépendre du développeur.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2361._

- [ ] **A699 — Préparer la rotation des accès :** validation : les accès de démonstration sont remplacés et les anciens secrets révoqués.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2362._

- [ ] **A700 — Fermer la porte de mise en production :** validation : la propriétaire signe la recette fonctionnelle, visuelle, e-mail, données et hébergement.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2363._


### Identifiants, plateformes et services à activer plus tard (32)

- [ ] Valider le code côté serveur Supabase.

  _Source : Tâche 18 — Préparer les vouchers sans les activer · ancienne ligne 324._

- [ ] Afficher un message précis si le code est invalide, expiré ou non applicable.

  _Source : Tâche 18 — Préparer les vouchers sans les activer · ancienne ligne 325._

- [ ] Journaliser l’usage pour empêcher les abus.

  _Source : Tâche 18 — Préparer les vouchers sans les activer · ancienne ligne 326._

- [ ] Utiliser un relais SMTP/API transactionnel configuré hors du dépôt ; garder les secrets dans Supabase et documenter SPF, DKIM, DMARC et les rebonds.

  _Source : Tâche 19 — Préparer les e-mails de commande · ancienne ligne 336._

- [ ] Vérifier l’URL Supabase et les redirections de production/test.

  _Source : Tâche 20 — Auditer le schéma actuel avant modification · ancienne ligne 347._

- [ ] Ne modifier aucune table de production sans sauvegarde et plan de retour.

  _Source : Tâche 20 — Auditer le schéma actuel avant modification · ancienne ligne 348._

- [ ] Les identifiants Viva sont disponibles ou le paiement reste explicitement désactivé.

  _Source : Tâche 39 — Feu vert final · ancienne ligne 538._

- [ ] Activer Leaked Password Protection dans Supabase Auth.

  _Source : Tâche 46 — Activer la protection Supabase contre les mots de passe compromis · ancienne ligne 603._

- [ ] Vérifier que la création de compte et la réinitialisation restent fonctionnelles.

  _Source : Tâche 46 — Activer la protection Supabase contre les mots de passe compromis · ancienne ligne 604._

- [ ] Retester l’espace propriétaire après le changement.

  _Source : Tâche 46 — Activer la protection Supabase contre les mots de passe compromis · ancienne ligne 605._

- [ ] Confirmer l’activation effective de Turnstile dans les secrets Supabase.

  _Source : Tâche 47 — Vérifier la protection de la fonction de commande · ancienne ligne 611._

- [ ] **A56 — Vérification du paiement :** vérifier signature/webhook, montant, devise, commande, idempotence et origine côté serveur ; validation : le navigateur ne peut jamais marquer une commande payée.

  _Source : Viva Wallet et paiements · ancienne ligne 1205._

- [ ] **A58 — Réconciliation paiements-commandes :** comparer périodiquement les événements Viva aux commandes et faire remonter les écarts ; validation : un paiement sans commande et une commande sans paiement sont détectés.

  _Source : Viva Wallet et paiements · ancienne ligne 1207._

- [ ] **A61 — Domaine d’envoi :** configurer fournisseur, expéditeur, SPF, DKIM, DMARC, rebonds et adresse de réponse hors dépôt ; validation : test reçu côté client et propriétaire avec en-têtes contrôlés.

  _Source : E-mails, PDF et notifications · ancienne ligne 1213._

- [ ] **A75 — Sauvegarde et restauration réelle :** exécuter un export, restaurer dans un environnement de test et vérifier commandes, prix, rôles et historiques ; validation : preuve datée et durée de reprise documentées.

  _Source : Supervision, continuité et passation · ancienne ligne 1233._

- [ ] **A80 — Préproduction et transfert :** produire le paquet final, vérifier `public_html`, HTTPS, DNS, domaine `.fr`, 404, redirections, cache, retour arrière et smoke test ; validation : transfert reproductible en peu d’étapes, sans publier `admin.*`, secrets ou données de test.

  _Source : Qualité, navigateurs et mise en service · ancienne ligne 1241._

- [ ] **A381 — Créer le projet Google Cloud dédié :** validation : le projet est au nom de la propriétaire ou de la structure qui exploite le site.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1956._

- [ ] **A382 — Activer Gmail API :** validation : un appel de test contrôlé répond sans erreur d’API.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1957._

- [ ] **A383 — Configurer l’écran de consentement OAuth :** validation : nom, logo, domaine et coordonnées correspondent à WOOD.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1958._

- [ ] **A385 — Déclarer les URI de redirection séparément :** validation : local, staging et production ne se mélangent jamais.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1960._

- [ ] **A386 — Générer le client OAuth serveur :** validation : le secret reste dans les secrets Edge Function.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1961._

- [ ] **A395 — Ajouter la rotation sans interruption :** validation : ancien et nouveau secret sont vérifiés avant retrait de l’ancien.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1970._

- [ ] **A396 — Tester une adresse de destination contrôlée :** validation : l’e-mail de test est explicitement marqué comme test.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1971._

- [ ] **A400 — Ajouter une recette OAuth complète :** validation : autoriser, envoyer, révoquer, réautoriser et confirmer les états dans le tableau de bord.

  _Source : 83 — Connexion Gmail par OAuth sécurisé · ancienne ligne 1975._

- [ ] **A420 — Préparer le rollback de schéma :** validation : chaque migration e-mail peut être annulée ou restaurée avec une sauvegarde vérifiée.

  _Source : 84 — Modèle de données e-mail et outbox · ancienne ligne 1998._

- [ ] **A444 — Ajouter les liens absolus de production :** validation : aucun lien `localhost`, GitHub temporaire ou URL de test n’est envoyé.

  _Source : 86 — E-mails de commande et de paiement · ancienne ligne 2028._

- [ ] **A545 — Vérifier l’authentification du domaine d’expédition :** validation : SPF, DKIM et DMARC sont documentés avant campagne réelle.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2141._

- [ ] **A559 — Tester une campagne en staging :** validation : aucune adresse ou donnée de production ne fuit vers le test.

  _Source : 90 — Campagnes, lots et hygiène de newsletter · ancienne ligne 2155._

- [ ] **A677 — Tester les sauvegardes :** validation : sauvegarde, restauration et vérification de cohérence sont prouvées sur un environnement de test.

  _Source : 96 — Commandes, comptes, Supabase et continuité · ancienne ligne 2337._

- [ ] **A682 — Configurer Gmail sans mot de passe :** validation : OAuth serveur, scope minimal et refresh token privé sont utilisés.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2345._

- [ ] **A683 — Tester l’autorisation Gmail :** validation : autoriser, envoyer un test, révoquer puis réautoriser produisent des états explicites.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2346._

- [ ] **A694 — Vérifier SPF/DKIM/DMARC :** validation : le domaine d’envoi est authentifié avant tout envoi réel.

  _Source : 97 — E-mails Gmail, PDF, livraison, légal et passation · ancienne ligne 2357._


### Appareils et validation physique externe (4)

- [ ] Tester petits iPhone/Android, grands téléphones, iPad portrait/paysage, ordinateur Windows, macOS et Linux.

  _Source : Tâche 29 — Vérifier tous les formats d’écran · ancienne ligne 439._

- [ ] **A79 — Matrice navigateurs/appareils :** tester Safari iOS, Chrome Android, Safari macOS, Chrome/Edge/Firefox Windows et Firefox/Linux ; validation : aucune route, grille, panier ou compte ne change de comportement critique.

  _Source : Qualité, navigateurs et mise en service · ancienne ligne 1240._

- [ ] **A138 — Tester les navigateurs graphiques :** Safari iOS/macOS, Chrome Android/Windows, Edge, Firefox et Linux ; validation : aucun défaut de police, image, animation, grille ou menu ne reste sans décision.

  _Source : Fiches, textes, emojis, animations et contrôle final · ancienne ligne 1318._

- [ ] **A624 — Tester les navigateurs WebKit :** validation : Safari iPhone/iPad et Safari macOS ne coupent aucun élément critique.

  _Source : 94 — Responsive réel mobile, tablette et ordinateur · ancienne ligne 2278._


## Réactivation future

Après réception d'une autorisation, d'une photo validée, de données réelles ou d'un accès externe, réintroduire **uniquement les cases correspondantes** dans la feuille active, avec leur identifiant d'origine et un test de non-régression. Vérifier avec la propriétaire avant toute bascule commerciale. Les fonctions de paiement et d'e-mails réels restent désactivées pendant la démonstration.
