# CRO-161 — extraction factuelle

L'inventaire local du conseiller lit les fiches catalogue WOOD et produit des faits bornés : nom, univers, profil affiché, description visible, disponibilité affichée, état média et variantes tarifaires littérales. Chaque fait conserve le fichier source, un sélecteur public et un extrait exact.

Le parseur ne crée aucun fait `notes`, `aromaIntensity` ou `effect`. Ces attributs restent inconnus tant que la propriétaire ne les a pas fournis et validés.
