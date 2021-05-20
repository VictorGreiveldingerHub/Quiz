// Création d'une classe par entité 
class Question {
    // Mise en place des propriétés
    id;
    question;
    anecdote;
    wiki;
    status;
    created_at;
    updated_at;
    levels_id;
    answers_id;
    quizzes_id;
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        this.id = obj.id;
        this.question = obj.question;
        this.anecdote = obj.anecdote;
        this.wiki = obj.wiki;
        this.status = obj.status;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
        this.levels_id = obj.levels_id;
        this.answers_id = obj.answers_id;
        this.quizzes_id = obj.quizzes_id;
    };
};

// On export la classe !
module.exports = Question;