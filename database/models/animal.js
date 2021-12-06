const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

<<<<<<< HEAD
const TipoAnimal = require('./TipoAnimal');
const Enfermedad = require('./Enfermedad');
const Tratamiento = require('./Tratamiento');
const Fotografia = require('./Fotografia');
=======
const EstadoAnimal = require('./estadoAnimal');
const Especie = require('./especie');
>>>>>>> origin/Api

class Animal extends Model {}
Animal.init({
    
    idAnimal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreAnimal: {
        type: DataTypes.STRING(20),
        allowNull: false,
        
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    motivoLlegada: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING(7),
        allowNull: false
    },
    idEnfermedad_FK: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    idTratamiento_FK: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estadoAnimal: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    idTipoAnimal_FK: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idFotografia_FK: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Animal",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de Enfermedad
Animal.belongsTo(Enfermedad,{ foreignKey: 'idEnfermedad_FK'});
Enfermedad.hasMany(Animal,{ foreignKey: 'idEnfermedad_FK'});

//Relacion de 1:M con la tabla de Enfermedad
Animal.belongsTo(Tratamiento,{ foreignKey: 'idTratamiento_FK'});
Tratamiento.hasMany(Animal,{ foreignKey: 'idTratamiento_FK'});

//Relacion de 1:M con la tabla de TipoAnimal
Animal.belongsTo(TipoAnimal,{ foreignKey: 'idTipoAnimal_FK'});
TipoAnimal.hasMany(Animal,{ foreignKey: 'idTipoAnimal_FK'});

//Relacion de 1:M con la tabla de Fotografia
Animal.belongsTo(Fotografia,{ foreignKey: 'idFotografia_FK'});
Fotografia.hasMany(Animal,{ foreignKey: 'idFotografia_FK'});

module.exports = Animal;