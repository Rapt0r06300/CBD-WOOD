# CRO-226 — Rapport et rollback de la démo

## État vérifié

| ID | État | Tests / preuve | Commit | Risque résiduel | Rollback |
| --- | --- | --- | --- | --- | --- |
| CRO-046 | DONE local | mini-vues conditionnelles + test dédié | `6d57157` | visuels supplémentaires soumis à validation | revenir à `2493cf9` |
| CRO-072 / CRO-096 | DONE local | intégrité prix multi-pages + frontière base/démo | `6d57157` | services commerciaux externes exclus | revenir à `2493cf9` |
| CRO-156 | DONE local | 24 captures, manifeste et comparateur | `94291db` | Safari iOS/Android physiques | revenir à `6d57157` |
| CRO-157 | DONE local | registre source/autorisation/statut | `a28c669` | validation propriétaire des originaux | revenir à `94291db` |
| CRO-222 / CRO-223 | DONE local | badges explicables et combinaisons bornées | `0cc5224` | faits produits réels à fournir | revenir à `31a550e` |

La démo reste la seule cible publiable de ce lot : **D1 est désactivé par défaut**,
aucun paiement, e-mail, commande ou écriture commerciale réelle n'est
activé. Le paquet racine et `/demo/` restent séparés par le workflow GitHub
Pages.

## Vérifications exécutées

- `npm run check` : 504 tests, syntaxe JavaScript, audit statique, readiness et
  continuité OK ;
- vérification visuelle locale : 24/24 captures sans fichier manquant ni
  différence ;
- `git diff --check` : OK avant les commits ;
- déploiements Pages déclenchés uniquement après les validations locales.

## Retour arrière

Le retour se fait par commit ciblé sur la branche de travail, puis par un
nouveau déclenchement manuel de `pages.yml`. Les fichiers utilisateur non
suivis, notamment `.headless-public-runway-final/`, ne sont pas inclus dans les
commits et restent intacts. Les validations Safari/Android, les photos réelles,
les droits finaux, OAuth, Supabase production, le domaine et la publication
commerciale restent des risques externes non masqués.
