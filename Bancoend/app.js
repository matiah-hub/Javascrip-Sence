const express = require('express');
const { engine } = require('express-handlebars');
const fs = require('fs').promises;
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/api/clientes', async (req, res) => {
    try {
        const data = await fs.readFile('clientes.json', 'utf-8');
        res.json(JSON.parse(data));
    } catch (e) { res.status(500).send("Error"); }
});

app.post('/api/clientes', async (req, res) => {
    try {
        const { nombre, rut, numeroCuenta } = req.body;
        const data = await fs.readFile('clientes.json', 'utf-8');
        const clientes = JSON.parse(data);
        clientes.push({ nombre, rut, cuentaRut: { numero: numeroCuenta, saldo: 0 }, cuentasAhorro: [] });
        await fs.writeFile('clientes.json', JSON.stringify(clientes, null, 2));
        res.status(201).json({ mensaje: "Creado" });
    } catch (e) { res.status(500).send("Error"); }
});

app.post('/api/clientes/ahorro', async (req, res) => {
    try {
        const { rut, idAhorro, saldo } = req.body;
        const data = await fs.readFile('clientes.json', 'utf-8');
        let clientes = JSON.parse(data);
        const index = clientes.findIndex(c => c.rut === rut);
        if (index !== -1) {
            clientes[index].cuentasAhorro.push({ id: idAhorro, saldo: Number(saldo) });
            await fs.writeFile('clientes.json', JSON.stringify(clientes, null, 2));
            res.json({ mensaje: "Ahorro vinculado" });
        } else { res.status(404).json({ mensaje: "No encontrado" }); }
    } catch (e) { res.status(500).send("Error"); }
});

app.delete('/api/clientes/:rut', async (req, res) => {
    try {
        const data = await fs.readFile('clientes.json', 'utf-8');
        let clientes = JSON.parse(data);
        const filtrados = clientes.filter(c => c.rut !== req.params.rut);
        await fs.writeFile('clientes.json', JSON.stringify(filtrados, null, 2));
        res.json({ mensaje: "Eliminado" });
    } catch (e) { res.status(500).send("Error"); }
});

app.get('/', (req, res) => res.render('banco'));

app.listen(3000, () => console.log("🏦 Servidor en http://localhost:3000"));