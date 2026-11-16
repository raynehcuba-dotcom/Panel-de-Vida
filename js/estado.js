/* Estado de la app, guardado en el navegador y migraciones entre versiones del esquema. */
const K='panel-de-vida-v1';      // clave de almacenamiento: no cambiarla, para conservar los datos existentes
const VERSION=2;                 // versión del esquema de datos (ver docs/modelo-de-datos.md)
const base=()=>({version:VERSION,metas:[],habitos:[],movs:[],cer:[],tema:'light'});

/* Normalización: una copia antigua, importada o editada a mano no debe romper el renderizado. */
const txt=v=>typeof v==='string'?v:'';
const lista=v=>Array.isArray(v)?v.filter(x=>typeof x==='string'):[];
const arr=v=>Array.isArray(v)?v:[];
const TIPOS_CER=['nota','tarea','enlace','norma'];

function normalizar(d){
 d.metas=arr(d.metas).map(m=>({id:txt(m.id)||uid(),t:txt(m.t),f:txt(m.f),p:Math.min(100,Math.max(0,+m.p||0)),hecha:!!m.hecha}));
 d.habitos=arr(d.habitos).map(h=>({id:txt(h.id)||uid(),t:txt(h.t),dias:lista(h.dias)}));
 d.movs=arr(d.movs).map(m=>({id:txt(m.id)||uid(),tipo:m.tipo==='ingreso'?'ingreso':'gasto',m:+m.m||0,mo:txt(m.mo),c:txt(m.c),fecha:txt(m.fecha),n:txt(m.n)}));
 d.cer=arr(d.cer).map(x=>({id:txt(x.id)||uid(),tipo:TIPOS_CER.includes(x.tipo)?x.tipo:'nota',t:txt(x.t),x:txt(x.x),r:txt(x.r),tg:lista(x.tg),pr:txt(x.pr),fecha:txt(x.fecha),hecha:!!x.hecha}));
 d.tema=d.tema==='light'?'light':'dark';
 d.version=Math.max(VERSION,+d.version||VERSION);
 return d;
}

function migrar(d){
 if(!d||typeof d!=='object')return base();
 d.version=d.version||1;
 if(d.version<2){d.cer=d.cer||[];d.version=2}
 // Próximas migraciones: if(d.version<3){ ...adaptar campos...; d.version=3 }
 return normalizar(d);
}

let S=base();
try{const r=localStorage.getItem(K);if(r)S=Object.assign(base(),migrar(JSON.parse(r)))}catch(e){}
let avisoGuardado=false;
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){
 if(!avisoGuardado){avisoGuardado=true;alert('No se pudo guardar en el navegador (almacenamiento lleno o bloqueado). Exporte una copia de sus datos.')}
}};
