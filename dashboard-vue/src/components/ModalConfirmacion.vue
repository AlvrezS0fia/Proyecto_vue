<template>
  <div v-if="visible" class="modal-overlay" @click.self="cerrar">
    <div class="modal-container pop">
      <div class="modal-icono" :class="tipo">
        <svg class="icono-alerta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line v-if="tipo === 'danger'" x1="12" y1="8" x2="12" y2="12"/>
          <line v-if="tipo === 'danger'" x1="12" y1="16" x2="12.01" y2="16"/>
          <path v-if="tipo === 'success'" d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline v-if="tipo === 'success'" points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      
      <h3 class="modal-titulo">{{ titulo }}</h3>
      <p class="modal-mensaje">{{ mensaje }}</p>
      
      <div class="modal-acciones">
        <button class="btn-cancelar" @click="cerrar">
          <svg class="icon" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          {{ textoCancelar }}
        </button>
        <button class="btn-confirmar" :class="tipo" @click="confirmar">
          <svg class="icon" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {{ textoConfirmar }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalConfirmacion',
  props: {
    visible: Boolean,
    titulo: String,
    mensaje: String,
    textoConfirmar: String,
    textoCancelar: String,
    tipo: {
      type: String,
      default: 'danger',
      validator: (value) => ['danger', 'success', 'warning'].includes(value)
    }
  },
  emits: ['confirmar', 'cancelar'],
  methods: {
    confirmar() { this.$emit('confirmar') },
    cerrar() { this.$emit('cancelar') }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  padding: 40px 48px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(124, 58, 237, 0.08);
}

.modal-icono {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-icono.danger { background: rgba(239, 68, 68, 0.1); }
.modal-icono.success { background: rgba(34, 197, 94, 0.1); }
.modal-icono.warning { background: rgba(245, 158, 11, 0.1); }

.icono-alerta {
  width: 32px;
  height: 32px;
  stroke-width: 2;
  fill: none;
}

.modal-icono.danger .icono-alerta { stroke: var(--violet-600); }
.modal-icono.success .icono-alerta { stroke: var(--violet-500); }
.modal-icono.warning .icono-alerta { stroke: var(--violet-400); }

.modal-titulo {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.modal-mensaje {
  font-size: 15px;
  color: var(--text-muted);
  margin-bottom: 28px;
  line-height: 1.6;
}

.modal-acciones {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.modal-acciones button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Nunito', sans-serif;
}

.btn-cancelar {
  background: var(--bg-input);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.btn-cancelar:hover {
  background: var(--violet-100);
  transform: scale(1.02);
}

.btn-confirmar {
  color: white;
}

.btn-confirmar.danger {
  background: linear-gradient(135deg, var(--violet-600), var(--violet-800));
}

.btn-confirmar.danger:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 24px rgba(124, 58, 237, 0.35);
}

@media (max-width: 480px) {
  .modal-container { padding: 30px 24px; }
  .modal-acciones { flex-direction: column; }
}
</style>