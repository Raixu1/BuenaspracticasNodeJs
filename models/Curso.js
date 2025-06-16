const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Curso = sequelize.define('Curso', {
  codigo: {
    type: DataTypes.STRING(20),
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  creditos: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'curso',
  timestamps: false
});

module.exports = Curso;