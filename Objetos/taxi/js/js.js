class Taxi {
    constructor(patente, modelo, conductor) {
        this.patente = patente;
        this.modelo = modelo;
        this.conductor = conductor;
    }
}

class TaxiTradicional extends Taxi {
    constructor(patente, modelo, conductor) {
        super(patente, modelo, conductor);
        this.techo = "Amarillo";
        this.licenciaRequerida = "A1";
    }
}

class TaxiParticular extends Taxi {
    constructor(patente, modelo, conductor) {
        super(patente, modelo, conductor);
        this.licenciaRequerida = "Clase B";
    }
}

class TaxiExpress extends TaxiParticular {
    constructor(patente, modelo, conductor) {
        super(patente, modelo, conductor);
        this.categoria = "Estandar";
    }
}

class TaxiPremium extends TaxiParticular {
    constructor(patente, modelo, conductor) {
        super(patente, modelo, conductor);
        this.categoria = "Alta Gama";
    }
}

class TaxiCargo extends Taxi {
    constructor(patente, modelo, conductor, capacidadCarga) {
        super(patente, modelo, conductor);
        this.capacidadCarga = capacidadCarga;
        this.licenciaRequerida = "Clase A4/A5";
    }
}

function actualizarInterfaz() {
    const seleccion = document.getElementById("selectorTaxi").value;
    const visor = document.getElementById("visor");
    let unidad;

    if (!seleccion) {
        visor.innerHTML = "<em>Seleccione un vehículo...</em>";
        return;
    }

    switch(seleccion) {
        case "tradicional":
            unidad = new TaxiTradicional("TX-2020", "Toyota Yaris", "Juan Pérez");
            break;
        case "express":
            unidad = new TaxiExpress("EX-5050", "Hyundai Accent", "Ana Jara");
            break;
        case "premium":
            unidad = new TaxiPremium("PR-9090", "Mercedes Benz", "Carlos Soto");
            break;
        case "cargo":
            unidad = new TaxiCargo("CG-1122", "Ford F-150", "Luis Lara", "1500kg");
            break;
    }

    visor.innerHTML = `
        <div class="taxi-card">
            <h3>${unidad.modelo}</h3>
            <p><strong>Conductor:</strong> ${unidad.conductor}</p>
            <p><strong>Licencia:</strong> ${unidad.licenciaRequerida}</p>
            ${unidad.techo ? `<p><strong>Color Techo:</strong> ${unidad.techo}</p>` : ""}
            ${unidad.categoria ? `<p><strong>Categoría:</strong> ${unidad.categoria}</p>` : ""}
            ${unidad.capacidadCarga ? `<p><strong>Carga:</strong> ${unidad.capacidadCarga}</p>` : ""}
        </div>
    `;
    
    console.log("Objeto creado con éxito:", unidad);
}