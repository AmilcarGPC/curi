const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnos.controller');
const validarAlumno = require('../middlewares/alumnos.validation');

router.get('/', alumnosController.obtenerAlumnos);
router.get('/:id', alumnosController.obtenerAlumnoPorId);
router.post('/', validarAlumno, alumnosController.crearAlumno);
router.put('/:id', validarAlumno, alumnosController.actualizarAlumno);
router.delete('/:id', alumnosController.eliminarAlumno);

// Endpoint para obtener el total de usuarios registrados en Supabase (maestros)
router.get('/total-usuarios', alumnosController.totalUsuariosSupabase);

module.exports = router;
