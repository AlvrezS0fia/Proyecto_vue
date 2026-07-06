<template>
  <div class="tasks-card">
    <div class="tasks-header">
      <h4>
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
          <polyline points="9 11 12 14 22 4"/>
        </svg>
        Tareas Recientes
      </h4>
      <span class="tasks-count">{{ tasks.length }} pendientes</span>
    </div>
    
    <div class="tasks-list">
      <div v-for="(task, index) in tasks" :key="index" class="task-item fade-in">
        <div class="task-check" @click="toggleTask(index)">
          <svg v-if="task.completada" class="icon" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div class="task-info">
          <span class="task-title" :class="{ completada: task.completada }">
            {{ task.titulo }}
          </span>
          <span class="task-categoria">{{ task.categoria }}</span>
        </div>
        <span class="task-prioridad" :class="task.prioridad">
          {{ task.prioridad }}
        </span>
      </div>
      
      <div v-if="tasks.length === 0" class="tasks-empty">
        <p>No hay tareas pendientes</p>
        <span>¡Buen trabajo!</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentTasks',
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  emits: ['toggle-task'],
  methods: {
    toggleTask(index) {
      this.$emit('toggle-task', index)
    }
  }
}
</script>

<style scoped>
.tasks-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  padding: 18px 20px;
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.tasks-header h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}

.tasks-header h4 .icon {
  color: var(--violet-500);
  width: 20px;
  height: 20px;
}

.tasks-count {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: var(--bg-input);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.task-item:hover {
  transform: translateX(4px);
}

.task-check {
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

.task-check:hover {
  border-color: var(--violet-400);
}

.task-check .icon {
  width: 16px;
  height: 16px;
  stroke: var(--violet-600);
}

.task-info {
  flex: 1;
  min-width: 0;
}

.task-title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.task-title.completada {
  text-decoration: line-through;
  color: var(--text-muted);
}

.task-categoria {
  font-size: 11px;
  color: var(--text-muted);
}

.task-prioridad {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 10px;
  border-radius: 12px;
}

.task-prioridad.alta {
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger);
}

.task-prioridad.media {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning);
}

.task-prioridad.baja {
  background: rgba(34, 197, 94, 0.1);
  color: var(--success);
}

.tasks-empty {
  text-align: center;
  padding: 20px;
  color: var(--text-muted);
}

.tasks-empty p {
  font-size: 14px;
  font-weight: 600;
}

.tasks-empty span {
  font-size: 13px;
}

@media (max-width: 480px) {
  .task-item {
    flex-wrap: wrap;
  }
  
  .task-prioridad {
    margin-left: auto;
  }
}
</style>