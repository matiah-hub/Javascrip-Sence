const express = require('express');
const { engine } = require('express-handlebars');
const fs = require('fs').promises;
const path = require('path');
const { Pelicula, Serie } = require('./clases');

const app = express();

app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('public'));

// Filtro de métodos
app.use((req, res, next) => {
    if (!['GET', 'POST', 'DELETE'].includes(req.method)) return res.status(405).send("Método no permitido");
    next();
});

app.get('/contenido', async (req, res) => {
    const { tipo } = req.query;
    const archivo = tipo === 'peliculas' ? 'peliculas.txt' : 'series.txt';
    try {
        const data = await fs.readFile(archivo, 'utf-8');
        const lineas = data.split('\n').filter(l => l.trim() !== "");
        const objetos = lineas.map(l => {
            const [p1, p2, p3] = l.split(',').map(s => s.trim());
            return tipo === 'peliculas' ? new Pelicula(p1, p2, p3) : new Serie(p1, p2, p3);
        });
        res.json({ [tipo]: objetos });
    } catch (e) { res.json({ [tipo]: [] }); }
});

app.post('/contenido', async (req, res) => {
    const { tipo, nombre, director, año, temporadas } = req.body;
    const archivo = tipo === 'pelicula' ? 'peliculas.txt' : 'series.txt';
    const linea = tipo === 'pelicula' ? `\n${nombre}, ${director}, ${año}` : `\n${nombre}, ${año}, ${temporadas}`;
    await fs.appendFile(archivo, linea);
    res.status(201).json({ m: "ok" });
});

app.delete('/contenido/:tipo/:nombre', async (req, res) => {
    const { tipo, nombre } = req.params;
    const archivo = tipo === 'peliculas' ? 'peliculas.txt' : 'series.txt';
    const data = await fs.readFile(archivo, 'utf-8');
    const nuevas = data.split('\n').filter(l => !l.toLowerCase().includes(nombre.toLowerCase()));
    await fs.writeFile(archivo, nuevas.join('\n'));
    res.json({ m: "borrado" });
});

app.get('/netflix', (req, res) => res.render('netflix', { titulo: "Netflix V8" }));
app.listen(3000, () => console.log("http://localhost:3000/netflix"));