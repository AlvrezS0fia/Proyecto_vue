# Calculadora Vue

Calculadora interactiva con diseño flip, historial persistente y temas claro/oscuro. Construida con Vue 3, Vite y CSS moderno.

## Demo

Calculadora básica con animación flip hacia el historial, operaciones matemáticas y persistencia local.

## Características

- **Operaciones básicas**: suma, resta, multiplicación, división y porcentaje
- **Borrado inteligente**: retroceso (`⌫`) y limpieza total (`AC`)
- **Historial flip**: animación 3D entre calculadora e historial
- **Historial persistente**: guardado en `localStorage`
- **Reusar resultados**: usa cualquier resultado anterior desde el historial
- **Limpieza de historial**: elimina todo el historial con confirmación
- **Manejo de errores**: manejo de división entre cero
- **Formato numérico**: separador de miles con comas
- **Tema claro/oscuro**: cambio con persistencia en `localStorage`
- **Responsive**: adaptable a móviles y escritorio

## Operaciones soportadas

| Operación | Símbolo | Descripción |
| --- | --- | --- |
| Suma | `+` | Suma dos números |
| Resta | `-` | Resta dos números |
| Multiplicación | `×` | Multiplica dos números |
| División | `÷` | Divide dos números |
| Porcentaje | `%` | Calcula el porcentaje |

## Tecnologías

- Vue 3 (Composition API / Options API)
- Vite 8
- CSS Variables + Media Queries
- Animaciones 3D con `transform-style: preserve-3d`

## Estructura del proyecto

```
calculadora-vue/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── style.css
│   ├── components/
│   │   ├── CalculadoraFlip.vue
│   │   └── HelloWorld.vue
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
| `CalculadoraFlip.vue` | Lógica de calculadora, historial y animación flip |

## Persistencia

Las preferencias se guardan en `localStorage`:
- `temaCalculadora`: `claro` o `oscuro`
- `historialCalculadora`: array JSON con las últimas 30 operaciones

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Licencia

MIT
