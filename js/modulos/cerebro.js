/* Módulo Segundo cerebro: notas, tareas, enlaces y normativa con búsqueda, etiquetas y proyectos. */
PDV.mod.cerebro={
 cf:{q:'',t:'todo',p:''},   // filtros activos
 ed:null,                   // id del elemento en edición
 TN:{nota:'Nota',tarea:'Tarea',enlace:'Enlace',norma:'Normativa'},
 renderizar(){
  const cf=this.cf,TN=this.TN;
  const pr=[...new Set(S.cer.map(x=>x.pr).filter(Boolean))].sort();
  $('#c-p').innerHTML='<option value="">Todos los proyectos</option>'+pr.map(p=>`<option ${p===cf.p?'selected':''}>${esc(p)}</option>`).join('');
  $('#pl').innerHTML=pr.map(p=>`<option>${esc(p)}`).join('');
  document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c.dataset.t===cf.t));
  const q=cf.q.toLowerCase();
  const L=S.cer.filter(x=>(cf.t==='todo'||x.tipo===cf.t)&&(!cf.p||x.pr===cf.p)&&(!q||[x.t,x.x,x.r,x.tg.join(' '),x.pr].join(' ').toLowerCase().includes(q))).sort((a,b)=>(!!a.hecha-!!b.hecha)||b.fecha.localeCompare(a.fecha));
  $('#l-cer').innerHTML=L.length?L.map(x=>`<div class="item ${x.hecha?'done':''}"><div class="row"><span class="t">${x.tipo==='tarea'?`<button class="x" data-a="ct" data-id="${x.id}" aria-label="Completar tarea">${x.hecha?'☑':'☐'}</button>`:''}${esc(x.t)} <span class="pill">${TN[x.tipo]}</span></span><span><button class="x" data-a="ce" data-id="${x.id}" title="Editar">✎</button><button class="x" data-a="cd" data-id="${x.id}" title="Eliminar">✕</button></span></div>
 ${x.x?`<p class="mu" style="white-space:pre-wrap;margin-top:6px">${esc(x.x)}</p>`:''}
 ${x.r?`<p style="margin-top:6px;word-break:break-all">${/^https?:\/\//i.test(x.r)?`<a class="lnk" href="${esc(x.r)}" target="_blank" rel="noopener">${esc(x.r)}</a>`:esc(x.r)}</p>`:''}
 <p class="mu" style="margin-top:6px;font-size:.82rem">${x.fecha}${x.pr?' · '+esc(x.pr):''}${x.tg.map(g=>` <span class="tag">#${esc(g)}</span>`).join('')}</p></div>`).join(''):'<div class="empty">No hay elementos con ese filtro. Capture el primero arriba.</div>';
 },
 acciones:{
  cd(id){if(confirm('¿Eliminar este elemento?'))S.cer=S.cer.filter(x=>x.id!==id)},
  ct(id){const x=S.cer.find(z=>z.id===id);x.hecha=!x.hecha},
  ce(id){const x=S.cer.find(z=>z.id===id),f=$('#f-cer');PDV.mod.cerebro.ed=id;f.tipo.value=x.tipo;f.t.value=x.t;f.x.value=x.x;f.r.value=x.r;f.tg.value=x.tg.join(', ');f.pr.value=x.pr;$('#c-ok').textContent='Guardar cambios';f.scrollIntoView({behavior:'smooth'});f.t.focus()}
 },
 iniciar(){
  const m=this;
  $('#f-cer').onsubmit=e=>{e.preventDefault();const f=e.target;
   const o={tipo:f.tipo.value,t:f.t.value.trim(),x:f.x.value.trim(),r:f.r.value.trim(),tg:f.tg.value.split(',').map(s=>s.trim().replace(/^#/,'')).filter(Boolean),pr:f.pr.value.trim()};
   if(m.ed){Object.assign(S.cer.find(x=>x.id===m.ed),o);m.ed=null;$('#c-ok').textContent='Capturar'}else S.cer.push(Object.assign({id:uid(),fecha:hoy(),hecha:false},o));
   f.reset();save();PDV.renderizar()};
  $('#c-q').oninput=e=>{m.cf.q=e.target.value;m.renderizar()};
  $('#c-p').onchange=e=>{m.cf.p=e.target.value;m.renderizar()};
  document.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{m.cf.t=c.dataset.t;m.renderizar()});
 }
};
