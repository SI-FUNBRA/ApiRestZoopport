const router = require('express').Router();

const Localidad = require('../../database/models/localidad');
const Ciudad = require('../../database/models/ciudad');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    
    const localidad = await Localidad.findAll({
        include:{
            model: Ciudad,
            attributes: ['nombreCiudad']
        },
        attributes:['idLocalidad','nombreLocalidad']
    });
     res.json(localidad);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const localidad = await Localidad.create(  {
       nombreLocalidad: req.body.nombreLocalidad, 
       idCiudad_FK: req.body.idCiudad_FK    
   }).catch(err=>{
        res.json({err:"error al crear una localidad",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Localidad Creada Con Exito"});
});

// UPDATE
router.put('/actualizar/:idLocalidad', async(req, res) => {
    const localidad = await Localidad.update({
        nombreLocalidad: req.body.nombreLocalidad,
        idCiudad_FK: req.body.idCiudad_FK
    },{
        where: { idLocalidad: req.params.idLocalidad }
    });
    
     res.json({success:"Localidad Actualizada con exito"});
});

router.delete('/:idLocalidad', async(req, res) => {
    await Ciudad.destroy({
        where: { idLocalidad: req.params.idLocalidad}
    });
     res.json({succes: 'Localidad Eliminada con exito'});
});
module.exports = router;