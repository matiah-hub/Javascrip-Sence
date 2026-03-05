const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));


let productos = [
    { id_producto: 1, nombre: "Digiegg", precio: 50000, existencias: 10 },
    { id_producto: 2, nombre: "Digimental", precio: 25000, existencias: 5 },
    { id_producto: 3, nombre: "Data de experiencia", precio: 15000, existencias: 20 }
];

let clientes = [{ rut: "11111111-1", nombre: "Digital monster " }];
let direcciones = [{ id_direccion: 1, rut: "11111111-1", direccion: "isla file 123" }];
let ordenes = [];
let lista_productos = [];
let despachos = [];



// Ver productos
app.get('/productos', (req, res) => res.json(productos));

// PROCESAR VENTA 
app.post('/comprar', (req, res) => {
    const { rut, id_direccion, carrito } = req.body;


    try {
        let totalVenta = 0;

        for (let item of carrito) {
            const prod = productos.find(p => p.id_producto == item.id_producto);
            if (!prod) throw new Error("Producto no encontrado");
            if (prod.existencias < item.cantidad) throw new Error(`Stock insuficiente para ${prod.nombre}`);
            totalVenta += prod.precio * item.cantidad;
        }

        const nuevaOrdenId = ordenes.length + 1;

        // Restar stock y registrar
        for (let item of carrito) {
            const prod = productos.find(p => p.id_producto == item.id_producto);
            prod.existencias -= item.cantidad;
            lista_productos.push({ id_lista: lista_productos.length + 1, id_orden: nuevaOrdenId, id_producto: item.id_producto, cantidad: item.cantidad });
        }

        ordenes.push({ id_orden: nuevaOrdenId, rut, id_direccion, precio_total: totalVenta });
        despachos.push({ id_despacho: despachos.length + 1, id_orden: nuevaOrdenId, id_direccion });

        res.status(201).json({ ok: true, mensaje: "¡Venta realizada con éxito!", id_orden: nuevaOrdenId });

    } catch (error) {
        // Si hay error, no hace nada 
        res.status(400).json({ ok: false, mensaje: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});