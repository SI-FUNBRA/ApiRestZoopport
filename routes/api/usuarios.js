
const router = require('express').Router();

const Usuarios = require('../../database/models/usuario');
const UsuarioRol = require('../../database/models/usuarioRol');
const Credenciales = require('../../database/models/credenciales');
const TipoDoc = require('../../database/models/tipoDoc');
const Barrio = require('../../database/models/barrio');
const Ciudad = require('../../database/models/ciudad');
const bcrypt = require('bcryptjs');

const VerifyUser = require('../middelwares/verifyUser')

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
        ]
    });
    
    console.log("Hola "+ req.nombreUsu + "con rol en la pocicion 0 de " + req.tiposRol)
    console.log(req.tiposRol)
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
        ]
    });
     res.json(usuarios);
});


// CREATE 
router.post('/', async (req, res) => {
    
    const ussers = await Credenciales.findAll({where: {username:req.body.username }});

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
        res.json({err:"Error al crear el usuario",detallesError:err.errors[0]});
   });
   await Credenciales.create({
       username: req.body.username,
       pass: req.body.pass,
       CredencialesUsuario_FK: usuario.idUsuario
   });
   await UsuarioRol.create({
       idUsuario: usuario.idUsuario,
       idRol: 3
   });
    res.status(201).json({ usuario, success:'Usuario Creado Con Exito' });
    }else{
        
        let err={
            errors:[{message:"Error Nombre De Usuario Ya Existe"}]
        }

         res.json({err:"Error en crear credencial",detallesError:err.errors[0]});
    }
});


// CREATE Gerente
router.post('/gerente',VerifyUser.checkAdmin, async (req, res) => {
    
    const ussers = await Credenciales.findAll({where: {username:req.body.username }});

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
        res.json({err:"Error al crear el usuario", detallesError: err.errors[0]});
   });
   await Credenciales.create({
       username: req.body.username,
       pass: req.body.pass,
       CredencialesUsuario_FK: usuario.idUsuario
   });
   await UsuarioRol.create({
       idUsuario: usuario.idUsuario,
       idRol: 2
   });
    res.status(201).json({ usuario, success:'Usuario Creado Con Exito' });
    }else{
        
        let err={
            errors:[{message:"Error Nombre De Usuario Ya Existe"}]
        }

         res.json({err:"Error en crear credencial",detallesError:err.errors[0]});
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
    }).catch(err=>{
        res.json({err:"Error al actualizar el usuario",detallesError:err.errors[0]});
   });;
    const credencialc = Credenciales.update({
        username: req.body.username
    }, {
        where: { CredencialesUsuario_FK: req.params.idUsuario }
    });
     res.status(201).json({success:"Usuario Actualizado con exito"});
   
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

     res.status(201).json({success: 'El Usuario a sido inhabilitado'});
});

// HABILITAR
router.put('/activar/:idUsuario', async(req, res) => {
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

     res.status(201).json({success: 'El Usuario a sido activado'});
});

module.exports = router;