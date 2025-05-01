const express = require('express');
const router = express.Router();
const calificacionesController = require('../controllers/calificaciones.controller');
const validarCalificacion = require('../middlewares/calificaciones.validation');

router.get('/', calificacionesController.obtenerCalificaciones);
router.get('/:id', calificacionesController.obtenerCalificacionPorId);
router.post('/', validarCalificacion, calificacionesController.crearCalificacion);
router.put('/:id', validarCalificacion, calificacionesController.actualizarCalificacion);
router.delete('/:id', calificacionesController.eliminarCalificacion);

module.exports = router;
