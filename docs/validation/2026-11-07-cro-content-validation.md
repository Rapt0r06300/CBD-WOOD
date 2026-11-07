# CRO-154 — contrôle automatique du contenu

`npm run content:check` contrôle les quatre catalogues avant publication : identifiants uniques, noms présents, images locales existantes, états média autorisés, prix de variantes strictement positifs et absence de formulations santé interdites.

Le test contient des fixtures volontairement invalides pour vérifier que le contrôle échoue bien lorsqu'une erreur est introduite. Les photos réelles et textes propriétaires restent soumis à validation humaine.
