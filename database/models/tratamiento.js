const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const TipoTratamiento = require('./tipoTratamiento');

class Tratamiento extends Model {}
Tratamiento.init({
    
    idTratamiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreTratamiento: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    detalleTratamiento: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

    
}, {
    sequelize,
    modelName: "Tratamiento",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de TipoTratamiento
Tratamiento.belongsTo(TipoTratamiento,{ foreignKey: 'idTipoTratamiento_FK'});
TipoTratamiento.hasMany(Tratamiento,{ foreignKey: 'idTipoTratamiento_FK'});

module.exports = Tratamiento;