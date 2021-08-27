const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Pregunta extends Model {}
Pregunta.init({
    
    idPregunta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    descripcionPregunta: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Pregunta",
    timestamps: false,
    freezeTableName: true
});

module.exports = Pregunta;