/**
 * Arquivo Vivo v10 — real desktop Lenis + touch-native on mobile.
 * Safari touch should never be forced through the desktop inertia profile.
 * Motion choreography consumes window.scrollY on both device classes.
 */
(() => {
  'use strict';
  const root=document.documentElement;
  const touch=window.matchMedia('(pointer: coarse)');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const config=Object.freeze({
    lerp:0.072,
    smoothWheel:true,
    wheelMultiplier:1.07,
    syncTouch:false,
    autoRaf:false,
    anchors:{offset:-88},
    stopInertiaOnNavigate:true
  });
  window.GV_CINEMATIC_SCROLL=config;
  let instance=null, rafId=0, pending=null, generation=0;
  const ready=()=>typeof window.Lenis==='function';
  function inject(url,timeout){
    return new Promise((resolve,reject)=>{
      let settled=false;
      const tag=document.createElement('script');
      const clock=setTimeout(()=>finish(false),timeout);
      function finish(ok){
        if(settled)return;
        settled=true;clearTimeout(clock);
        tag.onload=null;tag.onerror=null;
        if(ok)resolve(url);else{tag.remove();reject(new Error('Lenis not loaded'))}
      }
      tag.src=url;tag.async=true;
      tag.onload=()=>finish(ready());tag.onerror=()=>finish(false);
      document.head.appendChild(tag);
    });
  }
  async function load(){
    if(ready())return 'preloaded';
    if(pending)return pending;
    const sources=[
      ...(window.GV_VENDOR_LENIS_PRESENT?['vendor/lenis.min.js']:[]),
      'https://cdn.jsdelivr.net/npm/lenis@1.3.27/dist/lenis.min.js',
      'https://unpkg.com/lenis@1.3.27/dist/lenis.min.js'
    ];
    pending=(async()=>{for(const url of sources){try{return await inject(url,3500)}catch{}}throw new Error('Lenis unavailable')})().catch(e=>{pending=null;throw e});
    return pending;
  }
  function stop(){
    ++generation;
    if(rafId){cancelAnimationFrame(rafId);rafId=0}
    if(instance){instance.destroy();instance=null}
    window.gvLenis=null;
    root.classList.remove('motion-lenis');
    window.dispatchEvent(new Event('gv:lenis-destroyed'));
  }
  function tick(t){
    if(!instance||reduced.matches||touch.matches)return;
    instance.raf(t);
    rafId=requestAnimationFrame(tick);
  }
  async function start(){
    if(reduced.matches){stop();root.dataset.motionEngine='reduced';return}
    if(touch.matches){
      // System touch momentum is more responsive and battery-efficient than syncTouch inertia.
      stop();root.dataset.motionEngine='native-touch';return;
    }
    if(instance)return;
    const ticket=generation;
    try{
      const source=await load();
      if(ticket!==generation||touch.matches||reduced.matches)return;
      instance=new window.Lenis(config);
      window.gvLenis=instance;
      root.dataset.motionEngine='lenis';
      root.classList.add('motion-lenis');
      instance.on('scroll',()=>{
        window.dispatchEvent(new Event('gv:lenis-scroll'));
        window.ScrollTrigger?.update?.();
      });
      window.dispatchEvent(new Event('gv:lenis-ready'));
      rafId=requestAnimationFrame(tick);
      console.info('[GV] Lenis cinematic desktop active via',source);
    }catch{
      // Desktop wheel smoothing is provided by cinematic-scroll-local.js when offline.
      if(root.dataset.motionEngine!=='local-smooth')root.dataset.motionEngine='native-fallback';
    }
  }
  reduced.addEventListener?.('change',()=>{stop();start()});
  touch.addEventListener?.('change',()=>{stop();start()});
  start();
})();
