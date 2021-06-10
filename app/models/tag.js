// const CoreModel = require('./coreModels');

// Nouvelle version sequelize
const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection');

// Création d'une classe par entité 
class Tag extends Sequelize.Model {
    
    // Remarque importante : il faut enlever toutes les propriétés déclarées
    // Bug connu de sequelize dans sa version 5 ( à voir pour la version 6 ), si on les définis ici Sequelize ne les 
    // trouve plus et restent tous NULL
    
    
    // // Mise en place des propriétés
    // name;
    
    // // Prop statique pour la factorisation
    // static tableName = "tags";
    
    // Petite méthode pour afficher une phrase de présentation du tag
    getName() {
        return "Hello je suis le tag " + this.name;
    };
    
    // // Mise en place du constructor
    // // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    // constructor(obj) {
    //     super(obj);
    //     this.name = obj.name;
    // };
    
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

// Avec Sequelize il faut appeler la méthode statique init()
Tag.init({
    // Ici on liste mes props de Tag
    // Sequelize définit par défaut : un id (pas besoin de le définir), et des timestamp(cf 2ème objet)
    name: Sequelize.TEXT, // <= je dis a sequelize, name existe et est du type TEXT
    status: Sequelize.INTEGER,
}, {
    // Ici les options du modèle
    sequelize: dbConnection, // <= connexion à la BDD
    createdAt: "created_at", // <= le nom des champs timestamps (on peut passer false pour les désactiver !)
    updatedAt: "updated_at",
    
    tableName: "tags" // on donne la table qui correspond au model
});

// On export la classe !
module.exports = Tag;