<template>
  <div class="tasks-card">
    <div class="tasks-header">
      <h4>
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
          <polyline points="9 11 12 14 22 4"/>
        </svg>
        Tareas
      </h4>
      <div class="tasks-actions">
        <span class="tasks-count">{{ tasksPendientes }} pendientes</span>
        <button class="btn-add-task" @click="$emit('abrir-formulario')">
          <svg class="icon" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="tasks-list">
      <div v-for="(task, index) in tasks" :key="index" class="task-item fade-in">
        <div class="task-check" @click="$emit('toggle-task', index)">
          <svg v-if="task.completada" class="icon" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div class="task-info">
          <span class="task-title" :class="{ completada: task.completada }">
            {{ task.titulo }}
          </span>
          <span class="task-categoria">{{ task.categoria }}</span>
          <span v-if="task.fecha" class="task-fecha">📅 {{ formatearFecha(task.fecha) }}</span>
        </div>
        <div class="task-badges">
          <span class="task-prioridad" :class="task.prioridad">
            {{ task.prioridad }}
          </span>
          <button class="btn-edit" @click="$emit('editar-tarea', index)">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="btn-delete" @click="$emit('eliminar-tarea', index)">
            <svg class="icon" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div v-if="tasks.length === 0" class="tasks-empty">
        <p>🎉 No hay tareas</p>
        <span>¡Todo completado!</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  props: {
    tasks: { type: Array, required: true }
  },
  computed: {
    tasksPendientes() {
      return this.tasks.filter(t => !t.completada).length
    }
  },
  emits: ['toggle-task', 'editar-tarea', 'eliminar-tarea', 'abrir-formulario'],
  methods: {
    formatearFecha(fecha) {
      if (!fecha) return ''
      const d = new Date(fecha)
      return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
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
  margin-bottom: 16px;
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

.tasks-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tasks-count {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

.btn-add-task {
  padding: 4px 8px;
  border: none;
  border-radius: 8px;
  background: var(--violet-500);
  color: white;
  cursor: pointer;
  transition: var(--transition);
}

.btn-add-task:hover {
  background: var(--violet-600);
  transform: scale(1.05);
}

.btn-add-task .icon {
  width: 18px;
  height: 18px;
  stroke: white;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
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
  margin-right: 6px;
}

.task-fecha {
  font-size: 11px;
  color: var(--text-muted);
}

.task-badges {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.task-prioridad {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 10px;
}

.task-prioridad.alta { background: var(--danger-bg); color: var(--danger); }
.task-prioridad.urgente { background: var(--violet-200); color: var(--violet-700); }
.task-prioridad.media { background: var(--warning-bg); color: var(--warning); }
.task-prioridad.baja { background: var(--success-bg); color: var(--success); }

.btn-edit, .btn-delete {
  padding: 4px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: var(--transition);
}

.btn-edit:hover {
  background: var(--info-bg);
  transform: scale(1.1);
}

.btn-edit .icon {
  width: 16px;
  height: 16px;
  color: var(--info);
}

.btn-delete:hover {
  background: var(--danger-bg);
  transform: scale(1.1);
}

.btn-delete .icon {
  width: 16px;
  height: 16px;
  color: var(--danger);
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
  
  .task-badges {
    margin-left: auto;
  }
}
</style>