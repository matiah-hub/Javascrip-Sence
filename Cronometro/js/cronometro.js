class Cronometro {
    constructor() {
        this.inicio = new Date();
        console.log(`Este objeto fue creado a las ${this.inicio.getHours()}:${this.inicio.getMinutes()}:${this.inicio.getSeconds()}`);
    }

    mostrarTiempo() {
        const ahora = new Date();
        const diferenciaMs = ahora - this.inicio;
        const segundosTotales = Math.floor(diferenciaMs / 1000);
        const minutos = Math.floor(segundosTotales / 60);
        const segundos = segundosTotales % 60;

        const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        console.log(`Tiempo transcurrido: ${tiempoFormateado}`);
    }

    reiniciar() {
        this.inicio = new Date();
        console.log("Cronómetro reiniciado a cero");
    }
}

class Sumatoria {
    constructor(base) {
        this.base = base;
        this.numeroActual = base;
        this.acumulado = 0;
        this.pasos = [];
        console.log(`[Constructor] Objeto creado con base = ${base}`);
    }

    sumar() {
        this.acumulado += this.numeroActual;
        this.pasos.push(this.numeroActual);
        
        const operacion = this.pasos.join("+");
        console.log(`[sumar()] Sumatoria: ${operacion} = ${this.acumulado}`);
        
        this.numeroActual++;
    }
}

const miReloj = new Cronometro();

const baseAleatoria = Math.floor(Math.random() * 10) + 1;
const miSuma = new Sumatoria(baseAleatoria);