const asignaturasService = require('../services/asignaturas.service');

async function crearAsignatura(req, res) {
  try {
    const asignatura = await asignaturasService.crearAsignatura(req.body);
    res.status(201).json(asignatura);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function obtenerAsignaturas(req, res) {
  try {
    const asignaturas = await asignaturasService.obtenerAsignaturas();
    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerAsignaturaPorId(req, res) {
  try {
    const asignatura = await asignaturasService.obtenerAsignaturaPorId(req.params.id);
    if (!asignatura) return res.status(404).json({ error: 'Asignatura no encontrada' });
    res.json(asignatura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarAsignatura(req, res) {
  try {
    const asignatura = await asignaturasService.actualizarAsignatura(req.params.id, req.body);
    res.json(asignatura);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function eliminarAsignatura(req, res) {
  try {
    await asignaturasService.eliminarAsignatura(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  crearAsignatura,
  obtenerAsignaturas,
  obtenerAsignaturaPorId,
  actualizarAsignatura,
  eliminarAsignatura,
};
