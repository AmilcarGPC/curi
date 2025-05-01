const supabase = require('../utils/supabaseClient');

exports.boletaCalificacion = async (alumnoId, periodo) => {
  console.log('[boletaCalificacion] alumnoId:', alumnoId, 'periodo:', periodo);
  // 1. Datos del alumno
  const { data: alumno, error: errorAlumno } = await supabase.from('alumnos').select('*').eq('id', alumnoId).single();
  console.log('[boletaCalificacion] alumno:', alumno, 'errorAlumno:', errorAlumno);
  if (errorAlumno || !alumno) throw new Error('Alumno no encontrado');

  // 2. Todas las asignaturas del grado del alumno
  const { data: asignaturas, error: errorAsig } = await supabase.from('asignaturas').select('id, nombre, grado').eq('grado', alumno.grado);
  console.log('[boletaCalificacion] asignaturas:', asignaturas, 'errorAsig:', errorAsig);
  if (errorAsig) throw errorAsig;

  // 3. Calificaciones del alumno (opcionalmente por periodo)
  let califQuery = supabase.from('calificaciones').select('id, asignatura_id, calificacion, periodo');
  califQuery = califQuery.eq('alumno_id', alumnoId);
  if (periodo && !isNaN(Number(periodo))) califQuery = califQuery.eq('periodo', Number(periodo));
  const { data: calificaciones, error: errorCalif } = await califQuery;
  console.log('[boletaCalificacion] calificaciones:', calificaciones, 'errorCalif:', errorCalif);
  if (errorCalif) throw errorCalif;

  // 4. Estructura: agrupado por periodo y asignatura
  // grades[periodo][asignatura_id] = calificacion
  const grades = {};
  for (const c of calificaciones) {
    if (!grades[c.periodo]) grades[c.periodo] = {};
    grades[c.periodo][c.asignatura_id] = c.calificacion;
  }

  // 5. Promedios por periodo
  const promedios = {};
  for (const p of [1, 2, 3]) {
    const califsP = calificaciones.filter(c => c.periodo === p);
    if (califsP.length > 0) {
      promedios[p] = Math.round(califsP.reduce((a, b) => a + b.calificacion, 0) / califsP.length);
    }
  }

  // 6. Estructura para el frontend
  return {
    alumno: {
      id: alumno.id,
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      grado: alumno.grado,
      correo: alumno.correo
    },
    asignaturas: asignaturas.map(a => ({ id: a.id, name: a.nombre, grado: a.grado })),
    calificaciones: grades,
    promedios
  };
};

exports.promediosAsignatura = async (periodo, grado) => {
  // Traer todas las asignaturas (para obtener nombre y grado)
  const { data: asignaturas, error: errorAsig } = await supabase.from('asignaturas').select('id, nombre, grado');
  if (errorAsig) throw errorAsig;

  // Traer todas las calificaciones de todos los periodos (no solo los actuales)
  let query = supabase.from('calificaciones').select('asignatura_id, alumno_id, calificacion, periodo');
  if (grado && grado !== 'all') {
    // Filtrar solo asignaturas de ese grado
    const asigIds = asignaturas.filter(a => String(a.grado) === String(grado)).map(a => a.id);
    query = query.in('asignatura_id', asigIds);
  }
  const { data: califs, error } = await query;
  if (error) throw error;

  // Calificaciones solo de los periodos actual y anterior para promedios
  const periodos = [Number(periodo)];
  if (Number(periodo) > 1) periodos.unshift(Number(periodo) - 1);

  // Agrupar por asignatura y periodo
  const result = [];
  const asigsFiltradas = grado && grado !== 'all' ? asignaturas.filter(a => String(a.grado) === String(grado)) : asignaturas;
  for (const asig of asigsFiltradas) {
    const porPeriodo = {};
    for (const p of periodos) {
      const califsP = califs.filter(c => c.asignatura_id === asig.id && c.periodo === p);
      porPeriodo[p] = califsP.length ? Math.round(califsP.reduce((a, b) => a + b.calificacion, 0) / califsP.length) : null;
    }
    // Alumnos únicos en cualquier periodo para esta asignatura
    const alumnosUnicos = new Set(califs.filter(c => c.asignatura_id === asig.id).map(c => c.alumno_id));
    result.push({
      id: asig.id,
      nombre: asig.nombre,
      grado: asig.grado,
      promedio: porPeriodo[Number(periodo)],
      previo: Number(periodo) > 1 ? porPeriodo[Number(periodo) - 1] : null,
      alumnos: alumnosUnicos.size
    });
  }
  return result;
};

exports.alumnosRegularidad = async (periodo) => {
  // Alumnos y asignaturas
  const { data: alumnos, error: errorAl } = await supabase.from('alumnos').select('id, nombre, grado, matricula');
  if (errorAl) throw errorAl;
  const { data: asignaturas, error: errorAs } = await supabase.from('asignaturas').select('id, nombre');
  if (errorAs) throw errorAs;
  // Calificaciones del periodo
  let query = supabase.from('calificaciones').select('alumno_id, asignatura_id, periodo');
  if (periodo) query = query.eq('periodo', Number(periodo));
  const { data: califs, error: errorC } = await query;
  if (errorC) throw errorC;
  // Regularidad: alumno es regular si tiene calificación en todas las asignaturas
  const result = alumnos.map(al => {
    const califsAlumno = califs.filter(c => c.alumno_id === al.id);
    const regular = asignaturas.every(a => califsAlumno.some(c => c.asignatura_id === a.id));
    return { ...al, regular };
  });
  return result;
};

exports.overview = async () => {
  // Promedio general
  const { data: califs, error } = await supabase.from('calificaciones').select('calificacion');
  if (error) throw error;
  const promedio = califs.length ? Math.round(califs.reduce((a, b) => a + b.calificacion, 0) / califs.length) : null;
  // Total alumnos
  const { data: alumnos } = await supabase.from('alumnos').select('id');
  // Total asignaturas
  const { data: asignaturas } = await supabase.from('asignaturas').select('id');
  return {
    promedio,
    totalAlumnos: alumnos.length,
    totalAsignaturas: asignaturas.length,
  };
};
