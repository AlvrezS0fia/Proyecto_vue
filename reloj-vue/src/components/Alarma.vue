<template>
  <div class="alarma">
    <h4>
      <svg class="icon" viewBox="0 0 24 24">
        <circle cx="12" cy="13" r="8"/>
        <polyline points="12 9 12 13 14 15"/>
        <line x1="4" y1="4" x2="8" y2="8"/>
        <line x1="20" y1="4" x2="16" y2="8"/>
      </svg>
      Alarma
    </h4>
    <div class="alarma-input">
      <input type="time" class="input-alarma" :value="horaAlarma" @input="$emit('actualizar-hora', $event.target.value)" />
      <button class="btn-alarma" :class="alarmaActivada ? 'activada' : 'desactivada'" @click="$emit('toggle-alarma')">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        {{ alarmaActivada ? 'Desactivar' : 'Activar' }}
      </button>
    </div>
    <p class="alarma-info" v-if="alarmaActivada">
      <svg class="icon" viewBox="0 0 24 24">
        <circle cx="12" cy="13" r="8"/>
        <polyline points="12 9 12 13 14 15"/>
      </svg>
      Alarma programada para las {{ horaAlarma }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Alarma',
  props: {
    horaAlarma: {
      type: String,
      default: '08:00'
    },
    alarmaActivada: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-alarma', 'actualizar-hora']
}
</script>

<style scoped>
.alarma {
  border-top: 1px solid rgba(139, 92, 246, 0.1);
  padding-top: 20px;
  margin-bottom: 20px;
}

.alarma h4 {
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.alarma-input {
  display: flex;
  gap: 10px;
}

.input-alarma {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: var(--radius);
  font-size: 15px;
  transition: var(--transition);
  outline: none;
}

.input-alarma:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
}

.btn-alarma {
  padding: 12px 28px;
  border: none;
  border-radius: var(--radius);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-alarma:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.btn-alarma.activada {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.btn-alarma.desactivada {
  background: linear-gradient(135deg, #22c55e, #16a34a);
}

.alarma-info {
  margin-top: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

@media (max-width: 560px) {
  .alarma-input {
    flex-direction: column;
  }
}
</style>