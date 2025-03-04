module.exports = {
  accion: String,
  entidadAfectada: String,
  fechaAccion: { type: Date, default: Date.now },
  detalles: String,
  ip: String,
  usuario: String,
};