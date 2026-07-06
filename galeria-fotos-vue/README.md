# Galeria de Fotos Vue

Aplicacion de galeria de fotos tipo "cuaderno" construida con Vue 3 y Vite. Permite crear albumes, subir imagenes desde el dispositivo, visualizarlas en un modal y gestionar todo el contenido con persistencia local.

## Demo

Galeria interactiva con Albumes tipo cuaderno, subida de fotos multiple, modal de visualizacion, colores y emojis personalizados por album, y tema claro/oscuro.

## Caracteristicas

- **Crear albumes**: genera cuadernos con nombre, color de portada y emoji
- **Subida de fotos**: soporte para multiples imagenes desde el dispositivo
- **Visualizacion modal**: preview de foto a pantalla completa con boton de cierre
- **Eliminar album**: con modal de confirmacion profesional
- **Eliminar foto**: con modal de confirmacion profesional
- **Persistencia total**: albumes y fotos guardados en `localStorage` como Data URLs
- **Contadores**: cantidad de fotos por album y total de cuadernos
- **Tema claro/oscuro**: cambio con persistencia en `localStorage`
- **Responsive**: adaptable a moviles y escritorio

## Estructura de datos

```js
{
  id: Number,
  nombre: String,
  color: String,
  emoji: String,
  fotos: [
    {
      id: Number,
      url: String, // Data URL
      nombre: String,
      fecha: ISOString
    }
  ]
}
```

## Tecnologias

- Vue 3 (Options API)
- Vite 8
- CSS Variables + Media Queries
- FileReader API para lectura de imagenes
- localStorage para persistencia

## Estructura del proyecto

```
galeria-fotos-vue/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── style.css
│   ├── components/
│   │   ├── AlbumFotos.vue
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
| `AlbumFotos.vue` | Gestion de albumes, subida de fotos, modal de visualizacion y modales de confirmacion |
| `ModalConfirmacion.vue` | Modal reutilizable con variante danger para eliminaciones |

## Flujo de uso

1. Escribe un nombre y presiona `Nuevo` para crear un cuaderno.
2. Haz clic en un cuaderno para abrirlo.
3. Presiona el boton `+` para seleccionar imagenes desde tu dispositivo.
4. Haz clic en una foto para visualizarla en el modal.
5. Usa el boton de eliminar (visible al hover) para borrar fotos o cuadernos.
6. El tema se guarda automaticamente en `localStorage`.

## Persistencia

Las preferencias y datos se guardan en `localStorage`:
- `temaAlbum`: `claro` o `oscuro`
- `albumesFotos`: array JSON con albumes, fotos y sus Data URLs

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Licencia

MIT
