const router = require('express').Router();
const DocumentoSolicitud = require('../../database/models/DocumentoSolicitud');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})


const upload = multer({ 
    storage: storage
})

//consultar todas los documentos
router.get('/', async (req, res) => {
    const documentos = await DocumentoSolicitud.findAll();
    res.json(documentos);
});

// CREATE 
router.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.file)
    const documento = await DocumentoSolicitud.create(  {
        urlDocumento: `http://localhost:3005/${req.file.filename}`,
        file: req.file
    }).catch(err=>{
         res.json({err:"error al subir una fotografia ",detallesError:err.errors[0]});
     });
    
     res.status(201).json({success: "Documento subido exitosamente"});
 });
 
// UPDATE
router.put('/actualizar/:idDocumentoSolicitud', upload.single('file'), async(req, res) => {
    const documento = await DocumentoSolicitud.update({
        urlDocumento: `http://localhost:3005/${req.file.filename}`,
        file: req.file
    },{
        where: { idDocumentoSolicitud: req.params.idDocumentoSolicitud }
    });
    
     res.json({success:"Registro Actualizado con exito"});
});

//Delete
router.delete('/:idDocumentoSolicitud', async(req, res) => {
    await DocumentoSolicitud.destroy({
        where: { idDocumentoSolicitud: req.params.idDocumentoSolicitud}
    });
    res.status(200).json({message: 'Eliminado con exito'});
});

module.exports = router;