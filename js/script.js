// Arquivo Vivo v7 — responsive controls and reading progress.
(() => {
  const menu=document.getElementById('menu-button'),nav=document.getElementById('site-nav');
  const closeMenu=()=>{menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Abrir menu');nav?.classList.remove('is-open');document.body.classList.remove('menu-open')};
  menu?.addEventListener('click',()=>{
    const opened=menu.getAttribute('aria-expanded')!=='true';
    menu.setAttribute('aria-expanded',String(opened));menu.setAttribute('aria-label',opened?'Fechar menu':'Abrir menu');
    nav.classList.toggle('is-open',opened);document.body.classList.toggle('menu-open',opened);
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape')closeMenu()});
  document.addEventListener('pointerdown',ev=>{if(menu?.getAttribute('aria-expanded')==='true'&&!nav?.contains(ev.target)&&!menu.contains(ev.target))closeMenu()});
  matchMedia('(min-width: 1000px)').addEventListener?.('change',closeMenu);
  const details=[...document.querySelectorAll('.method-steps details')],num=document.getElementById('method-active-number');
  details.forEach((item,index)=>item.addEventListener('toggle',()=>{if(!item.open)return;details.forEach(other=>{if(other!==item)other.open=false});if(num)num.textContent=String(index+1).padStart(2,'0')}));
  // Footer CTA: scroll reliably to the actual page start on touch Safari,
  // with Lenis on desktop and the local cinematic fallback when offline.
  const topLink=document.querySelector('.site-footer a[href="#topo"]');
  topLink?.addEventListener('click',event=>{
    event.preventDefault();
    event.stopPropagation(); // Avoid duplicate anchor handlers from local fallback.
    closeMenu();
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(window.gvLenis && !reduced){
      window.gvLenis.scrollTo(0,{offset:0,force:true});
    }else if(!reduced && typeof window.gvLocalScrollTo==='function' && window.gvLocalScrollTo(0)){
      // The offline wheel interpolator owns its target until it reaches zero.
    }else{
      window.scrollTo({top:0,left:0,behavior:reduced?'instant':'smooth'});
    }
    // History updates are best-effort; scroll still works in sandboxed previews.
    try{if(window.location.protocol!=='about:' && window.location.hash!=='#inicio')window.history.replaceState(null,'',window.location.pathname+window.location.search+'#inicio');}catch{}
  },true);
  const progress=document.getElementById('reading-progress');let scheduled=false;
  function update(){const root=document.documentElement;const range=Math.max(1,root.scrollHeight-root.clientHeight);if(progress)progress.style.width=`${Math.min(100,Math.max(0,window.scrollY/range*100)).toFixed(2)}%`;scheduled=false}
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}},{passive:true});window.addEventListener('resize',update);update();
})();
