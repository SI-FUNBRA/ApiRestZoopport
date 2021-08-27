const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const TipoAnimal = require('./tipoanimal');

class Especie extends Model {}
Especie.init({
    
    idEspecie: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreEspecie: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{
            is: {
                 is: ["^[a-z]+$",'i'],
                 msg:"La especie solo debe contener letras"
            }
        }
    } 
}, {
    sequelize,
    modelName: "Especie",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de TipoAnimal
Especie.belongsTo(TipoAnimal,{ foreignKey: 'idTipoAnimal_FK'});
TipoAnimal.hasMany(Especie,{ foreignKey: 'idTipoAnimal_FK'});

module.exports = Especie;