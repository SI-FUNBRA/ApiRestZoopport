const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Tratamiento extends Model {}
Tratamiento.init({
    
    idTratamiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreTratamiento: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
            args : true,
            msg: "Este registro ya se encuentra en nuestra base de datos"
        }
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: "Tratamiento",
    timestamps: false,
    freezeTableName: true
});


module.exports = Tratamiento;