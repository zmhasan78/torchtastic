// NAV
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>50));
const navToggle=document.getElementById('navToggle'),navLinks=document.getElementById('navLinks');
navToggle.addEventListener('click',()=>{navLinks.classList.toggle('active');navToggle.classList.toggle('active');});
navLinks.querySelectorAll('a').forEach(l=>l.addEventListener('click',()=>{navLinks.classList.remove('active');navToggle.classList.remove('active');}));

// EMBERS
const pc=document.getElementById('particles');
const colors=['#FF5A1F','#FF7A18','#FFC857','#FF2D20','#FF9A3C'];
const ss=document.createElement('style');
ss.textContent=`@keyframes ember-drift{0%{opacity:0;transform:translateY(0) translateX(0) scale(1) rotate(0deg);}10%{opacity:.9;}60%{opacity:.4;}100%{opacity:0;transform:translateY(-500px) translateX(var(--drift,0px)) scale(.15) rotate(200deg);}}`;
document.head.appendChild(ss);
function spawnEmber(){
  const e=document.createElement('div');e.classList.add('particle');
  const c=colors[Math.floor(Math.random()*colors.length)],sz=2+Math.random()*5,x=20+Math.random()*60,dur=3+Math.random()*4,del=Math.random()*.5,dr=(Math.random()-.5)*120;
  e.style.cssText=`left:${x}%;bottom:10%;width:${sz}px;height:${sz}px;background:${c};box-shadow:0 0 ${sz*2}px ${c},0 0 ${sz*4}px ${c};--drift:${dr}px;animation:ember-drift ${dur}s ease-out ${del}s forwards;`;
  pc.appendChild(e);setTimeout(()=>e.remove(),(dur+del)*1000+200);
}
setInterval(spawnEmber,200);for(let i=0;i<15;i++)setTimeout(spawnEmber,i*100);

// SCROLL REVEAL
const rev=document.querySelectorAll('.section-tag,.section-title,.about-content p,.about-stats,.cash-card,.why-card,.program-card,.media-main,.media-item,.book-feature,.books-list,.spark-quote,.booking-info,.booking-form-wrap');
const obs=new IntersectionObserver(ents=>{ents.forEach(en=>{if(en.isIntersecting){en.target.style.opacity='1';en.target.style.transform='translateY(0)';obs.unobserve(en.target);}});},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
rev.forEach((el,i)=>{el.style.opacity='0';el.style.transform='translateY(30px)';el.style.transition=`opacity .6s ease ${i%4*.1}s,transform .6s ease ${i%4*.1}s`;obs.observe(el);});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',function(e){e.preventDefault();const t=document.querySelector(this.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'});});});

// FORM
const bf=document.getElementById('bookingForm');
if(bf)bf.addEventListener('submit',function(e){e.preventDefault();
  // Track form submission in Google Analytics
  if(typeof gtag==='function') gtag('event','form_submit',{event_category:'engagement',event_label:'booking_inquiry'});
  const b=this.querySelector('button[type="submit"]'),o=b.innerHTML;b.innerHTML='SENDING...';b.disabled=true;setTimeout(()=>{b.innerHTML='INQUIRY SENT!';b.style.background='linear-gradient(135deg,#22c55e,#16a34a)';setTimeout(()=>{b.innerHTML=o;b.style.background='';b.disabled=false;bf.reset();},3000);},1500);});

// Track Amazon button clicks
document.querySelectorAll('.btn-amazon').forEach(btn=>{btn.addEventListener('click',()=>{if(typeof gtag==='function') gtag('event','click',{event_category:'outbound',event_label:'amazon_book'});});});

// Track social link clicks
document.querySelectorAll('.social-link').forEach(link=>{link.addEventListener('click',()=>{const platform=link.getAttribute('aria-label')||'unknown';if(typeof gtag==='function') gtag('event','click',{event_category:'social',event_label:platform});});});

// PARALLAX on hero character
const hc=document.querySelector('.hero-character');
if(hc&&window.innerWidth>1024){window.addEventListener('mousemove',e=>{const x=(e.clientX/window.innerWidth-.5)*15,y=(e.clientY/window.innerHeight-.5)*10;hc.style.transform=`translate(${x}px,${y}px)`;});}
