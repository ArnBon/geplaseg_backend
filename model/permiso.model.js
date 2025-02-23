const { Schema, model } = require('mongoose');

const permisoSchema = Schema({
    nombre_permiso:  { type:String },
    descripcion:     { type:String }
    
});
module.exports = model('Permiso', permisoSchema);