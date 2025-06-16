const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

router.get('/', cursoController.listarCursos);
router.post('/', cursoController.registrarCurso);

module.exports = router;