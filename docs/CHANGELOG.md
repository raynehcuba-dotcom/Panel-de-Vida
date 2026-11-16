# Registro de cambios

## 0.6.0
- Guardado en archivo (Chrome y Edge): vincule un JSON del equipo desde **Guardar en archivo** y la app escribe ahí cada cambio, además de en el navegador. El vínculo se recuerda entre sesiones mediante IndexedDB.
- El diálogo del archivo permite **Guardar ahora**, **Leer desde archivo** (restaura desde el disco, con copia automática previa) y **Desvincular**.
- Si el navegador pide permiso otra vez al reabrir, se solicita en el siguiente cambio de datos y nunca más de una vez por sesión.
- Mientras hay un archivo vinculado, el recordatorio de exportar no aparece y la nota del menú muestra el archivo.
- Documentación actualizada: README y modelo de datos.

## 0.5.0
- Recordatorio de copia: si pasan 14 días sin exportar (o nunca se exportó y ya hay datos), aparece un aviso con **Exportar copia** y **Ahora no**; el descarte dura hasta el día siguiente.
- Copias automáticas: antes de cada importación o restauración se guardan hasta 3 copias rotativas del estado anterior, recuperables desde **Copias automáticas** en el menú lateral.
- Al restaurar una copia, el estado descartado también se guarda, así la restauración se puede deshacer.
- Esquema de datos versión 3: se agregan `inicio`, `ultimaCopia` y `avisoCopia`.

## 0.4.0
- Nueva interfaz según el prototipo: contenedor redondeado sobre fondo gris claro, tarjetas blancas con borde fino, tipografía más compacta y naranja como color de acento.
- Menú lateral con iconos, cabecera con el título y la descripción de cada vista, y acciones de tema, importar y exportar en la cabecera.
- Controles rediseñados: formularios tipo tarjeta, filtros segmentados, chips de etiquetas, barras de avance y control deslizante con relleno naranja.
- El tema claro es ahora el predeterminado; el tema oscuro se mantiene con la misma paleta.
- `js/utils.js` incorpora los iconos de línea (`ico()`) y la fecha larga (`fLarga()`).

## 0.3.1
- Al cargar o importar, los registros se normalizan: campos de texto faltantes, listas ausentes y tipos incorrectos ya no rompen el renderizado.
- Importar copia: valida también `cer`, solo reemplaza los datos si la copia es válida y reinicia los filtros del segundo cerebro.
- Segundo cerebro: botón **Cancelar edición** para descartar una edición pendiente sin sobrescribir el elemento.
- Exportar copia: el enlace temporal se agrega al documento y se libera con retraso, para no cancelar la descarga.
- Aviso al usuario si el navegador no permite guardar (almacenamiento lleno o bloqueado).
- CSS: se corrige la declaración `font` inválida del botón `.g`.

## 0.3.0
- Proyecto separado en carpetas: `css/`, `js/`, `js/modulos/` y `docs/`.
- Estado con campo `version` y función `migrar()` (esquema versión 2).
- Despacho central de acciones por módulo.

## 0.2.0
- Sección Segundo cerebro: notas, tareas, enlaces y normativa, con búsqueda, etiquetas y proyectos.

## 0.1.0
- Primera versión: Resumen, Metas, Hábitos y Finanzas (CUP y USD), modo oscuro y claro, exportar e importar copia.
