const router = require('express').Router();

const UsuarioRol = require('../../database/models/usuarioRol');



router.post('/nuevoRol', async(req, res) => {

    let {idUsuario,idRol} = req.body

    const usuarioRolV = await UsuarioRol.findAll({ where:{idUsuario:idUsuario, idRol:idRol}})

    
    if(!usuarioRolV[0]){
    const usuarioRol =  await UsuarioRol.create({
        idUsuario: idUsuario,
        idRol:idRol}).catch((e)=>{
             res.json({err:"Error Al Establecer Un Nuevo Tipo De Rol"});
        })

    res.status(201).json({success:"El Rol Se Establecio Con Exito"});
    }else{
        const usuarioRol = await UsuarioRol.update({
        estado: true
    },{
        where:{ idUsuario: idUsuario}
    }).catch((e)=>{
         res.json({err:"Error Al Activar El Rol Para Este Usuario"});
    })

    res.status(201).json({success:"Se Actvo El Rol Con Exito"});
    } 
});

router.put('/inactivarRol/:idUsuario',async(req,res)=>{
    const usuarioRol = await UsuarioRol.update({
        estado: false
    },{
        where:{ idUsuario: req.params.idUsuario}
    }).catch((e)=>{
         res.json({err:"Error Al Inactivar El Rol Para Este Usuario"});
    })

    res.status(201).json({success:"Se Inactivo El Rol Con Exito"});
})



module.exports = router;