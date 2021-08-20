const router = require('express').Router();
require('dotenv').config();
const Credenciales = require('../../database/models/credenciales');
const Usuario = require('../../database/models/usuario')

const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const UsuarioRol = require('../../database/models/usuarioRol');


router.post('/login', async(req, res) => {
    const credencial = await Credenciales.findOne({ where: { username: req.body.username } });
    if (credencial) {
        const igual = bcrypt.compareSync(req.body.pass, credencial.pass);
        if (igual) {
            const usuario= await Usuario.findByPk(credencial.CredencialesUsuario_FK);
            const usuRoles = await  UsuarioRol.findAll({where:{idUsuario: usuario.idUsuario}});

            res.json({ success: createToken(usuario,usuRoles) });
        } else {
             res.json({error:"error en usuario y/o contraseña" });
        }
    } else {
         res.json({error:"error en usuario y/o contraseña" });
    }
});

const createToken =  (usuario,usuRoles) => {
    console.log(usuRoles)
    const payload = {
        nombre: usuario.nombreUsuario,
        createAt: moment().unix(),
        expiredAt: moment().add(45,'minutes').unix()
    }
    return jwt.encode(payload, process.env.FRASESECRETA);
}


module.exports = router;