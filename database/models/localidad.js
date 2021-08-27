const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ciudad = require('./ciudad');

class Localidad extends Model {}
Localidad.init({
    
    idLocalidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreLocalidad: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{
            is: {
                 is: ["^[a-z]+$",'i'],
                 msg:"La localidad solo debe contener letras"
            }
        },
        unique: true
    }  
}, {
    sequelize,
    modelName: "Localidad",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de Pais
Localidad.belongsTo(Ciudad,{ foreignKey: 'idCiudad_FK'});
Ciudad.hasMany(Localidad,{ foreignKey: 'idCiudad_FK'});

module.exports = Localidad;