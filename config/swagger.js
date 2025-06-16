const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Buenas Prácticas Node.js',
      version: '1.0.0',
      description: 'Documentación de la API de estudiantes, cursos, inscripciones y profesores'
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;