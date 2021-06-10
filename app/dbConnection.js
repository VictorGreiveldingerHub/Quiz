// Uniquement pour fournir une connexion ouverte à la BDD


/* VERSION PG ///////////////////
const { Client } = require('pg');

// Instance
const client = new Client(process.env.PG_URL);

// Connexion
client.connect();

// Export ...
module.exports = client;
////////////////////////////// */

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL);

module.exports = sequelize;