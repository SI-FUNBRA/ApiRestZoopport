const {Model,DataTypes, STRING}=require('sequelize');
const sequelize=require('../db');
const ArticuloDonadoModel = require('./ArticuloDonadoModel');

class TipoArticuloDonadoModel extends Model{}

TipoArticuloDonadoModel.init({
    idTipoArticuloDonado:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombreTipoArticulo:{
        type:DataTypes.STRING(25),
        allowNull: false
    }
},{
    sequelize,
    modelName:'TipoArticuloDonado',
    timestamps:false,

    freezeTableName:true
});

//Relacion ArticuloDonado M:1 TipoArticuloDonado
TipoArticuloDonadoModel.hasMany(ArticuloDonadoModel,{foreignKey:'idTipoArticuloDonado_FK'});
//Relacion TipoArticuloDonado 1:M ArticuloDonado
ArticuloDonadoModel.belongsTo(TipoArticuloDonadoModel,{foreignKey:'idTipoArticuloDonado_FK'});

module.exports=TipoArticuloDonadoModel;