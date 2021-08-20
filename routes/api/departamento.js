const router = require('express').Router();

const Departamento = require('../../database/models/departamento');
const Pais = require('../../database/models/pais');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    
    const departamento = await Departamento.findAll({
        include: {
            model: Pais,
            attributes: ['nombrePais']
        },
        attributes:['idDepartamento','nombreDepartamento']
    });
     res.json(departamento);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const departamento = await Departamento.create(  {
       nombreDepartamento: req.body.nombreDepartamento, 
       idPais_FK: req.body.idPais_FK    
   });
   
    res.json({succes: "Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idDep', async(req, res) => {
    const departamento = await Departamento.update({
        nombreDepartamento: req.body.nombreDepartamento,
        idPais_FK: req.body.idPais_FK
    },{
        where: { idDepartamento: req.params.idDep }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:idDep', async(req, res) => {
    await Departamento.destroy({
        where: { idDepartamento: req.params.idDepartamento}
    });
     res.json({succes: 'Eliminado con exito'});
});
module.exports = router;