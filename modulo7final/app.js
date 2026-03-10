require('dotenv').config();
const { Pool } = require('pg');
const Cursor = require('pg-cursor');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// --- RUTAS ---

// GET: Leer con Cursor
app.get('/paises', async (req, res, next) => {
    const client = await pool.connect();
    const size = parseInt(req.query.size) || 10;
    try {
        const query = `
            SELECT p.nombre, p.continente, p.poblacion, pb.pib_2019, pb.pib_2020 
            FROM paises p 
            LEFT JOIN paises_pib pb ON p.nombre = pb.nombre
            ORDER BY p.nombre ASC`;
        const cursor = client.query(new Cursor(query));
        cursor.read(size, (err, rows) => {
            if (err) return next(err); // El error viaja al middleware de abajo
            res.json(rows);
            cursor.close();
        });
    } catch (error) {
        next(error);
    } finally {
        client.release();
    }
});

// POST: Guardar con Transacción
app.post('/paises', async (req, res, next) => {
    const client = await pool.connect();
    const { nombre, continente, poblacion, pib2019, pib2020 } = req.body;
    try {
        await client.query('BEGIN');
        await client.query('INSERT INTO paises (nombre, continente, poblacion) VALUES ($1, $2, $3)',
            [nombre, continente, poblacion]);
        await client.query('INSERT INTO paises_pib (nombre, pib_2019, pib_2020) VALUES ($1, $2, $3)',
            [nombre, pib2019 || 0, pib2020 || 0]);
        await client.query('INSERT INTO paises_data_web (nombre_pais, accion) VALUES ($1, 1)', [nombre]);
        await client.query('COMMIT');
        res.status(201).json({ mensaje: "País registrado exitosamente" });
    } catch (error) {
        await client.query('ROLLBACK');
        next(error); // Si falla la transacción, next lo atrapa
    } finally {
        client.release();
    }
});

// DELETE: Eliminar con Transacción
app.delete('/paises/:nombre', async (req, res, next) => {
    const client = await pool.connect();
    const { nombre } = req.params;
    try {
        await client.query('BEGIN');
        await client.query('DELETE FROM paises_pib WHERE nombre = $1', [nombre]);
        await client.query('DELETE FROM paises_data_web WHERE nombre_pais = $1', [nombre]);
        const result = await client.query('DELETE FROM paises WHERE nombre = $1', [nombre]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "No se encontró el país" });
        }

        await client.query('COMMIT');
        res.json({ mensaje: "País eliminado de todas las tablas" });
    } catch (error) {
        await client.query('ROLLBACK');
        next(error);
    } finally {
        client.release();
    }
});



// MIDDLEWARE
app.use((err, req, res, next) => {
    console.error("LOG DE ERROR:", err.message);
    res.status(500).json({
        status: "error",
        message: "Hubo un problema en el servidor",
        detalles: err.message
    });
});

app.listen(3000, () => console.log("🚀 Servidor en puerto 3000 Activo"));