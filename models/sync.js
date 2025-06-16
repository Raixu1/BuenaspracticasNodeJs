const sequelize = require('../config/database');

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