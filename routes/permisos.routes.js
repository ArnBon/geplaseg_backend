/*Ruta: /api/permisos*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getPermisos, getPermisosId, crearPermiso, editarPermiso, eliminarPermiso } = require('../controllers/permisos.controller');
const {validarCampos} = require('../middlewares/validarcampos');



const router = Router();
router.get('/', getPermisos);
router.get('/:id', getPermisosId);

router.post('/', 
    [
      check('nombre_permiso', 'El campo Nombre de Permiso es obligatorio').not().isEmpty(), 
      check('descripcion', 'El campo Descripcion es obligatorio').not().isEmpty(),
      validarCampos, 
    ],
    crearPermiso);

router.put('/:id', 
    [
     check('nombre_permiso', 'El campo Nombre de Permiso es obligatorio').not().isEmpty(), 
     check('descripcion', 'El campo Descripcion es obligatorio').not().isEmpty(),
     validarCampos, 
    ],
editarPermiso);

router.delete('/:id', eliminarPermiso);



module.exports = router
