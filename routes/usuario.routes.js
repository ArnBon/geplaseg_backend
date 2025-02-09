/*Ruta: /api/usuarios*/

const{ Router } = require('express');
const{ getUsuario, getUsuarioId, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario.controller');


const router = Router();

router.get('/', getUsuario);
router.get('/:id', getUsuarioId);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);


module.exports = router;