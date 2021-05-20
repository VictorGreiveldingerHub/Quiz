// Création d'une classe par entité 
class Quiz {
    // Mise en place des propriétés
    id;
    title;
    description;
    status;
    created_at;
    updated_at;
    app_users_id;
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
        this.status = obj.status;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
        this.app_users_id = obj.app_users_id;
    };
};

// On export la classe !
module.exports = Quiz;