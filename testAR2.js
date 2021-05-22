// Require les variables d'environnement
require ('dotenv').config();

const Level = require('./app/models/level');
// Level.findAll((err, levels) => {
//     console.log(err, levels);
// });

// const Question = require('./app/models/question');
// Question.findAll((err, questions) => {
//     console.log(err, questions);
// });

const User = require('./app/models/user');
// User.findAll((err, questions) => {
//     console.log(err, questions);
// });

// Level.findById(3, (err, user) => {
//     console.log(err, user);
// });

// Test pour une méthode non statique
// utilisation de this.constructor
// Level.findById(3, (err, user) => {
//     console.log(err, user);
//     console.log(user.constructor); // Et la on peut récupérer tableName => constructor.tableName
// });

// const nouveauLevel = new Level({name: 'Démoniaque', status: 1});
// nouveauLevel.insert((err, level) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(level);
//     }
// });

// const nouveauUser = new User({
//     firstname: "Louis",
//     lastname: "Poiuy",
//     password: "****",
//     email: "louis@litiere.com",
//     status: 1
// });
// nouveauUser.update((err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// User.findById(3, (err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         user.email = "blabla@bla.bla";
//         user.firstname = "blebelble";
//         user.lastname = "blobloblo";
//         user.password = "hiahahie";
        
//         user.insert((err2, userUp) => {
//             if (err2) {
//                 console.log(err2);
//             } else {
//                 console.log(userUp);
//             };
//         });
//     };
// });


// User.findById(5, (err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         user.delete((err, user) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(user);
//             };
//         });
//     };
// });