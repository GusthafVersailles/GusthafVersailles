/** Optional Safari/Chromium performance meter: add ?gvperf=1 to the URL.
 * Never runs unless requested. This tool reads frame timing only and does not
 * adjust scroll speeds, engine initialization or gallery geometry.
 */
(()=>{
  const params=new URLSearchParams(location.search);
  if(params.get('gvperf')!=='1')return;
  const root=document.documentElement;
  const style=document.createElement('style');
  style.textContent=`#gv-perf-probe{position:fixed;z-index:2147483647;bottom:10px;left:10px;
  max-width:min(90vw,340px);pointer-events:none;padding:10px 12px;
  color:#fff;background:rgba(10,10,16,.87);border:1px solid #9998;border-radius:8px;
  font:12px/1.6 ui-monospace,SFMono-Regular,monospace;white-space:pre;}`;
  document.head.append(style);
  const hud=document.createElement('output');hud.id='gv-perf-probe';
  hud.setAttribute('aria-label','Diagnóstico de desempenho');
  document.body.append(hud);
  const windows=[],maxFrames=180;
  let last=0, lastHud=0, longCount=0, shifts=0;
  try {new PerformanceObserver(l=>{longCount+=l.getEntries().filter(e=>e.duration>=50).length}).observe({type:'longtask'})}catch{}
  try {new PerformanceObserver(l=>{shifts+=l.getEntries().filter(e=>!e.hadRecentInput).reduce((a,e)=>a+e.value,0)}).observe({type:'layout-shift'})}catch{}
  function tick(t){
    if(last){windows.push(t-last);if(windows.length>maxFrames)windows.shift()}
    last=t;
    if(t-lastHud>650&&windows.length){
      const sorted=[...windows].sort((a,b)=>a-b);
      const p95=sorted[Math.min(sorted.length-1,Math.floor(sorted.length*.95))];
      const avg=windows.reduce((a,b)=>a+b,0)/windows.length;
      const slow=windows.filter(x=>x>25).length;
      hud.textContent=`Motor: ${root.dataset.motionEngine||'?'} | ${Math.round(1000/avg)} FPS\nP95: ${p95.toFixed(1)}ms | >25ms: ${slow}/${windows.length}\nLong tasks: ${longCount} | Layout shift: ${shifts.toFixed(3)}`;
      lastHud=t;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
