function repetirPalabra() {
    const texto = document.getElementById("palabra").value;
    const veces = parseInt(document.getElementById("cantidad").value);
    const visor = document.getElementById("resultado1");
    
    visor.innerText = (texto + " ").repeat(veces);
}

function aplicarColor() {
    const color = document.getElementById("colorPicker").value;
    const parrafo = document.getElementById("parrafo");
    
    parrafo.style.backgroundColor = color;
}

function calcular() {
    const num1 = parseFloat(document.getElementById("n1").value);
    const num2 = parseFloat(document.getElementById("n2").value);
    const visor = document.getElementById("resultado3");

    const s = num1 + num2;
    const r = num1 - num2;
    const m = num1 * num2;
    const d = num1 / num2;
    const total = s + r + m + d;

    visor.innerHTML = `
        ${num1} + ${num2} = ${s}<br>
        ${num1} - ${num2} = ${r}<br>
        ${num1} * ${num2} = ${m}<br>
        ${num1} / ${num2} = ${d}<br>
        La suma de los resultados es ${total}
    `;
}

function invertir() {
    const original = document.getElementById("textoInvertir").value;
    const visor = document.getElementById("resultado4");

    const alReves = original.split("").reverse().join("");
    
    visor.innerText = alReves;
}