const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class EstadoAnimal extends Model {}
EstadoAnimal.init({
    
    idEstadoAnimal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreEstadoAnimal: {
        type: DataTypes.STRING(20),
        allowNull: false
    }

    
}, {
    sequelize,
    modelName: "EstadoAnimal",
    timestamps: false,
    freezeTableName: true
});

module.exports = EstadoAnimal;