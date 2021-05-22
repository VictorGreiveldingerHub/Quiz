require ('dotenv').config();

// Trouver tous les users
const User = require('./app/models/user');
// User.findAll(console.log);

// Trouver la question dont l'id est 3
const Question = require('./app/models/question');
// Question.findById(3, console.log);

// Créer un level avec le nom "GodLike" et l'insérer en BDD
const Level = require('./app/models/level');
// const newLevel = new Level({
//     name: "Est ce que save marche ?",
//     status: 1
// });
// newLevel.save(console.log);

// Level.findById(8, (err, level) => {
//     if (err) {
//         console.log(err);
//     } else {
//         level.delete();
//     };
// });
const Tag = require('./app/models/tag');
Tag.findBy({}, console.log);
