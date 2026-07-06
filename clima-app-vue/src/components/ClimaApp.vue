<template>
  <div class="clima-container">
    
    <!-- ===== HEADER ===== -->
    <header class="header">
      <h1>
        <svg class="icon icon-lg" viewBox="0 0 24 24">
          <path d="M12 2v4"/>
          <path d="M12 18v4"/>
          <path d="M4.93 4.93l2.83 2.83"/>
          <path d="M16.24 16.24l2.83 2.83"/>
          <path d="M2 12h4"/>
          <path d="M18 12h4"/>
          <path d="M4.93 19.07l2.83-2.83"/>
          <path d="M16.24 7.76l2.83-2.83"/>
        </svg>
        <span class="text-gradient">App del Clima</span>
      </h1>
      <div class="header-actions">
        <button class="btn-tema" @click="$emit('alternar-tema')" title="Cambiar tema">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- ===== BUSCADOR ===== -->
    <div class="buscador">
      <input 
        v-model="ciudad" 
        @keyup.enter="buscarClima"
        placeholder="Busca una ciudad..."
        class="input-buscar"
      />
      <button class="btn-buscar" @click="buscarClima" :disabled="cargando">
        <svg v-if="!cargando" class="icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span v-else class="spinner"></span>
        {{ cargando ? 'Buscando...' : 'Buscar' }}
      </button>
    </div>

    <!-- ===== CARGA ===== -->
    <div v-if="cargando" class="cargando">
      <div class="spinner-grande"></div>
      <p>Obteniendo datos del clima...</p>
    </div>

    <!-- ===== ERROR ===== -->
    <div v-else-if="error" class="error">
      <svg class="icon icon-xl" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <h3>Error</h3>
      <p>{{ error }}</p>
      <button class="btn-intentar" @click="buscarClima">Intentar de nuevo</button>
    </div>

    <!-- ===== CLIMA ===== -->
    <div v-else-if="clima" class="clima-card fade-in">
      
      <!-- Ciudad y fecha -->
      <div class="clima-header">
        <div>
          <h2>{{ clima.name }}, {{ clima.sys.country }}</h2>
          <p class="fecha">{{ fechaActual }}</p>
        </div>
        <div class="icono-clima">
          <img 
            :src="`https://openweathermap.org/img/wn/${clima.weather[0].icon}@4x.png`" 
            :alt="clima.weather[0].description"
            class="clima-icono"
          />
        </div>
      </div>

      <!-- Temperatura -->
      <div class="temperatura">
        <span class="temp-valor">{{ Math.round(clima.main.temp) }}°C</span>
        <span class="temp-descripcion">{{ clima.weather[0].description }}</span>
      </div>

      <!-- Detalles -->
      <div class="detalles">
        <div class="detalle-item">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 2v4"/>
            <path d="M12 18v4"/>
            <path d="M4.93 4.93l2.83 2.83"/>
            <path d="M16.24 16.24l2.83 2.83"/>
            <path d="M2 12h4"/>
            <path d="M18 12h4"/>
            <path d="M4.93 19.07l2.83-2.83"/>
            <path d="M16.24 7.76l2.83-2.83"/>
          </svg>
          <span class="detalle-label">Sensación</span>
          <span class="detalle-valor">{{ Math.round(clima.main.feels_like) }}°C</span>
        </div>
        
        <div class="detalle-item">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 2v4"/>
            <path d="M12 18v4"/>
            <path d="M4.93 4.93l2.83 2.83"/>
            <path d="M16.24 16.24l2.83 2.83"/>
            <path d="M2 12h4"/>
            <path d="M18 12h4"/>
            <path d="M4.93 19.07l2.83-2.83"/>
            <path d="M16.24 7.76l2.83-2.83"/>
          </svg>
          <span class="detalle-label">Humedad</span>
          <span class="detalle-valor">{{ clima.main.humidity }}%</span>
        </div>
        
        <div class="detalle-item">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 2v4"/>
            <path d="M12 18v4"/>
            <path d="M4.93 4.93l2.83 2.83"/>
            <path d="M16.24 16.24l2.83 2.83"/>
            <path d="M2 12h4"/>
            <path d="M18 12h4"/>
            <path d="M4.93 19.07l2.83-2.83"/>
            <path d="M16.24 7.76l2.83-2.83"/>
          </svg>
          <span class="detalle-label">Viento</span>
          <span class="detalle-valor">{{ Math.round(clima.wind.speed * 3.6) }} km/h</span>
        </div>
        
        <div class="detalle-item">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 2v4"/>
            <path d="M12 18v4"/>
            <path d="M4.93 4.93l2.83 2.83"/>
            <path d="M16.24 16.24l2.83 2.83"/>
            <path d="M2 12h4"/>
            <path d="M18 12h4"/>
            <path d="M4.93 19.07l2.83-2.83"/>
            <path d="M16.24 7.76l2.83-2.83"/>
          </svg>
          <span class="detalle-label">Presión</span>
          <span class="detalle-valor">{{ clima.main.pressure }} hPa</span>
        </div>
      </div>

      <!-- ===== HISTORIAL ===== -->
      <div v-if="historial.length > 0" class="historial">
        <h4>
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 8v4l3 3"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
          Búsquedas recientes
        </h4>
        <div class="historial-lista">
          <button 
            v-for="(item, index) in historial.slice(0, 5)" 
            :key="index"
            class="btn-historial"
            @click="buscarCiudad(item)"
          >
            {{ item }}
          </button>
          <button class="btn-limpiar" @click="limpiarHistorial" v-if="historial.length > 0">
            <svg class="icon" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>

    </div>

    <!-- ===== MENSAJE INICIAL ===== -->
    <div v-else class="mensaje-inicial">
      <svg class="icon icon-xl" viewBox="0 0 24 24">
        <path d="M12 2v4"/>
        <path d="M12 18v4"/>
        <path d="M4.93 4.93l2.83 2.83"/>
        <path d="M16.24 16.24l2.83 2.83"/>
        <path d="M2 12h4"/>
        <path d="M18 12h4"/>
        <path d="M4.93 19.07l2.83-2.83"/>
        <path d="M16.24 7.76l2.83-2.83"/>
      </svg>
      <h3>Busca el clima de cualquier ciudad</h3>
      <p>Ingresa el nombre de una ciudad y presiona buscar</p>
    </div>

    <!-- ===== FOOTER ===== -->
    <footer class="footer">
      <p>
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M12 2v4"/>
          <path d="M12 18v4"/>
          <path d="M4.93 4.93l2.83 2.83"/>
          <path d="M16.24 16.24l2.83 2.83"/>
          <path d="M2 12h4"/>
          <path d="M18 12h4"/>
          <path d="M4.93 19.07l2.83-2.83"/>
          <path d="M16.24 7.76l2.83-2.83"/>
        </svg>
        {{ new Date().getFullYear() }} App del Clima · Datos de OpenWeatherMap
      </p>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'ClimaApp',
  
  emits: ['alternar-tema'],
  
  data() {
    return {
      ciudad: 'Madrid',
      clima: null,
      cargando: false,
      error: null,
      historial: []
    }
  },
  
  computed: {
    fechaActual() {
      return new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  
  mounted() {
    this.cargarHistorial()
    if (this.historial.length > 0) {
      this.ciudad = this.historial[0]
      this.buscarClima()
    } else {
      this.buscarClima()
    }
  },
  
  methods: {
    async buscarClima() {
      const ciudad = this.ciudad.trim()
      if (!ciudad) return
      
      this.cargando = true
      this.error = null
      
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY
        
        if (!apiKey) {
          throw new Error('API Key no configurada. Revisa tu archivo .env')
        }
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${apiKey}&units=metric&lang=es`
        )
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Ciudad no encontrada. Verifica el nombre.')
          } else if (response.status === 401) {
            throw new Error('API Key inválida. Verifica tu clave.')
          } else {
            throw new Error('Error al obtener los datos del clima.')
          }
        }
        
        const data = await response.json()
        this.clima = data
        this.agregarHistorial(ciudad)
        
      } catch (error) {
        this.error = error.message
        this.clima = null
      } finally {
        this.cargando = false
      }
    },
    
    buscarCiudad(ciudad) {
      this.ciudad = ciudad
      this.buscarClima()
    },
    
    agregarHistorial(ciudad) {
      this.historial = this.historial.filter(c => c.toLowerCase() !== ciudad.toLowerCase())
      this.historial.unshift(ciudad)
      if (this.historial.length > 10) {
        this.historial.pop()
      }
      this.guardarHistorial()
    },
    
    limpiarHistorial() {
      this.historial = []
      this.guardarHistorial()
    },
    
    guardarHistorial() {
      localStorage.setItem('historialClima', JSON.stringify(this.historial))
    },
    
    cargarHistorial() {
      const guardado = localStorage.getItem('historialClima')
      if (guardado) {
        try {
          this.historial = JSON.parse(guardado)
        } catch {
          this.historial = []
        }
      }
    }
  }
}
</script>

<style scoped>
/* ========================================== */
/* ===== CONTENEDOR ===== */
/* ========================================== */

.clima-container {
  max-width: 580px;
  margin: 20px auto;
  padding: 30px;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: var(--transition);
  min-height: 400px;
}

/* ========================================== */
/* ===== HEADER ===== */
/* ========================================== */

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h1 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 800;
  color: var(--text-primary);
}

.header h1 .icon {
  color: var(--blue-500);
}

.text-gradient {
  background: linear-gradient(135deg, var(--blue-500), var(--blue-700));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn-tema {
  padding: 8px;
  border: none;
  background: var(--blue-100);
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
  background: var(--blue-200);
  transform: rotate(20deg);
}

/* ========================================== */
/* ===== BUSCADOR ===== */
/* ========================================== */

.buscador {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

.input-buscar {
  flex: 1;
  padding: 14px 18px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  transition: var(--transition);
}

.input-buscar:focus {
  outline: none;
  border-color: var(--blue-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
}

.input-buscar::placeholder {
  color: var(--text-muted);
}

.btn-buscar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: linear-gradient(135deg, var(--blue-500), var(--blue-700));
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
}

.btn-buscar:hover:not(:disabled) {
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.btn-buscar:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-buscar .icon {
  width: 18px;
  height: 18px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* ========================================== */
/* ===== CARGA ===== */
/* ========================================== */

.cargando {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

.spinner-grande {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  border: 3px solid var(--blue-200);
  border-top-color: var(--blue-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.cargando p {
  font-size: 16px;
}

/* ========================================== */
/* ===== ERROR ===== */
/* ========================================== */

.error {
  text-align: center;
  padding: 40px 20px;
}

.error .icon {
  color: var(--blue-400);
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
}

.error h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.error p {
  color: var(--text-muted);
  margin-bottom: 16px;
}

.btn-intentar {
  padding: 10px 24px;
  background: var(--blue-500);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
}

.btn-intentar:hover {
  background: var(--blue-600);
  transform: scale(1.02);
}

/* ========================================== */
/* ===== CLIMA CARD ===== */
/* ========================================== */

.clima-card {
  animation: fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.clima-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.clima-header h2 {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.fecha {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 4px;
}

.icono-clima {
  flex-shrink: 0;
}

.clima-icono {
  width: 72px;
  height: 72px;
}

.temperatura {
  text-align: center;
  padding: 16px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 16px;
}

.temp-valor {
  font-size: 56px;
  font-weight: 800;
  color: var(--text-primary);
  display: block;
  line-height: 1.1;
}

.temp-descripcion {
  font-size: 18px;
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: capitalize;
}

/* ========================================== */
/* ===== DETALLES ===== */
/* ========================================== */

.detalles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.detalle-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 12px;
  background: var(--blue-50);
  border-radius: var(--radius);
  text-align: center;
  transition: var(--transition);
}

.detalle-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.detalle-item .icon {
  color: var(--blue-400);
  width: 20px;
  height: 20px;
  margin-bottom: 4px;
}

.detalle-label {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detalle-valor {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
}

/* ========================================== */
/* ===== HISTORIAL ===== */
/* ========================================== */

.historial {
  border-top: 1px solid var(--border-color);
  padding-top: 16px;
}

.historial h4 {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.historial h4 .icon {
  width: 18px;
  height: 18px;
}

.historial-lista {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.btn-historial {
  padding: 6px 14px;
  background: var(--blue-100);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
}

.btn-historial:hover {
  background: var(--blue-500);
  color: white;
  border-color: var(--blue-500);
  transform: scale(1.04);
}

.btn-limpiar {
  padding: 6px 10px;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-limpiar:hover {
  background: var(--blue-100);
  color: var(--blue-500);
}

.btn-limpiar .icon {
  width: 16px;
  height: 16px;
}

/* ========================================== */
/* ===== MENSAJE INICIAL ===== */
/* ========================================== */

.mensaje-inicial {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

.mensaje-inicial .icon {
  color: var(--blue-300);
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
}

.mensaje-inicial h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.mensaje-inicial p {
  font-size: 15px;
}

/* ========================================== */
/* ===== FOOTER ===== */
/* ========================================== */

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
  color: var(--blue-400);
}

/* ========================================== */
/* ===== RESPONSIVE ===== */
/* ========================================== */

@media (max-width: 520px) {
  .clima-container {
    padding: 20px;
    margin: 12px;
    border-radius: var(--radius-lg);
  }
  
  .header h1 {
    font-size: 20px;
  }
  
  .buscador {
    flex-direction: column;
  }
  
  .btn-buscar {
    justify-content: center;
  }
  
  .temp-valor {
    font-size: 44px;
  }
  
  .detalles {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  
  .detalle-item {
    padding: 10px 8px;
  }
}

@media (max-width: 400px) {
  .clima-container {
    padding: 16px;
  }
  
  .temp-valor {
    font-size: 36px;
  }
  
  .clima-icono {
    width: 56px;
    height: 56px;
  }
  
  .detalles {
    grid-template-columns: 1fr;
  }
}
</style>