(() => {
 'use strict';
 const dict=window.GV_CONTENT||{};let lang='pt';
 const read=(obj,key)=>key.split('.').reduce((v,k)=>v?.[k],obj);
 function useLanguage(next){
   if(!dict[next])return;
   lang=next;const values=dict[lang];
   document.querySelectorAll('[data-i18n]').forEach(el=>{const str=read(values,el.dataset.i18n);if(typeof str==='string')el.textContent=str});
   document.querySelectorAll('[data-i18n-content]').forEach(el=>{const str=read(values,el.dataset.i18nContent);if(typeof str==='string')el.setAttribute('content',str)});
   document.documentElement.lang=values.documentLang;
   document.querySelector('#lang-toggle')?.setAttribute('aria-label',values.aria.langToggle);
   document.querySelector('#menu-button')?.setAttribute('aria-label',values.ui.menuOpen);
   document.querySelector('#lang-toggle')?.setAttribute('aria-pressed',String(lang==='en'));
   try{sessionStorage.setItem('gv:lang',lang)}catch(e){}
   document.dispatchEvent(new CustomEvent('gv:language',{detail:{lang,values}}));
 }
 document.querySelector('#lang-toggle')?.addEventListener('click',()=>useLanguage(lang==='pt'?'en':'pt'));
 try{useLanguage(sessionStorage.getItem('gv:lang')||'pt')}catch(e){useLanguage('pt')}
 window.gvLanguage=()=>lang;
})();
