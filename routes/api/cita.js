const router = require('express').Router();

const Cita = require('../../database/models/cita');
const Sede = require('../../database/models/sede');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    
    const cita = await Cita.findAll({
        include: {
            model: Sede,
            attributes: ['telefonoSede','correoSede','nomenclatura']
        },
        attributes:['idCita','fechaCita','motivoCita']
    });
     res.json(cita);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const cita = await Cita.create(  {
        fechaCita: req.body.fechaCita,
        motivoCita: req.body.motivoCita,
        idSede_FK: req.body.idSede_FK  
   }).catch(err=>{
        res.json({err:"error al crear una Cita",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Cita Creada Con Exito"});
});

// UPDATE
router.put('/actualizar/:idcita', async(req, res) => {
    const cita = await Cita.update({
        fechaCita: req.body.fechaCita,
        motivoCita: req.body.motivoCita,
        idSede_FK: req.body.idSede_FK
    },{
        where: { idCita: req.params.idcita }
    });
    
     res.json({success:"Cita Actualizada con exito"});
});

router.delete('/:idcita', async(req, res) => {
    await Cita.destroy({
        where: { idCita: req.params.idCita}
    });
     res.json({succes: 'Cita Eliminada con exito'});
});
module.exports = router;