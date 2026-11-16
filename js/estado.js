/* Estado de la app, guardado en el navegador y migraciones entre versiones del esquema. */
const K='panel-de-vida-v1';      // clave de almacenamiento: no cambiarla, para conservar los datos existentes
const VERSION=2;                 // versión del esquema de datos (ver docs/modelo-de-datos.md)
const base=()=>({version:VERSION,metas:[],habitos:[],movs:[],cer:[],tema:'dark'});

function migrar(d){
 d.version=d.version||1;
 if(d.version<2){d.cer=d.cer||[];d.version=2}
 // Próximas migraciones: if(d.version<3){ ...adaptar campos...; d.version=3 }
 return d;
}

let S=base();
try{const r=localStorage.getItem(K);if(r)S=Object.assign(base(),migrar(JSON.parse(r)))}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
