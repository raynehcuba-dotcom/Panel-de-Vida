/* Arranque: navegación, despacho de acciones a los módulos, tema y primer renderizado. */
PDV.renderizar=()=>Object.values(PDV.mod).forEach(m=>m.renderizar());

const VISTAS={
 resumen:['Resumen','Metas, hábitos, finanzas y notas de un vistazo'],
 metas:['Metas','Defina lo que quiere lograr y registre su avance'],
 habitos:['Hábitos','Marque cada día cumplido: la racha cuenta los días seguidos'],
 fin:['Finanzas','Ingresos y gastos personales, separados por moneda'],
 cer:['Segundo cerebro','Notas, tareas, enlaces y normativa en un solo lugar']
};

function mostrarVista(v){
 const t=VISTAS[v]||['Panel de Vida',''];
 $('#titulo').textContent=t[0];$('#subtitulo').textContent=t[1];
 document.querySelectorAll('nav>button').forEach(x=>x.classList.toggle('on',x.dataset.v===v));
 document.querySelectorAll('main>section').forEach(s=>s.hidden=s.id!=='v-'+v);
 PDV.renderizar()
}

// Cada botón con data-a="accion" se despacha al módulo que declare esa acción en su objeto "acciones".
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-a]');
 if(b){const a=b.dataset.a;
  for(const m of Object.values(PDV.mod)){if(m.acciones&&m.acciones[a]){m.acciones[a](b.dataset.id,b);save();PDV.renderizar();break}}
  return}
 const n=e.target.closest('nav [data-v]');
 if(n)mostrarVista(n.dataset.v);
});

function aplicarTema(t){S.tema=t;document.documentElement.dataset.theme=t;$('#tema').textContent=t==='dark'?'Modo claro':'Modo oscuro'}
$('#tema').onclick=()=>{aplicarTema(S.tema==='dark'?'light':'dark');save()};

document.querySelectorAll('[data-ico]').forEach(el=>el.innerHTML=ico(el.dataset.ico));
Object.values(PDV.mod).forEach(m=>m.iniciar&&m.iniciar());
aplicarTema(S.tema);
mostrarVista('resumen');