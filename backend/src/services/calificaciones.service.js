const supabase = require('../utils/supabaseClient');

// Crear una nueva calificación
async function crearCalificacion({ alumno_id, asignatura_id, calificacion, periodo }) {
  const { data, error } = await supabase
    .from('calificaciones')
    .insert([{ alumno_id, asignatura_id, calificacion, periodo }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Obtener todas las calificaciones con paginación y join de nombres
async function obtenerCalificaciones({ page = 1, pageSize = 20 } = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await supabase
    .from('calificaciones')
    .select(`id, calificacion, periodo, alumno:alumno_id (nombre), asignatura:asignatura_id (nombre)`, { count: 'exact' })
    .range(from, to);
  if (error) throw error;
  return {
    data: data.map(c => ({
      id: c.id,
      calificacion: c.calificacion,
      periodo: c.periodo,
      alumno: c.alumno?.nombre || null,
      asignatura: c.asignatura?.nombre || null
    })),
    total: count
  };
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

// Obtener el promedio general del último periodo completamente cargado
async function obtenerPromedioUltimoPeriodoCompleto() {
  // 1. Obtener todos los periodos registrados
  const { data: periodosData, error: errorPeriodos } = await supabase
    .from('calificaciones')
    .select('periodo')
    .order('periodo', { ascending: true })
    .neq('periodo', null)
    .neq('periodo', '')
    .distinct();
  if (errorPeriodos) throw errorPeriodos;
  const periodos = periodosData.map(p => p.periodo).sort((a, b) => a - b);
  if (!periodos.length) return { periodo: null, promedio: null };

  // 2. Obtener todos los alumnos y asignaturas
  const { data: alumnos, error: errorAlumnos } = await supabase.from('alumnos').select('id');
  if (errorAlumnos) throw errorAlumnos;
  const { data: asignaturas, error: errorAsignaturas } = await supabase.from('asignaturas').select('id');
  if (errorAsignaturas) throw errorAsignaturas;

  // 3. Buscar el último periodo donde TODOS los alumnos tienen calificación en TODAS las asignaturas
  let periodoCompleto = null;
  for (let i = periodos.length - 1; i >= 0; i--) {
    const periodo = periodos[i];
    const { data: califs, error: errorCalifs } = await supabase
      .from('calificaciones')
      .select('alumno_id, asignatura_id')
      .eq('periodo', periodo);
    if (errorCalifs) throw errorCalifs;
    const set = new Set(califs.map(c => c.alumno_id + '-' + c.asignatura_id));
    let completo = true;
    for (const alumno of alumnos) {
      for (const asignatura of asignaturas) {
        if (!set.has(alumno.id + '-' + asignatura.id)) {
          completo = false;
          break;
        }
      }
      if (!completo) break;
    }
    if (completo) {
      periodoCompleto = periodo;
      break;
    }
  }
  if (!periodoCompleto) return { periodo: null, promedio: null };

  // 4. Calcular el promedio general de ese periodo
  const { data: califsPeriodo, error: errorPeriodo } = await supabase
    .from('calificaciones')
    .select('calificacion')
    .eq('periodo', periodoCompleto);
  if (errorPeriodo) throw errorPeriodo;
  const califsNum = califsPeriodo.map(c => c.calificacion).filter(v => typeof v === 'number');
  const promedio = califsNum.length ? Math.round(califsNum.reduce((a, b) => a + b, 0) / califsNum.length) : null;
  return { periodo: periodoCompleto, promedio };
}

// Obtener el total de calificaciones registradas
async function totalCalificaciones() {
  const { count, error } = await supabase
    .from('calificaciones')
    .select('id', { count: 'exact', head: true });
  if (error) throw error;
  return count;
}

module.exports = {
  crearCalificacion,
  obtenerCalificaciones,
  obtenerCalificacionPorId,
  actualizarCalificacion,
  eliminarCalificacion,
  obtenerPromedioUltimoPeriodoCompleto,
  totalCalificaciones,
};
