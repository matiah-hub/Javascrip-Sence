const { Pool } = require('pg');
require('dotenv').config();

// Usamos los datos de tu tabla en pgAdmin
const poolConfig = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ejercicio05',
    password: process.env.DB_PASSWORD, // Viene del archivo .env
    port: 5432,
});

// 2. Configuración por Connection String
const poolString = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = { poolConfig, poolString };