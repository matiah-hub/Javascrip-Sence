const express = require('express');
const { engine } = require('express-handlebars'); 
const fs = require('fs').promises; 
const path = require('path');

const app = express();
const PORT = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.use((req, res, next) => {
    const metodosPermitidos = ['GET', 'POST', 'DELETE'];
    if (!metodosPermitidos.includes(req.method)) {
        return res.status(405).json({ error: "Método no permitido." });
    }
    next();
});


app.get('/contenido', async (req, res) => {
    const { tipo } = req.query; 
    
    if (tipo !== 'peliculas' && tipo !== 'series') {
        return res.status(400).json({ error: "Tipo inválido. Use 'peliculas' o 'series'." });
    }

    try {
        const data = await fs.readFile(`${tipo}.txt`, 'utf-8');
        const lineas = data.split('\n').filter(linea => linea.trim() !== "");
        res.json({ [tipo]: lineas });
    } catch (error) {
        res.json({ [tipo]: [] });
    }
});

app.post('/contenido', async (req, res) => {
    const { nombre, director, año, temporadas, tipo } = req.body;
    let nuevaLinea = "";
    let nombreArchivo = "";

    try {
        if (tipo === 'pelicula') {
            nuevaLinea = `\n${nombre}, ${director}, ${año}`;
            nombreArchivo = 'peliculas.txt';
        } else if (tipo === 'serie') {
            nuevaLinea = `\n${nombre}, ${año}, ${temporadas}`;
            nombreArchivo = 'series.txt';
        } else {
            return res.status(400).json({ error: "Tipo no válido" });
        }

        await fs.appendFile(nombreArchivo, nuevaLinea);
        res.status(201).json({ mensaje: "Agregado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar los datos." });
    }
});

app.delete('/contenido', async (req, res) => {
    const { tipo, index } = req.body;
    const archivo = tipo === 'peliculas' ? 'peliculas.txt' : 'series.txt';

    try {
        const data = await fs.readFile(archivo, 'utf-8');
        let lineas = data.split('\n').filter(linea => linea.trim() !== "");
        
        lineas.splice(index, 1);
        
        await fs.writeFile(archivo, lineas.join('\n'));
        res.json({ mensaje: "Eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el registro." });
    }
});


app.get('/netflix', (req, res) => {
    res.render('netflix', { titulo: "Netflix Catálogo" });
});

app.get('/', (req, res) => {
    res.redirect('/netflix');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/netflix`);
});