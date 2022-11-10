require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = async() =>{
    
    try{
        mongoose.connect(process.env.DB_CNN);

        console.log('BD Online');
    }
    catch(error) {
        console.log(error);
        throw new Error('Error al realizar coneccion a BD');
    }
}

module.exports = {
    dbConnection
}