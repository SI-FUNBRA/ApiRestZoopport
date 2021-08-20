const sequelize=require('./database/db');
const MetodoDePagoS=require('./database/models/MetodoDePagoModel');
const DonacionEconomicaS=require('./database/models/DonacionEconomicaModel');
const UsuarioS=require('./database/models/usuario');
const BarrioS=require('./database/models/barrio');
const LocalidadS=require('./database/models/localidad');
const CiudadS=require('./database/models/ciudad');
const DepartamentoS=require('./database/models/departamento');
const PaisS=require('./database/models/pais');
const CredencialesS=require('./database/models/credenciales');
const TipoDocumentoS=require('./database/models/tipoDoc');

//MetodoDePago
const MetodosDePago=[
    {nombreMetodoPago:'Paypal',},
    {nombreMetodoPago:'Bancolombia'},
    {nombreMetodoPago:'PSE'},
    {nombreMetodoPago:'Efecty'},
    {nombreMetodoPago:'Tarjeta de crédito'}
];

//DonacionEconomica
const DonacionesEconomicas=[
    {fechaDonacion:'2021-06-24',montoDonacion:300000,idMetodoDePago_FK:1,idUsuario_FK:1},
    {fechaDonacion:'2021-05-20',montoDonacion:320000,idMetodoDePago_FK:2,idUsuario_FK:1},
    {fechaDonacion:'2021-06-30',montoDonacion:150000,idMetodoDePago_FK:3,idUsuario_FK:1},
    {fechaDonacion:'2021-07-04',montoDonacion:50000,idMetodoDePago_FK:4,idUsuario_FK:1},
    {fechaDonacion:'2021-06-21',montoDonacion:60000,idMetodoDePago_FK:4,idUsuario_FK:1,},
];

//Usuario
const Usuario=[
    {nombreUsuario:'Freddy Stiben',apellidoUsuario:'Calderon Barreto',correoUsuario:'freddystibencb@gmail.com',telefonoFijo:'',telefonoCelular:'3132286510',fechaNacimientoUsuario:'2004-0406',idTipoDocumento_FK:2,numeroDocumento:'1023162339',fechaExpedicionDoc:'2018-04-17',LugarExpedicionDoc:1, estadoUsuario:1, idBarrio_FK:1},

    {nombreUsuario:'Giselle',apellidoUsuario:'Huertas Garcia',correoUsuario:'Giselle123@gmail.com',telefonoFijo:'',telefonoCelular:'32047044443',fechaNacimientoUsuario:'1990-06-20',idTipoDocumento_FK:1,numeroDocumento:1009825142,fechaExpedicionDoc:'2008-06-30',LugarExpedicionDoc:3, estadoUsuario:1, idBarrio_FK:2},

    {nombreUsuario:'Oscar',apellidoUsuario:'Rodriguez Martinez',correoUsuario:'ORodrigez21@gmail.com',telefonoFijo:'',telefonoCelular:'3216523542',fechaNacimientoUsuario:'1987-08-17',idTipoDocumento_FK:1,numeroDocumento:1001213219,fechaExpedicionDoc:'2005-08-17',LugarExpedicionDoc:1, estadoUsuario:1, idBarrio_FK:3},
    
    {nombreUsuario:'Maria Sara',apellidoUsuario:'Barrera',correoUsuario:'MariBa@gmail.com',telefonoFijo:'',telefonoCelular:'3116278193',fechaNacimientoUsuario:'1992-01-31',idTipoDocumento_FK:1,numeroDocumento:10001241521,fechaExpedicionDoc:'2010-02-03',LugarExpedicionDoc:1, estadoUsuario:1, idBarrio_FK:4},

    {nombreUsuario:'Jorge Andres',apellidoUsuario:'Casas Flores',correoUsuario:'floresdeJorge@gmail.com',telefonoFijo:'',telefonoCelular:'3139871310',fechaNacimientoUsuario:'1970-09-30',idTipoDocumento_FK:3,numeroDocumento:1011122331,fechaExpedicionDoc:'1990-10-23',LugarExpedicionDoc:6, estadoUsuario:1, idBarrio_FK:5}
];

//Barrio
const Barrio=[
    {nombreBarrio:'La Faena', idLocalidad_FK:1},
    {nombreBarrio:'Bochica', idLocalidad_FK:1},
    {nombreBarrio:'La Esmeralda', idLocalidad_FK:3},
    {nombreBarrio:'Suba Centro', idLocalidad_FK:3},
    {nombreBarrio:'La Union', idLocalidad_FK:2}
];

//Localidad
const Localidad=[
    {NombreLocalidad:'Engativa', idCiudad_FK:1},
    {NombreLocalidad:'Bosa', idCiudad_FK:1},
    {NombreLocalidad:'Suba', idCiudad_FK:1},
    {NombreLocalidad:'Fontibón', idCiudad_FK:1},
    {NombreLocalidad:'N.A', idCiudad_FK:3}
];

//Ciudad
const Ciudad=[
    {NombreCiudad:'Bogotá D.C', idDepartamento_FK:1},
    {NombreCiudad:'Zipaquirá', idDepartamento_FK:1},
    {NombreCiudad:'Mosquera', idDepartamento_FK:1},
    {NombreCiudad:'Guaduas', idDepartamento_FK:1},
    {NombreCiudad:'Pitalito', idDepartamento_FK:3}
];

//Departamento

const Departamento=[
    {NombreDepartamento:'Cundinamarca', idPais_FK:1},
    {NombreDepartamento:'Boyacá', idPais_FK:1},
    {NombreDepartamento:'Huila', idPais_FK:1},
    {NombreDepartamento:'Antioquia', idPais_FK:1},
    {NombreDepartamento:'Caldas', idPais_FK:1}
];


//Pais
const Pais=[
    {NombreDepartamento:'Colombia'},
    {NombreDepartamento:'Chile'},
    {NombreDepartamento:'Panamá'},
    {NombreDepartamento:'Ecuador'},
    {NombreDepartamento:'Canada'}
];

//Credenciales
const Credenciales=[
    {username:'FreddCal',pass:'234fwds', estado:1,idUsuario_FK:1},
    {username:'Keniel',pass:'f234fafa', estado:1,idUsuario_FK:2},
    {username:'Almot',pass:'asdf2332', estado:1,idUsuario_FK:3},
    {username:'rotono12',pass:'a3$#df#23', estado:1,idUsuario_FK:4},
    {username:'Daguz',pass:'23423SDs#', estado:1,idUsuario_FK:5},
];

//TipoDocumento
const TipoDocumento=[
    {nombreTipoDocumento:'CC'},
    {nombreTipoDocumento:'TI'},
    {nombreTipoDocumento:'CE'},
    {nombreTipoDocumento:'P'}
];


sequelize.sync({forse:true})
         .then(()=>{
             //Hacer conexion establecida
             console.log('La conexion se realizo con exito');
         })
         .then(()=>{
             //LLenar Metodos de pago
             MetodosDePago.forEach(metododepago => {
                MetodoDePagoS.create(metododepago);
             });
         })
         .then(()=>{
             //Llenar Donacion Economica
             DonacionesEconomicas.forEach(donacioneconomica=>{
                DonacionEconomicaS.create(donacioneconomica);
             });
         })
         .then(()=>{
            //Llenar Usuarios
            Usuario.forEach(usuario=>{
               UsuarioS.create(usuario);
            });
        })
        .then(()=>{
            //Llenar Barrio
            Barrio.forEach(barrio=>{
               BarrioS.create(barrio);
            });
        })
        .then(()=>{
            //Llenar Localidad
            Localidad.forEach(localidad=>{
               LocalidadS.create(localidad);
            });
        })
        .then(()=>{
            //Llenar Ciudad
            Ciudad.forEach(ciudad=>{
               CiudadS.create(ciudad);
            });
        })
        .then(()=>{
            //Llenar Departamento
            Departamento.forEach(departamento=>{
               DepartamentoS.create(departamento);
            });
        })
        .then(()=>{
            //Llenar Pais
            Pais.forEach(pais=>{
               PaisS.create(pais);
            });
        })
        .then(()=>{
            //Llenar credenciales
            Credenciales.forEach(credenciales=>{
               CredencialesS.create(credenciales);
            });
        })
        .then(()=>{
            //Llenar tipoDoc
            TipoDocumento.forEach(tipodocumento=>{
               TipoDocumentoS.create(tipodocumento);
            });
        })