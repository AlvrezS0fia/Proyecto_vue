<template>
  <div class="flip-container" :class="{ flipped: mostrarHistorial }">
    <div class="flip-card">
      
      <!-- ========================================== -->
      <!-- ===== CARA FRONTAL: CONVERSOR ===== -->
      <!-- ========================================== -->
      <div class="flip-front">
        <div class="conversor">
          
          <!-- Header -->
          <header class="header">
            <h1>
              <svg class="icon icon-lg" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 8 L16 8 L16 16 L8 16 Z"/>
                <path d="M12 8 L12 16"/>
                <path d="M8 12 L16 12"/>
              </svg>
              <span class="text-gradient">Conversor</span>
            </h1>
            <div class="header-actions">
              <button class="btn-historial" @click="toggleHistorial" title="Ver historial">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                <span class="badge-historial" v-if="historial.length > 0">{{ historial.length }}</span>
              </button>
              <button class="btn-tema" @click="$emit('alternar-tema')" title="Cambiar tema">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              </button>
            </div>
          </header>

          <!-- Cargando -->
          <div v-if="cargando" class="cargando">
            <div class="spinner"></div>
            <p>Actualizando tasas...</p>
          </div>

          <!-- Cantidad -->
          <div class="input-group">
            <label for="cantidad">Cantidad</label>
            <input 
              id="cantidad"
              type="number" 
              v-model.number="cantidad" 
              min="0"
              step="0.01"
              class="input-cantidad"
              placeholder="Ingresa una cantidad"
            />
          </div>

          <!-- Selectores -->
          <div class="selectores">
            <div class="selector">
              <label>De</label>
              <select v-model="monedaOrigen" class="select-moneda">
                <option v-for="moneda in monedas" :key="moneda.codigo" :value="moneda.codigo">
                  {{ moneda.emoji }} {{ moneda.nombre }} ({{ moneda.codigo }})
                </option>
              </select>
            </div>

            <button class="btn-intercambiar" @click="intercambiar" title="Intercambiar">
              <svg class="icon" viewBox="0 0 24 24">
                <polyline points="17 1 21 5 17 9"/>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                <polyline points="7 23 3 19 7 15"/>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
              </svg>
            </button>

            <div class="selector">
              <label>A</label>
              <select v-model="monedaDestino" class="select-moneda">
                <option v-for="moneda in monedas" :key="moneda.codigo" :value="moneda.codigo">
                  {{ moneda.emoji }} {{ moneda.nombre }} ({{ moneda.codigo }})
                </option>
              </select>
            </div>
          </div>

          <!-- Tasa -->
          <div class="tasa-actualizada" v-if="cantidad > 0">
            1 {{ monedaOrigen }} = <strong>{{ tasaFormateada }} {{ monedaDestino }}</strong>
          </div>

          <!-- Resultado -->
          <div class="resultado" v-if="cantidad > 0">
            <div class="resultado-cantidad">
              {{ cantidadFormateada }} {{ monedaOrigen }}
            </div>
            <div class="resultado-icono">
              <svg class="icon icon-xl" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
            <div class="resultado-destino">
              <span class="resultado-valor">{{ resultadoFormateado }}</span>
              <span class="resultado-moneda">{{ monedaDestino }}</span>
            </div>
          </div>

          <!-- Mensaje vacío -->
          <div class="mensaje-vacio" v-else>
            <svg class="icon icon-xl" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4l3 3"/>
            </svg>
            <p>Ingresa una cantidad para convertir</p>
          </div>

          <!-- Conversiones populares -->
          <div class="populares">
            <h4>
              <svg class="icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 8 L16 8 L16 16 L8 16 Z"/>
                <path d="M12 8 L12 16"/>
                <path d="M8 12 L16 12"/>
              </svg>
              Conversiones populares
            </h4>
            <div class="conversiones-populares">
              <button 
                v-for="(valor, moneda) in conversionesPopulares" 
                :key="moneda"
                @click="monedaDestino = moneda"
                class="btn-popular"
              >
                {{ moneda }}: {{ valor }}
              </button>
            </div>
          </div>

          <!-- Footer -->
          <footer class="footer">
            <p>
              <svg class="icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {{ new Date().getFullYear() }} · Tasas indicativas
            </p>
          </footer>

        </div>
      </div>

      <!-- ========================================== -->
      <!-- ===== CARA TRASERA: HISTORIAL ===== -->
      <!-- ========================================== -->
      <div class="flip-back">
        <div class="historial-panel">
          
          <!-- Header del historial -->
          <header class="historial-header">
            <h2>
              <svg class="icon icon-lg" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
              Historial
            </h2>
            <div class="historial-actions">
              <button class="btn-volver" @click="toggleHistorial" title="Volver al conversor">
                <svg class="icon" viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Volver
              </button>
              <button class="btn-limpiar-historial" @click="limpiarHistorial" v-if="historial.length > 0">
                <svg class="icon" viewBox="0 0 24 24">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Limpiar
              </button>
            </div>
          </header>

          <!-- Contenido del historial -->
          <div class="historial-contenido" v-if="historial.length > 0">
            <div 
              v-for="(item, index) in historial" 
              :key="index"
              class="item-historial slide-up"
              :style="{ animationDelay: (index * 0.04) + 's' }"
            >
              <span class="item-numero">#{{ historial.length - index }}</span>
              <span class="item-contenido">{{ item }}</span>
              <button class="btn-usar" @click="usarConversion(item)" title="Usar esta conversión">
                <svg class="icon" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Historial vacío -->
          <div class="historial-vacio" v-else>
            <svg class="icon icon-xl" viewBox="0 0 24 24">
              <path d="M12 8v4l3 3"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
            <p>No hay conversiones guardadas</p>
            <span>Realiza conversiones y aparecerán aquí</span>
          </div>

          <!-- Footer del historial -->
          <div class="historial-footer" v-if="historial.length > 0">
            <p>Total: {{ historial.length }} conversiones</p>
          </div>

        </div>
      </div>

    </div>

    <!-- ===== MODAL DE CONFIRMACIÓN PROFESIONAL ===== -->
    <ModalConfirmacion
      :visible="mostrarModal"
      titulo="¿Eliminar todo el historial?"
      mensaje="Esta acción eliminará todas las conversiones guardadas. Esta operación no se puede deshacer."
      textoConfirmar="Eliminar todo"
      textoCancelar="Cancelar"
      @confirmar="confirmarEliminarHistorial"
      @cancelar="cancelarEliminarHistorial"
    />

  </div>
</template>

<script>
import ModalConfirmacion from './ModalConfirmacion.vue'

export default {
  name: 'ConversorFlip',
  
  components: {
    ModalConfirmacion
  },
  
  emits: ['alternar-tema'],
  
  data() {
    return {
      // ===== CONVERSIÓN =====
      cantidad: 1,
      monedaOrigen: 'USD',
      monedaDestino: 'EUR',
      
      // ===== MONEDAS =====
      monedas: [
        { codigo: 'USD', nombre: 'Dólar', emoji: '🇺🇸' },
        { codigo: 'EUR', nombre: 'Euro', emoji: '🇪🇺' },
        { codigo: 'GBP', nombre: 'Libra', emoji: '🇬🇧' },
        { codigo: 'JPY', nombre: 'Yen', emoji: '🇯🇵' },
        { codigo: 'MXN', nombre: 'Peso Mexicano', emoji: '🇲🇽' },
        { codigo: 'COP', nombre: 'Peso Colombiano', emoji: '🇨🇴' },
        { codigo: 'ARS', nombre: 'Peso Argentino', emoji: '🇦🇷' },
        { codigo: 'BRL', nombre: 'Real', emoji: '🇧🇷' },
        { codigo: 'CLP', nombre: 'Peso Chileno', emoji: '🇨🇱' },
        { codigo: 'PEN', nombre: 'Sol', emoji: '🇵🇪' },
        { codigo: 'CAD', nombre: 'Dólar Canadiense', emoji: '🇨🇦' },
        { codigo: 'AUD', nombre: 'Dólar Australiano', emoji: '🇦🇺' },
        { codigo: 'CHF', nombre: 'Franco Suizo', emoji: '🇨🇭' },
        { codigo: 'CNY', nombre: 'Yuan', emoji: '🇨🇳' },
        { codigo: 'INR', nombre: 'Rupia', emoji: '🇮🇳' }
      ],
      
      // ===== TASAS =====
      tasas: {
        USD: 1, EUR: 0.93, GBP: 0.79, JPY: 149.50,
        MXN: 17.45, COP: 3900, ARS: 850, BRL: 5.10,
        CLP: 940, PEN: 3.75, CAD: 1.36, AUD: 1.54,
        CHF: 0.89, CNY: 7.25, INR: 83.50
      },
      
      // ===== HISTORIAL =====
      historial: [],
      
      // ===== ESTADO =====
      mostrarHistorial: false,
      cargando: false,
      mostrarModal: false
    }
  },
  
  computed: {
    tasa() {
      return this.tasas[this.monedaDestino] / this.tasas[this.monedaOrigen]
    },
    resultado() {
      return this.cantidad * this.tasa
    },
    resultadoFormateado() {
      return this.resultado.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    cantidadFormateada() {
      return this.cantidad.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    tasaFormateada() {
      return this.tasa.toFixed(4)
    },
    conversionesPopulares() {
      const populares = ['EUR', 'GBP', 'MXN', 'COP', 'BRL', 'CAD', 'JPY']
      const resultado = {}
      for (const moneda of populares) {
        if (moneda !== this.monedaOrigen) {
          const valor = this.tasas[moneda] / this.tasas[this.monedaOrigen]
          resultado[moneda] = valor.toFixed(2)
        }
      }
      return resultado
    }
  },
  
  watch: {
    resultado(nuevoValor, viejoValor) {
      if (this.cantidad > 0 && nuevoValor !== viejoValor) {
        const conversion = `${this.cantidad} ${this.monedaOrigen} = ${nuevoValor.toFixed(2)} ${this.monedaDestino}`
        if (this.historial.length === 0 || this.historial[0] !== conversion) {
          this.historial.unshift(conversion)
          if (this.historial.length > 25) this.historial.pop()
          this.guardarHistorial()
        }
      }
    }
  },
  
  mounted() {
    this.cargarHistorial()
  },
  
  methods: {
    // ===== FLIP =====
    toggleHistorial() {
      this.mostrarHistorial = !this.mostrarHistorial
    },
    
    // ===== INTERCAMBIO =====
    intercambiar() {
      const temp = this.monedaOrigen
      this.monedaOrigen = this.monedaDestino
      this.monedaDestino = temp
    },
    
    // ===== HISTORIAL =====
    guardarHistorial() {
      localStorage.setItem('historialConversor3D', JSON.stringify(this.historial))
    },
    
    cargarHistorial() {
      const guardado = localStorage.getItem('historialConversor3D')
      if (guardado) {
        try { this.historial = JSON.parse(guardado) } 
        catch { this.historial = [] }
      }
    },
    
    limpiarHistorial() {
      if (this.historial.length === 0) return
      // EN VEZ DE confirm(), MOSTRAMOS EL MODAL
      this.mostrarModal = true
    },
    
    confirmarEliminarHistorial() {
      this.historial = []
      this.guardarHistorial()
      this.mostrarModal = false
    },
    
    cancelarEliminarHistorial() {
      this.mostrarModal = false
    },
    
    usarConversion(item) {
      const partes = item.split(' = ')
      if (partes.length === 2) {
        const valor = partes[1].split(' ')[0]
        const cantidad = parseFloat(valor.replace(/,/g, ''))
        if (!isNaN(cantidad)) {
          this.cantidad = cantidad
          this.toggleHistorial()
        }
      }
    }
  }
}
</script>

<style scoped>
/* ========================================== */
/* ===== CONTENEDOR FLIP 3D ===== */
/* ========================================== */

.flip-container {
  perspective: 1200px;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  min-height: 580px;
}

.flip-card {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 580px;
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
  min-height: 580px;
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

/* ========================================== */
/* ===== CARA FRONTAL: CONVERSOR ===== */
/* ========================================== */

.flip-front .conversor,
.flip-back .historial-panel {
  background: var(--bg-card);
  padding: 30px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(124, 58, 237, 0.06);
  height: 100%;
  min-height: 580px;
  display: flex;
  flex-direction: column;
  transition: var(--transition-slow);
}

/* ===== HEADER ===== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
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

.header h1 .icon {
  color: var(--violet-600);
}

.header-actions {
  display: flex;
  gap: 8px;
}

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

.badge-historial {
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

/* ===== CARGANDO ===== */
.cargando {
  text-align: center;
  padding: 20px;
  color: var(--text-muted);
}

.spinner {
  width: 36px;
  height: 36px;
  margin: 0 auto 10px;
  border: 3px solid var(--violet-200);
  border-top-color: var(--violet-600);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===== INPUT ===== */
.input-group {
  margin-bottom: 20px;
  flex-shrink: 0;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 13px;
}

.input-cantidad {
  width: 100%;
  padding: 14px 16px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
}

.input-cantidad:focus {
  outline: none;
  border-color: var(--violet-600);
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.08);
}

/* ===== SELECTORES ===== */
.selectores {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  margin-bottom: 14px;
  flex-shrink: 0;
}

.selector {
  flex: 1;
}

.selector label {
  display: block;
  margin-bottom: 5px;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 12px;
}

.select-moneda {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b7aaa' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.select-moneda:focus {
  outline: none;
  border-color: var(--violet-600);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

/* ===== BOTÓN INTERCAMBIAR ===== */
.btn-intercambiar {
  padding: 10px 12px;
  background: var(--violet-600);
  color: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 44px;
  flex-shrink: 0;
  margin-bottom: 1px;
}

.btn-intercambiar:hover {
  background: var(--violet-700);
  transform: scale(1.05) rotate(180deg);
}

.btn-intercambiar .icon {
  width: 20px;
  height: 20px;
}

/* ===== TASA ===== */
.tasa-actualizada {
  text-align: center;
  padding: 8px;
  font-size: 13px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 16px;
  flex-shrink: 0;
}

.tasa-actualizada strong {
  color: var(--text-primary);
  font-weight: 700;
}

/* ===== RESULTADO ===== */
.resultado {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.06), rgba(91, 33, 182, 0.06));
  border-radius: var(--radius-lg);
  padding: 18px 22px;
  margin-bottom: 20px;
  border: 1px solid rgba(124, 58, 237, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: var(--transition);
  flex-shrink: 0;
}

.resultado:hover {
  box-shadow: var(--shadow-sm);
}

.resultado-cantidad {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 500;
}

.resultado-icono {
  color: var(--violet-400);
}

.resultado-icono .icon {
  width: 24px;
  height: 24px;
}

.resultado-destino {
  text-align: right;
}

.resultado-valor {
  font-size: 24px;
  font-weight: 800;
  display: block;
  background: linear-gradient(135deg, var(--violet-600), var(--violet-800));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.resultado-moneda {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

/* ===== MENSAJE VACÍO ===== */
.mensaje-vacio {
  text-align: center;
  padding: 30px 20px;
  color: var(--text-muted);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mensaje-vacio .icon {
  color: var(--violet-300);
  margin-bottom: 10px;
  width: 40px;
  height: 40px;
}

.mensaje-vacio p {
  font-size: 15px;
}

/* ===== CONVERSIONES POPULARES ===== */
.populares {
  margin-bottom: 16px;
  flex-shrink: 0;
}

.populares h4 {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}

.populares h4 .icon {
  color: var(--violet-500);
}

.conversiones-populares {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.btn-popular {
  padding: 6px 14px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: var(--transition);
  color: var(--text-secondary);
  font-family: 'Inter', sans-serif;
}

.btn-popular:hover {
  background: var(--violet-600);
  color: white;
  border-color: var(--violet-600);
  transform: scale(1.04);
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.2);
}

/* ===== FOOTER ===== */
.footer {
  margin-top: auto;
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
  gap: 6px;
}

.footer .icon {
  width: 14px;
  height: 14px;
}

/* ========================================== */
/* ===== CARA TRASERA: HISTORIAL ===== */
/* ========================================== */

.historial-panel {
  background: var(--bg-card);
  padding: 30px;
  border-radius: var(--radius-xl);
  border: 1px solid rgba(124, 58, 237, 0.06);
  height: 100%;
  min-height: 580px;
  display: flex;
  flex-direction: column;
}

/* ===== HEADER HISTORIAL ===== */
.historial-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 8px;
}

.historial-header h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.historial-header h2 .icon {
  color: var(--violet-600);
}

.historial-actions {
  display: flex;
  gap: 8px;
}

.btn-volver {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: var(--violet-600);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
}

.btn-volver:hover {
  background: var(--violet-700);
  transform: scale(1.04);
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
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
}

.btn-limpiar-historial:hover {
  background: #dc2626;
  transform: scale(1.04);
}

.btn-limpiar-historial .icon {
  width: 16px;
  height: 16px;
}

/* ===== CONTENIDO HISTORIAL ===== */
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
  gap: 10px;
  padding: 10px 14px;
  margin-bottom: 6px;
  background: var(--bg-input);
  border-radius: var(--radius);
  font-size: 13px;
  color: var(--text-secondary);
  font-family: 'Inter', monospace;
  border-left: 3px solid var(--violet-500);
  transition: var(--transition);
}

.item-historial:hover {
  transform: translateX(4px);
  background: var(--violet-100);
}

.item-numero {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 600;
  min-width: 28px;
}

.item-contenido {
  flex: 1;
  font-weight: 500;
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
  gap: 6px;
}

.historial-vacio .icon {
  color: var(--violet-300);
  width: 48px;
  height: 48px;
}

.historial-vacio p {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-secondary);
}

.historial-vacio span {
  font-size: 13px;
}

/* ===== FOOTER HISTORIAL ===== */
.historial-footer {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  flex-shrink: 0;
}

.historial-footer p {
  font-size: 12px;
  color: var(--text-muted);
}

/* ========================================== */
/* ===== RESPONSIVE ===== */
/* ========================================== */

@media (max-width: 520px) {
  .flip-container {
    min-height: 500px;
  }
  
  .flip-card,
  .flip-front,
  .flip-back {
    min-height: 500px;
  }
  
  .flip-front .conversor,
  .flip-back .historial-panel {
    padding: 20px;
    border-radius: var(--radius-lg);
    min-height: 500px;
  }
  
  .header h1 {
    font-size: 18px;
  }
  
  .header h1 .icon {
    width: 22px;
    height: 22px;
  }
  
  .selectores {
    flex-direction: column;
    gap: 10px;
  }
  
  .btn-intercambiar {
    align-self: center;
    transform: rotate(90deg);
    margin: 2px 0;
  }
  
  .btn-intercambiar:hover {
    transform: rotate(90deg) scale(1.05);
  }
  
  .resultado {
    flex-direction: column;
    text-align: center;
    padding: 16px 18px;
  }
  
  .resultado-destino {
    text-align: center;
  }
  
  .resultado-valor {
    font-size: 22px;
  }
  
  .input-cantidad {
    font-size: 16px;
    padding: 12px 14px;
  }
  
  .historial-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .historial-actions {
    justify-content: stretch;
  }
  
  .btn-volver,
  .btn-limpiar-historial {
    flex: 1;
    justify-content: center;
  }
}

@media (max-width: 400px) {
  .flip-front .conversor,
  .flip-back .historial-panel {
    padding: 16px;
  }
  
  .header h1 {
    font-size: 16px;
  }
  
  .resultado-valor {
    font-size: 20px;
  }
  
  .item-historial {
    font-size: 12px;
    padding: 8px 10px;
    flex-wrap: wrap;
  }
}
</style>