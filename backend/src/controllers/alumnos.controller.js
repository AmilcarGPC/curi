const alumnosService = require('../services/alumnos.service');

// Crear alumno
async function crearAlumno(req, res) {
  try {
    const alumno = await alumnosService.crearAlumno(req.body);
    res.status(201).json(alumno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtener todos los alumnos
async function obtenerAlumnos(req, res) {
  try {
    const alumnos = await alumnosService.obtenerAlumnos();
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener alumno por id
async function obtenerAlumnoPorId(req, res) {
  try {
    const alumno = await alumnosService.obtenerAlumnoPorId(req.params.id);
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar alumno
async function actualizarAlumno(req, res) {
  try {
    const alumno = await alumnosService.actualizarAlumno(req.params.id, req.body);
    res.json(alumno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Eliminar alumno
async function eliminarAlumno(req, res) {
  try {
    await alumnosService.eliminarAlumno(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener el total de usuarios registrados en Supabase (maestros)
async function totalUsuariosSupabase(req, res) {
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;
    res.json({ total: data?.users?.length || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  crearAlumno,
  obtenerAlumnos,
  obtenerAlumnoPorId,
  actualizarAlumno,
  eliminarAlumno,
  totalUsuariosSupabase,
};
