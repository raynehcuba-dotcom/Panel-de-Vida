/* Módulo Resumen: vista general con metas, hábitos del día, balance del mes y segundo cerebro. */
PDV.mod.resumen={
 renderizar(){
  const act=S.metas.filter(m=>!m.hecha),prom=act.length?Math.round(act.reduce((a,m)=>a+m.p,0)/act.length):0;
  const h=hoy(),tot=S.habitos.length,ok=S.habitos.filter(x=>x.dias.includes(h)).length,pc=tot?ok/tot:0;
  const R=27,C=2*Math.PI*R;
  const t=PDV.mod.finanzas.totales(mesAct()),mon=Object.keys(t);
  const hr=new Date().getHours(),sal=hr<12?'Buenos días':hr<19?'Buenas tardes':'Buenas noches';
  const prox=act.filter(m=>m.f).sort((a,b)=>a.f.localeCompare(b.f)).slice(0,3);
  const pend=S.cer.filter(x=>x.tipo==='tarea'&&!x.hecha).length;
  $('#v-resumen').innerHTML=`
 <div class="saludo"><h2>${sal}</h2><p class="sub">${fLarga()}</p></div>
 <div class="grid">
  <div class="card"><div class="card-h"><h3>Metas en curso</h3><span class="ico-btn">${ico('target')}</span></div><div class="num">${act.length}</div><p class="mu">${act.length?`Avance promedio ${prom} %`:'Aún no hay metas activas'}</p></div>
  <div class="card"><div class="card-h"><h3>Hábitos de hoy</h3><span class="ico-btn">${ico('check')}</span></div><div class="ring"><svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="${R}" fill="none" stroke="var(--track)" stroke-width="7"/><circle cx="32" cy="32" r="${R}" fill="none" stroke="var(--ac)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C*(1-pc)).toFixed(1)}" transform="rotate(-90 32 32)"/></svg><div><div class="num sm">${ok}/${tot}</div><p class="mu">${tot?'cumplidos hoy':'Sin hábitos aún'}</p></div></div></div>
  <div class="card"><div class="card-h"><h3>Balance del mes</h3><span class="ico-btn">${ico('wallet')}</span></div>${mon.length?mon.map(c=>{const b=t[c].i-t[c].g;return`<div class="bal"><span class="num sm ${b>=0?'in':'out'}">${fmt(b)}</span><span class="mu">${c}</span></div>`}).join(''):'<p class="mu">Sin movimientos este mes</p>'}</div>
  <div class="card"><div class="card-h"><h3>Segundo cerebro</h3><span class="ico-btn">${ico('book')}</span></div><div class="num">${pend}</div><p class="mu">tareas pendientes · ${S.cer.length} guardados</p></div>
 </div>
 <div class="card"><div class="card-h"><h3>Próximas fechas límite</h3><span class="ico-btn">${ico('clock')}</span></div>${prox.length?prox.map(m=>{const d=diasRest(m.f);return`<div class="lr"><span class="t">${esc(m.t)}</span><span class="pill ${d<0?'bad':''}">${d<0?'Vencida hace '+(-d)+' d':d===0?'Vence hoy':'Faltan '+d+' d'}</span></div>`}).join(''):'<p class="mu">Ninguna meta tiene fecha límite.</p>'}</div>`;
 }
};