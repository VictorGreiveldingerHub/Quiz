const  Sequelize  = require('sequelize');
const dbConnection = require('../dbConnection');

// On require d'autre modèle pour les associations
// const User = require('./user');

// Création d'une classe par entité 
class Quiz extends Sequelize.Model {
    getFullName() {
        return `${this.name}`;
    };
    
};

Quiz.init({
    title: {
       type: Sequelize.TEXT,
       allowNull: false 
    },
    description: Sequelize.TEXT,
    status: Sequelize.INTEGER,
    // Pour l'instant on ne déf pas ça => on verra cela avec les Associations
    // app_users_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false 
    // }
}, {
    sequelize: dbConnection,
    tableName: "quizzes",
    createdAt: "created_at",
    updatedAt: "updated_at",
});

/**
 * ASSOCIATIONS 
 * Une fois le modèle définit avec init(), on peut définir les liens entre les différentes entités.
 * Pour ça on utilise le principe d'association (voir doc Seq)
*/

// Dans un fichier a part nommé associations.js

// On export la classe !
module.exports = Quiz;