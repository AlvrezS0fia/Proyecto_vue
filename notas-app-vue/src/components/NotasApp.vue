<template>
  <div class="notas-container">
    
    <!-- ===== HEADER ===== -->
    <header class="header">
      <div class="header-left">
        <svg class="icon icon-lg" viewBox="0 0 24 24">
          <path d="M12 2v4"/>
          <path d="M12 18v4"/>
          <path d="M4.93 4.93l2.83 2.83"/>
          <path d="M16.24 16.24l2.83 2.83"/>
          <path d="M2 12h4"/>
          <path d="M18 12h4"/>
          <path d="M4.93 19.07l2.83-2.83"/>
          <path d="M16.24 7.76l2.83-2.83"/>
        </svg>
        <h1>Mis Notas</h1>
      </div>
      <div class="header-actions">
        <button class="btn-tema" @click="$emit('alternar-tema')" title="Cambiar tema">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- ===== BUSCADOR ===== -->
    <div class="buscador">
      <svg class="icon" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input 
        v-model="busqueda" 
        placeholder="Buscar notas..."
        class="input-buscar"
      />
    </div>

    <!-- ===== FILTROS ===== -->
    <div class="filtros">
      <button 
        v-for="filtro in opcionesFiltro" 
        :key="filtro.valor"
        class="filtro-btn"
        :class="{ activo: filtroActivo === filtro.valor }"
        @click="filtroActivo = filtro.valor"
      >
        {{ filtro.etiqueta }}
        <span class="badge">{{ obtenerConteo(filtro.valor) }}</span>
      </button>
    </div>

    <!-- ===== BOTÓN NUEVA NOTA ===== -->
    <button class="btn-nueva" @click="abrirModalNota">
      <svg class="icon" viewBox="0 0 24 24">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      Nueva Nota
    </button>

    <!-- ===== LISTA DE NOTAS ===== -->
    <div class="grid-notas">
      <div 
        v-for="(nota, index) in notasFiltradas" 
        :key="nota.id"
        class="nota-card fade-in"
        :style="{ 
          background: nota.color,
          animationDelay: (index * 0.03) + 's',
          borderLeft: '4px solid ' + nota.color
        }"
      >
        <div class="nota-header">
          <h3>{{ nota.titulo || 'Sin título' }}</h3>
          <div class="nota-acciones">
            <button class="btn-favorito" @click="toggleFavorito(index)" title="Favorito">
              <svg class="icon" viewBox="0 0 24 24" :fill="nota.favorita ? 'currentColor' : 'none'">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button class="btn-editar" @click="editarNota(index)" title="Editar">
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="btn-eliminar" @click="confirmarEliminar(index)" title="Eliminar">
              <svg class="icon" viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
        
        <p class="nota-contenido">{{ nota.contenido || 'Sin contenido' }}</p>
        
        <div class="nota-footer">
          <div class="nota-tags">
            <span v-for="tag in nota.tags" :key="tag" class="tag">
              #{{ tag }}
            </span>
          </div>
          <span class="nota-fecha">{{ formatearFecha(nota.fecha) }}</span>
        </div>
      </div>

      <!-- Mensaje vacío -->
      <div v-if="notasFiltradas.length === 0" class="mensaje-vacio">
        <svg class="icon icon-xl" viewBox="0 0 24 24">
          <path d="M12 2v4"/>
          <path d="M12 18v4"/>
          <path d="M4.93 4.93l2.83 2.83"/>
          <path d="M16.24 16.24l2.83 2.83"/>
          <path d="M2 12h4"/>
          <path d="M18 12h4"/>
          <path d="M4.93 19.07l2.83-2.83"/>
          <path d="M16.24 7.76l2.83-2.83"/>
        </svg>
        <h3>No hay notas</h3>
        <p>{{ busqueda ? 'No se encontraron resultados' : 'Crea tu primera nota' }}</p>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- ===== MODAL DE NOTA (CREAR/EDITAR) ===== -->
    <!-- ========================================== -->
    <div v-if="modalNotaAbierto" class="modal-overlay" @click.self="cerrarModalNota">
      <div class="modal-contenido pop" @click.stop>
        <div class="modal-header">
          <h3>{{ notaEditando !== null ? 'Editar Nota' : 'Nueva Nota' }}</h3>
          <button class="btn-cerrar-modal" @click="cerrarModalNota">
            <svg class="icon" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="modal-cuerpo">
          <input 
            v-model="notaActual.titulo" 
            placeholder="Título de la nota..."
            class="input-titulo"
            maxlength="50"
          />
          
          <textarea 
            v-model="notaActual.contenido" 
            placeholder="Escribe tu nota aquí..."
            class="input-contenido"
            rows="6"
          ></textarea>
          
          <input 
            v-model="notaActual.tagsText" 
            placeholder="Etiquetas (separadas por comas)..."
            class="input-tags"
          />

          <div class="selector-colores">
            <span class="label-colores">Color:</span>
            <div class="colores">
              <button 
                v-for="color in colores" 
                :key="color"
                class="btn-color"
                :style="{ background: color }"
                :class="{ activo: notaActual.color === color }"
                @click="notaActual.color = color"
              />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancelar" @click="cerrarModalNota">Cancelar</button>
          <button class="btn-guardar" @click="guardarNota">
            <svg class="icon" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Guardar
          </button>
        </div>
      </div>
    </div>

    <!-- ===== MODAL DE CONFIRMACIÓN (ELIMINAR) ===== -->
    <ModalConfirmacion
      :visible="mostrarModalEliminar"
      titulo="¿Eliminar nota?"
      mensaje="Esta acción eliminará la nota permanentemente. ¿Estás seguro?"
      textoConfirmar="Eliminar"
      textoCancelar="Cancelar"
      tipo="danger"
      @confirmar="eliminarNota"
      @cancelar="cancelarEliminar"
    />

    <!-- ===== FOOTER ===== -->
    <footer class="footer">
      <p>
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
        {{ new Date().getFullYear() }} Mis Notas · {{ notas.length }} notas
      </p>
    </footer>

  </div>
</template>

<script>
import ModalConfirmacion from './ModalConfirmacion.vue'

export default {
  name: 'NotasApp',
  
  components: {
    ModalConfirmacion
  },
  
  emits: ['alternar-tema'],
  
  data() {
    return {
      // ===== NOTAS =====
      notas: [],
      
      // ===== BUSCADOR Y FILTROS =====
      busqueda: '',
      opcionesFiltro: [
        { valor: 'todas', etiqueta: 'Todas' },
        { valor: 'favoritas', etiqueta: 'Favoritas' }
      ],
      filtroActivo: 'todas',
      
      // ===== MODAL NOTA =====
      modalNotaAbierto: false,
      notaEditando: null,
      notaActual: {
        titulo: '',
        contenido: '',
        tags: [],
        tagsText: '',
        color: '#f5f0ff',
        favorita: false,
        fecha: null
      },
      
      // ===== MODAL ELIMINAR =====
      mostrarModalEliminar: false,
      indiceEliminar: null,
      
      // ===== COLORES =====
      colores: [
        '#f5f0ff', '#ede4ff', '#dcc8f8', '#c8b0f0',
        '#fce7f3', '#fbcfe8', '#f9a8d4',
        '#d1fae5', '#a7f3d0',
        '#fef3c7', '#fde68a',
        '#dbeafe', '#bfdbfe'
      ]
    }
  },
  
  computed: {
    notasFiltradas() {
      let resultado = this.notas
      
      // Filtro por favoritas
      if (this.filtroActivo === 'favoritas') {
        resultado = resultado.filter(n => n.favorita)
      }
      
      // Búsqueda por texto
      if (this.busqueda.trim()) {
        const termino = this.busqueda.toLowerCase().trim()
        resultado = resultado.filter(n => 
          n.titulo.toLowerCase().includes(termino) ||
          n.contenido.toLowerCase().includes(termino) ||
          n.tags.some(t => t.toLowerCase().includes(termino))
        )
      }
      
      return resultado
    }
  },
  
  mounted() {
    this.cargarNotas()
  },
  
  methods: {
    // ==========================================
    // ===== NOTAS =====
    // ==========================================
    abrirModalNota() {
      this.notaActual = {
        titulo: '',
        contenido: '',
        tags: [],
        tagsText: '',
        color: '#f5f0ff',
        favorita: false,
        fecha: new Date()
      }
      this.notaEditando = null
      this.modalNotaAbierto = true
    },
    
    editarNota(index) {
      const nota = this.notas[index]
      this.notaActual = {
        ...nota,
        tagsText: nota.tags.join(', ')
      }
      this.notaEditando = index
      this.modalNotaAbierto = true
    },
    
    guardarNota() {
      const nota = {
        id: this.notaActual.id || Date.now(),
        titulo: this.notaActual.titulo.trim() || 'Sin título',
        contenido: this.notaActual.contenido.trim() || 'Sin contenido',
        tags: this.notaActual.tagsText.split(',').map(t => t.trim()).filter(t => t),
        color: this.notaActual.color,
        favorita: this.notaActual.favorita || false,
        fecha: this.notaActual.fecha || new Date()
      }
      
      if (this.notaEditando !== null) {
        this.notas[this.notaEditando] = nota
      } else {
        this.notas.unshift(nota)
      }
      
      this.guardarNotas()
      this.cerrarModalNota()
    },
    
    confirmarEliminar(index) {
      this.indiceEliminar = index
      this.mostrarModalEliminar = true
    },
    
    eliminarNota() {
      if (this.indiceEliminar !== null) {
        this.notas.splice(this.indiceEliminar, 1)
        this.guardarNotas()
      }
      this.cancelarEliminar()
    },
    
    cancelarEliminar() {
      this.mostrarModalEliminar = false
      this.indiceEliminar = null
    },
    
    // ==========================================
    // ===== FAVORITOS =====
    // ==========================================
    toggleFavorito(index) {
      this.notas[index].favorita = !this.notas[index].favorita
      this.guardarNotas()
    },
    
    // ==========================================
    // ===== MODAL NOTA =====
    // ==========================================
    cerrarModalNota() {
      this.modalNotaAbierto = false
      this.notaEditando = null
    },
    
    // ==========================================
    // ===== PERSISTENCIA =====
    // ==========================================
    guardarNotas() {
      localStorage.setItem('notasApp', JSON.stringify(this.notas))
    },
    
    cargarNotas() {
      const guardado = localStorage.getItem('notasApp')
      if (guardado) {
        try {
          this.notas = JSON.parse(guardado)
        } catch {
          this.notas = []
        }
      }
    },
    
    // ==========================================
    // ===== UTILIDADES =====
    // ==========================================
    obtenerConteo(filtro) {
      if (filtro === 'todas') return this.notas.length
      if (filtro === 'favoritas') return this.notas.filter(n => n.favorita).length
      return 0
    },
    
    formatearFecha(fecha) {
      if (!fecha) return ''
      const d = new Date(fecha)
      return d.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
/* ========================================== */
/* ===== CONTENEDOR ===== */
/* ========================================== */

.notas-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(124, 58, 237, 0.06);
  min-height: 100vh;
  transition: var(--transition);
}

@media (min-width: 600px) {
  .notas-container {
    min-height: auto;
    margin: 20px auto;
    padding: 30px;
  }
}

/* ========================================== */
/* ===== HEADER ===== */
/* ========================================== */

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-left .icon {
  color: var(--violet-600);
}

.header h1 {
  font-size: 22px;
  font-weight: 800;
  color: var(--text-primary);
}

.header-actions {
  display: flex;
  gap: 8px;
}

.btn-tema {
  padding: 8px;
  border: none;
  background: var(--violet-100);
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

/* ========================================== */
/* ===== BUSCADOR ===== */
/* ========================================== */

.buscador {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  background: var(--bg-input);
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  margin-bottom: 16px;
  transition: var(--transition);
}

.buscador:focus-within {
  border-color: var(--violet-400);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.buscador .icon {
  color: var(--text-muted);
  width: 20px;
  height: 20px;
}

.input-buscar {
  flex: 1;
  padding: 12px 0;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  outline: none;
}

.input-buscar::placeholder {
  color: var(--text-muted);
}

/* ========================================== */
/* ===== FILTROS ===== */
/* ========================================== */

.filtros {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.filtro-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Nunito', sans-serif;
}

.filtro-btn:hover {
  background: var(--violet-100);
}

.filtro-btn.activo {
  background: var(--violet-600);
  color: white;
  border-color: var(--violet-600);
}

.filtro-btn .badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.filtro-btn.activo .badge {
  background: rgba(255, 255, 255, 0.25);
}

/* ========================================== */
/* ===== BOTÓN NUEVA NOTA ===== */
/* ========================================== */

.btn-nueva {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--violet-600), var(--violet-800));
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Nunito', sans-serif;
  margin-bottom: 20px;
}

.btn-nueva:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3);
}

.btn-nueva .icon {
  width: 20px;
  height: 20px;
}

/* ========================================== */
/* ===== GRID DE NOTAS ===== */
/* ========================================== */

.grid-notas {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.nota-card {
  padding: 16px 18px;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  transition: var(--transition);
  cursor: default;
}

.nota-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.nota-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 6px;
}

.nota-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  flex: 1;
}

.nota-acciones {
  display: flex;
  gap: 4px;
}

.nota-acciones button {
  padding: 4px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nota-acciones button:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: scale(1.1);
}

.btn-favorito .icon {
  width: 18px;
  height: 18px;
  color: var(--violet-400);
}

.btn-favorito .icon[fill="currentColor"] {
  color: var(--violet-600);
}

.btn-editar .icon {
  width: 18px;
  height: 18px;
  color: var(--violet-400);
}

.btn-editar:hover .icon {
  color: var(--violet-600);
}

.btn-eliminar .icon {
  width: 18px;
  height: 18px;
  color: var(--violet-400);
}

.btn-eliminar:hover .icon {
  color: var(--violet-700);
}

.nota-contenido {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 10px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.nota-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.nota-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--violet-600);
  background: rgba(124, 58, 237, 0.08);
  padding: 2px 10px;
  border-radius: 12px;
}

.nota-fecha {
  font-size: 11px;
  color: var(--text-muted);
}

/* ========================================== */
/* ===== MENSAJE VACÍO ===== */
/* ========================================== */

.mensaje-vacio {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);
}

.mensaje-vacio .icon {
  color: var(--violet-300);
  width: 56px;
  height: 56px;
  margin-bottom: 12px;
}

.mensaje-vacio h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.mensaje-vacio p {
  font-size: 14px;
}

/* ========================================== */
/* ===== MODAL NOTA ===== */
/* ========================================== */

.modal-overlay {
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

.modal-contenido {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  border: 2px solid var(--violet-300);
  padding: 28px 30px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.btn-cerrar-modal {
  padding: 6px;
  border: none;
  border-radius: 50%;
  background: var(--bg-input);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-cerrar-modal:hover {
  background: var(--violet-100);
  transform: scale(1.1);
}

.btn-cerrar-modal .icon {
  width: 20px;
  height: 20px;
}

.modal-cuerpo {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.input-titulo {
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  transition: var(--transition);
}

.input-titulo:focus {
  outline: none;
  border-color: var(--violet-400);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.input-contenido {
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  resize: vertical;
  transition: var(--transition);
}

.input-contenido:focus {
  outline: none;
  border-color: var(--violet-400);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.input-tags {
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  transition: var(--transition);
}

.input-tags:focus {
  outline: none;
  border-color: var(--violet-400);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.selector-colores {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label-colores {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.colores {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.btn-color {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: var(--transition);
}

.btn-color:hover {
  transform: scale(1.1);
}

.btn-color.activo {
  border-color: var(--violet-600);
  box-shadow: 0 0 0 2px white, 0 0 0 4px var(--violet-600);
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.modal-footer button {
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

/* ========================================== */
/* ===== FOOTER ===== */
/* ========================================== */

.footer {
  margin-top: 20px;
  padding-top: 14px;
  border-top: 2px solid var(--border-color);
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
  color: var(--violet-400);
}

/* ========================================== */
/* ===== RESPONSIVE ===== */
/* ========================================== */

@media (max-width: 480px) {
  .notas-container {
    padding: 16px;
    border-radius: 0;
    margin: 0;
    min-height: 100vh;
  }
  
  .modal-contenido {
    padding: 20px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-footer button {
    justify-content: center;
  }
  
  .selector-colores {
    flex-wrap: wrap;
  }
}

@media (min-width: 601px) {
  .grid-notas {
    grid-template-columns: 1fr;
  }
}
</style>