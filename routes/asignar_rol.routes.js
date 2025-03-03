/**Ruta: /api/asignar_rol */
const { Router } = require('express');
const { asignarRolUsuario } = require('../controllers/asignar_rol.controller');


const router = Router();

//asignar rol al usuario
router.post('/', asignarRolUsuario);


module.exports = router;

