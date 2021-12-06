const router = require('express').Router();

<<<<<<< HEAD
const Tratamiento = require('../../database/models/Tratamiento');
=======
const Tratamiento = require('../../database/models/tratamiento');
const TipoTratamiento = require('../../database/models/tipoTratamiento');
>>>>>>> origin/Api

//consultar todos las habilitados
router.get('/', async(req, res) => {

    const tratamientos = await Tratamiento.findAll(
        {
        where: { estado : true }
    });
    
    res.json(tratamientos);
});

//consultar todos las deshabilitados
router.get('/deshabilitados', async(req, res) => {

    const tratamientos = await Tratamiento.findAll(
        {
        where: { estado : false }
    });
    
    res.json(tratamientos);
});

// CREATE 
router.post('/nuevo', async (req, res) => {
     
   const tratamiento = await Tratamiento.create(  {
       nombreTratamiento: req.body.nombreTratamiento, 
       estado: true
   }).catch(err=>{
        res.json({err:"error al crear un tratamiento",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Tratamiento Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idTratamiento', async(req, res) => {
    const tratamiento = await Tratamiento.update({
        nombreTratamiento: req.body.nombreTratamiento, 
        estado: req.body.estado 
    },{
        where: { idTratamiento: req.params.idTratamiento }
    });
    
     res.json({success:"Tratamiento Actualizado con exito"});
});

// DESHABILITAR
router.put('/deshabilitar/:idTratamiento', async(req, res) => {
    const tratamiento = await Tratamiento.update({
        estado : false
    }, {
        where: { idTratamiento: req.params.idTratamiento }
    });

    res.status(201).json({message: 'Tratamiento deshabilitado'});
});

// habilitar
router.put('/habilitar/:idTratamiento', async(req, res) => {
    const tratamiento = await Tratamiento.update({
        estado : true
    }, {
        where: { idTratamiento: req.params.idTratamiento }
    });

    res.status(201).json({message: 'Tratamiento habilitado'});
});


//Delete
router.delete('/:idTratamiento', async(req, res) => {
    await Tratamiento.destroy({
        where: { idTratamiento: req.params.idTratamiento}}
    );
    res.status(200).json({message: 'Eliminado con exito'});
});

module.exports = router;