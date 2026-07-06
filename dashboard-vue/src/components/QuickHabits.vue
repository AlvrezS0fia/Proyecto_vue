<template>
  <div class="habits-card">
    <div class="habits-header">
      <h4>
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        Hábitos Diarios
      </h4>
      <span class="habits-progress">{{ progreso }}% completado</span>
    </div>
    
    <div class="habits-list">
      <div v-for="(habit, index) in habits" :key="index" class="habit-item fade-in">
        <div class="habit-check" @click="toggleHabit(index)">
          <svg v-if="habit.hecho" class="icon" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div class="habit-info">
          <span class="habit-name" :class="{ hecho: habit.hecho }">
            {{ habit.nombre }}
          </span>
          <span class="habit-racha">🔥 {{ habit.racha }} días</span>
        </div>
        <span class="habit-emoji">{{ habit.emoji }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuickHabits',
  props: {
    habits: {
      type: Array,
      required: true
    }
  },
  computed: {
    progreso() {
      const total = this.habits.length
      if (total === 0) return 0
      const hechos = this.habits.filter(h => h.hecho).length
      return Math.round((hechos / total) * 100)
    }
  },
  emits: ['toggle-habit'],
  methods: {
    toggleHabit(index) {
      this.$emit('toggle-habit', index)
    }
  }
}
</script>

<style scoped>
.habits-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  padding: 18px 20px;
}

.habits-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.habits-header h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}

.habits-header h4 .icon {
  color: var(--violet-500);
  width: 20px;
  height: 20px;
}

.habits-progress {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

.habits-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.habit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: var(--bg-input);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.habit-item:hover {
  transform: translateX(4px);
}

.habit-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: var(--transition);
}

.habit-check:hover {
  border-color: var(--violet-400);
}

.habit-check .icon {
  width: 16px;
  height: 16px;
  stroke: var(--violet-600);
}

.habit-info {
  flex: 1;
  min-width: 0;
}

.habit-name {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.habit-name.hecho {
  text-decoration: line-through;
  color: var(--text-muted);
}

.habit-racha {
  font-size: 11px;
  color: var(--text-muted);
}

.habit-emoji {
  font-size: 20px;
}

@media (max-width: 480px) {
  .habit-item {
    flex-wrap: wrap;
  }
  
  .habit-emoji {
    margin-left: auto;
  }
}
</style>