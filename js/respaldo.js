/* Copias de seguridad: exportar e importar todos los datos en un archivo JSON. */
$('#exp').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:'application/json'}));a.download='panel-de-vida-'+hoy()+'.json';a.click();URL.revokeObjectURL(a.href)};
$('#imp').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();
 r.onload=()=>{try{const d=JSON.parse(r.result);if(!Array.isArray(d.metas)||!Array.isArray(d.habitos)||!Array.isArray(d.movs))throw 0;
  if(confirm('Se reemplazarán los datos actuales por los de la copia. ¿Continuar?')){S=Object.assign(base(),migrar(d));aplicarTema(S.tema);save();PDV.renderizar()}
 }catch(x){alert('El archivo no es una copia válida del Panel de Vida.')}};
 r.readAsText(f);e.target.value=''};
