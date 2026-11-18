// Arquivo Vivo v39 — controles responsivos, acordeão animado e barra de progresso de leitura.
(() => {
  const GV=window.GV;
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

  // Acordeão do Processo: abre/fecha com altura animada (Web Animations API), um item aberto por vez.
  // Sem JS (ou se algo falhar) o <details> nativo continua funcionando normalmente.
  const details=[...document.querySelectorAll('.method-steps details')];
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const OPEN_EASE='cubic-bezier(.16,1,.3,1)',CLOSE_EASE='cubic-bezier(.65,0,.35,1)';
  function setOpen(item,open){
    const content=item.querySelector('.step-content');
    if(!content)return;
    item.dataset.state=open?'open':'closed';
    if(reduceMotion.matches||!content.animate){item.open=open;return}
    // Mede a altura atual ANTES de cancelar (o clique pode chegar no meio de outra animação).
    const from=item.open?content.offsetHeight:0;
    item._anim?.cancel();
    const cs=getComputedStyle(content);
    if(open)item.open=true;
    // Com box-sizing: border-box o padding não encolhe abaixo do próprio valor: anima-o junto.
    const natural=()=>({height:content.scrollHeight+'px',paddingTop:cs.paddingTop,paddingBottom:cs.paddingBottom,opacity:1});
    const shut={height:'0px',paddingTop:'0px',paddingBottom:'0px',opacity:0};
    content.style.overflow='hidden';
    const toFrame=open?natural():shut;
    const fromFrame=from?{height:from+'px',paddingTop:cs.paddingTop,paddingBottom:cs.paddingBottom,opacity:open?Math.min(1,from/Math.max(1,content.scrollHeight)):1}:shut;
    const anim=content.animate([fromFrame,toFrame],{duration:open?640:440,easing:open?OPEN_EASE:CLOSE_EASE});
    item._anim=anim;
    anim.onfinish=()=>{content.style.overflow='';item._anim=null;if(!open)item.open=false;GV?.invalidate()};
  }
  details.forEach(item=>{
    item.dataset.state=item.open?'open':'closed';
    item.querySelector('summary')?.addEventListener('click',ev=>{
      ev.preventDefault();
      const willOpen=item.dataset.state!=='open';
      if(willOpen)details.forEach(other=>{if(other!==item&&other.dataset.state==='open')setOpen(other,false)});
      setOpen(item,willOpen);
    });
  });

  // Rodapé "Voltar ao início": mesma curva e duração dos saltos de âncora, em qualquer motor de rolagem.
  const topLink=document.querySelector('.site-footer a[href="#topo"]');
  topLink?.addEventListener('click',event=>{
    event.preventDefault();
    event.stopPropagation(); // evita tratamento duplicado pelo manipulador global de âncoras
    closeMenu();
    if(GV)GV.scrollTo(0);else window.scrollTo({top:0,left:0,behavior:reduceMotion.matches?'instant':'smooth'});
    // O histórico é best-effort; a rolagem funciona mesmo em pré-visualizações com sandbox.
    try{if(window.location.protocol!=='about:'&&window.location.hash!=='#inicio')window.history.replaceState(null,'',window.location.pathname+window.location.search+'#inicio');}catch{}
  },true);

  // Barra de progresso: só transform (sem layout), atualizada no relógio único.
  const progress=document.getElementById('reading-progress');
  if(progress&&GV){
    let last=-1;
    GV.onFrame((t,y)=>{
      const p=Math.min(1,Math.max(0,y/Math.max(1,GV.limit())));
      if(p!==last){last=p;progress.style.transform='scaleX('+p.toFixed(4)+')'}
    });
  }
})();
