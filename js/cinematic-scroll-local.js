/** Offline cinematic fallback. Uses native scroll positions and rAF interpolation.
 * Not a replacement for the official Lenis package: only used if it cannot load.
 */
(() => {
  'use strict';
  const doc=document, win=window, root=doc.documentElement;
  const reduced=win.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse=win.matchMedia('(pointer: coarse)');
  let current=win.scrollY, target=current, running=false, raf=0, active=false, internalScroll=false;
  const LERP=0.072, MULTIPLIER=1.07;
  const clamp=(v,lo,hi)=>Math.min(Math.max(v,lo),hi);
  const maxScroll=()=>Math.max(0,root.scrollHeight-root.clientHeight);
  const headerHeight=()=>doc.querySelector('.site-header')?.getBoundingClientRect().height||0;
  function allowed(){return !reduced.matches&&!coarse.matches&&!win.gvLenis;}
  function stop(){running=false;cancelAnimationFrame(raf);raf=0;}
  function tick(){
    if(!active){stop();return;}
    const distance=target-current;
    current+=distance*LERP;
    if(Math.abs(distance)<0.45){current=target;running=false;}
    internalScroll=true;
    win.scrollTo({left:0,top:Math.round(current*100)/100,behavior:'instant'});
    internalScroll=false;
    if(running)raf=win.requestAnimationFrame(tick);
  }
  function start(){if(!running){running=true;raf=win.requestAnimationFrame(tick);}}
  function onWheel(ev){
    if(!active||doc.body.classList.contains('menu-open')||ev.defaultPrevented||ev.ctrlKey||ev.metaKey||ev.shiftKey||Math.abs(ev.deltaX)>Math.abs(ev.deltaY))return;
    if(ev.target.closest('input,textarea,select,[contenteditable="true"],[data-lenis-prevent]'))return;
    // Native handling inside independently scrollable components.
    for(let el=ev.target;el && el!==doc.body;el=el.parentElement){
      if(el.scrollHeight>el.clientHeight+2 && /(auto|scroll)/.test(getComputedStyle(el).overflowY))return;
    }
    ev.preventDefault();
    const unit=ev.deltaMode===1?16:ev.deltaMode===2?win.innerHeight:1;
    // If another agent scrolled the page between events, reconcile positions.
    if(!running){current=win.scrollY;target=current;}
    target=clamp(target+ev.deltaY*unit*MULTIPLIER,0,maxScroll());
    start();
  }
  function onScroll(){if(!internalScroll&&!running){current=win.scrollY;target=current;}}
  // Public route for explicit navigation actions such as the footer's back-to-top.
  // Keeps the fallback interpolation target in sync with programmatic navigation.
  win.gvLocalScrollTo=function(y){
    if(!active)return false;
    current=win.scrollY;
    target=clamp(Number(y)||0,0,maxScroll());
    if(Math.abs(target-current)<0.5){stop();return true;}
    start();
    return true;
  };
  function onAnchor(ev){
    const a=ev.target.closest('a[href^="#"]');
    if(!active||!a)return;
    const id=a.getAttribute('href').slice(1);
    if(!id)return;
    const el=doc.getElementById(id);
    if(!el)return;
    ev.preventDefault();
    if(!running){current=win.scrollY;target=current;}
    target=clamp(win.scrollY+el.getBoundingClientRect().top-headerHeight()-8,0,maxScroll());
    win.history.pushState(null,'','#'+encodeURIComponent(id));
    start();
  }
  function update(){
    const should=allowed();
    if(active===should)return;
    active=should;
    if(active){current=win.scrollY;target=current;root.dataset.motionEngine='local-smooth';root.classList.add('local-cinematic-scroll');}
    else{stop();root.classList.remove('local-cinematic-scroll');if(!win.gvLenis)root.dataset.motionEngine=reduced.matches?'reduced':coarse.matches?'native-touch':'native-fallback';}
  }
  win.addEventListener('wheel',onWheel,{passive:false});
  win.addEventListener('scroll',onScroll,{passive:true});
  win.addEventListener('resize',()=>{target=clamp(target,0,maxScroll());},{passive:true});
  doc.addEventListener('click',onAnchor);
  win.addEventListener('gv:lenis-ready',update);
  win.addEventListener('gv:lenis-destroyed',update);
  reduced.addEventListener?.('change',update);
  coarse.addEventListener?.('change',update);
  update();
})();
