<template>
  <div class="app-wrapper">
    <DashboardProfesional @alternar-tema="alternarTema" />
  </div>
</template>

<script>
import DashboardProfesional from './components/DashboardProfesional.vue'

export default {
  name: 'App',
  components: { DashboardProfesional },
  
  data() {
    return { temaOscuro: false }
  },
  
  watch: {
    temaOscuro(valor) {
      if (valor) {
        document.body.classList.add('tema-oscuro')
        localStorage.setItem('temaDashboard', 'oscuro')
      } else {
        document.body.classList.remove('tema-oscuro')
        localStorage.setItem('temaDashboard', 'claro')
      }
    }
  },
  
  mounted() {
    const tema = localStorage.getItem('temaDashboard')
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
  max-width: 1440px;
  margin: 0 auto;
  padding: 0;
}

@media (min-width: 768px) {
  .app-wrapper {
    padding: 0 10px;
  }
}
</style>