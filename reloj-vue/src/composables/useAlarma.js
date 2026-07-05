// Composables para manejar el sonido de alarma
export function useAlarma() {
  // Variable para almacenar el contexto de audio
  let audioContext = null
  let osciladores = []
  let ganancias = []
  
  // Detener todos los sonidos activos
  const detenerTodosLosSonidos = () => {
    try {
      // Detener y limpiar osciladores
      osciladores.forEach(osc => {
        try {
          osc.stop()
          osc.disconnect()
        } catch (e) {}
      })
      osciladores = []
      
      // Limpiar ganancias
      ganancias.forEach(gan => {
        try {
          gan.disconnect()
        } catch (e) {}
      })
      ganancias = []
      
      // Cerrar el contexto de audio
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close()
        audioContext = null
      }
    } catch (error) {
      console.error('Error al detener sonidos:', error)
    }
  }

  // Generar sonido de alarma que se repite infinitamente
  const generarSonidoAlarmaInfinito = () => {
    try {
      // Detener sonidos anteriores
      detenerTodosLosSonidos()
      
      // Crear contexto de audio
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      // Frecuencias y tiempos
      const frecuenciaBase = 440
      const duracionPitido = 0.15
      const pausa = 0.1
      
      let tiempo = audioContext.currentTime
      
      // Crear un loop infinito de pitidos
      const crearPitido = (tiempoInicio) => {
        // Oscilador principal
        const osc1 = audioContext.createOscillator()
        const gan1 = audioContext.createGain()
        osc1.type = 'square'
        osc1.frequency.setValueAtTime(frecuenciaBase, tiempoInicio)
        osc1.frequency.setValueAtTime(frecuenciaBase * 1.2, tiempoInicio + duracionPitido * 0.5)
        
        gan1.gain.setValueAtTime(0.01, tiempoInicio)
        gan1.gain.exponentialRampToValueAtTime(0.8, tiempoInicio + 0.01)
        gan1.gain.exponentialRampToValueAtTime(0.01, tiempoInicio + duracionPitido)
        
        osc1.connect(gan1)
        gan1.connect(audioContext.destination)
        
        osc1.start(tiempoInicio)
        osc1.stop(tiempoInicio + duracionPitido)
        
        osciladores.push(osc1)
        ganancias.push(gan1)
        
        // Oscilador secundario (armónico)
        const osc2 = audioContext.createOscillator()
        const gan2 = audioContext.createGain()
        osc2.type = 'sawtooth'
        osc2.frequency.setValueAtTime(frecuenciaBase * 1.5, tiempoInicio)
        
        gan2.gain.setValueAtTime(0.01, tiempoInicio)
        gan2.gain.exponentialRampToValueAtTime(0.3, tiempoInicio + 0.01)
        gan2.gain.exponentialRampToValueAtTime(0.01, tiempoInicio + duracionPitido)
        
        osc2.connect(gan2)
        gan2.connect(audioContext.destination)
        
        osc2.start(tiempoInicio)
        osc2.stop(tiempoInicio + duracionPitido)
        
        osciladores.push(osc2)
        ganancias.push(gan2)
      }
      
      // Crear una secuencia infinita de pitidos
      const programarSiguientePitido = () => {
        if (!audioContext || audioContext.state === 'closed') {
          return
        }
        
        const ahora = audioContext.currentTime
        crearPitido(ahora)
        
        // Programar el siguiente pitido después de la pausa
        const intervalo = duracionPitido + pausa
        setTimeout(() => {
          programarSiguientePitido()
        }, intervalo * 1000)
      }
      
      // Iniciar la secuencia
      programarSiguientePitido()
      
    } catch (error) {
      console.error('Error al reproducir alarma:', error)
      // Fallback: alerta del navegador
      alert('ALARMA! Son las ' + new Date().toLocaleTimeString())
    }
  }

  // Sonido de alarma suave (para pruebas)
  const sonidoSuave = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      
      const frecuencia = 880
      const duracion = 0.2
      
      let tiempo = ctx.currentTime
      
      for (let i = 0; i < 6; i++) {
        const osc = ctx.createOscillator()
        const gan = ctx.createGain()
        
        osc.type = 'sine'
        osc.frequency.setValueAtTime(frecuencia + (i % 2 === 0 ? 0 : 100), tiempo)
        
        gan.gain.setValueAtTime(0.01, tiempo)
        gan.gain.exponentialRampToValueAtTime(0.5, tiempo + 0.01)
        gan.gain.exponentialRampToValueAtTime(0.01, tiempo + duracion)
        
        osc.connect(gan)
        gan.connect(ctx.destination)
        
        osc.start(tiempo)
        osc.stop(tiempo + duracion)
        
        tiempo += duracion + 0.15
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Melodía de alarma
  const sonidoMelodia = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      
      const notas = [
        { freq: 523, dur: 0.15 },
        { freq: 659, dur: 0.15 },
        { freq: 784, dur: 0.2 },
        { freq: 880, dur: 0.2 },
        { freq: 784, dur: 0.15 },
        { freq: 659, dur: 0.15 },
        { freq: 523, dur: 0.3 },
      ]
      
      let tiempo = ctx.currentTime
      
      notas.forEach((nota) => {
        const osc = ctx.createOscillator()
        const gan = ctx.createGain()
        
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(nota.freq, tiempo)
        
        gan.gain.setValueAtTime(0.01, tiempo)
        gan.gain.exponentialRampToValueAtTime(0.6, tiempo + 0.02)
        gan.gain.exponentialRampToValueAtTime(0.01, tiempo + nota.dur)
        
        osc.connect(gan)
        gan.connect(ctx.destination)
        
        osc.start(tiempo)
        osc.stop(tiempo + nota.dur)
        
        tiempo += nota.dur + 0.05
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return {
    generarSonidoAlarmaInfinito,
    detenerTodosLosSonidos,
    sonidoSuave,
    sonidoMelodia
  }
}