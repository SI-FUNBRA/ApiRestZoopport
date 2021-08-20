const jwt = require('jwt-simple')
const moment = require('moment');
require('dotenv').config();

const checkToken = (req, res, next) => {
    if (!req.headers['token-credencial']) {
        return  res.json({error: "Necesitas incluir la credencial en la cabecera(token-credencial)"});
    }

const tokenCredencial=req.headers['token-credencial'];
    let payload = {};
    try {
        console.log(process.env.FRASESECRETA);
        payload = jwt.decode(tokenCredencial, process.env.FRASESECRETA);
        
    } catch (e) {
        return  res.json({error:'token erroneo'});
    }

    if (payload.expiredAt < moment().unix()) {
        return  res.json({error:`el token usado ya expiro`});
    }

    req.nombreUsu = payload.nombre;
    
    next();
}

module.exports = {
    checkToken:checkToken
}