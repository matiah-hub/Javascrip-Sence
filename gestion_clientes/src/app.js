const express = require('express');
const { poolString } = require('./db');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// GET: Retornar ordenados por nombre
app.get('/clientes', async (req, res) => {
    try {
        const result = await poolString.query('SELECT * FROM clientes ORDER BY nombre ASC');
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Error en GET:", err.message);
        res.status(500).json({ error: "Error al obtener clientes" });
    }
});

// POST: Crear con validación de campos vacíos y edad numérica
app.post('/clientes', async (req, res) => {
    let { rut, nombre, edad } = req.body;

    // Validar campos vacíos o solo espacios
    if (!rut?.trim() || !nombre?.trim() || !edad) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Convertir edad a número y validar
    const edadNumerica = parseInt(edad);
    if (isNaN(edadNumerica)) {
        return res.status(400).json({ error: "La edad debe ser un número válido" });
    }

    try {
        await poolString.query(
            'INSERT INTO clientes (rut, nombre, edad) VALUES ($1, $2, $3)',
            [rut.trim(), nombre.trim(), edadNumerica]
        );
        res.status(201).json({ message: "Cliente creado con éxito" });
    } catch (err) {
        if (err.code === '23505') {
            res.status(409).json({ error: "Ese RUT ya existe" });
        } else {
            console.error(err);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
});

// DELETE: Eliminar
app.delete('/clientes/:rut', async (req, res) => {
    const { rut } = req.params;
    try {
        const result = await poolString.query('DELETE FROM clientes WHERE rut = $1', [rut]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "RUT no encontrado para eliminar" });
        }
        res.json({ message: "Cliente eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar" });
    }
});

// PUT: Modificar nombre con validación
app.put('/clientes/:rut', async (req, res) => {
    const { rut } = req.params;
    const { nombre } = req.body;

    if (!nombre?.trim()) {
        return res.status(400).json({ error: "El nuevo nombre es obligatorio" });
    }

    try {
        const result = await poolString.query(
            'UPDATE clientes SET nombre = $1 WHERE rut = $2',
            [nombre.trim(), rut]
        );
        
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "RUT no encontrado para actualizar" });
        }
        
        res.json({ message: "Nombre actualizado con éxito" });
    } catch (err) {
        console.error("❌ Error en PUT:", err.message);
        res.status(500).json({ error: "Error al actualizar" });
    }
});

app.listen(3000, () => console.log("🚀 Servidor CRUD operando en puerto 3000"));