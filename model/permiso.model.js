const { Schema, model } = require('mongoose');

const permisoSchema = Schema({
    nombre_permiso:  { type:String, unique: true },
    descripcion:     { type:String }
    
});
module.exports = model('Permiso', permisoSchema);