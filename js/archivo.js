/* Guardado en archivo (File System Access API): vínculo con un JSON en disco y autoguardado. */
const soportaArchivo=typeof window.showSaveFilePicker==='function'&&typeof window.indexedDB!=='undefined';
const hhmm=()=>new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});

let manejadorArchivo=null;   // FileSystemFileHandle vinculado
let estadoArchivo='';        // 'listo' | 'permiso' | 'error'
let ultimaEscritura='';
let temporizador=0;
let pedidoPermisoHecho=false;

PDV.archivoVinculado=()=>!!manejadorArchivo;

/* El manejador se guarda en IndexedDB porque localStorage no puede almacenar FileSystemFileHandle. */
const abrirBD=()=>new Promise((ok,mal)=>{const r=indexedDB.open('panel-de-vida-archivo',1);r.onupgradeneeded=()=>r.result.createObjectStore('datos');r.onsuccess=()=>ok(r.result);r.onerror=()=>mal(r.error)});
const bdGuardar=h=>abrirBD().then(db=>new Promise((ok,mal)=>{const tx=db.transaction('datos','readwrite');tx.objectStore('datos').put(h,'manejador');tx.oncomplete=()=>ok();tx.onerror=()=>mal(tx.error)}));
const bdLeer=()=>abrirBD().then(db=>new Promise((ok,mal)=>{const g=db.transaction('datos').objectStore('datos').get('manejador');g.onsuccess=()=>ok(g.result);g.onerror=()=>mal(g.error)}));
const bdBorrar=()=>abrirBD().then(db=>new Promise((ok,mal)=>{const tx=db.transaction('datos','readwrite');tx.objectStore('datos').delete('manejador');tx.oncomplete=()=>ok();tx.onerror=()=>mal(tx.error)}));

async function escribir(pedirPermiso){
 if(!manejadorArchivo)return false;
 try{
  if(estadoArchivo==='permiso'){
   if(!pedirPermiso)return false;
   const p=await manejadorArchivo.requestPermission({mode:'readwrite'});
   if(p!=='granted'){pedidoPermisoHecho=true;pintarArchivo();return false}
   estadoArchivo='listo';
  }
  const w=await manejadorArchivo.createWritable();
  await w.write(JSON.stringify(S,null,1));
  await w.close();
  ultimaEscritura=hhmm();estadoArchivo='listo';pintarArchivo();return true;
 }catch(e){
  estadoArchivo=e&&e.name==='NotAllowedError'?'permiso':'error';
  pintarArchivo();return false;
 }
}

/* Autoguardado: agrupa cambios seguidos y aprovecha el gesto del usuario para pedir permiso si hace falta. */
function programarGuardado(){
 if(!manejadorArchivo)return;
 clearTimeout(temporizador);
 if(estadoArchivo==='permiso'){
  if(pedidoPermisoHecho)return;
  pedidoPermisoHecho=true;
  escribir(true);
  return;
 }
 temporizador=setTimeout(()=>escribir(),700);
}
PDV.trasGuardar=programarGuardado;

async function elegirArchivo(){
 try{
  const h=await window.showSaveFilePicker({suggestedName:'panel-de-vida.json',types:[{description:'Panel de Vida',accept:{'application/json':['.json']}}]});
  manejadorArchivo=h;estadoArchivo='listo';ultimaEscritura='';pedidoPermisoHecho=false;
  try{await bdGuardar(h)}catch(e){}   // si no se puede recordar el archivo, al menos dura la sesión
  await escribir();
  pintarArchivo();cerrarArchivo();actualizarAviso();
 }catch(e){
  if(e&&e.name==='AbortError')return;
  alert('No se pudo abrir el selector de archivos. Esta función necesita Chrome o Edge; si abrió la app desde el disco, pruebe servirla desde un servidor local.');
 }
}

async function leerArchivo(){
 try{
  const d=JSON.parse(await(await manejadorArchivo.getFile()).text());
  const valido=d&&typeof d==='object'&&['metas','habitos','movs'].every(k=>Array.isArray(d[k]))&&(d.cer===undefined||Array.isArray(d.cer));
  if(!valido){alert('El archivo no tiene datos válidos del Panel de Vida.');return}
  if(!confirm('Se reemplazarán los datos actuales por los del archivo. ¿Continuar?'))return;
  copiaAutomatica();
  S=Object.assign(base(),migrar(d));S.ultimaCopia=hoy();save();
  aplicarTema(S.tema);
  if(PDV.mod.cerebro)PDV.mod.cerebro.reiniciar();
  PDV.renderizar();actualizarAviso();cerrarArchivo();
 }catch(e){alert('No se pudo leer el archivo.')}
}

async function soltarArchivo(){
 if(!confirm('¿Dejar de guardar en este archivo? Los datos seguirán guardándose en el navegador.'))return;
 manejadorArchivo=null;estadoArchivo='';ultimaEscritura='';pedidoPermisoHecho=false;
 try{await bdBorrar()}catch(e){}
 pintarArchivo();cerrarArchivo();actualizarAviso();
}

function pintarArchivo(){
 const btn=$('#archivo-btn');
 if(!btn)return;
 btn.hidden=!soportaArchivo;
 if(!soportaArchivo)return;
 $('#archivo-txt').textContent=manejadorArchivo?manejadorArchivo.name:'Guardar en archivo';
 const nota=$('#side-note');
 if(nota)nota.textContent=manejadorArchivo?`Guardado automático en «${manejadorArchivo.name}» y en este navegador.`:'Sus datos se guardan solo en este navegador. Exporte una copia con frecuencia.';
 const c=$('#archivo-cuerpo');
 if(!manejadorArchivo){
  c.innerHTML=`<p class="mu">Elija un archivo JSON en su equipo: la app guardará ahí cada cambio, además de en este navegador. Funciona en Chrome y Edge.</p><div class="acciones-modal"><button class="pri" id="archivo-elegir">Elegir archivo…</button></div>`;
  return;
 }
 const est=estadoArchivo==='error'?'<span class="pill bad">Error al escribir</span>'
  :estadoArchivo==='permiso'?'<span class="pill">Falta permiso</span>'
  :'<span class="pill ok">Activo</span>';
 c.innerHTML=`<div class="item"><div class="row"><div><span class="t">${esc(manejadorArchivo.name)}</span><div class="mu">${ultimaEscritura?'Última escritura: '+ultimaEscritura:'Todavía sin escribir'}${estadoArchivo==='permiso'?' · pulse «Guardar ahora»':''}</div></div>${est}</div></div>
 <div class="acciones-modal"><button class="g" id="archivo-ahora">Guardar ahora</button><button class="g" id="archivo-leer">Leer desde archivo</button><button class="g" id="archivo-soltar">Desvincular</button></div>`;
}

const dlgArchivo=$('#dlg-archivo');
const cerrarArchivo=()=>dlgArchivo.close();
$('#archivo-btn').onclick=()=>{pintarArchivo();typeof dlgArchivo.showModal==='function'?dlgArchivo.showModal():dlgArchivo.setAttribute('open','')};
$('#archivo-cerrar').onclick=cerrarArchivo;
$('#archivo-cuerpo').onclick=e=>{
 if(e.target.closest('#archivo-elegir'))elegirArchivo();
 else if(e.target.closest('#archivo-ahora'))escribir(true);
 else if(e.target.closest('#archivo-leer'))leerArchivo();
 else if(e.target.closest('#archivo-soltar'))soltarArchivo();
};

(async()=>{
 if(!soportaArchivo){pintarArchivo();return}
 try{
  const h=await bdLeer();
  if(h){
   manejadorArchivo=h;
   const p=h.queryPermission?await h.queryPermission({mode:'readwrite'}):'granted';
   estadoArchivo=p==='granted'?'listo':'permiso';
  }
 }catch(e){}
 pintarArchivo();
})();