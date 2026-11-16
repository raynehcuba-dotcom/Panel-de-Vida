/* Copias de seguridad: exportar e importar todos los datos en un archivo JSON. */
$('#exp').onclick=()=>{
 const u=URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:'application/json'}));
 const a=document.createElement('a');a.href=u;a.download='panel-de-vida-'+hoy()+'.json';a.hidden=true;
 document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(u),1000);   // liberar al instante puede cancelar la descarga
};
$('#imp').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();
 r.onload=()=>{let d;try{d=JSON.parse(r.result)}catch(x){d=null}
  const valido=d&&typeof d==='object'&&['metas','habitos','movs'].every(k=>Array.isArray(d[k]))&&(d.cer===undefined||Array.isArray(d.cer));
  if(!valido){alert('El archivo no es una copia válida del Panel de Vida.');return}
  if(!confirm('Se reemplazarán los datos actuales por los de la copia. ¿Continuar?'))return;
  S=Object.assign(base(),migrar(d));save();aplicarTema(S.tema);
  if(PDV.mod.cerebro)PDV.mod.cerebro.reiniciar();   // los filtros abiertos no aplican a los datos nuevos
  PDV.renderizar()};
 r.readAsText(f);e.target.value=''};
