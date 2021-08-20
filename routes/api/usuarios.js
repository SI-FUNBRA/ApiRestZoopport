
const router = require('express').Router();

const Usuarios = require('../../database/models/usuario');
const UsuarioRol = require('../../database/models/usuarioRol');
const Credenciales = require('../../database/models/credenciales');
const TipoDoc = require('../../database/models/tipoDoc');
const Barrio = require('../../database/models/barrio');
const Ciudad = require('../../database/models/ciudad');
const bcrypt = require('bcryptjs');

//consultar todos los usuarios activos
router.get('/', async(req, res) => {
    const usuarios = await Usuarios.findAll(
        {
        where: {estadoUsuario:true },
        include:[{
            model: Credenciales,
            attributes: ['username']
        },
        {
            model: TipoDoc,
            attributes: ['nombreTipoDoc']
        },
        {
            model: Ciudad,
            attributes: ['nombreCiudad']
        },
        {
            model: Barrio,
            attributes: ['nombreBarrio']
        },
        {
            model: UsuarioRol,
            attributes:['idRol']
        }
        ],
        attributes: ['idUsuario','nombreUsuario','apellidoUsuario','correoUsuario','telefonoFijo','telefonoCelular','fechaNacimientoUsuario','numeroDocumento','fechaExpedicionDoc']
    });
    console.log(req.nombreUsu);
     res.json(usuarios);
});

//consultar todos los usuarios inactivos
router.get('/inactivos', async(req, res) => {
    const usuarios = await Usuarios.findAll(
        {
        where: {estadoUsuario:false },
        include:[{
            model: Credenciales,
            attributes: ['username']
        },
        {
            model: TipoDoc,
            attributes: ['nombreTipoDoc']
        },
        {
            model: Ciudad,
            attributes: ['nombreCiudad']
        },
        {
            model: Barrio,
            attributes: ['nombreBarrio']
        },
        {
            model: UsuarioRol,
            attributes:['idRol']
        }
        ],
        attributes: ['idUsuario','nombreUsuario','apellidoUsuario','correoUsuario','telefonoFijo','telefonoCelular','fechaNacimientoUsuario','numeroDocumento','fechaExpedicionDoc']
    });
     res.json(usuarios);
});


// CREATE 
router.post('/', async (req, res) => {
    
    const ussers = await Credenciales.findAll({where: {username:req.body.username }});
    let password = req.body.pass;

    if(ussers == false){
    req.body.pass = bcrypt.hashSync(req.body.pass, 10);

   const usuario = await Usuarios.create(  {
       nombreUsuario: req.body.nombreUsuario,
       apellidoUsuario: req.body.apellidoUsuario,
       correoUsuario: req.body.correoUsuario,
       telefonoFijo: req.body.telefonoFijo,
       telefonoCelular: req.body.telefonoCelular,
       fechaNacimientoUsuario: req.body.fechaNacimientoUsuario,
       idTipoDocumento_FK: req.body.idTipoDocumento_FK,
       numeroDocumento: req.body.numeroDocumento,
       fechaExpedicionDoc: req.body.fechaExpedicionDoc,
       LugarExpedicionDoc:req.body.LugarExpedicionDoc,
       idBarrio_FK: req.body.idBarrio_FK
   }).catch(err=>{
        res.json({mensage:"error al crear el usuario",detallesError:err});
   });
   const credencialc = Credenciales.create({
       username: req.body.username,
       pass: req.body.pass,
       CredencialesUsuario_FK: usuario.idUsuario
   });
   const usuarioRol = UsuarioRol.create({
       idUsuario: 3,
       idRol: req.body.idRol
   });
    res.json({ usuario, success:'Usuario Creado Con Exito' });
    }else{
         res.json({err:"Error en crear credencial"});
    }
});

// UPDATE
router.put('/actualizar/:idUsuario', async(req, res) => {
    
   
    const usuario = await Usuarios.update({
       nombreUsuario: req.body.nombreUsuario,
       apellidoUsuario: req.body.apellidoUsuario,
       correoUsuario: req.body.correoUsuario,
       telefonoFijo: req.body.telefonoFijo,
       telefonoCelular: req.body.telefonoCelular,
       fechaNacimientoUsuario: req.body.fechaNacimientoUsuario,
       idTipoDocumento_FK: req.body.idTipoDocumento_FK,
       numeroDocumento: req.body.numeroDocumento,
       fechaExpedicionDoc: req.body.fechaExpedicionDoc,
       LugarExpedicionDoc:req.body.LugarExpedicionDoc,
       idBarrio_FK: req.body.idBarrio_FK
    },{
        where: { idUsuario: req.params.idUsuario }
    });
    const credencialc = Credenciales.update({
        username: req.body.username
    }, {
        where: { CredencialesUsuario_FK: req.params.idUsuario }
    });
     res.json({success:"Usuario Actualizado con exito"});
    
});

// INHABILITAR
router.put('/inhabilitar/:idUsuario', async(req, res) => {
    const usuario = await Usuarios.update({
        estadoUsuario : false
    }, {
        where: { idUsuario: req.params.idUsuario }
    });
    const credencialc = await Credenciales.update({
        estado : false
    }, {
        where: { CredencialesUsuario_FK: req.params.idUsuario}
    });

     res.json({success: 'El Usuario a sido inactivado'});
});

// HABILITAR
router.put('/habilitar/:idUsuario', async(req, res) => {
    const usuario = await Usuarios.update({
        estadoUsuario : true
    }, {
        where: { idUsuario: req.params.idUsuario }
    });
    const credencialc = await Credenciales.update({
        estado : true
    }, {
        where: { CredencialesUsuario_FK: req.params.idUsuario}
    });

     res.json({success: 'El Usuario a sido activado'});
});

module.exports = router;