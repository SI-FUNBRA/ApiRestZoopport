const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Respuesta extends Model {}
Respuesta.init({
    
    idRespuesta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    descripcionRespuesta: {
        type: DataTypes.STRING(20),
        allowNull: false
    }

    
}, {
    sequelize,
    modelName: "Respuesta",
    timestamps: false,
    freezeTableName: true
});

module.exports = Respuesta;