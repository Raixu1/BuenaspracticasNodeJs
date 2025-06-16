const sequelize = require('../config/database');
const Curso = require('./Curso');
const Estudiante = require('./Estudiante');
const Profesor = require('./Profesor');
const Inscripcion = require('./Inscripcion');

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('¡Tablas y relaciones creadas con Sequelize!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
})();