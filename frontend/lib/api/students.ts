import type { Student } from "@/components/students/students-table"
import { apiClient } from "./apiClient"

export async function getStudents(): Promise<Student[]> {
  try {
    // Usa el cliente API con la ruta configurada en variables de entorno
    return await apiClient<Student[]>('students');
  } catch (error) {
    console.error('Error fetching students:', error);
    // Como fallback, devuelve datos del localStorage (para desarrollo)
    return JSON.parse(localStorage.getItem("students") || "[]");
  }
}

export async function getStudent(id: string): Promise<Student | null> {
  try {
    // Usa el cliente API con la ruta configurada en variables de entorno
    return await apiClient<Student>(`students/${id}`);
  } catch (error) {
    console.error(`Error fetching student ${id}:`, error);
    // Como fallback, devuelve datos del localStorage (para desarrollo)
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    return students.find((student: Student) => student.id === id) || null;
  }
}

export async function createStudent(student: Omit<Student, "id">): Promise<Student> {
  try {
    // Usa el cliente API con la ruta configurada en variables de entorno
    return await apiClient<Student>('students', {
      method: 'POST',
      body: student
    });
  } catch (error) {
    console.error('Error creating student:', error);
    // Como fallback, usa localStorage (para desarrollo)
    const newStudent = {
      ...student,
      id: `STU${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
    }

    const students = JSON.parse(localStorage.getItem("students") || "[]")
    localStorage.setItem("students", JSON.stringify([...students, newStudent]))

    return newStudent;
  }
}

export async function updateStudent(student: Student): Promise<Student> {
  try {
    // Usa el cliente API con la ruta configurada en variables de entorno
    return await apiClient<Student>(`students/${student.id}`, {
      method: 'PUT',
      body: student
    });
  } catch (error) {
    console.error(`Error updating student ${student.id}:`, error);
    // Como fallback, usa localStorage (para desarrollo)
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    const updatedStudents = students.map((s: Student) => (s.id === student.id ? student : s))
    localStorage.setItem("students", JSON.stringify(updatedStudents))

    return student;
  }
}

export async function deleteStudent(id: string): Promise<void> {
  try {
    // Usa el cliente API con la ruta configurada en variables de entorno
    await apiClient<void>(`students/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error(`Error deleting student ${id}:`, error);
    // Como fallback, usa localStorage (para desarrollo)
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    const filteredStudents = students.filter((student: Student) => student.id !== id)
    localStorage.setItem("students", JSON.stringify(filteredStudents))
  }
}
