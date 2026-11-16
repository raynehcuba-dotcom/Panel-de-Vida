# Modelo de datos (esquema versión 2)

Se guarda en `localStorage` bajo la clave `panel-de-vida-v1` como un objeto JSON.

| Campo | Contenido |
|---|---|
| `version` | Número de versión del esquema (actual: 2) |
| `tema` | `dark` o `light` |
| `metas[]` | `id`, `t` (título), `f` (fecha límite AAAA-MM-DD, opcional), `p` (avance 0 a 100), `hecha` |
| `habitos[]` | `id`, `t` (nombre), `dias[]` (fechas AAAA-MM-DD cumplidas) |
| `movs[]` | `id`, `tipo` (`ingreso` o `gasto`), `m` (monto), `mo` (`CUP` o `USD`), `c` (categoría), `fecha`, `n` (nota) |
| `cer[]` | `id`, `tipo` (`nota`, `tarea`, `enlace` o `norma`), `t` (título), `x` (contenido), `r` (enlace o referencia), `tg[]` (etiquetas), `pr` (proyecto), `fecha`, `hecha` (solo tareas) |

## Historial de versiones
- **1:** metas, hábitos y movimientos.
- **2:** se agrega `cer[]` (segundo cerebro) y el campo `version`.
