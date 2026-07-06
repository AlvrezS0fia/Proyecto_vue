<template>
  <div class="stats-grid">
    <div v-for="stat in stats" :key="stat.label" class="stat-card fade-in">
      <div class="stat-icon" :style="{ background: stat.color }">
        <svg class="icon" viewBox="0 0 24 24">
          <path v-if="stat.icon === 'tasks'" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
          <polyline v-if="stat.icon === 'tasks'" points="9 11 12 14 22 4"/>
          <path v-if="stat.icon === 'check'" d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline v-if="stat.icon === 'check'" points="22 4 12 14.01 9 11.01"/>
          <path v-if="stat.icon === 'trending'" d="M23 6l-5.5 5.5-4-4L3 18"/>
          <polyline v-if="stat.icon === 'trending'" points="17 6 23 6 23 12"/>
          <path v-if="stat.icon === 'clock'" d="M12 2v4"/>
          <path v-if="stat.icon === 'clock'" d="M12 18v4"/>
          <path v-if="stat.icon === 'clock'" d="M4.93 4.93l2.83 2.83"/>
          <path v-if="stat.icon === 'clock'" d="M16.24 16.24l2.83 2.83"/>
          <path v-if="stat.icon === 'clock'" d="M2 12h4"/>
          <path v-if="stat.icon === 'clock'" d="M18 12h4"/>
          <path v-if="stat.icon === 'clock'" d="M4.93 19.07l2.83-2.83"/>
          <path v-if="stat.icon === 'clock'" d="M16.24 7.76l2.83-2.83"/>
          <path v-if="stat.icon === 'target'" d="M12 2v4"/>
          <path v-if="stat.icon === 'target'" d="M12 18v4"/>
          <path v-if="stat.icon === 'target'" d="M4.93 4.93l2.83 2.83"/>
          <path v-if="stat.icon === 'target'" d="M16.24 16.24l2.83 2.83"/>
          <path v-if="stat.icon === 'target'" d="M2 12h4"/>
          <path v-if="stat.icon === 'target'" d="M18 12h4"/>
          <path v-if="stat.icon === 'target'" d="M4.93 19.07l2.83-2.83"/>
          <path v-if="stat.icon === 'target'" d="M16.24 7.76l2.83-2.83"/>
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-label">{{ stat.label }}</span>
        <span class="stat-value">{{ stat.value }}</span>
        <span v-if="stat.sub" class="stat-sub">{{ stat.sub }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsCards',
  props: { stats: { type: Array, required: true } }
}
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon .icon {
  width: 20px;
  height: 20px;
  stroke: white;
}

.stat-info { flex: 1; min-width: 0; }
.stat-label { display: block; font-size: 10px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
.stat-value { display: block; font-size: 20px; font-weight: 800; color: var(--text-primary); line-height: 1.2; }
.stat-sub { display: block; font-size: 10px; color: var(--text-muted); margin-top: 2px; }

@media (max-width: 480px) {
  .stats-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
  .stat-card { padding: 10px 12px; }
  .stat-icon { width: 34px; height: 34px; }
  .stat-value { font-size: 16px; }
}
</style>