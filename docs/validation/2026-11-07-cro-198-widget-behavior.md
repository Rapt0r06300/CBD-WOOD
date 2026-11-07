# CRO-198 — recette comportementale du widget conseiller

La recette locale a été réalisée sur la démo préparée depuis le dépôt :

- URL directe accueil : `http://127.0.0.1:4174/demo/index.html` ;
- URL directe fiche : `http://127.0.0.1:4174/demo/fleur.html?produit=fleurs-nimbus-3000` ;
- ouverture puis fermeture avec le bouton nommé ;
- réouverture et double-clic contrôlé ;
- sélection `Fleurs`, résultat `Nimbus 3000`, puis `Recommencer` ;
- défilement avec le panneau ouvert, sans interception du document ;
- contrôle mobile à `390×844`, avec panneau, bouton de fermeture et résultat lisibles ;
- la démo reste locale : aucun appel de données ni action commerciale n'est créé.

La capture mobile du panneau ouvert est conservée dans
`output/playwright/cro198-advisor-mobile-open.png`. Le contrat source garde un
conteneur sans interception globale, des contrôles pointer-events explicites,
le retour focus et une fermeture par Échap. Le widget est injecté seulement
sur les pages de démo prévues, pas sur checkout, compte, confirmation ou
contact.

Preuve automatisée complémentaire :

```text
node --test test/cro-198-widget-behavior.test.mjs
```

Résultat : **2 tests réussis, 0 échec**.
