const supabase = require('../utils/supabaseClient');

// Crear una nueva calificación
async function crearCalificacion({ alumno_id, asignatura_id, calificacion }) {
  const { data, error } = await supabase
    .from('calificaciones')
    .insert([{ alumno_id, asignatura_id, calificacion }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Obtener todas las calificaciones
async function obtenerCalificaciones() {
  const { data, error } = await supabase
    .from('calificaciones')
    .select('*');
  if (error) throw error;
  return data;
}

// Obtener calificación por id
async function obtenerCalificacionPorId(id) {
  const { data, error } = await supabase
    .from('calificaciones')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

// Actualizar calificación
async function actualizarCalificacion(id, campos) {
  const { data, error } = await supabase
    .from('calificaciones')
    .update(campos)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Eliminar calificación
async function eliminarCalificacion(id) {
  const { error } = await supabase
    .from('calificaciones')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return { success: true };
}

module.exports = {
  crearCalificacion,
  obtenerCalificaciones,
  obtenerCalificacionPorId,
  actualizarCalificacion,
  eliminarCalificacion,
};
