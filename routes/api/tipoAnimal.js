const router = require('express').Router();

const TipoAnimal = require('../../database/models/tipoAnimal');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    const tipoAnimal = await TipoAnimal.findAll();
     res.json(tipoAnimal);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const tipoAnimal = await TipoAnimal.create(  {
       nombreTipoAnimal: req.body.nombreTipoAnimal,     
   });
   
    res.json({succes: "Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idTipoAnimal', async(req, res) => {
    const tipoAnimal = await TipoAnimal.update({
        nombreTipoAnimal: req.body.nombreTipoAnimal,
        
    },{
        where: { idTipoAnimal: req.params.idTipoAnimal }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:ididTipoAnimal', async(req, res) => {
    await TipoAnimal.destroy({
        where: { idTipoAnimal: req.params.idTipoAnimal}
    });
     res.json({succes: 'Eliminado con exito'});
});
module.exports = router;