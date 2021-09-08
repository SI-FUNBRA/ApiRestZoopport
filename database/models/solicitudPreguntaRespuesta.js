const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const SolicitudAdopcion = require('./solicitudAdopcion');
const Pregunta = require('./pregunta');
const Respuesta = require('./respuesta');

class SolicitudPreguntaRespuesta extends Model {}
SolicitudPreguntaRespuesta.init({
    
    idSolicitudAdopcion: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idPregunta: {
        type: DataTypes.INTEGER,
        primaryKey: true 
    },
    idRespuesta: {
        type: DataTypes.INTEGER,
        primaryKey: true 
    },
}, {
    sequelize,
    modelName: "SolicitudPreguntaRespuesta",
    timestamps: false,
    freezeTableName: true
});

SolicitudPreguntaRespuesta.belongsTo(SolicitudAdopcion,{foreignKey: 'idSolicitudAdopcion'});
SolicitudAdopcion.hasMany(SolicitudPreguntaRespuesta,{foreignKey:'idSolicitudAdopcion'});

SolicitudPreguntaRespuesta.belongsTo(Pregunta,{foreignKey: 'idPregunta'});
Pregunta.hasMany(SolicitudPreguntaRespuesta,{foreignKey:'idPregunta'});

SolicitudPreguntaRespuesta.belongsTo(Respuesta,{foreignKey: 'idRespuesta'});
Respuesta.hasMany(SolicitudPreguntaRespuesta,{foreignKey:'idRespuesta'});


module.exports = SolicitudPreguntaRespuesta;