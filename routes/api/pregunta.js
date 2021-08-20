const router = require('express').Router();

const Pregunta = require('../../database/models/pregunta');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    const pregunta = await Pregunta.findAll();
     res.json(pregunta);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const pregunta = await Pregunta.create(  {
       descripcionPregunta: req.body.descripcionPregunta,     
   });
   
    res.json({succes: "Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idPregunta', async(req, res) => {
    const pregunta = await Pregunta.update({
        descripcionPregunta: req.body.descripcionPregunta,
        
    },{
        where: { idPregunta: req.params.idPregunta }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:ididPregunta', async(req, res) => {
    await Pregunta.destroy({
        where: { idPregunta: req.params.idPregunta}
    });
     res.json({succes: 'Eliminado con exito'});
});
module.exports = router;