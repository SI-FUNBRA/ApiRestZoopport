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
        validate:{
            is: {
                 is: ["^[a-z]+$",'i'],
                 msg:"El Animal solo debe contener letras"
            }
        },
        unique: true
    }
}, {
    sequelize,
    modelName: "TipoAnimal",
    timestamps: false,
    freezeTableName: true
});

module.exports = TipoAnimal;