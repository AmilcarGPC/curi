const calificacionesService = require('../services/calificaciones.service');

async function crearCalificacion(req, res) {
  try {
    const calificacion = await calificacionesService.crearCalificacion(req.body);
    res.status(201).json(calificacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function obtenerCalificaciones(req, res) {
  try {
    const calificaciones = await calificacionesService.obtenerCalificaciones();
    res.json(calificaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerCalificacionPorId(req, res) {
  try {
    const calificacion = await calificacionesService.obtenerCalificacionPorId(req.params.id);
    if (!calificacion) return res.status(404).json({ error: 'Calificación no encontrada' });
    res.json(calificacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarCalificacion(req, res) {
  try {
    const calificacion = await calificacionesService.actualizarCalificacion(req.params.id, req.body);
    res.json(calificacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function eliminarCalificacion(req, res) {
  try {
    await calificacionesService.eliminarCalificacion(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Endpoint para obtener el promedio general del último periodo completamente cargado
async function promedioUltimoPeriodoCompleto(req, res) {
  try {
    const result = await calificacionesService.obtenerPromedioUltimoPeriodoCompleto();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener el total de calificaciones registradas
async function totalCalificaciones(req, res) {
  try {
    const total = await calificacionesService.totalCalificaciones();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  crearCalificacion,
  obtenerCalificaciones,
  obtenerCalificacionPorId,
  actualizarCalificacion,
  eliminarCalificacion,
  promedioUltimoPeriodoCompleto,
  totalCalificaciones,
};
