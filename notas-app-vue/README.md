# Notas App Vue

Aplicacion de notas tipo sticky notes construida con Vue 3 y Vite. Permite crear, editar, eliminar y buscar notas con titulo, contenido, etiquetas, colores personalizados y favoritos, con persistencia local.

## Demo

App de notas interactiva con tarjetas de colores, buscador, filtro por favoritas, modal de creacion/edicion y tema claro/oscuro.

## Caracteristicas

- **CRUD de notas**: crear, editar y eliminar notas
- **Buscador**: busqueda en tiempo real por titulo, contenido y etiquetas
- **Filtros**: todas y favoritas
- **Favoritos**: marca notas como favoritas con icono de corazon
- **Colores personalizados**: 12 colores de tarjeta seleccionables
- **Etiquetas**: tags separados por comas
- **Modal de edicion**: formulario completo con titulo, contenido, tags y color
- **Modal de confirmacion**: confirmacion profesional al eliminar notas
- **Persistencia total**: notas guardadas en `localStorage`
- **Contadores**: badges por filtro
- **Tema claro/oscuro**: cambio con persistencia en `localStorage`
- **Responsive**: adaptable a moviles y escritorio

## Estructura de datos

```js
{
  id: Number,
  titulo: String,
  contenido: String,
  tags: String[],
  color: String,
  favorita: Boolean,
  fecha: ISOString
}
```

## Tecnologias

- Vue 3 (Options API)
- Vite 8
- CSS Variables + Media Queries
- localStorage para persistencia

## Estructura del proyecto

```
notas-app-vue/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── style.css
│   ├── components/
│   │   ├── NotasApp.vue
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
| `NotasApp.vue` | CRUD de notas, buscador, filtros, favoritos y modal de edicion |
| `ModalConfirmacion.vue` | Modal reutilizable con variante danger para eliminaciones |

## Flujo de uso

1. Presiona `Nueva Nota` para crear una nota.
2. Completa titulo, contenido, etiquetas separadas por comas y elige un color.
3. Presiona `Guardar` para crear la nota.
4. Marca notas como favoritas con el boton de corazon.
5. Usa el buscador para filtrar por texto.
6. Usa los filtros para ver todas las notas o solo las favoritas.
7. Edita o elimina notas desde los botones de cada tarjeta.
8. El tema y las notas se guardan automaticamente en `localStorage`.

## Persistencia

Las preferencias y datos se guardan en `localStorage`:
- `temaNotas`: `claro` o `oscuro`
- `notasApp`: array JSON con las notas y todos sus campos

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Licencia

MIT
