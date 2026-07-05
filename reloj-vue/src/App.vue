<template>
  <div class="reloj-container">
    <!-- Header -->
    <header class="header">
      <h1>
        <svg class="icon icon-lg" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span>Reloj Digital</span>
      </h1>
      <p class="subtitulo">Tiempo exacto en tiempo real</p>
    </header>

    <!-- Reloj -->
    <RelojDigital 
      :hora-formateada="horaFormateada" 
      :fecha-formateada="fechaFormateada" 
    />

    <!-- Controles -->
    <Controles 
      :formato24h="formato24h"
      :mostrarSegundos="mostrarSegundos"
      @alternar-formato="alternarFormato"
      @alternar-segundos="mostrarSegundos = !mostrarSegundos"
      @cambiar-color="cambiarColor"
    />

    <!-- Tema -->
    <div class="tema">
      <button class="btn-tema" @click="alternarTema">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        {{ temaOscuro ? 'Modo Oscuro' : 'Modo Claro' }}
      </button>
    </div>

    <!-- Selector de sonido -->
    <div class="selector-sonido">
      <label>Sonido de alarma:</label>
      <select v-model="sonidoSeleccionado" class="select-sonido">
        <option value="classic">Clasica (Pitidos)</option>
        <option value="suave">Suave</option>
        <option value="melodia">Melodia</option>
      </select>
      <button class="btn-probar" @click="probarSonido">Probar</button>
    </div>

    <!-- Alarma -->
    <Alarma 
      :horaAlarma="horaAlarma"
      :alarmaActivada="alarmaActivada"
      @toggle-alarma="toggleAlarma"
      @actualizar-hora="horaAlarma = $event"
    />

    <!-- Modal Alarma -->
    <ModalAlarma 
      :mostrar="mostrarAlarma"
      :horaAlarma="horaAlarma"
      @detener="detenerAlarma"
      @repetir="repetirAlarma"
    />

    <!-- Estadisticas -->
    <Estadisticas 
      :hora="horaFormateada"
      :diaSemana="diaSemana"
      :semanaAnio="semanaAnio"
      :tiempoEncendido="tiempoEncendido"
    />

    <!-- Footer -->
    <footer class="footer">
      <p>
        <svg class="icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        2026 Reloj Digital · Con sonido de alarma
      </p>
    </footer>
  </div>
</template>

<script>
import RelojDigital from './components/RelojDigital.vue'
import Controles from './components/Controles.vue'
import Alarma from './components/Alarma.vue'
import ModalAlarma from './components/ModalAlarma.vue'
import Estadisticas from './components/Estadisticas.vue'
import { useAlarma } from './composables/useAlarma'

export default {
  name: 'App',
  components: {
    RelojDigital,
    Controles,
    Alarma,
    ModalAlarma,
    Estadisticas
  },
  data() {
    return {
      ahora: new Date(),
      formato24h: true,
      mostrarSegundos: true,
      temaOscuro: false,
      horaAlarma: '08:00',
      alarmaActivada: false,
      mostrarAlarma: false,
      sonidoSeleccionado: 'classic',
      tiempoInicio: null,
      tiempoTranscurrido: 0,
      intervaloReloj: null,
      intervaloTiempo: null,
      verificadorAlarma: null
    }
  },
  computed: {
    horaFormateada() {
      let horas = this.ahora.getHours()
      const minutos = String(this.ahora.getMinutes()).padStart(2, '0')
      const segundos = String(this.ahora.getSeconds()).padStart(2, '0')
      
      if (this.formato24h) {
        return `${String(horas).padStart(2, '0')}:${minutos}${this.mostrarSegundos ? ':' + segundos : ''}`
      } else {
        const ampm = horas >= 12 ? 'PM' : 'AM'
        horas = horas % 12 || 12
        return `${horas}:${minutos}${this.mostrarSegundos ? ':' + segundos : ''} ${ampm}`
      }
    },
    fechaFormateada() {
      return this.ahora.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    diaSemana() {
      const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
      return dias[this.ahora.getDay()]
    },
    semanaAnio() {
      const inicio = new Date(this.ahora.getFullYear(), 0, 1)
      const diff = (this.ahora - inicio) / (24 * 60 * 60 * 1000)
      return Math.ceil((diff + inicio.getDay() + 1) / 7)
    },
    tiempoEncendido() {
      const segundos = Math.floor(this.tiempoTranscurrido)
      const horas = Math.floor(segundos / 3600)
      const minutos = Math.floor((segundos % 3600) / 60)
      const segs = segundos % 60
      return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`
    }
  },
  watch: {
    temaOscuro(valor) {
      if (valor) {
        document.body.classList.add('tema-oscuro')
        localStorage.setItem('temaReloj', 'oscuro')
      } else {
        document.body.classList.remove('tema-oscuro')
        localStorage.setItem('temaReloj', 'claro')
      }
    }
  },
  mounted() {
    // Reloj
    this.intervaloReloj = setInterval(() => {
      this.ahora = new Date()
      this.verificarAlarma()
    }, 1000)
    
    // Tiempo encendido
    this.tiempoInicio = Date.now()
    this.intervaloTiempo = setInterval(() => {
      this.tiempoTranscurrido = (Date.now() - this.tiempoInicio) / 1000
    }, 1000)
    
    // Cargar preferencias
    const temaGuardado = localStorage.getItem('temaReloj')
    if (temaGuardado === 'oscuro') {
      this.temaOscuro = true
    }
    
    const alarmaGuardada = localStorage.getItem('horaAlarma')
    if (alarmaGuardada) {
      this.horaAlarma = alarmaGuardada
    }
  },
  beforeDestroy() {
    clearInterval(this.intervaloReloj)
    clearInterval(this.intervaloTiempo)
    // Detener sonido al destruir
    const { detenerTodosLosSonidos } = useAlarma()
    detenerTodosLosSonidos()
  },
  methods: {
    alternarFormato() {
      this.formato24h = !this.formato24h
    },
    alternarTema() {
      this.temaOscuro = !this.temaOscuro
    },
    cambiarColor() {
      const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF69B4', '#00CED1', '#FF8C00', '#8B008B', '#00FF7F', '#FF4500']
      const colorAleatorio = colores[Math.floor(Math.random() * colores.length)]
      const horaElement = document.getElementById('horaDisplay')
      if (horaElement) {
        horaElement.style.color = colorAleatorio
        horaElement.style.textShadow = `0 0 30px ${colorAleatorio}40`
      }
    },
    verificarAlarma() {
      if (this.alarmaActivada && !this.mostrarAlarma) {
        const horaActual = this.ahora.toTimeString().slice(0, 5)
        if (horaActual === this.horaAlarma) {
          this.activarAlarma()
        }
      }
    },
    activarAlarma() {
      this.mostrarAlarma = true
      this.reproducirAlarma()
    },
    reproducirAlarma() {
      const { generarSonidoAlarmaInfinito, sonidoSuave, sonidoMelodia } = useAlarma()
      
      // Detener cualquier sonido anterior
      const { detenerTodosLosSonidos } = useAlarma()
      detenerTodosLosSonidos()
      
      // Reproducir el sonido seleccionado
      switch (this.sonidoSeleccionado) {
        case 'classic':
          generarSonidoAlarmaInfinito()
          break
        case 'suave':
          sonidoSuave()
          break
        case 'melodia':
          sonidoMelodia()
          break
        default:
          generarSonidoAlarmaInfinito()
      }
    },
    probarSonido() {
      const { generarSonidoAlarmaInfinito, sonidoSuave, sonidoMelodia, detenerTodosLosSonidos } = useAlarma()
      
      // Detener cualquier sonido anterior
      detenerTodosLosSonidos()
      
      switch (this.sonidoSeleccionado) {
        case 'classic':
          generarSonidoAlarmaInfinito()
          break
        case 'suave':
          sonidoSuave()
          break
        case 'melodia':
          sonidoMelodia()
          break
        default:
          generarSonidoAlarmaInfinito()
      }
      
      // Detener después de 3 segundos (solo para prueba)
      setTimeout(() => {
        detenerTodosLosSonidos()
      }, 3000)
    },
    detenerAlarma() {
      const { detenerTodosLosSonidos } = useAlarma()
      detenerTodosLosSonidos()
      
      this.mostrarAlarma = false
      this.alarmaActivada = false
      localStorage.removeItem('horaAlarma')
    },
    repetirAlarma() {
      const { detenerTodosLosSonidos } = useAlarma()
      detenerTodosLosSonidos()
      
      this.mostrarAlarma = false
      
      // Programar para 5 minutos después
      const ahora = new Date()
      ahora.setMinutes(ahora.getMinutes() + 5)
      const horas = String(ahora.getHours()).padStart(2, '0')
      const minutos = String(ahora.getMinutes()).padStart(2, '0')
      this.horaAlarma = `${horas}:${minutos}`
      this.alarmaActivada = true
      localStorage.setItem('horaAlarma', this.horaAlarma)
    },
    toggleAlarma() {
      if (this.alarmaActivada) {
        // Si está activada, la desactivamos
        const { detenerTodosLosSonidos } = useAlarma()
        detenerTodosLosSonidos()
        this.alarmaActivada = false
        this.mostrarAlarma = false
        localStorage.removeItem('horaAlarma')
      } else {
        // Si está desactivada, la activamos
        this.alarmaActivada = true
        localStorage.setItem('horaAlarma', this.horaAlarma)
      }
    }
  }
}
</script>

<style scoped>
.reloj-container {
  max-width: 640px;
  margin: 30px auto;
  padding: 35px 30px 30px;
  border-radius: var(--radius-xl);
  transition: var(--transition-slow);
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 28px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.header h1 span {
  background: linear-gradient(135deg, #a78bfa, #8b5cf6, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header .subtitulo {
  font-size: 14px;
  margin-top: 4px;
  letter-spacing: 1px;
}

.tema {
  margin-bottom: 20px;
}

.btn-tema {
  width: 100%;
  padding: 13px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-tema:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.12);
}

.selector-sonido {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 12px 16px;
  border-radius: var(--radius);
  flex-wrap: wrap;
}

.selector-sonido label {
  font-weight: 600;
  font-size: 14px;
}

.select-sonido {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: var(--radius);
  font-size: 14px;
  cursor: pointer;
  min-width: 120px;
}

.btn-probar {
  padding: 8px 16px;
  border: none;
  border-radius: var(--radius);
  background: linear-gradient(135deg, #a78bfa, #7c3aed);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.btn-probar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
}

.footer {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid rgba(139, 92, 246, 0.08);
  text-align: center;
}

.footer p {
  font-size: 13px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

@media (max-width: 560px) {
  .reloj-container {
    padding: 25px 18px 20px;
    margin: 20px 16px;
    border-radius: 20px;
  }
  .header h1 {
    font-size: 22px;
  }
  .selector-sonido {
    flex-direction: column;
    align-items: stretch;
  }
  .select-sonido {
    width: 100%;
  }
}
</style>