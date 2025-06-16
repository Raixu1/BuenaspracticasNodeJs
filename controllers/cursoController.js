const Curso = require('../models/Curso');

exports.listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registrarCurso = async (req, res) => {
  const { codigo, nombre, creditos } = req.body;
  try {
    const curso = await Curso.create({ codigo, nombre, creditos });
    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};