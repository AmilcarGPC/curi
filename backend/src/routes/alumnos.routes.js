const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnos.controller');
const validarAlumno = require('../middlewares/alumnos.validation');

router.get('/', alumnosController.obtenerAlumnos);
router.get('/:id', alumnosController.obtenerAlumnoPorId);
router.post('/', validarAlumno, alumnosController.crearAlumno);
router.put('/:id', validarAlumno, alumnosController.actualizarAlumno);
router.delete('/:id', alumnosController.eliminarAlumno);

module.exports = router;
