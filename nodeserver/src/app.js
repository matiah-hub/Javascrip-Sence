const express = require('express');
const hbs = require('hbs');
const { poolConfig, poolString } = require('./db'); // Importamos los pools desde db.js
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// 1. Configuración de Middlewares y Vistas
app.use(express.static('public')); // Habilita tu index.html en la carpeta public
app.set('view engine', 'hbs');
app.set('views', './views');

// --- RUTAS ---

// RUTA FINANZAS 
app.get('/finanzas', async (req, res) => {
    try {
        // Consultamos la tabla existente finanzas_personales
        const result = await poolConfig.query('SELECT * FROM finanzas_personales');
        
        // Enviamos los datos a la vista finanzas.hbs
        res.render('finanzas', { finanzas: result.rows });
    } catch (err) {
        console.error("Error en Finanzas:", err.message);
        res.status(500).render('error', { mensaje: "No se pudo conectar a finanzas_personales. Revisa tus credenciales." });
    }
});

// RUTA CLIENTES 
app.get('/clientes', async (req, res) => {
    try {
        // Automatización: Creamos la tabla sí no existe
        await poolString.query(`
            CREATE TABLE IF NOT EXISTS clientes (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100),
                email VARCHAR(100)
            );
        `);

        // Poblado inicial sí la tabla está vacía
        const check = await poolString.query('SELECT COUNT(*) FROM clientes');
        if (check.rows[0].count == 0) {
            await poolString.query("INSERT INTO clientes (nombre, email) VALUES ('Matias G.', 'matias@admin.cl'), ('Cliente Prueba', 'test@correo.cl')");
        }

        const result = await poolString.query('SELECT * FROM clientes');
        res.render('clientes', { clientes: result.rows });

    } catch (err) {
        console.error("Error en Clientes:", err.message);
        res.status(500).render('error', { mensaje: "Error en la conexión por Connection String (Parte 2)." });
    }
});

// rutas y console.log para verificar que el servidor está corriendo
app.listen(port, () => {
    console.log(`🚀 Servidor hosteado en: http://localhost:${port}`);
    console.log(`📌 Dashboard: http://localhost:${port}`);
    console.log(`📌 Finanzas (Parte 1): http://localhost:${port}/finanzas`);
    console.log(`📌 Clientes (Parte 2): http://localhost:${port}/clientes`);
});