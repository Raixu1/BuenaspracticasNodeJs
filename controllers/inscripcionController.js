const Estudiante = require('../models/Estudiante');
const Curso = require('../models/Curso');
const Inscripcion = require('../models/Inscripcion');

exports.inscribirEstudiante = async (req, res) => {
  const { estudianteId, cursoCodigo } = req.body;
  try {
    const estudiante = await Estudiante.findByPk(estudianteId);
    const curso = await Curso.findByPk(cursoCodigo);
    if (estudiante && curso) {
      await estudiante.addCurso(curso); 
      res.json({ mensaje: 'Estudiante inscrito en el curso' });
    } else {
      res.status(404).json({ error: 'Estudiante o curso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.findAll({
      include: [
        { model: Estudiante, attributes: ['id', 'nombre', 'email'] },
        { model: Curso, attributes: ['codigo', 'nombre', 'creditos'] }
      ]
    });
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};