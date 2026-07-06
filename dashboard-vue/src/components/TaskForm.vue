<template>
  <div class="task-form">
    <div class="form-header">
      <h3>
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
          <polyline points="9 11 12 14 22 4"/>
        </svg>
        {{ editando ? 'Editar Tarea' : 'Nueva Tarea' }}
      </h3>
      <button class="btn-cerrar" @click="$emit('cerrar')">
        <svg class="icon" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>

    <div class="form-body">
      <!-- Título -->
      <div class="form-group">
        <label for="titulo">Título de la tarea *</label>
        <input 
          id="titulo"
          v-model="form.titulo" 
          placeholder="Ej: Revisar correos pendientes"
          maxlength="60"
          required
        />
      </div>

      <!-- Descripción -->
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea 
          id="descripcion"
          v-model="form.descripcion" 
          placeholder="Describe la tarea en detalle..."
          rows="3"
        ></textarea>
      </div>

      <!-- Categoría -->
      <div class="form-row">
        <div class="form-group">
          <label for="categoria">Categoría</label>
          <select id="categoria" v-model="form.categoria">
            <option value="Trabajo">💼 Trabajo</option>
            <option value="Estudio">📚 Estudio</option>
            <option value="Personal">🧘 Personal</option>
            <option value="Hogar">🏠 Hogar</option>
            <option value="Salud">💪 Salud</option>
            <option value="Finanzas">💰 Finanzas</option>
          </select>
        </div>

        <div class="form-group">
          <label for="prioridad">Prioridad</label>
          <select id="prioridad" v-model="form.prioridad">
            <option value="baja">🟢 Baja</option>
            <option value="media">🟡 Media</option>
            <option value="alta">🔴 Alta</option>
            <option value="urgente">🟣 Urgente</option>
          </select>
        </div>
      </div>

      <!-- Fecha y hora -->
      <div class="form-row">
        <div class="form-group">
          <label for="fecha">Fecha límite</label>
          <input id="fecha" type="date" v-model="form.fecha" />
        </div>

        <div class="form-group">
          <label for="hora">Hora</label>
          <input id="hora" type="time" v-model="form.hora" />
        </div>
      </div>

      <!-- Etiquetas -->
      <div class="form-group">
        <label for="etiquetas">Etiquetas</label>
        <input 
          id="etiquetas"
          v-model="form.etiquetasText" 
          placeholder="Ej: vue, proyecto, importante (separadas por comas)"
        />
      </div>

      <!-- Subtareas -->
      <div class="form-group">
        <label>Subtareas</label>
        <div class="subtasks-list">
          <div v-for="(sub, idx) in form.subtareas" :key="idx" class="subtask-item">
            <span>{{ sub }}</span>
            <button @click="eliminarSubtarea(idx)" class="btn-remove">
              <svg class="icon" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="add-subtask">
          <input 
            v-model="nuevaSubtarea" 
            placeholder="Añadir subtarea..."
            @keyup.enter="agregarSubtarea"
          />
          <button class="btn-add" @click="agregarSubtarea">+</button>
        </div>
      </div>

      <!-- Archivos adjuntos -->
      <div class="form-group">
        <label for="archivo">Adjuntar archivo</label>
        <input id="archivo" type="file" @change="handleArchivo" />
        <span v-if="form.archivo" class="archivo-nombre">{{ form.archivo.name }}</span>
      </div>

      <!-- Recordatorio -->
      <div class="form-group checkbox-group">
        <input id="recordatorio" type="checkbox" v-model="form.recordatorio" />
        <label for="recordatorio">Activar recordatorio</label>
      </div>

      <!-- Nota adicional -->
      <div class="form-group">
        <label for="nota">Nota adicional</label>
        <textarea 
          id="nota"
          v-model="form.nota" 
          placeholder="Información adicional..."
          rows="2"
        ></textarea>
      </div>
    </div>

    <div class="form-footer">
      <button class="btn-cancelar" @click="$emit('cerrar')">Cancelar</button>
      <button class="btn-guardar" @click="guardar">
        <svg class="icon" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        {{ editando ? 'Actualizar' : 'Crear Tarea' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    tareaEditando: {
      type: Object,
      default: null
    }
  },
  emits: ['guardar', 'cerrar'],
  data() {
    return {
      form: {
        titulo: '',
        descripcion: '',
        categoria: 'Trabajo',
        prioridad: 'media',
        fecha: '',
        hora: '',
        etiquetasText: '',
        subtareas: [],
        archivo: null,
        recordatorio: false,
        nota: ''
      },
      nuevaSubtarea: ''
    }
  },
  computed: {
    editando() {
      return this.tareaEditando !== null
    }
  },
  watch: {
    tareaEditando: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = {
            ...val,
            etiquetasText: val.etiquetas ? val.etiquetas.join(', ') : '',
            archivo: null
          }
        }
      }
    }
  },
  methods: {
    agregarSubtarea() {
      if (this.nuevaSubtarea.trim()) {
        this.form.subtareas.push(this.nuevaSubtarea.trim())
        this.nuevaSubtarea = ''
      }
    },
    eliminarSubtarea(idx) {
      this.form.subtareas.splice(idx, 1)
    },
    handleArchivo(event) {
      this.form.archivo = event.target.files[0]
    },
    guardar() {
      if (!this.form.titulo.trim()) {
        alert('El título es obligatorio')
        return
      }
      const tarea = {
        ...this.form,
        id: this.tareaEditando?.id || Date.now(),
        etiquetas: this.form.etiquetasText.split(',').map(t => t.trim()).filter(t => t),
        completada: this.tareaEditando?.completada || false,
        creada: this.tareaEditando?.creada || new Date().toISOString()
      }
      this.$emit('guardar', tarea)
    }
  }
}
</script>

<style scoped>
.task-form {
  padding: 20px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.form-header h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

.form-header h3 .icon {
  color: var(--violet-500);
}

.btn-cerrar {
  padding: 6px;
  border: none;
  border-radius: 50%;
  background: var(--bg-input);
  cursor: pointer;
  transition: var(--transition);
}

.btn-cerrar:hover {
  background: var(--violet-100);
  transform: scale(1.1);
}

.btn-cerrar .icon {
  width: 20px;
  height: 20px;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 14px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  transition: var(--transition);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--violet-400);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--violet-600);
  cursor: pointer;
}

.subtasks-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
}

.subtask-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: var(--violet-100);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--violet-700);
}

.subtask-item .btn-remove {
  padding: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.subtask-item .btn-remove .icon {
  width: 14px;
  height: 14px;
  color: var(--violet-500);
}

.add-subtask {
  display: flex;
  gap: 8px;
}

.add-subtask input {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  font-size: 13px;
  font-family: 'Nunito', sans-serif;
}

.btn-add {
  padding: 8px 14px;
  background: var(--violet-500);
  color: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
}

.archivo-nombre {
  font-size: 12px;
  color: var(--text-muted);
}

.form-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.form-footer button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border: none;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Nunito', sans-serif;
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

.btn-guardar {
  background: linear-gradient(135deg, var(--violet-600), var(--violet-800));
  color: white;
}

.btn-guardar:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3);
}

.btn-guardar .icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-footer {
    flex-direction: column;
  }
  
  .form-footer button {
    justify-content: center;
  }
}
</style>