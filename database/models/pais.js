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
        allowNull: false,
        unique: {
            args:true,
            msg: "Este Pais ya fue registrado en nuestra base de datos"
        }
    }
}, {
    sequelize,
    modelName: "Pais",
    timestamps: false,
    freezeTableName: true
});

module.exports = Pais;