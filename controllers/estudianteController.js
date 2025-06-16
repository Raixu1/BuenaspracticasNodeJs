const Estudiante = require('../models/Estudiante');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

// Listar todos los estudiantes o filtrar por nombre/email usando Op.and y Op.or
exports.listarEstudiantes = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const pagina = parseInt(req.body.pagina) || 1;
    const limite = parseInt(req.body.limite) || 10;
    const offset = limite * (pagina - 1);
    let where = {};

    if (nombre && email) {
      // Buscar por nombre Y email (AND)
      where = {
        [Op.and]: [
          { nombre: { [Op.like]: `%${nombre}%` } },
          { email: { [Op.like]: `%${email}%` } }
        ]
      };
    } else if (nombre || email) {
      // Buscar por nombre O email (OR)
      where = {
        [Op.or]: [
          nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null,
          email ? { email: { [Op.like]: `%${email}%` } } : null
        ].filter(Boolean)
      };
    }

    const estudiantes = await Estudiante.findAll({ where, offset, limit:limite });
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registrarEstudiante = async (req, res) => {
  // Validar los datos recibidos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Si no hay errores, crear el estudiante
  const { nombre, email, fecha_nacimiento } = req.body;
  try {
    const estudiante = await Estudiante.create({ nombre, email, fecha_nacimiento });
    res.json(estudiante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


exports.registrarEstudiantesMasivo = async (req, res) => {
  try {
    // Espera un array de objetos estudiante en el body
    const estudiantes = await Estudiante.bulkCreate(req.body);
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un estudiante
exports.actualizarEstudiante = async (req, res) => {
  // Validar los datos recibidos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const { nombre, email, fecha_nacimiento } = req.body;
  try {
    const estudiante = await Estudiante.findByPk(id);
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    estudiante.nombre = nombre ?? estudiante.nombre;
    estudiante.email = email ?? estudiante.email;
    estudiante.fecha_nacimiento = fecha_nacimiento ?? estudiante.fecha_nacimiento;
    await estudiante.save();
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un estudiante
exports.eliminarEstudiante = async (req, res) => {
  const { id } = req.params;
  try {
    const estudiante = await Estudiante.findByPk(id);
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    await estudiante.destroy();
    res.json({ mensaje: 'Estudiante eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerEstudiantePorId = async (req, res) => {
  const { id } = req.params;
  try {
    const estudiante = await Estudiante.findByPk(id);
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};