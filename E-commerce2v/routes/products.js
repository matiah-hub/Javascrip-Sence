const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth');
const upload = require('../config/multer');
const { broadcast } = require('../utils/sse');

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: "No se pudieron cargar productos" }); }
});

router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
    const { name, description, price, stock, category } = req.body;
    try {
        const duplicateCheck = await db.query('SELECT id FROM products WHERE LOWER(name) = LOWER($1)', [name]);
        if (duplicateCheck.rows.length > 0) {
            return res.status(400).json({ error: "Ya existe un Digimon registrado con ese mismo nombre." });
        }

        let img = req.file ? `/uploads/${req.file.filename}` : '/uploads/placeholder.png';
        await db.query('INSERT INTO products (name, description, price, stock, image_url, category) VALUES ($1,$2,$3,$4,$5,$6)', [name, description, price, stock, img, category]);
        res.json({ ok: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;
    try {
        let img = req.file ? `/uploads/${req.file.filename}` : null;
        let query = img ? 'UPDATE products SET name=$1, description=$2, price=$3, stock=$4, category=$5, image_url=$6 WHERE id=$7' : 'UPDATE products SET name=$1, description=$2, price=$3, stock=$4, category=$5 WHERE id=$6';
        let vals = img ? [name, description, price, stock, category, img, id] : [name, description, price, stock, category, id];
        await db.query(query, vals);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: "No autorizado" });
    try {
        await db.query('DELETE FROM products WHERE id = $1', [req.params.id]);
        res.json({ message: "Eliminado" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.patch('/:id/discount', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { discount, discount_phrase, duration } = req.body;
        
        await db.query('UPDATE products SET discount = $1, discount_phrase = $2 WHERE id = $3', [discount, discount_phrase, id]);
        
        const pRes = await db.query('SELECT name FROM products WHERE id = $1', [id]);
        const productName = pRes.rows[0]?.name || 'Un producto';

        if (discount > 0) {
            broadcast({ type: 'DISCOUNT_START', id, name: productName, phrase: discount_phrase, discount });
            
            if (duration && duration > 0) {
                setTimeout(async () => {
                    await db.query('UPDATE products SET discount = 0, discount_phrase = NULL WHERE id = $1', [id]);
                    broadcast({ type: 'DISCOUNT_END', id, name: productName });
                }, duration * 1000);
            }
        } else {
            broadcast({ type: 'DISCOUNT_END', id, name: productName });
        }

        res.json({ message: "Descuento aplicado" });
    } catch (error) {
        console.error("Error al aplicar descuento:", error);
        res.status(500).json({ error: "Faltan columnas o error de BD: " + error.message });
    }
});

module.exports = router;
