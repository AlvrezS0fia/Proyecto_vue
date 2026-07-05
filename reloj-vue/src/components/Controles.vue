<template>
  <div class="controles">
    <button class="btn-control" :class="{ activo: formato24h }" @click="$emit('alternar-formato')">
      <svg class="icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      {{ formato24h ? '24h' : '12h' }}
    </button>

    <button class="btn-control" :class="{ activo: mostrarSegundos }" @click="$emit('alternar-segundos')">
      <svg class="icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {{ mostrarSegundos ? 'Con segundos' : 'Sin segundos' }}
    </button>

    <button class="btn-control color-btn" @click="$emit('cambiar-color')">
      <svg class="icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2v4"/>
        <path d="M12 18v4"/>
        <path d="M4.93 4.93l2.83 2.83"/>
        <path d="M16.24 16.24l2.83 2.83"/>
        <path d="M2 12h4"/>
        <path d="M18 12h4"/>
        <path d="M4.93 19.07l2.83-2.83"/>
        <path d="M16.24 7.76l2.83-2.83"/>
      </svg>
      Color
    </button>
  </div>
</template>

<script>
export default {
  name: 'Controles',
  props: {
    formato24h: {
      type: Boolean,
      default: true
    },
    mostrarSegundos: {
      type: Boolean,
      default: true
    }
  },
  emits: ['alternar-formato', 'alternar-segundos', 'cambiar-color']
}
</script>

<style scoped>
.controles {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.btn-control {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: var(--transition);
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-control:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.15);
}

.btn-control.activo {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: #fff !important;
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
}

.btn-control.color-btn {
  background: linear-gradient(135deg, #a78bfa, #7c3aed);
  color: #fff !important;
  border: none;
}

.btn-control.color-btn:hover {
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.35);
}

@media (max-width: 560px) {
  .controles {
    flex-direction: column;
    gap: 8px;
  }
  .btn-control {
    padding: 11px;
    font-size: 12px;
  }
}
</style>