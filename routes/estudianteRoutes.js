const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');
const { body } = require('express-validator');

router.get('/', estudianteController.listarEstudiantes); // Listar todos
router.get('/:id', estudianteController.obtenerEstudiantePorId); // Buscar por ID
router.post('/', estudianteController.registrarEstudiante);
router.post('/bulk', estudianteController.registrarEstudiantesMasivo);
router.put('/:id', estudianteController.actualizarEstudiante);
router.delete('/:id', estudianteController.eliminarEstudiante);
router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Email inválido'),
    body('fecha_nacimiento').isDate().withMessage('Fecha inválida')
  ],
  estudianteController.registrarEstudiante
);

module.exports = router;