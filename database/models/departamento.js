const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Pais = require('./pais');

class Departamento extends Model {}
Departamento.init({
    
    idDepartamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreDepartamento: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{
            is: {
                 is: ["^[a-z]+$",'i'],
                 msg:"El Departamento solo debe contener letras"
            }
        },
        unique: true
    }
}, {
    sequelize,
    modelName: "Departamento",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de Pais
Departamento.belongsTo(Pais,{ foreignKey: 'idPais_FK'});
Pais.hasMany(Departamento,{ foreignKey: 'idPais_FK'});

module.exports = Departamento;