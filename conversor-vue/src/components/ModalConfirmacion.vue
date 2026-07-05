<template>
  <div v-if="visible" class="modal-overlay" @click.self="cerrar">
    <div class="modal-container slide-up">
      <div class="modal-icono">
        <svg class="icono-alerta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
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
        <button class="btn-confirmar" @click="confirmar">
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
    visible: {
      type: Boolean,
      default: false
    },
    titulo: {
      type: String,
      default: '¿Estás seguro?'
    },
    mensaje: {
      type: String,
      default: 'Esta acción no se puede deshacer'
    },
    textoConfirmar: {
      type: String,
      default: 'Confirmar'
    },
    textoCancelar: {
      type: String,
      default: 'Cancelar'
    }
  },
  
  emits: ['confirmar', 'cancelar'],
  
  methods: {
    confirmar() {
      this.$emit('confirmar')
    },
    cerrar() {
      this.$emit('cancelar')
    }
  }
}
</script>

<style scoped>
/* ===== OVERLAY ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: overlayIn 0.3s ease-out;
}

@keyframes overlayIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ===== MODAL ===== */
.modal-container {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  padding: 40px 48px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(124, 58, 237, 0.08);
  animation: modalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* ===== ICONO ===== */
.modal-icono {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icono-alerta {
  width: 32px;
  height: 32px;
  stroke: var(--danger);
  stroke-width: 2;
  fill: none;
}

/* ===== TEXTO ===== */
.modal-titulo {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-family: 'Inter', sans-serif;
}

.modal-mensaje {
  font-size: 15px;
  color: var(--text-muted);
  margin-bottom: 28px;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;
}

/* ===== BOTONES ===== */
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
  font-family: 'Inter', sans-serif;
}

.modal-acciones button .icon {
  width: 18px;
  height: 18px;
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
  background: linear-gradient(135deg, var(--danger), #dc2626);
  color: white;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.25);
}

.btn-confirmar:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 24px rgba(239, 68, 68, 0.35);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 480px) {
  .modal-container {
    padding: 30px 24px;
  }
  
  .modal-titulo {
    font-size: 19px;
  }
  
  .modal-mensaje {
    font-size: 14px;
  }
  
  .modal-acciones {
    flex-direction: column;
  }
  
  .modal-acciones button {
    justify-content: center;
    padding: 14px 20px;
  }
}
</style>