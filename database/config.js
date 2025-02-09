const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONN);

        console.log('BD activa...')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD');
        
    }
}

module.exports = {
    dbConnection
}


  

  
