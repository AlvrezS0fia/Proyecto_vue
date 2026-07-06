<template>
  <div class="app-wrapper">
    <NotasApp @alternar-tema="alternarTema" />
  </div>
</template>

<script>
import NotasApp from './components/NotasApp.vue'

export default {
  name: 'App',
  components: { NotasApp },
  
  data() {
    return { temaOscuro: false }
  },
  
  watch: {
    temaOscuro(valor) {
      if (valor) {
        document.body.classList.add('tema-oscuro')
        localStorage.setItem('temaNotas', 'oscuro')
      } else {
        document.body.classList.remove('tema-oscuro')
        localStorage.setItem('temaNotas', 'claro')
      }
    }
  },
  
  mounted() {
    const tema = localStorage.getItem('temaNotas')
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
  max-width: 640px;
  margin: 0 auto;
}

@media (min-width: 601px) {
  .app-wrapper {
    padding: 10px;
  }
}
</style>