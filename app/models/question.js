const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection');

// Création d'une classe par entité 
class Question extends Sequelize.Model {

};

Question.init({
    question: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    anecdote: Sequelize.TEXT,
    wiki: Sequelize.TEXT,
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    // levels_id: {
    //         type: Sequelize.INTEGER,
    //         allowNull: false 
    // },
    // answers_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false 
    // },
    // quizzes_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false 
    // }
}, {
    sequelize: dbConnection,
    tableName: "questions",
    createdAt: "created_at",
    updatedAt: "updated_at"
});

// On export la classe !
module.exports = Question;