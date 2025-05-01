const express = require('express');
const router = express.Router();
const calificacionesController = require('../controllers/calificaciones.controller');
const validarCalificacion = require('../middlewares/calificaciones.validation');

router.get('/', calificacionesController.obtenerCalificaciones);
router.get('/:id', calificacionesController.obtenerCalificacionPorId);
router.post('/', validarCalificacion, calificacionesController.crearCalificacion);
router.put('/:id', validarCalificacion, calificacionesController.actualizarCalificacion);
router.delete('/:id', calificacionesController.eliminarCalificacion);

// Endpoint para el promedio general del último periodo completamente cargado
router.get('/promedio-ultimo-periodo', calificacionesController.promedioUltimoPeriodoCompleto);

// Endpoint para obtener el total de calificaciones
router.get('/total', calificacionesController.totalCalificaciones);

module.exports = router;
