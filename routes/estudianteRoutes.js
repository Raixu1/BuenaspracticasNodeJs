const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');
const { body } = require('express-validator');

/**
 * @swagger
 * /estudiantes:
 *   get:
 *     summary: Lista todos los estudiantes
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Filtrar por nombre
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtrar por email
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Cantidad de resultados por página
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 */
router.get('/', estudianteController.listarEstudiantes);

/**
 * @swagger
 * /estudiantes/{id}:
 *   get:
 *     summary: Obtiene un estudiante por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *       404:
 *         description: Estudiante no encontrado
 */
router.get('/:id', estudianteController.obtenerEstudiantePorId);

/**
 * @swagger
 * /estudiantes:
 *   post:
 *     summary: Crea un nuevo estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Estudiante creado
 *       400:
 *         description: Error de validación
 */
router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Email inválido'),
    body('fecha_nacimiento').isDate().withMessage('Fecha inválida')
  ],
  estudianteController.registrarEstudiante
);

/**
 * @swagger
 * /estudiantes/bulk:
 *   post:
 *     summary: Crea varios estudiantes de forma masiva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 email:
 *                   type: string
 *                 fecha_nacimiento:
 *                   type: string
 *                   format: date
 *     responses:
 *       200:
 *         description: Estudiantes creados
 */

exports.registrarEstudiantesMasivo = async (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Se espera un array de estudiantes' });
  }
  for (const estudiante of req.body) {
    if (!estudiante.nombre || !estudiante.email || !estudiante.fecha_nacimiento) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios en cada estudiante' });
    }
  }
router.post('/bulk', estudianteController.registrarEstudiantesMasivo);
};
/**
 * @swagger
 * /estudiantes/{id}:
 *   put:
 *     summary: Actualiza un estudiante por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Estudiante actualizado
 *       404:
 *         description: Estudiante no encontrado
 */
router.put(
  '/:id',
  [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('email').optional().isEmail().withMessage('Email inválido'),
    body('fecha_nacimiento').optional().isDate().withMessage('Fecha inválida')
  ],
  estudianteController.actualizarEstudiante
);

/**
 * @swagger
 * /estudiantes/{id}:
 *   delete:
 *     summary: Elimina un estudiante por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante eliminado
 *       404:
 *         description: Estudiante no encontrado
 */
router.delete('/:id', estudianteController.eliminarEstudiante);

module.exports = router;