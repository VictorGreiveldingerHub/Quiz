const  Sequelize  = require('sequelize');
const dbConnection = require('../dbConnection');

// Création d'une classe par entité 
class Quiz extends Sequelize.Model {
    
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
})

// On export la classe !
module.exports = Quiz;