const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Localidad = require('./localidad');

class Barrio extends Model {}
Barrio.init({
    
    idBarrio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreBarrio: {
        type: DataTypes.STRING(20),
        allowNull: false
    }

    
}, {
    sequelize,
    modelName: "Barrio",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de Pais
Barrio.belongsTo(Localidad,{ foreignKey: 'idLocalidad_FK'});
Localidad.hasMany(Barrio,{ foreignKey: 'idLocalidad_FK'});

module.exports = Barrio;