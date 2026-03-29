const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const authenticateToken = require('../middleware/auth');

const JWT_SECRET = 'clave_secreta_digimon';

router.put('/users/password', authenticateToken, async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashedPassword, req.user.id]);
        res.json({ ok: true, message: "Contraseña actualizada" });
    } catch (err) { res.status(500).json({ error: "Error al actualizar contraseña" }); }
});

router.get('/users', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: "No autorizado" });
    try {
        const result = await db.query('SELECT id, username, email, role FROM users ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: "Error al listar usuarios" }); }
});

router.patch('/users/:id/role', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: "No autorizado" });
    const { role } = req.body;
    try {
        await db.query('UPDATE users SET role = $1 WHERE id = $2', [role, req.params.id]);
        res.json({ ok: true, message: "Rol actualizado" });
    } catch (err) { res.status(500).json({ error: "Error al cambiar rol" }); }
});

router.delete('/users/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: "No autorizado" });
    try {
        await db.query('DELETE FROM users WHERE id = $1', [req.params.id]);
        res.json({ ok: true, message: "Tamer eliminado" });
    } catch (err) { res.status(500).json({ error: "Error al eliminar tamer" }); }
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const check = await db.query('SELECT id FROM users WHERE email = $1', [email]);
        if (check.rows.length > 0) return res.status(400).json({ error: "El email ya está en uso, Tamer." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, 'tamer') RETURNING id, username`;
        const result = await db.query(query, [username, email, hashedPassword]);
        res.status(201).json({ ok: true, user: result.rows[0] });
    } catch (err) { 
        console.error("Error registro:", err.message);
        res.status(500).json({ error: "Error interno al registrar" }); 
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(400).json({ error: "No existe" });
        const user = result.rows[0];
        if (await bcrypt.compare(password, user.password_hash)) {
            const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
            res.json({ ok: true, token, user: { id: user.id, username: user.username, role: user.role } });
        } else { res.status(400).json({ error: "Clave incorrecta" }); }
    } catch (err) { res.status(500).json({ error: "Error login" }); }
});

module.exports = router;
