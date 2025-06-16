console.log('inscripcionRoutes cargado');


const express = require('express');
const router = express.Router();
const inscripcionController = require('../controllers/inscripcionController');

router.post('/', inscripcionController.inscribirEstudiante);
router.get('/', inscripcionController.listarInscripciones);
router.get('/prueba', (req, res) => {
  res.json({ mensaje: 'Ruta inscripciones activa' });

});

module.exports = router;
