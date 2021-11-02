const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Pais = require('./pais');

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
        unique: {
            args:true,
            msg: "Esta Ciudad ya fue registrado en nuestra base de datos"
        }
    }
}, {
    sequelize,
    modelName: "Ciudad",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de Pais
Ciudad.belongsTo(Pais,{ foreignKey: 'idPais_FK'});
Pais.hasMany(Ciudad,{ foreignKey: 'idPais_FK'});

module.exports = Ciudad;