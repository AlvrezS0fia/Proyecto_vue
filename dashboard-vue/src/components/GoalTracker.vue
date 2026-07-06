<template>
  <div class="goals-card">
    <div class="goals-header">
      <h4>
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
        Metas
      </h4>
      <span class="goals-count">{{ metasCompletadas }}/{{ metas.length }}</span>
    </div>
    
    <div class="goals-list">
      <div v-for="(meta, index) in metas" :key="index" class="goal-item fade-in">
        <div class="goal-info">
          <span class="goal-title">{{ meta.nombre }}</span>
          <div class="goal-progress">
            <div class="goal-bar" :style="{ width: meta.progreso + '%' }"></div>
          </div>
          <span class="goal-percent">{{ meta.progreso }}%</span>
        </div>
      </div>
      
      <div v-if="metas.length === 0" class="goals-empty">
        <p>Establece tus metas</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoalTracker',
  props: { metas: { type: Array, required: true } },
  computed: {
    metasCompletadas() {
      return this.metas.filter(m => m.progreso === 100).length
    }
  }
}
</script>

<style scoped>
.goals-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  padding: 18px 20px;
}

.goals-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.goals-header h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}

.goals-header h4 .icon {
  color: var(--violet-500);
  width: 20px;
  height: 20px;
}

.goals-count {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

.goals-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.goal-item {
  padding: 10px 12px;
  background: var(--bg-input);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
}

.goal-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.goal-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  min-width: 60px;
}

.goal-progress {
  flex: 1;
  height: 6px;
  background: var(--border-color);
  border-radius: 10px;
  overflow: hidden;
}

.goal-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--violet-500), var(--violet-600));
  border-radius: 10px;
  transition: width 0.6s ease;
}

.goal-percent {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  min-width: 36px;
  text-align: right;
}

.goals-empty {
  text-align: center;
  padding: 16px;
  color: var(--text-muted);
}
</style>