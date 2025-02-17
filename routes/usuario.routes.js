/*Ruta: /api/usuarios*/
const{ Router } = require('express');
const { check } = require('express-validator');
const{ getUsuario, getUsuarioId, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario.controller');
const {validarCampos} = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarjwt');

const router = Router();

router.get('/', getUsuario);
router.get('/:id', getUsuarioId);
router.post('/', 
    [
    check('nombre_usuario', 'El campo Nombre de Usuario es obligatorio').not().isEmpty(), 
    check('contrasena', 'El campo Contraseña es obligatorio').not().isEmpty(), 
    check('email', 'El campo Email es obligatorio').not().isEmpty(),
    check('fecha_creacion', 'El campo fecha de creación es obligatorio').not().isEmpty(),  
    check('estado', 'El campo estado es obligatorio').not().isEmpty(),
    validarCampos, 
    ],
    crearUsuario);

router.put('/:id', 
    [
    check('nombre_usuario', 'El campo Nombre de Usuario es obligatorio').not().isEmpty(), 
    check('email', 'El campo Email es obligatorio').not().isEmpty(),
    check('estado', 'El campo estado es obligatorio').not().isEmpty(),
    validarCampos, 
    ],    
    actualizarUsuario);
router.delete('/:id', eliminarUsuario);


module.exports = router;