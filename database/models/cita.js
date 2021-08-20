const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Sede = require('./sede');

class Cita extends Model {}
Cita.init({
    
    idCita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    fechaCita: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    motivoCita: {
        type: DataTypes.STRING(20),
        allowNull: false
    }

    
}, {
    sequelize,
    modelName: "Cita",
    timestamps: false,
    freezeTableName: true
});

//Relacion de 1:M con la tabla de Sede
Cita.belongsTo(Sede,{ foreignKey: 'idSede_FK'});
Sede.hasMany(Cita,{ foreignKey: 'idSede_FK'});

module.exports = Cita;