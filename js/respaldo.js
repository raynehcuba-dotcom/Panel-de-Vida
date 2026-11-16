/* Copias de seguridad: exportar, importar, recordatorio y copias automáticas antes de reemplazar datos. */
const KCOPIAS='panel-de-vida-copias';   // clave aparte: las copias automáticas no van dentro del JSON exportado
const MAX_COPIAS=3;

const leerCopias=()=>{try{const a=JSON.parse(localStorage.getItem(KCOPIAS));return Array.isArray(a)?a:[]}catch(e){return[]}};
const guardarCopias=a=>{try{localStorage.setItem(KCOPIAS,JSON.stringify(a));return true}catch(e){
 a.pop();   // sin espacio: se descarta la copia más antigua y se reintenta
 try{localStorage.setItem(KCOPIAS,JSON.stringify(a));return true}catch(x){return false}}};

/* Guarda el estado actual como copia rotativa (se conservan las últimas MAX_COPIAS). */
function copiaAutomatica(){
 const a=leerCopias();
 a.unshift({fecha:new Date().toISOString(),datos:S});
 a.length=Math.min(a.length,MAX_COPIAS);
 guardarCopias(a);
}

const diasDesde=f=>Math.round((new Date(hoy()+'T00:00')-new Date(f+'T00:00'))/864e5);

/* Recordatorio: avisa si hay datos y pasó más de DIAS_AVISO_COPIA desde la última copia. */
function actualizarAviso(){
 const el=$('#aviso-copia');if(!el)return;
 const hay=S.metas.length+S.habitos.length+S.movs.length+S.cer.length>0;
 const vinculado=PDV.archivoVinculado&&PDV.archivoVinculado();
 const d=Math.max(0,diasDesde(S.ultimaCopia||S.inicio||hoy()));
 const mostrar=hay&&!vinculado&&d>=DIAS_AVISO_COPIA&&S.avisoCopia!==hoy();
 el.hidden=!mostrar;
 if(mostrar)$('#aviso-texto').textContent=S.ultimaCopia
  ?`Hace ${d} ${d===1?'día':'días'} que no guarda una copia de sus datos.`
  :'Todavía no ha guardado ninguna copia de sus datos.';
}

function exportar(){
 const u=URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:'application/json'}));
 const a=document.createElement('a');a.href=u;a.download='panel-de-vida-'+hoy()+'.json';a.hidden=true;
 document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(u),1000);   // liberar al instante puede cancelar la descarga
 S.ultimaCopia=hoy();save();actualizarAviso();
}
$('#exp').onclick=exportar;
$('#aviso-exp').onclick=exportar;
$('#aviso-no').onclick=()=>{S.avisoCopia=hoy();save();actualizarAviso()};

$('#imp').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();
 r.onload=()=>{let d;try{d=JSON.parse(r.result)}catch(x){d=null}
  const valido=d&&typeof d==='object'&&['metas','habitos','movs'].every(k=>Array.isArray(d[k]))&&(d.cer===undefined||Array.isArray(d.cer));
  if(!valido){alert('El archivo no es una copia válida del Panel de Vida.');return}
  if(!confirm('Se reemplazarán los datos actuales por los de la copia. ¿Continuar?'))return;
  copiaAutomatica();                 // permite deshacer una importación equivocada
  S=Object.assign(base(),migrar(d));S.ultimaCopia=hoy();save();aplicarTema(S.tema);
  if(PDV.mod.cerebro)PDV.mod.cerebro.reiniciar();   // los filtros abiertos no aplican a los datos nuevos
  PDV.renderizar();actualizarAviso()};
 r.readAsText(f);e.target.value=''};

/* Copias automáticas: ver y restaurar. */
const fmtFecha=f=>new Date(f).toLocaleString('es',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
function listarCopias(){
 const a=leerCopias(),n=$('#l-copias');
 n.innerHTML=a.length?a.map((c,i)=>{const d=c.datos||{},n2=k=>Array.isArray(d[k])?d[k].length:0,c2=(n,s,p)=>n+' '+(n===1?s:p);
  return`<div class="item"><div class="row"><div><span class="t">${esc(fmtFecha(c.fecha))}</span><div class="mu">${c2(n2('metas'),'meta','metas')} · ${c2(n2('habitos'),'hábito','hábitos')} · ${c2(n2('movs'),'movimiento','movimientos')} · ${c2(n2('cer'),'nota','notas')}</div></div><button class="g" data-copia="${i}">Restaurar</button></div></div>`}).join('')
  :'<div class="empty">Todavía no hay copias. Se crea una antes de cada importación o restauración.</div>';
}
const dlg=$('#dlg-copias');
$('#copias-btn').onclick=()=>{listarCopias();typeof dlg.showModal==='function'?dlg.showModal():dlg.setAttribute('open','')};
$('#dlg-cerrar').onclick=()=>dlg.close();
$('#l-copias').onclick=e=>{
 const b=e.target.closest('[data-copia]');if(!b)return;
 const c=leerCopias()[+b.dataset.copia];if(!c)return;
 if(!confirm('Se reemplazarán los datos actuales por esta copia. ¿Continuar?'))return;
 copiaAutomatica();                 // el estado que se descarta también queda guardado
 S=Object.assign(base(),migrar(c.datos||{}));S.ultimaCopia=hoy();save();aplicarTema(S.tema);
 if(PDV.mod.cerebro)PDV.mod.cerebro.reiniciar();
 dlg.close();PDV.renderizar();actualizarAviso();
};