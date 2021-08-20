const router = require('express').Router();

const Ciudad = require('../../database/models/ciudad');
const Departamento = require('../../database/models/departamento');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    
    const ciudad = await Ciudad.findAll({
        include:{
            model: Departamento,
            attributes: ['nombreDepartamento']
        },
        attributes:['idCiudad','nombreCiudad']
    });
     res.json(ciudad);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const ciudad = await Ciudad.create(  {
       nombreCiudad: req.body.nombreCiudad, 
       idDepartamento_FK: req.body.idDepartamento_FK    
   });
   
    res.json({succes: "Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idCiudad', async(req, res) => {
    const ciudad = await Ciudad.update({
        nombreCiudad: req.body.nombreCiudad,
        idDepartamento_FK: req.body.idDepartamento_FK
    },{
        where: { idCiudad: req.params.idCiudad }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:idCiudad', async(req, res) => {
    await Ciudad.destroy({
        where: { idCiudad: req.params.idCiudad}
    });
     res.json({succes: 'Eliminado con exito'});
});
module.exports = router;