# Repli du hero — démo WOOD

Le hero conserve sa composition photo, son repère `SCÈNE HERO · PHOTO DÉMO`,
son CTA vers `#univers` et ses accents WOOD si l’image principale fonctionne.
Si elle échoue, `wood-motion.js` active `.is-media-fallback`, masque uniquement
l’image cassée et affiche une scène de repli lisible : « Le détail reste
visible. » Les univers restent accessibles et aucun prix, stock ou avantage
commercial n’est ajouté.

Le contrat couvre l’image absente ou invalide, le cache qui ne fournit pas de
dimensions, le chargement lent et le fallback navigateur. Le zoom et la taille
du texte restent pilotés par les règles responsive existantes ; Safari iOS,
Android réel et les réseaux physiques restent des validations externes.

Preuve automatisée : `test/cro-hero-fallback.test.mjs`.

Contrôle navigateur local à 390 × 844 après simulation d’une erreur image :
`.is-media-fallback=true`, repli visible, image principale masquée et CTA
`#univers` toujours présent.
