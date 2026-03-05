const express = require('express');
const { poolString } = require('./db');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Función para asegurar que la tabla exista al encender el servidor
const inicializarTabla = async () => {
    try {
        const query = {
            text: `CREATE TABLE IF NOT EXISTS clientes (
                rut VARCHAR(15) PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                edad INTEGER NOT NULL
            )`
        };
        await poolString.query(query);
        console.log("✅ Tabla 'clientes' verificada.");
    } catch (e) { console.log("⚠️ Error inicializando tabla (Revisa tu DATABASE_URL):", e.message); }
};
inicializarTabla();

// GET /clientes 
app.get('/clientes', async (req, res) => {
    const { rut, edad, nombre } = req.query;
    try {
        let text = 'SELECT * FROM clientes';
        let values = [];

        if (rut) { text += ' WHERE rut = $1'; values = [rut]; }
        else if (edad) { text += ' WHERE edad = $1'; values = [edad]; }
        else if (nombre) { text += ' WHERE nombre ILIKE $1'; values = [`${nombre}%`]; }

        const { rows } = await poolString.query({ text, values });
        if (rows.length === 0) return res.status(404).json({ ok: false, mensaje: "Sin coincidencias" });
        res.json({ ok: true, data: rows });
    } catch (err) { res.status(500).json({ ok: false, mensaje: "Error de servidor" }); }
});

// POST /clientes 
app.post('/clientes', async (req, res) => {
    const { rut, nombre, edad } = req.body;
    try {
        const queryObj = {
            text: 'INSERT INTO clientes (rut, nombre, edad) VALUES ($1, $2, $3) RETURNING *',
            values: [rut, nombre, parseInt(edad)]
        };
        const { rows } = await poolString.query(queryObj);
        res.status(201).json({ ok: true, data: rows[0] });
    } catch (err) {
        if (err.code === '23505') return res.status(409).json({ ok: false, mensaje: "El RUT ya existe" });
        res.status(500).json({ ok: false, mensaje: "Error al crear" });
    }
});

// DELETE /clientes
app.delete('/clientes', async (req, res) => {
    const { rut, nombre, edad } = req.query;
    try {
        let filter = ''; let values = [];
        if (rut) { filter = 'rut = $1'; values = [rut]; }
        else if (nombre) { filter = 'nombre ILIKE $1'; values = [`${nombre}%`]; }
        else if (edad) { filter = 'edad = $1'; values = [edad]; }
        else return res.status(400).json({ ok: false, mensaje: "Falta criterio de búsqueda" });

        // Verificamos cuántos hay antes de borrar
        const check = await poolString.query({ text: `SELECT * FROM clientes WHERE ${filter}`, values });

        if (check.rowCount === 0) return res.status(404).json({ ok: false, mensaje: "Cliente no encontrado" });
        if (check.rowCount > 1) {
            return res.status(400).json({
                ok: false,
                mensaje: `Se hallaron ${check.rowCount} registros. Refine su búsqueda para borrar solo uno.`
            });
        }

        const result = await poolString.query({ text: `DELETE FROM clientes WHERE ${filter}`, values });
        res.json({ ok: true, rowCount: result.rowCount, mensaje: "Eliminado con éxito" });
    } catch (err) { res.status(500).json({ ok: false, mensaje: "Error al eliminar" }); }
});

// PUT /clientes/:rut (Actualizar solo nombre)
app.put('/clientes/:rut', async (req, res) => {
    const { rut } = req.params;
    const { nombre } = req.body;
    try {
        const { rowCount } = await poolString.query({
            text: 'UPDATE clientes SET nombre = $1 WHERE rut = $2',
            values: [nombre, rut]
        });
        if (rowCount === 0) return res.status(404).json({ ok: false, mensaje: "No existe el RUT" });
        res.json({ ok: true, rowCount, mensaje: "Actualizado correctamente" });
    } catch (err) { res.status(500).json({ ok: false, mensaje: "Error al actualizar" }); }
});

app.listen(3000, () => console.log("🚀 Servidor corriendo en puerto 3000"));