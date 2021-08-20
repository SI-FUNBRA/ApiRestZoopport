const router = require('express').Router();

const Rol = require('../../database/models/rol');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    const rol = await Rol.findAll();
     res.json(rol);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const rol = await Rol.create(  {
       nombreRol: req.body.nombreRol,     
   });
   
    res.json({succes: "Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idRol', async(req, res) => {
    const rol = await Rol.update({
        nombreRol: req.body.nombreRol,
        
    },{
        where: { idRol: req.params.idRol }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:ididRol', async(req, res) => {
    await Rol.destroy({
        where: { idRol: req.params.idRol}
    });
     res.json({succes: 'Eliminado con exito'});
});
module.exports = router;