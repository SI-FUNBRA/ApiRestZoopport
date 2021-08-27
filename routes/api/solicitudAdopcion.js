const router = require('express').Router();

const SolicituAdopcion = require('../../database/models/solicitudAdopcion');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    const solicitudAdopcion = await SolicituAdopcion.findAll();
     res.json(solicitudAdopcion);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const solicitudAdopcion = await SolicituAdopcion.create(  {
       estadoSolicituAdopcion: req.body.estadoSolicituAdopcion, 
       fechaSolicitud: req.body.fechaSolicitud    
   }).catch(err=>{
        res.json({err:"error al crear una solicitud adopción",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Solicitud Adopcion Creada Con Exito"});
});

// UPDATE
router.put('/actualizar/:idSolicituAdopcion', async(req, res) => {
    const solicitudAdopcion = await SolicituAdopcion.update({
        estadoSolicituAdopcion: req.body.estadoSolicituAdopcion,
        fechaSolicitud: req.body.fechaSolicitud  
        
    },{
        where: { idSolicituAdopcion: req.params.idSolicituAdopcion }
    });
    
     res.json({success:"olicitud Adopcion Actualizada con exito"});
});

router.delete('/:ididSolicituAdopcion', async(req, res) => {
    await SolicituAdopcion.destroy({
        where: { idSolicituAdopcion: req.params.idSolicituAdopcion}
    });
     res.json({succes: 'olicitud Adopcion Eliminada con exito'});
});
module.exports = router;