const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./db');
const auth = require('./src/middlewares/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

// --- PRODUCTOS: LISTAR Y AGREGAR ---
app.get('/api/products', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM products ORDER BY id ASC');
        res.json(rows);
    } catch (e) { res.status(500).json({ error: "Error de conexión" }); }
});

app.post('/api/products', auth, async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        let imageUrl = '/uploads/placeholder.png';
        if (req.files && req.files.image) {
            const fileName = Date.now() + '-' + req.files.image.name;
            await req.files.image.mv(path.join(__dirname, 'public/uploads', fileName));
            imageUrl = `/uploads/${fileName}`;
        }
        await db.query(
            'INSERT INTO products (name, description, price, stock, image_url, discount_percent) VALUES ($1, $2, $3, $4, $5, 0)',
            [name, description, price, stock, imageUrl]
        );
        res.status(201).json({ ok: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- EDICIÓN MASIVA (NOMBRE, DESC, PRECIO, STOCK, DCTO) ---
app.post('/api/products/bulk-update', auth, async (req, res) => {
    try {
        const { products } = req.body;
        for (let p of products) {
            await db.query(
                'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, discount_percent = $5 WHERE id = $6',
                [p.name, p.description, p.price, p.stock, p.discount_percent, p.id]
            );
        }
        res.json({ ok: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- ACTUALIZAR IMAGEN INDIVIDUAL ---
app.post('/api/products/:id/update-image', auth, async (req, res) => {
    try {
        if (!req.files || !req.files.image) return res.status(400).json({ error: "No image" });
        const fileName = Date.now() + '-' + req.files.image.name;
        await req.files.image.mv(path.join(__dirname, 'public/uploads', fileName));
        const imageUrl = `/uploads/${fileName}`;
        await db.query('UPDATE products SET image_url = $1 WHERE id = $2', [imageUrl, req.params.id]);
        res.json({ ok: true, imageUrl });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- DESCUENTOS MAESTROS ---
app.post('/api/products/global-discount', auth, async (req, res) => {
    try {
        await db.query('UPDATE products SET discount_percent = $1', [req.body.percent]);
        res.json({ ok: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/products/clear-discounts', auth, async (req, res) => {
    try {
        await db.query('UPDATE products SET discount_percent = 0');
        res.json({ ok: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/products/:id', auth, async (req, res) => {
    await db.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
});

// --- CARRITO Y VENTAS ---
app.get('/api/cart', auth, async (req, res) => {
    const { rows } = await db.query(`
        SELECT c.id, p.name, p.price, p.discount_percent, c.quantity 
        FROM cart_items c JOIN products p ON c.product_id = p.id WHERE c.user_id = $1`, [req.userId]);
    res.json({ ok: true, cart: rows });
});

app.post('/api/cart', auth, async (req, res) => {
    const { productId, quantity } = req.body;
    await db.query(`
        INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) 
        ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = cart_items.quantity + $3`, [req.userId, productId, quantity]);
    res.json({ ok: true });
});

app.post('/api/cart/checkout', auth, async (req, res) => {
    try {
        const { couponApplied } = req.body;
        const cart = await db.query(`SELECT c.product_id, c.quantity, p.price, p.discount_percent, p.name FROM cart_items c JOIN products p ON c.product_id = p.id WHERE c.user_id = $1`, [req.userId]);
        const multiplier = couponApplied ? 0.8 : 1.0;
        for (let item of cart.rows) {
            const finalP = (item.price * (1 - (item.discount_percent / 100))) * multiplier;
            await db.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.product_id]);
            await db.query('INSERT INTO sales_history (product_name, quantity, total_price, sale_date) VALUES ($1, $2, $3, NOW())', [item.name, item.quantity, (finalP * item.quantity)]);
        }
        await db.query('DELETE FROM cart_items WHERE user_id = $1', [req.userId]);
        res.json({ ok: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/history', auth, async (req, res) => {
    const { rows } = await db.query('SELECT * FROM sales_history ORDER BY sale_date DESC');
    res.json(rows);
});

// --- AUTH ---
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length > 0 && await bcrypt.compare(password, rows[0].password_hash)) {
        const token = jwt.sign({ userId: rows[0].id }, process.env.JWT_SECRET);
        return res.json({ ok: true, token });
    }
    res.status(401).json({ ok: false });
});
app.listen(3000, () => console.log("🚀 E-commerce corriendo en http://localhost:3000"));