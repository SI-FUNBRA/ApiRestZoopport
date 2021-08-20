const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');


const Usuario = require('./usuario');
const Rol = require('./rol');

class UsuarioRol extends Model {}
UsuarioRol.init({
    
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    
    
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    
    
}, {
    sequelize,
    modelName: "UsuarioRol",
    timestamps: false,
    freezeTableName: true
});


//Relacion de 1:M con la tabla de Usuario(tabla debil)
UsuarioRol.belongsTo(Usuario,{ foreignKey: 'idUsuario'});
//Relacion M:1 con UsuarioRol(Usuarios)
Usuario.hasOne(UsuarioRol,{ foreignKey: 'idUsuario'});



//Relacion de 1:M con la tabla de Rol(tabla debil)
UsuarioRol.belongsTo(Rol,{ foreignKey: 'idRol'});
//Relacion M:1 con UsuarioRol(rol)
Rol.hasOne(UsuarioRol,{ foreignKey: 'idRol'});




module.exports = UsuarioRol;