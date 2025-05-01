const Joi = require('joi');

const calificacionSchema = Joi.object({
  alumno_id: Joi.string().uuid().required(),
  asignatura_id: Joi.string().uuid().required(),
  calificacion: Joi.number().integer().min(0).max(100).required(),
});

function validarCalificacion(req, res, next) {
  const { error } = calificacionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validarCalificacion;
