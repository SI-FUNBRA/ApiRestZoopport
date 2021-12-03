const router = require('express').Router();

const Ciudad = require('../../database/models/ciudad');
const Pais = require('../../database/models/pais');
const verifyUser = require('../middelwares/verifyUser');
const middleware = require('../middelwares/middelwares');

//consultar todos los Paises
router.get('/', middleware.checkToken, verifyUser.checkAdmin, async (_req, res) => {
    const pais = await Pais.findAll();
     res.json(pais);
});

// CREATE 
router.post('/', middleware.checkToken, verifyUser.checkAdmin, async (req, res) => {
     
   const pais = await Pais.create(  {
       nombrePais: req.body.nombrePais,     
   }).catch(err=>{
        res.json({err:"error al crear el Pais",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Pais Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idPais', middleware.checkToken, verifyUser.checkAdmin, async(req, res) => {
    const pais = await Pais.update({
        nombrePais: req.body.nombrePais,
        
    },{
        where: { idPais: req.params.idPais }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:idPais', middleware.checkToken, verifyUser.checkAdmin, async(req, res) => {

    const ciudad = await Ciudad.findOne({where:{idPais_FK: req.params.idPais}})
if(!ciudad){
     await Pais.destroy({
        where: { idPais: req.params.idPais}
    }).catch(()=>{
        res.json({err: 'Error al eliminiar (asegurese que ninguna seccion tenga este país asociado)'});
    })
    res.status(201).json({success: 'País Eliminado con exito'});
    }else{
        res.json({err: 'Error al eliminiar (asegurese que ninguna seccion tenga este país asociado)'}); 
    }
});



//Consulta de pais y demas
router.get('/paises__ciudad', async(req,res)=>{
    const paises = await Pais.findAll({
        include:[
            {
                model: Ciudad,
                attributes:['idCiudad','nombreCiudad'] 
            },
        ]
    })
    
    res.json(paises);
})

module.exports = router;