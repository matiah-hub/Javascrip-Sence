const express = require('express');
const cors = require('cors');
const app = express();
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
    );
    next();
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


let peliculas = [
    { id: 1, titulo: "El Padrino", anio: 1972 },
    { id: 2, titulo: "Scarface", anio: 1983 }
];

let actores = [
    { id: 1, nombre: "Al Pacino", fecha_nacimiento: "1940-04-25" },
    { id: 2, nombre: "Marlon Brando", fecha_nacimiento: "1924-04-03" }
];

// Tabla intermedia (PeliculasActores)
let peliculas_actores = [
    { pelicula_id: 1, actor_id: 1 },
    { pelicula_id: 1, actor_id: 2 },
    { pelicula_id: 2, actor_id: 1 }
];


// peliculas -> Lista con sus actores
app.get('/peliculas', (req, res) => {
    const resultado = peliculas.map(p => ({
        ...p,
        Actores: peliculas_actores
            .filter(pa => pa.pelicula_id === p.id)
            .map(pa => actores.find(a => a.id === pa.actor_id))
    }));
    res.json(resultado);
});

// actores -> Lista con sus películas
app.get('/actores', (req, res) => {
    const resultado = actores.map(a => ({
        ...a,
        Peliculas: peliculas_actores
            .filter(pa => pa.actor_id === a.id)
            .map(pa => peliculas.find(p => p.id === pa.pelicula_id))
    }));
    res.json(resultado);
});

// asignar-actor 
app.post('/asignar-actor', (req, res) => {
    const { pelicula_id, actor_id } = req.body;

    // Inicio de "Transacción"
    try {
        const pId = parseInt(pelicula_id);
        const aId = parseInt(actor_id);

        // Validar que existan los datos en la base de datos
        const existeP = peliculas.find(p => p.id === pId);
        const existeA = actores.find(a => a.id === aId);

        if (!existeP || !existeA) throw new Error("Película o Actor no encontrado");

        // Validar si ya están asignados    
        const yaAsignado = peliculas_actores.find(pa => pa.pelicula_id === pId && pa.actor_id === aId);
        if (yaAsignado) throw new Error("Este actor ya está asignado a esta película");

        // Si todo está OK, "Confirmamos" (COMMIT)
        peliculas_actores.push({ pelicula_id: pId, actor_id: aId });

        console.log(`✅ Transacción Exitosa: Actor ${aId} asignado a Película ${pId}`);
        res.status(201).json({ ok: true, mensaje: "Asignación realizada con éxito" });

    } catch (e) {
        // Si algo falla, se cancela
        console.error("❌ Transacción Fallida:", e.message);
        res.status(400).json({ ok: false, mensaje: e.message });
    }
});

// Rutas simples de creación
app.post('/peliculas', (req, res) => {
    const nueva = { id: peliculas.length + 1, ...req.body };
    peliculas.push(nueva);
    res.status(201).json(nueva);
});

app.post('/actores', (req, res) => {
    const nuevo = { id: actores.length + 1, ...req.body };
    actores.push(nuevo);
    res.status(201).json(nuevo);
});

app.listen(3000, () => console.log('🎬 Cine API en http://localhost:3000'));