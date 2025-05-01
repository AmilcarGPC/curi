const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportes.controller');

router.get('/boleta/:alumnoId', reportesController.boletaCalificacion);
router.get('/promedios-asignatura', reportesController.promediosAsignatura);
router.get('/alumnos-regularidad', reportesController.alumnosRegularidad);
router.get('/overview', reportesController.overview);

module.exports = router;
