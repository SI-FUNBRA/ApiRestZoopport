const router = require('express').Router();

const TipoAntecedente = require('../../database/models/tipoAntecedente');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    const tipoAntecedente = await TipoAntecedente.findAll();
     res.json(tipoAntecedente);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const tipoAntecedente = await TipoAntecedente.create(  {
       nombreTipoAntecedente: req.body.nombreTipoAntecedente,     
   });
   
    res.json({succes: "Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idTipoAntecedente', async(req, res) => {
    const tipoAntecedente = await TipoAntecedente.update({
        nombreTipoAntecedente: req.body.nombreTipoAntecedente,
        
    },{
        where: { idTipoAntecedente: req.params.idTipoAntecedente }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:ididTipoAntecedente', async(req, res) => {
    await TipoAntecedente.destroy({
        where: { idTipoAntecedente: req.params.idTipoAntecedente}
    });
     res.json({succes: 'Eliminado con exito'});
});
module.exports = router;