const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const TipoDoc = require('./tipoDoc');
const Credenciales = require('./credenciales');
const Ciudad = require('./ciudad');

class Usuarios extends Model {}
Usuarios.init({
    
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreUsuario: {
        type: DataTypes.STRING(25),
        allowNull: false,
        
    },
    apellidoUsuario: {
        type: DataTypes.STRING(25),
        allowNull: false,
        
    },
    
    correoUsuario: {
        type: DataTypes.STRING(40),
        validate: {
            isEmail: {
                args: true,
                msg: "El campo tiene que ser un correo valido"
            }
            
        },
        unique: {
            args:true,
            msg: "Esta direccion de Correo ya fue registrado en nuestra base de datos"
        },
        allowNull: false
    },
    telefonoFijo: DataTypes.INTEGER,

    telefonoCelular:{
        type: DataTypes.STRING(20),
        allowNull:false,
    },
    
    fechaNacimientoUsuario: {
        type: DataTypes.DATEONLY,
        allowNull:false,
        validate:{
            isDate:{
                args:true,
                msg:"La fecha de nacimiento de usuario tiene que contener el formato AAAA-MM-DD"
            }
        }
    },
    
    idTipoDocumento_FK:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    numeroDocumento: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{
            isNumeric:{
                args: true,
                msg:"El numero de documento solo puede recibir numeros"
            },
            len:{
                args:[7,20],
                msg: "Minimo requerido de caracteres es 7 y maximo 20(Num Doc)"
            }
        },
        unique: {
            args:true,
            msg: "Este numero de documento ya fue registrado en nuestra base de datos"
        }
    },
    fechaExpedicionDoc:{
        type: DataTypes.DATEONLY,
        allowNull:false,
        validate:{
            isDate:{
                args:true,
                msg:"La fecha de expedicion para el documento de usuario tiene que contener el formato AAAA-MM-DD"
            }
        }
    },

    LugarExpedicionDoc:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    estadoUsuario: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: "Usuario",
    timestamps: false,
    freezeTableName: true
});

//Relacion 1:1 con Credenciales
Usuarios.hasOne(Credenciales,{ foreignKey: 'CredencialesUsuario_FK'});
Credenciales.belongsTo(Usuarios,{ foreignKey: 'CredencialesUsuario_FK'});

//Relacion de 1:M con la tabla de TipoDoc
Usuarios.belongsTo(TipoDoc,{ foreignKey: 'idTipoDocumento_FK'});
TipoDoc.hasMany(Usuarios,{ foreignKey: 'idTipoDocumento_FK'});

//Relacion de 1:M con la tabla de Ciudad(Para el lugar de expedicion del documento)
Usuarios.belongsTo(Ciudad,{as:'LugarExpedicionDocu',foreignKey: 'LugarExpedicionDoc'});
Ciudad.hasMany(Usuarios,{foreignKey: 'LugarExpedicionDoc'});

//Relacion de 1:M con la tabla de Barrio
Usuarios.belongsTo(Ciudad,{ foreignKey: 'idCiudad_FK'});
Ciudad.hasMany(Usuarios,{ foreignKey: 'idCiudad_FK'});


module.exports = Usuarios;