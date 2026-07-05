<template>
  <div class="app-container">
    <CalculadoraFlip @alternar-tema="alternarTema" />
  </div>
</template>

<script>
import CalculadoraFlip from './components/CalculadoraFlip.vue'

export default {
  name: 'App',
  components: {
    CalculadoraFlip
  },
  data() {
    return {
      temaOscuro: false
    }
  },
  watch: {
    temaOscuro(valor) {
      if (valor) {
        document.body.classList.add('tema-oscuro')
        localStorage.setItem('temaCalculadora', 'oscuro')
      } else {
        document.body.classList.remove('tema-oscuro')
        localStorage.setItem('temaCalculadora', 'claro')
      }
    }
  },
  mounted() {
    const tema = localStorage.getItem('temaCalculadora')
    if (tema === 'oscuro') {
      this.temaOscuro = true
    }
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
  max-width: 520px;
  margin: 20px auto;
  padding: 10px;
}

@media (max-width: 520px) {
  .app-container {
    padding: 0;
    margin: 10px auto;
  }
}
</style>