<template>
  <div class="flip-container" :class="{ flipped: mostrarHistorial }">
    <div class="flip-card">
      
      <!-- ===== CARA FRONTAL: CALCULADORA ===== -->
      <div class="flip-front">
        <div class="calculadora">
          <!-- Header -->
          <header class="header">
            <h1>
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="8" y1="6" x2="16" y2="6" />
                <line x1="8" y1="10" x2="16" y2="10" />
                <line x1="8" y1="14" x2="16" y2="14" />
                <line x1="8" y1="18" x2="12" y2="18" />
              </svg>
              <span>Calculadora</span>
            </h1>
            <div class="header-actions">
              <button class="btn-historial" @click="toggleHistorial" title="Ver historial">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 8v4l3 3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span class="badge" v-if="historial.length > 0">{{ historial.length }}</span>
              </button>
              <button class="btn-tema" @click="$emit('alternar-tema')" title="Cambiar tema">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
            </div>
          </header>

          <!-- Pantalla -->
          <div class="pantalla">
            <div class="operacion">{{ operacionCompleta }}</div>
            <div class="resultado">{{ pantalla || '0' }}</div>
          </div>

          <!-- Botones -->
          <div class="botones">
            <button class="btn-limpiar" @click="limpiar">AC</button>
            <button class="btn-operador" @click="agregarOperador('%')">%</button>
            <button class="btn-operador" @click="agregarOperador('/')">÷</button>
            <button class="btn-operador" @click="eliminarUltimo">⌫</button>

            <button class="btn-numero" @click="agregarNumero('7')">7</button>
            <button class="btn-numero" @click="agregarNumero('8')">8</button>
            <button class="btn-numero" @click="agregarNumero('9')">9</button>
            <button class="btn-operador" @click="agregarOperador('*')">×</button>

            <button class="btn-numero" @click="agregarNumero('4')">4</button>
            <button class="btn-numero" @click="agregarNumero('5')">5</button>
            <button class="btn-numero" @click="agregarNumero('6')">6</button>
            <button class="btn-operador" @click="agregarOperador('-')">−</button>

            <button class="btn-numero" @click="agregarNumero('1')">1</button>
            <button class="btn-numero" @click="agregarNumero('2')">2</button>
            <button class="btn-numero" @click="agregarNumero('3')">3</button>
            <button class="btn-operador" @click="agregarOperador('+')">+</button>

            <button class="btn-cero" @click="agregarNumero('0')">0</button>
            <button class="btn-punto" @click="agregarNumero('.')">.</button>
            <button class="btn-igual" @click="calcular">=</button>
          </div>

          <!-- Footer -->
          <footer class="footer">
            <p>
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {{ new Date().getFullYear() }} · 
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </p>
          </footer>
        </div>
      </div>

      <!-- ===== CARA TRASERA: HISTORIAL ===== -->
      <div class="flip-back">
        <div class="historial-panel">
          <header class="historial-header">
            <h2>
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Historial
            </h2>
            <div class="historial-actions">
              <button class="btn-volver" @click="toggleHistorial" title="Volver a la calculadora">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Volver
              </button>
              <button class="btn-limpiar-historial" @click="limpiarHistorial" v-if="historial.length > 0">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Limpiar todo
              </button>
            </div>
          </header>

          <div class="historial-contenido" v-if="historial.length > 0">
            <div 
              v-for="(item, index) in historial" 
              :key="index"
              class="item-historial"
              :style="{ animationDelay: (index * 0.05) + 's' }"
            >
              <span class="item-numero">#{{ historial.length - index }}</span>
              <span class="item-operacion">{{ item }}</span>
              <button class="btn-usar" @click="usarResultado(item)" title="Usar este resultado">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="historial-vacio" v-else>
            <svg class="icon-empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <p>No hay operaciones registradas</p>
            <span>Realiza cálculos y aparecerán aquí</span>
          </div>

          <div class="historial-footer" v-if="historial.length > 0">
            <p>Total: {{ historial.length }} operaciones</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculadoraFlip',
  
  props: {
    temaOscuro: {
      type: Boolean,
      default: false
    }
  },
  
  emits: ['alternar-tema'],
  
  data() {
    return {
      // ===== DATOS DE LA CALCULADORA =====
      pantalla: '',
      resultado: null,
      operador: null,
      primerNumero: null,
      reiniciarPantalla: false,
      
      // ===== HISTORIAL =====
      historial: [],
      
      // ===== ESTADO DEL FLIP =====
      mostrarHistorial: false
    }
  },
  
  computed: {
    operacionCompleta() {
      if (this.primerNumero !== null && this.operador) {
        return `${this.formatearNumero(this.primerNumero)} ${this.operador} ${this.pantalla || ''}`
      }
      return this.pantalla || ''
    }
  },
  
  mounted() {
    // Carga el historial guardado
    const historialGuardado = localStorage.getItem('historialCalculadora')
    if (historialGuardado) {
      try {
        this.historial = JSON.parse(historialGuardado)
      } catch (e) {
        this.historial = []
      }
    }
  },
  
  methods: {
    // ===== MÉTODOS DE LA CALCULADORA =====
    
    agregarNumero(num) {
      if (this.reiniciarPantalla) {
        this.pantalla = ''
        this.reiniciarPantalla = false
        this.resultado = null
      }
      
      if (num === '.' && this.pantalla.includes('.')) return
      if (num === '0' && this.pantalla === '0') return
      
      if (this.pantalla === '0' && num !== '.') {
        this.pantalla = num
      } else {
        this.pantalla += num
      }
    },
    
    agregarOperador(op) {
      if (this.operador && this.pantalla) {
        this.calcular()
      }
      
      if (!this.pantalla && this.primerNumero === null) return
      
      if (this.primerNumero === null) {
        this.primerNumero = parseFloat(this.pantalla)
      }
      
      this.operador = op
      this.reiniciarPantalla = true
    },
    
    calcular() {
      if (!this.operador || !this.pantalla) return
      
      const segundoNumero = parseFloat(this.pantalla)
      if (isNaN(segundoNumero)) return
      
      let resultado = 0
      const primerNumero = this.primerNumero
      
      switch (this.operador) {
        case '+': resultado = primerNumero + segundoNumero; break
        case '-': resultado = primerNumero - segundoNumero; break
        case '*': resultado = primerNumero * segundoNumero; break
        case '/':
          if (segundoNumero === 0) {
            this.pantalla = 'Error'
            this.resultado = 'Error'
            this.reiniciarPantalla = true
            return
          }
          resultado = primerNumero / segundoNumero
          break
        case '%': resultado = primerNumero * (segundoNumero / 100); break
        default: return
      }
      
      resultado = Number(resultado.toFixed(10))
      
      this.agregarAlHistorial(
        `${this.formatearNumero(primerNumero)} ${this.operador} ${this.formatearNumero(segundoNumero)} = ${this.formatearNumero(resultado)}`
      )
      
      this.resultado = resultado
      this.pantalla = String(resultado)
      this.primerNumero = resultado
      this.operador = null
      this.reiniciarPantalla = true
    },
    
    eliminarUltimo() {
      if (this.reiniciarPantalla) return
      this.pantalla = this.pantalla.slice(0, -1)
    },
    
    limpiar() {
      this.pantalla = ''
      this.resultado = null
      this.operador = null
      this.primerNumero = null
      this.reiniciarPantalla = false
    },
    
    // ===== MÉTODOS DEL HISTORIAL =====
    
    agregarAlHistorial(operacion) {
      if (this.historial.length > 0 && this.historial[0] === operacion) {
        return
      }
      
      this.historial.unshift(operacion)
      
      if (this.historial.length > 30) {
        this.historial.pop()
      }
      
      this.guardarHistorial()
    },
    
    limpiarHistorial() {
      if (this.historial.length === 0) return
      if (confirm('¿Seguro que quieres eliminar todo el historial?')) {
        this.historial = []
        this.guardarHistorial()
      }
    },
    
    guardarHistorial() {
      localStorage.setItem('historialCalculadora', JSON.stringify(this.historial))
    },
    
    usarResultado(item) {
      // Extrae el resultado de la operación (ej: "12 + 34 = 46" → "46")
      const partes = item.split(' = ')
      if (partes.length === 2) {
        const resultado = partes[1].replace(/,/g, '')
        this.pantalla = resultado
        this.resultado = parseFloat(resultado)
        this.primerNumero = null
        this.operador = null
        this.reiniciarPantalla = true
        this.toggleHistorial()
      }
    },
    
    // ===== MÉTODO DEL FLIP =====
    
    toggleHistorial() {
      this.mostrarHistorial = !this.mostrarHistorial
    },
    
    // ===== MÉTODOS DE UTILIDAD =====
    
    formatearNumero(numero) {
      if (numero === undefined || numero === null) return ''
      const partes = String(numero).split('.')
      partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return partes.join('.')
    }
  }
}
</script>

<style scoped>
/* ===== CONTENEDOR FLIP ===== */
.flip-container {
  perspective: 1200px;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  height: auto;
  min-height: 600px;
}

.flip-card {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 600px;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.flip-container.flipped .flip-card {
  transform: rotateY(180deg);
}

/* ===== CARAS ===== */
.flip-front,
.flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 600px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.flip-front {
  transform: rotateY(0deg);
  z-index: 2;
}

.flip-back {
  transform: rotateY(180deg);
  z-index: 1;
}

/* ===== CALCULADORA (FRONTAL) ===== */
.calculadora {
  background: var(--bg-card);
  padding: 30px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(124, 58, 237, 0.08);
  height: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

/* ===== HEADER ===== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.header h1 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.header h1 span {
  background: linear-gradient(135deg, var(--violet-600), var(--violet-800));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header .icon {
  color: var(--violet-600);
  width: 24px;
  height: 24px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

/* ===== BOTONES DEL HEADER ===== */
.btn-historial,
.btn-tema {
  padding: 8px;
  border: none;
  background: var(--bg-input);
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-secondary);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.btn-historial:hover,
.btn-tema:hover {
  background: var(--violet-200);
  transform: scale(1.05);
}

.btn-historial .badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--violet-600);
  color: white;
  font-size: 10px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== PANTALLA ===== */
.pantalla {
  background: var(--bg-input);
  padding: 18px 22px;
  border-radius: var(--radius);
  margin-bottom: 18px;
  text-align: right;
  min-height: 80px;
  border: 2px solid var(--border-color);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.pantalla::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 70% 50%, rgba(124, 58, 237, 0.03), transparent 70%);
  pointer-events: none;
}

.operacion {
  font-size: 13px;
  color: var(--text-muted);
  min-height: 20px;
  font-weight: 500;
  position: relative;
  z-index: 1;
}

.resultado {
  font-size: 34px;
  font-weight: 700;
  color: var(--text-primary);
  min-height: 42px;
  position: relative;
  z-index: 1;
  transition: var(--transition);
  font-family: 'Courier New', monospace;
}

/* ===== BOTONES ===== */
.botones {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  flex: 1;
  align-content: start;
}

.botones button {
  padding: 16px 10px;
  font-size: 20px;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
  font-weight: 600;
  position: relative;
  overflow: hidden;
}

.botones button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.botones button:active::after {
  width: 300px;
  height: 300px;
}

.botones button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.botones button:active {
  transform: scale(0.95);
}

.btn-numero {
  background: var(--bg-input);
  color: var(--text-primary);
}

.btn-numero:hover {
  background: var(--violet-200);
  color: var(--violet-800);
}

.btn-cero {
  grid-column: span 2;
  background: var(--bg-input);
  color: var(--text-primary);
}

.btn-cero:hover {
  background: var(--violet-200);
  color: var(--violet-800);
}

.btn-punto {
  background: var(--bg-input);
  color: var(--text-primary);
}

.btn-punto:hover {
  background: var(--violet-200);
  color: var(--violet-800);
}

.btn-operador {
  background: var(--violet-100);
  color: var(--violet-700);
}

.btn-operador:hover {
  background: var(--violet-600);
  color: white;
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3);
}

.btn-limpiar {
  background: var(--danger);
  color: white;
}

.btn-limpiar:hover {
  background: #dc2626;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
}

.btn-igual {
  background: linear-gradient(135deg, var(--violet-600), var(--violet-800));
  color: white;
  font-size: 26px;
}

.btn-igual:hover {
  box-shadow: 0 4px 24px rgba(124, 58, 237, 0.4);
  transform: translateY(-2px) scale(1.02);
}

/* ===== FOOTER ===== */
.footer {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  flex-shrink: 0;
}

.footer p {
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.footer .icon {
  width: 14px;
  height: 14px;
}

.footer .icon:last-child {
  color: var(--danger);
}

/* ======================================== */
/* ===== HISTORIAL (CARTA TRASERA) ===== */
/* ======================================== */

.historial-panel {
  background: var(--bg-card);
  padding: 30px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(124, 58, 237, 0.08);
  height: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

/* ===== HEADER DEL HISTORIAL ===== */
.historial-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 10px;
}

.historial-header h2 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.historial-header h2 .icon {
  color: var(--violet-600);
  width: 24px;
  height: 24px;
}

.historial-actions {
  display: flex;
  gap: 8px;
}

.btn-volver {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  background: var(--violet-600);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.btn-volver:hover {
  background: var(--violet-700);
  transform: scale(1.05);
}

.btn-volver .icon {
  width: 18px;
  height: 18px;
}

.btn-limpiar-historial {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px;
  background: var(--danger);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.btn-limpiar-historial:hover {
  background: #dc2626;
  transform: scale(1.05);
}

.btn-limpiar-historial .icon {
  width: 16px;
  height: 16px;
}

/* ===== CONTENIDO DEL HISTORIAL ===== */
.historial-contenido {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
}

.historial-contenido::-webkit-scrollbar {
  width: 4px;
}

.historial-contenido::-webkit-scrollbar-track {
  background: var(--bg-input);
  border-radius: 10px;
}

.historial-contenido::-webkit-scrollbar-thumb {
  background: var(--violet-400);
  border-radius: 10px;
}

.item-historial {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 8px;
  background: var(--bg-input);
  border-radius: var(--radius);
  font-size: 14px;
  color: var(--text-secondary);
  font-family: 'Courier New', monospace;
  border-left: 3px solid var(--violet-500);
  transition: var(--transition);
  animation: slideDown 0.3s ease-out;
}

.item-historial:hover {
  transform: translateX(4px);
  background: var(--violet-100);
}

.item-numero {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 600;
  min-width: 32px;
}

.item-operacion {
  flex: 1;
  word-break: break-all;
}

.btn-usar {
  padding: 4px 8px;
  background: var(--violet-500);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-usar:hover {
  background: var(--violet-700);
  transform: scale(1.1);
}

.btn-usar .icon {
  width: 16px;
  height: 16px;
}

/* ===== HISTORIAL VACÍO ===== */
.historial-vacio {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  text-align: center;
  gap: 8px;
}

.historial-vacio .icon-empty {
  width: 64px;
  height: 64px;
  stroke: var(--violet-300);
  margin-bottom: 8px;
}

.historial-vacio p {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-secondary);
}

.historial-vacio span {
  font-size: 14px;
}

/* ===== FOOTER DEL HISTORIAL ===== */
.historial-footer {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  flex-shrink: 0;
}

.historial-footer p {
  font-size: 13px;
  color: var(--text-muted);
}

/* ===== ANIMACIONES ===== */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 520px) {
  .flip-container {
    padding: 0 10px;
    min-height: 500px;
  }
  
  .flip-card,
  .flip-front,
  .flip-back {
    min-height: 500px;
  }
  
  .calculadora,
  .historial-panel {
    padding: 20px;
    border-radius: var(--radius-lg);
  }
  
  .header h1 {
    font-size: 18px;
  }
  
  .header h1 .icon {
    width: 20px;
    height: 20px;
  }
  
  .resultado {
    font-size: 28px;
  }
  
  .botones {
    gap: 8px;
  }
  
  .botones button {
    padding: 14px 8px;
    font-size: 17px;
  }
  
  .btn-igual {
    font-size: 22px;
  }
  
  .historial-header h2 {
    font-size: 18px;
  }
  
  .historial-actions {
    flex-wrap: wrap;
  }
  
  .btn-volver,
  .btn-limpiar-historial {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .item-historial {
    font-size: 12px;
    padding: 10px 12px;
  }
}

@media (max-width: 400px) {
  .calculadora,
  .historial-panel {
    padding: 16px;
  }
  
  .resultado {
    font-size: 24px;
  }
  
  .botones button {
    padding: 12px 6px;
    font-size: 15px;
  }
  
  .btn-igual {
    font-size: 20px;
  }
  
  .item-historial {
    font-size: 11px;
    padding: 8px 10px;
    flex-wrap: wrap;
  }
}
</style>