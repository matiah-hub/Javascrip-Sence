const express = require('express');
const { poolString } = require('./db');
const app = express();

app.use(express.json());
app.use(express.static('public'));

//  GET Todos y con Filtros Avanzados 
app.get('/clientes', async (req, res) => {
    const { rut, edad, edadMin, edadMax, nombre } = req.query;
    try {
        let sql = 'SELECT * FROM clientes';
        let params = [];

        
        if (rut) {
            sql += ' WHERE rut = $1';
            params = [rut];
        } else if (edad) {
            sql += ' WHERE edad = $1';
            params = [edad];
        } else if (edadMin && edadMax) {
            sql += ' WHERE edad BETWEEN $1 AND $2';
            params = [edadMin, edadMax];
        } else if (nombre) {
            // ILIKE para búsqueda insensible a mayúsculas y % para prefijos
            sql += ' WHERE nombre ILIKE $1';
            params = [`${nombre}%`];
        }

        sql += ' ORDER BY nombre ASC';
        
        const result = await poolString.query(sql, params);

        if (result.rows.length === 0) {
            return res.status(200).json({ message: "No hay clientes que cumplan con el criterio" });
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error en el servidor al consultar" });
    }
});

// POST con validaciones extras post test y manejo de errores específicos
app.post('/clientes', async (req, res) => {
    let { rut, nombre, edad } = req.body;

    //  Limpieza de espacios accidentales
    rut = rut?.trim();
    nombre = nombre?.trim();

    //  FILTRO: Campos obligatorios
    if (!rut || !nombre || !edad) {
        return res.status(400).json({ error: "Todos los campos (RUT, Nombre, Edad) son obligatorios." });
    }

    // FILTRO: Validar que el RUT no sea un nombre (Debe tener al menos un número)
    const tieneNumeros = /\d/.test(rut);
    if (!tieneNumeros) {
        return res.status(400).json({ error: "El formato del RUT es inválido (debe contener números)." });
    }

    // FILTRO: Validar que el Nombre no sea solo números
    const esSoloNumeros = /^\d+$/.test(nombre);
    if (esSoloNumeros) {
        return res.status(400).json({ error: "El nombre no puede ser solo números." });
    }

    // FILTRO: Edad numérica real
    const edadNum = parseInt(edad);
    if (isNaN(edadNum) || edadNum <= 0 || edadNum > 120) {
        return res.status(400).json({ error: "La edad debe ser un número válido entre 1 y 120." });
    }

    try {
        await poolString.query(
            'INSERT INTO clientes (rut, nombre, edad) VALUES ($1, $2, $3)',
            [rut, nombre, edadNum]
        );
        res.status(201).json({ message: "✅ Cliente creado con éxito" });
    } catch (err) {
        //  FILTRO: Captura de RUT Duplicado (
        if (err.code === '23505') {
            return res.status(409).json({ error: `El RUT ${rut} ya está registrado en el sistema.` });
        }
        console.error("Error en el insert:", err);
        res.status(500).json({ error: "Error interno al procesar el registro." });
    }
});
// 3 Eliminar individual
app.delete('/clientes/:rut', async (req, res) => {
    const { rut } = req.params;
    try {
        const result = await poolString.query('DELETE FROM clientes WHERE rut = $1', [rut]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "cliente no existe" });
        }
        res.json({ message: "Cliente eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar" });
    }
});

// Eliminación Masiva por Edad/Rango
app.delete('/clientes', async (req, res) => {
    const { edad, edadMin, edadMax } = req.query;
    try {
        let sqlSelect = 'SELECT nombre FROM clientes';
        let sqlDelete = 'DELETE FROM clientes';
        let params = [];

        if (edad) {
            sqlSelect += ' WHERE edad = $1';
            sqlDelete += ' WHERE edad = $1';
            params = [edad];
        } else if (edadMin && edadMax) {
            sqlSelect += ' WHERE edad BETWEEN $1 AND $2';
            sqlDelete += ' WHERE edad BETWEEN $1 AND $2';
            params = [edadMin, edadMax];
        } else {
            return res.status(400).json({ error: "Debe indicar edad o rango para eliminación masiva" });
        }

        // Obtener nombres antes de borrar para el mensaje de respuesta
        const nombresRes = await poolString.query(sqlSelect, params);
        const deleteRes = await poolString.query(sqlDelete, params);

        if (deleteRes.rowCount === 0) {
            return res.status(200).json({ message: "no hay coincidencias para eliminar" });
        }

        const listaNombres = nombresRes.rows.map(r => r.nombre).join(', ');
        res.json({ message: `Eliminados (${deleteRes.rowCount}): ${listaNombres}` });
    } catch (err) {
        res.status(500).json({ error: "Error en eliminación masiva" });
    }
});

//  Modificar solo nombre
app.put('/clientes/:rut', async (req, res) => {
    const { rut } = req.params;
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({ error: "El nombre es obligatorio para actualizar" });
    }

    try {
        const result = await poolString.query(
            'UPDATE clientes SET nombre = $1 WHERE rut = $2',
            [nombre.trim(), rut]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "RUT no encontrado" });
        }
        res.json({ message: "Nombre actualizado con éxito" });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));