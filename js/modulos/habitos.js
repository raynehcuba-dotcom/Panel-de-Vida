/* Módulo Hábitos: registro diario de los últimos 7 días y racha de días seguidos. */
PDV.mod.habitos={
 racha(h){let c=0;const d=new Date();if(!h.dias.includes(iso(d)))d.setDate(d.getDate()-1);while(h.dias.includes(iso(d))){c++;d.setDate(d.getDate()-1)}return c},
 renderizar(){
  const ds=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return d});
  $('#l-hab').innerHTML=S.habitos.length?S.habitos.map(h=>`<div class="item"><div class="row"><span class="t">${esc(h.t)}</span><span class="acts"><span class="pill">Racha ${this.racha(h)} d</span><button class="ico del" data-a="hd" data-id="${h.id}" title="Eliminar" aria-label="Eliminar">${ico('x')}</button></span></div>
 <div class="days">${ds.map(d=>{const k=iso(d);return`<div class="d ${k===hoy()?'hoy':''}"><span>${d.toLocaleDateString('es',{weekday:'short'}).replace('.','')}</span><button class="${h.dias.includes(k)?'y':''}" data-a="ht" data-id="${h.id}" data-d="${k}" aria-label="Marcar el ${k}">${ico('check')}</button></div>`}).join('')}</div></div>`).join(''):'<div class="empty">Aún no tiene hábitos. Agregue el primero arriba.</div>';
 },
 acciones:{
  hd(id){const deshacer=quitarDe(S.habitos,id);if(deshacer)PDV.deshacer.ofrecer('Hábito eliminado con su historial.',deshacer)},
  ht(id,b){const h=S.habitos.find(x=>x.id===id),d=b.dataset.d,i=h.dias.indexOf(d);i<0?h.dias.push(d):h.dias.splice(i,1)}
 },
 iniciar(){
  $('#f-hab').onsubmit=e=>{e.preventDefault();const f=e.target;S.habitos.push({id:uid(),t:f.t.value.trim(),dias:[]});f.reset();save();PDV.renderizar()};
 }
};