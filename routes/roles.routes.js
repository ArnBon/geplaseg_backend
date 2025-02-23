/*Ruta: /api/roles*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getRoles, getRolesId, crearRol, editarRol, eliminarRol } = require('../controllers/roles.controller');
const {validarCampos} = require('../middlewares/validarcampos');



const router = Router();
router.get('/', getRoles);
router.get('/:id', getRolesId);

router.post('/', 
    [
      check('nombre_rol', 'El campo Nombre de Usuario es obligatorio').not().isEmpty(), 
      check('descripcion', 'El campo Contraseña es obligatorio').not().isEmpty(),
      validarCampos, 
    ],
    crearRol);

router.put('/:id', 
    [
     check('nombre_rol', 'El campo Nombre de Usuario es obligatorio').not().isEmpty(), 
     check('descripcion', 'El campo Contraseña es obligatorio').not().isEmpty(),
     validarCampos, 
    ],
editarRol);

router.delete('/:id', eliminarRol);



module.exports = router
