
let a = parseFloat(prompt("Ingrese el valor de a :"));
let b = parseFloat(prompt("Ingrese el valor de b :"));
let c = parseFloat(prompt("Ingrese el valor de c :"));

if (isNaN(a) || isNaN(b) || isNaN(c)) {
    alert("Error: Por favor, ingrese valores numéricos válidos para a, b y c.");
    document.write("<h1>Error en la entrada de datos. Recargue la página.</h1>");
    throw new Error("Valores de entrada inválidos.");
}

function calcularDiscriminante(a, b, c) {

    const discriminante = Math.pow(b, 2) - (4 * a * c);
    return discriminante;
}

const delta = calcularDiscriminante(a, b, c);

let resultadoHTML = `
    <h1>🔢 Solución de Ecuación Cuadrática</h1>
    <p>Ecuación: ${a}x² + ${b}x + ${c} = 0</p>
    <p>Discriminante ($\Delta$ = b² - 4ac): ${delta.toFixed(2)}</p>
    <hr>
`;
let mensajeAlert = "";
let mensajeConsola = `Ecuación: ${a}x² + ${b}x + ${c} = 0 | Discriminante: ${delta.toFixed(2)}`;

if (delta > 0) {
    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
    const x2 = (-b - Math.sqrt(delta)) / (2 * a);

    resultadoHTML += `
        <h2>✅ DOS SOLUCIONES REALES:</h2>
        <p style="font-size: 1.2em;">x₁ = ${x1.toFixed(4)}</p>
        <p style="font-size: 1.2em;">x₂ = ${x2.toFixed(4)}</p>
    `;
    mensajeAlert = `DOS SOLUCIONES REALES:\nx1 = ${x1.toFixed(4)}\nx2 = ${x2.toFixed(4)}`;
    mensajeConsola += ` | Soluciones: x1=${x1.toFixed(4)}, x2=${x2.toFixed(4)}`;

} else if (delta === 0) {
    const x = -b / (2 * a);

    resultadoHTML += `
        <h2>⚠️ UNA ÚNICA SOLUCIÓN REAL:</h2>
        <p style="font-size: 1.5em; font-weight: bold;">x = ${x.toFixed(4)}</p>
    `;
    mensajeAlert = `UNA ÚNICA SOLUCIÓN REAL:\nx = ${x.toFixed(4)}`;
    mensajeConsola += ` | Solución Única: x=${x.toFixed(4)}`;

} else {
    resultadoHTML += `
        <h2>❌ SIN SOLUCIONES REALES:</h2>
        <p>El discriminante es negativo. No existen soluciones reales.</p>
    `;
    mensajeAlert = "SIN SOLUCIONES REALES: Discriminante negativo.";
    mensajeConsola += ` | No hay soluciones reales.`;
}



alert(mensajeAlert);


console.log(mensajeConsola);


const resultadoDiv = document.getElementById('resultado');
if (resultadoDiv) {
    resultadoDiv.innerHTML = resultadoHTML;
} else {

    document.write(resultadoHTML);
}