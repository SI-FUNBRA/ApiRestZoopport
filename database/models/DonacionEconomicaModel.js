const {Model,DataTypes}=require('sequelize');
const sequelize=require('../db');

const MetodoDePagoModel=require('./MetodoDePagoModel');
const Usuarios = require('./usuario');

class DonacionEconomicaModel extends Model {}

DonacionEconomicaModel.init({
    idDonacionEconomica:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    fechaDonacion:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        validate:{
            isDate:{
                args:true,
                msg:"La fecha de donacion tiene que contener el formato AAAA-MM-DD"
            }
        }
    },
    montoDonacion:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            isFloat:{
                args:true,
                msg:"El monto donado tiene que ser un numero"
            },
            min:{
                args:1000,
                msg:"El valor de la donacion tiene que ser mayor o igual a 1000 pesos"
            }
        }
    }
},{
    sequelize,
    modelName:'donacioneconomica',
    timestamps: false,

    freezeTableName:true
});

//Relacion MetodoDePago M:1 DonacionEconomica
MetodoDePagoModel.hasMany(DonacionEconomicaModel,{foreignKey:'idMetodoDePago_FK'});
//Relacion DonacionEconomica 1:M MetodoDePago
DonacionEconomicaModel.belongsTo(MetodoDePagoModel,{foreignKey:'idMetodoDePago_FK'});

//Relacion Usuario M:1 DonacionEconomica
Usuarios.hasMany(DonacionEconomicaModel,{foreignKey:'idUsuario_FK'});
//Relacion DonacionEconomica 1:M Usuario
DonacionEconomicaModel.belongsTo(Usuarios,{foreignKey:'idUsuario_FK'});


module.exports=DonacionEconomicaModel;