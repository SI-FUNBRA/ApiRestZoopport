const router = require('express').Router();

const Fotografia = require('../../database/models/fotografia');
const Animal = require('../../database/models/animal');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    
    const Fotografia = await Fotografia.findAll({
        include: {
            model: Animal,
            attributes: ['nombreAnimal']
        },
        attributes:['idFotografia','nombreFotografia']
    });
     res.json(Fotografia);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const Fotografia = await Fotografia.create(  {
       Foto: req.body.Foto, 
       descripcionFoto: req.body.descripcionFoto, 
       idAnimal_FK: req.body.idAnimal_FK    
   });
   
    res.json({succes: "Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idFoto', async(req, res) => {
    const Fotografia = await Fotografia.update({
        Foto: req.body.Foto,
       descripcionFoto: req.body.descripcionFoto,
        idAnimal_FK: req.body.idAnimal_FK
    },{
        where: { idFotografia: req.params.idFoto }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:idFoto', async(req, res) => {
    await Fotografia.destroy({
        where: { idFotografia: req.params.idFotografia}
    });
     res.json({succes: 'Eliminado con exito'});
});
module.exports = router;