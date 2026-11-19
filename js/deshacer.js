/* Deshacer: tras un borrado se ofrece un aviso de 8 segundos para recuperar el elemento. */
PDV.deshacer=(()=>{
 const SEG=8000;
 let t=0,pendiente=null;

 function ocultar(){clearTimeout(t);t=0;pendiente=null;$('#toast').hidden=true}

 function ofrecer(texto,restaurar){
  $('#toast-txt').textContent=texto;
  $('#toast').hidden=false;
  pendiente=restaurar;
  clearTimeout(t);
  t=setTimeout(ocultar,SEG);
 }

 function deshacer(){
  if(!pendiente)return;
  const f=pendiente;
  ocultar();
  f();
  save();
  PDV.renderizar();
 }

 // Los scripts se cargan al final del documento, así que los elementos ya existen.
 $('#toast-undo').onclick=deshacer;
 $('#toast-x').onclick=ocultar;
 return {ofrecer,ocultar};
})();

/* Quita un elemento de una lista del estado y devuelve la función que lo restaura en su sitio. */
function quitarDe(lista,id){
 const i=lista.findIndex(x=>x.id===id);
 if(i<0)return null;
 const [elem]=lista.splice(i,1);
 return ()=>lista.splice(Math.min(i,lista.length),0,elem);
}
