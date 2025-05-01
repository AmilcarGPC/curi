const supabase = require('../utils/supabaseClient');

// Crear un nuevo alumno
async function crearAlumno({ matricula, nombre, grado, correo }) {
  const { data, error } = await supabase
    .from('alumnos')
    .insert([{ matricula, nombre, grado, correo }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Obtener todos los alumnos
async function obtenerAlumnos() {
  const { data, error } = await supabase
    .from('alumnos')
    .select('*');
  if (error) throw error;
  return data;
}

// Obtener un alumno por id
async function obtenerAlumnoPorId(id) {
  const { data, error } = await supabase
    .from('alumnos')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

// Actualizar alumno
async function actualizarAlumno(id, campos) {
  const { data, error } = await supabase
    .from('alumnos')
    .update(campos)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Eliminar alumno
async function eliminarAlumno(id) {
  const { error } = await supabase
    .from('alumnos')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return { success: true };
}

module.exports = {
  crearAlumno,
  obtenerAlumnos,
  obtenerAlumnoPorId,
  actualizarAlumno,
  eliminarAlumno,
};
