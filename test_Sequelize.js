require('dotenv').config();

const Tag = require('./app/models/tag');

// Nouvelle syntaxe, introduite par Sequelize :
// - on appelle une méthode, sans définir le callback,
// - on définit le traitement d'erreur dans .catch(),
// et le traitement du résultat dans .then().

// // Test 1 : trouver tous les tags
// Tag.findAll().then( (tags) => {
//     // console.log(tags);
//     for (let tag of tags) {
//         console.log(tag.name);
//     }
// }).catch( (err) => {
//     console.log(err);
// });

// // Test 2 : trouver un Tag (id = 3)
// Tag.findByPk(3).then( (tag) => {
//     // console.log(tag);
//     console.log(tag.name);
//     console.log(tag.id);
//     console.log(tag.getName());
// }).catch( (err) => {
//     console.log(err);
// });

// Test 3 : Trouver un tag par son nom
Tag.findOne({
    where: {
        name: "Gastronomie"
    }
}).then((tag) => {
    console.log(tag);
}).catch((err) => {
    console.log(err);
});