const CoreModel = require('./coreModels');
const dbConnection = require('../dbConnection');

// Création d'une classe par entité 
class Tag extends CoreModel {
    // Mise en place des propriétés
    name;
    
    // Prop statique pour la factorisation
    static tableName = "tags";
    
    // Petite méthode pour afficher une phrase de présentation du tag
    getName() {
        return "Hello je suis le tag " + this.name;
    };
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        super(obj);
        this.name = obj.name;
    };
    
    // Méthode pour afficher tous les tags
    // => CoreModel
    
    // Méthode pour récupérer le tag a l'Id "x"
    // => CoreModel
    
    // Méthode pour update un tag
    // => CoreModel
    
    // Méthode pour insérer un nouveau tag
    // Ici je veux créer un nouveau tag, puis l'insérer dans la BDD
    // => CoreModel
    
    // Méthode pour supprimer un tag, apres l'avoir récupérer
    // => CoreModel
};

// On export la classe !
module.exports = Tag;