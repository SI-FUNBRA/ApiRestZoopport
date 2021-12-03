const router = require('express').Router();

const Ciudad = require('../../database/models/ciudad');
const Pais = require('../../database/models/pais')

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    
    const ciudad = await Ciudad.findAll({
        include:{
            model: Pais,
            attributes: ['nombrePais']
        },
    });
     res.json(ciudad);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const ciudad = await Ciudad.create(  {
       nombreCiudad: req.body.nombreCiudad, 
       idPais_FK: req.body.idPais_FK    
   }).catch(err=>{
        res.json({err:"error al crear la Ciudad",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Ciudad Creada Con Exito"});
});

// UPDATE
router.put('/actualizar/:idCiudad', async(req, res) => {
    await Ciudad.update({
        nombreCiudad: req.body.nombreCiudad,
        idPais_FK: req.body.idPais_FK
    },{
        where: { idCiudad: req.params.idCiudad }
    });
    
     res.json({success:"Ciudad Actualizada con exito"});
});

router.delete('/:idCiudad', async(req, res) => {
    await Ciudad.destroy({
        where: { idCiudad: req.params.idCiudad}
    }).catch(()=>{
        res.json({err: 'Error al eliminiar (asegurese que ninguna seccion tenga esta ciudad asociada)'});
    })
     res.status(201).json({success: 'Ciudad Eliminada con exito'});
});
module.exports = router;