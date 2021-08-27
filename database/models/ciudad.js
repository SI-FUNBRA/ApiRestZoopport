const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Departamento = require('./departamento');

class Ciudad extends Model {}
Ciudad.init({
    
    idCiudad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreCiudad: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{
            is: {
                 is: ["^[a-z]+$",'i'],
                 msg:"La ciudad solo debe contener letras"
            }
        }
    }
}, {
    sequelize,
    modelName: "Ciudad",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de Pais
Ciudad.belongsTo(Departamento,{ foreignKey: 'idDepartamento_FK'});
Departamento.hasMany(Ciudad,{ foreignKey: 'idDepartamento_FK'});

module.exports = Ciudad;