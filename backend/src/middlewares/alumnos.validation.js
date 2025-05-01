const Joi = require('joi');

const alumnoSchema = Joi.object({
  matricula: Joi.string().required(),
  nombre: Joi.string().required(),
  grado: Joi.number().integer().min(1).max(6).required(),
  correo: Joi.string().email().required(),
});

function validarAlumno(req, res, next) {
  const { error } = alumnoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validarAlumno;
