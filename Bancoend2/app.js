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

const JSON_FILE = 'clientes.json';


app.get('/api/clientes', async (req, res) => {
    try {
        const data = await fs.readFile(JSON_FILE, 'utf-8');
        res.json(JSON.parse(data));
    } catch (e) { res.status(500).json({ error: "Error al leer" }); }
});

app.post('/api/clientes', async (req, res) => {
    try {
        const { nombre, rut, numeroCuenta } = req.body;
        const data = await fs.readFile(JSON_FILE, 'utf-8');
        const clientes = JSON.parse(data);
        clientes.push({
            nombre, rut,
            cuentaRut: { numero: numeroCuenta, saldo: 0 },
            cuentasAhorro: []
        });
        await fs.writeFile(JSON_FILE, JSON.stringify(clientes, null, 2));
        res.status(201).json({ mensaje: "Cliente y RUT creados" });
    } catch (e) { res.status(500).json({ error: "Error al guardar" }); }
});

app.post('/api/clientes/ahorro', async (req, res) => {
    try {
        const { rut, idAhorro, saldo } = req.body;
        const data = await fs.readFile(JSON_FILE, 'utf-8');
        let clientes = JSON.parse(data);
        const idx = clientes.findIndex(c => c.rut === rut);
        if (idx !== -1) {
            clientes[idx].cuentasAhorro.push({ id: idAhorro, saldo: Number(saldo) });
            await fs.writeFile(JSON_FILE, JSON.stringify(clientes, null, 2));
            res.json({ mensaje: "Ahorro agregado" });
        } else { res.status(404).json({ mensaje: "No encontrado" }); }
    } catch (e) { res.status(500).json({ error: "Error" }); }
});

app.delete('/api/clientes/:rut', async (req, res) => {
    try {
        const data = await fs.readFile(JSON_FILE, 'utf-8');
        let clientes = JSON.parse(data);
        const filtrados = clientes.filter(c => c.rut !== req.params.rut);
        await fs.writeFile(JSON_FILE, JSON.stringify(filtrados, null, 2));
        res.json({ mensaje: "Cliente eliminado" });
    } catch (e) { res.status(500).json({ error: "Error" }); }
});

app.delete('/api/clientes/:rut/rut', async (req, res) => {
    try {
        const data = await fs.readFile(JSON_FILE, 'utf-8');
        let clientes = JSON.parse(data);
        const idx = clientes.findIndex(c => c.rut === req.params.rut);
        if (idx !== -1) {
            clientes[idx].cuentaRut = null; 
            await fs.writeFile(JSON_FILE, JSON.stringify(clientes, null, 2));
            res.json({ mensaje: "Cuenta RUT eliminada" });
        }
    } catch (e) { res.status(500).json({ error: "Error" }); }
});

app.delete('/api/clientes/:rut/ahorro/:id', async (req, res) => {
    try {
        const data = await fs.readFile(JSON_FILE, 'utf-8');
        let clientes = JSON.parse(data);
        const idx = clientes.findIndex(c => c.rut === req.params.rut);
        if (idx !== -1) {
            clientes[idx].cuentasAhorro = clientes[idx].cuentasAhorro.filter(a => a.id !== req.params.id);
            await fs.writeFile(JSON_FILE, JSON.stringify(clientes, null, 2));
            res.json({ mensaje: "Ahorro eliminado" });
        }
    } catch (e) { res.status(500).json({ error: "Error" }); }
});

app.get('/', (req, res) => res.render('banco'));
app.listen(3000, () => console.log("🏦 BancoEstado en puerto 3000"));