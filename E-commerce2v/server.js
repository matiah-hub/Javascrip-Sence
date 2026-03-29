const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Importar utilidades y rutas
const { sseHandler } = require('./utils/sse');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const commentRoutes = require('./routes/comments');
const salesRoutes = require('./routes/sales');

// 1. CONFIGURACIÓN
const app = express();

// 2. CARPETA DE IMÁGENES
const dir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }

// 3. MIDDLEWARES GLOBALES
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// 4. RUTAS
app.get('/api/live', sseHandler);
app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api', salesRoutes); // Para /api/checkout y /api/sales

// 5. ARRANCAR
app.listen(3000, () => console.log("🚀 E-commerce modularizado corriendo en http://localhost:3000"));