const CoreModel = require('./coreModels');

// Création d'une classe par entité 
class User extends CoreModel {
    // Mise en place des propriétés
    email;
    password;
    firstname;
    lastname;
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        super(obj);
        this.email = obj.email;
        this.password = obj.password;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
    };
};

// On export la classe !
module.exports = User;