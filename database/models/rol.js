const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Rol extends Model {}
Rol.init({
    
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreRol: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{
            isAlpha: {
                 msg:"El Rol solo debe contener letras"
            }
            
        },
        unique: true
        
    } 
}, {
    sequelize,
    modelName: "Rol",
    timestamps: false,
    freezeTableName: true
});

module.exports = Rol;