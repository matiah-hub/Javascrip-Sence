
function validar_numero(callback) {
    let dato = prompt("Ingrese un número:");
    
    if (dato !== null && dato.trim() !== "" && !isNaN(dato)) {
        callback(true, dato);
    } else {
        callback(false, dato);
    }
}

function ejecutarValidacion() {
    validar_numero((esValido, valor) => {
        if (esValido) {
            alert("Correcto: El dato es válido.");
        } else {
            console.log("Ud. ingresó caracteres incorrectos");
            alert("Error: Usted ingresó caracteres incorrectos.");
        }
    });
}

function calcular_y_avisar_despues(numero, callback) {
    let sumatoria = 0;
    for (let i = 1; i <= numero; i++) {
        if (i % 2 !== 0) {
            sumatoria += i;
        }
    }
    
    console.log("Cálculo realizado. Esperando 5 segundos para avisar...");
    setTimeout(() => {
        callback(sumatoria);
    }, 5000);
}

function ejecutarImpares() {
    let num = parseInt(prompt("Ingrese un número para sumar impares:"));
    if (isNaN(num)) return alert("Debe ingresar un número válido");

    calcular_y_avisar_despues(num, (resultado) => {
        alert(`El valor de la sumatoria es ${resultado}. Este resultado se obtuvo hace 5 segundos`);
    });
}

function calcular_y_avisar_dependiendo(numero, callback, callback_error) {
    let granTotal = 0;
    
    for (let i = 1; i <= numero; i++) {
        let sumaParcial = 0;
        for (let j = 1; j <= i; j++) {
            sumaParcial += j;
        }
        granTotal += sumaParcial;
    }

    if (granTotal < 1000) {
        callback(numero, granTotal); 
    } else {
        callback_error(granTotal); 
    }
}

function ejecutarSucesivas() {
    let num = parseInt(prompt("Ingrese número para sumatorias sucesivas:"));
    if (isNaN(num)) return alert("Debe ingresar un número válido");

    calcular_y_avisar_dependiendo(
        num,
        (n, res) => {
            alert(`Las sumatorias sucesivas de ${n} es ${res}`);
        },
        (res) => {
            alert(`El número sobrepasa el objetivo de la función. Resultado obtenido: ${res}`);
        }
    );
}