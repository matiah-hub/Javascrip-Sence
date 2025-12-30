class ProductoSony {
    constructor(nombre, modelo, precio, categoria, stock,imagen) {
        this.nombre = nombre;
        this.modelo = modelo;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
        this.imagen= imagen; 
    }

    obtenerHTML() {
        return `
            <div class="producto-card">
                <small>${this.categoria}</small>
                <img src="${this.imagen}"</img> 
                <h3>${this.nombre}</h3>
                <p>Modelo: ${this.modelo}</p>
                <div class="precio">$${this.precio.toLocaleString('es-CL')}</div>
                <p style="font-size: 0.8em;">Disponibles: ${this.stock} unidades</p>

            </div>
        `;
    }
}

const catalogoSony = [
    new ProductoSony("Bravia XR A80L", "OLED 55'", 1299990, "TV", 5,"iMG/TV1.JPG"),
    new ProductoSony("Bravia X75K", "LED 65'", 549990, "TV", 12,"IMG/TV2.JPG"),
    new ProductoSony("WH-1000XM5", "Noise Cancelling", 329990, "Audio", 20,"IMG/audio1.JPG"),
    new ProductoSony("SRS-XG300", "Parlante BT", 199990, "Audio", 8,"IMG/Audio2.JPG"),
    new ProductoSony("Alpha 7 IV", "Mirrorless Full-frame", 2199990, "Camaras", 3,"IMG/camara1.JPG"),
    new ProductoSony("ZV-E10", "Vlog Camera", 699990, "Camaras", 15,"IMG/camara2.JPG")
];

function mostrarCategoria(cat) {
    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = ""; 

    const filtrados = catalogoSony.filter(p => p.categoria === cat);

    filtrados.forEach(producto => {
        contenedor.innerHTML += producto.obtenerHTML();
    });
}