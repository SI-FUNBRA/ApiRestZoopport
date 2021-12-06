const router = require('express').Router();
const SolicitudAdopcion = require('../../database/models/SolicitudAdopcion');
const Usuario = require('../../database/models/Usuario');
const Animal = require('../../database/models/Animal');
const multer = require('multer');
const DocumentoSolicitud = require('../../database/models/DocumentoSolicitud');


//consultar todas las pendientes
router.get('/', async(req, res) => {

    const solicitudes = await SolicitudAdopcion.findAll(
        {
        where: { estadoSolicitudAdopcion : 'pendiente' },
        include:[{
            model: Usuario,
            attributes: ['nombreUsuario','apellidoUsuario','numeroDocumento']
        },
        {
            model: Animal,
            attributes: ['nombreAnimal']
        },{
            model: DocumentoSolicitud,
            attributes: ['file']
        }],
    });
    
    res.json(solicitudes);
});

//consultar todas las solicitudes rechazadas
router.get('/rechazadas', async(req, res) => {

    const solicitudes = await SolicitudAdopcion.findAll(
        {
        where: { estadoSolicitudAdopcion : 'rechazada' },
        include:[{
            model: Usuario,
            attributes: ['nombreUsuario','apellidoUsuario','numeroDocumento']
        },
        {
            model: Animal,
            attributes: ['nombreAnimal']
        },
        {
            model: DocumentoSolicitud,
            attributes: ['file']
        }
        ]
    });
    
    res.json(solicitudes);
});


//consultar todas las solicitudes aceptadas
router.get('/aceptadas', async(req, res) => {

    const solicitudes = await SolicitudAdopcion.findAll(
        {
        where: { estadoSolicitudAdopcion : 'aceptada' },
        include:[{
            model: Usuario,
            attributes: ['nombreUsuario','apellidoUsuario','numeroDocumento']
        },
        {
            model: Animal,
            attributes: ['nombreAnimal']
        },
        {
            model: DocumentoSolicitud,
            attributes: ['file']
        }
        ]
    });
    
    res.json(solicitudes);
});


// CREATE 
router.post('/nueva', async (req, res) => {
    const newSolicitud = await SolicitudAdopcion.create({

        estadoSolicitudAdopcion: req.body.estadoSolicitudAdopcion,
        fechaSolicitud: req.body.fechaSolicitud,
        idDocumentoSolicitud_FK: req.idDocumentoSolicitud_FK,
        idUsuario_FK: req.body.idUsuario_FK,
        idAnimal_FK: req.body.idAnimal_FK,
    
    }).catch(err=>{
        res.json({err:"error al crear el registro", detallesError:err.errors[0]});
    });
 
    res.status(201).json({success: "Registro Creado Con Exito"});
 });

//Update
router.put('/actualizar/:idSolicitudAdopcion', async(req, res) => {
    const updatedSolicitud = await SolicitudAdopcion.update({
        estadoSolicitudAdopcion: req.body.estadoSolicitudAdopcion,
        fechaSolicitud: req.body.fechaSolicitud,
        idDocumentoSolicitud_FK: req.idDocumentoSolicitud_FK,
        idUsuario_FK: req.body.idUsuario_FK,
        idAnimal_FK: req.body.idAnimal_FK,
    },{
        where: { idSolicitudAdopcion: req.params.idSolicitudAdopcion }
    });
    res.status(200).json({message:"Actualizado con exito"});
});


// RECHAZAR
router.put('/rechazar/:idSolicitudAdopcion', async(req, res) => {
    const solicitud = await SolicitudAdopcion.update({
        estadoSolicitudAdopcion : 'rechazada'
    }, {
        where: { idSolicitudAdopcion: req.params.idSolicitudAdopcion }
    });
    res.status(201).json({message: 'La solicitud ha sido rechazada'});
});

// ACEPTAR
router.put('/aceptar/:idSolicitudAdopcion', async(req, res) => {
    const solicitud = await SolicitudAdopcion.update({
        estadoSolicitudAdopcion : 'aceptada'
    }, {
        where: { idSolicitudAdopcion: req.params.idSolicitudAdopcion }
    });

    res.status(201).json({message: 'La solicitud ha sido aceptada'});
});


//Delete para solicitudes rechazadas
router.delete('/:idSolicitudAdopcion', async(req, res) => {
    await SolicitudAdopcion.destroy({
        where: { idSolicitudAdopcion: req.params.idSolicitudAdopcion}
    });
    res.status(200).json({message: 'Eliminado con exito'});
});

module.exports = router;