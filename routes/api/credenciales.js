const router = require('express').Router();
require('dotenv').config();
const Credenciales = require('../../database/models/credenciales');
const Usuario = require('../../database/models/usuario')

const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const UsuarioRol = require('../../database/models/usuarioRol');


var nodemailer = require('nodemailer');
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
        nombre: usuario.nombreUsuario,
        apellido: usuario.apellidoUsuario,
        tiposRol: tiposRol,
        createAt: moment().unix(),
        expiredAt: moment().add(45,'minutes').unix()
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
        
     const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'proyectoadsi2021@gmail.com',
            pass: 'alfrejuke2021'
        }
    });
    
    const token = createTokenPass(credencial.Usuario.idUsuario)
    const mensajeHTML = `
    <div>
    <p><strong>Olvidaste Tu Contraseña?</strong> No te preocupes, aquí la puedes restablecer en el siguiente link</p>
    <button><a href="${process.env.ENLACEFRONT}usu/olvidecontra/${token}">Aquí</a></button>
    </div>
    `
    const mensaje = "Olvidaste Tu Contraseña? No te preocupes, aquí la puedes restablecer en el siguiente link \n"+process.env.ENLACEFRONT+"usu/olvidecontra/"+token;
    
    var mailOptions = {
        from: 'proyectoadsi2021@gmail.com',
        to: credencial.Usuario.correoUsuario,
        subject: 'Zoopport // Contraseña',
        html: mensajeHTML
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
             res.json(error);
        } else {
            res.status(201).json({success: 'Email enviado: ' + info.response});
        }
    }); 
 
});


router.put('/restablecer-contra',middelwares.checkTokenPass, async(req,res)=>{
   
    let {newpass} = req.body

    newpass = bcrypt.hashSync(newpass, 10)

    const credencial = Credenciales.update({
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


router.get('/mensaje', async(req,res)=>{
    const client = require('twilio')();

    const message = await client.messages.create({
    from: 'whatsapp:+14155238886',
    body: 'help',
    to: 'whatsapp:+573209897269'
    }).catch((e)=>{
         res.json({error:"Algo salio mal", e: e});
    })

    res.status(201).json({success:message});
    
})

module.exports = router;