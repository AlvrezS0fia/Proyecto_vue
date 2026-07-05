<template>
  <div class="app-container">
    <ConversorFlip @alternar-tema="alternarTema" />
  </div>
</template>

<script>
import ConversorFlip from './components/ConversorFlip.vue'

export default {
  name: 'App',
  components: { ConversorFlip },
  
  data() {
    return { temaOscuro: false }
  },
  
  watch: {
    temaOscuro(valor) {
      if (valor) {
        document.body.classList.add('tema-oscuro')
        localStorage.setItem('temaConversor3D', 'oscuro')
      } else {
        document.body.classList.remove('tema-oscuro')
        localStorage.setItem('temaConversor3D', 'claro')
      }
    }
  },
  
  mounted() {
    const tema = localStorage.getItem('temaConversor3D')
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
.app-container {
  max-width: 560px;
  margin: 0 auto;
  padding: 10px;
}

@media (max-width: 520px) {
  .app-container {
    padding: 0;
  }
}
</style>