const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//  'paises_pib' (Datos del SQL) 
let paises_pib = [
    { nombre: 'Luxemburgo', pib_2019: 115200, pib_2020: 116730 },
    { nombre: 'Suiza', pib_2019: 85160, pib_2020: 86670 },
    { nombre: 'Noruega', pib_2019: 82770, pib_2020: 78330 },
    { nombre: 'Estados Unidos', pib_2019: 65060, pib_2020: 67430 },
    { nombre: 'Chile', pib_2019: 16280, pib_2020: 15850 },
    { nombre: 'Argentina', pib_2019: 9050, pib_2020: 9730 }
];

// a. GET sin parámetros: Lista completa 
app.get('/paises', (req, res) => {
    const pibQuery = req.query.pib;

    // b. GET con parámetro pib 
    if (pibQuery) {
        if (pibQuery === "creciendo") {
            // Países donde el PIB subió en 2020    
            const creciendo = paises_pib
                .filter(p => p.pib_2020 > p.pib_2019)
                .map(p => ({ ...p, diferencia: p.pib_2020 - p.pib_2019 }));
            return res.json(creciendo);
        }

        if (pibQuery === "decreciendo") {
            // Países donde el PIB bajó en 2020     
            const decreciendo = paises_pib
                .filter(p => p.pib_2020 < p.pib_2019)
                .map(p => ({ ...p, diferencia: p.pib_2019 - p.pib_2020 }));
            return res.json(decreciendo);
        }

        if (!isNaN(pibQuery)) {
            const valorMinimo = parseInt(pibQuery);
            // Filtramos los que tienen igual o más que ese valor en 2020
            const resultado = paises_pib.filter(p => p.pib_2020 >= valorMinimo);
            return res.json(resultado);
        }
    }

    res.json(paises_pib);
});

//  Agrega un nuevo país 
app.post('/paises', (req, res) => {
    const { nombre, pib_2019, pib_2020 } = req.body;
    const nuevo = { nombre, pib_2019: parseInt(pib_2019), pib_2020: parseInt(pib_2020) };
    paises_pib.push(nuevo);
    res.status(201).json({ mensaje: "País agregado", nuevo });
});

//  Elimina por nombre 
app.delete('/paises/:nombre', (req, res) => {
    const { nombre } = req.params;
    paises_pib = paises_pib.filter(p => p.nombre.toLowerCase() !== nombre.toLowerCase());
    res.json({ mensaje: `País ${nombre} eliminado` });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🌍 Reto PIB corriendo en http://localhost:${PORT}`));













