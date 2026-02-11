const express = require('express');
const fs = require('fs/promises'); 
const path = require('path');

const app = express();
const PORT = 3000;

const data_file = path.join(__dirname, "tienda.txt");
const PUBLIC_DIR = path.join(__dirname, 'public');

app.use(express.json());
app.use(express.static(PUBLIC_DIR));

function productsfrontext(text) {
    let arrayProductsRaw = text.trim().split("\n");
    
    return arrayProductsRaw.filter(line => line.trim() !== "").map((line, index) => {
        const [nombre, precio] = line.split(",");
        return {
            id: index + 1,
            nombre: nombre ? nombre.trim() : "Sin nombre",
            precio: Number(precio) || 0
        };
    });
}

async function readproducts() {
    try {
        const text = await fs.readFile(data_file, "utf-8");
        return productsfrontext(text);
    } catch (err) {
        if (err.code === "ENOENT") {
            await fs.writeFile(data_file, "");
            return [];
        }
        throw err;
    }
}

async function appendproduct({ nombre, precio }) {
    const line = `\n${nombre},${precio}`;
    await fs.appendFile(data_file, line, 'utf-8');
}


app.get("/api/productos", async (req, res, next) => {
    try {
        const productos = await readproducts();
        res.status(200).json({ ok: true, productos });
    } catch (err) {
        next(err); 
    }
});

app.post("/api/productos", async (req, res, next) => {
    try {
        const nombre = String(req.body?.nombre ?? "").trim();
        const precio = Number(req.body?.precio);

        if (!nombre) {
            return res.status(400).json({ ok: false, error: "Falta el nombre del Digimon" });
        }
        if (!Number.isFinite(precio) || precio <= 0) {
            return res.status(400).json({ ok: false, error: "Precio inválido" });
        }

        await appendproduct({ nombre, precio }); 

        const productos = await readproducts();
        res.status(201).json({ ok: true, mensaje: "Producto agregado con éxito", productos });
    } catch (err) {
        next(err);
    }
});

app.all("/api/productos", (req, res) => {
    res.set("Allow", "GET, POST");
    res.status(405).json({ ok: false, error: "Método no permitido. Usa GET o POST." });
});

app.use((req, res) => {
    res.status(404).json({ ok: false, error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`Digi-Market corriendo en:`);
    console.log(`http://localhost:${PORT}`);
    console.log(`-----------------------------------------`);
});