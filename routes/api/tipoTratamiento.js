const router = require('express').Router();

const TipoTratamiento = require('../../database/models/tipoTratamiento');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    const tipoTratamiento = await TipoTratamiento.findAll();
     res.json(tipoTratamiento);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const tipoTratamiento = await TipoTratamiento.create(  {
       nombreTipoTratamiento: req.body.nombreTipoTratamiento,     
   }).catch(err=>{
        res.json({err:"error al crear un tipo tratamiento",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Tipo Tratamiento Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idTipoTratamiento', async(req, res) => {
    const tipoTratamiento = await TipoTratamiento.update({
        nombreTipoTratamiento: req.body.nombreTipoTratamiento,
        
    },{
        where: { idTipoTratamiento: req.params.idTipoTratamiento }
    });
    
     res.json({success:"Tipo Tratamiento Actualizado con exito"});
});

router.delete('/:ididTipoTratamiento', async(req, res) => {
    await TipoTratamiento.destroy({
        where: { idTipoTratamiento: req.params.idTipoTratamiento}
    });
     res.json({succes: 'Tipo Tratamiento Eliminado con exito'});
});
module.exports = router;