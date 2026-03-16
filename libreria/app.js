const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const DATA_PATH = path.join(__dirname, 'catalogo.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helpers de lectura/escritura
async function leerCatalogo() {
    try {
        const raw = await fs.readFile(DATA_PATH, 'utf8');
        return JSON.parse(raw);
    } catch (e) {
        if (e.code === 'ENOENT') {
            await fs.writeFile(DATA_PATH, '[]');
            return [];
        }
        throw e;
    }
}

async function escribirCatalogo(data) {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}

// GET /libros - Leer todos
app.get('/libros', async (req, res) => {
    try {
        const libros = await leerCatalogo();
        res.status(200).json({ ok: true, data: libros });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al leer los datos' });
    }
});

// POST /libros - Crear
app.post('/libros', async (req, res) => {
    const { titulo, autor, anio } = req.body;
    if (!titulo || !autor || !anio) {
        return res.status(400).json({ ok: false, msg: 'Faltan datos' });
    }
    try {
        const libros = await leerCatalogo();
        const nuevoID = libros.length > 0 ? Math.max(...libros.map(l => l.id)) + 1 : 1;
        const nuevoLibro = { id: nuevoID, titulo, autor, anio: Number(anio) };

        libros.push(nuevoLibro);
        await escribirCatalogo(libros);
        res.status(201).json({ ok: true, data: nuevoLibro });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al guardar' });
    }
});

// PUT /libros/:id - Actualizar
app.put('/libros/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { titulo, autor, anio } = req.body;
    try {
        const libros = await leerCatalogo();
        const idx = libros.findIndex(l => l.id === id);

        if (idx === -1) return res.status(404).json({ ok: false, msg: 'Libro no encontrado' });

        libros[idx] = { id, titulo, autor, anio: Number(anio) };
        await escribirCatalogo(libros);
        res.status(200).json({ ok: true, data: libros[idx] });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al actualizar' });
    }
});

// DELETE /libros/:id - Eliminar
app.delete('/libros/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const libros = await leerCatalogo();
        const idx = libros.findIndex(l => l.id === id);

        if (idx === -1) return res.status(404).json({ ok: false, msg: 'Libro no encontrado' });

        const eliminado = libros.splice(idx, 1)[0];
        await escribirCatalogo(libros);
        res.status(200).json({ ok: true, data: eliminado });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al eliminar' });
    }
});

app.listen(port, () => console.log(`🚀 API escuchando en http://localhost:${port}`));