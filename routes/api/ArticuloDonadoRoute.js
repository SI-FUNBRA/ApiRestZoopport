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
        nombreArticuloDonado:req.body.nombreArticuloDonado,
        cantidadArticuloDonado:req.body.cantidadArticuloDonado,
        idDonacionEspecie_FK:req.body.idDonacionEspecie_FK,
        idTipoArticuloDonado_FK:req.body.idTipoArticuloDonado_FK

    }).catch(err=>{
        res.json({err:"error al crear un articulo donado",detallesError:err.errors[0]});
    });
    res.json(articulodonadoCREATE);

    res.status(201).json({success: "Articulo Donado Creado Con Exito"});
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