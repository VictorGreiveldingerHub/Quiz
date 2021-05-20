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
    
    // Mise en place de quelques Getter / Setter pour voir le fonctionnement,
    // Avant d'utiliser Sequelize qui le fera pour nous
    
    getId() {
        // Retourne seulement un id,
        return this.id;
    };
    
    
    setId(value) {
        // Ici je veux vérifier que id est bien un nombre entier
        if (Number.isInteger(value)) {
            // Si c'est bien un entier, je l'accepte
            this.id = value;
        } else {
            // On lève ou jeter une exception (==> une erreur qui est levée)
            throw Error("ID must be an integer value");
        };
    };
};

// On export la classe !
module.exports = CoreModel;