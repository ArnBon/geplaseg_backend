const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({    
    nombre_usuario: {type: String}, 
    contrasena: {type: String}, 
    email: {type: String}, 
    fecha_creacion: {type: Date},  
    estado: {type: [String], enum: ['Activo','Inactivo'], default:[] },  
    id_persona: {type: Schema.Types.ObjectId, ref: 'Persona'} 
});

// usuarioSchema.methos('toJson', function(){
//     const{ __v, _id, ...object} = this.toObject();
//     object.uid = _id;
//     return object;
// });


module.exports = model('Usuario', usuarioSchema);