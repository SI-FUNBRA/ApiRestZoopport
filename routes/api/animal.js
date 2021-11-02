
const router = require('express').Router();

const Animal = require('../../database/models/animal');
const Fotografia = require('../../database/models/fotografia')
const EstadoAnimal = require('../../database/models/estadoAnimal');
const Especie = require('../../database/models/Especie');
const { now } = require('moment');

//consultar todos los Animales
router.get('/', async(req, res) => {
    const animal = await Animal.findAll(
        {
        include:[{
            model: Especie,
            attributes: ['nombreEspecie']
        },
        {
            model: EstadoAnimal,
            attributes:['nombreEstadoAnimal']
        }],
        attributes: ['nombreAnimal','edad','fechaLlegada','historialTratamiento']
    });
     res.json(animal);
});

// CREATE 
router.post('/', async (req, res) => {
   
   const animal = await Animal.create({
       nombreAnimal: req.body.nombreAnimal,
       edad: req.body.edad,
       fechaLlegada: req.body.fechaLlegada,
       historialTratamiento: req.body.historialTratamiento,
       idEstadoAnimal_FK: req.body.idEstadoAnimal_FK,
       idEspecie_FK: req.body.idEspecie_FK
   }).catch(err=>{
       res.json({err:"error al crear el Animal",detallesError:err.errors[0]});
   });

 /*   const foto */

   res.status(201).json({success: "Animal Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idAnimal', async(req, res) => {
    const animal = await Animal.update({
       nombreAnimal: req.body.nombreAnimal,
       edad: req.body.edad,
       fechaLlegada: req.body.fechaLlegada,
       historialTratamiento: req.body.historialTratamiento,
       idEspecie_FK: req.body.idEspecie_FK
    },{
        where: { idAnimal: req.params.idAnimal }
    });
     res.json({success:"Animal Actualizado con exito"});
});

// Cambiar Estado Animal
router.put('/cambiarEstado/:idAnimal', async(req, res) => {
    const animal = await Animal.update({
       idEstadoAnimal_FK: req.body.idEstadoAnimal_FK,
    },{
        where: { idAnimal: req.params.idAnimal }
    });
     res.json({success:"Estado del Animal Actualizado con exito"});
});

module.exports = router;