const router = require('express').Router();

const Barrio = require('../../database/models/barrio');
const Localidad = require('../../database/models/localidad');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    
    const barrio = await Barrio.findAll({
        include:{
            model: Localidad,
            attributes: ['nombreLocalidad']
        },
        attributes:['idBarrio','nombreBarrio']
    });
     res.json(barrio);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const barrio = await Barrio.create(  {
       nombreBarrio: req.body.nombreBarrio, 
       idLocalidad_FK: req.body.idLocalidad_FK    
   }).catch(err=>{
        res.json({err:"error al crear el Barrio",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Barrio Con Exito"});
});

// UPDATE
router.put('/actualizar/:idBarrio', async(req, res) => {
    const barrio = await Barrio.update({
        nombreBarrio: req.body.nombreBarrio,
        idLocalidad_FK: req.body.idLocalidad_FK
    },{
        where: { idBarrio: req.params.idBarrio }
    });
    
     res.json({success:"Barrio Actualizado con exito"});
});

router.delete('/:idBarrio', async(req, res) => {
    await Localidad.destroy({
        where: { idBarrio: req.params.idBarrio}
    });
     res.json({succes: 'Barrio Eliminado con exito'});
});
module.exports = router;