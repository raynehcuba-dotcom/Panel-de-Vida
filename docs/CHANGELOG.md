# Registro de cambios

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
