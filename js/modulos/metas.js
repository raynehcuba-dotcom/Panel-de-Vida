/* Módulo Metas: objetivos con avance porcentual y fecha límite. */
PDV.mod.metas={
 renderizar(){
  const L=[...S.metas].sort((a,b)=>a.hecha-b.hecha);
  $('#l-metas').innerHTML=L.length?L.map(m=>{const d=m.f?diasRest(m.f):null;return`<div class="item ${m.hecha?'done':''}">
 <div class="row"><span class="t">${esc(m.t)}</span><span class="acts"><button class="ico" data-a="mh" data-id="${m.id}" title="${m.hecha?'Reabrir':'Marcar como lograda'}" aria-label="${m.hecha?'Reabrir':'Marcar como lograda'}">${ico(m.hecha?'undo':'check')}</button><button class="ico del" data-a="md" data-id="${m.id}" title="Eliminar" aria-label="Eliminar">${ico('x')}</button></span></div>
 <div class="bar"><i style="width:${m.p}%"></i></div>
 <div class="row foot"><span class="mu"><span class="pct">${m.p} %</span>${m.f&&!m.hecha?` · <span class="pill ${d<0?'bad':''}">${d<0?'Vencida':d===0?'Vence hoy':'Faltan '+d+' d'}</span>`:''}</span>${m.hecha?'<span class="pill ok">Lograda</span>':`<input type="range" min="0" max="100" step="5" value="${m.p}" style="--p:${m.p}" data-a="mp" data-id="${m.id}" aria-label="Avance de la meta">`}</div></div>`}).join(''):'<div class="empty">Aún no tiene metas. Escriba la primera arriba.</div>';
 },
 acciones:{
  mh(id){const m=S.metas.find(x=>x.id===id);m.hecha=!m.hecha;if(m.hecha)m.p=100},
  md(id){const deshacer=quitarDe(S.metas,id);if(deshacer)PDV.deshacer.ofrecer('Meta eliminada.',deshacer)}
 },
 iniciar(){
  $('#f-meta').onsubmit=e=>{e.preventDefault();const f=e.target;S.metas.push({id:uid(),t:f.t.value.trim(),f:f.f.value,p:0,hecha:false});f.reset();save();PDV.renderizar()};
  // El control de avance actualiza la barra al arrastrar y re-renderiza al soltar.
  document.addEventListener('input',e=>{const r=e.target.closest('[data-a=mp]');if(r){const m=S.metas.find(x=>x.id===r.dataset.id);m.p=+r.value;save();r.style.setProperty('--p',m.p);const it=r.closest('.item');it.querySelector('.bar i').style.width=m.p+'%';it.querySelector('.pct').textContent=m.p+' %'}});
  document.addEventListener('change',e=>{if(e.target.closest('[data-a=mp]'))PDV.renderizar()});
 }
};