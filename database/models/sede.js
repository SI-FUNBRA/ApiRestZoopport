const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Pais = require('./pais');

class Sede extends Model {}
Sede.init({
    
    idSede: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    telefonoSede: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    correoSede: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Nomenclatura: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    
}, {
    sequelize,
    modelName: "Sede",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de Pais
Sede.belongsTo(Pais,{ foreignKey: 'idPais_FK'});
Pais.hasMany(Sede,{ foreignKey: 'idPais_FK'});

module.exports = Sede;