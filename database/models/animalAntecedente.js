const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Animal = require('./animal');
const Antecedente = require('./antecedente');

class AnimalAntecedente extends Model {}
AnimalAntecedente.init({
    
    idAnimal: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idAntecedente: {
        type: DataTypes.INTEGER,
        primaryKey: true 
    }
}, {
    sequelize,
    modelName: "AnimalAntecedente",
    timestamps: false,
    freezeTableName: true
});

AnimalAntecedente.belongsTo(Animal,{foreignKey: 'idAnimal'});
Animal.hasMany(AnimalAntecedente,{foreignKey:'idAnimal'});

AnimalAntecedente.belongsTo(Antecedente,{foreignKey: 'idAntecedente'});
Antecedente.hasMany(AnimalAntecedente,{foreignKey:'idAntecedente'});



module.exports = AnimalAntecedente;