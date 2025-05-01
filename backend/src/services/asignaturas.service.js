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

// Obtener el promedio del último periodo para cada asignatura
async function obtenerPromediosUltimoPeriodo() {
  // 1. Obtener el último periodo registrado en calificaciones
  const { data: periodos, error: errorPeriodos } = await supabase
    .from('calificaciones')
    .select('periodo')
    .order('periodo', { ascending: false })
    .limit(1);
  if (errorPeriodos) throw errorPeriodos;
  // Si no hay periodos, igual devolvemos todas las asignaturas con alumnos y promedio en 0/null
  const ultimoPeriodo = (periodos && periodos.length > 0) ? periodos[0].periodo : null;

  // 2. Obtener todas las asignaturas
  const { data: asignaturas, error: errorAsignaturas } = await supabase
    .from('asignaturas')
    .select('id, nombre, grado');
  if (errorAsignaturas) throw errorAsignaturas;

  // 3. Obtener todas las calificaciones (de todos los periodos)
  const { data: todasCalifs, error: errorTodasCalifs } = await supabase
    .from('calificaciones')
    .select('alumno_id, asignatura_id');
  if (errorTodasCalifs) throw errorTodasCalifs;

  // 4. Para cada asignatura, calcular el promedio (último periodo) y cantidad de alumnos (todos los periodos)
  const resultados = [];
  for (const asignatura of asignaturas) {
    let alumnosInscritos = 0;
    let promedio = null;
    // Calcular alumnos únicos en cualquier periodo
    alumnosInscritos = new Set(
      (todasCalifs || []).filter(c => c.asignatura_id === asignatura.id).map(c => c.alumno_id)
    ).size;
    // Calcular promedio solo del último periodo
    if (ultimoPeriodo !== null) {
      const { data: califs, error: errorCalifs } = await supabase
        .from('calificaciones')
        .select('calificacion, alumno_id')
        .eq('asignatura_id', asignatura.id)
        .eq('periodo', ultimoPeriodo);
      if (errorCalifs) throw errorCalifs;
      promedio = califs.length > 0 ? Math.round(califs.reduce((acc, c) => acc + c.calificacion, 0) / califs.length) : null;
    }
    resultados.push({
      id: asignatura.id,
      nombre: asignatura.nombre,
      grado: asignatura.grado,
      alumnos: alumnosInscritos,
      promedio,
    });
  }
  return resultados;
}

module.exports = {
  crearAsignatura,
  obtenerAsignaturas,
  obtenerAsignaturaPorId,
  actualizarAsignatura,
  eliminarAsignatura,
  obtenerPromediosUltimoPeriodo,
};
