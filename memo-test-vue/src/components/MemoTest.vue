<template>
  <div class="app-container">
    
    <!-- ===== HEADER ===== -->
    <header class="header">
      <div class="header-left">
        <h1>
          <svg class="icon icon-lg" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          <span>MemoTest</span>
        </h1>
        <span class="subtitle">Encuentra las parejas</span>
      </div>
      <div class="header-actions">
        <button class="btn-tema" @click="$emit('alternar-tema')" title="Cambiar tema">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- ===== SELECCIÓN DE MODO ===== -->
    <div class="modos">
      <button 
        class="btn-modo" 
        :class="{ activo: modo === '1' }"
        @click="seleccionarModo('1')"
      >
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        1 Jugador
      </button>
      <button 
        class="btn-modo" 
        :class="{ activo: modo === '2' }"
        @click="seleccionarModo('2')"
      >
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        2 Jugadores
      </button>
    </div>

    <!-- ===== ESTADÍSTICAS ===== -->
    <div class="stats">
      <div class="stat-item" :class="{ 'turno-activo': modo === '2' && turno === 1 }">
        <span class="stat-label" v-if="modo === '2'">🔵 Jugador 1</span>
        <span class="stat-label" v-else>Intentos</span>
        <span class="stat-value">
          {{ modo === '2' ? jugador1Puntos : intentos }}
        </span>
      </div>
      
      <div class="stat-item">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span class="stat-label">Pares</span>
        <span class="stat-value">{{ paresEncontrados }}/{{ totalPares }}</span>
      </div>
      
      <div class="stat-item" :class="{ 'turno-activo': modo === '2' && turno === 2 }">
        <span class="stat-label" v-if="modo === '2'">🔴 Jugador 2</span>
        <span class="stat-label" v-else>Tiempo</span>
        <span class="stat-value">
          {{ modo === '2' ? jugador2Puntos : tiempoFormateado }}
        </span>
      </div>
    </div>

    <!-- ===== TURNO ACTUAL (MODO 2 JUGADORES) ===== -->
    <div v-if="modo === '2'" class="turno-indicador" :class="turno === 1 ? 'turno-azul' : 'turno-rojo'">
      <svg class="icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      <span>Turno de <strong>{{ turno === 1 ? 'Jugador 1' : 'Jugador 2' }}</strong></span>
    </div>

    <!-- ===== TABLERO ===== -->
    <div class="tablero">
      <div 
        v-for="(card, index) in cards" 
        :key="card.id"
        class="card"
        :class="{ 
          volteada: card.volteada || card.encontrada,
          encontrada: card.encontrada,
          shake: card.shake
        }"
        @click="voltearCarta(index)"
      >
        <div class="card-inner">
          <div class="card-front">
            <svg class="icon icon-xl" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div class="card-back">
            <span class="card-emoji">{{ card.emoji }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== BOTÓN REINICIAR ===== -->
    <div class="acciones">
      <button class="btn btn-primary" @click="iniciarJuego">
        <svg class="icon" viewBox="0 0 24 24">
          <polyline points="23 4 23 10 17 10"/>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
        Nueva partida
      </button>
    </div>

    <!-- ===== VICTORIA ===== -->
    <div v-if="victoria" class="victoria-modal">
      <div class="victoria-content bounce-in">
        <div class="trofeo float">
          <svg class="icon icon-xl" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </div>
        
        <h2>🎉 ¡Ganaste! 🎉</h2>
        
        <div v-if="modo === '1'">
          <p>Completaste el juego en <strong>{{ intentos }}</strong> intentos</p>
          <p class="tiempo-victoria">⏱️ {{ tiempoFormateado }}</p>
        </div>
        
        <div v-else>
          <div class="resultados-jugadores">
            <div class="resultado-jugador">
              <span class="nombre">🔵 Jugador 1</span>
              <span class="puntos">{{ jugador1Puntos }} puntos</span>
            </div>
            <div class="resultado-jugador">
              <span class="nombre">🔴 Jugador 2</span>
              <span class="puntos">{{ jugador2Puntos }} puntos</span>
            </div>
          </div>
          <p class="ganador">
            <strong>
              {{ jugador1Puntos > jugador2Puntos ? '🏆 Jugador 1' : 
                 jugador2Puntos > jugador1Puntos ? '🏆 Jugador 2' : '🤝 Empate' }}
            </strong>
          </p>
        </div>
        
        <button class="btn btn-primary" @click="iniciarJuego">
          <svg class="icon" viewBox="0 0 24 24">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Jugar de nuevo
        </button>
      </div>
    </div>

    <!-- ===== FOOTER ===== -->
    <footer class="footer">
      <p>
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
        {{ new Date().getFullYear() }} MemoTest · Juego de memoria para niños
      </p>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'MemoTest',
  
  emits: ['alternar-tema'],
  
  data() {
    return {
      // ===== 24 ANIMALES DIFERENTES =====
      animales: [
        { id: 1, emoji: '🐶', nombre: 'Perro' },
        { id: 2, emoji: '🐱', nombre: 'Gato' },
        { id: 3, emoji: '🐭', nombre: 'Ratón' },
        { id: 4, emoji: '🐹', nombre: 'Hámster' },
        { id: 5, emoji: '🐰', nombre: 'Conejo' },
        { id: 6, emoji: '🦊', nombre: 'Zorro' },
        { id: 7, emoji: '🐻', nombre: 'Oso' },
        { id: 8, emoji: '🐼', nombre: 'Panda' },
        { id: 9, emoji: '🐨', nombre: 'Koala' },
        { id: 10, emoji: '🦁', nombre: 'León' },
        { id: 11, emoji: '🐮', nombre: 'Vaca' },
        { id: 12, emoji: '🐷', nombre: 'Cerdo' },
        { id: 13, emoji: '🐸', nombre: 'Rana' },
        { id: 14, emoji: '🐵', nombre: 'Mono' },
        { id: 15, emoji: '🐔', nombre: 'Pollo' },
        { id: 16, emoji: '🐧', nombre: 'Pingüino' },
        { id: 17, emoji: '🐦', nombre: 'Pájaro' },
        { id: 18, emoji: '🐴', nombre: 'Caballo' },
        { id: 19, emoji: '🦄', nombre: 'Unicornio' },
        { id: 20, emoji: '🐙', nombre: 'Pulpo' },
        { id: 21, emoji: '🦋', nombre: 'Mariposa' },
        { id: 22, emoji: '🐞', nombre: 'Mariquita' },
        { id: 23, emoji: '🐢', nombre: 'Tortuga' },
        { id: 24, emoji: '🐳', nombre: 'Ballena' }
      ],
      
      // ===== ESTADO DEL JUEGO =====
      cards: [],
      cartasSeleccionadas: [],
      intentos: 0,
      paresEncontrados: 0,
      bloqueado: false,
      victoria: false,
      
      // ===== MODO =====
      modo: '1', // '1' o '2'
      turno: 1, // 1 o 2
      jugador1Puntos: 0,
      jugador2Puntos: 0,
      
      // ===== TIEMPO =====
      tiempoInicio: null,
      tiempoTranscurrido: 0,
      intervaloTiempo: null,
      
      // ===== NIVEL =====
      cantidadPares: 8, // 8 pares = 16 cartas
      tamanioTablero: 4 // 4x4
    }
  },
  
  computed: {
    totalPares() {
      return this.cards.length / 2
    },
    tiempoFormateado() {
      const segundos = Math.floor(this.tiempoTranscurrido)
      const minutos = Math.floor(segundos / 60)
      const segs = segundos % 60
      return `${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`
    }
  },
  
  mounted() {
    this.iniciarJuego()
  },
  
  beforeDestroy() {
    clearInterval(this.intervaloTiempo)
  },
  
  methods: {
    // ==========================================
    // ===== SELECCIONAR MODO =====
    // ==========================================
    seleccionarModo(modo) {
      this.modo = modo
      this.iniciarJuego()
    },
    
    // ==========================================
    // ===== INICIAR JUEGO =====
    // ==========================================
    iniciarJuego() {
      // Seleccionar animales según cantidad de pares
      const animalesSeleccionados = this.animales.slice(0, this.cantidadPares)
      
      // Crear pares y mezclar
      const pares = [...animalesSeleccionados, ...animalesSeleccionados]
      const mezclados = pares
        .sort(() => Math.random() - 0.5)
        .map((animal, index) => ({
          id: index,
          animalId: animal.id,
          emoji: animal.emoji,
          nombre: animal.nombre,
          volteada: false,
          encontrada: false,
          shake: false
        }))
      
      this.cards = mezclados
      this.cartasSeleccionadas = []
      this.intentos = 0
      this.paresEncontrados = 0
      this.bloqueado = false
      this.victoria = false
      
      // Reiniciar puntajes en modo 2 jugadores
      if (this.modo === '2') {
        this.jugador1Puntos = 0
        this.jugador2Puntos = 0
        this.turno = 1
      }
      
      // Reiniciar tiempo
      clearInterval(this.intervaloTiempo)
      this.tiempoTranscurrido = 0
      this.tiempoInicio = Date.now()
      this.intervaloTiempo = setInterval(() => {
        if (!this.victoria && this.modo === '1') {
          this.tiempoTranscurrido = (Date.now() - this.tiempoInicio) / 1000
        }
      }, 1000)
    },
    
    // ==========================================
    // ===== VOLTEAR CARTA =====
    // ==========================================
    voltearCarta(index) {
      if (this.bloqueado) return
      if (this.victoria) return
      
      const card = this.cards[index]
      
      if (card.volteada || card.encontrada) return
      if (this.cartasSeleccionadas.length === 2) return
      
      card.volteada = true
      this.cartasSeleccionadas.push(index)
      
      if (this.cartasSeleccionadas.length === 2) {
        this.bloqueado = true
        
        // Si es modo 2 jugadores, el intento es del jugador actual
        if (this.modo === '1') {
          this.intentos++
        }
        
        const [i1, i2] = this.cartasSeleccionadas
        const card1 = this.cards[i1]
        const card2 = this.cards[i2]
        
        if (card1.animalId === card2.animalId) {
          // ¡Encontradas!
          card1.encontrada = true
          card2.encontrada = true
          this.paresEncontrados++
          
          // Sumar punto al jugador actual (modo 2)
          if (this.modo === '2') {
            if (this.turno === 1) {
              this.jugador1Puntos++
            } else {
              this.jugador2Puntos++
            }
          }
          
          this.cartasSeleccionadas = []
          this.bloqueado = false
          
          // Verificar victoria
          if (this.paresEncontrados === this.totalPares) {
            this.victoria = true
            clearInterval(this.intervaloTiempo)
          }
        } else {
          // No coinciden
          setTimeout(() => {
            card1.volteada = false
            card2.volteada = false
            this.cartasSeleccionadas = []
            this.bloqueado = false
            
            // Cambiar turno en modo 2 jugadores
            if (this.modo === '2') {
              this.turno = this.turno === 1 ? 2 : 1
            }
          }, 800)
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

.app-container {
  max-width: 700px;
  margin: 20px auto;
  padding: 30px;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: var(--transition);
}

/* ========================================== */
/* ===== HEADER ===== */
/* ========================================== */

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header h1 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 28px;
  font-weight: 900;
  color: var(--text-primary);
}

.header h1 .icon {
  color: var(--yellow-500);
  width: 32px;
  height: 32px;
}

.subtitle {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.btn-tema {
  padding: 8px;
  border: none;
  background: var(--yellow-100);
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
  background: var(--yellow-200);
  transform: rotate(20deg);
}

/* ========================================== */
/* ===== MODOS ===== */
/* ========================================== */

.modos {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  justify-content: center;
}

.btn-modo {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Nunito', sans-serif;
}

.btn-modo:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.btn-modo.activo {
  background: linear-gradient(135deg, var(--yellow-400), var(--yellow-500));
  color: white;
  border-color: var(--yellow-500);
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
}

.btn-modo .icon {
  width: 20px;
  height: 20px;
}

/* ========================================== */
/* ===== ESTADÍSTICAS ===== */
/* ========================================== */

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.stat-item {
  background: var(--yellow-50);
  padding: 12px 16px;
  border-radius: var(--radius);
  text-align: center;
  transition: var(--transition);
  border: 3px solid transparent;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.stat-item .icon {
  color: var(--yellow-500);
  width: 20px;
  height: 20px;
  display: block;
  margin: 0 auto 4px;
}

.stat-label {
  display: block;
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 900;
  color: var(--text-primary);
}

.stat-item.turno-activo {
  border-color: var(--yellow-500);
  background: rgba(245, 158, 11, 0.1);
}

/* ========================================== */
/* ===== TURNO INDICADOR ===== */
/* ========================================== */

.turno-indicador {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: var(--radius);
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 700;
  border: 3px solid;
  transition: var(--transition);
}

.turno-indicador .icon {
  width: 24px;
  height: 24px;
}

.turno-azul {
  border-color: var(--blue-400);
  background: rgba(59, 130, 246, 0.08);
  color: var(--blue-500);
}

.turno-rojo {
  border-color: var(--pink-400);
  background: rgba(236, 72, 153, 0.08);
  color: var(--pink-500);
}

/* ========================================== */
/* ===== TABLERO ===== */
/* ========================================== */

.tablero {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

/* ===== CARD ===== */
.card {
  aspect-ratio: 1;
  perspective: 800px;
  cursor: pointer;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.card.volteada .card-inner,
.card.encontrada .card-inner {
  transform: rotateY(180deg);
}

.card.shake .card-inner {
  animation: shake 0.4s ease-in-out;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  transition: var(--transition);
}

.card-front {
  background: linear-gradient(135deg, var(--yellow-300), var(--yellow-500));
  border: 3px solid var(--yellow-400);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
}

.card-front .icon {
  color: white;
  width: 32px;
  height: 32px;
  opacity: 0.8;
}

.card:hover .card-front {
  transform: scale(1.03);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.35);
}

.card-back {
  background: linear-gradient(135deg, #ffffff, #fef9c3);
  border: 3px solid var(--yellow-300);
  transform: rotateY(180deg);
  font-size: 36px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.card.encontrada .card-back {
  border-color: var(--green-400);
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.25);
}

.card-emoji {
  line-height: 1;
  user-select: none;
}

/* ========================================== */
/* ===== ACCIONES ===== */
/* ========================================== */

.acciones {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Nunito', sans-serif;
}

.btn-primary {
  background: linear-gradient(135deg, var(--yellow-400), var(--yellow-500));
  color: white;
  border-color: var(--yellow-500);
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 24px rgba(245, 158, 11, 0.4);
}

.btn-primary .icon {
  stroke: white;
}

/* ========================================== */
/* ===== VICTORIA ===== */
/* ========================================== */

.victoria-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: overlayIn 0.3s ease-out;
}

@keyframes overlayIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.victoria-content {
  background: var(--bg-card);
  padding: 40px 48px;
  border-radius: var(--radius-xl);
  text-align: center;
  max-width: 440px;
  width: 90%;
  box-shadow: var(--shadow-lg);
  border: 2px solid var(--yellow-300);
}

.trofeo {
  font-size: 64px;
  margin-bottom: 8px;
  display: block;
}

.trofeo .icon {
  width: 64px;
  height: 64px;
  color: var(--yellow-500);
}

.victoria-content h2 {
  font-size: 32px;
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.victoria-content p {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.tiempo-victoria {
  font-weight: 700;
  color: var(--yellow-500);
  font-size: 18px;
  margin: 8px 0 16px;
}

.resultados-jugadores {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
}

.resultado-jugador {
  padding: 12px;
  border-radius: var(--radius);
  background: var(--yellow-50);
}

.resultado-jugador .nombre {
  display: block;
  font-weight: 700;
  font-size: 14px;
}

.resultado-jugador .puntos {
  display: block;
  font-size: 28px;
  font-weight: 900;
  color: var(--text-primary);
}

.ganador {
  font-size: 20px;
  margin: 8px 0 16px;
  color: var(--yellow-500);
}

/* ========================================== */
/* ===== FOOTER ===== */
/* ========================================== */

.footer {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 2px solid var(--yellow-100);
  text-align: center;
}

.footer p {
  font-size: 13px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.footer .icon {
  width: 16px;
  height: 16px;
  color: var(--yellow-400);
}

/* ========================================== */
/* ===== RESPONSIVE ===== */
/* ========================================== */

@media (max-width: 560px) {
  .app-container {
    padding: 16px;
    margin: 12px;
    border-radius: var(--radius-lg);
  }
  
  .header h1 {
    font-size: 20px;
  }
  
  .header h1 .icon {
    width: 24px;
    height: 24px;
  }
  
  .subtitle {
    display: none;
  }
  
  .modos {
    flex-direction: column;
    gap: 8px;
  }
  
  .btn-modo {
    justify-content: center;
  }
  
  .stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
  
  .stat-item {
    padding: 8px 10px;
  }
  
  .stat-value {
    font-size: 18px;
  }
  
  .tablero {
    gap: 6px;
  }
  
  .card-front,
  .card-back {
    font-size: 20px;
    border-radius: 12px;
  }
  
  .card-back {
    font-size: 28px;
  }
  
  .victoria-content {
    padding: 28px 20px;
  }
  
  .victoria-content h2 {
    font-size: 26px;
  }
  
  .resultados-jugadores {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}

@media (max-width: 400px) {
  .app-container {
    padding: 10px;
  }
  
  .tablero {
    gap: 4px;
  }
  
  .card-front,
  .card-back {
    border-radius: 10px;
  }
  
  .card-back {
    font-size: 22px;
  }
  
  .stats {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4px;
  }
  
  .stat-value {
    font-size: 16px;
  }
  
  .btn {
    padding: 10px 16px;
    font-size: 14px;
  }
}
</style>