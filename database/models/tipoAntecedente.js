const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class TipoAntecedente extends Model {}
TipoAntecedente.init({
    
    idTipoAntecedente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreTipoAntecedente: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "TipoAntecedente",
    timestamps: false,
    freezeTableName: true
});

module.exports = TipoAntecedente;