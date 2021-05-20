// Import du CoreModel
const CoreModel = require('./coreModels');

// Création d'une classe par entité
// On fait hériter la classe du CM
class Level extends CoreModel {
    // Mise en place des propriétés
    name;
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        // Heritage du coreModel
        super(obj);
        this.name = obj.name;
    };
};

// On export la classe !
module.exports = Level;