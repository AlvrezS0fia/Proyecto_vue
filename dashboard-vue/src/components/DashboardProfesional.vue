<template>
  <div class="dashboard">
    
    <!-- ========================================== -->
    <!-- HEADER PROFESIONAL -->
    <!-- ========================================== -->
    <header class="dashboard-header">
      <div class="header-left">
        <div class="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M9 3v18"/>
            <path d="M15 3v18"/>
            <path d="M3 9h18"/>
            <path d="M3 15h18"/>
          </svg>
          <span>Dashboard</span>
        </div>
        <div class="header-info">
          <span class="greeting">Buenos días</span>
          <span class="date">{{ fechaActual }}</span>
        </div>
      </div>
      <div class="header-right">
        <button class="btn-tema" @click="$emit('alternar-tema')" title="Cambiar tema">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- ========================================== -->
    <!-- STATS CARDS -->
    <!-- ========================================== -->
    <section class="section">
      <div class="section-header">
        <h2>Métricas clave</h2>
        <span class="section-subtitle">Resumen de tu productividad</span>
      </div>
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-icon" :style="{ background: stat.color }">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
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
              <path v-if="stat.icon === 'star'" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
            <span v-if="stat.sub" class="stat-sub">{{ stat.sub }}</span>
          </div>
          <div class="stat-trend" :class="stat.trend">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline v-if="stat.trend === 'up'" points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline v-if="stat.trend === 'down'" points="23 18 13.5 8.5 8.5 13.5 1 6"/>
              <polyline v-if="stat.trend === 'neutral'" points="23 12 13.5 12 8.5 12 1 12"/>
            </svg>
            <span>{{ stat.trendValue }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- GRÁFICO Y ACTIVIDAD RECIENTE -->
    <!-- ========================================== -->
    <div class="grid-two">
      <section class="section">
        <div class="section-header">
          <h2>Actividad semanal</h2>
          <span class="section-subtitle">Tareas completadas</span>
        </div>
        <div class="chart-container">
          <div 
            v-for="(item, index) in actividadSemanal" 
            :key="item.dia"
            class="chart-bar"
            :style="{ animationDelay: (index * 0.05) + 's' }"
          >
            <div class="bar" :style="{ height: calcularAltura(item.valor) + '%' }">
              <span class="bar-value">{{ item.valor }}</span>
            </div>
            <span class="bar-label">{{ item.dia }}</span>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>Resumen rápido</h2>
          <span class="section-subtitle">Hoy</span>
        </div>
        <div class="quick-stats">
          <div class="quick-stat">
            <span class="quick-label">Tareas pendientes</span>
            <span class="quick-value">{{ tareasPendientes.length }}</span>
          </div>
          <div class="quick-stat">
            <span class="quick-label">Completadas hoy</span>
            <span class="quick-value">{{ tareasCompletadasHoy }}</span>
          </div>
          <div class="quick-stat">
            <span class="quick-label">Productividad</span>
            <span class="quick-value">{{ porcentajeProductividad }}%</span>
          </div>
          <div class="quick-stat">
            <span class="quick-label">Ciclos Pomodoro</span>
            <span class="quick-value">{{ ciclosPomodoro }}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- ========================================== -->
    <!-- TAREAS Y HÁBITOS -->
    <!-- ========================================== -->
    <div class="grid-two">
      
      <!-- TAREAS -->
      <section class="section">
        <div class="section-header">
          <h2>Tareas</h2>
          <span class="section-subtitle">{{ tareasPendientes.length }} pendientes</span>
        </div>
        
        <div class="task-form">
          <input 
            v-model="nuevaTarea.titulo" 
            placeholder="Escribe una tarea..."
            class="input-task"
            @keyup.enter="agregarTarea"
          />
          <select v-model="nuevaTarea.prioridad" class="select-priority">
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          <button class="btn-add" @click="agregarTarea">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>

        <div class="task-list">
          <div v-for="(task, index) in tareas" :key="index" class="task-item">
            <button class="task-check" @click="toggleTask(index)">
              <svg v-if="task.completada" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </button>
            <div class="task-content">
              <span class="task-title" :class="{ completed: task.completada }">
                {{ task.titulo }}
              </span>
              <span class="task-category">{{ task.categoria }}</span>
            </div>
            <span class="task-priority" :class="task.prioridad">
              {{ task.prioridad }}
            </span>
            <button class="btn-delete" @click="eliminarTarea(index)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div v-if="tareas.length === 0" class="empty-state">
            <p>No hay tareas</p>
            <span>Agrega una nueva tarea</span>
          </div>
        </div>
      </section>

      <!-- HÁBITOS -->
      <section class="section">
        <div class="section-header">
          <h2>Hábitos</h2>
          <span class="section-subtitle">{{ progresoHabits }}% completado</span>
        </div>
        
        <div class="habit-progress">
          <div class="habit-progress-bar">
            <div class="habit-progress-fill" :style="{ width: progresoHabits + '%' }"></div>
          </div>
        </div>

        <div class="habit-form">
          <input 
            v-model="nuevoHabit.nombre" 
            placeholder="Nuevo hábito..."
            class="input-habit"
            @keyup.enter="agregarHabit"
          />
          <button class="btn-add" @click="agregarHabit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>

        <div class="habit-list">
          <div v-for="(habit, index) in habits" :key="index" class="habit-item">
            <button class="habit-check" @click="toggleHabit(index)">
              <svg v-if="habit.hecho" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </button>
            <span class="habit-name" :class="{ done: habit.hecho }">
              {{ habit.nombre }}
            </span>
            <span class="habit-streak">{{ habit.racha }} días</span>
            <span class="habit-icon">{{ habit.emoji }}</span>
            <button class="btn-delete" @click="eliminarHabit(index)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div v-if="habits.length === 0" class="empty-state">
            <p>No hay hábitos</p>
            <span>Agrega un nuevo hábito</span>
          </div>
        </div>
      </section>
    </div>

    <!-- ========================================== -->
    <!-- METAS Y NOTAS -->
    <!-- ========================================== -->
    <div class="grid-two">
      
      <!-- METAS -->
      <section class="section">
        <div class="section-header">
          <h2>Metas</h2>
          <span class="section-subtitle">{{ metasCompletadas }}/{{ metas.length }} completadas</span>
        </div>
        
        <div class="goal-form">
          <input 
            v-model="nuevaMeta.titulo" 
            placeholder="Nueva meta..."
            class="input-goal"
            @keyup.enter="agregarMeta"
          />
          <div class="goal-progress-input">
            <input 
              v-model.number="nuevaMeta.progreso" 
              type="number"
              placeholder="%"
              class="input-progress"
              min="0"
              max="100"
            />
          </div>
          <button class="btn-add" @click="agregarMeta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>

        <div class="goal-list">
          <div v-for="(goal, index) in metas" :key="index" class="goal-item">
            <div class="goal-content">
              <span class="goal-title">{{ goal.titulo }}</span>
              <div class="goal-bar">
                <div class="goal-fill" :style="{ width: goal.progreso + '%' }"></div>
              </div>
              <span class="goal-percent">{{ goal.progreso }}%</span>
            </div>
            <button class="btn-delete" @click="eliminarMeta(index)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div v-if="metas.length === 0" class="empty-state">
            <p>No hay metas</p>
            <span>Agrega una nueva meta</span>
          </div>
        </div>
      </section>

      <!-- NOTAS -->
      <section class="section">
        <div class="section-header">
          <h2>Notas</h2>
          <span class="section-subtitle">{{ notas.length }} notas</span>
        </div>
        
        <div class="note-form">
          <input 
            v-model="nuevaNota" 
            placeholder="Escribe una nota..."
            class="input-note"
            @keyup.enter="agregarNota"
          />
          <button class="btn-add" @click="agregarNota">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>

        <div class="note-list">
          <div v-for="(nota, index) in notas" :key="index" class="note-item">
            <span class="note-text">{{ nota }}</span>
            <button class="btn-delete" @click="eliminarNota(index)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div v-if="notas.length === 0" class="empty-state">
            <p>No hay notas</p>
            <span>Agrega una nota</span>
          </div>
        </div>
      </section>
    </div>

    <!-- ========================================== -->
    <!-- POMODORO CON ALARMA DE DESCANSO -->
    <!-- ========================================== -->
    <section class="section">
      <div class="section-header">
        <h2>Pomodoro</h2>
        <span class="section-subtitle">Enfoque y descanso</span>
      </div>
      
      <div class="pomodoro">
        
        <!-- ===== CONTROLES DE TIEMPO ===== -->
        <div class="pomodoro-config">
          <div class="config-group">
            <label>Enfoque</label>
            <div class="config-input">
              <button class="config-btn" @click="ajustarTiempo('focus', -1)">−</button>
              <input 
                type="number" 
                v-model.number="tiempoEnfoque" 
                min="1" 
                max="120"
                class="config-number"
                @change="actualizarTiempoBase"
              />
              <button class="config-btn" @click="ajustarTiempo('focus', 1)">+</button>
              <span class="config-unit">min</span>
            </div>
          </div>
          
          <div class="config-group">
            <label>Descanso</label>
            <div class="config-input">
              <button class="config-btn" @click="ajustarTiempo('break', -1)">−</button>
              <input 
                type="number" 
                v-model.number="tiempoDescanso" 
                min="1" 
                max="30"
                class="config-number"
                @change="actualizarTiempoBase"
              />
              <button class="config-btn" @click="ajustarTiempo('break', 1)">+</button>
              <span class="config-unit">min</span>
            </div>
          </div>
          
          <button class="btn-reset-config" @click="reiniciarConfiguracion">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Restablecer
          </button>
        </div>

        <!-- ===== TIMER CON ALARMA VISUAL ===== -->
        <div class="pomodoro-timer" :class="{ alerta: mostrarAlarma }">
          <span class="pomodoro-time">{{ pomodoroTiempo }}</span>
          <span class="pomodoro-status">{{ pomodoroEstado }}</span>
          <span class="pomodoro-mode">{{ pomodoroModo }}</span>
          
          <!-- Indicador de alarma visual -->
          <div v-if="mostrarAlarma" class="alarma-visual">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span class="alarma-texto">¡Tiempo de descanso!</span>
          </div>
        </div>

        <!-- ===== CONTROLES ===== -->
        <div class="pomodoro-controls">
          <button class="btn-pomodoro" @click="iniciarPomodoro" :disabled="pomodoroActivo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Iniciar
          </button>
          <button class="btn-pomodoro" @click="pausarPomodoro" :disabled="!pomodoroActivo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
            Pausar
          </button>
          <button class="btn-pomodoro" @click="reiniciarPomodoro">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Reiniciar
          </button>
        </div>

        <!-- ===== ESTADÍSTICAS ===== -->
        <div class="pomodoro-stats">
          <span>Ciclos: {{ ciclosPomodoro }}</span>
          <span class="stat-divider">·</span>
          <span>Tiempo total: {{ tiempoTotal }}</span>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- MODAL DE ALARMA DE DESCANSO -->
    <!-- ========================================== -->
    <div v-if="mostrarAlarma" class="alarma-modal" @click="cerrarAlarma">
      <div class="alarma-modal-content slide-up">
        <div class="alarma-icono">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2>¡Tiempo de descanso!</h2>
        <p>Has completado {{ ciclosPomodoro }} ciclo(s). Tómate un descanso de {{ tiempoDescanso }} minutos.</p>
        <div class="alarma-botones">
          <button class="btn-alarma" @click="cerrarAlarma">Entendido</button>
          <button class="btn-alarma-secondary" @click="iniciarDescanso">Iniciar descanso</button>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- FOOTER -->
    <!-- ========================================== -->
    <footer class="dashboard-footer">
      <p>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v4"/>
          <path d="M12 18v4"/>
          <path d="M4.93 4.93l2.83 2.83"/>
          <path d="M16.24 16.24l2.83 2.83"/>
          <path d="M2 12h4"/>
          <path d="M18 12h4"/>
          <path d="M4.93 19.07l2.83-2.83"/>
          <path d="M16.24 7.76l2.83-2.83"/>
        </svg>
        {{ new Date().getFullYear() }} Dashboard · Productividad profesional
      </p>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'DashboardProfesional',
  
  emits: ['alternar-tema'],
  
  data() {
    return {
      // ===== STATS =====
      stats: [
        { label: 'Tareas', value: 0, sub: '0 pendientes', icon: 'tasks', color: '#7c3aed', trend: 'neutral', trendValue: '' },
        { label: 'Completadas', value: '0%', sub: '0% esta semana', icon: 'check', color: '#22c55e', trend: 'up', trendValue: '+0%' },
        { label: 'Productividad', value: '0%', sub: '0% vs ayer', icon: 'trending', color: '#f59e0b', trend: 'neutral', trendValue: '' },
        { label: 'Metas', value: '0/0', sub: '0% completado', icon: 'star', color: '#3b82f6', trend: 'neutral', trendValue: '' }
      ],
      
      // ===== ACTIVIDAD SEMANAL =====
      actividadSemanal: [
        { dia: 'Lun', valor: 0 },
        { dia: 'Mar', valor: 0 },
        { dia: 'Mié', valor: 0 },
        { dia: 'Jue', valor: 0 },
        { dia: 'Vie', valor: 0 },
        { dia: 'Sáb', valor: 0 },
        { dia: 'Dom', valor: 0 }
      ],
      
      // ===== TAREAS =====
      tareas: [],
      nuevaTarea: { titulo: '', categoria: 'Trabajo', prioridad: 'media' },
      
      // ===== HÁBITOS =====
      habits: [],
      nuevoHabit: { nombre: '', emoji: '●' },
      
      // ===== METAS =====
      metas: [],
      nuevaMeta: { titulo: '', progreso: 0 },
      
      // ===== NOTAS =====
      notas: [],
      nuevaNota: '',
      
      // ===== POMODORO =====
      tiempoEnfoque: 25,
      tiempoDescanso: 5,
      pomodoroTiempo: '25:00',
      pomodoroSegundos: 1500,
      pomodoroActivo: false,
      pomodoroPausado: false,
      pomodoroEstado: 'Listo',
      pomodoroModo: 'Enfoque',
      ciclosPomodoro: 0,
      tiempoAcumulado: 0,
      intervaloPomodoro: null,
      
      // ===== ALARMA =====
      mostrarAlarma: false,
      sonidoAlarma: null
    }
  },
  
  computed: {
    fechaActual() {
      return new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    },
    tareasPendientes() {
      return this.tareas.filter(t => !t.completada)
    },
    tareasCompletadas() {
      return this.tareas.filter(t => t.completada)
    },
    tareasCompletadasHoy() {
      return this.tareasCompletadas.length
    },
    porcentajeProductividad() {
      const total = this.tareas.length
      if (total === 0) return 0
      return Math.round((this.tareasCompletadas.length / total) * 100)
    },
    progresoHabits() {
      const total = this.habits.length
      if (total === 0) return 0
      const hechos = this.habits.filter(h => h.hecho).length
      return Math.round((hechos / total) * 100)
    },
    metasCompletadas() {
      return this.metas.filter(m => m.progreso === 100).length
    },
    tiempoTotal() {
      const minutos = Math.floor(this.tiempoAcumulado / 60)
      const horas = Math.floor(minutos / 60)
      const mins = minutos % 60
      if (horas > 0) {
        return `${horas}h ${mins}min`
      }
      return `${mins}min`
    }
  },
  
  watch: {
    tareas: {
      handler() { this.actualizarStats() },
      deep: true
    },
    metas: {
      handler() { this.actualizarStats() },
      deep: true
    }
  },
  
  mounted() {
    this.cargarDatos()
    this.actualizarStats()
    this.inicializarSonido()
  },
  
  beforeDestroy() {
    if (this.intervaloPomodoro) {
      clearInterval(this.intervaloPomodoro)
    }
  },
  
  methods: {
    // ==========================================
    // ===== SONIDO DE ALARMA =====
    // ==========================================
    inicializarSonido() {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        this.sonidoAlarma = audioContext
      } catch (error) {
        console.error('Error al inicializar audio:', error)
      }
    },
    
    reproducirSonidoAlarma() {
      try {
        const context = this.sonidoAlarma || new (window.AudioContext || window.webkitAudioContext)()
        
        // Sonido de alarma tipo despertador
        const frequencies = [880, 880, 880, 880, 880]
        const duration = 0.2
        let time = context.currentTime
        
        frequencies.forEach((freq, i) => {
          const osc = context.createOscillator()
          const gain = context.createGain()
          
          osc.type = 'square'
          osc.frequency.setValueAtTime(freq, time)
          
          gain.gain.setValueAtTime(0.01, time)
          gain.gain.exponentialRampToValueAtTime(0.3, time + 0.02)
          gain.gain.exponentialRampToValueAtTime(0.01, time + duration)
          
          osc.connect(gain)
          gain.connect(context.destination)
          
          osc.start(time)
          osc.stop(time + duration)
          
          time += duration + 0.15
        })
        
        // Repetir 2 veces
        setTimeout(() => {
          const time2 = context.currentTime
          frequencies.forEach((freq, i) => {
            const osc = context.createOscillator()
            const gain = context.createGain()
            
            osc.type = 'square'
            osc.frequency.setValueAtTime(freq, time2)
            
            gain.gain.setValueAtTime(0.01, time2)
            gain.gain.exponentialRampToValueAtTime(0.3, time2 + 0.02)
            gain.gain.exponentialRampToValueAtTime(0.01, time2 + duration)
            
            osc.connect(gain)
            gain.connect(context.destination)
            
            osc.start(time2)
            osc.stop(time2 + duration)
            
            time2 + duration + 0.15
          })
        }, 1500)
        
      } catch (error) {
        console.error('Error al reproducir sonido:', error)
      }
    },
    
    // ==========================================
    // ===== STATS =====
    // ==========================================
    actualizarStats() {
      const total = this.tareas.length
      const completadas = this.tareasCompletadas.length
      const pendientes = this.tareasPendientes.length
      
      this.stats[0].value = total
      this.stats[0].sub = `${pendientes} pendientes`
      
      this.stats[1].value = total > 0 ? `${Math.round((completadas / total) * 100)}%` : '0%'
      this.stats[1].trendValue = total > 0 ? `+${Math.round((completadas / total) * 100)}%` : '0%'
      
      this.stats[2].value = total > 0 ? `${Math.round((completadas / total) * 100)}%` : '0%'
      
      this.stats[3].value = `${this.metasCompletadas}/${this.metas.length}`
      this.stats[3].sub = this.metas.length > 0 ? `${Math.round((this.metasCompletadas / this.metas.length) * 100)}% completado` : '0% completado'
    },
    
    // ==========================================
    // ===== GRÁFICO =====
    // ==========================================
    calcularAltura(valor) {
      const max = Math.max(...this.actividadSemanal.map(d => d.valor), 1)
      return (valor / max) * 80 + 10
    },
    
    // ==========================================
    // ===== TAREAS =====
    // ==========================================
    agregarTarea() {
      const titulo = this.nuevaTarea.titulo.trim()
      if (!titulo) return
      
      this.tareas.push({
        titulo,
        categoria: this.nuevaTarea.categoria || 'General',
        prioridad: this.nuevaTarea.prioridad,
        completada: false
      })
      
      const dia = new Date().getDay()
      const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
      const diaIndex = dias.indexOf(this.actividadSemanal[dia - 1]?.dia)
      if (diaIndex !== -1) {
        this.actividadSemanal[diaIndex].valor++
      }
      
      this.nuevaTarea.titulo = ''
      this.guardarDatos()
    },
    
    toggleTask(index) {
      this.tareas[index].completada = !this.tareas[index].completada
      this.guardarDatos()
    },
    
    eliminarTarea(index) {
      this.tareas.splice(index, 1)
      this.guardarDatos()
    },
    
    // ==========================================
    // ===== HÁBITOS =====
    // ==========================================
    agregarHabit() {
      const nombre = this.nuevoHabit.nombre.trim()
      if (!nombre) return
      
      this.habits.push({
        nombre,
        emoji: this.nuevoHabit.emoji || '●',
        hecho: false,
        racha: 0
      })
      
      this.nuevoHabit.nombre = ''
      this.guardarDatos()
    },
    
    toggleHabit(index) {
      this.habits[index].hecho = !this.habits[index].hecho
      if (this.habits[index].hecho) {
        this.habits[index].racha++
      } else {
        this.habits[index].racha = Math.max(0, this.habits[index].racha - 1)
      }
      this.guardarDatos()
    },
    
    eliminarHabit(index) {
      this.habits.splice(index, 1)
      this.guardarDatos()
    },
    
    // ==========================================
    // ===== METAS =====
    // ==========================================
    agregarMeta() {
      const titulo = this.nuevaMeta.titulo.trim()
      if (!titulo) return
      
      this.metas.push({
        titulo,
        progreso: Math.min(100, Math.max(0, this.nuevaMeta.progreso || 0))
      })
      
      this.nuevaMeta.titulo = ''
      this.nuevaMeta.progreso = 0
      this.guardarDatos()
    },
    
    eliminarMeta(index) {
      this.metas.splice(index, 1)
      this.guardarDatos()
    },
    
    // ==========================================
    // ===== NOTAS =====
    // ==========================================
    agregarNota() {
      const texto = this.nuevaNota.trim()
      if (!texto) return
      
      this.notas.push(texto)
      this.nuevaNota = ''
      this.guardarDatos()
    },
    
    eliminarNota(index) {
      this.notas.splice(index, 1)
      this.guardarDatos()
    },
    
    // ==========================================
    // ===== POMODORO CON ALARMA =====
    // ==========================================
    actualizarTiempoBase() {
      if (this.tiempoEnfoque < 1) this.tiempoEnfoque = 1
      if (this.tiempoEnfoque > 120) this.tiempoEnfoque = 120
      if (this.tiempoDescanso < 1) this.tiempoDescanso = 1
      if (this.tiempoDescanso > 30) this.tiempoDescanso = 30
      
      if (!this.pomodoroActivo) {
        this.pomodoroSegundos = this.tiempoEnfoque * 60
        this.pomodoroTiempo = this.formatearTiempo(this.pomodoroSegundos)
      }
      this.guardarDatos()
    },
    
    ajustarTiempo(tipo, delta) {
      if (tipo === 'focus') {
        this.tiempoEnfoque = Math.max(1, Math.min(120, this.tiempoEnfoque + delta))
      } else {
        this.tiempoDescanso = Math.max(1, Math.min(30, this.tiempoDescanso + delta))
      }
      this.actualizarTiempoBase()
    },
    
    reiniciarConfiguracion() {
      this.tiempoEnfoque = 25
      this.tiempoDescanso = 5
      if (!this.pomodoroActivo) {
        this.pomodoroSegundos = this.tiempoEnfoque * 60
        this.pomodoroTiempo = this.formatearTiempo(this.pomodoroSegundos)
        this.pomodoroModo = 'Enfoque'
      }
      this.guardarDatos()
    },
    
    formatearTiempo(segundos) {
      const minutos = Math.floor(segundos / 60)
      const segs = segundos % 60
      return `${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`
    },
    
    iniciarPomodoro() {
      if (this.pomodoroActivo) return
      
      this.mostrarAlarma = false
      this.pomodoroActivo = true
      this.pomodoroPausado = false
      this.pomodoroEstado = 'En curso'
      
      if (this.pomodoroSegundos === 0) {
        this.pomodoroSegundos = this.tiempoEnfoque * 60
        this.pomodoroTiempo = this.formatearTiempo(this.pomodoroSegundos)
      }
      
      this.intervaloPomodoro = setInterval(() => {
        if (!this.pomodoroPausado) {
          this.pomodoroSegundos--
          this.tiempoAcumulado++
          this.pomodoroTiempo = this.formatearTiempo(this.pomodoroSegundos)
          
          if (this.pomodoroSegundos <= 0) {
            clearInterval(this.intervaloPomodoro)
            this.pomodoroActivo = false
            
            if (this.pomodoroModo === 'Enfoque') {
              // ¡ALARMA DE DESCANSO!
              this.reproducirSonidoAlarma()
              this.mostrarAlarma = true
              this.pomodoroModo = 'Descanso'
              this.pomodoroSegundos = this.tiempoDescanso * 60
              this.pomodoroTiempo = this.formatearTiempo(this.pomodoroSegundos)
              this.pomodoroEstado = 'Descanso'
            } else {
              this.pomodoroModo = 'Enfoque'
              this.pomodoroSegundos = this.tiempoEnfoque * 60
              this.pomodoroTiempo = this.formatearTiempo(this.pomodoroSegundos)
              this.pomodoroEstado = 'Listo'
            }
            this.guardarDatos()
          }
        }
      }, 1000)
    },
    
    pausarPomodoro() {
      if (!this.pomodoroActivo) return
      this.pomodoroPausado = !this.pomodoroPausado
      this.pomodoroEstado = this.pomodoroPausado ? 'Pausado' : 'En curso'
    },
    
    reiniciarPomodoro() {
      if (this.intervaloPomodoro) {
        clearInterval(this.intervaloPomodoro)
        this.intervaloPomodoro = null
      }
      this.pomodoroActivo = false
      this.pomodoroPausado = false
      this.mostrarAlarma = false
      this.pomodoroSegundos = this.tiempoEnfoque * 60
      this.pomodoroTiempo = this.formatearTiempo(this.pomodoroSegundos)
      this.pomodoroEstado = 'Listo'
      this.pomodoroModo = 'Enfoque'
    },
    
    cerrarAlarma() {
      this.mostrarAlarma = false
      if (this.pomodoroModo === 'Descanso') {
        this.pomodoroEstado = 'Descansando...'
      }
    },
    
    iniciarDescanso() {
      this.mostrarAlarma = false
      if (this.pomodoroModo === 'Descanso') {
        this.pomodoroActivo = true
        this.pomodoroPausado = false
        this.pomodoroEstado = 'Descansando...'
        
        this.intervaloPomodoro = setInterval(() => {
          if (!this.pomodoroPausado) {
            this.pomodoroSegundos--
            this.pomodoroTiempo = this.formatearTiempo(this.pomodoroSegundos)
            
            if (this.pomodoroSegundos <= 0) {
              clearInterval(this.intervaloPomodoro)
              this.pomodoroActivo = false
              this.pomodoroModo = 'Enfoque'
              this.pomodoroSegundos = this.tiempoEnfoque * 60
              this.pomodoroTiempo = this.formatearTiempo(this.pomodoroSegundos)
              this.pomodoroEstado = 'Listo'
              this.guardarDatos()
            }
          }
        }, 1000)
      }
    },
    
    // ==========================================
    // ===== PERSISTENCIA =====
    // ==========================================
    guardarDatos() {
      const datos = {
        tareas: this.tareas,
        habits: this.habits,
        metas: this.metas,
        notas: this.notas,
        actividadSemanal: this.actividadSemanal,
        ciclosPomodoro: this.ciclosPomodoro,
        tiempoAcumulado: this.tiempoAcumulado,
        tiempoEnfoque: this.tiempoEnfoque,
        tiempoDescanso: this.tiempoDescanso
      }
      localStorage.setItem('dashboardData', JSON.stringify(datos))
    },
    
    cargarDatos() {
      const guardado = localStorage.getItem('dashboardData')
      if (guardado) {
        try {
          const datos = JSON.parse(guardado)
          this.tareas = datos.tareas || []
          this.habits = datos.habits || []
          this.metas = datos.metas || []
          this.notas = datos.notas || []
          this.actividadSemanal = datos.actividadSemanal || this.actividadSemanal
          this.ciclosPomodoro = datos.ciclosPomodoro || 0
          this.tiempoAcumulado = datos.tiempoAcumulado || 0
          this.tiempoEnfoque = datos.tiempoEnfoque || 25
          this.tiempoDescanso = datos.tiempoDescanso || 5
          
          if (!this.pomodoroActivo) {
            this.pomodoroSegundos = this.tiempoEnfoque * 60
            this.pomodoroTiempo = this.formatearTiempo(this.pomodoroSegundos)
          }
        } catch {
          // Usar datos por defecto
        }
      }
    }
  }
}
</script>

<style scoped>
/* ========================================== */
/* ===== DASHBOARD ===== */
/* ========================================== */

.dashboard {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 24px;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(124, 58, 237, 0.06);
  min-height: 100vh;
  transition: var(--transition);
}

@media (min-width: 768px) {
  .dashboard {
    padding: 28px 40px;
    margin: 16px auto;
    min-height: auto;
  }
}

@media (min-width: 1200px) {
  .dashboard {
    padding: 32px 56px;
    margin: 20px auto;
  }
}

/* ========================================== */
/* ===== HEADER ===== */
/* ========================================== */

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 28px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 800;
  color: var(--text-primary);
}

.logo span {
  background: linear-gradient(135deg, var(--violet-600), var(--violet-800));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-info {
  display: flex;
  flex-direction: column;
}

.greeting {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.date {
  font-size: 12px;
  color: var(--text-muted);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-tema {
  padding: 10px;
  border: none;
  background: var(--bg-input);
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-secondary);
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-tema:hover {
  background: var(--violet-100);
  transform: rotate(20deg);
}

/* ========================================== */
/* ===== SECCIONES ===== */
/* ========================================== */

.section {
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  padding: 20px 24px;
  margin-bottom: 20px;
  transition: var(--transition);
}

.section:hover {
  box-shadow: var(--shadow-sm);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.3px;
}

.section-subtitle {
  font-size: 13px;
  color: var(--text-muted);
}

/* ========================================== */
/* ===== STATS CARDS ===== */
/* ========================================== */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  background: var(--bg-input);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  transition: var(--transition);
  position: relative;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
  min-width: 0;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
}

.stat-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

.stat-sub {
  display: block;
  font-size: 11px;
  color: var(--text-muted);
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.stat-trend.up {
  color: var(--success);
  background: rgba(34, 197, 94, 0.1);
}

.stat-trend.down {
  color: var(--danger);
  background: rgba(239, 68, 68, 0.1);
}

.stat-trend.neutral {
  color: var(--text-muted);
  background: var(--bg-input);
}

/* ========================================== */
/* ===== GRID DE DOS COLUMNAS ===== */
/* ========================================== */

.grid-two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 900px) {
  .grid-two {
    grid-template-columns: 1fr;
  }
}

/* ========================================== */
/* ===== GRÁFICO ===== */
/* ========================================== */

.chart-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 120px;
  gap: 8px;
  padding-top: 10px;
}

.chart-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  animation: fadeIn 0.4s ease-out;
}

.bar {
  width: 100%;
  max-width: 36px;
  min-height: 8px;
  background: linear-gradient(180deg, var(--violet-500), var(--violet-600));
  border-radius: 4px 4px 0 0;
  transition: height 0.6s ease;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 2px;
}

.bar-value {
  font-size: 10px;
  font-weight: 700;
  color: white;
  opacity: 0.9;
}

.bar-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
}

/* ========================================== */
/* ===== QUICK STATS ===== */
/* ========================================== */

.quick-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.quick-stat {
  padding: 14px 16px;
  background: var(--bg-input);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  text-align: center;
}

.quick-label {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
}

.quick-value {
  display: block;
  font-size: 28px;
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 2px;
}

/* ========================================== */
/* ===== FORMULARIOS ===== */
/* ========================================== */

.task-form,
.habit-form,
.goal-form,
.note-form {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.input-task,
.input-habit,
.input-goal,
.input-note {
  flex: 1;
  min-width: 120px;
  padding: 10px 14px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  transition: var(--transition);
}

.input-task:focus,
.input-habit:focus,
.input-goal:focus,
.input-note:focus {
  outline: none;
  border-color: var(--violet-400);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.input-progress {
  width: 70px;
  padding: 10px 12px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  transition: var(--transition);
  text-align: center;
}

.input-progress:focus {
  outline: none;
  border-color: var(--violet-400);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.select-priority {
  padding: 10px 14px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  min-width: 100px;
}

.select-priority:focus {
  outline: none;
  border-color: var(--violet-400);
}

.btn-add {
  padding: 10px 16px;
  background: linear-gradient(135deg, var(--violet-600), var(--violet-800));
  color: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-add:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3);
}

.goal-form {
  display: flex;
  gap: 10px;
}

.goal-progress-input {
  display: flex;
  align-items: center;
}

/* ========================================== */
/* ===== LISTAS ===== */
/* ========================================== */

.task-list,
.habit-list,
.goal-list,
.note-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 250px;
  overflow-y: auto;
}

.task-item,
.habit-item,
.goal-item,
.note-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--bg-input);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.task-item:hover,
.habit-item:hover,
.goal-item:hover,
.note-item:hover {
  transform: translateX(4px);
  border-color: var(--violet-300);
}

.task-check,
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
  background: var(--bg-card);
}

.task-check:hover,
.habit-check:hover {
  border-color: var(--violet-400);
}

.task-content {
  flex: 1;
  min-width: 0;
}

.task-title,
.habit-name,
.goal-title,
.note-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.task-title.completed,
.habit-name.done {
  text-decoration: line-through;
  color: var(--text-muted);
}

.task-category {
  font-size: 11px;
  color: var(--text-muted);
  margin-left: 8px;
}

.task-priority {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 10px;
  border-radius: 12px;
}

.task-priority.alta {
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger);
}

.task-priority.media {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning);
}

.task-priority.baja {
  background: rgba(34, 197, 94, 0.1);
  color: var(--success);
}

.habit-streak {
  font-size: 12px;
  color: var(--text-muted);
}

.habit-icon {
  font-size: 18px;
}

.btn-delete {
  padding: 4px;
  border: none;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.3;
}

.btn-delete:hover {
  opacity: 1;
  background: rgba(239, 68, 68, 0.1);
}

.btn-delete svg {
  color: var(--danger);
}

/* ========================================== */
/* ===== HÁBITOS PROGRESS ===== */
/* ========================================== */

.habit-progress {
  margin-bottom: 14px;
}

.habit-progress-bar {
  height: 6px;
  background: var(--border-color);
  border-radius: 6px;
  overflow: hidden;
}

.habit-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--violet-500), var(--violet-600));
  transition: width 0.6s ease;
  border-radius: 6px;
}

/* ========================================== */
/* ===== METAS ===== */
/* ========================================== */

.goal-content {
  flex: 1;
  min-width: 0;
}

.goal-bar {
  height: 4px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
  margin: 4px 0;
}

.goal-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--violet-500), var(--violet-600));
  transition: width 0.6s ease;
  border-radius: 4px;
}

.goal-percent {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  min-width: 40px;
  text-align: right;
}

/* ========================================== */
/* ===== POMODORO CON ALARMA ===== */
/* ========================================== */

.pomodoro {
  text-align: center;
}

.pomodoro-config {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: var(--bg-input);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.config-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.config-group label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.config-input {
  display: flex;
  align-items: center;
  gap: 4px;
}

.config-btn {
  width: 28px;
  height: 28px;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.config-btn:hover {
  background: var(--violet-100);
  border-color: var(--violet-400);
}

.config-number {
  width: 48px;
  height: 32px;
  text-align: center;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 700;
  font-family: 'Nunito', sans-serif;
}

.config-number:focus {
  outline: none;
  border-color: var(--violet-400);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.config-unit {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  margin-left: 2px;
}

.btn-reset-config {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Nunito', sans-serif;
}

.btn-reset-config:hover {
  background: var(--violet-100);
  border-color: var(--violet-400);
  color: var(--text-primary);
}

.pomodoro-timer {
  margin-bottom: 16px;
  transition: var(--transition);
  padding: 16px;
  border-radius: var(--radius);
}

.pomodoro-timer.alerta {
  animation: alarmaPulse 0.5s ease-in-out 5;
  background: rgba(239, 68, 68, 0.05);
  border: 2px solid rgba(239, 68, 68, 0.2);
}

@keyframes alarmaPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.pomodoro-time {
  font-size: 48px;
  font-weight: 800;
  color: var(--text-primary);
  font-family: 'Courier New', monospace;
  display: block;
  letter-spacing: 2px;
}

.pomodoro-status {
  font-size: 14px;
  color: var(--text-muted);
}

.pomodoro-mode {
  font-size: 12px;
  font-weight: 600;
  color: var(--violet-600);
  background: rgba(124, 58, 237, 0.08);
  padding: 2px 14px;
  border-radius: 12px;
  display: inline-block;
  margin-top: 4px;
}

/* ===== ALARMA VISUAL EN TIMER ===== */
.alarma-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  padding: 8px 16px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: var(--radius);
  border: 1px solid rgba(239, 68, 68, 0.2);
  animation: alarmaPulse 0.8s ease-in-out infinite;
}

.alarma-texto {
  font-size: 16px;
  font-weight: 700;
  color: var(--danger);
}

.pomodoro-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-pomodoro {
  padding: 10px 24px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Nunito', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-pomodoro:hover:not(:disabled) {
  background: var(--violet-600);
  color: white;
  border-color: var(--violet-600);
}

.btn-pomodoro:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pomodoro-stats {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 12px;
}

.stat-divider {
  color: var(--border-color);
}

/* ========================================== */
/* ===== MODAL DE ALARMA ===== */
/* ========================================== */

.alarma-modal {
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
  z-index: 1000;
  padding: 20px;
}

.alarma-modal-content {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  padding: 40px 48px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  border: 2px solid rgba(239, 68, 68, 0.2);
  box-shadow: var(--shadow-lg);
}

.alarma-icono {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alarma-modal-content h2 {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.alarma-modal-content p {
  font-size: 15px;
  color: var(--text-muted);
  margin-bottom: 24px;
  line-height: 1.6;
}

.alarma-botones {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-alarma {
  padding: 12px 32px;
  background: linear-gradient(135deg, var(--violet-600), var(--violet-800));
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Nunito', sans-serif;
}

.btn-alarma:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3);
}

.btn-alarma-secondary {
  padding: 12px 32px;
  background: var(--bg-input);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Nunito', sans-serif;
}

.btn-alarma-secondary:hover {
  background: var(--violet-100);
  transform: scale(1.02);
}

/* ========================================== */
/* ===== ANIMACIONES ===== */
/* ========================================== */

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.slide-up {
  animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ========================================== */
/* ===== EMPTY STATE ===== */
/* ========================================== */

.empty-state {
  text-align: center;
  padding: 16px;
  color: var(--text-muted);
}

.empty-state p {
  font-size: 14px;
  font-weight: 600;
}

.empty-state span {
  font-size: 13px;
}

/* ========================================== */
/* ===== FOOTER ===== */
/* ========================================== */

.dashboard-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.dashboard-footer p {
  font-size: 13px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* ========================================== */
/* ===== RESPONSIVE ===== */
/* ========================================== */

@media (max-width: 600px) {
  .dashboard {
    padding: 12px 14px;
    border-radius: 0;
    margin: 0;
    min-height: 100vh;
  }
  
  .header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .logo {
    font-size: 18px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  
  .stat-card {
    padding: 12px 14px;
  }
  
  .stat-icon {
    width: 36px;
    height: 36px;
  }
  
  .stat-value {
    font-size: 18px;
  }
  
  .grid-two {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .task-form,
  .habit-form,
  .goal-form,
  .note-form {
    flex-direction: column;
  }
  
  .select-priority {
    width: 100%;
  }
  
  .goal-form {
    flex-direction: column;
  }
  
  .input-progress {
    width: 100%;
  }
  
  .btn-add {
    width: 100%;
    justify-content: center;
  }
  
  .pomodoro-config {
    flex-direction: column;
    gap: 12px;
    padding: 14px;
  }
  
  .config-group {
    flex-direction: row;
    gap: 12px;
    width: 100%;
    justify-content: space-between;
  }
  
  .config-group label {
    font-size: 13px;
    text-transform: none;
  }
  
  .btn-reset-config {
    width: 100%;
    justify-content: center;
  }
  
  .pomodoro-time {
    font-size: 36px;
  }
  
  .pomodoro-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-pomodoro {
    width: 100%;
    justify-content: center;
  }
  
  .pomodoro-stats {
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  
  .stat-divider {
    display: none;
  }
  
  .section {
    padding: 14px 16px;
  }
  
  .alarma-modal-content {
    padding: 30px 24px;
  }
  
  .alarma-botones {
    flex-direction: column;
  }
  
  .alarma-botones button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 400px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .section {
    padding: 10px 12px;
  }
  
  .dashboard {
    padding: 8px 10px;
  }
  
  .stat-icon {
    width: 32px;
    height: 32px;
  }
  
  .stat-value {
    font-size: 16px;
  }
}
</style>