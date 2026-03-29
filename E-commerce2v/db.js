const { Pool } = require('pg');
require('dotenv').config();

// Conexión para tu base de datos local
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};