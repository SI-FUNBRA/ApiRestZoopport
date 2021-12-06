const router = require('express').Router();
const Fotografia = require('../../database/models/Fotografia');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})
const fileFilter = (req, file, cb) =>{
    //reject a file
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' )
    cb(null, true)
    else{
        cb(null, false)
    }
}


const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
})

//consultar todas las fotografias
router.get('/', async (req, res) => {
    const fotografia = await Fotografia.findAll();
    res.json(fotografia);
});

// CREATE 
router.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.file)
    const fotografia = await Fotografia.create(  {
        urlFotografia: `http://localhost:3005/${req.file.filename}`,
        file: req.file
    }).catch(err=>{
         res.json({err:"error al subir una fotografia ",detallesError:err.errors[0]});
     });
    
     res.status(201).json({success: "Fotografia subida exitosamente"});
 });
 
// UPDATE
router.put('/actualizar/:idFotografia', upload.single('file'), async(req, res) => {
    const fotografia = await Fotografia.update({
        urlFotografia: `http://localhost:3005/api/fotografia/upload/${req.file.filename}`,
        file: req.file
    },{
        where: { idFotografia: req.params.idFotografia }
    });
    
     res.json({success:"Registro Actualizado con exito"});
});

//Delete
router.delete('/:idFotografia', async(req, res) => {
    await Fotografia.destroy({
        where: { idFotografia: req.params.idFotografia}
    });
    res.status(200).json({message: 'Eliminado con exito'});
});

module.exports = router;