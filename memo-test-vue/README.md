# MemoTest Vue

Juego de memoria tipo "parejas" construido con Vue 3 y Vite. Encuentra los pares de animales en un tablero 4x4, con modos 1 jugador y 2 jugadores, animaciones 3D en las cartas y modal de victoria.

## Demo

Juego de memoria interactivo con 24 animales emoji, tablero 4x4, turnos para 2 jugadores y efectos flip/shake en las cartas.

## Caracteristicas

- **Modo 1 jugador**: mide intentos y tiempo
- **Modo 2 jugadores**: turnos alternados con marcador por jugador
- **Tablero 4x4**: 8 pares de animales por partida
- **Animales emoji**: 24 figuras distintas (perro, gato, leon, panda, etc.)
- **Animaciones 3D**: flip de cartas con `transform-style: preserve-3d`
- **Animacion shake**: feedback al fallar una pareja
- **Modal de victoria**: resumen con intentos, tiempo o resultado por jugadores
- **Tema claro/oscuro**: cambio con persistencia en `localStorage`
- **Responsive**: adaptable a moviles y escritorio

## Modos de juego

| Modo | Descripcion | Metrica |
|------|-------------|---------|
| 1 Jugador | Partida individual | Intentos y tiempo |
| 2 Jugadores | Turnos alternados | Puntos por jugador |

## Animales incluidos

Perro, Gato, Raton, Hamster, Conejo, Zorro, Oso, Panda, Koala, Leon, Vaca, Cerdo, Rana, Mono, Pollo, Pinguino, pajaro, Caballo, Unicornio, Pulpo, Mariposa, Mariquita, Tortuga, Ballena.

## Tecnologias

- Vue 3 (Options API)
- Vite 8
- CSS Variables + Media Queries
- Animaciones 3D con `transform-style: preserve-3d`
- Keyframes CSS (`shake`, `overlayIn`, `bounce-in`, `float`)

## Estructura del proyecto

```
memo-test-vue/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── style.css
│   ├── components/
│   │   └── MemoTest.vue
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
    └── favicon.svg
```

## Componentes

| Componente | Responsabilidad |
| --- | --- |
| `App.vue` | Estado global del tema, montaje inicial |
| `MemoTest.vue` | Logica del juego, tablero, turnos, animaciones y modal de victoria |

## Flujo del juego

1. Selecciona el modo: 1 jugador o 2 jugadores.
2. Se generan 8 pares aleatorios y se mezclan en un tablero 4x4.
3. Al hacer clic, la carta se voltea con animacion 3D.
4. Si las dos cartas coinciden, se marcan como encontradas.
5. Si no coinciden, se ocultan tras 800ms con animacion `shake`.
6. En modo 2 jugadores, el turno cambia tras cada intento fallido.
7. Al encontrar los 8 pares, se muestra el modal de victoria.

## Persistencia

Las preferencias se guardan en `localStorage`:
- `temaMemoTest`: `claro` o `oscuro`

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Licencia

MIT
