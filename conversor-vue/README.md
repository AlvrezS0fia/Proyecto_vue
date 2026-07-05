# Conversor de Monedas Vue

Conversor de divisas con animación flip 3D, historial persistente y modal de confirmación profesional. Construido con Vue 3, Vite y CSS moderno.

## Demo

Conversor interactivo con 15 monedas, tasas de cambio simuladas, historial animado y temas claro/oscuro.

## Caracteristicas

- **Conversion multiple**: 15 monedas con emojis y nombres
- **Animacion flip 3D**: transicion entre conversor e historial
- **Historial persistente**: guardado en `localStorage`
- **Reutilizar resultados**: usa cualquier conversion anterior
- **Modal de confirmacion**: elimina el `confirm()` nativo con `ModalConfirmacion`
- **Conversiones populares**: acceso rapido a monedas frecuentes
- **Intercambio de monedas**: boton de inversion con animacion
- **Formato numerico**: separador de miles con comas
- **Temas**: modo claro/oscuro con persistencia en `localStorage`
- **Responsive**: adaptable a moviles y escritorio

## Monedas soportadas

| Codigo | Nombre | Emoji |
|--------|--------|-------|
| USD | Dolar estadounidense | 🇺🇸 |
| EUR | Euro | 🇪🇺 |
| GBP | Libra esterlina | 🇬🇧 |
| JPY | Yen japones | 🇯🇵 |
| MXN | Peso mexicano | 🇲🇽 |
| COP | Peso colombiano | 🇨🇴 |
| ARS | Peso argentino | 🇦🇷 |
| BRL | Real brasileno | 🇧🇷 |
| CLP | Peso chileno | 🇨🇱 |
| PEN | Sol peruano | 🇵🇪 |
| CAD | Dolar canadiense | 🇨🇦 |
| AUD | Dolar australiano | 🇦🇺 |
| CHF | Franco suizo | 🇨🇭 |
| CNY | Yuan chino | 🇨🇳 |
| INR | Rupia india | 🇮🇳 |

## Tecnologias

- Vue 3 (Options API)
- Vite 5
- CSS Variables + Media Queries
- Animaciones 3D con `transform-style: preserve-3d`

## Estructura del proyecto

```
conversor-vue/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── style.css
│   ├── components/
│   │   ├── Conversor.vue
│   │   ├── ConversorFlip.vue
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
| `Conversor.vue` | Logica de conversion, historial y UI alternativa |
| `ConversorFlip.vue` | Contenedor flip 3D, logica de conversor e historial |
| `ModalConfirmacion.vue` | Modal reutilizable para confirmaciones |

## Persistencia

Las preferencias se guardan en `localStorage`:
- `temaConversor3D`: `claro` o `oscuro`
- `historialConversor3D`: array JSON con las ultimas 25 conversiones

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Licencia

MIT
