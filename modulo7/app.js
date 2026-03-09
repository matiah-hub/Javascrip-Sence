const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// --- BASE DE DATOS----
let productos = [
    { id: 1, nombre: 'Digiegg', precio: 200.050, stock: 10 },
    { id: 2, nombre: 'Digivice', precio: 250.000, stock: 50 },
    { id: 3, nombre: 'Comida digimon', precio: 350.000, stock: 15 },
    { id: 4, nombre: 'Traje formal digimon', precio:100.000 , stock:40 },
];

let ventas = [];

// GET /productos - Lista completa
app.get('/productos', (req, res) => {
    res.status(200).json(productos);
});

// POST /venta - Lógica de Transacción 
app.post('/venta', (req, res) => {
    // Convertimos a número para asegurar comparaciones correctas
    const id_producto = Number(req.body.id_producto);
    const cantidad = Number(req.body.cantidad);
    
    // Backup para simular el Rollback de una transacción
    const backupStock = JSON.parse(JSON.stringify(productos));

    try {
        const p = productos.find(prod => prod.id === id_producto);

        if (!p) throw new Error('Producto no encontrado');
        
        // Verificación de stock
        if (p.stock < cantidad) {
            throw new Error(`Stock insuficiente. Solo quedan ${p.stock} unidades.`);
        }

        //  Actualizar stock
        p.stock -= cantidad;

        // Registro de la venta
        const nuevaVenta = {
            id: ventas.length + 1,
            fecha: new Date(),
            producto: p.nombre,
            cantidad: cantidad,
            total: p.precio * cantidad
        };
        ventas.push(nuevaVenta);

        console.log(`✅ Venta Exitosa: ${p.nombre} (-${cantidad})`);
        res.status(201).json({ mensaje: 'Venta realizada con éxito', id_venta: nuevaVenta.id });

    } catch (error) {
        // ROLLBACK: Si algo falló, restauramos el stock al estado anterior
        productos = backupStock;
        console.log(`❌ Error en Transacción: ${error.message}`);
        res.status(409).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor modulo7 corriendo en http://localhost:${PORT}`);
});