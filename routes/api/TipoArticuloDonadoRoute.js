const router=require('express').Router();
const TipoArticuloDonadoModel=require('../../database/models/TipoArticuloDonadoModel');

router.get('/', async(req,res)=>{
    const tipoarticulodonadoFINDALL=await TipoArticuloDonadoModel.findAll()
    res.json(tipoarticulodonadoFINDALL);
});

//CREATE
router.post('/',async(req,res)=>{
    const tipoarticulodonadoCREATE=await TipoArticuloDonadoModel.create({
        idTipoArticuloDonado:req.body.idTipoArticuloDonado,
        nombreTipoArticulo:req.body.nombreTipoArticulo
    }).catch(err=>{
        res.json({err:"error al crear un tipo articulo donado",detallesError:err.errors[0]});
    });
    
    res.json(tipoarticulodonadoCREATE);

    res.status(201).json({success: "Tipo Articulo Donado Creado Con Exito"});
});

//READ 
router.get('/:idTipoArticuloDonado',async(req,res)=>{
    const tipoarticulodonadoREAD=await TipoArticuloDonadoModel.findByPk(req.params.idTipoArticuloDonado)
    res.json(tipoarticulodonadoREAD);
});

//UPDATE
router.put('/:idTipoArticuloDonado',async(req,res)=>{
    const tipoarticulodonadoPUT=await TipoArticuloDonadoModel.update({
        nombreTipoArticulo:req.body.nombreTipoArticulo
    },{
        where:{
            idTipoArticuloDonado:req.params.idTipoArticuloDonado
        }
    });
    res.json(tipoarticulodonadoPUT);
});

//DELETE
router.delete('/:idTipoArticuloDonado', async(req,res)=>{
    const tipoarticulodonadoDELETE=await TipoArticuloDonadoModel.destroy({
        where:{
            idTipoArticuloDonado:req.params.idTipoArticuloDonado
        }
    });
    res.json(tipoarticulodonadoDELETE);
});

module.exports=router;
