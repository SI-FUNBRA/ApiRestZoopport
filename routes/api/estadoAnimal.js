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
   }).catch(err=>{
        res.json({err:"error al crear un estado del animal",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Estado Animal Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idEstadoAnimal', async(req, res) => {
    const estadoAnimal = await EstadoAnimal.update({
        nombreEstadoAnimal: req.body.nombreEstadoAnimal,
        
    },{
        where: { idEstadoAnimal: req.params.idEstadoAnimal }
    });
    
     res.json({success:"Estado Animal Actualizado con exito"});
});

router.delete('/:ididEstadoAnimal', async(req, res) => {
    await EstadoAnimal.destroy({
        where: { idEstadoAnimal: req.params.idEstadoAnimal}
    });
     res.json({succes: 'Estado Animal Eliminado con exito'});
});
module.exports = router;