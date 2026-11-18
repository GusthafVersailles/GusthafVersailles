/** Capítulos editoriais (palavra gigante atrás do título).
 *  v39: a deriva vertical roda no relógio único do GV com geometria em cache e usa a propriedade
 *  `translate` (independente do `transform` da entrada). Antes, a deriva era uma custom property que
 *  alterava o `transform` de um elemento com `transition: 1.15s`, reiniciando a transição a cada quadro. */
(()=>{
 'use strict';
 const chapters=[...document.querySelectorAll('[data-editorial-chapter]')];
 if(!chapters.length)return;
 const GV=window.GV;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const coarse=matchMedia('(pointer: coarse)');
 const getLanguage=()=>document.documentElement.lang.toLowerCase().startsWith('en')?'en':'pt';
 const words=chapters.map(c=>c.querySelector('.editorial-word')).filter(Boolean);
 const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));

 function fitWords(){
   // Layout medido somente ao carregar, redimensionar ou trocar idioma/fontes.
   for(const word of words){
     word.style.fontSize='';
     const parent=word.closest('.editorial-opening');
     if(!parent)continue;
     const available=Math.max(1,parent.clientWidth-8);
     const width=word.getBoundingClientRect().width;
     if(width>available){
       const size=parseFloat(getComputedStyle(word).fontSize);
       word.style.fontSize=Math.floor(size*(available/width)*.995*100)/100+'px';
     }
   }
 }
 let fitQueued=false;
 const queueFit=()=>{if(fitQueued)return;fitQueued=true;requestAnimationFrame(()=>{fitQueued=false;fitWords()})};

 function updateLanguage(){
   const lang=getLanguage();
   for(const word of words)word.textContent=word.dataset[lang==='en'?'wordEn':'wordPt']||word.textContent;
   document.querySelectorAll('[data-editorial-pt]').forEach(node=>{
     node.textContent=node.dataset[lang==='en'?'editorialEn':'editorialPt'];
   });
   // Mantém os rótulos de índice exatos, trocando apenas o delimitador / → -.
   document.querySelectorAll('.editorial-index span').forEach(node=>{
     node.textContent=node.textContent.replace(/\s*\/\s*/, ' - ');
   });
   queueFit();
 }

 // Deriva vertical da palavra gigante (desktop). No toque a palavra fica estática.
 if(GV && !reduced.matches){
   const geo=chapters.map(chapter=>({chapter,word:chapter.querySelector('.editorial-word'),top:0,h:0,last:null}));
   GV.onMeasure(()=>{for(const g of geo){g.top=GV.docTop(g.chapter);g.h=g.chapter.offsetHeight;g.last=null}});
   GV.onFrame((t,y)=>{
     if(coarse.matches)return;
     const vh=innerHeight;
     for(const g of geo){
       if(!g.word)continue;
       const top=g.top-y;
       if(top>vh||top+g.h<0)continue;
       const p=clamp((vh-top)/(vh+g.h),0,1);
       const v=Math.round((22-p*50)*10)/10;
       if(v!==g.last){g.last=v;g.word.style.translate='0 '+v+'px'}
     }
   });
 }

 if('IntersectionObserver' in window && !reduced.matches){
   const observer=new IntersectionObserver(entries=>{
     for(const entry of entries){
       if(entry.isIntersecting){entry.target.classList.add('is-in-view');observer.unobserve(entry.target)}
     }
   },{rootMargin:'0px 0px -9% 0px',threshold:.01});
   words.forEach(w=>observer.observe(w));
 }else words.forEach(w=>w.classList.add('is-in-view'));
 document.addEventListener('gv:language',updateLanguage);
 window.addEventListener('resize',queueFit,{passive:true});
 window.addEventListener('load',queueFit,{once:true});
 document.fonts?.ready.then(queueFit);
 updateLanguage();fitWords();
})();
