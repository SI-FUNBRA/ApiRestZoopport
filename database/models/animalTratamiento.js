const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Animal = require('./animal');
const Tratamiento = require('./tratamiento');

class AnimalTratamiento extends Model {}
AnimalTratamiento.init({
    
    idAnimal: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idTratamiento: {
        type: DataTypes.INTEGER,
        primaryKey: true 
    },
    progreso:{
        type: DataTypes.STRING(500),
        allowNull: false
    },
    fechaInicioTratamiento:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    } 
}, {
    sequelize,
    modelName: "AnimalTratamiento",
    timestamps: false,
    freezeTableName: true
});

AnimalTratamiento.belongsTo(Animal,{foreignKey: 'idAnimal'});
Animal.hasMany(AnimalTratamiento,{foreignKey:'idAnimal'});

AnimalTratamiento.belongsTo(Tratamiento,{foreignKey: 'idTratamiento'});
Tratamiento.hasMany(AnimalTratamiento,{foreignKey:'idTratamiento'});



module.exports = AnimalTratamiento;