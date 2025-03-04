// Este middleware registrará automáticamente las acciones en la base de datos.
// src/middlewares/audit.middleware.js
const Audit = require('../model/audit.model');

const auditMiddleware = (req, res, next) => {
  // Filtrar solicitudes GET
  if (req.method === 'GET') {
    return next();
  }

  const { method, url, body, ip } = req;
  const user = req.user ? req.user.username : 'anonymous';

   // Extraer el nombre de la entidad afectada de la URL
  const entidadAfectada = url.split('/')[2]; // Ejemplo: "/api/permisos" -> "api"

  const auditData = {
    accion: method,
    entidadAfectada,
    detalles: JSON.stringify(body),
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress, // IP real del cliente
    usuario: user,
  };

  // Guardar en la base de datos
  Audit.create(auditData)
    .then(() => next())
    .catch((err) => {
      console.error('Error al registrar la auditoría:', err);
      next(); // Continuar incluso si hay un error en la auditoría
    });
};

module.exports = auditMiddleware;