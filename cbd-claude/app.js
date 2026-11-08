/* ===========================================================
   WOOD — cbd claude · app.js (V1) — multi-pages
   Données fleurs RÉELLES (prix proprio). Profils = goût, jamais d'effet.
   =========================================================== */

const IMGV = "?v=3"; /* cache-buster images (bump si régénération) */
const FLEURS = [
  { slug:"nimbus-3000", nom:"Nimbus 3000", tier:"boostes", desc:"Givrée ❄️", c:["#eafce0","#8fd08a"], p:[15,42,70,130,260] },
  { slug:"ivory", nom:"Ivory", tier:"boostes", desc:"Douce 🤍", c:["#f3f1dd","#b7cf9a"], p:[15,42,70,130,260] },
  { slug:"velvet-kush", nom:"Velvet Kush", tier:"boostes", desc:"Intense 🖤", c:["#5a7f63","#243a2a"], p:[12,34,55,100,200] },
  { slug:"pastraweed", nom:"Pastraweed", tier:"boostes", desc:"Gourmande 🍊", c:["#cfe39a","#8a7a2e"], p:[12,34,55,100,200] },
  { slug:"euphoria", nom:"Euphoria", tier:"boostes", desc:"Fruitée 🍓", c:["#b7f0a0","#e07a4d"], p:[12,34,55,100,200] },
  { slug:"purple", nom:"Purple", tier:"soft", desc:"Fruits noirs 🍇", c:["#b89adf","#4a2e6b"], p:[11,30,50,100,180] },
  { slug:"bloody-mary", nom:"Bloody Mary", tier:"classique", desc:"Épicée 🌶️", c:["#c06b7e","#5a1f2d"], p:[10,28,45,80,160] },
  { slug:"cosmic-cbg", nom:"Cosmic CBG", tier:"classique", desc:"Clair · CBG ✨", c:["#eef0b0","#b8b06a"], p:[10,28,45,80,160] },
  { slug:"charlotte", nom:"Charlotte", tier:"classique", desc:"Classique 🌿", c:["#bfe3b0","#3a7a4a"], p:[10,28,45,80,160] },
  { slug:"rainbow", nom:"Rainbow", tier:"classique", desc:"Acidulée 🌈", c:["#c6a8e0","#e0a05a"], p:[8,22,35,60,120] },
  { slug:"orange-bud", nom:"Orange Bud", tier:"classique", desc:"Agrumes 🍊", c:["#f3c27a","#b5651d"], p:[7,20,30,50,100] },
  { slug:"plutonium", nom:"Plutonium", tier:"classique", desc:"Punchy ⚡", c:["#c8f58f","#4ca72c"], p:[7,20,30,50,100] },
  { slug:"fanta-hazy", nom:"Fanta Hazy", tier:"classique", desc:"Pétillante 🍊", c:["#f3d49a","#c98a3a"], p:[6,16,25,40,80] },
];
const TIER = { boostes:{label:"Boostés",cls:"badge-boost"}, soft:{label:"Soft",cls:"badge-soft"}, classique:{label:"Classique",cls:"badge-classic"} };
const GRAMS = [1,3,5,10,25];
const byId = s => FLEURS.find(f=>f.slug===s);
const euro = n => n.toLocaleString("fr-FR")+" €";

/* ---- Cloche repli SVG ---- */
function clocheSVG(c,id){const g=`b${id}`;return `<svg class="cloche-svg" viewBox="0 0 200 250" width="100%" aria-hidden="true"><defs><radialGradient id="${g}" cx="45%" cy="38%" r="70%"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></radialGradient></defs><ellipse cx="100" cy="226" rx="66" ry="12" fill="#000" opacity=".4"/><rect x="42" y="214" width="116" height="16" rx="8" fill="#6b5a3a"/><g fill="url(#${g})"><circle cx="100" cy="150" r="30"/><circle cx="78" cy="138" r="20"/><circle cx="122" cy="140" r="20"/><circle cx="90" cy="120" r="18"/><circle cx="112" cy="122" r="17"/><circle cx="100" cy="106" r="15"/><circle cx="74" cy="160" r="15"/><circle cx="126" cy="162" r="15"/><circle cx="100" cy="176" r="18"/></g><path d="M100 42c-40 0-66 30-66 70v86h132v-86c0-40-26-70-66-70Z" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)" stroke-width="2"/><ellipse cx="100" cy="44" rx="10" ry="6" fill="rgba(255,255,255,.25)"/></svg>`;}
window.__cloche = s => { const f=byId(s); return clocheSVG(f?f.c:["#8fd08a","#243a2a"], s); };

function catArtSVG(kind){const m={fleurs:["#2f9e57","#0e3b26"],resines:["#c98a3a","#5a3410"],boostes:["#2f9e6b","#063b45"],huiles:["#cbf096","#3a5a1e"],accessoires:["#9fb0a0","#2c3a30"]};const c=m[kind]||m.fleurs;return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%"><rect width="400" height="300" fill="#141c16"/><path d="M-20 320C60 240 20 150 120 60c40-36 120 0 120 0s-30 120-120 170C60 270 20 300-20 320Z" fill="${c[0]}" opacity=".5"/></svg>`;}
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
  const rows=GRAMS.map((g,gi)=>{
    const pg=Math.round(f.p[gi]/g*10)/10;
    const sv=Math.round((1-(f.p[gi]/g)/base)*100);
    return `<div class="cp-row" data-gi="${gi}">
      <div class="cp-g"><b>${g} g</b><small>${f.p[gi]} € · ${pg} €/g${sv>=8?` · <em>−${sv}%</em>`:''}</small></div>
      <div class="cp-qty"><button type="button" data-cp-dec aria-label="Enlever un pochon de ${g} g">−</button><span class="cp-n">0</span><button type="button" data-cp-inc aria-label="Ajouter un pochon de ${g} g">+</button></div>
    </div>`;
  }).join("");
  return `<div class="card-pick" data-pick="${f.slug}" role="group" aria-label="Choisir les grammages et quantités">
    <div class="cp-head">Choisis tes grammages <span class="cp-hint">(+ / −)</span></div>
    <div class="cp-rows">${rows}</div>
    <div class="cp-total" data-cp-total>Rien sélectionné</div>
    <button class="card-add" data-add-pick="${f.slug}" disabled>Ajouter au pochon</button>
  </div>`;
}
/* ---- Met a jour le total d'un bloc d'achat (prix, poids, bouton) ---- */
function updatePick(pick){
  if(!pick)return; const f=byId(pick.dataset.pick); if(!f)return;
  let tp=0,tg=0,tn=0;
  pick.querySelectorAll(".cp-row").forEach(row=>{const gi=+row.dataset.gi,q=+row.querySelector(".cp-n").textContent||0;tp+=f.p[gi]*q;tg+=GRAMS[gi]*q;tn+=q;row.classList.toggle("active",q>0);});
  const tot=pick.querySelector("[data-cp-total]"),add=pick.querySelector("[data-add-pick]");
  if(tot)tot.innerHTML=tn>0?`<b>${tn}</b> pochon${tn>1?'s':''} · <b>${tg} g</b> · <b>${tp.toFixed(2)} €</b>`:`Rien sélectionné`;
  if(add){add.disabled=tn<1;add.innerHTML=tn>0?`Ajouter au pochon · <b>${tp.toFixed(2)} €</b>`:`Ajouter au pochon`;}
  const sp=document.getElementById("pStickyPrice"); if(sp)sp.textContent=tn>0?`${tn} pochon${tn>1?'s':''} · ${tg} g · ${tp.toFixed(2)} €`:"Choisis un grammage";
  const sa=document.getElementById("pStickyAdd"); if(sa)sa.disabled=tn<1;
  return {tp,tg,tn};
}
/* ---- Carte produit ---- */
function cardHTML(f,i){
  const t=TIER[f.tier], pg=Math.round((f.p[4]/25)*10)/10, m=META[f.slug]||{n:"4,8",c:30,tag:""};
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
      <div class="card-desc">${f.desc} · Fleur CBD</div>
      ${cardStock(f.slug)}
      ${buyBlock(f)}
    </div>
  </article>`;
}

/* ===================== CHROME (header / footer / botnav / advisor) ===================== */
function markSVG(){return `<svg class="mark" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="12.5" stroke-linecap="round" aria-hidden="true"><path d="M50 42 V12 M14 42 H86 M24 20 L76 64 M76 20 L24 64"/><circle cx="50" cy="80" r="6.5" fill="currentColor" stroke="none"/></svg>`;}
function headerHTML(){return `<div class="container header-in">
  <a class="logo" href="index.html" aria-label="WOOD accueil"><span class="star">${markSVG()}</span>Wood <small>CBD · Nice</small></a>
  <nav class="nav" aria-label="Navigation principale">
    <a href="fleurs.html">Fleurs</a><a href="bientot.html?cat=resines">Résines</a>
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
    <div><h3 class="serif">Rejoins la team WOOD 🌿</h3><p class="muted">Bons plans, nouveautés, drops — rien que du bon dans ta boîte.</p></div>
    <form class="newsletter" onsubmit="return false"><input type="email" placeholder="Ton e-mail" aria-label="E-mail"><button class="btn btn-primary" type="submit">OK →</button></form>
  </div>
  <div class="footer-top">
    <div><div class="big-logo"><span class="star" style="color:var(--lime)">${markSVG()}</span> Wood</div>
      <p class="muted" style="margin:.6rem 0 1rem;max-width:30ch">La Maison du chanvre, à Nice. Si c'est WOOD, c'est GOOD.</p>
      <div class="socials"><a href="https://instagram.com/wood.cbdshop" target="_blank" rel="noopener">◎ Instagram</a><a href="https://facebook.com/Woodcbdshopnice" target="_blank" rel="noopener">ƒ Facebook</a></div></div>
    <div><h4>Boutique</h4><ul><li><a href="fleurs.html">Fleurs</a></li><li><a href="bientot.html?cat=resines">Résines</a></li><li><a href="fleurs.html?tier=boostes">Boostés</a></li><li><a href="index.html">Accueil</a></li></ul></div>
    <div><h4>Infos</h4><ul><li><a href="index.html#boutiques">Nos boutiques</a></li><li><a href="contact.html">Contact</a></li><li><a href="faq.html">FAQ</a></li><li><a href="index.html#histoire">L'histoire</a></li></ul></div>
    <div><h4>Légal</h4><ul><li><a href="mentions-legales.html">Mentions légales</a></li><li><a href="cgv.html">CGV</a></li><li><a href="confidentialite.html">Confidentialité</a></li><li><a href="confidentialite.html#cookies">Cookies</a></li></ul></div>
  </div>
  <div class="footer-pay"><span class="muted">Paiement 100 % sécurisé</span><span class="pay-ic">VISA</span><span class="pay-ic">Mastercard</span><span class="pay-ic">Apple&nbsp;Pay</span><span class="pay-ic">G&nbsp;Pay</span><span class="pay-ic">Viva.com</span></div>
  <div class="legal"><span>© 2026 WOOD CBD — JM BULLY · SIRET 888 112 836 00018 · THC &lt; 0,3 % · Vente interdite aux mineurs (18+).</span><span class="tag tag-maquette">Site de démonstration · aucune vraie commande</span></div></div>`;}
function botnavHTML(active){const I={home:'<path d="M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>',fleurs:'<path d="M12 2s5 4 5 10a5 5 0 0 1-10 0c0-6 5-10 5-10Z"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',cart:'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/>',shop:'<path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>'};
  const a=(k,href,lbl,cls="")=>`<a href="${href}" class="${cls}${active===k?' active':''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${I[k]}</svg>${lbl}</a>`;
  return a('home','index.html','Accueil')+a('fleurs','fleurs.html','Fleurs')+a('search','fleurs.html','Explorer')+`<a href="panier.html" data-cart-open class="bn-cart${active==='cart'?' active':''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${I.cart}</svg><span class="cart-count" id="cartCountM">0</span>Pochon</a>`+a('shop','index.html#boutiques','Boutiques');}
function advisorHTML(){return `<span class="ava">🌿</span><span class="txt">Besoin d'aide pour choisir ?<small>On te met bien 😉</small></span>`;}

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
  const cnt=document.getElementById("cdCount"); if(cnt)cnt.textContent=`${nItems} article${nItems>1?'s':''} · ${nGr} g`;
  ship.innerHTML=rem>0
    ?`<p class="cd-ship-t">Plus que <b>${rem.toFixed(2)} €</b> pour la <b>livraison offerte</b> 🚚</p><div class="cd-bar"><i style="width:${pct}%"></i></div>`
    :`<p class="cd-ship-t ok">🎉 Livraison offerte débloquée !</p><div class="cd-bar"><i style="width:100%"></i></div>`;
  const itemsHtml=cart.map(x=>{const pf=byId(x.slug),base=pf?pf.p[0]:x.unit,sv=Math.round((1-(x.unit/x.g)/base)*100);return `<div class="cd-item">
    <img src="assets/products/${x.slug}.jpg${IMGV}" alt="" onerror="this.style.visibility='hidden'">
    <div class="cd-it-info"><b>${x.nom}</b><span class="cd-it-meta"><b>${x.g} g</b> · ${x.unit.toFixed(2)} €${sv>=8?` · <em class="cd-sv">−${sv}%</em>`:''}</span>
      <div class="cd-qty"><button data-cd-dec="${x.slug}" data-g="${x.g}" aria-label="Moins">−</button><span>${x.q}</span><button data-cd-inc="${x.slug}" data-g="${x.g}" aria-label="Plus">+</button></div></div>
    <div class="cd-it-side"><b>${(x.unit*x.q).toFixed(2)} €</b><small class="cd-it-g">${x.g*x.q} g</small><button class="cd-del" data-cd-del="${x.slug}" data-g="${x.g}" aria-label="Retirer">🗑</button></div>
  </div>`;}).join("");
  const picks=(typeof FLEURS!=="undefined"?FLEURS:[]).filter(f=>!cart.some(x=>x.slug===f.slug)).slice(0,2);
  const xsell=picks.length?`<div class="cd-xsell"><div class="cd-xsell-h">Souvent pris avec 👀</div>${picks.map(f=>`<div class="cd-x"><img src="assets/products/${f.slug}.jpg${IMGV}" alt="" onerror="this.style.visibility='hidden'"><div class="cd-x-info"><b>${f.nom}</b><span class="muted">dès ${f.p[0]} € · 3 g</span></div><button class="cd-x-add" data-add="${f.slug}" aria-label="Ajouter ${f.nom} au pochon">+</button></div>`).join("")}</div>`:"";
  items.innerHTML=itemsHtml+xsell;
  foot.innerHTML=`<div class="cd-sub"><span>Sous-total <small class="muted">· ${nItems} art. · ${nGr} g</small></span><b>${sub.toFixed(2)} €</b></div>
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
  const bar=document.getElementById("filterBar");
  const tiers=[["all","Tout"],["boostes","Boostés"],["soft","Soft"],["classique","Classique"]];
  const aromas=[["all","Tous les goûts"],["fruite","🍓 Fruité"],["agrumes","🍊 Agrumes"],["terreux","🌲 Boisé"],["frais","🌿 Frais"],["sucre","🍯 Gourmand"],["floral","🌸 Floral"],["classique","✦ Classique"]];
  bar.innerHTML=`<div class="filters">${tiers.map(([k,l])=>`<button class="chip filt${tier===k?' on':''}" data-tier="${k}">${l}</button>`).join("")}
    <select id="sortSel" class="sortsel"><option value="pop">Populaire</option><option value="asc">Prix ↑</option><option value="desc">Prix ↓</option></select></div>
    <div class="filters filters-aroma">${aromas.map(([k,l])=>`<button class="chip filt-a${aroma===k?' on':''}" data-aroma="${k}">${l}</button>`).join("")}</div>`;
  function draw(){
    let list=FLEURS.filter(f=>(tier==="all"||f.tier===tier)&&(aroma==="all"||(PROFILE[f.slug]&&PROFILE[f.slug].a===aroma)));
    if(sort==="asc")list=[...list].sort((a,b)=>a.p[0]-b.p[0]);
    if(sort==="desc")list=[...list].sort((a,b)=>b.p[0]-a.p[0]);
    document.getElementById("resCount").textContent=`${list.length} variété${list.length>1?"s":""}`;
    grid.innerHTML=list.length?list.map((f,i)=>cardHTML(f,i)).join(""):`<p class="muted" style="grid-column:1/-1;padding:2rem 0">Aucune variété pour ce goût. <button class="linklike" id="resetFilt">Tout afficher →</button></p>`;
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
        <p class="p-desc">${f.desc} · Fleur CBD · <span class="muted">profil de goût</span></p>
        ${buyBlock(f)}
        <div class="p-reassure"><span>🚚 Livraison discrète 24-48h</span><span>🔒 Paiement sécurisé</span><span>🔞 Réservé aux +18 ans</span></div>
        <div class="accordions">
          <details open><summary>Description</summary><p>${f.nom}, une fleur de CBD au profil « ${f.desc.replace(/[^\p{L}\s]/gu,'').trim().toLowerCase()} ». Sélectionnée par WOOD, présentée sous cloche. Visuel de démonstration généré — remplacé par les photos réelles de la boutique.</p></details>
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
  if(sticky)sticky.addEventListener("click",()=>{const pick=document.querySelector("#product .card-pick");if(!pick)return;let tn=0,tg=0;pick.querySelectorAll(".cp-row").forEach(row=>{const gii=+row.dataset.gi,q=+row.querySelector(".cp-n").textContent||0;if(q>0){cartAdd(f.slug,GRAMS[gii],q);tn+=q;tg+=GRAMS[gii]*q;row.querySelector(".cp-n").textContent="0";}});if(tn>0){updatePick(pick);bumpCartBtn();toast(`Ajouté : ${tn} pochon${tn>1?'s':''} · ${tg} g de ${f.nom} ✓`);openCartDrawer();}});
  // related
  const rel=FLEURS.filter(x=>x.tier===f.tier&&x.slug!==f.slug).slice(0,4);
  const relRail=document.getElementById("relRail"); relRail.innerHTML=(rel.length?rel:FLEURS.slice(0,4)).map((x,i)=>cardHTML(x,i)).join("");
  document.title=`${f.nom} — WOOD CBD`;
}

/* ===================== PAGE : PANIER ===================== */
function renderCart(){
  const root=document.getElementById("cart"); if(!root)return;
  window.__renderCart=renderCart;
  if(!cart.length){root.innerHTML=`<div class="cart-empty"><div class="ava-big">🌿</div><h2 class="serif">Ton pochon est vide…</h2><p class="muted">On répare ça ?</p><a href="fleurs.html" class="btn btn-primary">Découvrir les fleurs →</a></div>`;return;}
  const sub=cart.reduce((s,x)=>s+x.unit*x.q,0);
  const free=60, left=Math.max(0,free-sub);
  const nItems=cart.reduce((s,x)=>s+x.q,0), nGr=cart.reduce((s,x)=>s+x.g*x.q,0);
  root.innerHTML=`<h1 class="serif">Ton pochon <span class="cart-count-h">${nItems} article${nItems>1?'s':''} · ${nGr} g</span></h1>
    <div class="cart-grid">
      <div class="cart-items">${cart.map((x,i)=>`<div class="cart-item"><div class="ci-media"><img src="assets/products/${x.slug}.jpg${IMGV}" alt="" onerror="this.outerHTML='<div>'+window.__cloche('${x.slug}')+'</div>'"></div>
        <div class="ci-info"><div class="ci-name">${x.nom}</div><div class="muted ci-meta"><b>${x.g} g</b> · ${euro(x.unit)}${(()=>{const pf=byId(x.slug),base=pf?pf.p[0]:x.unit,sv=Math.round((1-(x.unit/x.g)/base)*100);return sv>=8?` · <span class="ci-sv">−${sv}%</span>`:'';})()} · total <b>${x.g*x.q} g</b></div></div>
        <div class="ci-qty"><button data-dec="${i}">−</button><span>${x.q}</span><button data-inc="${i}">+</button></div>
        <div class="ci-line">${euro(x.unit*x.q)}</div><button class="ci-del" data-del="${i}" aria-label="Retirer">✕</button></div>`).join("")}</div>
      <aside class="cart-sum">
        <h3 class="serif">Résumé</h3>
        ${left>0?`<div class="freebar"><div class="freebar-fill" style="width:${Math.min(100,sub/free*100)}%"></div></div><p class="muted" style="font-size:.85rem">Plus que <strong>${euro(left)}</strong> pour la livraison offerte 🎉</p>`:`<p class="lime" style="font-weight:700">🎉 Livraison offerte !</p>`}
        <div class="sum-row"><span>Sous-total</span><strong>${euro(sub)}</strong></div>
        <div class="sum-row muted"><span>Livraison</span><span>${left>0?"calculée à l'étape suivante":"Offerte"}</span></div>
        <a class="btn btn-primary" href="checkout.html" style="width:100%;justify-content:center;margin-top:1rem">Passer commande →</a>
        <p class="muted" style="font-size:.78rem;text-align:center;margin-top:.8rem">Démo : aucune vraie commande ni paiement.</p>
      </aside></div>`;
}

/* ===================== PAGE : BIENTÔT (gammes à venir) ===================== */
function renderBientot(){
  const root=document.getElementById("bientot"); if(!root)return;
  const cat=new URLSearchParams(location.search).get("cat")||"resines";
  const T={resines:["Les résines","Hash & résines CBD de la boutique — bientôt en ligne. En attendant, viens les découvrir dans nos boutiques à Nice."],
    huiles:["Huiles & infusions","Huiles, tisanes et infusions CBD — bientôt disponibles sur le site."],
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
function renderCheckout(){
  const root=document.getElementById("checkout"); if(!root)return;
  if(!cart.length){location.href="panier.html";return;}
  const sub=cart.reduce((s,x)=>s+x.unit*x.q,0); const ship=sub>=60?0:4.9;
  root.innerHTML=`<a class="breadcrumb" href="panier.html">← Retour au pochon</a>
    <h1 class="serif">Commande</h1>
    <div class="checkout-grid">
      <form class="checkout-form" id="coForm">
        <h3 class="serif">Tes coordonnées</h3>
        <div class="field"><label>Prénom & nom</label><input required name="nom" autocomplete="name"></div>
        <div class="field"><label>E-mail</label><input required type="email" name="email" autocomplete="email" inputmode="email"></div>
        <div class="field"><label>Téléphone</label><input type="tel" name="tel" autocomplete="tel" inputmode="tel"></div>
        <h3 class="serif">Livraison</h3>
        <div class="radios">
          <label class="radio"><input type="radio" name="mode" value="livraison" checked> 🚚 Livraison à domicile (24–48h)</label>
          <label class="radio"><input type="radio" name="mode" value="cc"> 🏪 Retrait en boutique (click & collect)</label>
        </div>
        <div class="field"><label>Adresse</label><input name="adresse" autocomplete="street-address"></div>
        <div class="field two"><div><label>Code postal</label><input name="cp" inputmode="numeric" autocomplete="postal-code"></div><div><label>Ville</label><input name="ville" autocomplete="address-level2"></div></div>
        <h3 class="serif">Paiement</h3>
        <div class="pay-demo">💳 Paiement sécurisé par <strong>Viva.com</strong> <span class="tag tag-maquette">démo · paiement désactivé</span></div>
        <label class="checkbox"><input type="checkbox" required> J'ai <strong>18 ans ou plus</strong> et j'accepte les <a href="cgv.html" target="_blank">CGV</a>.</label>
        <button class="btn btn-primary" type="submit" style="width:100%;justify-content:center;margin-top:1rem">Confirmer la commande →</button>
        <p class="muted" style="font-size:.78rem;text-align:center;margin-top:.6rem">Démo : aucune commande ni paiement réels.</p>
      </form>
      <aside class="cart-sum">
        <h3 class="serif">Résumé</h3>
        ${cart.map(x=>`<div class="sum-row"><span>${x.nom} ×${x.q} <small class="muted">(${x.g} g)</small></span><strong>${euro(x.unit*x.q)}</strong></div>`).join("")}
        <div class="promo-row"><input id="promoInput" placeholder="Code promo" autocomplete="off"><button type="button" class="btn btn-ghost" id="promoBtn">Appliquer</button></div>
        <p class="promo-msg" id="promoMsg" hidden></p>
        <div id="sumTotals"></div>
        <p class="muted" style="font-size:.72rem;margin-top:.5rem">Codes d'essai : WOOD10 · BIENVENUE · LIVRAISON <span class="tag tag-maquette">démo</span></p>
      </aside>
    </div>`;
  const PROMOS={WOOD10:{t:"pct",v:10,l:"−10 %"},BIENVENUE:{t:"pct",v:15,l:"−15 %"},LIVRAISON:{t:"ship",l:"livraison offerte"}};
  let promo=null, promoCode="";
  function renderTotals(){
    let ship2=sub>=60?0:4.9, disc=0;
    if(promo){ if(promo.t==="pct")disc=sub*promo.v/100; else if(promo.t==="ship")ship2=0; }
    const total=Math.max(0,sub-disc)+ship2;
    document.getElementById("sumTotals").innerHTML=
      (disc>0?`<div class="sum-row promo"><span>Code ${promoCode}</span><b>−${euro(disc)}</b></div>`:"")
      +`<div class="sum-row"><span>Livraison</span><span>${ship2?euro(ship2):"Offerte"}</span></div>`
      +`<div class="sum-row" style="font-size:1.15rem"><span>Total</span><strong>${euro(total)}</strong></div>`;
    window.__coTotal=total;
  }
  renderTotals();
  document.getElementById("promoBtn").addEventListener("click",()=>{
    const code=(document.getElementById("promoInput").value||"").trim().toUpperCase();
    const msg=document.getElementById("promoMsg"), p=PROMOS[code];
    if(p){promo=p;promoCode=code;msg.textContent=`Code « ${code} » appliqué ✓ (${p.l})`;msg.className="promo-msg ok";}
    else{promo=null;promoCode="";msg.textContent="Code promo invalide.";msg.className="promo-msg err";}
    msg.hidden=false; renderTotals();
  });
  document.getElementById("coForm").addEventListener("submit",e=>{e.preventDefault();
    const d=Object.fromEntries(new FormData(e.target));
    sessionStorage.setItem("wood_lastorder",JSON.stringify({nom:d.nom||"",total:(window.__coTotal!=null?window.__coTotal:sub+ship),num:"WD-"+String(Date.now()).slice(-6),n:cartCount()}));
    cart=[];saveCart();updateCartBadges();location.href="confirmation.html";
  });
}
function renderConfirm(){
  const root=document.getElementById("confirm"); if(!root)return;
  const o=JSON.parse(sessionStorage.getItem("wood_lastorder")||"null");
  const prenom=o&&o.nom?o.nom.split(" ")[0]:"";
  root.innerHTML=`<div class="confirm-box">
    <div class="ava-big">🎉</div>
    <h1 class="serif">Merci ${prenom} !</h1>
    <p class="muted">Ta commande ${o?`<strong class="cyan">${o.num}</strong>`:""} est bien prise en compte.<br>On va te mettre bien 😉</p>
    <div class="tag tag-maquette" style="margin:1.2rem 0">Démo — aucune vraie commande/paiement · aucun e-mail envoyé</div>
    <p class="muted" style="font-size:.86rem;max-width:40ch;margin-inline:auto">En vrai, tu recevrais ici un e-mail de confirmation avec ton <strong>bon de commande</strong> et ta <strong>facture</strong>.</p>
    <a href="fleurs.html" class="btn btn-primary" style="margin-top:1.4rem">Continuer mes achats →</a>
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
  g.innerHTML=["euphoria","purple","orange-bud","rainbow","velvet-kush","nimbus-3000"].map(s=>`<a class="insta-cell reveal" href="https://instagram.com/wood.cbdshop" target="_blank" rel="noopener"><img src="assets/products/${s}.jpg${IMGV}" alt="" loading="lazy"><span class="insta-ic">◎</span></a>`).join("");
}

/* ===================== STICKERS (mur défilant) ===================== */
const STICKERS=[
  {t:"Si c'est WOOD c'est GOOD",c:""},{t:"100% légal",c:"alt"},{t:"THC &lt; 0,3%",c:"dark"},
  {t:"Nice · 06",c:"pink r6"},{t:"Testé labo 🔬",c:"white rn3"},{t:"Chill ✌️",c:"alt r10"},
  {t:"Premium",c:"r6"},{t:"Depuis 2020",c:"dark rn3"},{t:"Sans pression",c:"pink"},
  {t:"Graffiti lover",c:"white r6"},{t:"Good vibes ☘",c:"alt rn3"},{t:"New drop 🔥",c:"pink r10"}
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
  const state={aroma:null,intensity:null,format:null};
  const steps=[
    {key:"aroma",q:"Qu'est-ce qui te ferait plaisir ?",sub:"On parle goût & arôme, promis — rien de médical 😉",opts:[["fruite","Fruité 🍓"],["agrumes","Agrumes 🍊"],["terreux","Terreux / boisé 🌰"],["frais","Frais & végétal 🌿"],["sucre","Sucré / gourmand 🍯"],["classique","Classique ✳"]]},
    {key:"intensity",q:"Tu préfères quelle intensité d'arôme ?",opts:[["doux","Douce 🤍"],["equilibre","Équilibrée ⚖️"],["intense","Intense 🔥"]]},
    {key:"format",q:"Et côté format ?",opts:[["essai","Petit essai (1–3 g)"],["habituel","Mon habituel (5–10 g)"],["stock","Je fais du stock (25 g)"]]},
  ];
  let i=0;
  const wrap=inner=>`<div class="adv-sheet"><button class="adv-close" aria-label="Fermer">✕</button>
    <div class="adv-top"><span class="adv-ava">🌿</span><div><strong>Le conseiller WOOD</strong><small>conseil de goût, pas un avis médical</small></div></div>${inner}</div>`;
  function render(){
    if(i<steps.length){const s=steps[i];
      ov.innerHTML=wrap(`<div class="adv-progress"><span style="width:${i/steps.length*100}%"></span></div>
        <div class="adv-q">${s.q}</div>${s.sub?`<div class="adv-sub">${s.sub}</div>`:""}
        <div class="adv-opts">${s.opts.map(([v,l])=>`<button class="adv-opt" data-v="${v}">${l}</button>`).join("")}</div>
        ${i>0?`<button class="adv-back">← Retour</button>`:""}`);
    } else {
      const scored=FLEURS.map(f=>{const p=PROFILE[f.slug]||{};let sc=0;if(p.a===state.aroma)sc+=3;if(p.i===state.intensity)sc+=2;return {f,sc};}).sort((a,b)=>b.sc-a.sc);
      const top=scored.slice(0,3).map(x=>x.f);
      ov.innerHTML=wrap(`<div class="adv-q">Voilà pour toi 🌿</div>
        <div class="adv-why">Parce que tu aimes le <strong>${LBL.aroma[state.aroma]}</strong> · intensité <strong>${LBL.intensity[state.intensity]}</strong> :</div>
        <div class="adv-res">${top.map((f,k)=>cardHTML(f,k)).join("")}</div>
        <button class="adv-restart">↺ Recommencer</button>`);
      ov.querySelectorAll(".reveal").forEach(e=>e.classList.add("in"));
    }
  }
  ov.addEventListener("click",e=>{
    if(e.target===ov||e.target.closest(".adv-close")){ov.remove();return;}
    const o=e.target.closest(".adv-opt"); if(o){state[steps[i].key]=o.dataset.v;i++;render();return;}
    if(e.target.closest(".adv-back")){i=Math.max(0,i-1);render();return;}
    if(e.target.closest(".adv-restart")){i=0;state.aroma=state.intensity=state.format=null;render();return;}
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
  if(rail){const order=["nimbus-3000","purple","euphoria","orange-bud","velvet-kush","rainbow","cosmic-cbg","fanta-hazy"];rail.innerHTML=order.map((s,i)=>cardHTML(byId(s),i)).join("");}
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
    if(step){e.preventDefault();const row=step.closest(".cp-row"),n=row.querySelector(".cp-n");let v=(+n.textContent||0)+(step.hasAttribute("data-cp-inc")?1:-1);if(v<0)v=0;if(v>99)v=99;n.textContent=v;updatePick(step.closest(".card-pick"));return;}
    // Ajouter tout le choix (multi-grammages)
    const addP=e.target.closest("[data-add-pick]");
    if(addP){e.preventDefault();const pick=addP.closest(".card-pick"),slug=addP.dataset.addPick,f=byId(slug);if(!pick||!f)return;
      let tn=0,tg=0;pick.querySelectorAll(".cp-row").forEach(row=>{const gi=+row.dataset.gi,q=+row.querySelector(".cp-n").textContent||0;if(q>0){cartAdd(slug,GRAMS[gi],q);tn+=q;tg+=GRAMS[gi]*q;row.querySelector(".cp-n").textContent="0";}});
      if(tn>0){updatePick(pick);bumpCartBtn();toast(`Ajouté : ${tn} pochon${tn>1?'s':''} · ${tg} g de ${f.nom} ✓`);openCartDrawer();}
      return;}
    // ajout simple (ex. cross-sell) : 3 g par defaut
    const a=e.target.closest("[data-add]"); if(a){e.preventDefault();const gi=a.dataset.gi!==undefined?+a.dataset.gi:1;addToCart(a.dataset.add,GRAMS[gi]);return;}
    const qv=e.target.closest("[data-qv]"); if(qv){e.preventDefault();openQuickView(qv.dataset.qv);return;}
    const fav=e.target.closest("[data-fav]"); if(fav){e.preventDefault();toggleFav(fav.dataset.fav);return;}
  });
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
      <div class="mnu-head"><a class="logo" href="index.html"><span class="star">${markSVG()}</span>Wood</a><button class="mnu-close" aria-label="Fermer">✕</button></div>
      <nav class="mnu-nav">
        <a href="fleurs.html"><span>🌿 Fleurs CBD</span><span class="arr">→</span></a>
        <a href="fleurs.html?tier=boostes"><span>⚡ Boostés</span><span class="arr">→</span></a>
        <a href="bientot.html?cat=resines"><span>🟤 Résines <em>bientôt</em></span><span class="arr">→</span></a>
        <a href="bientot.html?cat=huiles"><span>💧 Huiles & infusions <em>bientôt</em></span><span class="arr">→</span></a>
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
