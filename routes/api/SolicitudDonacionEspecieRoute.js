const router=require('express').Router();
const SolicitudDonacionEspecieModel=require('../../database/models/SolicitudDonacionEspecieModel');


router.get('/', async (req,res)=>{
    const solicituddonacionespecieFINDALL= await SolicitudDonacionEspecieModel.findAll()
    res.json(solicituddonacionespecieFINDALL);

});

//CREATE
router.post('/',async(req,res)=>{
    const solicituddonacionespecieaCREATE=await SolicitudDonacionEspecieModel.create({
        idDonacionEspecie:req.body.idDonacionEspecie,
        estadoSolicitud:req.body.estadoSolicitud,
        fechaEntrega:req.body.fechaEntrega,
        lugarEntrega:req.body.lugarEntrega
    });
    res.json(solicituddonacionespecieaCREATE);
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