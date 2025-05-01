const reportesService = require('../services/reportes.service');

exports.boletaCalificacion = async (req, res) => {
  try {
    const { alumnoId } = req.params;
    const { periodo } = req.query;
    console.log("test")
    const data = await reportesService.boletaCalificacion(alumnoId, periodo);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.promediosAsignatura = async (req, res) => {
  try {
    const { periodo } = req.query;
    const data = await reportesService.promediosAsignatura(periodo);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.alumnosRegularidad = async (req, res) => {
  try {
    const { periodo } = req.query;
    const data = await reportesService.alumnosRegularidad(periodo);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.overview = async (req, res) => {
  try {
    const data = await reportesService.overview();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
