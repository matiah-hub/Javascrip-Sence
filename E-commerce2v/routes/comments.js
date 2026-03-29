const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, async (req, res) => {
    try {
        await db.query('INSERT INTO comments (tamer_name, content) VALUES ($1, $2)', [req.user.username, req.body.content]);
        res.json({ ok: true });
    } catch (e) {
        console.error("Error en comentario DB:", e);
        res.status(500).json({ error: "Fallo base de datos" });
    }
});

router.get('/', async (req, res) => {
    try {
        const r = await db.query('SELECT * FROM comments ORDER BY created_at DESC');
        res.json(r.rows);
    } catch (e) { res.status(500).json({ error: "Error al cargar comentarios" }); }
});

module.exports = router;
