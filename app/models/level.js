const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection');

class Level extends Sequelize.Model {};

Level.init({
    name: {
        type: Sequelize.TEXT,
        allowNull: false,   
    },
    status: Sequelize.INTEGER,
}, {
    sequelize: dbConnection, 
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "levels" 
});

// On export la classe !
module.exports = Level;