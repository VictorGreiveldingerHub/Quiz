// Import du CoreModel
const CoreModel = require('./coreModels');

// Création d'une classe par entité
// On fait hériter la classe du CM
class Answer extends CoreModel {
    // Mise en place des propriétés
    description;
    question_id;
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        // Heritage du coreModel
        super(obj);
        this.description = obj.description;
        this.question_id = obj.question_id;
    };
};

// On export la classe !
module.exports = Answer;