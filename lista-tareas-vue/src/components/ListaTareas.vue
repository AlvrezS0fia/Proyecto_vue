<template>
  <div class="app-container">
    
    <!-- ===== HEADER ===== -->
    <header class="header">
      <h1>
        <svg class="icon icon-lg" viewBox="0 0 24 24">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <span class="text-gradient">Lista de Tareas</span>
      </h1>
      <div class="header-actions">
        <button class="btn-tema" @click="$emit('alternar-tema')" title="Cambiar tema">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- ===== INPUT ===== -->
    <div class="input-group">
      <input 
        v-model="nuevaTarea" 
        @keyup.enter="agregarTarea"
        placeholder="Escribe una tarea..."
        class="input-tarea"
      />
      <button class="btn-agregar" @click="agregarTarea">
        <svg class="icon" viewBox="0 0 24 24">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Agregar
      </button>
    </div>

    <!-- ===== FILTROS ===== -->
    <div class="filtros">
      <button 
        v-for="filtro in opcionesFiltro" 
        :key="filtro.valor"
        @click="filtroActivo = filtro.valor"
        class="btn-filtro"
        :class="{ activo: filtroActivo === filtro.valor }"
      >
        {{ filtro.etiqueta }}
        <span class="badge">{{ obtenerConteo(filtro.valor) }}</span>
      </button>
    </div>

    <!-- ===== LISTA ===== -->
    <div class="lista-tareas">
      <div 
        v-for="(tarea, index) in tareasFiltradas" 
        :key="index"
        class="tarea-item"
        :class="{ completada: tarea.hecha }"
      >
        <div class="tarea-contenido">
          <button 
            class="checkbox" 
            @click="tarea.hecha = !tarea.hecha"
            :class="{ checked: tarea.hecha }"
          >
            <svg v-if="tarea.hecha" class="icon" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
          <span class="texto-tarea" :class="{ tachado: tarea.hecha }">
            {{ tarea.texto }}
          </span>
        </div>
        
        <div class="acciones">
          <!-- ===== BOTÓN EDITAR ===== -->
          <button class="btn-editar" @click="abrirEditar(index)" title="Editar tarea">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <!-- ===== BOTÓN ELIMINAR ===== -->
          <button class="btn-eliminar" @click="confirmarEliminar(index)" title="Eliminar tarea">
            <svg class="icon" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== MENSAJE VACÍO ===== -->
    <div v-if="tareas.length === 0" class="mensaje-vacio">
      <svg class="icon icon-xl" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <p>No hay tareas</p>
      <span>Agrega una nueva tarea para comenzar</span>
    </div>

    <!-- ===== RESUMEN ===== -->
    <div class="resumen" v-if="tareas.length > 0">
      <div class="barra-progreso">
        <div 
          class="progreso"
          :style="{ width: porcentajeCompletado + '%' }"
        ></div>
      </div>
      <div class="estadisticas">
        <span>
          <strong>{{ tareasCompletadas }}</strong> completadas
        </span>
        <span>
          <strong>{{ tareasPendientes }}</strong> pendientes
        </span>
        <span>
          <strong>{{ porcentajeCompletado }}%</strong> progreso
        </span>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- ===== MODAL DE CONFIRMACIÓN (ELIMINAR) ===== -->
    <!-- ========================================== -->
    <ModalConfirmacion
      :visible="mostrarModalEliminar"
      titulo="¿Eliminar tarea?"
      mensaje="Esta acción eliminará la tarea permanentemente. ¿Estás seguro?"
      textoConfirmar="Eliminar"
      textoCancelar="Cancelar"
      tipo="danger"
      @confirmar="eliminarTarea"
      @cancelar="cancelarEliminar"
    />

    <!-- ========================================== -->
    <!-- ===== MODAL DE EDICIÓN ===== -->
    <!-- ========================================== -->
    <div v-if="mostrarModalEditar" class="modal-overlay" @click.self="cerrarEditar">
      <div class="modal-container slide-up" style="max-width: 450px;">
        
        <!-- Icono -->
        <div class="modal-icono warning">
          <svg class="icono-alerta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 9v4"/>
            <path d="M12 17h.01"/>
          </svg>
        </div>
        
        <!-- Título -->
        <h3 class="modal-titulo">Editar tarea</h3>
        <p class="modal-mensaje">Modifica el texto de la tarea seleccionada</p>
        
        <!-- Input de edición -->
        <input 
          v-model="textoEditando" 
          @keyup.enter="guardarEdicion"
          class="input-editar"
          placeholder="Nuevo texto de la tarea..."
          autofocus
        />
        
        <!-- Botones -->
        <div class="modal-acciones">
          <button class="btn-cancelar" @click="cerrarEditar">
            <svg class="icon" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Cancelar
          </button>
          <button class="btn-confirmar warning" @click="guardarEdicion">
            <svg class="icon" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Guardar
          </button>
        </div>
      </div>
    </div>

    <!-- ===== FOOTER ===== -->
    <footer class="footer">
      <p>
        <svg class="icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        {{ new Date().getFullYear() }} · Gestiona tus tareas
      </p>
    </footer>

  </div>
</template>

<script>
import ModalConfirmacion from './ModalConfirmacion.vue'

export default {
  name: 'ListaTareas',
  
  components: {
    ModalConfirmacion
  },
  
  emits: ['alternar-tema'],
  
  data() {
    return {
      // ===== TAREAS =====
      nuevaTarea: '',
      tareas: [
        { texto: 'Aprender Vue 3', hecha: false },
        { texto: 'Crear lista de tareas', hecha: false },
        { texto: 'Diseñar interfaz profesional', hecha: true }
      ],
      
      // ===== FILTRO =====
      opcionesFiltro: [
        { valor: 'todas', etiqueta: 'Todas' },
        { valor: 'pendientes', etiqueta: 'Pendientes' },
        { valor: 'completadas', etiqueta: 'Completadas' }
      ],
      filtroActivo: 'todas',
      
      // ===== MODAL ELIMINAR =====
      mostrarModalEliminar: false,
      indiceEliminar: null,
      
      // ===== MODAL EDITAR =====
      mostrarModalEditar: false,
      indiceEditar: null,
      textoEditando: ''
    }
  },
  
  computed: {
    tareasPendientes() {
      return this.tareas.filter(t => !t.hecha).length
    },
    tareasCompletadas() {
      return this.tareas.filter(t => t.hecha).length
    },
    porcentajeCompletado() {
      if (this.tareas.length === 0) return 0
      return Math.round((this.tareasCompletadas / this.tareas.length) * 100)
    },
    tareasFiltradas() {
      if (this.filtroActivo === 'pendientes') {
        return this.tareas.filter(t => !t.hecha)
      }
      if (this.filtroActivo === 'completadas') {
        return this.tareas.filter(t => t.hecha)
      }
      return this.tareas
    }
  },
  
  methods: {
    // ==========================================
    // ===== AGREGAR TAREA =====
    // ==========================================
    agregarTarea() {
      const texto = this.nuevaTarea.trim()
      if (texto) {
        this.tareas.unshift({ texto, hecha: false })
        this.nuevaTarea = ''
        this.guardarTareas()
      }
    },
    
    // ==========================================
    // ===== ELIMINAR TAREA (CON MODAL) =====
    // ==========================================
    confirmarEliminar(index) {
      this.indiceEliminar = index
      this.mostrarModalEliminar = true
    },
    
    eliminarTarea() {
      if (this.indiceEliminar !== null) {
        this.tareas.splice(this.indiceEliminar, 1)
        this.guardarTareas()
      }
      this.cancelarEliminar()
    },
    
    cancelarEliminar() {
      this.mostrarModalEliminar = false
      this.indiceEliminar = null
    },
    
    // ==========================================
    // ===== EDITAR TAREA (CON MODAL) =====
    // ==========================================
    
    // Abre el modal de edición con el texto actual
    abrirEditar(index) {
      this.indiceEditar = index
      this.textoEditando = this.tareas[index].texto
      this.mostrarModalEditar = true
      
      // Enfoca el input después de que se abra el modal
      this.$nextTick(() => {
        const input = document.querySelector('.input-editar')
        if (input) {
          input.focus()
          input.select() // Selecciona todo el texto
        }
      })
    },
    
    // Guarda la edición
    guardarEdicion() {
      const texto = this.textoEditando.trim()
      if (texto && this.indiceEditar !== null) {
        this.tareas[this.indiceEditar].texto = texto
        this.guardarTareas()
      }
      this.cerrarEditar()
    },
    
    // Cierra el modal de edición
    cerrarEditar() {
      this.mostrarModalEditar = false
      this.indiceEditar = null
      this.textoEditando = ''
    },
    
    // ==========================================
    // ===== PERSISTENCIA =====
    // ==========================================
    guardarTareas() {
      localStorage.setItem('tareasLista', JSON.stringify(this.tareas))
    },
    
    cargarTareas() {
      const guardado = localStorage.getItem('tareasLista')
      if (guardado) {
        try {
          this.tareas = JSON.parse(guardado)
        } catch {
          this.tareas = []
        }
      }
    },
    
    // ==========================================
    // ===== UTILIDAD =====
    // ==========================================
    obtenerConteo(filtro) {
      if (filtro === 'todas') return this.tareas.length
      if (filtro === 'pendientes') return this.tareasPendientes
      if (filtro === 'completadas') return this.tareasCompletadas
      return 0
    }
  },
  
  mounted() {
    this.cargarTareas()
  }
}
</script>

<style scoped>
/* ===== CONTENEDOR ===== */
.app-container {
  max-width: 580px;
  margin: 20px auto;
  padding: 30px;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(124, 58, 237, 0.06);
  transition: var(--transition-slow);
}

/* ===== HEADER ===== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.header h1 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.header h1 .icon {
  color: var(--violet-600);
}

.btn-tema {
  padding: 8px;
  border: none;
  background: var(--bg-input);
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-secondary);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-tema:hover {
  background: var(--violet-200);
  transform: rotate(20deg);
}

/* ===== INPUT ===== */
.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

.input-tarea {
  flex: 1;
  padding: 14px 18px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  transition: var(--transition);
}

.input-tarea:focus {
  outline: none;
  border-color: var(--violet-600);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.input-tarea::placeholder {
  color: var(--text-muted);
}

.btn-agregar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 14px 24px;
  background: linear-gradient(135deg, var(--violet-600), var(--violet-800));
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
}

.btn-agregar:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3);
}

.btn-agregar .icon {
  width: 18px;
  height: 18px;
}

/* ===== FILTROS ===== */
.filtros {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn-filtro {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background: var(--bg-input);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
}

.btn-filtro:hover {
  background: var(--violet-100);
}

.btn-filtro.activo {
  background: var(--violet-600);
  color: white;
  border-color: var(--violet-600);
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.2);
}

.btn-filtro .badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 1px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.btn-filtro.activo .badge {
  background: rgba(255, 255, 255, 0.25);
}

/* ===== LISTA ===== */
.lista-tareas {
  margin-bottom: 20px;
}

.tarea-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  margin-bottom: 8px;
  background: var(--bg-input);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.tarea-item:hover {
  transform: translateX(4px);
  border-color: var(--violet-300);
}

.tarea-item.completada {
  border-left: 4px solid var(--success);
  background: var(--success-bg);
}

.tarea-contenido {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.checkbox {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  background: var(--bg-card);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.checkbox:hover {
  border-color: var(--violet-500);
  transform: scale(1.05);
}

.checkbox.checked {
  background: var(--violet-600);
  border-color: var(--violet-600);
}

.checkbox .icon {
  width: 16px;
  height: 16px;
  stroke: white;
}

.texto-tarea {
  font-size: 15px;
  color: var(--text-primary);
  font-weight: 500;
  word-break: break-word;
}

.texto-tarea.tachado {
  text-decoration: line-through;
  color: var(--text-muted);
}

.acciones {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.btn-editar,
.btn-eliminar {
  padding: 6px 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-editar {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning);
}

.btn-editar:hover {
  background: rgba(245, 158, 11, 0.2);
  transform: scale(1.05);
}

.btn-eliminar {
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger);
}

.btn-eliminar:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.05);
}

.btn-editar .icon,
.btn-eliminar .icon {
  width: 18px;
  height: 18px;
}

/* ===== MENSAJE VACÍO ===== */
.mensaje-vacio {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);
}

.mensaje-vacio .icon {
  color: var(--violet-300);
  margin-bottom: 12px;
  width: 48px;
  height: 48px;
}

.mensaje-vacio p {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.mensaje-vacio span {
  font-size: 14px;
}

/* ===== RESUMEN ===== */
.resumen {
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
}

.barra-progreso {
  height: 6px;
  background: var(--bg-input);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progreso {
  height: 100%;
  background: linear-gradient(90deg, var(--violet-500), var(--violet-600));
  transition: width 0.5s ease;
  border-radius: 10px;
}

.estadisticas {
  display: flex;
  justify-content: space-around;
  font-size: 13px;
  color: var(--text-muted);
}

.estadisticas strong {
  color: var(--text-primary);
  font-weight: 700;
}

/* ========================================== */
/* ===== MODAL DE EDICIÓN ===== */
/* ========================================== */

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

.modal-container {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  padding: 40px 48px;
  max-width: 450px;
  width: 90%;
  text-align: center;
  box-shadow: var(--shadow-lg);
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

.modal-icono {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-icono.warning {
  background: rgba(245, 158, 11, 0.1);
}

.icono-alerta {
  width: 32px;
  height: 32px;
  stroke-width: 2;
  fill: none;
}

.modal-icono.warning .icono-alerta {
  stroke: var(--warning);
}

.modal-titulo {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.modal-mensaje {
  font-size: 15px;
  color: var(--text-muted);
  margin-bottom: 20px;
  line-height: 1.6;
}

.input-editar {
  width: 100%;
  padding: 14px 18px;
  margin-bottom: 24px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  transition: var(--transition);
}

.input-editar:focus {
  outline: none;
  border-color: var(--violet-600);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

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

.btn-confirmar.warning {
  background: linear-gradient(135deg, var(--warning), #d97706);
  color: white;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.25);
}

.btn-confirmar.warning:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 24px rgba(245, 158, 11, 0.35);
}

/* ===== FOOTER ===== */
.footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.footer p {
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.footer .icon {
  width: 14px;
  height: 14px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 520px) {
  .app-container {
    padding: 20px;
    margin: 12px;
    border-radius: var(--radius-lg);
  }
  
  .header h1 {
    font-size: 20px;
  }
  
  .input-group {
    flex-direction: column;
  }
  
  .btn-agregar {
    justify-content: center;
  }
  
  .filtros {
    justify-content: center;
  }
  
  .tarea-item {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .acciones {
    margin-left: auto;
  }
  
  .estadisticas {
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  
  .modal-container {
    padding: 30px 24px;
  }
  
  .modal-acciones {
    flex-direction: column;
  }
  
  .modal-acciones button {
    justify-content: center;
    padding: 14px 20px;
  }
}

@media (max-width: 400px) {
  .app-container {
    padding: 16px;
  }
  
  .header h1 {
    font-size: 18px;
  }
  
  .tarea-item {
    padding: 12px;
  }
  
  .texto-tarea {
    font-size: 14px;
  }
}
</style>