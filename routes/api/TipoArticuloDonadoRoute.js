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
    });
    res.json(tipoarticulodonadoCREATE);
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
