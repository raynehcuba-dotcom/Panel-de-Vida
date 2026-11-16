/* Arranque: navegación, despacho de acciones a los módulos, tema y primer renderizado. */
PDV.renderizar=()=>Object.values(PDV.mod).forEach(m=>m.renderizar());

// Cada botón con data-a="accion" se despacha al módulo que declare esa acción en su objeto "acciones".
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-a]');
 if(b){const a=b.dataset.a;
  for(const m of Object.values(PDV.mod)){if(m.acciones&&m.acciones[a]){m.acciones[a](b.dataset.id,b);save();PDV.renderizar();break}}
  return}
 const n=e.target.closest('nav [data-v]');
 if(n){document.querySelectorAll('nav>button').forEach(x=>x.classList.toggle('on',x===n));
  document.querySelectorAll('main>section').forEach(s=>s.hidden=s.id!=='v-'+n.dataset.v);PDV.renderizar()}
});

function aplicarTema(t){S.tema=t;document.documentElement.dataset.theme=t;$('#tema').textContent=t==='dark'?'Modo claro':'Modo oscuro'}
$('#tema').onclick=()=>{aplicarTema(S.tema==='dark'?'light':'dark');save()};

Object.values(PDV.mod).forEach(m=>m.iniciar&&m.iniciar());
aplicarTema(S.tema);
PDV.renderizar();
