const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Usuario = require('./usuario');
const Animal = require('./animal');
const Sede = require('./sede');


class SolicituAdopcion extends Model {}
SolicituAdopcion.init({
    
    idSolicituAdopcion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    estadoSolicituAdopcion: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{
            isIn: {
                args:[["Activo", "Inactivo", "Suspendido"]],
                msg: "El estado animal no coincide con ninguno registrado en la base de datos"
            },
        }
    },
    fechaSolicitud:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            isDate:{
                args:true,
                msg:"La fecha de solicitud adopcion tiene que contener el formato AAAA-MM-DD"
            }
        }
    }  
}, {
    sequelize,
    modelName: "SolicituAdopcion",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de Usuario
SolicituAdopcion.belongsTo(Usuario,{ foreignKey: 'idUsuario_FK'});
Usuario.hasMany(SolicituAdopcion,{ foreignKey: 'idUsuario_FK'});

//Relacion de 1:M con la tabla de Animal
SolicituAdopcion.belongsTo(Animal,{ foreignKey: 'idAnimal_FK'});
Animal.hasMany(SolicituAdopcion,{ foreignKey: 'idAnimal_FK'});

//Relacion de 1:M con la tabla de Sede
SolicituAdopcion.belongsTo(Sede,{ foreignKey: 'idSede_FK'});
Sede.hasMany(SolicituAdopcion,{ foreignKey: 'idSede_FK'});


module.exports = SolicituAdopcion;