const express = require('express');
const router = express.Router();

const alumnosRoutes = require('./alumnos.routes');
const asignaturasRoutes = require('./asignaturas.routes');
const calificacionesRoutes = require('./calificaciones.routes');
const reportesRoutes = require('./reportes.routes');

router.use('/alumnos', alumnosRoutes);
router.use('/asignaturas', asignaturasRoutes);
router.use('/calificaciones', calificacionesRoutes);
router.use('/reportes', reportesRoutes);

module.exports = router;