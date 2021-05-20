// Fichier de test pour voir si on récupère bien toutes les infos,
const User = require('./app/models/user');
const newUser = new User({
    id: 888,
    firstname : "Victor",
    lastname : "Greiveldinger",
    email : "vicgrei@gmail.com"
});

console.log("Avant : ",newUser);

// newUser.firstname = "Barb";
// newUser.lastname = "Creus";

// console.log("Après : ",newUser);

// const CoreModel = require('./app/models/coreModels');
// const newCoreModel = new CoreModel({});
// newCoreModel.id = 1;
// newCoreModel.status = 1;
// console.log(newCoreModel);

// // Petit test pour voir si User est bien une instance de CoreModel
// console.log( newUser instanceof CoreModel);

// // Pour tester le principe de "throw" une erreur dans le Setter
// newUser.setId('Erreur'); // Pour avoir un message clair, et ARRETER le fonctionnement de toute l'application !
// console.log("Bonjour ?"); // Ne sera jamais affiché, sauf si on la capture !

// Donc on utilise try catch
try {
    // Tester l'erreur ...
    // newUser.setId("Erreur");
    
    // Tester un bon déroulement
    newUser.setId(35);
    console.log("Instructions si il n'y a pas d'erreur... sinon on part dans le catch");
} catch (error) {
    console.log(error);
};

console.log("Bonjour ?"); // Sera maintenant affiché