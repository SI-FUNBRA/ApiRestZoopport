const router = require('express').Router();

const Pais = require('../../database/models/pais');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    const pais = await Pais.findAll();
     res.json(pais);
});

// CREATE 
router.post('/', async (req, res) => {
     
   const pais = await Pais.create(  {
       nombrePais: req.body.nombrePais,     
   }).catch(err=>{
        res.json({err:"error al crear el Pais",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Pais Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idPais', async(req, res) => {
    const pais = await Pais.update({
        nombrePais: req.body.nombrePais,
        
    },{
        where: { idPais: req.params.idPais }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:ididPais', async(req, res) => {
    await Pais.destroy({
        where: { idPais: req.params.idPais}
    });
     res.json({succes: 'Eliminado con exito'});
});
module.exports = router;