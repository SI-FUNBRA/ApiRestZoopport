const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const TipoAntecedente = require('./tipoAntecedente');

class Antecedente extends Model {}
Antecedente.init({
    
    idAntecedente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreAntecedente: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    detalleAntecedente: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: "Antecedente",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de TipoAntecedente
Antecedente.belongsTo(TipoAntecedente,{ foreignKey: 'idTipoAntecedente_FK'});
TipoAntecedente.hasMany(Antecedente,{ foreignKey: 'idTipoAntecedente_FK'});

module.exports = Antecedente;