
let numeros = [];
const CANTIDAD_NUMEROS = 3;

for (let i = 0; i < CANTIDAD_NUMEROS; i++) {
    let valorStr = prompt(`Ingrese el número ${i + 1} de ${CANTIDAD_NUMEROS}:`);
    let valorNum = parseFloat(valorStr);

    if (isNaN(valorNum)) {
        alert("Valor inválido. Se asignará 0 a esta entrada.");
        valorNum = 0;
    }
    
    numeros.push(valorNum);
}

console.log("Array original:", numeros);

let intercambioHecho;

do {
    intercambioHecho = false; 
    
    for (let i = 0; i < numeros.length - 1; i++) {
        
        if (numeros[i] > numeros[i + 1]) {
            
            
            let temp = numeros[i];
            
       
            numeros[i] = numeros[i + 1];
            
        
            numeros[i + 1] = temp;
            
        
            intercambioHecho = true;
        }
    }

} while (intercambioHecho); 

console.log("Array ordenado (Burbuja):", numeros);


const menorValor = numeros[0]; 


const mayorValor = numeros[numeros.length - 1]; 

let mensajeResultado;


if (menorValor === mayorValor) {
    mensajeResultado = `
        <h1>Resultado del Ordenamiento Burbuja</h1>
        <p>Los tres números ingresados (${menorValor}) son **IDÉNTICOS**.</p>
    `;
} else {
 
    mensajeResultado = `
        <h1>Resultado del Ordenamiento Burbuja</h1>
        <p>Números ingresados: ${numeros.join(', ')}</p>
        <p style="font-size: 1.5em; color: green;">El **MAYOR** valor es: ${mayorValor}</p>
        <p style="font-size: 1.5em; color: blue;">El **MENOR** valor es: ${menorValor}</p>
    `;
}


document.write(`
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
        h1 { color: #5D3FD3; } /* Color morado */
        p { margin: 10px 0; }
    </style>
    ${mensajeResultado}
`);