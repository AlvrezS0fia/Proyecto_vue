import { createApp } from 'vue'
import App from './App.vue'

// Estilos globales
import './assets/styles/main.css'
import './assets/styles/themes/light.css'
import './assets/styles/themes/dark.css'

const app = createApp(App)
app.mount('#app')