let numeroingresado = [];
let maxintentos = 3; 
const secreto = Math.floor(Math.random() * 10) + 1; 


function yausado (numero, listado) { 
    return listado.includes(numero);
}

function actualizarHistorial () {
    const historialdiv = document.getElementById('historial');
    if (historialdiv) {
        historialdiv.innerHTML = `Intentos anteriores: <strong>${numeroingresado.join(', ')}</strong>`; 
    }
}

function adivinanumero () {

    while (maxintentos > 0 ) {
        
        const inputNumero = prompt(`Adivina el número secreto (entre 1 y 10). Te quedan ${maxintentos} intentos.`);
        
        if (inputNumero === null) {
            alert("Juego cancelado. ¡Hasta la próxima!");
            return;
        }

        const numero = parseInt(inputNumero, 10); 

       
        if (isNaN(numero) || numero < 1 || numero > 10) { 
            alert("Por favor, ingresa un número válido entre 1 y 10. No se gasta intento."); 
            continue; 
        } 
        
      
        if (yausado(numero, numeroingresado)) {
            alert("Ya ingresaste ese número, intenta con otro. No se gasta intento.");
            continue; 
        }
        
      
        numeroingresado.push(numero);
        actualizarHistorial();
        
      
        if (numero === secreto) {
            alert(`¡Felicidades! Adivinaste el número secreto. Era el ${secreto}.`);
            return; 
        } else { 
            maxintentos--; 
            let mensaje = "Número incorrecto.";
            
            if (numero < secreto ){ 
                mensaje += " El número secreto es mayor.";
            } else {
                mensaje += " El número secreto es menor.";
            }

           
            if(maxintentos > 0) {
                alert(`${mensaje} Te quedan ${maxintentos} intentos.`);
            }
        }
    } 


    if (maxintentos === 0) {
        alert(`😭 Lo sentimos, has agotado tus 3 intentos. El número secreto era ${secreto}.`);
    }
}

adivinanumero();