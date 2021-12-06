const router = require("express").Router();

const apiRolRouter = require("./api/rol");
const apiPreguntaRouter = require("./api/pregunta");
const apiRespuestaRouter = require("./api/respuesta");
const apiSolicitudAdopcionRouter = require("./api/solicitudAdopcion");
const apiUsuariosRouter = require("./api/usuarios");
const apiUsuarioRolRouter = require("./api/usuarioRol");
const apiCredencialesRouter = require("./api/credenciales");
const apiTipoDocRouter = require("./api/tipoDoc");
const apiPaisRouter = require("./api/pais");
const apiCiudadRouter = require("./api/ciudad");
const apiTipoArticuloDonado = require("./api/TipoArticuloDonadoRoute");
const apiArticuloDonado = require("./api/ArticuloDonadoRoute");
const apiSolicitudDonacionEspecie = require("./api/SolicitudDonacionEspecieRoute");
const apiMetodoDePagoRouter = require("./api/MetodoDePagoRoute");
const apiDonacionEconomica = require("./api/DonacionEconomicaRoute");
const apiTipoAnimalRouter = require("./api/tipoAnimal");
const apiEspecieRouter = require("./api/especie");
const apiEstadoAnimalRouter = require("./api/estadoAnimal");
const apiTipoTratamientoRouter = require("./api/tipoTratamiento");
const apiTratamientoRouter = require("./api/tratamiento");
const apiTipoAntecedenteRouter = require("./api/tipoAntecedente");
const apiAntecedenteRouter = require("./api/antecedente");
const apiFotografiaRouter = require("./api/fotografia");
const apiAnimalRouter = require("./api/animal");
const apiSedeRouter = require("./api/sede");
const apiCitaRouter = require("./api/cita");

const apiDocumentoSolicitudAdopcion = require("./api/documentoSolicitud");
const apiEnfermedadRouter = require("./api/enfermedad");

const middleware = require("./middelwares/middelwares");
const verifyUser = require("./middelwares/verifyUser");

//modulo Usuario
router.use("/rol", middleware.checkToken, verifyUser.checkAdmin, apiRolRouter);
router.use(
  "/usuarios", 
  middleware.checkToken, apiUsuariosRouter
);
router.use(
  "/usuarioRol",
   middleware.checkToken, verifyUser.checkAdmin, apiUsuarioRolRouter
);

router.use("/tipodoc", apiTipoDocRouter);

router.use("/pais", apiPaisRouter);
router.use("/ciudad", middleware.checkToken, verifyUser.checkAdmin, apiCiudadRouter);


router.use(
  "/tipoArticuloDonado",
  middleware.checkToken, apiTipoArticuloDonado
);
router.use("/articuloDonado", middleware.checkToken, apiArticuloDonado);
router.use(
  "/solicitudDonacionEspecie",
  /* middleware.checkToken, */ apiSolicitudDonacionEspecie
);
router.use("/metodoDePago", middleware.checkToken, apiMetodoDePagoRouter);
router.use(
  "/donacionEconomica",
  middleware.checkToken, apiDonacionEconomica
);
router.use("/pregunta", middleware.checkToken, apiPreguntaRouter);
router.use("/respuesta", middleware.checkToken, apiRespuestaRouter);

router.use(
  "/solicitudAdopcion",
  middleware.checkToken, apiSolicitudAdopcionRouter
);

router.use("/documentoSolicitud",/* middleware.checkToken, */ apiDocumentoSolicitudAdopcion);

router.use("/tipoAnimal", /* middleware.checkToken, */ apiTipoAnimalRouter);

router.use("/especie", middleware.checkToken, apiEspecieRouter);
router.use("/estadoAnimal", middleware.checkToken, apiEstadoAnimalRouter);
router.use(
  "/tipoTratamiento",
  middleware.checkToken, apiTipoTratamientoRouter
);

router.use("/enfermedad", /* middleware.checkToken, */ apiEnfermedadRouter);

router.use("/tratamiento", /* middleware.checkToken, */ apiTratamientoRouter);
router.use(
  "/tipoAntecedente",
  middleware.checkToken, apiTipoAntecedenteRouter
);
router.use("/antecedente", middleware.checkToken, apiAntecedenteRouter);

router.use("/fotografia", /* middleware.checkToken, */ apiFotografiaRouter);


router.use("/animal", /* middleware.checkToken, */ apiAnimalRouter);
router.use("/sede", middleware.checkToken, apiSedeRouter);
router.use("/cita", middleware.checkToken, apiCitaRouter);

//credenciales
router.use("/credenciales", apiCredencialesRouter);

module.exports = router;
