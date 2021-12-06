const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class DocumentoSolicitud extends Model {}
DocumentoSolicitud.init({
    
    idDocumentoSolicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    urlDocumento: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    file:{
        type: DataTypes.BLOB,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "DocumentoSolicitud",
    timestamps: false,
    freezeTableName: true
});

module.exports = DocumentoSolicitud;