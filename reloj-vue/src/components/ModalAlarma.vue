<template>
  <div class="alarma-sonando" v-if="mostrar">
    <div class="alarma-modal alarma-pulse">
      <!-- Icono animado -->
      <svg class="icon icon-xl icon-pulse" viewBox="0 0 24 24" stroke="#ef4444">
        <circle cx="12" cy="13" r="8"/>
        <polyline points="12 9 12 13 14 15"/>
        <line x1="4" y1="4" x2="8" y2="8"/>
        <line x1="20" y1="4" x2="16" y2="8"/>
      </svg>
      
      <h2>Alarma</h2>
      <p>Son las {{ horaAlarma }}</p>
      
      <div class="botones-alarma">
        <button class="btn-detener" @click="$emit('detener')">
          <svg class="icon" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Detener
        </button>
        <button class="btn-repetir" @click="$emit('repetir')">
          <svg class="icon" viewBox="0 0 24 24">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Repetir en 5 min
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalAlarma',
  props: {
    mostrar: {
      type: Boolean,
      default: false
    },
    horaAlarma: {
      type: String,
      default: '08:00'
    }
  },
  emits: ['detener', 'repetir']
}
</script>

<style scoped>
.alarma-sonando {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: alarmaFadeIn 0.4s ease-out;
}

@keyframes alarmaFadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.alarma-modal {
  padding: 50px 60px;
  border-radius: 30px;
  text-align: center;
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: var(--shadow-dark);
  animation: modalAnim 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  max-width: 500px;
  width: 90%;
}

@keyframes modalAnim {
  0% { transform: scale(0.8) translateY(20px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}

@keyframes alarmaPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.02); opacity: 0.8; }
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.alarma-modal .icon-xl {
  width: 64px;
  height: 64px;
  margin-bottom: 12px;
  stroke: #ef4444;
}

.alarma-modal h2 {
  font-size: 40px;
  font-weight: 800;
  background: linear-gradient(135deg, #f87171, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.alarma-modal p {
  font-size: 20px;
  margin-bottom: 25px;
}

.botones-alarma {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-detener {
  padding: 16px 32px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 140px;
  justify-content: center;
}

.btn-detener:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 30px rgba(239, 68, 68, 0.3);
}

.btn-repetir {
  padding: 16px 32px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 140px;
  justify-content: center;
}

.btn-repetir:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 30px rgba(245, 158, 11, 0.3);
}

@media (max-width: 560px) {
  .alarma-modal {
    padding: 35px 25px;
  }
  .alarma-modal h2 {
    font-size: 30px;
  }
  .alarma-modal .icon-xl {
    width: 48px;
    height: 48px;
  }
  .botones-alarma {
    flex-direction: column;
  }
  .btn-detener,
  .btn-repetir {
    padding: 14px 24px;
    font-size: 16px;
    min-width: 100%;
  }
}
</style>