const toggle=document.getElementById('hamb');
const nav=document.getElementById('navigation');
function closeMenu(){if(!toggle||!nav)return;nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Ouvrir le menu');toggle.textContent='☰';}
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');toggle.textContent=open?'×':'☰';});nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
