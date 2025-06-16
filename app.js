const express = require('express');
const app = express();
app.use(express.json());

require('./models/relaciones');

const cursoRoutes = require('./routes/cursoRoutes');
app.use('/cursos', cursoRoutes);

const estudianteRoutes = require('./routes/estudianteRoutes');
app.use('/estudiantes', estudianteRoutes);

const inscripcionRoutes = require('./routes/inscripcionRoutes');
app.use('/inscripciones', inscripcionRoutes);

const profesorRoutes = require('./routes/profesorRoutes');
app.use('/profesores', profesorRoutes);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);


app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
  
});