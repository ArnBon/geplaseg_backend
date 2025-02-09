/*Ruta: /api/generos */

const { Router } = require('express');
const {getGenero, crearGenero} = require('../controllers/generos.controller');

const router = Router();

router.get('/', getGenero);

module.exports = router;