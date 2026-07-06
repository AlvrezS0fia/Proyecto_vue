<template>
  <div class="app-wrapper">
    <ClimaApp @alternar-tema="alternarTema" />
  </div>
</template>

<script>
import ClimaApp from './components/ClimaApp.vue'

export default {
  name: 'App',
  components: { ClimaApp },
  
  data() {
    return { temaOscuro: false }
  },
  
  watch: {
    temaOscuro(valor) {
      if (valor) {
        document.body.classList.add('tema-oscuro')
        localStorage.setItem('temaClima', 'oscuro')
      } else {
        document.body.classList.remove('tema-oscuro')
        localStorage.setItem('temaClima', 'claro')
      }
    }
  },
  
  mounted() {
    const tema = localStorage.getItem('temaClima')
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
  max-width: 620px;
  margin: 0 auto;
  padding: 10px;
}

@media (max-width: 520px) {
  .app-wrapper {
    padding: 0;
  }
}
</style>