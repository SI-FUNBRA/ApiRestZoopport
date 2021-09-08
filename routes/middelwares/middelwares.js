const jwt = require('jwt-simple')

const moment = require('moment');

require('dotenv').config();

const checkToken = (req, res, next) => {

    if (!req.headers['token-credencial']) {
        return  res.json({error: "Necesitas incluir la credencial en la cabecera(token-credencial)"});
    }

    const tokenCredencial = req.headers['token-credencial'];
    
    let payload = {};
    
    try {
        payload = jwt.decode(tokenCredencial, process.env.FRASESECRETA);
    } catch (e) {
        return  res.json({error:'token erroneo'});
    }

    if (payload.expiredAt < moment().unix()) {
        return  res.json({error:`el token usado ya expiro`});
    }

    req.nombreUsu = payload.nombre;
    req.tiposRol = payload.tiposRol;
    req.apellido = payload.apellido;
    
    next();
}

const checkTokenPass = (req, res, next) => {
 
    if (!req.body.token) {
        return  res.json({error: "Algo a salido mal"});
    }

    const token = req.body.token;
    
    let payload = {};
    
    try {
        payload = jwt.decode(token, process.env.FRASESECRETA);
    } catch (e) {
        return  res.json({error:'Algo a salido mal'});
    }

    if (payload.expiredAt < moment().unix()) {
        return  res.json({error:'El Tiempo Limite Para Realizar Esta Accion Ya Expiro'});
    }

    req.idUsuario = payload.idUsuario;
    next();
}
module.exports = {
    checkToken:checkToken,
    checkTokenPass:checkTokenPass
}