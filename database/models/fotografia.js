const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Fotografia extends Model {}
Fotografia.init({
    
    idFotografia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    urlFotografia: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    file:{
        type: DataTypes.BLOB,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Fotografia",
    timestamps: false,
    freezeTableName: true
});

module.exports = Fotografia;