// Require les variables d'environnement
require ('dotenv').config();

// Test pour récupérer tous les tags
// const Tag = require('./app/models/tag');
// // instance un nouveau tag
// const emptyTag = new Tag({
//     name: "Humour",
//     status: 1
// });
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

// // Pour supprimer un tag
// Tag.findById(13, (err, tag) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(tag);
//         if (tag) {
//             tag.delete();
//         };
//     };
// });


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

// // Test pour voir si le tag est bien update
// Tag.findById(10, (err, goodTag) => {
//     if (err) {
//         console.log(err);
//     } else {
//         goodTag.name = "Blague";
//         goodTag.status = 1;
//         goodTag.update((err2, upTag) => {
//             console.log(err2, upTag);
//         });
//         // goodTag.update((err, upTag) => {
//         //     console.log(err, upTag);
//         //     if (upTag) {
//         //        return upTag.insert();
//         //     };
//         // });
//     };
// });

// USERS
const User = require('./app/models/user');

// // TEST recupérer tous les users
// User.findAll((err, users) => {
//     console.log(users);
//     console.log(users[0]);
//     console.log(users[0].getFullName());
// });

// // TEST récupérer un user à l'id 1
// User.findById(1, (err, user) => {
//     console.log(user);
//     console.log(user.getFullName());
// });

// // TEST update un user
// const upUser = new User({
//     name : "Victor",
//     lastname : "Greivel",
//     password : "****",
//     email : "vicgrei@gmail.com",
// });
// upUser.findById(1, (err, user) => {
//     if (err) { 
//         console.log(err);
//     } else {
//         console.log(user);
//         user.update();
//     };
// });

// // Test pour voir si le User est bien update
// User.findById(1, (err, goodUser) => {
//     if (err) {
//         console.log(err);
//     } else {
//         goodUser.firstname = "Victor";
//         goodUser.lastname = "Greiveldinger";
//         goodUser.email = "victorgrei@gmail.com";
//         goodUser.password = "****";
//         goodUser.update((err2, upTag) => {
//             console.log(err2, upTag);
//         });
//         goodUser.update((err, upUser) => {
//             console.log(err, upUser);
//             if (upUser) {
//                return upUser.insert();
//             };
//         });
//     };
// });