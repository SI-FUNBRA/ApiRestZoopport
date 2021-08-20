const router = require('express').Router();

const Sede = require('../../database/models/sede');
const Barrio = require('../../database/models/barrio');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    
    const sede = await Sede.findAll({
        include: {
            model: Barrio,
            attributes: ['nombreBarrio']
        },
        attributes:['idSede','nombreSede','telefonoSede','correoSede','Nomenclatura']
    });
     res.json(sede);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const sede = await Sede.create(  {
       telefonoSede: req.body.telefonoSede, 
       correoSede: req.body.correoSede, 
       Nomenclatura: req.body.Nomenclatura, 
       idBarrio_FK: req.body.idBarrio_FK    
   }).catch(err=>{ 
        res.json({err, mensage:"error al crear la nueva sede"});
   });
   
    res.json({succes: "Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idSede', async(req, res) => {
    const sede = await Sede.update({
       telefonoSede: req.body.telefonoSede, 
       correoSede: req.body.correoSede, 
       Nomenclatura: req.body.Nomenclatura, 
       idBarrio_FK: req.body.idBarrio_FK 
    },{
        where: { idSede: req.params.idSede }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:idSede', async(req, res) => {
    await Sede.destroy({
        where: { idSede: req.params.idSede}
    });
     res.json({succes: 'Eliminado con exito'});
});
module.exports = router;