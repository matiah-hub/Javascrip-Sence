const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// --- SIMULACIÓN DE DATOS 
let clientes = [
    { id: 1, nombre: "La Reina de mario", email: "reina@palacio.com" },
    { id: 2, nombre: "Mario Bross", email: "mario@palacio.com" }
];

// Obtener todos los clientes
app.get('/clientes', (req, res) => {
    console.log("🔍 Consultando lista de clientes...");
    res.json(clientes);
});

// Crear un nuevo cliente
app.post('/clientes', (req, res) => {
    try {
        const { nombre, email } = req.body;

        if (!nombre || !email) {
            return res.status(400).json({ ok: false, mensaje: "Nombre y Email son obligatorios" });
        }

        const nuevoCliente = {
            id: clientes.length + 1,
            nombre: nombre,
            email: email
        };

        clientes.push(nuevoCliente);
        console.log("✅ Cliente guardado en 'DB':", nuevoCliente);
        res.status(201).json(nuevoCliente);
    } catch (e) {
        res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 corriendo en http://localhost:${PORT}`);
    console.log(`📂 Archivos en public`);
});