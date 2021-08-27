const router=require('express').Router();
const DonacionEconomicaModel=require('../../database/Models/DonacionEconomicaModel');
const MetodoDePago = require('../../database/models/MetodoDePagoModel');
const Usuarios = require('../../database/models/usuario');

//Rutas
//Metodo para la DonacionEconomica /api/DonacionEconomica
router.get('/', async (req,res)=>{
    const donacioneconomicaFINDALL= await DonacionEconomicaModel.findAll({
        include: [{
            model: MetodoDePago,
            attributes: ['nombreMetodoPago']
        },{
            model: Usuarios,
            attributes: ['nombreUsuario','apellidoUsuario','correoUsuario']
        }],
        attributes:['idDonacionEconomica','fechaDonacion','montoDonacion']
    })
    res.json(donacioneconomicaFINDALL);

});

//CREATE
router.post('/',async(req,res)=>{
    const donacioneconomicaCREATE=await DonacionEconomicaModel.create({
        fechaDonacion:req.body.fechaDonacion,
        montoDonacion:req.body.montoDonacion,
        idMetodoDePago_FK:req.body.idMetodoDePago_FK,
        idUsuario_FK:req.body.idUsuario_FK
    }).catch(err=>{
        res.json({err:"error al Registrar una donacion economica",detallesError:err.errors[0]});
    });
    res.json(donacioneconomicaCREATE);

    res.status(201).json({success: "Donacion Economica Creada Con Exito"});
});

//READ -> /api/DonacionEconomica/:idDonacionEconomica
router.get('/:idDonacionEconomica',async(req,res)=>{
    const donacioneconomicaREAD=await DonacionEconomicaModel.findByPk(req.params.idDonacionEconomica)
    res.json(donacioneconomicaREAD);
});

//UPDATE  /api/DonacionEconomica/:idDonacionEconomica
router.put('/:idDonacionEconomica',async(req,res)=>{
    const donacioneconomicaPUT=await DonacionEconomicaModel.update({
        fechaDonacion:req.body.fechaDonacion,
        montoDonacion:req.body.montoDonacion,
        idMetodoDePago_FK:req.body.idMetodoDePago_FK,
        idUsuario_FK:req.body.idUsuario_FK
    },{
        where:{
            idDonacionEconomica:req.params.idDonacionEconomica
        }
    });
    res.json(donacioneconomicaPUT);
});

//DELETE /api/DonacionEconomica/:idDonacionEconomica
router.delete('/:idDonacionEconomica',async(req,res)=>{
    const donacioneconomicaDELETE=await DonacionEconomicaModel.destroy({
        where:{
            idDonacionEconomica:req.params.idDonacionEconomica
        }
    });
    res.json(donacioneconomicaDELETE);

});

module.exports=router;