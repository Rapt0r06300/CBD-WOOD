/* =====================================================================
   WOOD — client de l'API (PHP + MariaDB sur Hostinger)

   ⚠️ DÉSACTIVÉ TANT QUE WOOD_API_URL EST VIDE.
      Le site continue alors de fonctionner exactement comme aujourd'hui,
      avec son catalogue intégré. Aucune régression possible.

   POUR ACTIVER (le jour où l'API est en ligne ET testée) :
      1. renseigner WOOD_API_URL ci-dessous
      2. suivre les 3 points de bascule décrits dans wood-api/LISEZ-MOI.md

   PRINCIPE : toute fonction échoue « en douceur ». Si l'API ne répond pas,
   on renvoie null et l'appelant garde son comportement actuel — une boutique
   ne doit jamais devenir inutilisable parce qu'un serveur a hoqueté.
   ===================================================================== */

const WOOD_API_URL = ""; // ex. "https://ton-domaine.fr/api/"

const WoodAPI = (() => {

  const actif = () => typeof WOOD_API_URL === "string" && WOOD_API_URL.length > 0;

  async function appel(route, options = {}) {
    if (!actif()) return null;
    const { methode = "GET", corps = null, timeout = 12000 } = options;

    const ctrl = new AbortController();
    const minuteur = setTimeout(() => ctrl.abort(), timeout);
    try {
      const reponse = await fetch(WOOD_API_URL + "?r=" + encodeURIComponent(route), {
        method: methode,
        headers: corps ? { "Content-Type": "application/json" } : {},
        body: corps ? JSON.stringify(corps) : null,
        credentials: "include",   // le cookie de session doit circuler
        signal: ctrl.signal,
      });
      const data = await reponse.json().catch(() => null);
      if (!reponse.ok || !data || data.ok !== true) {
        const err = new Error((data && data.error) || ("Erreur " + reponse.status));
        err.statut = reponse.status;
        err.incident = data && data.incident;
        throw err;
      }
      return data;
    } finally {
      clearTimeout(minuteur);
    }
  }

  /* Toute erreur est avalée : l'appelant garde son comportement actuel. */
  async function doux(fn) {
    try { return await fn(); }
    catch (e) { console.warn("[WOOD API]", e.message); return null; }
  }

  return {
    actif,

    /* --- Lecture --------------------------------------------------- */
    ping:      ()      => doux(() => appel("ping")),
    boutiques: ()      => doux(() => appel("boutiques")),
    catalogue: (cat)   => doux(() => appel("catalogue" + (cat ? "&cat=" + encodeURIComponent(cat) : ""))),

    /* --- Carte cadeau ----------------------------------------------
       ⚠️ LES ERREURS NE SONT PAS AVALÉES ICI, et c'est volontaire.
       `doux()` rend `null` sur TOUTE erreur. Un code inconnu (404) et un
       serveur muet deviendraient donc indistinguables, et l'écran n'aurait
       plus que deux mensonges au choix : annoncer « carte introuvable » à
       quelqu'un qui tient une vraie carte, ou « on ne peut pas vérifier »
       à quelqu'un qui s'est trompé d'un caractère.

       L'appelant tranche sur `e.statut` :
         404 → ce code n'existe pas en base (le serveur a bien répondu)
         429 → trop d'essais (12/minute/IP, anti-recherche de codes)
         autre ou réseau muet → on ne sait pas, et on le dit.            */
    verifierCarte: (code) =>
      appel("carte-cadeau", { methode: "POST", corps: { action: "verifier", code } }),

    /* --- Commande ---------------------------------------------------
       Les erreurs NE sont PAS avalées ici : si une commande échoue,
       le client doit le savoir immédiatement et explicitement.        */
    commander: (commande) =>
      appel("commande", { methode: "POST", corps: commande }),

    /* --- Compte client ----------------------------------------------
       Les erreurs NE sont PAS avalées : si une connexion échoue, la personne
       doit savoir pourquoi (mot de passe incorrect, compte déjà existant...). */
    compte: (donnees) => appel("compte", { methode: "POST", corps: donnees }),

    /* --- Suivi d'une commande -----------------------------------------
       ⚠️ L'E-MAIL EST OBLIGATOIRE. `routes/suivi.php` exige le couple
       numero + e-mail comme preuve de propriete : sans ca, n'importe qui
       pourrait enumerer les commandes. Un appel sans e-mail echoue, et
       c'est voulu.
       ⚠️ Et la route ne rend le code de retrait QUE si le statut est
       deja `ready`. La page de confirmation ne passe donc pas par ici :
       elle garde le code que `routes/order.php` lui a renvoye.
       Celle-ci sert au client qui revient consulter sa commande.
       Echoue en douceur : l'appelant retombe sur le telephone des
       boutiques, jamais sur un ecran vide.                              */
    suivi: (numero, email) =>
      doux(() => appel("suivi", { methode: "POST", corps: { numero, email } })),

    /* --- Formulaires ----------------------------------------------- */
    contact:    (d) => appel("contact",    { methode: "POST", corps: d }),
    newsletter: (d) => appel("newsletter", { methode: "POST", corps: d }),

    /* --- Conversion catalogue API -> format interne du site ---------
       Permet de remplacer les données intégrées sans toucher au rendu. */
    versFormatSite(reponse) {
      if (!reponse || !Array.isArray(reponse.produits)) return null;
      const fleurs = [], boutique = [];

      for (const p of reponse.produits) {
        const grammes = p.variantes.filter(v => v.grammes !== null);

        if ((p.categorie === "fleurs" || p.categorie === "resines") && grammes.length >= 2) {
          fleurs.push({
            slug: p.slug, nom: p.nom, tier: p.gamme || "classique",
            desc: p.accroche || "", type: p.categorie === "resines" ? "resine" : undefined,
            p: grammes.map(v => v.prix_cents / 100),
            grammes: grammes.map(v => v.grammes),
            molecule: p.molecule, intensite: p.intensite, arome: p.arome,
            body: p.description, image: p.image,
          });
        } else {
          const simple = {
            slug: p.slug, nom: p.nom, kind: "simple", cat: p.categorie,
            desc: p.accroche || "", body: p.description || "", img: p.image || "",
          };
          if (p.variantes.length === 1) simple.price = p.variantes[0].prix_cents / 100;
          else simple.opts = p.variantes.map(v => [v.label, v.prix_cents / 100]);
          boutique.push(simple);
        }
      }
      return { fleurs, boutique };
    },
  };
})();

if (typeof window !== "undefined") window.WoodAPI = WoodAPI;
