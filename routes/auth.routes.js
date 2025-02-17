/**Ruta: /api/login */

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const {validarCampos} = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarjwt');

const router = Router();

router.post('/', 
    [
        check('nombre_usuario','Campo obligatorio').not().isEmpty(),
        check('contrasena', 'Campo obligatorio').not().isEmpty(),
        validarCampos,
    ],    
    login
);


module.exports = router;