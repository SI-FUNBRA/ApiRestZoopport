const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Animal = require('./animal');

class Fotografia extends Model {}
Fotografia.init({
    
    idFotografia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    Foto: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcionFoto:{
        type: DataTypes.STRING(100),
        allowNull: false
    }

    
}, {
    sequelize,
    modelName: "Fotografia",
    timestamps: false,
    freezeTableName: true
});

Fotografia.belongsTo(Animal,{ foreignKey: 'idAnimal_FK'});
Animal.hasMany(Fotografia,{ foreignKey: 'idAnimal_FK'});



module.exports = Fotografia;