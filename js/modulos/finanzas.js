/* Módulo Finanzas: ingresos y gastos personales por moneda (CUP y USD). */
PDV.mod.finanzas={
 totales(mes){const o={};S.movs.filter(m=>!mes||m.fecha.slice(0,7)===mes).forEach(m=>{o[m.mo]=o[m.mo]||{i:0,g:0};o[m.mo][m.tipo==='ingreso'?'i':'g']+=m.m});return o},
 renderizar(){
  const t=this.totales(mesAct()),mon=Object.keys(t);
  $('#s-fin').innerHTML=mon.length?mon.map(c=>{const b=t[c].i-t[c].g;return`<div class="card"><div class="card-h"><h3>${c} · este mes</h3><span class="ico-btn">${ico('wallet')}</span></div><div class="num ${b>=0?'in':'out'}">${fmt(b)}</div><div class="bal"><span class="mu in">Ingresos ${fmt(t[c].i)}</span><span class="mu out">Gastos ${fmt(t[c].g)}</span></div></div>`}).join(''):`<div class="card"><div class="card-h"><h3>Este mes</h3><span class="ico-btn">${ico('wallet')}</span></div><p class="mu">Registre un movimiento para ver el balance del mes.</p></div>`;
  const L=[...S.movs].sort((a,b)=>b.fecha.localeCompare(a.fecha)).slice(0,60);
  $('#l-fin').innerHTML=L.length?L.map(m=>`<div class="item mov"><div class="row"><div><span class="t">${esc(m.c||'Sin categoría')}</span><div class="mu">${m.fecha}${m.n?' · '+esc(m.n):''}</div></div><span class="acts"><span class="amt ${m.tipo==='ingreso'?'in':'out'}">${m.tipo==='ingreso'?'+':'−'}${fmt(m.m)} ${m.mo}</span><button class="ico del" data-a="fd" data-id="${m.id}" title="Eliminar" aria-label="Eliminar">${ico('x')}</button></span></div></div>`).join(''):'<div class="empty">No hay movimientos registrados.</div>';
 },
 acciones:{
  fd(id){const deshacer=quitarDe(S.movs,id);if(deshacer)PDV.deshacer.ofrecer('Movimiento eliminado.',deshacer)}
 },
 iniciar(){
  const f=$('#f-fin');f.f.value=hoy();
  f.onsubmit=e=>{e.preventDefault();S.movs.push({id:uid(),tipo:f.tipo.value,m:+f.m.value,mo:f.mo.value,c:f.c.value.trim(),fecha:f.f.value,n:f.n.value.trim()});const t=f.tipo.value,mo=f.mo.value;f.reset();f.tipo.value=t;f.mo.value=mo;f.f.value=hoy();save();PDV.renderizar()};
 }
};