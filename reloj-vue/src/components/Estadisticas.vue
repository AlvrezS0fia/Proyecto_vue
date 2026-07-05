<template>
  <div class="estadisticas">
    <h4>
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M21 12v-2a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v2"/>
        <circle cx="12" cy="16" r="5"/>
        <path d="M12 11v5"/>
        <path d="M9 13h6"/>
      </svg>
      Estadisticas
    </h4>
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-label">Hora actual</span>
        <span class="stat-valor">{{ hora }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Dia de la semana</span>
        <span class="stat-valor">{{ diaSemana }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Semana del año</span>
        <span class="stat-valor">{{ semanaAnio }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Tiempo encendido</span>
        <span class="stat-valor">{{ tiempoEncendido }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Estadisticas',
  props: {
    hora: {
      type: String,
      required: true
    },
    diaSemana: {
      type: String,
      required: true
    },
    semanaAnio: {
      type: [Number, String],
      required: true
    },
    tiempoEncendido: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.estadisticas {
  border-top: 1px solid rgba(139, 92, 246, 0.1);
  padding-top: 20px;
}

.estadisticas h4 {
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.stat-item {
  padding: 14px 12px;
  border-radius: var(--radius);
  text-align: center;
  transition: var(--transition);
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.08);
}

.stat-label {
  display: block;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.stat-valor {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

@media (max-width: 560px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .stat-item {
    padding: 10px 8px;
  }
  .stat-valor {
    font-size: 14px;
  }
}

@media (max-width: 400px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>