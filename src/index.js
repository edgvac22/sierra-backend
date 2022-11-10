require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/conexion')
const app = express();


//Coneccion a base de datos
dbConnection();

//CORS
app.use( cors() );

//Parseo y lectura del body
app.use( express.json() )

//rutas
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/articulos', require('./routes/articulos'));
app.use('/api/yappy', require('./routes/yappy'));
app.use('/api/archivos', require('./routes/archivos'));
app.use('/api/suscripcion', require('./routes/suscripcion'));

app.listen(process.env.PORT, ()=>{
    console.log("Server corriendo en puerto",process.env.PORT)
})