<template>
  <div class="app-wrapper">
    <MemoTest @alternar-tema="alternarTema" />
  </div>
</template>

<script>
import MemoTest from './components/MemoTest.vue'

export default {
  name: 'App',
  components: { MemoTest },
  
  data() {
    return { temaOscuro: false }
  },
  
  watch: {
    temaOscuro(valor) {
      if (valor) {
        document.body.classList.add('tema-oscuro')
        localStorage.setItem('temaMemoTest', 'oscuro')
      } else {
        document.body.classList.remove('tema-oscuro')
        localStorage.setItem('temaMemoTest', 'claro')
      }
    }
  },
  
  mounted() {
    const tema = localStorage.getItem('temaMemoTest')
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
  max-width: 740px;
  margin: 0 auto;
  padding: 10px;
}

@media (max-width: 560px) {
  .app-wrapper {
    padding: 0;
  }
}
</style>