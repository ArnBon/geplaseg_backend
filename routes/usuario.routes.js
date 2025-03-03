/*Ruta: /api/usuarios/usuariorolpermiso/id*/
const{ Router } = require('express');
const { check } = require('express-validator');
const{ getUsuario, getUsuarioId, getUsuarioRolPermisos, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario.controller');
const {validarCampos, validarUsuario, validarEmailDuplicado} = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarjwt');

const router = Router();

router.get('/', validarJWT, getUsuario);
router.get('/:id', getUsuarioId);
router.get('/usuariorolpermiso/:id/', getUsuarioRolPermisos);

router.post('/', 
    [
    check('nombre_usuario', 'El campo Nombre de Usuario es obligatorio').not().isEmpty(), 
    check('contrasena', 'El campo Contraseña es obligatorio').not().isEmpty(), 
    check('email', 'El campo Email es obligatorio').not().isEmpty(),
    check('fecha_creacion', 'El campo fecha de creación es obligatorio').not().isEmpty(),  
    check('estado', 'El campo estado es obligatorio').not().isEmpty(),
    validarCampos,
    validarUsuario,
    validarEmailDuplicado,     
    ],
    crearUsuario);

router.put('/:id', 
    [
    validarJWT,
    check('nombre_usuario', 'El campo Nombre de Usuario es obligatorio').not().isEmpty(), 
    check('email', 'El campo Email es obligatorio').not().isEmpty(),
    check('estado', 'El campo estado es obligatorio').not().isEmpty(),
    validarCampos,
    validarUsuario,
    validarEmailDuplicado,    
    ],    
    actualizarUsuario);

    
router.delete('/:id', validarJWT, eliminarUsuario);

module.exports = router;