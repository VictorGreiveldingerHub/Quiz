// Require les variables d'environnement
require ('dotenv').config();

const Level = require('./app/models/level');
Level.findAll((err, levels) => {
    console.log(err, levels);
});