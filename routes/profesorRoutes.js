const express = require('express');
const router = express.Router();
const profesorController = require('../controllers/profesorController');

router.get('/', profesorController.listarProfesores);
router.post('/', profesorController.registrarProfesor);

module.exports = router;