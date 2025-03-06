/*Ruta: /api/permisos*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getPermisos, getPermisosId, crearPermiso, editarPermiso, eliminarPermiso } = require('../controllers/permisos.controller');
const {validarCampos, validarPermiso} = require('../middlewares/validarcampos');

const  auditmiddleware = require('../middlewares/auditmiddleware');


const router = Router();
router.get('/', getPermisos);
router.get('/:id', getPermisosId);

// Aplicar el middleware de auditoría a todas las rutas excepto GET
router.use((req, res, next) => {
  if (req.method !== 'GET') {
   auditmiddleware(req, res, next);
  } else {
    next();    
  }
});
//

router.post('/', 
    [
      check('nombre_permiso', 'El campo Nombre de Permiso es obligatorio').not().isEmpty(), 
      check('descripcion', 'El campo Descripcion es obligatorio').not().isEmpty(),
      validarCampos,      
      validarPermiso       
    ],
    crearPermiso);

router.put('/:id', 
    [
     check('nombre_permiso', 'El campo Nombre de Permiso es obligatorio').not().isEmpty(), 
     check('descripcion', 'El campo Descripcion es obligatorio').not().isEmpty(),
     validarCampos      
    ],
editarPermiso);

router.delete('/:id', eliminarPermiso);



module.exports = router
