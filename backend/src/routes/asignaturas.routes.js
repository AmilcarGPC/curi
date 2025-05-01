const express = require('express');
const router = express.Router();
const asignaturasController = require('../controllers/asignaturas.controller');
const validarAsignatura = require('../middlewares/asignaturas.validation');

router.get('/', asignaturasController.obtenerAsignaturas);
router.get('/resumen', asignaturasController.obtenerPromediosUltimoPeriodo);
router.get('/:id', asignaturasController.obtenerAsignaturaPorId);
router.post('/', validarAsignatura, asignaturasController.crearAsignatura);
router.put('/:id', validarAsignatura, asignaturasController.actualizarAsignatura);
router.delete('/:id', asignaturasController.eliminarAsignatura);

module.exports = router;
