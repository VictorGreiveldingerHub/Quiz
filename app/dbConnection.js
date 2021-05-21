// Uniquement pour fournir une connexion ouverte à la BDD
const { Client } = require('pg');

// Instance
const client = new Client(process.env.PG_URL);

// Connexion
client.connect();

// Export ...
module.exports = client;