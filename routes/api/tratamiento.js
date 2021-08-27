const router = require('express').Router();

const Tratamiento = require('../../database/models/tratamiento');
const TipoTratamiento = require('../../database/models/TipoTratamiento');

//consultar todos los tipo Tratamiento
router.get('/', async (req, res) => {
    
    const tratamiento = await Tratamiento.findAll({
        include: {
            model: TipoTratamiento,
            attributes: ['nombreTipoTratamiento']
        },
        attributes:['idTratamiento','nombreTratamiento', 'detalleTratamiento', 'estado']
    });
     res.json(tratamiento);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const tratamiento = await Tratamiento.create(  {
       nombreTratamiento: req.body.nombreTratamiento,
       detalleTratamiento: req.body.detalleTratamiento, 
       idTipoTratamiento_FK: req.body.idTipoTratamiento_FK    
   }).catch(err=>{
        res.json({err:"error al crear un tratamiento",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Tratamiento Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idTratamiento', async(req, res) => {
    const tratamiento = await Tratamiento.update({
        nombreTratamiento: req.body.nombreTratamiento,
       detalleTratamiento: req.body.detalleTratamiento, 
       idTipoTratamiento_FK: req.body.idTipoTratamiento_FK    
    },{
        where: { idTratamiento: req.params.idTratamiento }
    });
    
     res.json({success:"Tratamiento Actualizado con exito"});
});


// INHABILITAR
router.put('/inhabilitar/:idTratamiento', async(req, res) => {
    const Tratamiento = await Tratamiento.update({
        estado : false
    }, {
        where: { idTratamiento: req.params.idTratamiento }
    });
     res.json({success: 'El Tratamiento a sido inactivado'});
});

// HABILITAR
router.put('/habilitar/:idTratamiento', async(req, res) => {
    const Tratamiento = await Tratamiento.update({
        estado : true
    }, {
        where: { idTratamiento: req.params.idTratamiento }
    });

     res.json({success: 'El Tratamiento a sido activado'});
});

module.exports = router;