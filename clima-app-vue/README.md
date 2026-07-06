# App del Clima Vue

Aplicacion de consulta del clima en tiempo real construida con Vue 3 y Vite. Usa la API de OpenWeatherMap para mostrar temperatura, sensacion termica, humedad, viento y presion atmosferica, con historial de busquedas y tema claro/oscuro.

## Demo

App del clima con buscador de ciudades, tarjeta de condiciones actuales, iconos meteorologicos oficiales y historial persistente de busquedas.

## Caracteristicas

- **Busqueda de ciudades**: consulta cualquier ciudad por nombre
- **Datos en tiempo real**: temperatura, sensacion termica, humedad, viento y presion
- **Iconos oficiales**: imagenes de OpenWeatherMap (`@4x`)
- **Historial de busquedas**: hasta 10 ciudades recientes guardadas en `localStorage`
- **Reutilizacion del historial**: click en una busqueda anterior para consultarla de nuevo
- **Limpieza del historial**: elimina todas las busquedas guardadas
- **Manejo de errores**: mensajes claros para ciudad no encontrada, API key invalida y errores de red
- **Tema claro/oscuro**: cambio con persistencia en `localStorage`
- **Responsive**: adaptable a moviles y escritorio

## Datos mostrados

| Dato | Fuente API | Unidad |
|------|-----------|--------|
| Temperatura | `main.temp` | °C |
| Sensacion termica | `main.feels_like` | °C |
| Humedad | `main.humidity` | % |
| Viento | `wind.speed` | km/h |
| Presion atmosferica | `main.pressure` | hPa |

## Tecnologias

- Vue 3 (Options API)
- Vite 8
- CSS Variables + Media Queries
- Fetch API + OpenWeatherMap

## Estructura del proyecto

```
clima-app-vue/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── style.css
│   ├── components/
│   │   └── ClimaApp.vue
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
| `ClimaApp.vue` | Busqueda, render del clima, historial y manejo de errores |

## Configuracion

Crea un archivo `.env` en la raiz del proyecto con tu clave de OpenWeatherMap:

```
VITE_WEATHER_API_KEY=tu_api_key_aqui
```

Puedes obtener una clave gratuita en [OpenWeatherMap](https://openweathermap.org/api).

## Flujo de uso

1. Ingresa el nombre de una ciudad en el buscador.
2. Presiona `Buscar` o `Enter`.
3. Si la ciudad existe, se muestra la tarjeta del clima con icono y detalles.
4. Si no existe o hay error, se muestra un mensaje con opcion de reintentar.
5. Las busquedas se guardan en el historial para acceso rapido.
6. El tema se guarda automaticamente en `localStorage`.

## Persistencia

Las preferencias se guardan en `localStorage`:
- `temaClima`: `claro` o `oscuro`
- `historialClima`: array JSON con las ultimas 10 ciudades buscadas

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Licencia

MIT
