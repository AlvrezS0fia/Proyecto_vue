# Lista de Tareas Vue

Aplicacion de lista de tareas con gestion completa, filtros, progreso visual y modales profesionales. Construida con Vue 3, Vite y CSS moderno.

## Demo

Gestor de tareas interactivo con CRUD completo, barra de progreso, filtros y tema claro/oscuro.

## Caracteristicas

- **CRUD completo**: agregar, editar, eliminar y marcar como completadas
- **Filtros**: todas, pendientes y completadas con contadores
- **Barra de progreso**: porcentaje visual de avance
- **Resumen estadistico**: conteo de pendientes, completadas y porcentaje
- **Modales profesionales**: confirmacion de eliminacion y edicion inline
- **Persistencia local**: guardado automatico en `localStorage`
- **Tema claro/oscuro**: cambio con persistencia en `localStorage`
- **Animaciones suaves**: microinteracciones en hover y acciones
- **Responsive**: adaptable a moviles y escritorio

## Tecnologias

- Vue 3 (Composition API / Options API)
- Vite 8
- CSS Variables + Media Queries
- Modales animados con CSS keyframes

## Estructura del proyecto

```
lista-tareas-vue/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── style.css
│   ├── components/
│   │   ├── ListaTareas.vue
│   │   └── ModalConfirmacion.vue
│   └── assets/
│       └── styles/
│           ├── main.css
│           └── themes/
│               └── dark.css
│   └── assets/
│       ├── hero.png
│       ├── vue.svg
│       └── vite.svg
└── public/
    ├── favicon.svg
    └── icons.svg
```

## Componentes

| Componente | Responsabilidad |
| --- | --- |
| `App.vue` | Estado global del tema, montaje inicial |
| `ListaTareas.vue` | CRUD de tareas, filtros, progreso y modales de edicion/eliminacion |
| `ModalConfirmacion.vue` | Modal reutilizable con variantes danger/success/warning |

## Persistencia

Las preferencias se guardan en `localStorage`:
- `temaListaTareas`: `claro` o `oscuro`
- `tareasLista`: array JSON con las tareas y su estado

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Licencia

MIT
