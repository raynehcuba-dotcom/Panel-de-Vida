/* Módulo Metas: objetivos con avance porcentual y fecha límite. */
PDV.mod.metas={
 renderizar(){
  const L=[...S.metas].sort((a,b)=>a.hecha-b.hecha);
  $('#l-metas').innerHTML=L.length?L.map(m=>{const d=m.f?diasRest(m.f):null;return`<div class="item ${m.hecha?'done':''}">
 <div class="row"><span class="t">${esc(m.t)}</span><span><button class="x" data-a="mh" data-id="${m.id}" title="${m.hecha?'Reabrir':'Marcar como lograda'}">${m.hecha?'↺':'✓'}</button><button class="x" data-a="md" data-id="${m.id}" title="Eliminar">✕</button></span></div>
 <div class="bar"><i style="width:${m.p}%"></i></div>
 <div class="row"><span class="mu">${m.p} %${m.f&&!m.hecha?` · <span class="pill">${d<0?'Vencida':d===0?'Vence hoy':'Faltan '+d+' d'}</span>`:''}</span>${m.hecha?'<span class="in">Lograda</span>':`<input type="range" min="0" max="100" step="5" value="${m.p}" data-a="mp" data-id="${m.id}" style="max-width:220px" aria-label="Avance de la meta">`}</div></div>`}).join(''):'<div class="empty">Aún no tiene metas. Escriba la primera arriba.</div>';
 },
 acciones:{
  mh(id){const m=S.metas.find(x=>x.id===id);m.hecha=!m.hecha;if(m.hecha)m.p=100},
  md(id){if(confirm('¿Eliminar esta meta?'))S.metas=S.metas.filter(x=>x.id!==id)}
 },
 iniciar(){
  $('#f-meta').onsubmit=e=>{e.preventDefault();const f=e.target;S.metas.push({id:uid(),t:f.t.value.trim(),f:f.f.value,p:0,hecha:false});f.reset();save();PDV.renderizar()};
  // El control de avance actualiza la barra al arrastrar y re-renderiza al soltar.
  document.addEventListener('input',e=>{const r=e.target.closest('[data-a=mp]');if(r){const m=S.metas.find(x=>x.id===r.dataset.id);m.p=+r.value;save();r.closest('.item').querySelector('.bar i').style.width=m.p+'%';r.closest('.row').firstElementChild.firstChild.textContent=m.p+' %'}});
  document.addEventListener('change',e=>{if(e.target.closest('[data-a=mp]'))PDV.renderizar()});
 }
};
