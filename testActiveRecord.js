// Require les variables d'environnement
require ('dotenv').config();

// Test pour récupérer tous les tags
const Tag = require('./app/models/tag');
// instance un nouveau tag
const emptyTag = new Tag({});
// // TOUS LES TAGS
// emptyTag.findAll((err, tags) => {
//     console.log(err, tags);
    
//     // // test méthode toString
//     const firstTag = tags[0];
//     console.log(firstTag.toString());
// });

// // Le tag avec l'id 3
// Tag.findById(1, (err, tag) => {
//     console.log(err);
//     console.log(tag.getName());
// });

Tag.findById(13, (err, tag) => {
    if (err) {
        console.log(err);
    } else {
        console.log(tag);
        if (tag) {
            tag.delete();
        };
    };
});


// // Insérer un tag
// emptyTag.name = "Blague nulle";
// emptyTag.insert( (err, tag) => {
//     if (err) {
//         console.log(err);
//     } else {
//         // Je récup la nouvelle version
//         console.log(tag);
//     };
// });