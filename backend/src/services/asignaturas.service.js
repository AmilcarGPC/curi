const supabase = require('../utils/supabaseClient');

// Crear una nueva asignatura
async function crearAsignatura({ nombre, grado }) {
  const { data, error } = await supabase
    .from('asignaturas')
    .insert([{ nombre, grado }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Obtener todas las asignaturas
async function obtenerAsignaturas() {
  const { data, error } = await supabase
    .from('asignaturas')
    .select('*');
  if (error) throw error;
  return data;
}

// Obtener asignatura por id
async function obtenerAsignaturaPorId(id) {
  const { data, error } = await supabase
    .from('asignaturas')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

// Actualizar asignatura
async function actualizarAsignatura(id, campos) {
  const { data, error } = await supabase
    .from('asignaturas')
    .update(campos)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Eliminar asignatura
async function eliminarAsignatura(id) {
  const { error } = await supabase
    .from('asignaturas')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return { success: true };
}

module.exports = {
  crearAsignatura,
  obtenerAsignaturas,
  obtenerAsignaturaPorId,
  actualizarAsignatura,
  eliminarAsignatura,
};
