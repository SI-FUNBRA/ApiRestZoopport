const router=require('express').Router();
const SolicitudDonacionEspecieModel=require('../../database/models/SolicitudDonacionEspecieModel');
const ArticuloDonadoModel=require('../../database/models/ArticuloDonadoModel');


router.get('/', async (req,res)=>{
    const solicituddonacionespecieFINDALL= await SolicitudDonacionEspecieModel.findAll({
        include:{
            model:ArticuloDonadoModel
        }
    })
    res.json(solicituddonacionespecieFINDALL);

});

//CREATE
router.post('/',async(req,res)=>{

    
    const solicituddonacionespecieCREATE = await SolicitudDonacionEspecieModel.create({
        fechaEntrega: req.body.fechaEntrega,
        lugarEntrega: req.body.lugarEntrega,
        idUsuario_FK: req.idUsuario
        }
    )

    const ArticulosDonados = req.body.ArticulosDonados

    ArticulosDonados.forEach(async(el) => {
        const articulodonado = await ArticuloDonadoModel.create({
            nombreArticuloDonado: el.nombreArticuloDonado,
            cantidadArticuloDonado: el.cantidadArticuloDonado,
            idTipoArticuloDonado_FK: el.idTipoArticuloDonado_FK,
            idDonacionEspecie_FK: solicituddonacionespecieCREATE.idDonacionEspecie
        })
    });

    res.status(201).json({success:"Se ah creao"});
});

//READ 
router.get('/:idDonacionEspecie',async(req,res)=>{
    const solicituddonacionespecieREAD=await SolicitudDonacionEspecieModel.findByPk(req.params.idDonacionEspecie)
    res.json(solicituddonacionespecieREAD);
});

//UPDATE  
router.put('/:idDonacionEspecie',async(req,res)=>{
    const solicituddonacionespeciePUT=await SolicitudDonacionEspecieModel.update({
        estadoSolicitud:req.body.estadoSolicitud,
        fechaEntrega:req.body.fechaEntrega,
        lugarEntrega:req.body.lugarEntrega
    },{
        where:{
            idDonacionEspecie:req.params.idDonacionEspecie
        }
    });
    res.json(solicituddonacionespeciePUT);
});

//DELETE 
router.delete('/:idDonacionEspecie',async(req,res)=>{
    const solicituddonacionespecieDELETE=await SolicitudDonacionEspecieModel.destroy({
        where:{
            idDonacionEspecie:req.params.idDonacionEspecie
        }
    });
    res.json(solicituddonacionespecieDELETE);

});

module.exports=router;