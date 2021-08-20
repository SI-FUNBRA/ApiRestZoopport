const {Model,DataTypes}=require('sequelize');
const sequelize=require('../db');

class MetodoDePagoModel extends Model {}

MetodoDePagoModel.init({
    idMetodoPago:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombreMetodoPago:{
        type:DataTypes.STRING(20),
        allowNull:false
    }
},
{
    sequelize,
    modelName:'metododepago',
    timestamps:false,

    freezeTableName:true
});

module.exports=MetodoDePagoModel;