const { Schema, model } = require('mongoose');

const personaSchema = Schema({
    primer_apellido:  { type: String, required: true },
    segundo_apellido: { type: String },
    primer_nombre:    { type: String, required: true },
    segundo_nombre:   { type: String },
    fecha_nacimiento: { type: Date },
    ci_pasaporte_rif: { type: String },
    estado_civil:     { type: String },
    parentesco:       { type: String },
    tipos:            { type: [String], enum: ['titular', 'beneficiario', 'dependiente', 'familiar'], default: [] }, // Array para múltiples roles  
    id_genero:        { type: Schema.Types.ObjectId, ref: 'Genero' }

});

personaSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.pid = _id;
    return object;
})

module.exports = model('Persona', personaSchema );

