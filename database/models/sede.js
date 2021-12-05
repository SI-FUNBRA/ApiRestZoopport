const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Pais = require('./pais');

class Sede extends Model {}
Sede.init({
    
    idSede: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreSede: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    telefonoSede: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: {
            args:true,
            msg: "Este Numero De Telefono ya fue registrado en nuestra base de datos"
        }
    },
    correoSede: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg: "El campo tiene que ser un correo valido"
            }
        },
        unique: {
            args:true,
            msg: "Este Correo ya fue registrado en nuestra base de datos"
        }
    },
    Nomenclatura: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Sede",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de Pais
Sede.belongsTo(Pais,{ foreignKey: 'idPais_FK'});
Pais.hasMany(Sede,{ foreignKey: 'idPais_FK'});

module.exports = Sede;