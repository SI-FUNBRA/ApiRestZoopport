const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Enfermedad extends Model {}
Enfermedad.init({
    
    idEnfermedad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreEnfermedad: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: {
            args : true,
            msg: "Este registro ya se encuentra en nuestra base de datos"
        }
    }
}, {
    sequelize,
    modelName: "Enfermedad",
    timestamps: false,
    freezeTableName: true
});

module.exports = Enfermedad;