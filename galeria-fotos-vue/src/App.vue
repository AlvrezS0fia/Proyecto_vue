<template>
  <div class="app-wrapper">
    <AlbumFotos @alternar-tema="alternarTema" />
  </div>
</template>

<script>
import AlbumFotos from './components/AlbumFotos.vue'

export default {
  name: 'App',
  components: { AlbumFotos },
  
  data() {
    return { temaOscuro: false }
  },
  
  watch: {
    temaOscuro(valor) {
      if (valor) {
        document.body.classList.add('tema-oscuro')
        localStorage.setItem('temaAlbum', 'oscuro')
      } else {
        document.body.classList.remove('tema-oscuro')
        localStorage.setItem('temaAlbum', 'claro')
      }
    }
  },
  
  mounted() {
    const tema = localStorage.getItem('temaAlbum')
    if (tema === 'oscuro') this.temaOscuro = true
  },
  
  methods: {
    alternarTema() {
      this.temaOscuro = !this.temaOscuro
    }
  }
}
</script>

<style scoped>
.app-wrapper {
  max-width: 540px;
  margin: 0 auto;
}

@media (min-width: 601px) {
  .app-wrapper {
    padding: 10px;
  }
}
</style>