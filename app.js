const express = require('express');
const app = express();
const sequelize = require('./database/db');

/* 
    require('dotenv').config();
 */

/* 
require('./database/relacionesM-M'); */

// Setting
const PORT = process.env.PORT || 3000;

// Para poder rellenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//solucion a CORS
const cors  = require('cors')
app.use(cors())
app.use('/api', require('./routes/api'));

// Arrancamos el servidor
app.listen(PORT, function () {
    console.log(`La app ha arrancado en http://localhost:${PORT}`);
    
    // Conectase a la base de datos
    // Force true: DROP TABLES
    sequelize.sync({ force: false }).then(() => {
        console.log("Nos hemos conectado a la base de datos");
    }).catch(error => {
        console.log('Se ha producido un error', error);
    })
    
});