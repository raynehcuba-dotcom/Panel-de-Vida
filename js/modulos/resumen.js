/* Módulo Resumen: vista general con metas, hábitos del día, balance del mes y segundo cerebro. */
PDV.mod.resumen={
 renderizar(){
  const act=S.metas.filter(m=>!m.hecha),prom=act.length?Math.round(act.reduce((a,m)=>a+m.p,0)/act.length):0;
  const h=hoy(),tot=S.habitos.length,ok=S.habitos.filter(x=>x.dias.includes(h)).length,pc=tot?ok/tot:0;
  const R=30,C=2*Math.PI*R;
  const t=PDV.mod.finanzas.totales(mesAct()),mon=Object.keys(t);
  const hr=new Date().getHours(),sal=hr<12?'Buenos días':hr<19?'Buenas tardes':'Buenas noches';
  const prox=act.filter(m=>m.f).sort((a,b)=>a.f.localeCompare(b.f)).slice(0,3);
  $('#v-resumen').innerHTML=`<h2>${sal}</h2><p class="sub">${new Date().toLocaleDateString('es',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
 <div class="grid">
  <div class="card"><h3>Metas en curso</h3><div class="big">${act.length}</div><p class="mu">${act.length?`Avance promedio: ${prom} %`:'Aún no hay metas activas'}</p></div>
  <div class="card"><h3>Hábitos de hoy</h3><div class="ring"><svg width="76" height="76" viewBox="0 0 76 76"><circle cx="38" cy="38" r="${R}" fill="none" stroke="var(--sf2)" stroke-width="8"/><circle cx="38" cy="38" r="${R}" fill="none" stroke="var(--ok)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-pc)}" transform="rotate(-90 38 38)"/></svg><div><div class="big">${ok}/${tot}</div><p class="mu">${tot?'cumplidos':'Sin hábitos aún'}</p></div></div></div>
  <div class="card"><h3>Balance del mes</h3>${mon.length?mon.map(c=>{const b=t[c].i-t[c].g;return`<div><span class="big ${b>=0?'in':'out'}" style="font-size:1.4rem">${fmt(b)}</span> <span class="mu">${c}</span></div>`}).join(''):'<p class="mu">Sin movimientos este mes</p>'}</div>
  <div class="card"><h3>Segundo cerebro</h3><div class="big">${S.cer.filter(x=>x.tipo==='tarea'&&!x.hecha).length}</div><p class="mu">tareas pendientes · ${S.cer.length} elementos guardados</p></div>
 </div>
 <div class="card"><h3>Próximas fechas límite</h3>${prox.length?prox.map(m=>{const d=diasRest(m.f);return`<div class="row" style="padding:5px 0"><span>${esc(m.t)}</span><span class="pill">${d<0?'Vencida hace '+(-d)+' d':d===0?'Vence hoy':'Faltan '+d+' d'}</span></div>`}).join(''):'<p class="mu">Ninguna meta tiene fecha límite.</p>'}</div>`;
 }
};
