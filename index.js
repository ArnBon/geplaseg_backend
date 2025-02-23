require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

// 1.- crear el servidor de express
const app = express();

//cors es un middleware que se ejecuta desde aqui hacia abajo
app.use( cors() );

//lectura y parseo del body del postman o endpoint
app.use(express.json());

//2.- ejecuta BD
dbConnection();

console.log(process.env);


// 3.- ejecutar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

// 4.- Se crea las Rutas
app.use('/api/personas', require('./routes/personas.routes') )
app.use('/api/generos', require('./routes/generos.routes') )
app.use('/api/usuarios', require('./routes/usuario.routes') )
app.use('/api/login', require('./routes/auth.routes'))
app.use('/api/roles', require('./routes/roles.routes'))
app.use('/api/permisos', require('./routes/permisos.routes'))




// app.get('/api/generos', (req, res) => {
//     res.json({
//         ok: true,
//         personas: [{
//             id:123,
//             descripcion: 'Masculino'
//         }]
//     });
// }); 






