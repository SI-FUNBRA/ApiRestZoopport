const router = require('express').Router();

const Respuesta = require('../../database/models/respuesta');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    const respuesta = await Respuesta.findAll();
     res.json(respuesta);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const respuesta = await Respuesta.create(  {
       descripcionRespuesta: req.body.descripcionRespuesta,     
   }).catch(err=>{
        res.json({err:"error al crear una respuesta",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Respuesta Creada Con Exito"});
});

// UPDATE
router.put('/actualizar/:idRespuesta', async(req, res) => {
    const respuesta = await Respuesta.update({
        descripcionRespuesta: req.body.descripcionRespuesta,
        
    },{
        where: { idRespuesta: req.params.idRespuesta }
    });
    
     res.json({success:"Respuesta Actualizada con exito"});
});

router.delete('/:ididRespuesta', async(req, res) => {
    await Respuesta.destroy({
        where: { idRespuesta: req.params.idRespuesta}
    });
     res.json({succes: 'Respuesta Eliminada con exito'});
});
module.exports = router;