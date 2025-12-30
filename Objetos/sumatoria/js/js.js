class Sumatoria {
    constructor(base) {
        this.numeroActual = base;
        this.acumulado = 0;    
        this.pasos = [];        
        
        console.log(`[Constructor] Objeto creado con base = ${base}`);
    }

    sumar() {
        this.pasos.push(this.numeroActual);
        
        this.acumulado += this.numeroActual;
        
        document.getElementById("resultado").innerText = this.acumulado;
        document.getElementById("log-secuencia").innerText = `Secuencia: ${this.pasos.join(' + ')}`;
        
        console.log(`Sumando ${this.numeroActual}. Total acumulado: ${this.acumulado}`);
        
        this.numeroActual++;
    }
}

const numeroAzar = Math.floor(Math.random() * 10) + 1;

const miOperacion = new Sumatoria(numeroAzar);

function ejecutarSuma() {
    miOperacion.sumar();
}