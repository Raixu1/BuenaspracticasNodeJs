const Curso = require('./Curso');
const Estudiante = require('./Estudiante');
const Inscripcion = require('./Inscripcion');
const Profesor = require('./Profesor');

// Relación N:M (Inscripción)
Curso.belongsToMany(Estudiante, { through: Inscripcion, foreignKey: 'cursoCodigo', otherKey: 'estudianteId' });
Estudiante.belongsToMany(Curso, { through: Inscripcion, foreignKey: 'estudianteId', otherKey: 'cursoCodigo' });

// Relación 1:1 (Profesor)
Curso.hasOne(Profesor, { foreignKey: 'curso_id' });
Profesor.belongsTo(Curso, { foreignKey: 'curso_id' });

// Relacion 1:M (Inscripcion)   
Inscripcion.belongsTo(Estudiante, { foreignKey: 'estudianteId' });
Inscripcion.belongsTo(Curso, { foreignKey: 'cursoCodigo' });