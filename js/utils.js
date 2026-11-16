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
const fLarga=()=>new Date().toLocaleDateString('es',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

/* Iconos de línea: use ico('nombre') en los módulos o data-ico="nombre" en el marcado. */
const svgIco=p=>`<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ICO={
 grid:svgIco('<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>'),
 target:svgIco('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.2"/>'),
 check:svgIco('<circle cx="12" cy="12" r="8.2"/><path d="M8.5 12.3l2.4 2.4 4.6-4.9"/>'),
 wallet:svgIco('<rect x="3" y="6" width="18" height="13" rx="3.5"/><path d="M3 10.5h18"/><circle cx="16.6" cy="14.8" r="1.1"/>'),
 book:svgIco('<path d="M12 6.5C10 5 7.5 4.4 4.5 4.4v13.2c3 0 5.5.6 7.5 2.1 2-1.5 4.5-2.1 7.5-2.1V4.4c-3 0-5.5.6-7.5 2.1z"/><path d="M12 6.5v13.2"/>'),
 clock:svgIco('<circle cx="12" cy="12" r="8.2"/><path d="M12 8v4.4l2.6 1.6"/>'),
 x:svgIco('<path d="M6.5 6.5l11 11"/><path d="M17.5 6.5l-11 11"/>'),
 pencil:svgIco('<path d="M4.5 19.5h4l10-10-4-4-10 10z"/><path d="M13.5 6.5l4 4"/>'),
 undo:svgIco('<path d="M9 14.5L4.5 10 9 5.5"/><path d="M4.5 10h9a5.5 5.5 0 0 1 0 11H10"/>'),
 arrow:svgIco('<path d="M7.5 16.5l9-9"/><path d="M9.5 7.5h7v7"/>'),
 download:svgIco('<path d="M12 4.5v10"/><path d="M8 11l4 4 4-4"/><path d="M5 19.5h14"/>'),
 plus:svgIco('<path d="M12 5.5v13"/><path d="M5.5 12h13"/>')
};
const ico=n=>ICO[n]||'';