/* Utilidades compartidas y espacio global PDV (cada módulo se registra en PDV.mod). */
const PDV={mod:{}};
const $=s=>document.querySelector(s);
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
const hoy=()=>iso(new Date());
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const fmt=n=>n.toLocaleString('es',{minimumFractionDigits:2,maximumFractionDigits:2});
const mesAct=()=>hoy().slice(0,7);
const diasRest=f=>Math.ceil((new Date(f+'T00:00')-new Date(hoy()+'T00:00'))/864e5);
