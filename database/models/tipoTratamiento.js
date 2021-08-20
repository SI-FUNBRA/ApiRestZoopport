const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class TipoTratamiento extends Model {}
TipoTratamiento.init({
    
    idTipoTratamiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreTipoTratamiento: {
        type: DataTypes.STRING(20),
        allowNull: false
    }

    
}, {
    sequelize,
    modelName: "TipoTratamiento",
    timestamps: false,
    freezeTableName: true
});

module.exports = TipoTratamiento;