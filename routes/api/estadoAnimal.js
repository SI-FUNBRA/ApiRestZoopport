const router = require('express').Router();

const EstadoAnimal = require('../../database/models/estadoAnimal');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    const estadoAnimal = await EstadoAnimal.findAll();
     res.json(estadoAnimal);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const estadoAnimal = await EstadoAnimal.create(  {
       nombreEstadoAnimal: req.body.nombreEstadoAnimal,     
   });
   
    res.json({succes: "Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idEstadoAnimal', async(req, res) => {
    const estadoAnimal = await EstadoAnimal.update({
        nombreEstadoAnimal: req.body.nombreEstadoAnimal,
        
    },{
        where: { idEstadoAnimal: req.params.idEstadoAnimal }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:ididEstadoAnimal', async(req, res) => {
    await EstadoAnimal.destroy({
        where: { idEstadoAnimal: req.params.idEstadoAnimal}
    });
     res.json({succes: 'Eliminado con exito'});
});
module.exports = router;