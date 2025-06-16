const Profesor = require('../models/Profesor');
const Curso = require('../models/Curso');

exports.listarProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.findAll({ include: Curso });
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registrarProfesor = async (req, res) => {
  const { nombre, email, curso_id } = req.body;
  try {
    const profesor = await Profesor.create({ nombre, email, curso_id });
    res.json(profesor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};