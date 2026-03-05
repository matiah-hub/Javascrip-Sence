const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// DATOS DE PRUEBA (Simulando la base de datos)
let clientesFalsos = [
    { rut: "123-4", nombre: "La Reina", edad: 30 },
    { rut: "567-8", nombre: "Cliente de Prueba", edad: 25 }
];

// GET: En lugar de ir a Postgres, devuelve la lista de arriba
app.get('/clientes', (req, res) => {
    res.json({ ok: true, data: clientesFalsos });
});

// POST: Simula que guarda
app.post('/clientes', (req, res) => {
    const nuevo = req.body;
    clientesFalsos.push(nuevo);
    res.json({ ok: true, data: nuevo });
});

// DELETE: Simula que borra
app.delete('/clientes', (req, res) => {
    res.json({ ok: true, mensaje: "Simulación: Borrado exitoso (solo si era uno)" });
});

app.listen(3000, () => console.log("🚀 MODO PRUEBA: Servidor en http://localhost:3000"));