<template>
  <div class="album-container">
    
    <!-- ===== HEADER ===== -->
    <header class="header">
      <div class="header-left">
        <svg class="icon icon-lg" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          <line x1="8" y1="7" x2="16" y2="7"/>
          <line x1="8" y1="11" x2="16" y2="11"/>
          <line x1="8" y1="15" x2="12" y2="15"/>
        </svg>
        <h1>Mi Cuaderno</h1>
      </div>
      <div class="header-actions">
        <button class="btn-tema" @click="$emit('alternar-tema')" title="Cambiar tema">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- ===== VISTA: LISTA DE ÁLBUMES ===== -->
    <div v-if="!albumActivo" class="vista-albumes">
      
      <div class="crear-album">
        <input 
          v-model="nuevoAlbumNombre" 
          @keyup.enter="crearAlbum"
          placeholder="Nombre del cuaderno..."
          class="input-nombre"
          maxlength="30"
        />
        <button class="btn-crear" @click="crearAlbum" :disabled="!nuevoAlbumNombre.trim()">
          <svg class="icon" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nuevo
        </button>
      </div>

      <div class="grid-albumes">
        <div 
          v-for="album in albumes" 
          :key="album.id"
          class="album-card pop"
          @click="abrirAlbum(album.id)"
        >
          <div class="album-portada" :style="{ background: album.color }">
            <span class="album-emoji">{{ album.emoji }}</span>
            <span class="album-cantidad">{{ album.fotos.length }} fotos</span>
          </div>
          <div class="album-info">
            <h3>{{ album.nombre }}</h3>
            <p>{{ album.fotos.length }} imágenes</p>
          </div>
          <button class="btn-eliminar-album" @click.stop="confirmarEliminarAlbum(album.id)">
            <svg class="icon" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>

        <div v-if="albumes.length === 0" class="mensaje-vacio">
          <svg class="icon icon-xl" viewBox="0 0 24 24">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          <h3>¡Crea tu primer cuaderno!</h3>
          <p>Escribe un nombre y presiona "Nuevo"</p>
        </div>
      </div>

    </div>

    <!-- ===== VISTA: ÁLBUM ABIERTO ===== -->
    <div v-else class="vista-album">
      
      <div class="album-header">
        <button class="btn-volver" @click="cerrarAlbum">
          <svg class="icon" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver
        </button>
        <h2>{{ albumActual.nombre }}</h2>
        <button class="btn-subir" @click="abrirSelector">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </button>
      </div>

      <input 
        type="file" 
        accept="image/*" 
        multiple
        ref="inputArchivo"
        @change="subirFotos"
        class="input-oculto"
      />

      <div class="grid-fotos">
        <div 
          v-for="(foto, index) in albumActual.fotos" 
          :key="foto.id"
          class="foto-item fade-in"
          :style="{ animationDelay: (index * 0.03) + 's' }"
          @click="abrirModal(index)"
        >
          <img :src="foto.url" :alt="foto.nombre" loading="lazy" />
          <button class="btn-eliminar-foto" @click.stop="confirmarEliminarFoto(index)">
            <svg class="icon" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div v-if="albumActual.fotos.length === 0" class="mensaje-vacio-fotos">
          <svg class="icon icon-xl" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <p>Sube tus primeras fotos</p>
          <span>Haz clic en el botón +</span>
        </div>
      </div>

      <div class="contador-fotos">
        <span>{{ albumActual.fotos.length }} fotos</span>
      </div>

    </div>

    <!-- ===== MODAL DE FOTO ===== -->
    <div v-if="modalAbierto" class="modal-overlay" @click="cerrarModal">
      <div class="modal-contenido pop" @click.stop>
        <button class="btn-cerrar-modal" @click="cerrarModal">
          <svg class="icon" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <img :src="fotoModal?.url" :alt="fotoModal?.nombre" />
        <div class="modal-info">
          <span>{{ fotoModal?.nombre }}</span>
        </div>
      </div>
    </div>

    <!-- ===== MODALES DE CONFIRMACIÓN ===== -->
    
    <ModalConfirmacion
      :visible="mostrarModalEliminarAlbum"
      titulo="¿Eliminar cuaderno?"
      mensaje="Esto eliminará el cuaderno y todas sus fotos. Esta acción no se puede deshacer."
      textoConfirmar="Eliminar"
      textoCancelar="Cancelar"
      tipo="danger"
      @confirmar="eliminarAlbumConfirmado"
      @cancelar="cancelarEliminarAlbum"
    />

    <ModalConfirmacion
      :visible="mostrarModalEliminarFoto"
      titulo="¿Eliminar foto?"
      mensaje="Esta acción eliminará la foto permanentemente."
      textoConfirmar="Eliminar"
      textoCancelar="Cancelar"
      tipo="danger"
      @confirmar="eliminarFotoConfirmado"
      @cancelar="cancelarEliminarFoto"
    />

    <!-- ===== FOOTER ===== -->
    <footer class="footer">
      <p>
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
        {{ new Date().getFullYear() }} Mi Cuaderno · {{ albumes.length }} cuadernos
      </p>
    </footer>

  </div>
</template>

<script>
import ModalConfirmacion from './ModalConfirmacion.vue'

export default {
  name: 'AlbumFotos',
  
  components: {
    ModalConfirmacion
  },
  
  emits: ['alternar-tema'],
  
  data() {
    return {
      albumes: [],
      albumActivo: null,
      nuevoAlbumNombre: '',
      
      modalAbierto: false,
      indiceModal: null,
      
      mostrarModalEliminarAlbum: false,
      albumAEliminar: null,
      
      mostrarModalEliminarFoto: false,
      fotoAEliminar: null,
      
      inputArchivo: null,
      
      colores: [
        '#ede4ff', '#dcc8f8', '#c8b0f0', '#b094e8',
        '#fce7f3', '#fbcfe8', '#f9a8d4',
        '#d1fae5', '#a7f3d0',
        '#fef3c7', '#fde68a'
      ],
      
      emojis: ['📓', '📘', '📙', '📗', '📒', '📕', '📔', '📚', '🌸', '🌊', '⭐', '🌈', '🎀', '💎', '🌺', '🦋', '🌙', '☀️', '🍀']
    }
  },
  
  computed: {
    albumActual() {
      return this.albumes.find(a => a.id === this.albumActivo)
    },
    fotoModal() {
      if (this.indiceModal !== null && this.albumActual) {
        return this.albumActual.fotos[this.indiceModal]
      }
      return null
    }
  },
  
  mounted() {
    this.cargarAlbumes()
  },
  
  methods: {
    crearAlbum() {
      const nombre = this.nuevoAlbumNombre.trim()
      if (!nombre) return
      
      const color = this.colores[this.albumes.length % this.colores.length]
      const emoji = this.emojis[this.albumes.length % this.emojis.length]
      
      this.albumes.push({
        id: Date.now(),
        nombre,
        color,
        emoji,
        fotos: []
      })
      
      this.nuevoAlbumNombre = ''
      this.guardarAlbumes()
    },
    
    confirmarEliminarAlbum(id) {
      this.albumAEliminar = id
      this.mostrarModalEliminarAlbum = true
    },
    
    eliminarAlbumConfirmado() {
      if (this.albumAEliminar) {
        this.albumes = this.albumes.filter(a => a.id !== this.albumAEliminar)
        if (this.albumActivo === this.albumAEliminar) {
          this.albumActivo = null
        }
        this.guardarAlbumes()
      }
      this.cancelarEliminarAlbum()
    },
    
    cancelarEliminarAlbum() {
      this.mostrarModalEliminarAlbum = false
      this.albumAEliminar = null
    },
    
    abrirAlbum(id) {
      this.albumActivo = id
    },
    
    cerrarAlbum() {
      this.albumActivo = null
    },
    
    abrirSelector() {
      this.$refs.inputArchivo.click()
    },
    
    subirFotos(event) {
      const archivos = event.target.files
      const album = this.albumActual
      if (!album) return
      
      for (const archivo of archivos) {
        if (archivo.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onload = (e) => {
            album.fotos.push({
              id: Date.now() + Math.random(),
              url: e.target.result,
              nombre: archivo.name,
              fecha: new Date().toISOString()
            })
            this.guardarAlbumes()
          }
          reader.readAsDataURL(archivo)
        }
      }
      
      this.$refs.inputArchivo.value = ''
    },
    
    confirmarEliminarFoto(index) {
      this.fotoAEliminar = index
      this.mostrarModalEliminarFoto = true
    },
    
    eliminarFotoConfirmado() {
      if (this.fotoAEliminar !== null && this.albumActual) {
        this.albumActual.fotos.splice(this.fotoAEliminar, 1)
        this.guardarAlbumes()
      }
      this.cancelarEliminarFoto()
    },
    
    cancelarEliminarFoto() {
      this.mostrarModalEliminarFoto = false
      this.fotoAEliminar = null
    },
    
    abrirModal(index) {
      this.indiceModal = index
      this.modalAbierto = true
      document.body.style.overflow = 'hidden'
    },
    
    cerrarModal() {
      this.modalAbierto = false
      this.indiceModal = null
      document.body.style.overflow = 'auto'
    },
    
    guardarAlbumes() {
      localStorage.setItem('albumesFotos', JSON.stringify(this.albumes))
    },
    
    cargarAlbumes() {
      const guardado = localStorage.getItem('albumesFotos')
      if (guardado) {
        try {
          this.albumes = JSON.parse(guardado)
        } catch {
          this.albumes = []
        }
      }
    }
  }
}
</script>

<style scoped>
.album-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(124, 58, 237, 0.06);
  min-height: 100vh;
  transition: var(--transition);
  position: relative;
}

@media (min-width: 600px) {
  .album-container {
    min-height: auto;
    margin: 20px auto;
    padding: 30px;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
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

.vista-albumes {
  animation: fadeIn 0.4s ease-out;
}

.crear-album {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input-nombre {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  transition: var(--transition);
}

.input-nombre:focus {
  outline: none;
  border-color: var(--violet-400);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.btn-crear {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  background: linear-gradient(135deg, var(--violet-600), var(--violet-800));
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Nunito', sans-serif;
  white-space: nowrap;
}

.btn-crear:hover:not(:disabled) {
  transform: scale(1.03);
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3);
}

.btn-crear:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-crear .icon {
  width: 18px;
  height: 18px;
}

.grid-albumes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 14px;
}

.album-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 2px solid var(--border-color);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
}

.album-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--violet-300);
}

.album-portada {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.album-emoji {
  font-size: 36px;
  margin-bottom: 4px;
}

.album-cantidad {
  font-size: 12px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.8);
  padding: 2px 12px;
  border-radius: 12px;
}

.album-info {
  padding: 10px 12px;
}

.album-info h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.album-info p {
  font-size: 12px;
  color: var(--text-muted);
}

.btn-eliminar-album {
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 4px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  transition: var(--transition);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.album-card:hover .btn-eliminar-album {
  opacity: 1;
}

.btn-eliminar-album:hover {
  background: var(--violet-100);
  transform: scale(1.1);
}

.btn-eliminar-album .icon {
  width: 16px;
  height: 16px;
  color: var(--violet-600);
}

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

.vista-album {
  animation: fadeIn 0.4s ease-out;
}

.album-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.btn-volver {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px;
  background: var(--violet-100);
  border: none;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Nunito', sans-serif;
}

.btn-volver:hover {
  background: var(--violet-200);
  transform: scale(1.02);
}

.btn-volver .icon {
  width: 18px;
  height: 18px;
}

.album-header h2 {
  flex: 1;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-subir {
  padding: 8px 12px;
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

.btn-subir:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3);
}

.btn-subir .icon {
  width: 20px;
  height: 20px;
}

.input-oculto {
  display: none;
}

.grid-fotos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.foto-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-input);
  cursor: pointer;
  border: 2px solid var(--border-color);
  transition: var(--transition);
}

.foto-item:hover {
  transform: scale(1.02);
  border-color: var(--violet-400);
}

.foto-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-eliminar-foto {
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 4px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  transition: var(--transition);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.foto-item:hover .btn-eliminar-foto {
  opacity: 1;
}

.btn-eliminar-foto:hover {
  background: var(--violet-100);
  transform: scale(1.1);
}

.btn-eliminar-foto .icon {
  width: 16px;
  height: 16px;
  color: var(--violet-600);
}

.contador-fotos {
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 4px;
}

.mensaje-vacio-fotos {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);
}

.mensaje-vacio-fotos .icon {
  color: var(--violet-300);
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
}

.mensaje-vacio-fotos p {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-secondary);
}

.mensaje-vacio-fotos span {
  font-size: 13px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
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
  max-width: 400px;
  width: 100%;
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-lg);
  border: 2px solid var(--violet-300);
}

.btn-cerrar-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  transition: var(--transition);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-cerrar-modal:hover {
  transform: scale(1.1);
  background: white;
}

.btn-cerrar-modal .icon {
  width: 20px;
  height: 20px;
}

.modal-contenido img {
  width: 100%;
  height: auto;
  display: block;
}

.modal-info {
  padding: 12px 16px;
  text-align: center;
}

.modal-info span {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

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

@media (max-width: 480px) {
  .album-container {
    padding: 16px;
    border-radius: 0;
    margin: 0;
    min-height: 100vh;
  }
  
  .grid-albumes {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }
  
  .grid-fotos {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
  
  .crear-album {
    flex-direction: column;
  }
  
  .btn-crear {
    justify-content: center;
  }
  
  .album-header {
    flex-wrap: wrap;
  }
  
  .album-header h2 {
    font-size: 16px;
    order: 3;
    width: 100%;
    text-align: center;
  }
  
  .btn-volver {
    order: 1;
  }
  
  .btn-subir {
    order: 2;
  }
  
  .modal-contenido {
    max-width: 95%;
  }
}

@media (min-width: 601px) {
  .grid-albumes {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
  
  .grid-fotos {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>