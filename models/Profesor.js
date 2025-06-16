const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profesor = sequelize.define('Profesor', {
  id: { type: DataTypes.INTEGER, 
  primaryKey: true, 
  autoIncrement: true 
},
  nombre: { type: DataTypes.STRING(100), 
  allowNull: false 
}, 
email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  curso_id: { 
    type: DataTypes.STRING(20),
    allowNull: true 
  }
},{
  tableName: 'Profesor',
  timestamps: false
});

module.exports = Profesor;