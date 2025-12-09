
let nota1, nota2, nota3, promedio; 
let mensajeResultado = "";

function calcularPromedio() {
    nota1 = parseFloat(prompt("Ingrese Nota 1:"));
    nota2 = parseFloat(prompt("Ingrese Nota 2:"));
    nota3 = parseFloat(prompt("Ingrese Nota 3:"));

    if(isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || nota1 < 0 || nota2 < 0 || nota3 < 0) {
        mensajeResultado = ("Error: una o más notas no son válidas. Recargue la página e intente con números positivos.");
        promedio = 0; 
        mostrarResultado(mensajeResultado, promedio.toFixed(2));
        return; 
    }
    
    promedio = (nota1 + nota2 + nota3) / 3; 
    const promedioformateado = promedio.toFixed(2);

    if(promedio >= 6.0){
        mensajeResultado = `¡Excelente! Tienes un promedio ${promedioformateado}.`;
    } else if (promedio >= 5.0){
        mensajeResultado = `Tienes un promedio ${promedioformateado}. ¡Sigue adelante, puedes mejorar!`; 
    } else if (promedio >= 4.0) { 
        mensajeResultado = `Tienes un promedio ${promedioformateado}. Debes esforzarte.`;
    } else { // Menor a 4.0
        mensajeResultado = `Has reprobado con ${promedioformateado}. Debes volver a intentarlo.`; 
    }

    mostrarResultado(mensajeResultado, promedioformateado);
}

function mostrarResultado(mensaje, valorPromedio) {
    const output = `${mensaje}\n--- Detalle ---\nNotas ingresadas: ${nota1}, ${nota2}, ${nota3}\nPromedio Calculado: ${valorPromedio}`;
    console.log("---Resultado cálculo promedio---") ;
    console.log(output);

    window.alert(mensaje);

    const resultadoDiv = document.getElementById("resultado-dom"); 

    if (resultadoDiv) {
        let estiloResultado = '';
        if (promedio >= 6.0) { estiloResultado = 'color: green; font-weight: bold;'; } 
        else if (promedio < 4.0) { estiloResultado = 'color: red; font-weight: bold;'; } 
        else { estiloResultado = 'color: orange;'; }

        resultadoDiv.innerHTML = `
            <h2 style="${estiloResultado}"> ${mensaje}</h2>
            <p>Promedio: <strong>${valorPromedio}</strong></p>
            <p style="font-size: 0.9em;">Notas: ${nota1}, ${nota2}, ${nota3}</p>
        `;
    } else {
        document.write( `
            <div style="padding: 20px; background-color: #f0f0f0; border: 1px solid #ccc;">
                <h1>Resultado (Document Write Fallback)</h1>
                <p>${mensaje}</p>
                <p>Promedio: ${valorPromedio}</p>
            </div> `);
    } 
}

calcularPromedio();