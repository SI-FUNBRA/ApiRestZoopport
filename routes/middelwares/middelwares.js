const jwt = require('jwt-simple')

const moment = require('moment');

require('dotenv').config();

const checkToken = (req, res, next) => {

    if (!req.headers['token']) {
        return  res.status(401).json({error: "Necesitas iniciar sesión para acceder a este contenido"});
    }

    const tokenCredencial = req.headers['token'];
    
    let payload = {};
    
    try {
        payload = jwt.decode(tokenCredencial, process.env.FRASESECRETA);
    } catch (e) {
        return  res.status(401).json({error:'Necesitas iniciar sesión para acceder a este contenido'});
    }

    if (payload.expiredAt < moment().unix()) {
        return  res.status(401).json({error:`El tiempo limite de uso en la pagina a caducado, porfavor vuelva a iniciar sesión`});
    }

    req.idUsuario = payload.idUsuario;
    req.nombreUsu = payload.nombre;
    req.tiposRol = payload.tiposRol;
    req.RolPrincipal = payload.RolPrincipal;
    req.apellido = payload.apellido;
    
    next();
}

const checkTokenPass = (req, res, next) => {
 
    if (!req.headers['tokenpass']) {
        return  res.json({error: "Algo a salido mal 1"});
    }
    
    const tokenpass = req.headers['tokenpass'];
    
    let payload = {};
    
    try {
        payload = jwt.decode(tokenpass, process.env.FRASESECRETA);
    } catch (e) {
        return  res.json({error:'Algo a salido mal 2'});
    }

    if (payload.expiredAt < moment().unix()) {
        return  res.json({error:'El tiempo limite para realizar esta acción ya expiró. Porfavor vuelva a solicitar otro enlace.'});
    }

    req.idUsuario = payload.idUsuario;
    next();
}
module.exports = {
    checkToken:checkToken,
    checkTokenPass:checkTokenPass
}