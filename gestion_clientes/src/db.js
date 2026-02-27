const { Pool } = require('pg');

const poolString = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ejercicio05',
    password: '11009masg', 
    port: 5432,
});

module.exports = { poolString };