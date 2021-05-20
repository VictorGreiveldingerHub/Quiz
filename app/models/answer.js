// Création d'une classe par entité 
class Answer {
    // Mise en place des propriétés
    id;
    description;
    status;
    created_at;
    updated_at;
    question_id;
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        this.id = obj.id;
        this.description = obj.description;
        this.status = obj.status;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
        this.question_id = obj.question_id;
    };
};

// On export la classe !
module.exports = Answer;