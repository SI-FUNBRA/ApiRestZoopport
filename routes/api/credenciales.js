const router = require('express').Router();
require('dotenv').config();
const Credenciales = require('../../database/models/credenciales');
const Usuario = require('../../database/models/usuario')

const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const UsuarioRol = require('../../database/models/usuarioRol');

var nodemailer = require('nodemailer');

const {sendEmail} = require('../../helper/emailHelper')

const middelwares = require('../middelwares/middelwares');

router.post('/login', async(req, res) => {

    const credencial = await Credenciales.findOne({ where: { username: req.body.username } });

    if (credencial) {
        const igual = bcrypt.compareSync(req.body.pass, credencial.pass);
        if (igual) {
            if(credencial.estado){
            const usuario = await Usuario.findByPk(credencial.CredencialesUsuario_FK);
            const usuRoles = await  UsuarioRol.findAll({where:{idUsuario: usuario.idUsuario}});

            res.status(201).json({ success: createTokenLogin(usuario,usuRoles) });
            }else{
                 res.json({error: "Usuario Inactivo"});
            }
        } else {
             res.json({error:"error en usuario y/o contraseña" });
        }
    } else {
         res.json({error:"error en usuario y/o contraseña" });
    }
});


const createTokenLogin =  (usuario,usuRoles) => {

    tiposRol = []

    usuRoles.forEach(el => {
        tiposRol.push(el.idRol)
    });

    const payload = {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombreUsuario,
        apellido: usuario.apellidoUsuario,
        tiposRol: tiposRol,
        createAt: moment().unix(),
        expiredAt: moment().add(60,'minutes').unix()
    }

    return jwt.encode(payload, process.env.FRASESECRETA);
}


router.put('/cambiarcontra/:idUsuario', async (req, res)=>{
    const oldpass = await Credenciales.findOne({where:{CredencialesUsuario_FK: req.params.idUsuario}})
    
    try{
    iguales = bcrypt.compareSync(req.body.oldpass, oldpass.pass)
    }catch{
         res.json({error:'Algo salio mal'});
    }
    
    if(iguales){
        req.body.newpass = bcrypt.hashSync(req.body.newpass, 10);

    Credenciales.update({
        pass: req.body.newpass
    },{
        where:{CredencialesUsuario_FK: req.params.idUsuario}
    }).catch((e)=>{
         res.json({err:"Error Al Actualizar la contraseña"});
    })
        res.status(201).json({success:"Contraseña Cambiada Con Exito"});

    }else{
         res.json({err:"Contraseña No Coincide Con La Anterior"});
    }
})

router.post('/olvidecontra', async(req, res) => {

    const credencial = await Credenciales.findOne(
        {
            where: {username:req.body.username },
            include:{
                model: Usuario,
                attributes: ['idUsuario','correoUsuario']
            },
            attributes: ['username', 'pass']
        }).catch((e)=>{
          res.json({error:"algo salio mal"});
        })
        
     if(!credencial){
          res.json({error:"algo salio mal"});
     }   
    
    const token = createTokenPass(credencial.Usuario.idUsuario)
    const mensajeHTML = `
    <div>
    <p><strong>Olvidaste Tu Contraseña?</strong> No te preocupes, aquí la puedes restablecer en el siguiente link</p>
    <button><a href="${process.env.ENLACEFRONT}usu/olvidecontra/${token}">Aquí</a></button>
    </div>
    `
    sendEmail(credencial.correoUsuario,'Zoopport // Contraseña',mensajeHTML)

    res.status(201).json({success: 'Email enviado'});

 
});


router.put('/restablecer-contra',middelwares.checkTokenPass, async(req,res)=>{
   
    let {newpass} = req.body

    newpass = bcrypt.hashSync(newpass, 10)

    await Credenciales.update({
        pass: newpass
    },{
        where:{ CredencialesUsuario_FK: req.idUsuario}
    }).catch((e)=>{
         res.json({error:"Algo A Salido Mal"});
    })

    res.status(201).json({success:"Contraseña Cambiada Con Exito"});
})

const createTokenPass =  (idUsuario) => {

    const payload = {
        idUsuario: idUsuario,
        createAt: moment().unix(),
        expiredAt: moment().add(24,'hours').unix()
    }

    return jwt.encode(payload, process.env.FRASESECRETA);
}


// CREATE 
router.post('/register', async (req, res) => {
    
    const ussers = await Credenciales.findAll({where: {username:req.body.username }});
    let contra = req.body.pass
    if(ussers == false){
        
    req.body.pass = bcrypt.hashSync(req.body.pass, 10);

   const usuario = await Usuario.create(  {
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

   let msg = `
   <h3>Tu cuenta se ha registrado correctamente en la plataforma</h3>
   <h4>Nombre De usuario: ${req.body.username}</h4>
   <h4>Contraseña: ${contra}</h4>
   <hr>
   <p>¡Recuerda que tus datos de acceso al sistema son unicos e intransferibles!</p>
   `

   sendEmail(req.body.correoUsuario,"Bienvenido A Zooport :D", msg)

    res.status(201).json({ usuario, success:'Usuario Creado Con Exito' });
    }else{
        
        let err={
            errors:[{message:"Error Nombre De Usuario Ya Existe"}]
        }

         res.json({err:"Error en crear credencial",detallesError:err.errors[0]});
    }
});

router.post('/validateparam', async(req, res)=>{
    let { nameParam, param } = req.body

    await Usuario.findOne({
        where:{ [nameParam]: param}
    }).then(usuParam=>{
        (!usuParam)?res.json({resul:true}):res.json({resul:false});
    })
})
router.post('/validateuser', async(req, res)=>{
    let { param } = req.body

    await Credenciales.findOne({
        where:{ username: param}
    }).then(userRes=>{
        (!userRes)?res.json({resul:true}):res.json({resul:false});
    })
})



module.exports = router;