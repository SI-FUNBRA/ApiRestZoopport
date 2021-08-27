const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const TipoDoc = require('./tipoDoc');
const Credenciales = require('./credenciales');
const Ciudad = require('./ciudad');
const Barrio = require('./barrio');

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
        validate:{
            is: {
                 is: ["^[a-z]+$",'i'],
                 msg:"El Nombre solo debe contener letras"
            }
        }
    },
    apellidoUsuario: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate:{
            is: {
                 is: ["^[a-z]+$",'i'],
                 msg:"El Nombre solo debe contener letras"
            }
        }
    },
    
    correoUsuario: {
        type: DataTypes.STRING(40),
        validate: {
            isEmail: {
                args: true,
                msg: "El campo tiene que ser un correo valido"
            }
            
        },
        unique:true,
        allowNull: false
    },
    telefonoFijo: DataTypes.INTEGER,

    telefonoCelular:{
        type: DataTypes.STRING(20),
        allowNull:false,
        validate:{
            is:{
                is: /^(\(?\+[\d]{1,3}\)?)\s?([\d]{1,5})\s?([\d][\s\.-]?){6,7}$/,
                msg: "El numero ingresado debe ser como, ejemplo: +57 3001233210"
            }
        }
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
            } ,
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
Usuarios.belongsTo(Ciudad,{foreignKey: 'LugarExpedicionDoc'});
Ciudad.hasMany(Usuarios,{foreignKey: 'LugarExpedicionDoc'});

//Relacion de 1:M con la tabla de Barrio
Usuarios.belongsTo(Barrio,{ foreignKey: 'idBarrio_FK'});
Barrio.hasMany(Usuarios,{ foreignKey: 'idBarrio_FK'});


module.exports = Usuarios;