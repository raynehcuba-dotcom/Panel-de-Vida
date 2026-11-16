# Modelo de datos (esquema versión 3)

Se guarda en `localStorage` bajo la clave `panel-de-vida-v1` como un objeto JSON.

| Campo | Contenido |
|---|---|
| `version` | Número de versión del esquema (actual: 3) |
| `tema` | `dark` o `light` |
| `inicio` | Fecha de la primera vez que se usó la app (para el recordatorio de copias) |
| `ultimaCopia` | Fecha de la última exportación; vacío si nunca se exportó |
| `avisoCopia` | Fecha en que se descartó el recordatorio (el aviso vuelve al día siguiente) |
| `metas[]` | `id`, `t` (título), `f` (fecha límite AAAA-MM-DD, opcional), `p` (avance 0 a 100), `hecha` |
| `habitos[]` | `id`, `t` (nombre), `dias[]` (fechas AAAA-MM-DD cumplidas) |
| `movs[]` | `id`, `tipo` (`ingreso` o `gasto`), `m` (monto), `mo` (`CUP` o `USD`), `c` (categoría), `fecha`, `n` (nota) |
| `cer[]` | `id`, `tipo` (`nota`, `tarea`, `enlace` o `norma`), `t` (título), `x` (contenido), `r` (enlace o referencia), `tg[]` (etiquetas), `pr` (proyecto), `fecha`, `hecha` (solo tareas) |

Al cargar o importar, `migrar()` normaliza los registros antes de usarlos: los campos de texto ausentes pasan a `''`, las listas a `[]`, `p` se limita a 0–100, `tipo` toma un valor válido y los `id` faltantes se generan. Así una copia antigua o editada a mano nunca deja la app en blanco.

## Historial de versiones
- **1:** metas, hábitos y movimientos.
- **2:** se agrega `cer[]` (segundo cerebro) y el campo `version`.
- **3:** se agregan `inicio`, `ultimaCopia` y `avisoCopia` para el recordatorio de copias.

## Copias automáticas
En una clave aparte (`panel-de-vida-copias`) se guardan hasta 3 copias del estado anterior, creadas justo antes de importar un archivo o de restaurar otra copia. No forman parte del JSON que genera **Exportar copia**; solo sirven para deshacer un reemplazo de datos desde **Copias automáticas**.
