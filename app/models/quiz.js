const CoreModel = require('./coreModels');

// Création d'une classe par entité 
class Quiz extends CoreModel {
    // Mise en place des propriétés
    title;
    description;
    app_users_id;
    
    // Prop statique pour la factorisation
    static tableName = "quizzes";
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        super(obj);
        this.title = obj.title;
        this.description = obj.description;
        this.app_users_id = obj.app_users_id;
    };
};

// On export la classe !
module.exports = Quiz;