const router = require('express').Router();

const TipoDocumento = require('../../database/models/tipoDoc');
const Usuarios = require('../../database/models/usuario');
const bcrypt = require('bcryptjs')

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    const TipoDoc = await TipoDocumento.findAll();
     res.json(TipoDoc);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const TipoDoc = await TipoDocumento.create(  {
       nombreTipoDoc: req.body.nombreTipoDoc,     
   });
   
    res.json({succes: "Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idTiUsuario', async(req, res) => {
    const TipoDoc = await TipoDocumento.update({
        nombreTipoDoc: req.body.nombreTipoDoc,
        
    },{
        where: { idTipoDoc: req.params.idTipoDoc }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:idTipoDoc', async(req, res) => {
    await TipoDocumento.destroy({
        where: { idTipoDoc: req.params.idTipoDoc}
    });
     res.json({succes: 'Eliminado con exito'});
});
module.exports = router;