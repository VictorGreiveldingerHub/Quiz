// Création d'un coreModels pour éviter la répétition dans les classes 
class CoreModel {
    // Mise en place des propriétés
    id;
    status;
    created_at;
    updated_at;
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        this.id = obj.id;
        this.status = obj.status;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };
};

// On export la classe !
module.exports = CoreModel;