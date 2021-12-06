const router = require('express').Router();

const Enfermedad = require('../../database/models/Enfermedad');

//consultar todas las enfermedades
router.get('/', async (req, res) => {
    const enfermedades = await Enfermedad.findAll();
    res.json(enfermedades);
});


// CREATE 
router.post('/nueva', async (req, res) => {
     
    const enfermedad = await Enfermedad.create(  {
        nombreEnfermedad: req.body.nombreEnfermedad
        
    }).catch(err=>{
         res.json({err:"error al crear un tratamiento",detallesError:err.errors[0]});
     });
    
     res.status(201).json({success: "Tratamiento Creado Con Exito"});
 });
 
// UPDATE
router.put('/actualizar/:idEnfermedad', async(req, res) => {
    const enfermedad = await Enfermedad.update({
        nombreEnfermedad: req.body.nombreEnfermedad,   
    },{
        where: { idEnfermedad: req.params.idEnfermedad }
    });
    
     res.json({success:"Registro Actualizado con exito"});
});

//Delete
router.delete('/:idEnfermedad', async(req, res) => {
    await Enfermedad.destroy({
        where: { idEnfermedad: req.params.idEnfermedad}
    });
    res.status(200).json({message: 'Eliminado con exito'});
});

module.exports = router;