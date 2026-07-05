# Reloj Digital

Reloj digital en tiempo real construido con Vue 3, Vite y Web Audio API. Incluye alarma programable con sonido, temas claro/oscuro y estadísticas de uso.

## Demo

Tiempo exacto en tiempo real con controles interactivos y alarma sonora.

## Características

- **Hora en vivo**: Actualización en tiempo real con horas, minutos y segundos
- **Formato 12h / 24h**: Alternancia entre formatos con indicador AM/PM
- **Visibilidad de segundos**: Mostrar u ocultar los segundos
- **Color personalizable**: Cambia el color del display del reloj
- **Temas**: Modo claro y oscuro con persistencia en localStorage
- **Alarma programable**: Selecciona hora y activa la alarma
- **Sonidos de alarma**: Tres modos — clásica (pitidos), suave y melodía
- **Modal de alarma**: Overlay animado con opciones de detener o posponer 5 minutos
- **Estadísticas**: Día de la semana, semana del año y tiempo encendido
- **Responsive**: Adaptable a móviles y escritorio

## Tecnologías

- Vue 3 (Composition API / Options API)
- Vite 5
- Web Audio API (sonido generado proceduralmente)
- CSS Variables + Media Queries

## Estructura del proyecto

```
reloj-vue/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── assets/
│   │   └── styles/
│   │       ├── main.css
│   │       └── themes/
│   │           ├── light.css
│   │           └── dark.css
│   ├── components/
│   │   ├── RelojDigital.vue
│   │   ├── Controles.vue
│   │   ├── Alarma.vue
│   │   ├── ModalAlarma.vue
│   │   └── Estadisticas.vue
│   └── composables/
│       └── useAlarma.js
└── public/
    ├── favicon.svg
    └── icons.svg
```

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Componentes

| Componente | Responsabilidad |
| --- | --- |
| `App.vue` | Estado global, ciclo de vida, lógica de alarma y tema |
| `RelojDigital.vue` | Render de hora y fecha |
| `Controles.vue` | Botones de formato, segundos y color |
| `Alarma.vue` | Input de hora y activación/desactivación |
| `ModalAlarma.vue` | Overlay de alarma sonando |
| `Estadisticas.vue` | Grid con métricas del reloj |

## Persistencia

Las preferencias se guardan en `localStorage`:
- `temaReloj`: `claro` o `oscuro`
- `horaAlarma`: hora programada en formato `HH:mm`

## Licencia

MIT
