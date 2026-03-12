const express = require("express");
const cors = require("cors"); // Importante: haber hecho npm install cors
const productos = require("./productos.json");
const usuarios = require("./usuarios.json");

const app = express();
const port = 3000;

// MIDDLEWARES
app.use(cors()); // Esto permite que tu HTML hable con el servidor
app.use(express.json());

// RUTAS
app.get('/api/v1/usuarios', (req, res) => {
    res.status(200).json({
        ok: true,
        data: usuarios
    });
});

app.get('/api/v1/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) res.status(200).json({ ok: true, data: usuario });
    else res.status(404).json({ ok: false, data: "Usuario no encontrado" });
});

app.put('/api/v1/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
        usuarios[index].nombre = req.body.nombre || usuarios[index].nombre;
        res.status(200).json({ ok: true, data: usuarios[index] });
    } else {
        res.status(404).json({ ok: false, data: "Usuario no encontrado" });
    }
});

app.delete('/api/v1/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
        const eliminado = usuarios.splice(index, 1);
        res.status(200).json({ ok: true, data: eliminado[0] });
    } else {
        res.status(404).json({ ok: false, data: "Usuario no encontrado" });
    }
});

app.get('/api/v1/productos', (req, res) => {
    res.status(200).json({
        ok: true,
        data: productos
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        data: "Ruta no encontrada"
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});