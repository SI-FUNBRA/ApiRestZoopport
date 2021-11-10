
const router = require('express').Router();

const Usuarios = require('../../database/models/usuario');
const UsuarioRol = require('../../database/models/usuarioRol');
const Credenciales = require('../../database/models/credenciales');
const TipoDoc = require('../../database/models/tipoDoc');
const Ciudad = require('../../database/models/ciudad');
const bcrypt = require('bcryptjs');

var nodemailer = require('nodemailer');

const VerifyUser = require('../middelwares/verifyUser')

//consultar solo los detalles de un usuario para perfil
router.get('/usertopbar', async(req,res)=>{
    let usuario = {
        nombre: req.nombreUsu,
    }
    res.json(usuario)
})

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
            model: Ciudad,
            as:'LugarExpedicionDocu',
            attributes: ['nombreCiudad']
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
            model: Ciudad,
            as:'LugarExpedicionDocu',
            attributes: ['nombreCiudad']
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
       idCiudad_FK: req.body.idCiudad_FK
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


// CREATE 
router.post('/create', async (req, res) => {
    
    let randomPass = Math.random().toString(36).slice(-8);

    let randomPassEncrypt = bcrypt.hashSync(randomPass, 10);

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
       idCiudad_FK: req.body.idCiudad_FK
   }).catch(err=>{
        res.json({err:"Error al crear el usuario", detallesError: err.errors[0]});
   });
   await Credenciales.create({
       username: req.body.numeroDocumento,
       pass: randomPassEncrypt,
       CredencialesUsuario_FK: usuario.idUsuario
   });
   await UsuarioRol.create({
       idUsuario: usuario.idUsuario,
       idRol: 3
   });
    enviarCorreoNuevoUsuario(req.body.numeroDocumento, randomPass, req.body.correoUsuario, req.body.nombreUsuario)
    res.status(201).json({success:'Usuario Creado Con Exito' });
    
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
       idCiudad_FK: req.body.idCiudad_FK
    },{
        where: { idUsuario: req.params.idUsuario }
    }).catch(err=>{
        res.json({err:"Error al actualizar el usuario",detallesError:err.errors[0]});
   });;

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

const enviarCorreoNuevoUsuario = (usuario,contraseña, correo,nombre) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'proyectoadsi2021@gmail.com',
            pass: 'alfrejuke2021'
        }
    });
    
    const mensajeHTML = `
    <div>
    <p><strong>Bienvenido A Zooport ${nombre}</strong> aquí estan tus credenciales de acceso, recuerda cambiarlas en la seccion de perfil</p>
    <p>Usuario: ${usuario}</>
    <p>Contraseña: ${contraseña}</>
    </div>
    `
    const mailOptions = {
        from: 'proyectoadsi2021@gmail.com',
        to: correo,
        subject: 'Zoopport // Bienvenido!!',
        html: mensajeHTML
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
             res.json(error);
        } else {
            res.status(201).json({success: 'Email enviado'});
        }
    });
}



module.exports = router;