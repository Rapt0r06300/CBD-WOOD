# Basculer entre les deux versions WOOD

Le dépôt conserve deux snapshots locaux :

- `legacy` : l’ancien site, gardé comme version de secours ;
- `demo` : la nouvelle page d’accueil WOOD inspirée de la hiérarchie TealerLab, avec les couleurs, le logo, la carte et les règles WOOD conservés.

La version `demo` reste une maquette tant que la propriétaire ne l’a pas validée. Le changement est local et réversible : il ne publie rien sur GitHub, Hostinger ou un autre hébergeur.

```powershell
npm run site:snapshot
npm run site:status
npm run site:demo
npm run site:legacy
```

Lancer `site:snapshot` après une modification validée de la démo pour rafraîchir le snapshot local. Les snapshots sont volontairement ignorés par Git : ils restent une sauvegarde locale et ne peuvent pas devenir une URL publique par erreur. L’ancien site reste également récupérable depuis l’historique Git.

Après chaque bascule, ouvrir le serveur local avec `python -m http.server 8765`, puis vérifier la page d’accueil, la boutique, le panier et le compte. Les snapshots ne font pas partie du paquet Hostinger public.
