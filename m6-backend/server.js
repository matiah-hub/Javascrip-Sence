const express = require('express');
const path = require('path');
const { promises: fs } = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const FILE_PROD = path.join(__dirname, 'data', 'productos.json');
const FILE_VENT = path.join(__dirname, 'data', 'ventas.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const leerJson = async (file) => JSON.parse(await fs.readFile(file, 'utf-8'));
const escribirJson = async (file, data) => fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');

// Listar productos
app.get('/productos', async (req, res) => {
    try { res.status(200).json(await leerJson(FILE_PROD)); }
    catch (e) { res.status(500).json({ error: 'Error al leer productos' }); }
});

// Procesar Venta
app.post('/venta', async (req, res) => {
    try {
        const { items } = req.body; 
        if (!items || items.length === 0) return res.status(400).json({ error: 'Carrito vacío' });

        let productos = await leerJson(FILE_PROD);
        let ventas = await leerJson(FILE_VENT);

        // Agrupar para validar stock total por producto
        const totalesPedido = items.reduce((acc, item) => {
            acc[item.id] = (acc[item.id] || 0) + 1;
            return acc;
        }, {});

        // Validación de Stock
        for (const id in totalesPedido) {
            const p = productos.find(prod => prod.id === id);
            if (!p || p.stock < totalesPedido[id]) {
                return res.status(409).json({ error: `Stock insuficiente para ${p ? p.nombre : 'producto'}` });
            }
        }

        // Aplicar descuento y calcular total
        let total = 0;
        for (const id in totalesPedido) {
            const p = productos.find(prod => prod.id === id);
            p.stock -= totalesPedido[id];
            total += p.precio * totalesPedido[id];
        }

        // Registrar venta con UUID
        const nuevaVenta = { id: uuidv4(), fecha: new Date().toISOString(), total };
        ventas.push(nuevaVenta);

        await escribirJson(FILE_PROD, productos);
        await escribirJson(FILE_VENT, ventas);

        res.status(201).json({ mensaje: 'Venta exitosa', idVenta: nuevaVenta.id });
    } catch (error) {
        res.status(500).json({ error: 'Error interno' });
    }
});

app.listen(3000, () => console.log("🚀 Servidor en puerto 3000"));