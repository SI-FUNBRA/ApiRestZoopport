const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const EstadoAnimal = require('./estadoAnimal');
const Especie = require('./Especie');

class Animal extends Model {}
Animal.init({
    
    idAnimal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreAnimal: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    edad: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            isDate:{
                args:true,
                msg:"La edad tiene que contener el formato AAAA-MM-DD permitiendo ingresar la fecha de nacimiento del animal"
            }
        }
    },
    fechaLlegada: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            isDate:{
                args:true,
                msg:"La fecha de llegada del animal tiene que contener el formato AAAA-MM-DD"
            }
        }
    },
    historialTratamiento: {
        type: DataTypes.STRING(500),
        allowNull: false
    },

    
}, {
    sequelize,
    modelName: "Animal",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de EstadoAnimal
Animal.belongsTo(EstadoAnimal,{ foreignKey: 'idEstadoAnimal_FK'});
EstadoAnimal.hasMany(Animal,{ foreignKey: 'idEstadoAnimal_FK'});

//Relacion de 1:M con la tabla de Especie
Animal.belongsTo(Especie,{ foreignKey: 'idEspecie_FK'});
Especie.hasMany(Animal,{ foreignKey: 'idEspecie_FK'});

module.exports = Animal;