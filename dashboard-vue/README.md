# Dashboard de Productividad Vue

Panel de control personal de productividad construido con Vue 3 y Vite. Integra tareas, habitos, metas, notas, un temporizador Pomodoro con alarma y metricas en tiempo real, con persistencia local.

## Demo

Dashboard profesional con tarjetas de metricas, grafico de actividad semanal, gestion de tareas/habitos/metas/notas, temporizador Pomodoro y tema claro/oscuro.

## Caracteristicas

- **Metricas clave**: tarjetas de tareas, completadas, productividad y metas con tendencias
- **Grafico semanal**: barras de actividad con tareas completadas por dia
- **Resumen rapido**: pendientes, completadas hoy, productividad y ciclos Pomodoro
- **Tareas**: crear, completar y eliminar con prioridad (alta/media/baja) y categoria
- **Habitos**: crear, completar y eliminar con racha de dias y emoji
- **Metas**: crear y eliminar con barra de progreso porcentual
- **Notas**: crear y eliminar notas rapidas
- **Pomodoro**: temporizador configurable (enfoque/descanso) con alarma sonora via Web Audio API
- **Alarma visual**: modal y pulso al finalizar un ciclo de enfoque
- **Persistencia total**: todos los datos guardados en `localStorage`
- **Tema claro/oscuro**: cambio con persistencia en `localStorage`
- **Responsive**: layout de dos columnas que colapsa en moviles

## Modulos

| Modulo | Descripcion |
|--------|-------------|
| Tareas | Lista con checkbox, prioridad y categoria |
| Habitos | Seguimiento con racha de dias y emoji |
| Metas | Objetivos con barra de progreso % |
| Notas | Notas rapidas de texto |
| Pomodoro | Enfoque/descanso configurable con alarma |
| Metricas | Stats cards y grafico semanal |

## Tecnologias

- Vue 3 (Options API)
- Vite 8
- CSS Variables + Media Queries (grid de dos columnas)
- Web Audio API para la alarma del Pomodoro
- localStorage para persistencia

## Estructura del proyecto

```
dashboard-vue/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── style.css
│   ├── components/
│   │   ├── DashboardProfesional.vue
│   │   ├── StatsCards.vue
│   │   ├── ActivityChart.vue
│   │   ├── TaskList.vue
│   │   ├── TaskForm.vue
│   │   ├── HabitTracker.vue
│   │   ├── GoalTracker.vue
│   │   ├── QuickHabits.vue
│   │   ├── RecentTasks.vue
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
| `DashboardProfesional.vue` | Nucleo funcional: tareas, habitos, metas, notas, Pomodoro, metricas y grafico |
| `StatsCards.vue` | Tarjetas de metricas reutilizables |
| `ActivityChart.vue` | Grafico de actividad semanal |
| `TaskList.vue` / `TaskForm.vue` | Lista y formulario de tareas |
| `HabitTracker.vue` / `QuickHabits.vue` | Seguimiento de habitos |
| `GoalTracker.vue` | Seguimiento de metas |
| `RecentTasks.vue` | Tareas recientes |
| `ModalConfirmacion.vue` | Modal reutilizable de confirmacion |

## Flujo de uso

1. Agrega tareas, habitos, metas y notas desde sus formularios.
2. Marca tareas y habitos como completados para actualizar metricas y rachas.
3. Define el progreso de cada meta con su porcentaje.
4. Configura el Pomodoro (enfoque/descanso) e inicialo.
5. Al terminar el enfoque suena la alarma y aparece el modal de descanso.
6. Las metricas y el grafico se actualizan automaticamente.
7. El tema y todos los datos se guardan en `localStorage`.

## Persistencia

Las preferencias y datos se guardan en `localStorage`:
- `temaDashboard`: `claro` o `oscuro`
- `dashboardData`: JSON con tareas, habitos, metas, notas, actividad semanal, ciclos y tiempos de Pomodoro

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Licencia

MIT
