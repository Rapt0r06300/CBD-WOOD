/* ===========================================================
   WOOD — cbd claude · app.js (V1) — multi-pages
   Données fleurs RÉELLES (prix proprio). Profils = goût, jamais d'effet.
   =========================================================== */

const IMGV = "?v=5"; /* cache-buster images (bump si régénération) */
/* Catalogue RÉEL (récupération Shopify WOOD) — descriptions/prix/photos certifiés, jamais inventé. Prix par 1/3/5/10 g. */
const FLEURS = [
  /* — Fleurs boostées (molécule, ultra-fort) — */
  { slug:"euphoria", nom:"Euphoria", tier:"boostes", desc:"Fruitée · forte 🍓", c:["#b7f0a0","#e07a4d"], p:[12,34,55,100] },
  { slug:"pastraweed", nom:"Pastraweed", tier:"boostes", desc:"Terreuse · forte 🌰", c:["#cfe39a","#8a7a2e"], p:[12,34,55,100] },
  { slug:"ivory", nom:"Ivory", tier:"boostes", desc:"Weed · ultra fort 🤍", c:["#f3f1dd","#b7cf9a"], p:[15,42,70,130] },
  { slug:"nimbus-3000", nom:"Nimbus 3000", tier:"boostes", desc:"Weed · tropical ❄️", c:["#eafce0","#8fd08a"], p:[15,42,70,130] },
  /* — Fleurs classiques (CBD) — */
  { slug:"green-skunk", nom:"Green Skunk", tier:"classique", desc:"Sucrée · herbacée 🌿", c:["#bfe3b0","#3a7a4a"], p:[9,25,40,70] },
  { slug:"gelato", nom:"Gelato", tier:"classique", desc:"Sucrée intense 🍨", c:["#e7dce0","#7a5a8a"], p:[10,28,45,80] },
  { slug:"ice-cream", nom:"Ice Cream", tier:"classique", desc:"Caramélisée 🍮", c:["#ead9c0","#8a6a3a"], p:[10.90,29.70,44.50,79] },
  { slug:"fanta-hazy", nom:"Fanta Hazy", tier:"classique", desc:"Acidulée · sucrée 🍋", c:["#f3d49a","#c98a3a"], p:[10.90,29.70,44.50,79] },
  { slug:"purple-saphir", nom:"Purple Saphir", tier:"classique", desc:"Délicieuse · rare 💜", c:["#b89adf","#4a2e6b"], p:[9.90,26.70,39.50,69.90] },
  { slug:"fleur-mystere", nom:"Fleur Mystère", tier:"classique", desc:"Delicioso 🪻", c:["#d9c7f0","#4a2e6b"], p:[9.90,26.70,39.50,69] },
  { slug:"godzilla", nom:"Godzilla", tier:"classique", desc:"Épicée · grosses buds 🌶️", c:["#cfe39a","#5a6a2e"], p:[8,22,35,60] },
  { slug:"bio-peach", nom:"BIO Peach", tier:"classique", desc:"Pêche 🍑 · bio", c:["#f3c7a0","#b5651d"], p:[8,22,35,60] },
  { slug:"bubba-kush", nom:"Bubba Kush", tier:"classique", desc:"Terreuse · épicée 🌲", c:["#a8c0a0","#2c3a30"], p:[8,22,35,60] },
  { slug:"tropical-kush", nom:"Tropical Kush", tier:"classique", desc:"Sucrée · fruitée 🍓", c:["#c6e3a0","#5a8a3a"], p:[8,22,35,60] },
  { slug:"sweet-purple", nom:"Sweet Purple", tier:"classique", desc:"Fruité · sucré 💜", c:["#c6a8e0","#5a2e6b"], p:[7,21,35,70] },
  { slug:"skittlez", nom:"Skittlez", tier:"classique", desc:"Bonbon 🍭", c:["#f3c7e0","#8a3a6b"], p:[7,20,30,50] },
  { slug:"fruit-cake", nom:"Fruit Cake", tier:"classique", desc:"Fruitée · terreuse 🍓", c:["#f0c0b0","#8a4a3a"], p:[7.90,20.70,29.50,49] },
  { slug:"tropical-dream", nom:"Tropical Dream", tier:"classique", desc:"Tropicale 🌴", c:["#b7f0c0","#2f8a5a"], p:[6,16,25,40] },
  { slug:"tangerine-dream", nom:"Tangerine Dream", tier:"classique", desc:"Mandarine 🍊", c:["#f3c27a","#b5651d"], p:[6,16,25,40] },
  { slug:"tonic-haze", nom:"Tonic Haze", tier:"classique", desc:"Terreuse · citron 🍋", c:["#cfe39a","#7a8a2e"], p:[6,16,30,60] },
  { slug:"harlequin", nom:"Harlequin", tier:"classique", desc:"Sucré · fruité 🍬", c:["#e0c0e0","#6b4a7b"], p:[3,9,15,30] },
  { slug:"baby-cannatonic", nom:"Baby Cannatonic", tier:"classique", desc:"Douce 🌿", c:["#cfe0c0","#5a7a4a"], p:[3,9,15,30] },
  /* — Résines / Hash / Pollen — */
  { slug:"stoned", nom:"Stoned", tier:"boostes", type:"resine", desc:"3× filtré · fort 🟤", c:["#c0b0a0","#4a3a2a"], p:[12,34,55,100] },
  { slug:"golden-high", nom:"Golden High", tier:"boostes", type:"resine", desc:"Pollen · fort ✨", c:["#e0c870","#8a6a1a"], p:[11,30,50,90] },
  { slug:"jelly-high", nom:"Jelly High", tier:"boostes", type:"resine", desc:"Caramel 🍫 · fort", c:["#e0b090","#7a4a2a"], p:[11,30,50,90] },
  { slug:"moonrock", nom:"Moonrock CBD", tier:"classique", type:"resine", desc:"Épicé · fruité 💥", c:["#b0a0c0","#3a2c4a"], p:[9,25,40,70] },
  { slug:"beldia", nom:"Beldia", tier:"classique", type:"resine", desc:"Épicé · marocain 🍫", c:["#c0a080","#4a3420"], p:[9,25,40,70] },
  { slug:"cbn-cream", nom:"CBN Cream", tier:"classique", type:"resine", desc:"Sommeil 🌙", c:["#d8d0b0","#6b5a3a"], p:[10.90,29.70,44.50,79] },
];
/* Boutique — produits à prix unique / variantes (accessoires, merch, bonbons, carte-cadeau + fleurs/résines spéciales). Données réelles Shopify. */
const BOUTIQUE = [
  { slug:"pink-panther", nom:"Pink Panther", kind:"simple", cat:"fleurs", price:30, img:"pink-panther.jpg", c:["#f3b0c0","#8a3a5a"], desc:"Small buds · agrumes 🍊", body:"Aspect : une belle poignée de small buds hyper odorantes, sucrée et terreuse.\nGoût : explosion d'agrumes au nez — la musique de la Panthère rose tourne en boucle, ne nous remerciez pas… Ahahah !\nTaux de CBD : medium ++" },
  { slug:"trim", nom:"Trim CBD · fait maison", kind:"simple", cat:"resines", opts:[["10 g",19],["Le lot",30]], img:"trim.jpg", c:["#cfe0a0","#5a6a2e"], desc:"Mélange maison 🌿", body:"Trim CBD maison — un savant mélange de nos différentes fleurs de CBD #WITHLOVE. Parfait pour vos infusions ou à consommer seul ! Vendu par 10 g." },
  { slug:"bonbon-tc-10", nom:"Bonbon T*C 10 mg", kind:"simple", cat:"bonbons", price:3, img:"bonbon-tc-10.jpg", c:["#f3c27a","#c98a3a"], desc:"Coup de cœur 🍬", body:"Des bonbons ? Qui sont bons, et qui détendent, ça existe ? ÉVIDEMMENT — c'est un vrai produit COUP DE CŒUR chez WOOD !" },
  { slug:"bonbon-tc-20", nom:"Bonbon T*C 20 mg", kind:"simple", cat:"bonbons", opts:[["À l'unité",5.90],["Les 6 · 1 offert",29.50],["Les 12",59]], img:"bonbon-tc-20.jpg", c:["#f0a0b0","#b5405a"], desc:"Dosage ++ 🍬", body:"Le dosage supérieur de notre gamme de bonbons CBD — à l'unité, en pack de 6 (1 offert) ou de 12." },
  { slug:"bonbon-cbd-20", nom:"Bonbon CBD 20 mg", kind:"simple", cat:"bonbons", price:1.50, img:"bonbon-cbd-20.jpg", c:["#c6e3a0","#5a8a3a"], desc:"La gourmandise 🍬", body:"La gourmandise s'invite dans votre détente — un bonbon CBD 20 mg à prix doux." },
  { slug:"pack-mix-bonbons", nom:"Pack Mix Bonbons CBD", kind:"simple", cat:"bonbons", price:29.90, img:"pack-mix-bonbons.jpg", c:["#f3c7e0","#8a3a6b"], desc:"Assortiment 🍬", body:"Découvrez l'expérience gustative du CBD… la gourmandise s'invite dans votre détente. Un assortiment à partager." },
  { slug:"greengo", nom:"Feuille & Carton Greengo", kind:"simple", cat:"accessoires", price:3, img:"greengo.jpg", c:["#cfe0a0","#5a7a2e"], desc:"Papier non blanchi", body:"Papier non blanchi 100 % sans chlore, gomme arabique naturelle (14 g/m²), carton recyclé (200 g/m², 78×38 mm). 50 feuilles." },
  { slug:"grinder-plastique", nom:"Grinder plastique", kind:"simple", cat:"accessoires", price:5, img:"grinder-plastique.jpg", c:["#cfd0d0","#5a6060"], desc:"Transparent", body:"Un grinder transparent qui mixe et broie toutes vos fleurs." },
  { slug:"raw-slim", nom:"Feuilles RAW · slim", kind:"simple", cat:"accessoires", price:2.50, img:"raw-slim.jpg", c:["#e0cfa0","#8a6a3a"], desc:"100 % naturelles", body:"100 % naturelles, fibres non blanchies (lin et chanvre)." },
  { slug:"grinder-incurve", nom:"Grinder incurvé", kind:"simple", cat:"accessoires", opts:[["Standard",10],["Grand",15]], img:"grinder-incurve.jpg", c:["#cfd0d0","#45505a"], desc:"Broyage incurvé", body:"Partie broyage incurvée (couvercle et intérieur) : originalité et efficacité." },
  { slug:"jass", nom:"Cartons Jass · filtres", kind:"simple", cat:"accessoires", price:0.90, img:"jass.jpg", c:["#e0d0b0","#8a7050"], desc:"50 filtres", body:"Format Slim Brown, non blanchi, 50 filtres perforés par carnet (taille M, carton)." },
  { slug:"tshirt-totally-stoned", nom:"T-shirt Oversized · Totally Stoned", kind:"simple", cat:"merch", price:39.90, opts:[["S",39.90],["M",39.90],["L",39.90],["XL",39.90],["2XL",39.90],["3XL",39.90]], img:"tshirt-totally-stoned.jpg", c:["#cfd0cf","#45504a"], desc:"Coton · mixte", body:"En coton, effet légèrement délavé. Modèle MIXTE disponible du S au 3XL." },
  { slug:"tshirt-weed-chill", nom:"T-shirt · Weed & Chill", kind:"simple", cat:"merch", price:39.90, opts:[["S",39.90],["M",39.90],["L",39.90],["XL",39.90],["2XL",39.90],["3XL",39.90]], img:"tshirt-weed-chill.jpg", c:["#bfe3b0","#3a7a4a"], desc:"Coton · mixte", body:"En coton, coupe classique (regular). Modèle MIXTE disponible du S au 3XL." },
  { slug:"carte-cadeau", nom:"Carte-cadeau WOOD", kind:"simple", cat:"carte", opts:[["10 €",10],["25 €",25],["50 €",50],["100 €",100],["200 €",200],["500 €",500]], img:"carte-cadeau.jpg", c:["#cbf096","#2f9e6b"], desc:"Le bon cadeau 🎁", body:"Offrez WOOD : choisissez un montant et vous recevez un code cadeau unique (format WOOD-XXXX-XXXX) à la validation. Il se saisit directement dans le champ « code » au paiement — le solde est réutilisable jusqu'à épuisement — ou se présente en boutique. Montant au choix, de 10 à 500 €." },
];
const CATLBL={fleurs:"Fleurs",resines:"Résines",accessoires:"Accessoires",merch:"Le Shop WOOD",bonbons:"Bonbons",carte:"Carte-cadeau"};
/* Helpers panier compatibles grammage + produits simples */
function itemBase(x){const pf=byId(x.slug);return pf&&pf.p?pf.p[0]:null;}
function itemSave(x){if(!x.g)return 0;const b=itemBase(x);if(!b)return 0;return Math.round((1-(x.unit/x.g)/b)*100);}
function itemQty(x){return x.opt?x.opt:(x.g+" g");}
function itemTot(x){return x.g?(x.g*x.q)+" g":(x.opt?x.q+"×":"");}
function simplePrice(f){return f.opts?Math.min.apply(null,f.opts.map(o=>o[1])):f.price;}
function simpleCardHTML(f,i){
  const d=['d1','d2','d3','d4'][i%4];
  const pre=f.opts&&f.opts.length>1?'dès ':'';
  const media=f.img?`<img class="cloche" src="assets/products/${f.img}${IMGV}" alt="${f.nom}" loading="lazy" onerror="this.outerHTML='<div class=&quot;cloche&quot;>'+window.__cloche('${f.slug}')+'</div>'">`:`<div class="cloche">${clocheSVG(f.c||['#cbf096','#2f9e6b'],f.slug)}</div>`;
  return `<article class="card reveal ${d}">
    <a class="card-media" href="produit.html?f=${f.slug}" aria-label="${f.nom}">
      <div class="halo" style="background:radial-gradient(circle,${(f.c||['#cbf096'])[0]}66,transparent 70%)"></div><div class="shine"></div>
      ${media}
      <span class="card-view">Voir le produit →</span>
    </a>
    <button class="card-fav${isFav(f.slug)?' on':''}" data-fav="${f.slug}" aria-label="Ajouter aux favoris">${isFav(f.slug)?'♥':'♡'}</button>
    <div class="card-body">
      <a class="card-name" href="produit.html?f=${f.slug}">${f.nom}</a>
      <div class="card-desc">${f.desc||''}</div>
      <div class="simple-price">${pre}<b>${euro(simplePrice(f))}</b></div>
      <a class="card-add simple-see" href="produit.html?f=${f.slug}">Voir le produit →</a>
    </div>
  </article>`;
}
function simpleBuyBlock(f){
  const sel=f.opts?`<div class="cp-sel-wrap"><select class="cp-select" data-sb-select aria-label="Option">${f.opts.map((o,i)=>`<option value="${i}">${o[0]} · ${euro(o[1])}</option>`).join("")}</select><svg class="cp-sel-ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></div>`:`<div class="sb-one">${euro(f.price)}</div>`;
  return `<div class="card-pick" role="group" aria-label="Choisir et ajouter">
    <div class="cp-ctl">${sel}
      <div class="cp-qty" role="group" aria-label="Quantité"><button type="button" data-cp-dec aria-label="Diminuer la quantité">−</button><span class="cp-n">1</span><button type="button" data-cp-inc aria-label="Augmenter la quantité">+</button></div>
    </div>
    <button class="card-add" data-sb-add="${f.slug}">Ajouter au pochon</button>
  </div>`;
}
function cartAddSimple(f,unit,opt,qty){qty=qty||1;const ex=cart.find(x=>x.slug===f.slug&&x.opt===opt);if(ex)ex.q+=qty;else cart.push({slug:f.slug,nom:f.nom,g:0,unit:unit,q:qty,opt:opt||null});saveCart();updateCartBadges();if(window.__renderCart)window.__renderCart();return qty;}
function renderSimpleProduct(f){
  const root=document.getElementById("product");
  const media=f.img?`<img src="assets/products/${f.img}${IMGV}" alt="${f.nom}" onerror="this.outerHTML='<div class=&quot;cloche big&quot;>'+window.__cloche('${f.slug}')+'</div>'">`:`<div class="cloche big">${clocheSVG(f.c||['#cbf096','#2f9e6b'],f.slug)}</div>`;
  const body=(f.body||f.desc||"").split("\n").filter(Boolean).map(p=>`<p>${p}</p>`).join("");
  /* Vérificateur de solde (carte cadeau) — interroge la base, utilisable en boutique */
  const checker=f.slug==="carte-cadeau"?`
        <div class="gift-check">
          <h4>🔎 Vérifier le solde d'une carte</h4>
          <div class="gc-row"><input id="gcInput" type="text" placeholder="WOOD-XXXX-XXXX" autocomplete="off" aria-label="Code carte cadeau" maxlength="14"><button class="btn btn-ghost" id="gcBtn" type="button">Vérifier</button></div>
          <p class="gc-res" id="gcRes" hidden></p>
        </div>`:"";
  root.innerHTML=`
    <a class="breadcrumb" href="fleurs.html?cat=${f.cat}">← ${CATLBL[f.cat]||'Boutique'}</a>
    <div class="product">
      <div class="product-media"><div class="halo" style="background:radial-gradient(circle,${(f.c||['#cbf096'])[0]}55,transparent 70%)"></div>${media}</div>
      <div class="product-info">
        <span class="badge badge-classic">${CATLBL[f.cat]||'Boutique'}</span>
        <h1>${f.nom}</h1>
        <p class="p-desc">${f.desc||''}</p>
        ${simpleBuyBlock(f)}
        <div class="p-reassure"><span>🚚 Livraison discrète 24-48h</span><span>🔒 Paiement sécurisé</span><span>🔞 Réservé aux +18 ans</span></div>
        <div class="accordions"><details open><summary>Description</summary>${body}</details></div>
        ${checker}
      </div>
    </div>`;
  document.title=`${f.nom} — WOOD CBD`;
  const gcb=document.getElementById("gcBtn");
  if(gcb) gcb.addEventListener("click",async()=>{
    const code=(document.getElementById("gcInput").value||"").trim().toUpperCase();
    const res=document.getElementById("gcRes"); res.hidden=false;
    if(!/^WOOD-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)){res.textContent="Format attendu : WOOD-XXXX-XXXX";res.className="gc-res err";return;}
    res.textContent="Vérification…";res.className="gc-res";
    const gc=await lookupGift(code);
    if(gc&&gc.balance>0){res.textContent=`✅ Carte valide · solde ${euro(gc.balance)}`;res.className="gc-res ok";}
    else if(gc){res.textContent="Cette carte est épuisée.";res.className="gc-res err";}
    else{res.textContent="Carte introuvable.";res.className="gc-res err";}
  });
}
const TIER = { boostes:{label:"Boostés",cls:"badge-boost"}, soft:{label:"Soft",cls:"badge-soft"}, classique:{label:"Classique",cls:"badge-classic"} };
const GRAMS = [1,3,5,10];
const byId = s => FLEURS.find(f=>f.slug===s) || BOUTIQUE.find(f=>f.slug===s) || null;
/* Un prix ne s'écrit jamais « 11,8 € » : les centimes se notent sur deux chiffres. */
const euro = n => (Number(n) % 1 === 0)
  ? Number(n).toLocaleString("fr-FR") + " €"
  : Number(n).toLocaleString("fr-FR", {minimumFractionDigits:2, maximumFractionDigits:2}) + " €";

/* ---- Cloche repli SVG ---- */
function clocheSVG(c,id){const g=`b${id}`;return `<svg class="cloche-svg" viewBox="0 0 200 250" width="100%" aria-hidden="true"><defs><radialGradient id="${g}" cx="45%" cy="38%" r="70%"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></radialGradient></defs><ellipse cx="100" cy="226" rx="66" ry="12" fill="#000" opacity=".4"/><rect x="42" y="214" width="116" height="16" rx="8" fill="#6b5a3a"/><g fill="url(#${g})"><circle cx="100" cy="150" r="30"/><circle cx="78" cy="138" r="20"/><circle cx="122" cy="140" r="20"/><circle cx="90" cy="120" r="18"/><circle cx="112" cy="122" r="17"/><circle cx="100" cy="106" r="15"/><circle cx="74" cy="160" r="15"/><circle cx="126" cy="162" r="15"/><circle cx="100" cy="176" r="18"/></g><path d="M100 42c-40 0-66 30-66 70v86h132v-86c0-40-26-70-66-70Z" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)" stroke-width="2"/><ellipse cx="100" cy="44" rx="10" ry="6" fill="rgba(255,255,255,.25)"/></svg>`;}
/* Produits sans vraie photo (perdue/à générer) → placeholder "Image bientôt disponible" */
const NOIMG=new Set(["ivory","nimbus-3000","golden-high"]);
function soonHTML(){return '<div class="img-soon"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 7h3l2-2h8l2 2h3v12H3z"/><circle cx="12" cy="13" r="3.4"/></svg><span>Image bientôt disponible</span></div>';}
window.__cloche = s => { if(NOIMG.has(s))return soonHTML(); const f=byId(s); return clocheSVG(f?f.c:["#8fd08a","#243a2a"], s); };
/* Visuel « Fleur Mystère » : cloche sombre, fleur dans l'ombre + gros ? vert WOOD */
function mysterySVG(){return `<svg class="cloche-svg" viewBox="0 0 200 250" aria-hidden="true"><defs><radialGradient id="myg" cx="50%" cy="40%" r="62%"><stop offset="0" stop-color="#1b2c20"/><stop offset="1" stop-color="#0a120c"/></radialGradient></defs><ellipse cx="100" cy="226" rx="66" ry="12" fill="#000" opacity=".5"/><rect x="42" y="214" width="116" height="16" rx="8" fill="#5a4a2e"/><path d="M100 42c-40 0-66 30-66 70v86h132v-86c0-40-26-70-66-70Z" fill="url(#myg)" stroke="rgba(203,240,150,.22)" stroke-width="2"/><g fill="#2f5a3a" opacity=".5"><circle cx="100" cy="150" r="30"/><circle cx="78" cy="138" r="20"/><circle cx="122" cy="140" r="20"/><circle cx="90" cy="120" r="18"/><circle cx="112" cy="122" r="17"/><circle cx="100" cy="106" r="15"/><circle cx="74" cy="160" r="15"/><circle cx="126" cy="162" r="15"/><circle cx="100" cy="176" r="18"/></g><text x="100" y="170" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-size="128" font-weight="600" fill="#cbf096" opacity=".95">?</text><ellipse cx="100" cy="44" rx="10" ry="6" fill="rgba(255,255,255,.16)"/></svg>`;}

function catArtSVG(kind){const m={fleurs:["#2f9e57","#0e3b26"],resines:["#c98a3a","#5a3410"],boostes:["#2f9e6b","#063b45"],huiles:["#cbf096","#3a5a1e"],accessoires:["#9fb0a0","#2c3a30"],acc:["#8fb0a8","#23342c"],bonbons:["#e58fb6","#5a2340"],carte:["#cbf096","#2f7a4a"]};const c=m[kind]||m.fleurs;return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%"><rect width="400" height="300" fill="#141c16"/><path d="M-20 320C60 240 20 150 120 60c40-36 120 0 120 0s-30 120-120 170C60 270 20 300-20 320Z" fill="${c[0]}" opacity=".5"/></svg>`;}
window.__catSVG = catArtSVG;
function catArt(kind){return `<img src="assets/scenes/cat-${kind}.jpg${IMGV}" alt="" loading="lazy" onerror="this.outerHTML=window.__catSVG('${kind}')">`;}

/* ---- Méta démo (note/avis/sticker) — à remplacer par les vrais avis Google ---- */
const META={
  "nimbus-3000":{n:"5,0",c:87,tag:"top"},"ivory":{n:"4,9",c:64,tag:""},"velvet-kush":{n:"4,8",c:52,tag:""},
  "pastraweed":{n:"4,9",c:41,tag:"new"},"euphoria":{n:"5,0",c:118,tag:"top"},"purple":{n:"4,9",c:73,tag:""},
  "bloody-mary":{n:"4,7",c:38,tag:""},"cosmic-cbg":{n:"4,8",c:29,tag:"new"},"charlotte":{n:"4,8",c:55,tag:""},
  "rainbow":{n:"4,9",c:61,tag:""},"orange-bud":{n:"4,7",c:44,tag:""},"plutonium":{n:"4,8",c:33,tag:""},
  "fanta-hazy":{n:"4,6",c:22,tag:""},
};
const STICK={top:"★ Top vente",new:"✦ Nouveau"};
/* ---- Urgence stock (démo, déterministe) ---- */
function cardStock(slug){
  const h=[...slug].reduce((a,c)=>a+c.charCodeAt(0),0), r=h%7;
  if(r<2) return `<div class="card-stock low">🔥 Plus que <b>${3+(h%4)}</b> en stock</div>`;
  if(r<4) return `<div class="card-stock">⏳ Stock limité</div>`;
  return "";
}
/* ---- Bloc d'achat : une ligne par grammage, avec + / − et economie ---- */
function buyBlock(f){
  const base=f.p[0]; // prix du 1 g = reference €/g la plus chere
  const opts=GRAMS.map((g,gi)=>{
    const pg=Math.round(f.p[gi]/g*10)/10;
    const sv=Math.round((1-(f.p[gi]/g)/base)*100);
    return `<option value="${gi}"${gi===1?' selected':''}>${g} g · ${f.p[gi]} €${sv>=8?` · −${sv}%`:''}</option>`;
  }).join("");
  return `<div class="card-pick" data-pick="${f.slug}" role="group" aria-label="Choisir le grammage et la quantité">
    <div class="cp-ctl">
      <div class="cp-sel-wrap">
        <select class="cp-select" data-cp-select aria-label="Grammage de ${f.nom}">${opts}</select>
        <svg class="cp-sel-ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="cp-qty" role="group" aria-label="Quantité">
        <button type="button" data-cp-dec aria-label="Diminuer la quantité">−</button>
        <span class="cp-n">1</span>
        <button type="button" data-cp-inc aria-label="Augmenter la quantité">+</button>
      </div>
    </div>
    <div class="cp-total" data-cp-total></div>
    <button class="card-add" data-add-pick="${f.slug}">Ajouter au pochon</button>
  </div>`;
}
/* ---- Met a jour le total d'un bloc d'achat (prix, poids, bouton) ---- */
function pickState(pick){
  const f=byId(pick.dataset.pick); if(!f)return null;
  const sel=pick.querySelector("[data-cp-select]"); const gi=sel?+sel.value:1;
  const q=Math.max(1,+pick.querySelector(".cp-n").textContent||1);
  const g=GRAMS[gi]; return {f,gi,g,q,tp:f.p[gi]*q,tg:g*q};
}
function updatePick(pick){
  if(!pick)return; const s=pickState(pick); if(!s)return;
  const base=s.f.p[0], pg=Math.round(s.f.p[s.gi]/s.g*10)/10, sv=Math.round((1-(s.f.p[s.gi]/s.g)/base)*100);
  const tot=pick.querySelector("[data-cp-total]"),add=pick.querySelector("[data-add-pick]");
  if(tot)tot.innerHTML=`${s.q>1?`${s.q} × ${s.g} g = <b>${s.tg} g</b>`:`<b>${s.g} g</b>`} · <b>${s.tp.toFixed(2)} €</b> <span class="cp-pg">(${pg} €/g)</span>${sv>=8?` <em class="cp-eco">−${sv}%</em>`:''}`;
  if(add)add.innerHTML=`Ajouter · <b>${s.tp.toFixed(2)} €</b>`;
  const sp=document.getElementById("pStickyPrice"); if(sp)sp.textContent=`${s.q} × ${s.g} g · ${s.tg} g · ${s.tp.toFixed(2)} €`;
  const sa=document.getElementById("pStickyAdd"); if(sa)sa.disabled=false;
  return s;
}
/* ---- Carte produit ---- */
function cardHTML(f,i){
  if(f.kind==='simple')return simpleCardHTML(f,i);
  const t=TIER[f.tier], pg=Math.round((f.p[3]/10)*10)/10, m=META[f.slug]||{n:"4,8",c:30,tag:""};
  return `<article class="card reveal ${['d1','d2','d3','d4'][i%4]}">
    <a class="card-media" href="produit.html?f=${f.slug}" aria-label="${f.nom}">
      <div class="halo" style="background:radial-gradient(circle,${f.c[0]}66,transparent 70%)"></div><div class="shine"></div>
      <img class="cloche" src="assets/products/${f.slug}.jpg${IMGV}" alt="Fleur CBD ${f.nom} sous cloche" loading="lazy"
        onerror="this.outerHTML='<div class=&quot;cloche&quot;>'+window.__cloche('${f.slug}')+'</div>'">
      <div class="card-badges"><span class="badge ${t.cls}">${t.label}</span>${m.tag?`<span class="sticker st-${m.tag}">${STICK[m.tag]}</span>`:""}</div>
      <span class="card-view">Voir le produit →</span>
      <button class="card-qv" data-qv="${f.slug}" aria-label="Aperçu rapide" title="Aperçu rapide"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg><span>Aperçu</span></button>
    </a>
    <button class="card-fav${isFav(f.slug)?' on':''}" data-fav="${f.slug}" aria-label="Ajouter aux favoris">${isFav(f.slug)?'♥':'♡'}</button>
    <div class="card-body">
      <div class="card-rate"><span class="stars">★★★★★</span><b>${m.n}</b><span class="rate-c">(${m.c})</span></div>
      <a class="card-name" href="produit.html?f=${f.slug}">${f.nom}</a>
      <div class="card-desc">${f.desc} · ${f.type==='resine'?'Résine CBD':'Fleur CBD'}</div>
      ${molLine(f.slug)}
      ${cardStock(f.slug)}
      ${buyBlock(f)}
    </div>
  </article>`;
}

/* ---- MOLÉCULES & INTENSITÉS (données Ana, 12/11 — jamais inventé) ---- */
const MOLEC={
  "euphoria":{mol:"CBD + CBE",cls:"mol-boost",lvl:4,ia:"Ultra fort · fruité",ar:"Exotic"},
  "pastraweed":{mol:"CBD +",cls:"mol-boost",lvl:4,ia:"Ultra fort · terreux",ar:"Kush"},
  "ivory":{mol:"CBD + CBE",cls:"mol-boost",lvl:4,ia:"Ultra fort",ar:"Weed"},
  "nimbus-3000":{mol:"CBD +",cls:"mol-boost",lvl:4,ia:"Ultra fort",ar:"Weed"},
  "green-skunk":{mol:"CBD",cls:"",lvl:3,ia:"Fort",ar:"Sucré · Herbacé",premium:"Indoor premium"},
  "gelato":{mol:"CBD",cls:"",lvl:3,ia:"Fort",ar:"Sucré"},
  "ice-cream":{mol:"CBD",cls:"",lvl:4,ia:"Ultra-fort",ar:"Caramélisé · Terreux"},
  "fanta-hazy":{mol:"CBD",cls:"",lvl:2,ia:"Médium",ar:"Agrumes"},
  "purple-saphir":{mol:"CBD",cls:"",ar:"Fruité"},
  "fleur-mystere":{mol:"CBD",cls:"",lvl:2,ia:"Médium",ar:"Surprise"},
  "godzilla":{mol:"CBD",cls:"",lvl:3,ia:"Médium+",ar:"Kush · Épicé"},
  "bio-peach":{mol:"CBD",cls:"",lvl:3,ia:"Fort",ar:"Pêche"},
  "bubba-kush":{mol:"CBD",cls:"",lvl:2,ia:"Médium",ar:"Kush · Épicé"},
  "tropical-kush":{mol:"CBD",cls:"",lvl:2,ia:"Médium",ar:"Sucré · Fruité"},
  "sweet-purple":{mol:"CBD",cls:"",lvl:3,ia:"Fort",ar:"Sucré · Fruité"},
  "skittlez":{mol:"CBD",cls:"",lvl:2,ia:"Médium",ar:"Sucré"},
  "fruit-cake":{mol:"CBD",cls:"",ar:"Fruité · Terreux"},
  "tropical-dream":{mol:"CBD",cls:"",lvl:2,ia:"Médium",ar:"Exotic"},
  "tangerine-dream":{mol:"CBD",cls:"",lvl:2,ia:"Médium",ar:"Agrumes"},
  "tonic-haze":{mol:"CBD",cls:"",lvl:2,ia:"Médium",ar:"Terreux · Citron"},
  "harlequin":{mol:"CBD",cls:"",ar:"Sucré · Fruité"},
  "baby-cannatonic":{mol:"CBD",cls:"",ar:"Doux"},
  "stoned":{mol:"CBD +",cls:"mol-boost",lvl:4,ia:"Ultra fort",ar:"Hash 3× filtré"},
  "golden-high":{mol:"CBD + CBE",cls:"mol-boost",lvl:4,ia:"Ultra fort",ar:"Pollen · Exotic"},
  "jelly-high":{mol:"CBD + CBE",cls:"mol-boost",lvl:4,ia:"Ultra fort",ar:"Caramel"},
  "moonrock":{mol:"CBD",cls:"",lvl:3,ia:"Fort",ar:"Épicé · Fruité"},
  "beldia":{mol:"CBD",cls:"",ar:"Épicé · Marocain"},
  "cbn-cream":{mol:"CBN",cls:"mol-cbg",ar:"Sommeil"},
};
function idotsHTML(lvl){let s='<span class="idots" aria-label="Intensité">';for(let k=1;k<=4;k++){s+=`<i class="${k<=lvl?'on':''}"></i>`;}return s+'</span>';}
function molLine(slug){const m=MOLEC[slug];if(!m)return"";
  const chip=`<span class="mol-chip ${m.cls||''}">${m.mol}</span>`;
  const ar=m.ar?`<span class="mol-arome">${m.ar}</span>`:'';
  const inten=m.lvl?`<div class="mol-inten"><span class="mi-k">Intensité</span>${idotsHTML(m.lvl)}<span class="mi-l">${m.ia}</span></div>`:'';
  return `<div class="mol-line">${chip}${ar}</div>${inten}`;}
function pMolHTML(slug){const m=MOLEC[slug];if(!m)return"";
  const inten=m.lvl?`<div class="pm-b"><span class="pm-k">Intensité</span><span class="pm-v">${idotsHTML(m.lvl)} <span style="font-size:.85rem;color:var(--muted)">${m.ia}</span></span></div>`:'';
  const ar=m.ar?`<div class="pm-b"><span class="pm-k">Arôme</span><span class="pm-v">${m.ar}</span></div>`:'';
  const prem=m.premium?`<div class="pm-b"><span class="pm-k">Gamme</span><span class="pm-v">${m.premium}</span></div>`:'';
  return `<div class="p-mol"><div class="pm-b"><span class="pm-k">Molécule</span><span class="pm-v">${m.mol}</span></div>${inten}${ar}${prem}</div>`;}
/* ---- Descriptions VERBATIM (catalogue Shopify certifié d'Ana — jamais modifié) ---- */
const DESC={
  "nimbus-3000":"Variété : Nimbus 3000 (CBD+/STRONG)\nNotre Nimbus 3000, c'est une valeur sûre, niveau expert ! Outre son goût savoureux aux notes tropicales, cette fleur a la particularité d'être riche en CBD et BOOSTÉE, un atout majeur pour les consommateurs en quête de sensations fortes.\nCette variété exceptionnelle vous transporte dans un voyage aromatique, en plus de son profil de CBD élevé. Profitez d'une expérience ULTRA relaxante et apaisante grâce à cette fleur de CBD de qualité supérieure.\n⚠️ CBD BOOSTÉ : avec son taux puissant en CBD+, la Nimbus 3000 te procure une relaxation TRÈS profonde, à consommer avec modération.",
  "ivory":"Variété : Ivory (CBD+/STRONG)\nNotre Ivory, c'est une fleur pour les vrais puristes et connaisseurs, niveau expert ! Outre son goût savoureux, cette fleur a la particularité d'être riche en CBD et BOOSTÉE, un atout majeur pour les consommateurs en quête de sensations fortes.\nCette variété exceptionnelle vous transporte dans un voyage aromatique, en plus de son profil de CBD élevé. Profitez d'une expérience ULTRA relaxante et apaisante grâce à cette fleur de CBD de qualité supérieure.\n⚠️ CBD BOOSTÉ : avec son taux puissant en CBD + CBE, l'Ivory te procure une relaxation TRÈS profonde, à consommer avec modération. Son nom en dit long sur son potentiel !",
  "pastraweed":"Variété : Pastraweed (BOOSTÉ/STRONG)\nUne valeur sûre ! Goût savoureux, riche en CBD et BOOSTÉE : un voyage aromatique sur un profil de CBD élevé.\n⚠️ Fleur boostée, à consommer avec modération.",
  "euphoria":"Variété : Euphoria (BOOSTÉ/STRONG)\nNotre Euphoria, c'est LA pépite chez WOOD ! Une saveur exceptionnellement fruitée, riche en CBD et BOOSTÉE, pour une expérience ULTRA relaxante. Exclusivité WOOD CBD !\n⚠️ CBD BOOSTÉ (CBD + CBE), relaxation TRÈS profonde, à consommer avec modération. Le conseil d'Ana : parsemer légèrement, 2-3 taffs et on pose le J… Bon voyage ♥",
  "fanta-hazy":"🍋 Acidulée · 🍭 Sucrée\nGoût : offrant une explosion fruitée en bouche, la Fanta Hazy et son odeur sont le fruit d'une longue recherche de notre part, capturant l'essence même de la fleur sucrée et unique.\nTaux de CBD : la Fanta Hazy possède un taux de CBD garantissant une expérience relaxante et apaisante.",
  "stoned":"Variété : STONED (BOOSTÉ/STRONG)\nLe 3× FILTRÉ de référence ! Goût délicieux, texture idéale, riche en CBD et BOOSTÉE pour des sensations fortes.\n⚠️ Résine boostée, à consommer avec modération.",
  "golden-high":"Variété : Golden HIGH (BOOSTÉ/STRONG)\nLe POLLEN STRONG référence ! Riche en CBD et BOOSTÉE, un vrai voyage aromatique.\nGoût : épices exotiques, trésors des contrées lointaines. Pollen mousseux enrichi de CBE, effet puissant. Pas besoin de le chauffer avant de l'effriter : BEST TEXTURE EVER !",
  "jelly-high":"🍫 Le Caramelo qui manque à ta vie.\nHASH type Caramel de référence ! Riche en CBD et BOOSTÉE. Goût : épices exotiques. Enrichie de CBE, effet puissant.\nPas besoin de le chauffer avant de l'effriter : BEST TEXTURE EVER !",
  "moonrock":"Variété : Moon Rock — « Le Saint Graal de la Relaxation »\nGoût : la variété Moon Rock est réputée pour son goût unique qui allie des notes épicées et fruitées.\nTaux de CBD : se distingue par son taux de CBD puissant, offrant une expérience relaxante intense. Avis aux amateurs 💥",
  "beldia":"🍫 Filament / boulette\nAspect : texture fondante, couleur charbonneuse, un produit authentique et raffiné.\nGoût : explosion de saveurs épicées, direction les souks marocains, pour une touche traditionnelle.",
  "cbn-cream":"La texture idéale — ⚠️ ATTENTION, C'EST POUR DORMIR 🌔\nRésine CBN Cream : goût exquis, elle aide à améliorer le sommeil. Du CBD « bodybuildé », marocain — « si t'arrives pas à dormir ».",
  "green-skunk":"🍭 Sucrée · 💥 Forte · 🌿 Herbacée\nTaux de CBD : FORT.\nLe mot de l'équipe WOOD : C'EST DE LA BOMBE !",
  "gelato":"Variété : Gelato\nGoût : ses saveurs intenses et robustes sont accompagnées de douces notes sucrées, créant une combinaison envoûtante pour les papilles. Chaque inhalation est une expérience gustative profonde.\nTaux de CBD : reconnue pour son taux de CBD puissant.",
  "ice-cream":"🍮 Caramélisée · 🌲 Terreuse · 🍭 Sucrée\nGoût : un dessert sucré, des saveurs intenses, fidèle à l'authenticité du cannabis.\nAspect : compacte et dense, parmi les « cali » de haut niveau, têtes denses et résineuses.\nTaux de CBD : extrêmement puissant.",
  "purple-saphir":"Découvrez la fleur de CBD Purple Saphir, au goût si délicieux qu'il faut absolument l'essayer. Variété très rare à obtenir, offrant une expérience gustative exceptionnelle.\nNe passez pas à côté de cette expérience sensorielle unique.",
  "fleur-mystere":"🪻 Delicioso\nGoût : un goût surprenant, des effets qui détendent, une odeur particulière — « la fleur magique ».\nTaux de CBD : relaxant et apaisant.",
  "godzilla":"🌶 Épicé & grosses buds\nVariété : Godzilla 🦖 — « Mind Eraser »\nGoût : un mélange complexe d'arômes, aux notes terreuses, citronnées et épicées.\nTaux de CBD : moyen ++",
  "bio-peach":"Variété : BIO Peach — « Iced Tea baby »\nGoût : fruité captivant, avec des notes sucrées de pêche. BIO et Française, cocorico ! 🇫🇷\nTaux de CBD : puissant, relaxation profonde.",
  "bubba-kush":"🌲 Terreuse · 🌶 Épicée\nGoût : une explosion de saveur, un classique de notre sélection.\nTaux de CBD : expérience relaxante et apaisante.",
  "tropical-kush":"🍭 Sucrée · 🍓 Fruitée\nGoût : un goût surprenant, des effets qui détendent, une odeur particulière — « la fleur magique ».\nTaux de CBD : relaxant et apaisant.",
  "sweet-purple":"Variété : Sweet Purple\nGoût : fruité captivant, notes délicieuses et sucrées, une expérience gustative envoûtante.\nTaux de CBD : puissant, pour une relaxation profonde et apaisante.",
  "skittlez":"Variété : Skittlez\nGoût : offrant une explosion de saveur, notre Skittlez vous séduit par sa puissance, ce qui en fait un classique de notre sélection pour les amateurs de fleur de qualité ! À consommer SANS MODÉRATION !\nTaux de CBD : garantit une expérience relaxante et apaisante.",
  "fruit-cake":"🍓 Fruitée · 🌲 Terreuse\nGoût : explosion d'agrumes au nez.\nAspect : une belle poignée de small buds hyper odorantes, sucrée et terreuse.",
  "tropical-dream":"Goût : offrant une explosion de saveur, notre Tropical Dream et son odeur est en fait le classique de notre sélection.\nTaux de CBD : garantit une expérience relaxante et apaisante.",
  "tangerine-dream":"Goût : offrant une explosion de saveur, notre Tangerine Dream et son odeur est en fait le classique de notre sélection.\nTaux de CBD : garantit une expérience relaxante et apaisante.",
  "tonic-haze":"Variété : Tonic Haze\nGoût : Terreuse / Citronnée.\nTaux de CBD : MÉDIUM.\nLe mot de l'équipe WOOD : si tu veux continuer à bosser tout en étant détendu 😎",
  "harlequin":"Variété : Harley — « Sweet Bliss »\nGoût : sucré et fruité, qui rappelle les bonbons de l'enfance.",
  "baby-cannatonic":"Oups, c'est en rupture ! Merci beaucoup 🙏\n(La Baby Cannatonic revient très vite en boutique.)",
};
function descHTML(f){
  if(DESC[f.slug])return DESC[f.slug].split("\n").filter(Boolean).map(p=>`<p>${p}</p>`).join("");
  const m=MOLEC[f.slug]||{};const bits=[];
  if(m.mol)bits.push(m.mol);if(m.ia)bits.push("intensité "+m.ia.toLowerCase());if(m.ar)bits.push("profil "+m.ar.toLowerCase());
  return `<p>${f.nom} — ${bits.join(" · ")||"fleur de CBD"}. Sélectionnée par WOOD et présentée sous cloche, avec notre exigence habituelle.</p>`;
}

/* ---- PROMOS « Bons plans » (offres réelles Ana — style chic) ---- */
const PROMOS=[
  {name:"Fleur Mystère",tag:"Mystère",mystery:true,img:"fleur-mystere-promo.jpg",desc:"La surprise du moment · on choisit pour toi",c:["#1b2c20","#0a120c"],price:"dès 9 €/g",sub:"3 g 25 € · 5 g 40 € · 10 g 70 € · 25 g 140 €"},
  {name:"La promo 15 g",tag:"Offre",desc:"GTA · la variété du moment",c:["#c8f58f","#4ca72c"],price:"50 €",sub:"les variétés tournent régulièrement"},
  {name:"La promo 10 g",tag:"Offre",desc:"Une fruitée + une terreuse",c:["#f3c27a","#b5651d"],price:"30 €",sub:"ou 20 g pour 50 €"},
  {name:"Le Trim",tag:"Petit prix",desc:"Gros volume, petit budget",c:["#cfe39a","#7a8a2e"],price:"dès 15 €",sub:"10 g 15 € · 25 g 30 € · 100 g 100 €"},
];
function promoHeroHTML(p){
  return `<div class="ph-in">
    <div class="ph-txt">
      <span class="ph-flag">La promo du moment</span>
      <h3 class="ph-name">${p.name}</h3>
      <p class="ph-desc">${p.desc}</p>
      <div class="ph-price">${p.price}</div>
      <div class="ph-sub">${p.sub}</div>
      <a class="btn btn-primary ph-cta" href="fleurs.html">Voir l'offre <span class="arr">→</span></a>
    </div>
    <div class="ph-art" aria-hidden="true"><div class="ph-halo" style="background:radial-gradient(circle,${p.c[0]}66,transparent 70%)"></div><div class="cloche">${p.img?`<img src="assets/products/${p.img}${IMGV}" alt="${p.name}" loading="lazy" style="width:100%;max-width:320px;aspect-ratio:1;object-fit:cover;border-radius:20px;box-shadow:0 18px 50px rgba(0,0,0,.45)">`:(p.mystery?mysterySVG():clocheSVG(p.c,"ph"))}</div></div>
  </div>`;}
function promoMiniHTML(p){
  return `<a class="promo-mini" href="fleurs.html"><span class="pm-dot" style="background:${p.c[0]}"></span><span class="pm-main"><b>${p.name}</b><span class="pm-sub">${p.desc}</span></span><span class="pm-price">${p.price}</span></a>`;}

/* ===================== CHROME (header / footer / botnav / advisor) ===================== */
function markSVG(){return `<svg class="mark" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="12.5" stroke-linecap="round" aria-hidden="true"><path d="M50 42 V12 M14 42 H86 M24 20 L76 64 M76 20 L24 64"/><circle cx="50" cy="80" r="6.5" fill="currentColor" stroke="none"/></svg>`;}
function headerHTML(){return `<div class="container header-in">
  <a class="logo" href="index.html" aria-label="WOOD · CBD à Nice"><img class="logo-img" src="assets/icons/wood-logo.png?v=2" alt="WOOD" width="150" height="30"></a>
  <nav class="nav" aria-label="Navigation principale">
    <a href="fleurs.html">Fleurs</a><a href="fleurs.html?type=resine">Résines</a>
    <a href="fleurs.html?tier=boostes">Boostés</a><a href="index.html#boutiques">Boutiques</a><a href="index.html#histoire">L'histoire</a>
  </nav>
  <div class="header-cta">
    <button class="icon-btn search" aria-label="Rechercher"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg></button>
    <button class="icon-btn favBtn" id="favBtn" aria-label="Mes coups de cœur"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5.2 5.2 0 0 1 12 6a5.2 5.2 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg><span class="fav-count" id="favCount">0</span></button>
    <a class="icon-btn" id="cartBtn" href="panier.html" aria-label="Panier"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><span class="cart-count" id="cartCount">0</span></a>
    <button class="icon-btn burger" id="burger" aria-label="Menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
  </div></div>`;}
function footerHTML(){return `<div class="container">
  <div class="footer-cta reveal">
    <div><h3 class="serif">Rejoins le cercle WOOD</h3><p class="muted">Nouveautés, sélections et offres — directement dans ta boîte mail.</p></div>
    <form class="newsletter" onsubmit="return false"><input type="email" placeholder="Ton e-mail" aria-label="E-mail"><button class="btn btn-primary" type="submit">OK →</button></form>
  </div>
  <div class="footer-top">
    <div><div class="big-logo"><img class="logo-img logo-img-lg" src="assets/icons/wood-logo.png?v=2" alt="WOOD" height="40"></div>
      <p class="muted" style="margin:.6rem 0 1rem;max-width:30ch">La Maison du chanvre, à Nice. Si c'est WOOD, c'est GOOD.</p>
      <div class="socials"><a href="https://instagram.com/wood.cbdshop" target="_blank" rel="noopener">◎ Instagram</a><a href="https://facebook.com/Woodcbdshopnice" target="_blank" rel="noopener">ƒ Facebook</a></div></div>
    <div><h4>Boutique</h4><ul><li><a href="fleurs.html">Fleurs</a></li><li><a href="fleurs.html?type=resine">Résines</a></li><li><a href="fleurs.html?tier=boostes">Boostés</a></li><li><a href="fleurs.html?cat=accessoires">Accessoires</a></li><li><a href="fleurs.html?cat=merch">Le Shop</a></li></ul></div>
    <div><h4>Infos</h4><ul><li><a href="index.html#boutiques">Nos boutiques</a></li><li><a href="contact.html">Contact</a></li><li><a href="faq.html">FAQ</a></li><li><a href="index.html#histoire">L'histoire</a></li></ul></div>
    <div><h4>Légal</h4><ul><li><a href="mentions-legales.html">Mentions légales</a></li><li><a href="cgv.html">CGV</a></li><li><a href="confidentialite.html">Confidentialité</a></li><li><a href="confidentialite.html#cookies">Cookies</a></li></ul></div>
  </div>
  <div class="footer-pay"><span class="muted">Paiement 100 % sécurisé</span><span class="pay-ic">VISA</span><span class="pay-ic">Mastercard</span><span class="pay-ic">Apple&nbsp;Pay</span><span class="pay-ic">G&nbsp;Pay</span><span class="pay-ic">Viva.com</span></div>
  <div class="legal"><span>© 2026 WOOD CBD — JM BULLY · SIRET 888 112 836 00018 · THC &lt; 0,3 % · Vente interdite aux mineurs (18+).</span><span class="tag tag-maquette">Site de démonstration · aucune vraie commande</span></div></div>`;}
function botnavHTML(active){const I={home:'<path d="M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>',fleurs:'<path d="M12 2s5 4 5 10a5 5 0 0 1-10 0c0-6 5-10 5-10Z"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',cart:'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/>',shop:'<path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>'};
  const a=(k,href,lbl,cls="")=>`<a href="${href}" class="${cls}${active===k?' active':''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${I[k]}</svg>${lbl}</a>`;
  return a('home','index.html','Accueil')+a('fleurs','fleurs.html','Fleurs')+a('search','fleurs.html','Explorer')+`<a href="panier.html" data-cart-open class="bn-cart${active==='cart'?' active':''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${I.cart}</svg><span class="cart-count" id="cartCountM">0</span>Pochon</a>`+a('shop','index.html#boutiques','Boutiques');}
function advisorHTML(){return `<span class="ava">🌿</span><span class="txt">Besoin d'aide pour choisir ?<small>Ana te répond — sans pression.</small></span>`;}

function injectChrome(page){
  if(!document.querySelector(".announce")){const an=document.createElement("div");an.className="announce";an.setAttribute("aria-hidden","true");
    an.innerHTML=`<div class="announce-track">${Array(2).fill("<span>🎁 Livraison offerte dès 60 €</span><span>🔬 Testé en labo · THC &lt; 0,3 %</span><span>📍 2 boutiques à Nice</span><span>✳ Si c'est WOOD, c'est GOOD</span><span>🌿 Conseil sans pression</span>").join("")}</div>`;
    document.body.insertBefore(an,document.body.firstChild);}
  const h=document.querySelector('[data-chrome="header"]'); if(h){h.className="header";h.id="header";h.innerHTML=headerHTML();}
  const f=document.querySelector('[data-chrome="footer"]'); if(f){f.className="footer";f.innerHTML=footerHTML();}
  const b=document.querySelector('[data-chrome="botnav"]'); if(b){b.className="botnav";b.setAttribute("aria-label","Navigation mobile");b.innerHTML=botnavHTML(page);}
  const a=document.querySelector('[data-chrome="advisor"]'); if(a){a.className="advisor";a.id="advisor";a.innerHTML=advisorHTML();}
}

/* ===================== TOAST ===================== */
function toast(msg){let t=document.createElement("div");t.textContent=msg;Object.assign(t.style,{position:"fixed",left:"50%",bottom:"88px",transform:"translateX(-50%) translateY(20px)",background:"#17211a",color:"#f1f0e6",border:"1px solid #2c3a30",padding:".8em 1.2em",borderRadius:"999px",zIndex:99,fontWeight:"700",fontSize:".9rem",boxShadow:"0 18px 50px rgba(0,0,0,.5)",opacity:"0",transition:".3s cubic-bezier(.16,1,.3,1)",maxWidth:"90vw",textAlign:"center"});document.body.appendChild(t);requestAnimationFrame(()=>{t.style.opacity="1";t.style.transform="translateX(-50%) translateY(0)";});setTimeout(()=>{t.style.opacity="0";t.style.transform="translateX(-50%) translateY(20px)";setTimeout(()=>t.remove(),320);},2300);}

/* ===================== PANIER ===================== */
let cart=JSON.parse(localStorage.getItem("wood_cart")||"[]");
function saveCart(){localStorage.setItem("wood_cart",JSON.stringify(cart));}
function cartCount(){return cart.reduce((s,x)=>s+x.q,0);}
function updateCartBadges(){document.querySelectorAll("#cartCount,#cartCountM").forEach(e=>e.textContent=cartCount());}
function cartAdd(slug,g,qty){const f=byId(slug);if(!f)return 0;g=g||3;qty=qty||1;const gi=GRAMS.indexOf(g);const unit=f.p[gi>=0?gi:0];const ex=cart.find(x=>x.slug===slug&&x.g===g);if(ex)ex.q+=qty;else cart.push({slug,nom:f.nom,g,unit,q:qty});saveCart();updateCartBadges();if(window.__renderCart)window.__renderCart();return qty;}
function bumpCartBtn(){const b=document.getElementById("cartBtn");if(b)b.animate([{transform:"scale(1)"},{transform:"scale(1.25)"},{transform:"scale(1)"}],{duration:380,easing:"cubic-bezier(.16,1,.3,1)"});if(navigator.vibrate)navigator.vibrate(12);}
function addToCart(slug,g,qty){const f=byId(slug);if(!f)return;g=g||3;qty=qty||1;cartAdd(slug,g,qty);bumpCartBtn();const unit=f.p[GRAMS.indexOf(g)>=0?GRAMS.indexOf(g):0];toast(`Ajouté au pochon : ${f.nom} · ${g} g${qty>1?` ×${qty}`:''} · ${(unit*qty).toFixed(2)} € ✓`);openCartDrawer();}

/* ===================== PANIER TIROIR (drawer) ===================== */
const FREE_SHIP=60;
function cartSubtotal(){return cart.reduce((s,x)=>s+x.unit*x.q,0);}
function ensureCartDrawer(){
  let ov=document.getElementById("cartDrawer"); if(ov)return ov;
  ov=document.createElement("div"); ov.id="cartDrawer"; ov.className="cd-ov";
  ov.innerHTML=`<aside class="cd-panel" role="dialog" aria-label="Panier">
    <div class="cd-head"><div class="cd-head-t"><b>Ton pochon 🌿</b><span class="cd-count" id="cdCount"></span></div><button class="cd-close" aria-label="Fermer">✕</button></div>
    <div class="cd-ship" id="cdShip"></div>
    <div class="cd-items" id="cdItems"></div>
    <div class="cd-foot" id="cdFoot"></div>
  </aside>`;
  document.body.appendChild(ov);
  ov.addEventListener("click",e=>{
    if(e.target===ov||e.target.closest(".cd-close")){closeCartDrawer();return;}
    const inc=e.target.closest("[data-cd-inc]"),dec=e.target.closest("[data-cd-dec]"),del=e.target.closest("[data-cd-del]");
    if(inc)cdQty(inc.dataset.cdInc,+inc.dataset.g,1);
    if(dec)cdQty(dec.dataset.cdDec,+dec.dataset.g,-1);
    if(del)cdDel(del.dataset.cdDel,+del.dataset.g);
  });
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&ov.classList.contains("open"))closeCartDrawer();});
  return ov;
}
function cdQty(slug,g,d){const x=cart.find(i=>i.slug===slug&&i.g===g);if(!x)return;x.q+=d;if(x.q<1)cart=cart.filter(i=>i!==x);saveCart();updateCartBadges();renderCartDrawer();if(window.__renderCart)window.__renderCart();}
function cdDel(slug,g){cart=cart.filter(i=>!(i.slug===slug&&i.g===g));saveCart();updateCartBadges();renderCartDrawer();if(window.__renderCart)window.__renderCart();}
function renderCartDrawer(){
  const items=document.getElementById("cdItems"); if(!items)return;
  const ship=document.getElementById("cdShip"),foot=document.getElementById("cdFoot");
  if(!cart.length){items.innerHTML=`<div class="cd-empty"><div class="ava-big">🛒</div><p class="muted">Ton pochon est vide… c'est pas une vie ça. 🌿</p><a href="fleurs.html" class="btn btn-primary">Remplir le pochon →</a></div>`;ship.innerHTML="";foot.innerHTML="";return;}
  const sub=cartSubtotal(),rem=Math.max(0,FREE_SHIP-sub),pct=Math.min(100,Math.round(sub/FREE_SHIP*100));
  const nItems=cart.reduce((s,x)=>s+x.q,0),nGr=cart.reduce((s,x)=>s+x.g*x.q,0);
  const cnt=document.getElementById("cdCount"); if(cnt)cnt.textContent=`${nItems} article${nItems>1?'s':''}${nGr?' · '+nGr+' g':''}`;
  ship.innerHTML=rem>0
    ?`<p class="cd-ship-t">Plus que <b>${rem.toFixed(2)} €</b> pour la <b>livraison offerte</b> 🚚</p><div class="cd-bar"><i style="width:${pct}%"></i></div>`
    :`<p class="cd-ship-t ok">🎉 Livraison offerte débloquée !</p><div class="cd-bar"><i style="width:100%"></i></div>`;
  const itemsHtml=cart.map(x=>{const sv=itemSave(x);return `<div class="cd-item">
    <img src="assets/products/${x.slug}.jpg${IMGV}" alt="" onerror="this.style.visibility='hidden'">
    <div class="cd-it-info"><b>${x.nom}</b><span class="cd-it-meta"><b>${itemQty(x)}</b> · ${x.unit.toFixed(2)} €${sv>=8?` · <em class="cd-sv">−${sv}%</em>`:''}</span>
      <div class="cd-qty"><button class="${x.q===1?'cd-rm':''}" data-cd-dec="${x.slug}" data-g="${x.g}" aria-label="${x.q===1?'Retirer du pochon':'Réduire'}" title="${x.q===1?'Retirer':'Réduire'}">${x.q===1?'🗑':'−'}</button><span>${x.q}</span><button data-cd-inc="${x.slug}" data-g="${x.g}" aria-label="Ajouter">+</button></div></div>
    <div class="cd-it-side"><b>${(x.unit*x.q).toFixed(2)} €</b><small class="cd-it-g">${itemTot(x)}</small><button class="cd-del" data-cd-del="${x.slug}" data-g="${x.g}" aria-label="Retirer ${x.nom}">Retirer</button></div>
  </div>`;}).join("");
  const picks=(typeof FLEURS!=="undefined"?FLEURS:[]).filter(f=>!cart.some(x=>x.slug===f.slug)).slice(0,2);
  const xsell=picks.length?`<div class="cd-xsell"><div class="cd-xsell-h">Souvent pris avec 👀</div>${picks.map(f=>`<div class="cd-x"><img src="assets/products/${f.slug}.jpg${IMGV}" alt="" onerror="this.style.visibility='hidden'"><div class="cd-x-info"><b>${f.nom}</b><span class="muted">dès ${f.p[0]} € · 3 g</span></div><button class="cd-x-add" data-add="${f.slug}" aria-label="Ajouter ${f.nom} au pochon">+</button></div>`).join("")}</div>`:"";
  items.innerHTML=itemsHtml+xsell;
  foot.innerHTML=`<div class="cd-sub"><span>Sous-total <small class="muted">· ${nItems} art.${nGr?' · '+nGr+' g':''}</small></span><b>${sub.toFixed(2)} €</b></div>
    <a href="checkout.html" class="btn btn-primary cd-go">Commander →</a>
    <a href="panier.html" class="cd-link">Voir le panier complet</a>`;
}
function openCartDrawer(){ensureCartDrawer();renderCartDrawer();const ov=document.getElementById("cartDrawer");requestAnimationFrame(()=>{ov.classList.add("open");document.body.style.overflow="hidden";});}
function closeCartDrawer(){const ov=document.getElementById("cartDrawer");if(ov){ov.classList.remove("open");document.body.style.overflow="";}}

/* ===================== PAGE : FLEURS ===================== */
function renderFleurs(){
  const grid=document.getElementById("fleursGrid"); if(!grid)return;
  const params=new URLSearchParams(location.search);
  let tier=params.get("tier")||"all", aroma=params.get("aroma")||"all", sort="pop";
  const gtype=params.get("type")==="resine"?"resine":(params.get("type")==="all"?"all":"fleur");
  const bar=document.getElementById("filterBar");
  const catP=params.get("cat");
  if(catP&&["accessoires","merch","bonbons","carte"].indexOf(catP)>=0){
    if(bar)bar.hidden=true;
    const h1=document.querySelector("h1");
    if(h1){const sec=h1.closest("section")||document;const eb=sec.querySelector(".eyebrow");if(eb)eb.textContent="Catalogue · "+(CATLBL[catP]||"Boutique");h1.textContent=CATLBL[catP]||"Boutique";const sub=sec.querySelector("p");if(sub)sub.textContent="Nos indispensables WOOD — prix réels de la boutique.";}
    const items=BOUTIQUE.filter(b=>b.cat===catP);
    const rc=document.getElementById("resCount");if(rc)rc.textContent=`${items.length} produit${items.length>1?"s":""}`;
    grid.innerHTML=items.map((f,i)=>simpleCardHTML(f,i)).join("");
    observeReveal();
    document.title=(CATLBL[catP]||"Boutique")+" — WOOD CBD";
    return;
  }
  const tiers=[["all","Tout"],["boostes","Boostés"],["classique","Classique"]];
  const aromas=[["all","Tous les goûts"],["agrumes","🍊 Agrumes"],["weed","🌿 Weed"],["exotic","🥭 Exotic"],["sucre","🍯 Sucré"],["kush","🌰 Kush"],["epice","🌶️ Épicé"]];
  bar.innerHTML=`<div class="filters">${tiers.map(([k,l])=>`<button class="chip filt${tier===k?' on':''}" data-tier="${k}">${l}</button>`).join("")}
    <select id="sortSel" class="sortsel"><option value="pop">Populaire</option><option value="asc">Prix ↑</option><option value="desc">Prix ↓</option></select></div>
    <div class="filters filters-aroma">${aromas.map(([k,l])=>`<button class="chip filt-a${aroma===k?' on':''}" data-aroma="${k}">${l}</button>`).join("")}</div>`;
  function draw(){
    let list=FLEURS.filter(f=>{
      const isR=f.type==="resine";
      if(gtype==="fleur"&&isR)return false;
      if(gtype==="resine"&&!isR)return false;
      if(tier!=="all"&&f.tier!==tier)return false;
      if(aroma!=="all"){const m=MOLEC[f.slug];if(!(m&&m.ar&&m.ar.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").includes(aroma)))return false;}
      return true;
    });
    if(sort==="asc")list=[...list].sort((a,b)=>a.p[0]-b.p[0]);
    if(sort==="desc")list=[...list].sort((a,b)=>b.p[0]-a.p[0]);
    const simples=(aroma==="all"&&tier==="all"&&gtype!=="all")?BOUTIQUE.filter(b=>b.cat===(gtype==="resine"?"resines":"fleurs")):[];
    const nTot=list.length+simples.length;
    document.getElementById("resCount").textContent=`${nTot} variété${nTot>1?"s":""}`;
    grid.innerHTML=nTot?(list.map((f,i)=>cardHTML(f,i)).join("")+simples.map((f,j)=>simpleCardHTML(f,list.length+j)).join("")):`<p class="muted" style="grid-column:1/-1;padding:2rem 0">Aucune variété pour ce goût. <button class="linklike" id="resetFilt">Tout afficher →</button></p>`;
    const rs=document.getElementById("resetFilt");if(rs)rs.addEventListener("click",()=>{tier="all";aroma="all";bar.querySelectorAll(".chip").forEach(x=>x.classList.remove("on"));bar.querySelector('[data-tier="all"]').classList.add("on");bar.querySelector('[data-aroma="all"]').classList.add("on");draw();});
    observeReveal();
  }
  bar.addEventListener("click",e=>{
    const t=e.target.closest("[data-tier]"),a=e.target.closest("[data-aroma]");
    if(t){tier=t.dataset.tier;bar.querySelectorAll(".filt").forEach(x=>x.classList.toggle("on",x.dataset.tier===tier));draw();}
    if(a){aroma=a.dataset.aroma;bar.querySelectorAll(".filt-a").forEach(x=>x.classList.toggle("on",x.dataset.aroma===aroma));draw();}
  });
  bar.addEventListener("change",e=>{if(e.target.id==="sortSel"){sort=e.target.value;draw();}});
  draw();
}

/* ===================== PAGE : PRODUIT ===================== */
function productReviewsHTML(f){
  const m=META[f.slug]||{n:"4,8",c:40};
  const POOL=[
    ["Léa M.","Parfum au top, exactement la description. Emballage soigné 🙌"],
    ["Karim B.","Livraison rapide et discrète. Je recommande les yeux fermés."],
    ["Sophie R.","Super accueil en boutique, de très bons conseils sans pression."],
    ["Tom G.","Qualité au rendez-vous, je reprendrai c'est sûr."],
    ["Inès D.","Le goût est vraiment bon, conforme à ce qui est annoncé."],
    ["Marc L.","Rapport qualité/prix excellent — et la présentation sous cloche, classe."]
  ];
  let h=0; for(const c of f.slug) h=(h*31+c.charCodeAt(0))>>>0;
  const a=POOL[h%POOL.length], b=POOL[(h+3)%POOL.length];
  const card=(r)=>`<div class="pr-card"><div class="pr-top"><span class="pr-ava">${r[0][0]}</span><div><b>${r[0]}</b><span class="stars sm">★★★★★</span></div><span class="pr-ok">✓ Achat vérifié</span></div><p>${r[1]}</p></div>`;
  return `<section class="section container p-reviews"><div class="rail-head"><div><span class="eyebrow">Avis clients</span><h2 class="serif">Ils ont aimé.</h2></div><div class="pr-score"><span class="stars">★★★★★</span> <b>${m.n}</b>/5 · ${m.c} avis <span class="tag tag-maquette">exemple · démo</span></div></div>
    <div class="pr-grid">${card(a)}${card(b)}</div></section>`;
}
function renderProduct(){
  const root=document.getElementById("product"); if(!root)return;
  const slug=new URLSearchParams(location.search).get("f")||"nimbus-3000";
  const f=byId(slug)||FLEURS[0], t=TIER[f.tier];
  if(f.kind==='simple'){renderSimpleProduct(f);return;}
  let gi=1; // 3g par défaut
  const priceEl=()=>document.getElementById("pPrice"), pgEl=()=>document.getElementById("pPerG");
  root.innerHTML=`
    <a class="breadcrumb" href="fleurs.html">← Toutes les fleurs</a>
    <div class="product">
      <div class="product-media">
        <div class="halo" style="background:radial-gradient(circle,${f.c[0]}55,transparent 70%)"></div>
        <img src="assets/products/${f.slug}.jpg${IMGV}" alt="Fleur CBD ${f.nom} sous cloche" onerror="this.outerHTML='<div class=&quot;cloche big&quot;>'+window.__cloche('${f.slug}')+'</div>'">
      </div>
      <div class="product-info">
        <span class="badge ${t.cls}">${t.label}</span>
        <h1>${f.nom}</h1>
        <p class="p-desc">${f.desc} · ${f.type==='resine'?'Résine CBD':'Fleur CBD'} · <span class="muted">profil de goût</span></p>
        ${pMolHTML(f.slug)}
        ${buyBlock(f)}
        <div class="p-reassure"><span>🚚 Livraison discrète 24-48h</span><span>🔒 Paiement sécurisé</span><span>🔞 Réservé aux +18 ans</span></div>
        <div class="accordions">
          <details open><summary>Description</summary>${descHTML(f)}</details>
          <details><summary>Infos produit</summary><p>Taux de CBD : <em>à renseigner</em> · Origine : <em>à renseigner</em> · THC &lt; 0,3 %. Les caractéristiques exactes seront confirmées par la boutique.</p></details>
          <details><summary>Certificat d'analyse (COA)</summary><p>Le certificat d'analyse par lot sera disponible ici (preuve de conformité &lt; 0,3 % THC).</p></details>
        </div>
      </div>
    </div>
    ${productReviewsHTML(f)}
    <section class="section"><div class="rail-head"><h2 class="serif">Dans le même esprit</h2></div><div class="rail" id="relRail"></div></section>
    <div class="p-sticky" id="pSticky"><div class="ps-in"><div class="ps-info"><b>${f.nom}</b><span id="pStickyPrice">Choisis un grammage</span></div><button class="btn btn-primary" id="pStickyAdd" disabled>+ Ajouter au pochon</button></div></div>`;
  // Picker + sticky
  document.querySelectorAll("#product .card-pick").forEach(updatePick);
  const sticky=document.getElementById("pStickyAdd");
  if(sticky)sticky.addEventListener("click",()=>{const pick=document.querySelector("#product .card-pick");const s=pick&&pickState(pick);if(!s)return;cartAdd(s.f.slug,s.g,s.q);bumpCartBtn();toast(`Ajouté : ${s.q} × ${s.g} g de ${s.f.nom} ✓`);openCartDrawer();pick.querySelector(".cp-n").textContent="1";updatePick(pick);});
  // related
  const rel=FLEURS.filter(x=>x.tier===f.tier&&x.slug!==f.slug).slice(0,4);
  const relRail=document.getElementById("relRail"); relRail.innerHTML=(rel.length?rel:FLEURS.slice(0,4)).map((x,i)=>cardHTML(x,i)).join("");
  document.title=`${f.nom} — WOOD CBD`;
}

/* ===================== PAGE : PANIER ===================== */
/* Codes promo (démo) — MÊMES codes au panier ET au checkout (les vrais vouchers d'Ana se brancheront ici) */
const PROMO_CODES={WOOD10:{pct:10,l:"−10 %"},BIENVENUE:{pct:10,l:"−10 %"},NICE15:{pct:15,l:"−15 %"},LIVRAISON:{ship:true,l:"livraison offerte"}};
function getPromo(){try{return JSON.parse(localStorage.getItem("wood_promo")||"null");}catch(e){return null;}}
function setPromo(code){try{code?localStorage.setItem("wood_promo",JSON.stringify({code})):localStorage.removeItem("wood_promo");}catch(e){}}
/* ---- Cartes cadeaux WOOD (démo client-side : code unique + solde réutilisable au paiement) ---- */
function getGifts(){try{return JSON.parse(localStorage.getItem("wood_giftcards")||"{}")||{};}catch(e){return {};}}
function saveGifts(o){try{localStorage.setItem("wood_giftcards",JSON.stringify(o));}catch(e){}}
function giftCard(code){const g=getGifts();return g[code]||null;}
function genGiftCode(){const A="ACDEFGHJKLMNPQRSTUVWXY34679";const blk=()=>Array.from({length:4},()=>A[Math.floor(Math.random()*A.length)]).join("");const g=getGifts();let c;do{c="WOOD-"+blk()+"-"+blk();}while(g[c]);return c;}
function issueGift(amount){const g=getGifts();const code=genGiftCode();g[code]={amount:amount,balance:amount,created:Date.now()};saveGifts(g);return code;}
function redeemGift(code,amt){const g=getGifts();if(g[code]){g[code].balance=Math.max(0,Math.round((g[code].balance-amt)*100)/100);saveGifts(g);return g[code].balance;}return null;}
/* ---- Base de données WOOD (Supabase) : source de vérité des cartes cadeaux ----
   La table est fermée en accès direct (RLS) : tout passe par 3 fonctions serveur
   (émission, consultation, débit atomique + idempotent). Clé publique = prévue pour l'être. */
const SB_URL="https://fautpphrrhwcmcywzsbk.supabase.co";
const SB_KEY="sb_publishable_DeMukgfB802EMJ4Jyftf9g_dHG3XmmG";
async function sbRpc(fn,args){
  const r=await fetch(SB_URL+"/rest/v1/rpc/"+fn,{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify(args||{})});
  const t=await r.text(); let j=null; try{j=JSON.parse(t);}catch(e){}
  if(!r.ok) throw new Error((j&&(j.message||j.hint))||t||("HTTP "+r.status));
  return j;
}
/* Consulte une carte EN BASE (cache local rafraîchi). Hors-ligne -> repli sur le cache. */
async function lookupGift(code){
  try{
    const res=await sbRpc("check_gift_card",{p_code:code});
    if(res&&res[0]){
      const bal=Number(res[0].balance), g=getGifts();
      g[code]=Object.assign(g[code]||{amount:bal},{balance:bal,status:res[0].status});
      saveGifts(g); return g[code];
    }
    return null; /* inconnue en base */
  }catch(e){ return giftCard(code); }
}
function promoInfo(){const p=getPromo();if(!p)return null;if(PROMO_CODES[p.code])return Object.assign({code:p.code},PROMO_CODES[p.code]);const gc=giftCard(p.code);if(gc&&gc.balance>0)return {code:p.code,gift:true,balance:gc.balance,l:"carte cadeau · "+euro(gc.balance)};return null;}
function renderCart(){
  const root=document.getElementById("cart"); if(!root)return;
  window.__renderCart=renderCart;
  if(!cart.length){root.innerHTML=`<div class="cart-empty"><div class="ava-big">🌿</div><h2 class="serif">Ton pochon est vide…</h2><p class="muted">On répare ça ?</p><a href="fleurs.html" class="btn btn-primary">Découvrir les fleurs →</a></div>`;return;}
  const sub=cart.reduce((s,x)=>s+x.unit*x.q,0);
  const free=60, left=Math.max(0,free-sub);
  const nItems=cart.reduce((s,x)=>s+x.q,0), nGr=cart.reduce((s,x)=>s+x.g*x.q,0);
  const promo=promoInfo(); let disc=0; if(promo&&promo.pct)disc=Math.round(sub*promo.pct)/100; else if(promo&&promo.gift)disc=Math.min(promo.balance,sub); const total=Math.max(0,sub-disc);
  root.innerHTML=`<h1 class="serif">Ton pochon <span class="cart-count-h">${nItems} article${nItems>1?'s':''}${nGr?' · '+nGr+' g':''}</span></h1>
    <div class="cart-grid">
      <div class="cart-items">${cart.map((x,i)=>`<div class="cart-item"><div class="ci-media"><img src="assets/products/${x.slug}.jpg${IMGV}" alt="" onerror="this.outerHTML='<div>'+window.__cloche('${x.slug}')+'</div>'"></div>
        <div class="ci-info"><div class="ci-name">${x.nom}</div><div class="muted ci-meta"><b>${itemQty(x)}</b> · ${euro(x.unit)}${(()=>{const sv=itemSave(x);return sv>=8?` · <span class="ci-sv">−${sv}%</span>`:'';})()}${x.g?` · total <b>${x.g*x.q} g</b>`:''}</div></div>
        <div class="ci-qty"><button class="${x.q===1?'cd-rm':''}" data-dec="${i}" aria-label="${x.q===1?'Retirer':'Réduire'}" title="${x.q===1?'Retirer':'Réduire'}">${x.q===1?'🗑':'−'}</button><span>${x.q}</span><button data-inc="${i}" aria-label="Ajouter">+</button></div>
        <div class="ci-line">${euro(x.unit*x.q)}</div><button class="ci-del" data-del="${i}" aria-label="Retirer ${x.nom}">Retirer</button></div>`).join("")}</div>
      <aside class="cart-sum">
        <h3 class="serif">Résumé</h3>
        ${left>0?`<div class="freebar"><div class="freebar-fill" style="width:${Math.min(100,sub/free*100)}%"></div></div><p class="muted" style="font-size:.85rem">Plus que <strong>${euro(left)}</strong> pour la livraison offerte 🎉</p>`:`<p class="lime" style="font-weight:700">🎉 Livraison offerte !</p>`}
        ${'' /* Champ code retiré : sans paiement en ligne, une remise affichée ne voudrait rien dire. */}
        <div class="sum-row"><span>Sous-total</span><strong>${euro(sub)}</strong></div>
        ${disc>0?`<div class="sum-row disc"><span>${promo.gift?'🎁 Carte cadeau':'Réduction'} · ${promo.code}</span><strong>−${euro(disc)}</strong></div>`:''}
        <div class="sum-row muted"><span>Livraison</span><span>${left>0?"calculée à l'étape suivante":"Offerte"}</span></div>
        <div class="sum-row total"><span>Total</span><strong>${euro(total)}</strong></div>
        <a class="btn btn-primary" href="checkout.html" style="width:100%;justify-content:center;margin-top:1rem">Réserver ma sélection →</a>
        <p class="muted" style="font-size:.78rem;text-align:center;margin-top:.8rem">Le paiement en ligne arrive bientôt. En attendant, on réserve par téléphone — c'est immédiat.</p>
      </aside></div>`;
}

/* ===================== PAGE : BIENTÔT (gammes à venir) ===================== */
function renderBientot(){
  const root=document.getElementById("bientot"); if(!root)return;
  const cat=new URLSearchParams(location.search).get("cat")||"resines";
  const T={resines:["Les résines","Hash & résines CBD de la boutique — bientôt en ligne. En attendant, viens les découvrir dans nos boutiques à Nice."],
    accessoires:["Accessoires","Grinders, feuilles, briquets et petits essentiels — bientôt en ligne."]}[cat]||["Bientôt chez WOOD","Cette gamme arrive très vite."];
  root.innerHTML=`<a class="breadcrumb" href="index.html">← Accueil</a>
    <div class="product">
      <div class="product-media"><div class="halo" style="background:radial-gradient(circle,#6fd39a55,transparent 70%)"></div><img src="assets/scenes/cat-${cat}.jpg${IMGV}" alt="${T[0]}" onerror="this.style.display='none'"></div>
      <div class="product-info"><span class="eyebrow">Bientôt chez WOOD</span><h1>${T[0]}</h1>
        <p class="p-desc">${T[1]}</p>
        <div class="hero-cta" style="margin-top:1rem"><a href="fleurs.html" class="btn btn-primary">Voir les fleurs →</a><a href="index.html#boutiques" class="btn btn-ghost">Venir en boutique</a></div>
        <p class="muted" style="margin-top:1.4rem"><span class="tag tag-maquette">Démo</span> Cette gamme existe en boutique ; sa mise en ligne arrive.</p>
      </div>
    </div>`;
  document.title=T[0]+" — WOOD";
}

/* ===================== PAGE : CHECKOUT (démo) ===================== */
/* ===================== PAGE : RÉSERVER (sans serveur) =====================
   La commande en ligne n'est pas encore branchée : il n'y a pas de serveur
   pour l'enregistrer. Plutôt que de laisser un client croire qu'il a commandé
   — et attendre un colis qui ne viendrait jamais — on lui donne un chemin qui
   fonctionne dès maintenant : un appel, ou sa sélection prête à envoyer.
   ========================================================================= */
const BOUTIQUES = [
  { slug:"barla", nom:"WOOD · Barla", adresse:"7 rue Barla, 06300 Nice",
    tel:"04 22 16 35 70", telBrut:"+33422163570" },
  { slug:"borriglione", nom:"WOOD · Borriglione", adresse:"16 av. A. Borriglione, 06100 Nice",
    tel:"04 23 13 03 05", telBrut:"+33423130305" },
];

/** Récapitulatif de la sélection, en texte simple, prêt à envoyer. */
function selectionTexte(){
  const l = cart.map(x => "• " + x.nom + " — " + itemQty(x) + " ×" + x.q + " (" + euro(x.unit * x.q) + ")");
  const sub = cart.reduce((s,x) => s + x.unit * x.q, 0);
  return "Bonjour, je souhaite réserver :\n\n" + l.join("\n") + "\n\nTotal indicatif : " + euro(sub);
}

function renderCheckout(){
  const root = document.getElementById("checkout"); if(!root) return;
  if(!cart.length){ location.href = "panier.html"; return; }

  const sub = cart.reduce((s,x) => s + x.unit * x.q, 0);
  const nArt = cart.reduce((s,x) => s + x.q, 0);

  const boutiques = BOUTIQUES.map(b => `
    <div class="resa-shop">
      <div class="resa-shop-info">
        <b>${b.nom}</b>
        <span class="muted">${b.adresse}</span>
      </div>
      <a class="btn btn-primary" href="tel:${b.telBrut}">📞 ${b.tel}</a>
    </div>`).join("");

  root.innerHTML = `
    <a class="breadcrumb" href="panier.html">← Retour au pochon</a>
    <h1 class="serif">Réserver ma sélection</h1>

    <div class="resa-note">
      <b>La commande en ligne arrive très bientôt.</b>
      En attendant, réserve en un appel : on prépare ta sélection, tu passes la récupérer.
      C'est immédiat, et tu parles à quelqu'un.
    </div>

    <div class="checkout-grid">
      <div>
        <h3 class="serif">1. Appelle la boutique de ton choix</h3>
        ${boutiques}

        <h3 class="serif" style="margin-top:1.6rem">2. Ou envoie ta sélection</h3>
        <p class="muted" style="font-size:.9rem">Copie-la et envoie-la en message — on te répond vite.</p>
        <div class="resa-actions">
          <button class="btn btn-primary" id="copierSel">📋 Copier ma sélection</button>
          <a class="btn btn-ghost" href="https://instagram.com/wood.cbdshop" target="_blank" rel="noopener">Instagram</a>
        </div>
        <pre class="resa-recap" id="recapSel">${selectionTexte().replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))}</pre>
      </div>

      <aside class="cart-sum">
        <h3 class="serif">Ta sélection</h3>
        ${cart.map(x => `<div class="sum-row"><span>${x.nom} ×${x.q} <small class="muted">(${itemQty(x)})</small></span><strong>${euro(x.unit*x.q)}</strong></div>`).join("")}
        <div class="sum-row total"><span>${nArt} article${nArt>1?'s':''}</span><strong>${euro(sub)}</strong></div>
        <p class="muted" style="font-size:.78rem;margin-top:.8rem">
          Montant indicatif. Le prix définitif t'est confirmé en boutique.
        </p>
        <p class="muted" style="font-size:.78rem">🔞 Réservé aux +18 ans · THC &lt; 0,3 %</p>
      </aside>
    </div>`;

  const btn = document.getElementById("copierSel");
  if(btn) btn.addEventListener("click", async () => {
    const txt = selectionTexte();
    try{
      await navigator.clipboard.writeText(txt);
      btn.textContent = "✓ Copié !";
    }catch(e){
      // Le presse-papier peut être refusé : on sélectionne le texte à la place
      const pre = document.getElementById("recapSel");
      if(pre){
        const r = document.createRange(); r.selectNodeContents(pre);
        const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      }
      btn.textContent = "Sélectionné — Ctrl+C";
    }
    setTimeout(() => { btn.textContent = "📋 Copier ma sélection"; }, 2200);
  });

  document.title = "Réserver — WOOD CBD";
}
function renderConfirm(){
  const root = document.getElementById("confirm"); if(!root) return;
  /* Plus aucune commande n'est créée en ligne : cette page ne doit donc plus
     afficher de faux numéro ni de fausse confirmation. */
  root.innerHTML = `<div class="confirm-box">
    <div class="ava-big">🌿</div>
    <h1 class="serif">Réserve en un appel</h1>
    <p class="muted">La commande en ligne arrive très bientôt.<br>
       En attendant, on prépare ta sélection et tu passes la récupérer.</p>
    <div class="resa-actions" style="justify-content:center;margin-top:1.2rem">
      <a class="btn btn-primary" href="tel:+33422163570">📞 Barla · 04 22 16 35 70</a>
      <a class="btn btn-primary" href="tel:+33423130305">📞 Borriglione · 04 23 13 03 05</a>
    </div>
    <a href="fleurs.html" class="btn btn-ghost" style="margin-top:1.2rem">Continuer à explorer →</a>
  </div>`;
}

/* ===================== AVIS (fondu) + INSTAGRAM ===================== */
const AVIS=[
  {t:"Accueil au top, des conseils en or et une sélection qui déchire. Ma boutique CBD préférée à Nice, de loin.",a:"Client WOOD · Nice"},
  {t:"La présentation sous cloche, les variétés, l'ambiance… premium mais jamais prise de tête. J'adore.",a:"Cliente WOOD · Nice"},
  {t:"Franchement la qualité est là, et l'équipe est adorable. « Si c'est WOOD, c'est GOOD », c'est pas qu'un slogan !",a:"Client fidèle · Nice"},
];
function renderAvis(){
  const st=document.getElementById("avisStage"); if(!st)return;
  st.innerHTML=AVIS.map((a,i)=>`<figure class="avis-card${i===0?" on":""}"><div class="avis-stars">★★★★★</div><blockquote>${a.t}</blockquote><figcaption>— ${a.a}</figcaption></figure>`).join("")+`<div class="avis-dots">${AVIS.map((_,i)=>`<button class="avis-dot${i===0?" on":""}" data-i="${i}" aria-label="Avis ${i+1}"></button>`).join("")}</div>`;
  let i=0; const cards=[...st.querySelectorAll(".avis-card")],dots=[...st.querySelectorAll(".avis-dot")]; let timer;
  const go=n=>{cards[i].classList.remove("on");dots[i].classList.remove("on");i=(n+AVIS.length)%AVIS.length;cards[i].classList.add("on");dots[i].classList.add("on");};
  if(!matchMedia("(prefers-reduced-motion:reduce)").matches){const start=()=>timer=setInterval(()=>go(i+1),5000);start();st.addEventListener("mouseenter",()=>clearInterval(timer));st.addEventListener("mouseleave",start);}
  st.addEventListener("click",e=>{const d=e.target.closest(".avis-dot");if(d){clearInterval(timer);go(+d.dataset.i);}});
}
function renderInsta(){
  const g=document.getElementById("instaGrid"); if(!g)return;
  g.innerHTML=["euphoria","fanta-hazy","gelato","moonrock","ice-cream","stoned"].map(s=>`<a class="insta-cell reveal" href="https://instagram.com/wood.cbdshop" target="_blank" rel="noopener"><img src="assets/products/${s}.jpg${IMGV}" alt="" loading="lazy"><span class="insta-ic">◎</span></a>`).join("");
}

/* ===================== STICKERS (mur défilant) ===================== */
const STICKERS=[
  {t:"Si c'est WOOD c'est GOOD",c:""},{t:"100% légal",c:"alt"},{t:"THC &lt; 0,3%",c:"dark"},
  {t:"Nice · 06",c:"pink r6"},{t:"Testé en labo",c:"white rn3"},{t:"Botanique",c:"alt r10"},
  {t:"Premium",c:"r6"},{t:"Depuis 2020",c:"dark rn3"},{t:"Sans pression",c:"pink"},
  {t:"Fait main",c:"white r6"},{t:"Artisanal",c:"alt rn3"},{t:"Nouveauté",c:"pink r10"}
];
function renderStickers(){
  const w=document.getElementById("stickersWall"); if(!w)return;
  const one=STICKERS.map(s=>`<span class="sticker ${s.c}">${s.t}</span>`).join("");
  w.innerHTML=one+one;
}

/* ===================== CONSEILLER WOOD ===================== */
// Profils sensoriels (goût/arôme + intensité) — JAMAIS un effet. a=arôme, i=intensité.
const PROFILE={
  "nimbus-3000":{a:"frais",i:"intense"}, "ivory":{a:"floral",i:"doux"}, "velvet-kush":{a:"terreux",i:"intense"},
  "pastraweed":{a:"sucre",i:"intense"}, "euphoria":{a:"fruite",i:"intense"}, "purple":{a:"fruite",i:"equilibre"},
  "bloody-mary":{a:"terreux",i:"equilibre"}, "cosmic-cbg":{a:"frais",i:"doux"}, "charlotte":{a:"classique",i:"equilibre"},
  "rainbow":{a:"agrumes",i:"equilibre"}, "orange-bud":{a:"agrumes",i:"doux"}, "plutonium":{a:"frais",i:"equilibre"},
  "fanta-hazy":{a:"agrumes",i:"doux"},
};
const LBL={aroma:{fruite:"fruité",agrumes:"agrumes",terreux:"terreux / boisé",frais:"frais & végétal",sucre:"sucré / gourmand",floral:"floral",classique:"classique"},
  intensity:{doux:"douce",equilibre:"équilibrée",intense:"intense"}};
function openAdvisor(){
  if(document.getElementById("advOverlay"))return;
  const ov=document.createElement("div"); ov.id="advOverlay"; ov.className="adv-overlay"; document.body.appendChild(ov);
  const N=s=>(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const state={aroma:null,intensity:null};
  const steps=[
    {key:"aroma",q:"Qu'est-ce qui te ferait plaisir ?",sub:"On parle goût & arôme — rien de médical 😉",opts:[["agrumes","Agrumes 🍊"],["weed","Weed 🌿"],["exotic","Exotic 🥭"],["sucre","Sucré 🍯"],["kush","Kush 🌰"],["epice","Épicé 🌶️"]]},
    {key:"intensity",q:"Tu cherches quelle intensité ?",sub:"Du CBD tout doux jusqu'aux molécules les plus fortes.",opts:[["doux","Tout en douceur 🤍"],["leger","Légèrement boosté ✨"],["fort","Fort 🔥"],["ultra","Ultra fort ⚡"]]},
  ];
  const AL={agrumes:"agrumes",weed:"weed",exotic:"exotic",sucre:"sucré",kush:"kush",epice:"épicé"};
  const IL={doux:"tout en douceur",leger:"légèrement boostée",fort:"forte",ultra:"ultra forte"};
  const ITARG={doux:0,leger:1.5,fort:3,ultra:4};
  let i=0;
  const wrap=inner=>`<div class="adv-sheet"><button class="adv-close" aria-label="Fermer">✕</button>
    <div class="adv-top"><span class="adv-ava">🌿</span><div><strong>Ana · Conseillère WOOD</strong><small>conseil de goût, pas un avis médical</small></div></div>${inner}</div>`;
  function render(){
    if(i<steps.length){const s=steps[i];
      ov.innerHTML=wrap(`<div class="adv-progress"><span style="width:${i/steps.length*100}%"></span></div>
        <div class="adv-q">${s.q}</div>${s.sub?`<div class="adv-sub">${s.sub}</div>`:""}
        <div class="adv-opts">${s.opts.map(([v,l])=>`<button class="adv-opt" data-v="${v}">${l}</button>`).join("")}</div>
        ${i>0?`<button class="adv-back">← Retour</button>`:""}`);
    } else {
      const targ=ITARG[state.intensity];
      const scored=FLEURS.filter(f=>f.type!=="resine").map(f=>{const m=MOLEC[f.slug]||{};let sc=0;
        if(N(m.ar).includes(state.aroma))sc+=3;
        const lvl=m.lvl||0; sc+=Math.max(0,2-Math.abs(lvl-targ));
        return {f,sc};}).sort((a,b)=>b.sc-a.sc);
      const top=scored.slice(0,3).map(x=>x.f);
      ov.innerHTML=wrap(`<div class="adv-q">La sélection d'Ana pour toi 🌿</div>
        <div class="adv-why">Pour un profil <strong>${AL[state.aroma]}</strong> · intensité <strong>${IL[state.intensity]}</strong> :</div>
        <div class="adv-res">${top.map((f,k)=>cardHTML(f,k)).join("")}</div>
        <div class="adv-tip">💡 <strong>Le conseil d'Ana :</strong> en boutique, on aime associer ta fleur à un peu de résine ou de molécule pour varier les plaisirs — passe nous voir pour affiner.</div>
        <button class="adv-restart">↺ Recommencer</button>`);
      ov.querySelectorAll(".reveal").forEach(e=>e.classList.add("in"));
    }
  }
  ov.addEventListener("click",e=>{
    if(e.target===ov||e.target.closest(".adv-close")){ov.remove();return;}
    const o=e.target.closest(".adv-opt"); if(o){state[steps[i].key]=o.dataset.v;i++;render();return;}
    if(e.target.closest(".adv-back")){i=Math.max(0,i-1);render();return;}
    if(e.target.closest(".adv-restart")){i=0;state.aroma=state.intensity=null;render();return;}
  });
  render();
  if(navigator.vibrate)navigator.vibrate(8);
}

/* ===================== MOTION / INIT ===================== */
let _io;
function observeReveal(){document.querySelectorAll(".reveal:not(.in)").forEach(el=>_io&&_io.observe(el));}
document.addEventListener("DOMContentLoaded",()=>{
  const page=document.body.dataset.page||"home";
  injectChrome(page);
  // Home dynamic bits
  document.querySelectorAll("[data-cloche]").forEach((el,i)=>el.innerHTML=clocheSVG(["#d7ff8f","#1f8f5a"],"h"+i));
  document.querySelectorAll("[data-art]").forEach(el=>el.innerHTML=catArt(el.dataset.art));
  const rail=document.getElementById("fleursRail");
  if(rail){const order=["euphoria","fanta-hazy","gelato","green-skunk","ice-cream","pastraweed","moonrock","stoned"];rail.innerHTML=order.map((s,i)=>cardHTML(byId(s),i)).join("");}
  const phero=document.getElementById("promoHero");
  if(phero){phero.innerHTML=promoHeroHTML(PROMOS[0]);}
  const pstrip=document.getElementById("promoStrip");
  if(pstrip){pstrip.innerHTML=PROMOS.slice(1).map(p=>promoMiniHTML(p)).join("");}
  // Flèches de défilement du rail catalogue
  document.querySelectorAll(".rail-wrap").forEach(rw=>{
    const rl=rw.querySelector(".rail"); if(!rl)return;
    const step=()=>Math.max(240,Math.round(rl.clientWidth*0.82));
    const prev=rw.querySelector("[data-rail-prev]"),next=rw.querySelector("[data-rail-next]");
    prev&&prev.addEventListener("click",()=>rl.scrollBy({left:-step(),behavior:"smooth"}));
    next&&next.addEventListener("click",()=>rl.scrollBy({left:step(),behavior:"smooth"}));
    const sync=()=>{const max=rl.scrollWidth-rl.clientWidth-2;if(prev)prev.classList.toggle("off",rl.scrollLeft<=2);if(next)next.classList.toggle("off",rl.scrollLeft>=max);};
    rl.addEventListener("scroll",sync,{passive:true}); sync();
  });
  renderFleurs(); renderProduct(); renderCart(); renderCheckout(); renderConfirm(); renderAvis(); renderInsta(); renderBientot(); renderStickers();
  updateCartBadges();

  document.querySelectorAll(".card-pick").forEach(updatePick);
  document.body.addEventListener("click",e=>{
    // + / - par grammage
    const step=e.target.closest("[data-cp-inc],[data-cp-dec]");
    if(step){e.preventDefault();const pick=step.closest(".card-pick"),n=pick.querySelector(".cp-n");let v=(+n.textContent||1)+(step.hasAttribute("data-cp-inc")?1:-1);if(v<1)v=1;if(v>99)v=99;n.textContent=v;updatePick(pick);return;}
    // Ajouter le grammage choisi x quantite
    const addP=e.target.closest("[data-add-pick]");
    if(addP){e.preventDefault();const pick=addP.closest(".card-pick"),s=pickState(pick);if(!s)return;
      cartAdd(s.f.slug,s.g,s.q);bumpCartBtn();toast(`Ajouté : ${s.q} × ${s.g} g de ${s.f.nom} ✓`);openCartDrawer();
      pick.querySelector(".cp-n").textContent="1";updatePick(pick);
      return;}
    const sbAdd=e.target.closest("[data-sb-add]");
    if(sbAdd){e.preventDefault();const pick=sbAdd.closest(".card-pick"),f=byId(sbAdd.dataset.sbAdd);if(!f)return;const q=Math.max(1,+pick.querySelector(".cp-n").textContent||1);let unit,opt=null;if(f.opts){const se=pick.querySelector("[data-sb-select]"),oi=se?+se.value:0;opt=f.opts[oi][0];unit=f.opts[oi][1];}else unit=f.price;cartAddSimple(f,unit,opt,q);bumpCartBtn();toast(`Ajouté : ${f.nom}${opt?' · '+opt:''} ✓`);openCartDrawer();pick.querySelector(".cp-n").textContent="1";return;}
    // Page panier complete : +/- et suppression par index
    const ci=e.target.closest("[data-inc],[data-dec],[data-del]");
    if(ci){e.preventDefault();const idx=+(ci.dataset.inc??ci.dataset.dec??ci.dataset.del);if(!cart[idx])return;
      if(ci.hasAttribute("data-inc"))cart[idx].q++;
      else if(ci.hasAttribute("data-del"))cart.splice(idx,1);
      else{cart[idx].q--;if(cart[idx].q<1)cart.splice(idx,1);}
      saveCart();updateCartBadges();renderCart();if(typeof renderCartDrawer==='function')renderCartDrawer();return;}
    // Code promo (panier)
    const pa=e.target.closest("[data-promo-apply]"); if(pa){e.preventDefault();(async()=>{
      const inp=document.getElementById("promoCode");const c=((inp&&inp.value)||"").trim().toUpperCase();
      if(PROMO_CODES[c]){setPromo(c);toast(`Code ${c} appliqué 🎉`);renderCart();return;}
      if(/^WOOD-/.test(c)){ toast("Vérification de la carte…"); const gc=await lookupGift(c);
        if(gc&&gc.balance>0){setPromo(c);toast(`🎁 Carte cadeau · solde ${euro(gc.balance)}`);renderCart();}
        else{toast(gc?"Carte cadeau épuisée":"Carte introuvable");}
        return;}
      toast("Code invalide");})();return;}
    const prm=e.target.closest("[data-promo-rm]"); if(prm){e.preventDefault();setPromo(null);toast("Code promo retiré");renderCart();return;}
    // ajout simple (ex. cross-sell) : 3 g par defaut
    const a=e.target.closest("[data-add]"); if(a){e.preventDefault();const gi=a.dataset.gi!==undefined?+a.dataset.gi:1;addToCart(a.dataset.add,GRAMS[gi]);return;}
    const qv=e.target.closest("[data-qv]"); if(qv){e.preventDefault();openQuickView(qv.dataset.qv);return;}
    const fav=e.target.closest("[data-fav]"); if(fav){e.preventDefault();toggleFav(fav.dataset.fav);return;}
  });
  document.body.addEventListener("change",e=>{const sel=e.target.closest("[data-cp-select]");if(sel)updatePick(sel.closest(".card-pick"));});
  updateFavBadges();

  const header=document.getElementById("header");
  const onScroll=()=>header&&header.classList.toggle("scrolled",window.scrollY>20);
  onScroll(); window.addEventListener("scroll",onScroll,{passive:true});

  _io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");_io.unobserve(en.target);}}),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  observeReveal();

  const burger=document.getElementById("burger");
  if(burger)burger.addEventListener("click",openMobileMenu);
  const adv=document.getElementById("advisor");
  if(adv)adv.addEventListener("click",openAdvisor);
  document.querySelectorAll(".icon-btn.search").forEach(b=>b.addEventListener("click",openSearch));
  document.querySelectorAll("#cartBtn,[data-cart-open]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();openCartDrawer();}));
  document.querySelectorAll("#favBtn").forEach(b=>b.addEventListener("click",openFavDrawer));
});

/* ===================== RECHERCHE (overlay live) ===================== */
function openSearch(){
  let ov=document.getElementById("searchOv");
  if(!ov){
    ov=document.createElement("div"); ov.id="searchOv"; ov.className="search-ov";
    ov.innerHTML=`<div class="search-panel" role="dialog" aria-label="Recherche">
      <div class="search-top">
        <span class="search-ic">🔎</span>
        <input id="searchInput" type="search" placeholder="Rechercher une fleur, un goût…" autocomplete="off" aria-label="Rechercher">
        <button class="search-close" aria-label="Fermer">✕</button>
      </div>
      <div class="search-res" id="searchRes"></div>
    </div>`;
    document.body.appendChild(ov);
    const close=()=>{ov.classList.remove("open");document.body.style.overflow="";};
    ov.addEventListener("click",e=>{if(e.target===ov||e.target.closest(".search-close"))close();});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&ov.classList.contains("open"))close();});
    const inp=ov.querySelector("#searchInput");
    inp.addEventListener("input",()=>searchDraw(inp.value));
  }
  ov.classList.add("open"); document.body.style.overflow="hidden";
  searchDraw(""); setTimeout(()=>ov.querySelector("#searchInput").focus(),60);
}
function searchDraw(q){
  const res=document.getElementById("searchRes"); if(!res)return;
  q=(q||"").trim().toLowerCase();
  let list=FLEURS;
  if(q) list=FLEURS.filter(f=>(f.nom+" "+f.desc+" "+f.tier+" "+((PROFILE[f.slug]&&PROFILE[f.slug].a)||"")).toLowerCase().includes(q));
  if(!list.length){res.innerHTML=`<p class="search-empty muted">Aucun résultat pour « ${q} ». Essaie « fruité », « boosté », « doux »…</p>`;return;}
  res.innerHTML=`${q?"":'<p class="search-hint muted">Suggestions populaires</p>'}<div class="search-grid">`+list.slice(0,8).map(f=>{
    const m=META[f.slug]||{}; return `<a class="search-row" href="produit.html?f=${f.slug}">
      <img src="assets/products/${f.slug}.jpg${IMGV}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">
      <div class="search-info"><b>${f.nom}</b><span class="muted">${f.desc} · ${TIER[f.tier]?TIER[f.tier].label:f.tier}</span></div>
      <span class="search-price">dès ${f.p[0]} €</span></a>`;}).join("")+`</div>`;
}

/* ===================== FAVORIS (persistants) ===================== */
let favs=JSON.parse(localStorage.getItem("wood_fav")||"[]");
function isFav(s){return favs.indexOf(s)>-1;}
function saveFavs(){localStorage.setItem("wood_fav",JSON.stringify(favs));}
function updateFavBadges(){document.querySelectorAll("#favCount").forEach(e=>{e.textContent=favs.length;e.classList.toggle("on",favs.length>0);});}
function toggleFav(slug){
  const on=isFav(slug);
  if(on)favs=favs.filter(s=>s!==slug);else favs.push(slug);
  saveFavs(); updateFavBadges();
  document.querySelectorAll('[data-fav="'+slug+'"]').forEach(b=>{b.classList.toggle("on",!on);b.textContent=!on?"♥":"♡";});
  if(navigator.vibrate)navigator.vibrate(10);
  const f=byId(slug);
  toast(!on?`${f?f.nom:"Ajouté"} dans tes coups de cœur ❤️`:"Retiré des favoris");
  if(document.getElementById("favDrawer"))renderFavDrawer();
}
/* ---- Tiroir favoris ---- */
function ensureFavDrawer(){
  let ov=document.getElementById("favDrawer"); if(ov)return ov;
  ov=document.createElement("div"); ov.id="favDrawer"; ov.className="cd-ov fav-ov";
  ov.innerHTML=`<aside class="cd-panel" role="dialog" aria-label="Coups de cœur">
    <div class="cd-head"><b>Tes coups de cœur ❤️</b><button class="cd-close" aria-label="Fermer">✕</button></div>
    <div class="cd-items" id="favItems"></div>
  </aside>`;
  document.body.appendChild(ov);
  ov.addEventListener("click",e=>{
    if(e.target===ov||e.target.closest(".cd-close")){closeFavDrawer();return;}
    const add=e.target.closest("[data-fav-add]"); if(add){addToCart(add.dataset.favAdd);return;}
    const del=e.target.closest("[data-fav-del]"); if(del){toggleFav(del.dataset.favDel);return;}
  });
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&ov.classList.contains("open"))closeFavDrawer();});
  return ov;
}
function renderFavDrawer(){
  const box=document.getElementById("favItems"); if(!box)return;
  if(!favs.length){box.innerHTML=`<div class="cd-empty"><div class="ava-big">💚</div><p class="muted">Aucun coup de cœur… pour l'instant. Touche le ❤ sur une fleur pour la garder sous le coude.</p><a href="fleurs.html" class="btn btn-primary">Voir les fleurs →</a></div>`;return;}
  box.innerHTML=favs.map(s=>{const f=byId(s);if(!f)return"";const m=META[s]||{n:"4,8"};
    return `<div class="fav-row">
      <a class="fav-media" href="produit.html?f=${s}"><img src="assets/products/${s}.jpg${IMGV}" alt="${f.nom}" onerror="this.style.visibility='hidden'"></a>
      <div class="fav-info"><a class="fav-name" href="produit.html?f=${s}">${f.nom}</a><span class="muted">${f.desc} · ★ ${m.n}</span><span class="fav-price">dès ${f.p[0]} €</span></div>
      <div class="fav-acts"><button class="btn btn-primary btn-sm" data-fav-add="${s}">+ Pochon</button><button class="fav-x" data-fav-del="${s}" aria-label="Retirer">✕</button></div>
    </div>`;}).join("");
}
function openFavDrawer(){const ov=ensureFavDrawer();renderFavDrawer();requestAnimationFrame(()=>ov.classList.add("open"));document.body.style.overflow="hidden";}
function closeFavDrawer(){const ov=document.getElementById("favDrawer");if(ov){ov.classList.remove("open");document.body.style.overflow="";}}

/* ===================== APERÇU RAPIDE (quick-view) ===================== */
function openQuickView(slug){
  const f=byId(slug); if(!f)return;
  const m=META[slug]||{n:"4,8",c:30}, t=TIER[f.tier], pr=PROFILE[slug]||{};
  const aroma=pr.a&&LBL.aroma[pr.a]?LBL.aroma[pr.a]:"", inten=pr.i&&LBL.intensity[pr.i]?LBL.intensity[pr.i]:"";
  let ov=document.getElementById("qvOv");
  if(!ov){ov=document.createElement("div"); ov.id="qvOv"; ov.className="qv-ov"; document.body.appendChild(ov);
    ov.addEventListener("click",e=>{
      if(e.target===ov||e.target.closest(".qv-close")){closeQuickView();return;}
      const add=e.target.closest("[data-qv-add]"); if(add){addToCart(add.dataset.qvAdd,+add.dataset.g||1);closeQuickView();return;}
      const fv=e.target.closest("[data-fav]"); if(fv){e.preventDefault();toggleFav(fv.dataset.fav);return;}
      const g=e.target.closest("[data-qv-g]"); if(g){const grid=ov.querySelector("#qvGrams"),addBtn=ov.querySelector("#qvAdd");
        grid.querySelectorAll(".qv-g").forEach(b=>b.classList.remove("on"));g.classList.add("on");
        const i=+g.dataset.qvG;addBtn.dataset.g=GRAMS[i];addBtn.innerHTML="+ Ajouter · <b>"+f.p[i]+" €</b>";}
    });
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&ov.classList.contains("open"))closeQuickView();});
  }
  const chips=f.p.map((p,i)=>`<button class="qv-g${i===0?' on':''}" data-qv-g="${i}">${GRAMS[i]} g<span>${p} €</span></button>`).join("");
  ov.innerHTML=`<div class="qv-panel" role="dialog" aria-label="${f.nom}">
    <button class="qv-close" aria-label="Fermer">✕</button>
    <div class="qv-media"><div class="halo" style="background:radial-gradient(circle,${f.c[0]}66,transparent 70%)"></div>
      <img src="assets/products/${slug}.jpg${IMGV}" alt="Fleur CBD ${f.nom}" onerror="this.outerHTML='<div class=&quot;cloche big&quot;>'+window.__cloche('${slug}')+'</div>'"></div>
    <div class="qv-body">
      <div class="qv-top"><span class="badge ${t.cls}">${t.label}</span><button class="card-fav${isFav(slug)?' on':''}" data-fav="${slug}" aria-label="Favori">${isFav(slug)?'♥':'♡'}</button></div>
      <h3 class="qv-name">${f.nom}</h3>
      <div class="card-rate"><span class="stars">★★★★★</span><b>${m.n}</b><span class="rate-c">(${m.c} avis)</span></div>
      <p class="qv-desc muted">${f.desc} — fleur CBD cultivée avec soin, présentée sous cloche.</p>
      ${(aroma||inten)?`<div class="qv-tags">${aroma?`<span class="qv-tag">🌿 ${aroma}</span>`:""}${inten?`<span class="qv-tag">🔥 ${inten}</span>`:""}</div>`:""}
      <div class="qv-glabel muted">Choisis ton format</div>
      <div class="qv-grams" id="qvGrams">${chips}</div>
      <div class="qv-actions"><button class="btn btn-primary" data-qv-add="${slug}" data-g="1" id="qvAdd">+ Ajouter · <b>${f.p[0]} €</b></button>
        <a class="btn btn-ghost" href="produit.html?f=${slug}">Fiche complète →</a></div>
      <p class="qv-note muted">🚚 Livraison offerte dès 60 € · 🔬 testé en labo</p>
    </div></div>`;
  requestAnimationFrame(()=>ov.classList.add("open")); document.body.style.overflow="hidden";
}
function closeQuickView(){const ov=document.getElementById("qvOv");if(ov){ov.classList.remove("open");document.body.style.overflow="";}}

/* ===================== MENU MOBILE (drawer) ===================== */
function openMobileMenu(){
  let ov=document.getElementById("mnuOv");
  if(!ov){ov=document.createElement("div"); ov.id="mnuOv"; ov.className="mnu-ov";
    ov.innerHTML=`<aside class="mnu-panel" role="dialog" aria-label="Menu">
      <div class="mnu-head"><a class="logo" href="index.html"><img class="logo-img" src="assets/icons/wood-logo.png?v=2" alt="WOOD" height="28"></a><button class="mnu-close" aria-label="Fermer">✕</button></div>
      <nav class="mnu-nav">
        <a href="fleurs.html"><span>🌿 Fleurs CBD</span><span class="arr">→</span></a>
        <a href="fleurs.html?tier=boostes"><span>⚡ Boostés</span><span class="arr">→</span></a>
        <a href="bientot.html?cat=resines"><span>🟤 Résines <em>bientôt</em></span><span class="arr">→</span></a>
        <a href="index.html#boutiques"><span>📍 Nos boutiques</span><span class="arr">→</span></a>
        <a href="index.html#histoire"><span>✳ L'histoire WOOD</span><span class="arr">→</span></a>
      </nav>
      <div class="mnu-quick">
        <button class="mnu-q" data-mnu="search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>Rechercher</button>
        <button class="mnu-q" data-mnu="fav"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5.2 5.2 0 0 1 12 6a5.2 5.2 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg>Coups de cœur</button>
        <button class="mnu-q" data-mnu="cart"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/></svg>Mon pochon</button>
      </div>
      <div class="mnu-foot"><span class="mnu-tag">Si c'est WOOD, c'est GOOD ✳</span><div class="socials"><a href="https://instagram.com/wood.cbdshop" target="_blank" rel="noopener">◎ Instagram</a><a href="https://facebook.com/Woodcbdshopnice" target="_blank" rel="noopener">ƒ Facebook</a></div></div>
    </aside>`;
    document.body.appendChild(ov);
    ov.addEventListener("click",e=>{
      if(e.target===ov||e.target.closest(".mnu-close")){closeMobileMenu();return;}
      const q=e.target.closest("[data-mnu]");
      if(q){closeMobileMenu();const k=q.dataset.mnu;setTimeout(()=>{if(k==="search")openSearch();else if(k==="fav")openFavDrawer();else if(k==="cart")openCartDrawer();},180);}
    });
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&ov.classList.contains("open"))closeMobileMenu();});
  }
  requestAnimationFrame(()=>ov.classList.add("open")); document.body.style.overflow="hidden";
}
function closeMobileMenu(){const ov=document.getElementById("mnuOv");if(ov){ov.classList.remove("open");document.body.style.overflow="";}}

/* ===================== PWA (manifest, meta iOS, service worker) ===================== */
(function(){
  try{
    var head=document.head;
    if(!document.querySelector('link[rel="manifest"]')){var l=document.createElement('link');l.rel='manifest';l.href='manifest.webmanifest';head.appendChild(l);}
    [['apple-mobile-web-app-capable','yes'],['mobile-web-app-capable','yes'],['apple-mobile-web-app-status-bar-style','black-translucent'],['apple-mobile-web-app-title','WOOD']].forEach(function(p){
      if(!document.querySelector('meta[name="'+p[0]+'"]')){var m=document.createElement('meta');m.name=p[0];m.content=p[1];head.appendChild(m);}
    });
    if(!document.querySelector('link[rel="apple-touch-icon"]')){var a=document.createElement('link');a.rel='apple-touch-icon';a.href='assets/icons/apple-touch.png';head.appendChild(a);}
    if(!document.querySelector('link[rel="icon"]')){var ic=document.createElement('link');ic.rel='icon';ic.type='image/png';ic.href='assets/icons/favicon.png';head.appendChild(ic);}
  }catch(e){}
  if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){});});}
})();
