/**
 * Gusthaf Versailles — Arquivo Vivo Motion v5
 * OFFLINE FIRST: all visible transitions run with browser APIs + CSS.
 * Lenis is initialized by lenis-integration.js (separate bootstrap).
 * Native animations remain available if the CDN is unavailable.
 */
(() => {
  'use strict';
  const d=document, win=window, body=d.body, root=d.documentElement;
  const reduce=win.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop=win.matchMedia('(min-width: 1000px)');
  const touch=win.matchMedia('(pointer: coarse)');
  const header=d.querySelector('.site-header');
  const frame=d.getElementById('motion-gallery-frame');
  const stage=d.getElementById('motion-gallery');
  const track=d.getElementById('gallery-track');
  const fraction=d.getElementById('gallery-fraction');
  const meter=d.getElementById('gallery-meter-progress');
  const panels=[...d.querySelectorAll('.gallery-panel')];
  const motionEnabled=!reduce.matches;
  const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const headerHeight=()=>header?header.getBoundingClientRect().height:86;
  let galleryEnabled=false, galleryTravel=1, galleryScrollDistance=1, lastScroll=-1, scheduled=false;
  let previousGalleryProgress=-1, lastFocusedIndex=-1, lastWidth=win.innerWidth, resizeTimer=0;
  let contentObserver;
  // Explicit diagnostics: inspect document.documentElement.dataset.motionEngine.
  root.dataset.motionEngine=motionEnabled?'native-fallback':'reduced';
  root.classList.toggle('motion-reduced',!motionEnabled);
  body.classList.add('motion-js');
  if (!motionEnabled) return;

  // Deliberately start the entrance on a second paint so opening local file://
  // reliably reveals an animation instead of a fully loaded static page.
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    body.classList.add('motion-intro-running');
    setTimeout(()=>body.classList.add('motion-intro-finished'),1550);
  }));

  // Content reveals run offline, even when Lenis/CDN is unavailable.
  // On narrow viewports, animate compact elements individually rather than entire
  // tall containers; this prevents delayed/abrupt reveals in iOS Safari.
  const narrow=win.matchMedia('(max-width: 700px)');
  // Never conceal the contact link behind two nested IntersectionObserver reveals.
  // Animate its surrounding copy separately; the link remains available without JS,
  // after fast flicks and on Safari back/forward navigation.
  const baseRevealSelector='.section-masthead, .work-annotation, .work-pair-item, .method-intro, .method-steps details, .outro-meta, .outro-center > p, .outro-center > h2';
  const aboutDesktopSelector='.statement-top > span, .statement-body h2, .statement-aside, .statement-bottom';
  const aboutSection=d.getElementById('sobre');
  const isAboutElement=el=>aboutSection?.contains(el);
  // On small screens Hero/Sobre can shift during font and image loading.
  // Never trigger Sobre before actual user scroll and the section reaches the
  // reading area; once revealed, the state is permanent (no reverse).
  function canReveal(el){
    if(!isAboutElement(el) || !narrow.matches)return true;
    const vh=win.innerHeight;
    return win.scrollY>30 && aboutSection.getBoundingClientRect().top<vh*.78 && el.getBoundingClientRect().top<vh*.84;
  }
  let revealObserver=null;
  const revealItems=new Set();
  function setVisible(el){
    // Keep motion-reveal while it transitions to .motion-in-view.
    // Removing it here would skip the intended transition completely.
    el.classList.add('motion-in-view');
    revealItems.delete(el);
  }
  function configureReveals(){
    if(revealObserver)revealObserver.disconnect();
    revealItems.forEach(setVisible);
    if(!('IntersectionObserver' in win))return;
    // Desktop and mobile share the SAME entrance choreography for Sobre.
    // Each group animates once and stays visible; there is no scroll reverse.
    const selector=baseRevealSelector+', '+aboutDesktopSelector;
    // A generous bottom trigger catches brisk mobile flicks and the browser's
    // collapsing address bar, without waiting for most of a tall block to enter.
    revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting && canReveal(entry.target)){
          setVisible(entry.target);
          revealObserver.unobserve(entry.target);
        }
      });
    },{threshold:0.01,rootMargin:'0px 0px -16% 0px'});
    d.querySelectorAll(selector).forEach(el=>{
      const rect=el.getBoundingClientRect();
      // Never conceal above-the-fold or already-scrolled-past content.
      // Only elements already above/past the viewport bypass animation
      // (e.g. Safari restoring scroll position via back-forward cache).
      if(rect.bottom<=0){setVisible(el);return;}
      el.classList.add('motion-reveal');
      el.classList.remove('motion-in-view');
      revealItems.add(el);
      revealObserver.observe(el);
    });
  }
  // One-shot ScrollTrigger-style reveal: no manual scroll-linked reversals.
  // The IntersectionObserver below handles both mobile and desktop.
  configureReveals();
  narrow.addEventListener?.('change',configureReveals);
  win.addEventListener('pageshow',()=>{
    // Safari can restore a page from its back/forward cache at a later scroll
    // position than the initial IntersectionObserver calculation.
    revealItems.forEach(el=>{
      if(el.getBoundingClientRect().bottom<0)setVisible(el);
    });
  });

  function setGalleryProgress(progress){
    const p=clamp(progress,0,1);
    const focused=Math.round(p*(panels.length-1));
    // Transform-only meter: no per-frame layout updates on mobile.
    if(meter)meter.style.transform=`scaleX(${p.toFixed(4)})`;
    if(focused!==lastFocusedIndex){
      if(fraction)fraction.textContent=String(focused+1).padStart(2,'0')+' / '+String(panels.length).padStart(2,'0');
      panels.forEach((panel,i)=>panel.classList.toggle('motion-current-panel',i===focused));
      lastFocusedIndex=focused;
    }
    // Layered image parallax is retained on desktop; on touch the sliding gallery is
    // itself the choreography. Avoid moving each large image on every touch frame.
    if(!touch.matches){
      panels.forEach((panel,i)=>{
        const local=clamp(p*(panels.length-1)-i,-1,1);
        panel.style.setProperty('--panel-progress',local.toFixed(4));
      });
    }
  }

  function configureGallery(){
    if(!frame||!stage||!track)return;
    const enabled=motionEnabled;
    if(!enabled){
      galleryEnabled=false;
      body.classList.remove('motion-gallery-ready');
      frame.style.height='';track.style.transform='';
      panels.forEach(p=>p.style.removeProperty('--panel-progress'));
      return;
    }
    galleryEnabled=true;
    body.classList.add('motion-gallery-ready');
    // Use the actual measured content width, not a fixed slide offset.
    galleryTravel=Math.max(1,track.scrollWidth-stage.clientWidth);
    // Three projects still pass horizontally on mobile. Shorter vertical travel
    // avoids the "stuck/heavy" sensation while preserving all three panels.
    galleryScrollDistance=Math.max(1,galleryTravel*(touch.matches?0.64:1));
    frame.style.height=`${Math.ceil(stage.offsetHeight+galleryScrollDistance)}px`;
    previousGalleryProgress=-1;lastFocusedIndex=-1;
    setGalleryProgress(0);
    schedule();
  }

  const hero=d.querySelector('.hero');
  const heroMark=d.querySelector('.hero-mark-field');
  const manifesto=d.querySelector('.statement');
  const manifestoImage=d.querySelector('.statement-aside img');
  const outro=d.querySelector('.outro');
  const outroArt=d.querySelector('.outro-graphic');
  const method=d.querySelector('.method');
  const methodSteps=[...d.querySelectorAll('.method-steps details')];
  const methodCounter=d.getElementById('method-active-number');
  const mobileCounter=d.getElementById('method-mobile-active-number');
  // v24: LEITURAS primeiro, ESCRITAS depois. No Safari, ler geometria após
  // alterar transforms/classes pode forçar uma atualização síncrona do layout.
  // Não guardamos posições da galeria entre quadros (regressão observada na v23).
  function collectRevealCandidates(){
    if(!revealItems.size)return [];
    const result=[];
    const trigger=win.innerHeight*.82;
    // Read all DOM positions before changing any class in this batch.
    for(const el of revealItems){
      if(el.getBoundingClientRect().top<=trigger && canReveal(el))result.push(el);
    }
    return result;
  }
  function render(){
    scheduled=false;
    const scrollY=win.scrollY;
    const toReveal=collectRevealCandidates();
    const shouldRender=scrollY!==lastScroll||galleryEnabled;

    // READ PHASE — use fresh geometry, including after changes to accordions,
    // fonts, responsive header height or Safari's address bar.
    let heroProgress=null, galleryProgress=null, aboutProgress=null, outroProgress=null, methodIndex=null;
    if(shouldRender){
      if(hero){
        const r=hero.getBoundingClientRect();
        if(r.bottom>0 && r.top<win.innerHeight){
          heroProgress=clamp((-r.top)/Math.max(1,r.height),0,1);
        }
      }
      if(galleryEnabled && frame){
        const r=frame.getBoundingClientRect();
        galleryProgress=clamp((headerHeight()-r.top)/galleryScrollDistance,0,1);
      }
      if(manifesto && manifestoImage){
        const r=manifesto.getBoundingClientRect();
        if(r.bottom>0&&r.top<win.innerHeight){
          aboutProgress=clamp((win.innerHeight-r.top)/(win.innerHeight+r.height),0,1);
        }
      }
      if(outro&&outroArt){
        const r=outro.getBoundingClientRect();
        if(r.bottom>0&&r.top<win.innerHeight){
          outroProgress=clamp((win.innerHeight-r.top)/(win.innerHeight+r.height),0,1);
        }
      }
      if(method && methodCounter && methodSteps.length){
        const r=method.getBoundingClientRect();
        if(r.bottom>0&&r.top<win.innerHeight){
          const boundary=win.innerHeight*.66;
          let eligibleCount=0;
          for(const step of methodSteps){
            if(step.getBoundingClientRect().top<boundary)eligibleCount++;
          }
          methodIndex=Math.max(0,eligibleCount-1);
        }
      }
    }

    // WRITE PHASE — transforms, classes and text are now updated together.
    for(const el of toReveal){
      setVisible(el);
      revealObserver?.unobserve(el);
    }
    if(!shouldRender)return;
    lastScroll=scrollY;
    body.classList.toggle('scrolled',scrollY>26);
    if(heroProgress!==null){
      hero.style.setProperty('--hero-progress',heroProgress.toFixed(4));
    }
    if(galleryProgress!==null && Math.abs(galleryProgress-previousGalleryProgress)>0.0005){
      track.style.transform=`translate3d(${(-galleryTravel*galleryProgress).toFixed(2)}px, 0, 0)`;
      setGalleryProgress(galleryProgress);
      previousGalleryProgress=galleryProgress;
    }
    if(aboutProgress!==null){
      manifestoImage.style.transform=`translate3d(0,${lerp(34,-34,aboutProgress).toFixed(2)}px,0)`;
    }
    if(outroProgress!==null){
      outroArt.style.transform=`translate3d(${lerp(-46,46,outroProgress).toFixed(2)}px,${lerp(35,-35,outroProgress).toFixed(2)}px,0)`;
      outro.style.setProperty('--outro-reveal',outroProgress.toFixed(3));
    }
    if(methodIndex!==null){
      methodSteps.forEach((item,i)=>item.classList.toggle('motion-step-current',i===methodIndex));
      methodCounter.dataset.scrollFocus=String(methodIndex+1).padStart(2,'0');
      if(mobileCounter)mobileCounter.textContent=String(methodIndex+1).padStart(2,'0');
    }
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(render)}}
  win.addEventListener('scroll',schedule,{passive:true});
  win.addEventListener('resize',()=>{
    // The mobile Safari address bar changes innerHeight while scrolling.
    // Never rebuild sticky-gallery geometry for height-only resize events.
    if(Math.abs(win.innerWidth-lastWidth)<2){schedule();return;}
    lastWidth=win.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{lastScroll=-1;configureGallery();schedule()},130);
  },{passive:true});
  // Recalculate across mobile/tablet/desktop so every device receives the horizontal gallery.
  if(desktop.addEventListener)desktop.addEventListener('change',()=>{configureGallery();schedule()});
  if(reduce.addEventListener)reduce.addEventListener('change',()=>win.location.reload());
  win.addEventListener('load',()=>{configureGallery();lastScroll=-1;schedule()},{once:true});
  if(d.fonts?.ready)d.fonts.ready.then(()=>{configureGallery();lastScroll=-1;schedule()});
  configureGallery();lastScroll=-1;schedule();

  win.addEventListener('gv:lenis-scroll',schedule);
  touch.addEventListener?.('change',()=>{configureGallery();lastScroll=-1;schedule()});
})();
