const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class TipoAnimal extends Model {}
TipoAnimal.init({
    
    idTipoAnimal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreTipoAnimal: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: {
            args:true,
            msg: "Este TipoAnimal ya fue registrado en nuestra base de datos"
        }
    }
}, {
    sequelize,
    modelName: "TipoAnimal",
    timestamps: false,
    freezeTableName: true
});

module.exports = TipoAnimal;