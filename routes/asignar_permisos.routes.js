/**Ruta: api/asignar_permisos */
const { Router } = require('express');
const { asignarPermisoRol } = require('../controllers/asignar_permisos.controller');

const router = Router();

//asignar permiso al rol
router.post('/', asignarPermisoRol);


module.exports = router;
