const router = require('express').Router();

const Usuarios = require('../../database/models/usuario');
const UsuarioRol = require('../../database/models/usuarioRol');



router.post('/nuevoRol', async(req, res) => {

    let {idUsuario,idRol} = req.body

    console.log(idUsuario, idRol)

    const usuarioRolV = await UsuarioRol.findAll({ where:{idUsuario:idUsuario, idRol:idRol}})

    
    if(!usuarioRolV[0]){
        await UsuarioRol.create({
        idUsuario: idUsuario,
        idRol:idRol}).catch((e)=>{
             res.json({err:"Error Al Establecer Un Nuevo Tipo De Rol"});
        })

    res.status(201).json({success:"El Rol Se Establecio Con Exito"});
    }else{
        await UsuarioRol.update({
        estado: true
    },{
        where:{ idUsuario: idUsuario}
    }).catch((e)=>{
         res.json({err:"Error Al Activar El Rol Para Este Usuario"});
    })

    res.status(201).json({success:"Se Actvo El Rol Con Exito"});
    } 
});

router.put('/inactivarRol',async(req,res)=>{
    const prueba = await UsuarioRol.destroy({
        where:{ idUsuario: req.body.idUsuario, idRol: req.body.idRol}
    }).catch((e)=>{
         res.json({err:"Error Al Inactivar El Rol Para Este Usuario"});
    })

    res.status(201).json({success:"Se Inactivo El Rol Con Exito", prueba:prueba});
})

//traer todos los roles y usuarios
router.get('/rolesusuarios', async(req,res)=>{
    
    await Usuarios.findAll({
        include: [{
            model: UsuarioRol,
            attributes:['idUsuario', 'idRol']
        }],
        attributes:['idUsuario', 'nombreUsuario', 'apellidoUsuario']
    }).then(response=>{
        res.json(response);
    })

})

module.exports = router;