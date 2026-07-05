<template>
  <div class="reloj">
    <div class="hora" id="horaDisplay">{{ horaFormateada }}</div>
    <div class="fecha">{{ fechaFormateada }}</div>
  </div>
</template>

<script>
export default {
  name: 'RelojDigital',
  props: {
    horaFormateada: {
      type: String,
      required: true
    },
    fechaFormateada: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.reloj {
  padding: 40px 20px;
  border-radius: var(--radius-lg);
  text-align: center;
  margin-bottom: 25px;
  transition: var(--transition-slow);
  position: relative;
  overflow: hidden;
}

.reloj::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.05), transparent 70%);
  pointer-events: none;
}

.hora {
  font-size: 80px;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  position: relative;
  z-index: 1;
  transition: var(--transition-slow);
  background: linear-gradient(135deg, #a78bfa, #7c3aed, #6d28d9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.fecha {
  font-size: 18px;
  margin-top: 8px;
  font-weight: 400;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

@media (max-width: 560px) {
  .reloj {
    padding: 30px 16px;
  }
  .hora {
    font-size: 52px;
  }
  .fecha {
    font-size: 16px;
  }
}

@media (max-width: 400px) {
  .hora {
    font-size: 40px;
  }
}
</style>