const router = require('express').Router();

const Antecedente = require('../../database/models/antecedente');
const TipoAntecedente = require('../../database/models/TipoAntecedente');

//consultar todos los tipo Antecedente
router.get('/', async (req, res) => {
    
    const antecedente = await Antecedente.findAll({
        include: {
            model: TipoAntecedente,
            attributes: ['nombreTipoAntecedente']
        },
        attributes:['idAntecedente','nombreAntecedente', 'detalleAntecedente', 'estado']
    });
     res.json(antecedente);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const antecedente = await Antecedente.create(  {
       nombreAntecedente: req.body.nombreAntecedente,
       detalleAntecedente: req.body.detalleAntecedente, 
       idTipoAntecedente_FK: req.body.idTipoAntecedente_FK    
   }).catch(err=>{
        res.json({err:"error al crear un Antecedente",detallesError:err.errors[0]});
    });
   
    res.status(201).json({success: "Antecedente Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idAntecedente', async(req, res) => {
    const antecedente = await Antecedente.update({
        nombreAntecedente: req.body.nombreAntecedente,
       detalleAntecedente: req.body.detalleAntecedente, 
       idTipoAntecedente_FK: req.body.idTipoAntecedente_FK    
    },{
        where: { idAntecedente: req.params.idAntecedente }
    });
    
     res.json({success:"Antecedente Actualizado con exito"});
});


// INHABILITAR
router.put('/inhabilitar/:idAntecedente', async(req, res) => {
    const antecedente = await Antecedente.update({
        estado : false
    }, {
        where: { idAntecedente: req.params.idAntecedente }
    });
     res.json({success: 'El Antecedente a sido inactivado'});
});

// HABILITAR
router.put('/habilitar/:idAntecedente', async(req, res) => {
    const antecedente = await Antecedente.update({
        estado : true
    }, {
        where: { idAntecedente: req.params.idAntecedente }
    });

     res.json({success: 'El Antecedente a sido activado'});
});

module.exports = router;