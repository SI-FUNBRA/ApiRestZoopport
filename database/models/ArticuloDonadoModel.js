const {Model,DataTypes}=require('sequelize');
const sequelize=require('../db');

class ArticuloDonadoModel extends Model {}

ArticuloDonadoModel.init({
    idArticuloDonado:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:false
    },
    nombreArticuloDonado:{
        type:DataTypes.STRING(25),
        allowNull:false
    },
    cantidadArticuloDonado:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isInt:{
                args:true,
                msg:"La cantidad de articulo(s) donado(s) tiene que ser un numero"
            },
            min:{
                args:1,
                msg:"El valor de la donacion en especie tiene que ser mayor o igual a 1 elemento"
            }
        }
    }
},{
    sequelize,
    modelName:'ArticuloDonado',
    timestamps:false,

    freezeTableName:true
});

module.exports=ArticuloDonadoModel;