# Panel de Vida

Aplicación web personal que funciona sin conexión. Reúne metas, hábitos, finanzas personales y un segundo cerebro (notas, tareas, enlaces y normativa).

## Uso
1. Abra `index.html` con doble clic (Chrome, Edge o Firefox).
2. Use siempre el mismo navegador y la misma ruta de carpeta: los datos se guardan en el navegador.
3. Exporte una copia con **Exportar copia** de forma periódica y guárdela en `respaldos/`. La app avisa cuando pasan 14 días sin exportar y, antes de cada importación, guarda copias automáticas recuperables desde **Copias automáticas**.

## Estructura
- `index.html`: marcado de las vistas y carga de scripts (el orden importa).
- `css/`: `base.css` (variables y temas), `layout.css` (estructura), `componentes.css` (elementos).
- `js/utils.js`: funciones auxiliares y el espacio global `PDV`.
- `js/estado.js`: datos, guardado y migraciones de versión.
- `js/modulos/`: un archivo por módulo (resumen, metas, hábitos, finanzas, cerebro).
- `js/respaldo.js`: exportar e importar copias JSON.
- `js/app.js`: navegación, despacho de acciones, tema y arranque.

## Cómo agregar un módulo nuevo
1. Cree `js/modulos/nombre.js` con `PDV.mod.nombre={renderizar(){...},acciones:{...},iniciar(){...}}`.
2. Agregue su sección `<section id="v-...">` y su botón `data-v` en `index.html`, y cargue el script antes de `respaldo.js`.
3. Si guarda datos nuevos, añada su campo en `base()` y una migración en `js/estado.js`, y súbale `VERSION`.
4. Documente los campos en `docs/modelo-de-datos.md` y registre el cambio en `docs/CHANGELOG.md`.

## Notas técnicas
- Se usan scripts clásicos, no módulos ES, porque los navegadores los bloquean al abrir la página desde el disco.
- Los botones con `data-a="accion"` se despachan al módulo que declare esa acción en su objeto `acciones`.
- La interfaz sigue el prototipo entregado: contenedor redondeado, tarjetas blancas con borde fino y naranja como acento. Los colores, radios y sombras son variables CSS en `css/base.css`; el tema claro es el predeterminado y el oscuro se activa desde la cabecera.
- Los iconos son SVG en línea generados por `ico()` (`js/utils.js`) o inyectados con `data-ico="nombre"` en el marcado; no hay fuentes ni archivos externos, así la app sigue funcionando sin conexión.
