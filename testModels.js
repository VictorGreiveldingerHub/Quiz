require ('dotenv').config();

// Trouver tous les users
const User = require('./app/models/user');
// User.findAll(console.log);

// Trouver la question dont l'id est 3
const Question = require('./app/models/question');
// Question.findById(3, console.log);

// Créer un level avec le nom "GodLike" et l'insérer en BDD
const Level = require('./app/models/level');
const newLevel = new Level({
    name: "GodLike",
    status: 1
});
newLevel.insert(console.log);
