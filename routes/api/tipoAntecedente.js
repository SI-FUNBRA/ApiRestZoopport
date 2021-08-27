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
   }).catch(err=>{
        res.json({err:"error al crear un tipo antecedente",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Tipo Antecedente Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idTipoAntecedente', async(req, res) => {
    const tipoAntecedente = await TipoAntecedente.update({
        nombreTipoAntecedente: req.body.nombreTipoAntecedente,
        
    },{
        where: { idTipoAntecedente: req.params.idTipoAntecedente }
    });
    
     res.json({success:"Tipo Antecedente Actualizado con exito"});
});

router.delete('/:ididTipoAntecedente', async(req, res) => {
    await TipoAntecedente.destroy({
        where: { idTipoAntecedente: req.params.idTipoAntecedente}
    });
     res.json({succes: 'Tipo Antecedente Eliminado con exito'});
});
module.exports = router;