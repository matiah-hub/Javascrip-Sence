
function punto1_BaseDatos() {
    console.log("creando promesa"); 
    
    const consultaBD = new Promise((resolve) => {
        console.log("registrando promesa");
        console.log("esperando respuesta");

        const persona = {
            nombre: "Mario",
            apellido: "Bross",
            edad: 30,
            cuidad: "Mushroom kingdom"
        };

        setTimeout(() => {
            resolve(persona);
        }, 3000);
    });

    consultaBD.then((respuesta) => {
        console.log("RESPUESTA:", respuesta); 
    });
}

function punto2_Reloj() {
    const validarTiempo = new Promise((resolve, reject) => {
        const ahora = new Date();
        const segundos = ahora.getSeconds();
        const horaActual = ahora.toLocaleTimeString();

        console.log(`Segundos actuales: ${segundos}`);

        if (segundos > 30) {
            (segundos % 2 === 0) ? resolve(horaActual) : reject("Error: Segundos > 30 e IMPAR");
        } else {
            (segundos % 2 !== 0) ? resolve(horaActual) : reject("Error: Segundos <= 30 y PAR");
        }
    });

    validarTiempo
        .then(res => console.log("HORA ACTUAL:", res))
        .catch(err => console.error(err));
}

function punto3_ProcesoPesado() {
    console.log("creando promesa");

    const procesoLento = new Promise((resolve) => {
        console.log("registrando promesa");
        console.log("esperando respuesta");

        let suma = 0;
        for (let i = 0; i < 2e9; i++) {
            suma += i;
        }

        resolve("Listo");
    });

    procesoLento.then((msj) => {
        console.log("RESPUESTA:", msj);
  
    });
}