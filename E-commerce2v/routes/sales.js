const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth');

router.get('/my-sales', authenticateToken, async (req, res) => {
    try {
        const r = await db.query('SELECT * FROM sales WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
        res.json(r.rows);
    } catch (e) { res.status(500).json({ error: "Error al cargar tu historial" }); }
});

router.post('/checkout', authenticateToken, async (req, res) => {
    try {
        await db.query('BEGIN');
        const items = await db.query('SELECT c.*, p.price, p.stock FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = $1', [req.user.id]);

        if (items.rows.length === 0) throw new Error("Carrito vacío");

        const total = items.rows.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const saleRes = await db.query('INSERT INTO sales (user_id, total_amount, items_count) VALUES ($1, $2, $3) RETURNING id', [req.user.id, total, items.rows.length]);
        const saleId = saleRes.rows[0].id;

        for (const item of items.rows) {
            if (item.stock < item.quantity) throw new Error(`Stock insuficiente de producto ID: ${item.product_id}`);
            await db.query('INSERT INTO sale_items (sale_id, product_id, quantity, price_at_time) VALUES ($1, $2, $3, $4)', [saleId, item.product_id, item.quantity, item.price]);
            await db.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.product_id]);
        }

        await db.query('DELETE FROM cart WHERE user_id = $1', [req.user.id]);
        await db.query('COMMIT');

        // Notificar actualización de stock en tiempo real
        const { broadcast } = require('../utils/sse');
        broadcast({ type: 'STOCK_UPDATE' });

        res.json({ ok: true, saleId });
    } catch (e) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: e.message });
    }
});

router.get('/sales', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: "No autorizado" });
    try {
        const query = `
            SELECT s.*, u.username as tamer_name 
            FROM sales s 
            JOIN users u ON s.user_id = u.id 
            ORDER BY s.created_at DESC`;
        const r = await db.query(query);
        res.json(r.rows);
    } catch (e) { res.status(500).json({ error: "Error al cargar ventas" }); }
});

router.delete('/sales', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: "No autorizado" });
    try {
        await db.query('DELETE FROM sale_items');
        await db.query('DELETE FROM sales');
        res.json({ ok: true, message: "Historial de ventas limpiado" });
    } catch (e) { res.status(500).json({ error: "Error al limpiar historial" }); }
});

router.get('/sales/:id', authenticateToken, async (req, res) => {
    try {
        const result = await db.query(`
            SELECT p.name, si.quantity, (p.price * si.quantity) AS subtotal, u.username 
            FROM sale_items si 
            JOIN products p ON si.product_id = p.id 
            JOIN sales s ON si.sale_id = s.id 
            JOIN users u ON s.user_id = u.id 
            WHERE si.sale_id = $1`, [req.params.id]);

        if (result.rows.length === 0) return res.status(404).json({ error: "Sin detalles" });
        res.json({ username: result.rows[0].username, items: result.rows });
    } catch (err) {
        res.status(500).json({ error: "Error al cargar detalle de venta" });
    }
});

module.exports = router;
