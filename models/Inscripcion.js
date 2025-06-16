const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inscripcion = sequelize.define('inscripcion', {
  estudianteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'estudiante',
      key: 'id'
    }
  },
  cursoCodigo: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: 'curso',
      key: 'codigo'
    }
  }
}, {
  tableName: 'inscripcion',
  timestamps: false
});

module.exports = Inscripcion;