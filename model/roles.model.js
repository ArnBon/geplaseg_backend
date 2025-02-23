const { Schema, model } = require('mongoose');

const rolSchema = Schema({
    nombre_rol:  { type:String },
    descripcion: { type:String },
    permisos: [{ type: Schema.Types.ObjectId, ref: 'Permiso' }], // Relación muchos a muchos con Permisos    
});
module.exports = model('Rol', rolSchema);