const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const { rows } = await db.query(`
            SELECT c.id, p.name, p.price, c.quantity, p.id as product_id 
            FROM cart c JOIN products p ON c.product_id = p.id 
            WHERE c.user_id = $1`, [req.user.id]);
        res.json(rows);
    } catch (e) { res.status(500).json({ error: "Error al cargar carrito" }); }
});

router.post('/', authenticateToken, async (req, res) => {
    const { product_id, quantity } = req.body;
    try {
        const existe = await db.query('SELECT * FROM cart WHERE user_id = $1 AND product_id = $2', [req.user.id, product_id]);
        if (existe.rows.length > 0) {
            await db.query('UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3', [quantity, req.user.id, product_id]);
        } else {
            await db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)', [req.user.id, product_id, quantity]);
        }
        res.json({ ok: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/', authenticateToken, async (req, res) => {
    try {
        await db.query('DELETE FROM cart WHERE user_id = $1', [req.user.id]);
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: "No se pudo vaciar el carrito" });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await db.query('DELETE FROM cart WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
        if (result.rowCount === 0) return res.status(404).json({ error: "Item no encontrado" });
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: "No se pudo eliminar el item" });
    }
});

module.exports = router;
