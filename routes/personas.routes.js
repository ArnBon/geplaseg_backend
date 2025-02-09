/*Ruta: /api/personas*/
const { Router } = require('express');
const {getPersona, getPersonaId, crearPersona, actualizarPersona, eliminarPersona} = require('../controllers/personas.controller');

const router = Router();

router.get('/', getPersona);
router.get('/:id', getPersonaId);
router.post('/', crearPersona);
router.put('/:id', actualizarPersona)
router.delete('/:id', eliminarPersona)


module.exports = router;