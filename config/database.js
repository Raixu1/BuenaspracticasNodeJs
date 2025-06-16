const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize('universidad', 'root', '123456', {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  port: 3306
});

module.exports = sequelize;