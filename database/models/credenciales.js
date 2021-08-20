const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Credenciales extends Model {}
Credenciales.init({
     id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    pass: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    sequelize,
    modelName: "Credencial",
    timestamps: false,
    freezeTableName: true
});


module.exports = Credenciales;