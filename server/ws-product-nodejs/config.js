const dotenv = require('dotenv');
// Reads the environment variables from the .env file and sets them 
dotenv.config();

const config = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
}

module.exports = config;