const {Schema, model} = require('mongoose');

const generoSchema = Schema({
    descripcion: { type: String, required: true }
});

module.exports = model('Genero', generoSchema);