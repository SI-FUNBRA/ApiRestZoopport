const {Model,DataTypes}=require('sequelize');
const sequelize=require('../db');
const ArticuloDonadoModel = require('./ArticuloDonadoModel');

class SolicitudDonacionEspecieModel extends Model {}

SolicitudDonacionEspecieModel.init({
    idDonacionEspecie:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    estadoSolicitud:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
    fechaEntrega:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        validate:{
            isDate:{
                args:true,
                msg:"La fecha de entrega de donacion en especie tiene que contener el formato AAAA-MM-DD"
            }
        }
    },
    lugarEntrega:{
        type:DataTypes.STRING(70),
        allowNull:false
    }
},{
    sequelize,
    modelName:'SolicitudDonacionEspecie',
    timestamps:false,

    freezeTableName:true
});

//Relacion ArticuloDonado M:1 SolicitudDonacionEspecie
SolicitudDonacionEspecieModel.hasMany(ArticuloDonadoModel,{foreignKey:'idDonacionEspecie_FK'});
//Relacion SolicitudDonacionEspecie 1:M ArticuloDonado
ArticuloDonadoModel.belongsTo(SolicitudDonacionEspecieModel,{foreignKey:'idDonacionEspecie_FK'});

module.exports=SolicitudDonacionEspecieModel;