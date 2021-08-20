const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Pais extends Model {}
Pais.init({
    
    idPais: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombrePais: {
        type: DataTypes.STRING(20),
        allowNull: false
    }

    
}, {
    sequelize,
    modelName: "Pais",
    timestamps: false,
    freezeTableName: true
});

module.exports = Pais;