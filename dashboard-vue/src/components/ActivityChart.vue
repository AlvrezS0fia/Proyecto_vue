<template>
  <div class="chart-card">
    <div class="chart-header">
      <h4>
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M21 12v-2a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v2"/>
          <circle cx="12" cy="16" r="5"/>
          <path d="M12 11v5"/>
          <path d="M9 13h6"/>
        </svg>
        Actividad Semanal
      </h4>
      <span class="chart-sub">Tareas completadas</span>
    </div>
    <div class="chart-body">
      <div 
        v-for="(item, index) in data" 
        :key="item.dia"
        class="bar-wrapper"
        :style="{ animationDelay: (index * 0.05) + 's' }"
      >
        <div class="bar" :style="{ height: porcentaje(item.valor) + '%' }">
          <span class="bar-value">{{ item.valor }}</span>
        </div>
        <span class="bar-label">{{ item.dia }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityChart',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    porcentaje(valor) {
      const max = Math.max(...this.data.map(d => d.valor), 1)
      return (valor / max) * 80 + 10
    }
  }
}
</script>

<style scoped>
.chart-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  padding: 18px 20px;
  margin-bottom: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.chart-header h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}

.chart-header h4 .icon {
  color: var(--violet-500);
  width: 20px;
  height: 20px;
}

.chart-sub {
  font-size: 12px;
  color: var(--text-muted);
}

.chart-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 120px;
  gap: 6px;
  padding-top: 8px;
}

.bar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  animation: fadeIn 0.4s ease-out;
}

.bar {
  width: 100%;
  max-width: 32px;
  min-height: 12px;
  background: linear-gradient(180deg, var(--violet-500), var(--violet-600));
  border-radius: 6px 6px 0 0;
  transition: height 0.6s ease;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 2px;
}

.bar-value {
  font-size: 10px;
  font-weight: 700;
  color: white;
  opacity: 0.8;
}

.bar-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
}

@media (max-width: 480px) {
  .chart-body {
    height: 90px;
  }
  
  .bar-value {
    font-size: 8px;
  }
  
  .bar-label {
    font-size: 8px;
  }
}
</style>