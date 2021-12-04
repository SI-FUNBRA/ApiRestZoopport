const router=require('express').Router();
const MetodoDePagoModel=require('../../database/Models/MetodoDePagoModel');

//Rutas
//Metodo para Metodo de pago /api/MotodoDePago
router.get('/',async (req,res)=>{
    const metododepagoFINDALL = await MetodoDePagoModel.findAll();
    res.json(metododepagoFINDALL);
});

//CREATE
router.post('/',async(req,res)=>{
    const metododepagoCREATE = await MetodoDePagoModel.create({
        nombreMetodoPago:req.body.nombreMetodoPago
    }).catch(err=>{
        res.json({err:"error al crear un metodo de pago",detallesError:err.errors[0]});
    });
    res.json(metododepagoCREATE);

    res.status(201).json({success: "Metodo de pago Creado Con Exito"});
});

//READ -> /api/MetodoDePago/:idMetodoPago
router.get('/:idMetodoPago',async(req,res)=>{
    const metododepagoREAD=await MetodoDePagoModel.findByPk(req.params.idMetodoPago)
    res.json(metododepagoREAD);
});

//UPDATE /api/MetodoDePago/:idMetodoPago
router.put('/:idMetodoPago',async(req,res)=>{
    const metodopagoPUT= await MetodoDePagoModel.update({
        nombreMetodoPago:req.body.nombreMetodoPago
    },{
        where:{
            idMetodoPago:req.params.idMetodoPago
        }
    });
    res.json(metodopagoPUT);
}); 

//DELETE /api/MetodoDePago/:idMetodoPago
router.delete('/:idMetodoPago',async(req,res)=>{
    const metododepagoDELETE=await MetodoDePagoModel.destroy({
        where:{
            idMetodoPago:req.params.idMetodoPago
        }
    });
    res.json(metododepagoDELETE);
});

module.exports=router;