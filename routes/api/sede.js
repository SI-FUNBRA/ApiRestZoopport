const router = require('express').Router();

const Sede = require('../../database/models/sede');

const Pais = require('../../database/models/pais') 

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    
    const sede = await Sede.findAll({
        include: {
            model: Pais,
            attributes: ['nombrePais']
        },
        attributes:['idSede','nombreSede','telefonoSede','correoSede','Nomenclatura']
    });
     res.json(sede);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const sede = await Sede.create(  {
       nombreSede: req.body.nombreSede,
       telefonoSede: req.body.telefonoSede, 
       correoSede: req.body.correoSede, 
       Nomenclatura: req.body.Nomenclatura,
       idPais_FK: req.body.idPais_FK,    
   }).catch(err=>{
        res.json({err:"error al crear una nueva sede",detallesError:err.errors[0]});
   });
   
    res.status(201).json({success: "Sede Creada Con Exito"});
});

// UPDATE
router.put('/actualizar/:idSede', async(req, res) => {
    const sede = await Sede.update({
        nombreSede: req.body.nombreSede,
       telefonoSede: req.body.telefonoSede, 
       correoSede: req.body.correoSede, 
       Nomenclatura: req.body.Nomenclatura,
       idPais_FK: req.body.idPais_FK, 
    },{
        where: { idSede: req.params.idSede }
    });
     res.json({success:"Sede Actualizada con exito"});
});

router.delete('/:idSede', async(req, res) => {
    await Sede.destroy({
        where: { idSede: req.params.idSede}
    });
     res.json({success: 'Sede Eliminada con exito'});
});
module.exports = router;