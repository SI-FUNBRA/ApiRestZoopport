const router=require('express').Router();
const ArticuloDonadoModel=require('../../database/models/ArticuloDonadoModel');

//Rutas
//Metodo para la DonacionEconomica /api/DonacionEconomica
router.get('/', async (req,res)=>{
    const articulodonadoFINDALL= await ArticuloDonadoModel.findAll()
    res.json(articulodonadoFINDALL);

});

//CREATE
router.post('/',async(req,res)=>{
    const articulodonadoCREATE=await ArticuloDonadoModel.create({
        idArticuloDonado:req.body.idArticuloDonado,
        nombreArticuloDonado:req.body.nombreArticuloDonado,
        cantidadArticuloDonado:req.body.cantidadArticuloDonado,
        idDonacionEspecie_FK:req.body.idDonacionEspecie_FK,
        idTipoArticuloDonado_FK:req.body.idTipoArticuloDonado_FK

    });
    res.json(articulodonadoCREATE);
});

//READ 
router.get('/:idArticuloDonado',async(req,res)=>{
    const articulodonadoREAD=await ArticuloDonadoModel.findByPk(req.params.idArticuloDonado)
    res.json(articulodonadoREAD);
});

//UPDATE  
router.put('/:idArticuloDonado',async(req,res)=>{
    const articulodonadoPUT=await ArticuloDonadoModel.update({
        nombreArticuloDonado:req.body.nombreArticuloDonado,
        cantidadArticuloDonado:req.body.cantidadArticuloDonado,
        idDonacionEspecie_FK:req.body.idDonacionEspecie_FK,
        idTipoArticuloDonado_FK:req.body.idTipoArticuloDonado_FK
    },{
        where:{
            idArticuloDonado:req.body.idArticuloDonado
        }
    });
    res.json(articulodonadoPUT);
});

//DELETE 
router.delete('/:idArticuloDonado',async(req,res)=>{
    const articulodonadoDELETE=await ArticuloDonadoModel.destroy({
        where:{
            idArticuloDonado:req.body.idArticuloDonado
        }
    });
    res.json(articulodonadoDELETE);

});

module.exports=router;