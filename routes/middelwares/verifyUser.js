
const checkUser = (req, res, next) =>{

    let verify = false

    req.tiposRol.forEach(el => {
        if(el == 1 || el == 2){
            verify = true
        }
    });


    if(verify){
        next();
    }else{
        res.status(403).json({error: "Acceso Denegado(no tienes un rol permitido)"});
    }

}

const checkAdmin = (req, res, next) =>{
    let verify = false

    req.tiposRol.forEach(el => {
        if(el == 1){
            verify = true
        }
    });

    if(verify){
        next();
    }else{
        res.status(403).json({error:"Acceso Denegado(no tienes un rol permitido)"});
    }
}

module.exports = {
    checkUser:checkUser,
    checkAdmin:checkAdmin
}