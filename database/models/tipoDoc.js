const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class TipoDoc extends Model {}
TipoDoc.init({
    
    idTipoDoc: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreTipoDoc: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{
            isAlpha: {
                 msg:"El tipo documento solo debe contener letras"
            }
        },
        unique: true
    }
}, {
    sequelize,
    modelName: "TipoDocumento",
    timestamps: false,
    freezeTableName: true
});

module.exports = TipoDoc;