const Joi = require('joi');

const asignaturaSchema = Joi.object({
  nombre: Joi.string().required(),
  grado: Joi.number().integer().min(1).max(6).required(),
});

function validarAsignatura(req, res, next) {
  const { error } = asignaturaSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validarAsignatura;
