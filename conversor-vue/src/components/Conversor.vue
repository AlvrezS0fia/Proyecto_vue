<template>
  <div class="conversor">
    <!-- ===== HEADER ===== -->
    <header class="header">
      <h1>
        <svg class="icon icon-lg" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 8 L16 8 L16 16 L8 16 Z"/>
          <path d="M12 8 L12 16"/>
          <path d="M8 12 L16 12"/>
        </svg>
        <span class="text-gradient">Conversor de Monedas</span>
      </h1>
      <div class="header-actions">
        <button class="btn-tema" @click="$emit('alternar-tema')" title="Cambiar tema">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- ===== INDICADOR DE CARGA ===== -->
    <div v-if="cargando" class="cargando">
      <div class="spinner"></div>
      <p>Actualizando tasas de cambio...</p>
    </div>

    <!-- ===== CANTIDAD ===== -->
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

    <!-- ===== SELECTORES DE MONEDAS ===== -->
    <div class="selectores">
      <div class="selector">
        <label>De</label>
        <select v-model="monedaOrigen" class="select-moneda">
          <option v-for="moneda in monedas" :key="moneda.codigo" :value="moneda.codigo">
            {{ moneda.emoji }} {{ moneda.nombre }} ({{ moneda.codigo }})
          </option>
        </select>
      </div>

      <button class="btn-intercambiar" @click="intercambiar" title="Intercambiar monedas">
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

    <!-- ===== TASA DE CAMBIO ===== -->
    <div class="tasa-actualizada" v-if="cantidad > 0">
      <span>1 {{ monedaOrigen }} = </span>
      <strong>{{ tasaFormateada }} {{ monedaDestino }}</strong>
      <span class="fecha-tasa">· Actualizado: {{ fechaActualizacion }}</span>
    </div>

    <!-- ===== RESULTADO ===== -->
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

    <!-- ===== MENSAJE VACÍO ===== -->
    <div class="mensaje-vacio" v-else>
      <svg class="icon icon-xl" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
      <p>Ingresa una cantidad para convertir</p>
    </div>

    <!-- ===== CONVERSIONES POPULARES ===== -->
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

    <!-- ===== HISTORIAL ===== -->
    <div class="historial" v-if="historial.length > 0">
      <div class="historial-header">
        <h4>
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 8v4l3 3"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
          Historial de conversiones
        </h4>
        <button class="btn-limpiar-historial" @click="limpiarHistorial">
          <svg class="icon" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Limpiar
        </button>
      </div>
      <div class="lista-historial">
        <div 
          v-for="(item, index) in historial" 
          :key="index"
          class="item-historial slide-up"
          :style="{ animationDelay: (index * 0.03) + 's' }"
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
    </div>

    <!-- ===== FOOTER ===== -->
    <footer class="footer">
      <p>
        <svg class="icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        {{ new Date().getFullYear() }} Conversor de Monedas · Tasas indicativas
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Conversor',
  
  emits: ['alternar-tema'],
  
  data() {
    return {
      // ===== DATOS DE CONVERSIÓN =====
      cantidad: 1,
      monedaOrigen: 'USD',
      monedaDestino: 'EUR',
      
      // ===== LISTA DE MONEDAS =====
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
      
      // ===== TASAS DE CAMBIO =====
      // Valores actualizados al 2026 (simulados)
      tasas: {
        USD: 1,
        EUR: 0.93,
        GBP: 0.79,
        JPY: 149.50,
        MXN: 17.45,
        COP: 3900,
        ARS: 850,
        BRL: 5.10,
        CLP: 940,
        PEN: 3.75,
        CAD: 1.36,
        AUD: 1.54,
        CHF: 0.89,
        CNY: 7.25,
        INR: 83.50
      },
      
      // ===== HISTORIAL =====
      historial: [],
      
      // ===== ESTADO =====
      cargando: false,
      fechaActualizacion: new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  
  computed: {
    // Calcula la tasa de cambio
    tasa() {
      const tasaOrigen = this.tasas[this.monedaOrigen]
      const tasaDestino = this.tasas[this.monedaDestino]
      return tasaDestino / tasaOrigen
    },
    
    // Calcula el resultado
    resultado() {
      return this.cantidad * this.tasa
    },
    
    // Formatea el resultado
    resultadoFormateado() {
      return this.resultado.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    
    // Formatea la cantidad
    cantidadFormateada() {
      return this.cantidad.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    
    // Formatea la tasa
    tasaFormateada() {
      return this.tasa.toFixed(4)
    },
    
    // Conversiones populares
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
    // Guarda en historial cuando cambia el resultado
    resultado(nuevoValor, viejoValor) {
      if (this.cantidad > 0 && nuevoValor !== viejoValor) {
        const conversion = `${this.cantidad} ${this.monedaOrigen} = ${nuevoValor.toFixed(2)} ${this.monedaDestino}`
        
        if (this.historial.length === 0 || this.historial[0] !== conversion) {
          this.historial.unshift(conversion)
          
          if (this.historial.length > 20) {
            this.historial.pop()
          }
          
          this.guardarHistorial()
        }
      }
    }
  },
  
  mounted() {
    this.cargarHistorial()
  },
  
  methods: {
    // ===== INTERCAMBIO =====
    intercambiar() {
      const temp = this.monedaOrigen
      this.monedaOrigen = this.monedaDestino
      this.monedaDestino = temp
    },
    
    // ===== HISTORIAL =====
    agregarAlHistorial(operacion) {
      if (this.historial.length > 0 && this.historial[0] === operacion) {
        return
      }
      this.historial.unshift(operacion)
      if (this.historial.length > 20) {
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
      localStorage.setItem('historialConversor', JSON.stringify(this.historial))
    },
    
    cargarHistorial() {
      const guardado = localStorage.getItem('historialConversor')
      if (guardado) {
        try {
          this.historial = JSON.parse(guardado)
        } catch (e) {
          this.historial = []
        }
      }
    },
    
    usarConversion(item) {
      // Extrae el resultado: "1 USD = 0.93 EUR" → "0.93"
      const partes = item.split(' = ')
      if (partes.length === 2) {
        const valor = partes[1].split(' ')[0]
        const cantidad = parseFloat(valor.replace(/,/g, ''))
        if (!isNaN(cantidad)) {
          this.cantidad = cantidad
        }
      }
    }
  }
}
</script>

<style scoped>
/* ===== CONTENEDOR ===== */
.conversor {
  max-width: 520px;
  margin: 20px auto;
  padding: 30px;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(124, 58, 237, 0.06);
  transition: var(--transition-slow);
}

/* ===== HEADER ===== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.header h1 {
  display: flex;
  align-items: center;
  gap: 12px;
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
}

.btn-tema:hover {
  background: var(--violet-200);
  transform: rotate(20deg);
}

/* ===== CARGANDO ===== */
.cargando {
  text-align: center;
  padding: 20px;
  color: var(--text-muted);
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 12px;
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
  margin-bottom: 24px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 14px;
}

.input-cantidad {
  width: 100%;
  padding: 16px 18px;
  font-size: 20px;
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
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
}

.input-cantidad::placeholder {
  color: var(--text-muted);
  font-weight: 400;
}

/* ===== SELECTORES ===== */
.selectores {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  margin-bottom: 16px;
}

.selector {
  flex: 1;
}

.selector label {
  display: block;
  margin-bottom: 6px;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 13px;
}

.select-moneda {
  width: 100%;
  padding: 12px 14px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b7aaa' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
}

.select-moneda:focus {
  outline: none;
  border-color: var(--violet-600);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

/* ===== BOTÓN INTERCAMBIAR ===== */
.btn-intercambiar {
  padding: 12px 14px;
  background: var(--violet-600);
  color: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  flex-shrink: 0;
  margin-bottom: 1px;
}

.btn-intercambiar:hover {
  background: var(--violet-700);
  transform: scale(1.05) rotate(180deg);
}

.btn-intercambiar .icon {
  width: 22px;
  height: 22px;
}

/* ===== TASA ACTUALIZADA ===== */
.tasa-actualizada {
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
}

.tasa-actualizada strong {
  color: var(--text-primary);
  font-weight: 700;
}

.fecha-tasa {
  font-size: 12px;
  opacity: 0.7;
  margin-left: 6px;
}

/* ===== RESULTADO ===== */
.resultado {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(91, 33, 182, 0.08));
  border-radius: var(--radius-lg);
  padding: 24px 28px;
  margin-bottom: 24px;
  border: 1px solid rgba(124, 58, 237, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: var(--transition);
}

.resultado:hover {
  box-shadow: var(--shadow-sm);
}

.resultado-cantidad {
  font-size: 16px;
  color: var(--text-muted);
  font-weight: 500;
}

.resultado-icono {
  color: var(--violet-400);
}

.resultado-icono .icon {
  width: 28px;
  height: 28px;
}

.resultado-destino {
  text-align: right;
}

.resultado-valor {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-primary);
  display: block;
  background: linear-gradient(135deg, var(--violet-600), var(--violet-800));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.resultado-moneda {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 500;
}

/* ===== MENSAJE VACÍO ===== */
.mensaje-vacio {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);
}

.mensaje-vacio .icon {
  color: var(--violet-300);
  margin-bottom: 12px;
  width: 48px;
  height: 48px;
}

.mensaje-vacio p {
  font-size: 16px;
}

/* ===== CONVERSIONES POPULARES ===== */
.populares {
  margin-bottom: 24px;
}

.populares h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.populares h4 .icon {
  color: var(--violet-500);
}

.conversiones-populares {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btn-popular {
  padding: 8px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
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
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.25);
}

/* ===== HISTORIAL ===== */
.historial {
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
}

.historial-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.historial-header h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
}

.historial-header h4 .icon {
  color: var(--violet-500);
}

.btn-limpiar-historial {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
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

.lista-historial {
  max-height: 180px;
  overflow-y: auto;
  padding-right: 4px;
}

.item-historial {
  display: flex;
  align-items: center;
  gap: 12px;
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

/* ===== FOOTER ===== */
.footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  text-align: center;
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

/* ===== RESPONSIVE ===== */
@media (max-width: 520px) {
  .conversor {
    padding: 20px;
    margin: 12px;
    border-radius: var(--radius-lg);
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
    gap: 12px;
  }
  
  .btn-intercambiar {
    align-self: center;
    transform: rotate(90deg);
    margin: 4px 0;
  }
  
  .btn-intercambiar:hover {
    transform: rotate(90deg) scale(1.05);
  }
  
  .resultado {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }
  
  .resultado-destino {
    text-align: center;
  }
  
  .resultado-valor {
    font-size: 24px;
  }
  
  .input-cantidad {
    font-size: 18px;
    padding: 14px 16px;
  }
}

@media (max-width: 400px) {
  .conversor {
    padding: 16px;
    margin: 8px;
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
  }
}
</style>