// Création d'une classe par entité 
class Level {
    // Mise en place des propriétés
    id;
    name;
    status;
    created_at;
    updated_at;
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.status = obj.status;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };
};

// On export la classe !
module.exports = Level;