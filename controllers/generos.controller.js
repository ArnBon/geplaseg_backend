const Genero = require('../model/genero.model');

const getGenero = async (req, res) => {

    const genero = await Genero.find({}, 'descripcion');     
    res.json({
        ok:true,
        genero
    });
}
// Función para inicializar géneros predeterminados
const crearGenero = async () => {
    const generosExistentes = await Genero.find({});// Verificar si ya existen géneros en la colección
    if (generosExistentes.length === 0) {
        // Insertar géneros predeterminados
        await Genero.insertMany([
            { descripcion: 'Masculino' },
            { descripcion: 'Femenino' }
        ]);
        console.log('Géneros predeterminados insertados');
    } else {
        console.log('Géneros ya existentes en la base de datos');
    }
};
crearGenero();


module.exports = {
    getGenero
}