# Proyecto Vue

Coleccion de aplicaciones web construidas con **Vue 3** y **Vite**. Cada carpeta es un proyecto independiente con su propio `package.json`, pero todos comparten el mismo estilo visual, sistema de temas claro/oscuro y patrones de arquitectura (componentes con Options API y persistencia en `localStorage`).

## Proyectos incluidos

| Proyecto | Descripcion | Enlace |
|----------|-------------|--------|
| `reloj-vue` | Reloj digital en vivo con alarma y estadisticas | [README](reloj-vue/README.md) |
| `calculadora-vue` | Calculadora con historial flip y tema oscuro | [README](calculadora-vue/README.md) |
| `conversor-vue` | Conversor de monedas con 15 divisas y flip 3D | [README](conversor-vue/README.md) |
| `lista-tareas-vue` | Gestor de tareas con filtros y progreso | [README](lista-tareas-vue/README.md) |
| `memo-test-vue` | Juego de memoria de parejas de animales | [README](memo-test-vue/README.md) |
| `clima-app-vue` | App del clima con API de OpenWeatherMap | [README](clima-app-vue/README.md) |
| `galeria-fotos-vue` | Albumes de fotos con subida local | [README](galeria-fotos-vue/README.md) |
| `notas-app-vue` | Notas tipo sticky con etiquetas y favoritos | [README](notas-app-vue/README.md) |
| `dashboard-vue` | Panel de productividad con Pomodoro y metricas | [README](dashboard-vue/README.md) |

## Detalle de cada proyecto

### Reloj Digital (`reloj-vue`)
Reloj en tiempo real con formato 12h/24h, visualizacion de segundos, cambio de color, tema claro/oscuro y alarma con tres sonidos generados por Web Audio API. Incluye estadisticas (dia de semana, semana del año, tiempo encendido).

### Calculadora (`calculadora-vue`)
Calculadora basica (suma, resta, multiplicacion, division, porcentaje) con animacion flip 3D hacia el historial, numero con formato de miles y tema persistente.

### Conversor de Monedas (`conversor-vue`)
Conversor con 15 monedas, tasas de cambio simuladas, intercambio de divisas, conversiones populares y modal de confirmacion profesional (`ModalConfirmacion`). Usa `sweetalert2`.

### Lista de Tareas (`lista-tareas-vue`)
CRUD de tareas con filtros (todas/pendientes/completadas), barra de progreso, resumen estadistico y modales para editar y eliminar.

### MemoTest (`memo-test-vue`)
Juego de memoria con tablero 4x4, 8 pares de animales emoji, modos de 1 y 2 jugadores, turnos alternados y modal de victoria.

### App del Clima (`clima-app-vue`)
Consulta del clima por ciudad usando la API de OpenWeatherMap. Muestra temperatura, sensacion termica, humedad, viento y presion, con historial de busquedas y manejo de errores. Requiere clave de API en `.env`.

### Galeria de Fotos (`galeria-fotos-vue`)
Albumes tipo "cuaderno" con subida de multiples imagenes (FileReader), visualizacion en modal y eliminacion con confirmacion. Las fotos se guardan como Data URLs en `localStorage`.

### Notas (`notas-app-vue`)
Notas tipo sticky con titulo, contenido, etiquetas, colores personalizados y favoritos. Busqueda en tiempo real y filtro por favoritas.

### Dashboard (`dashboard-vue`)
Panel de productividad que integra tareas, habitos, metas, notas y un temporizador Pomodoro con alarma sonora. Incluye tarjetas de metricas y grafico de actividad semanal.

## Tecnologias comunes

- **Vue 3** (Options API) — versiones 3.4.x y 3.5.x
- **Vite** 5 u 8 segun el proyecto
- **CSS Variables** para theming (`main.css` + `themes/dark.css`)
- **localStorage** para persistencia de datos y tema
- **Web Audio API** (reloj y dashboard) para sonidos de alarma
- **API REST** (clima) via `fetch`
- **SVG inline** para iconos (sin dependencias de iconos)

## Estructura general

```
Proyecto_vue/
├── reloj-vue/
├── calculadora-vue/
├── conversor-vue/
├── lista-tareas-vue/
├── memo-test-vue/
├── clima-app-vue/
├── galeria-fotos-vue/
├── notas-app-vue/
└── dashboard-vue/
```

Cada proyecto sigue esta estructura interna:

```
<proyecto>/
├── index.html
├── package.json
├── vite.config.js
├── .env.example (solo clima)
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── style.css
│   ├── components/
│   │   ├── <ComponentePrincipal>.vue
│   │   └── ModalConfirmacion.vue (en varios)
│   └── assets/
│       ├── styles/
│       │   ├── main.css
│       │   └── themes/dark.css
│       └── *.svg, *.png
└── public/
    ├── favicon.svg
    └── icons.svg
```

## Convenciones compartidas

- **Tema claro/oscuro**: el boton `@click="$emit('alternar-tema')"` alterna la clase `tema-oscuro` en `<body>` y guarda la preferencia en `localStorage` con la clave `tema<Proyecto>`.
- **Persistencia**: cada app guarda su estado en `localStorage` (ver tabla de claves en cada README).
- **Modales**: varios proyectos reutilizan un componente `ModalConfirmacion.vue` con variantes `danger` / `success` / `warning`.
- **Responsive**: todos usan `max-width` centrado y media queries para colapsar a una columna en moviles.

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm

## Como ejecutar un proyecto

Cada proyecto es independiente. Desde la raiz:

```bash
# Entra a la carpeta del proyecto
cd reloj-vue

# Instala dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de produccion
npm run build

# Vista previa de la build
npm run preview
```

Para el **clima-app-vue** es necesario crear un archivo `.env` con tu clave de OpenWeatherMap:

```bash
# En clima-app-vue/.env
VITE_WEATHER_API_KEY=tu_api_key_aqui
```

## Scripts disponibles (por proyecto)

| Script | Descripcion |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo (Vite) |
| `npm run build` | Compila la app para produccion |
| `npm run preview` | Sirve la build de produccion localmente |

## Licencia

MIT (por proyecto)
