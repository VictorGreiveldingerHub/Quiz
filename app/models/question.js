const CoreModel = require('./coreModels');

// Création d'une classe par entité 
class Question extends CoreModel {
    // Mise en place des propriétés
    question;
    anecdote;
    wiki;
    levels_id;
    answers_id;
    quizzes_id;
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        super(obj);
        this.question = obj.question;
        this.anecdote = obj.anecdote;
        this.wiki = obj.wiki;
        this.levels_id = obj.levels_id;
        this.answers_id = obj.answers_id;
        this.quizzes_id = obj.quizzes_id;
    };
};

// On export la classe !
module.exports = Question;