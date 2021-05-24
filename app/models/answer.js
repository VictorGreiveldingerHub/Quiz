const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection');

class Answer extends Sequelize.Model {
    
};

Answer.init({
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: Sequelize.INTEGER,
    // question_id: Sequelize.INTEGER
}, {
    sequelize: dbConnection,
    updatedAt: "updated_at",
    createdAt: "created_at",
    tableName: "answers"
})
// On export la classe !
module.exports = Answer;