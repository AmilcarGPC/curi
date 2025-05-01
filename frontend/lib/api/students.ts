import type { Student } from "@/components/students/students-table"

// This is a mock API service that would be replaced with real API calls in a production app

export async function getStudents(): Promise<Student[]> {
  // In a real app, this would be a fetch call to your API
  // Example: return fetch('/api/students').then(res => res.json())

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data from local storage or hardcoded data
  return JSON.parse(localStorage.getItem("students") || "[]")
}

export async function getStudent(id: string): Promise<Student | null> {
  // In a real app, this would be a fetch call to your API
  // Example: return fetch(`/api/students/${id}`).then(res => res.json())

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Return mock data
  const students = JSON.parse(localStorage.getItem("students") || "[]")
  return students.find((student: Student) => student.id === id) || null
}

export async function createStudent(student: Omit<Student, "id">): Promise<Student> {
  // In a real app, this would be a POST request to your API
  // Example: return fetch('/api/students', { method: 'POST', body: JSON.stringify(student) }).then(res => res.json())

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Create a new student with a generated ID
  const newStudent = {
    ...student,
    id: `STU${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`,
  }

  // Save to mock storage
  const students = JSON.parse(localStorage.getItem("students") || "[]")
  localStorage.setItem("students", JSON.stringify([...students, newStudent]))

  return newStudent
}

export async function updateStudent(student: Student): Promise<Student> {
  // In a real app, this would be a PUT request to your API
  // Example: return fetch(`/api/students/${student.id}`, { method: 'PUT', body: JSON.stringify(student) }).then(res => res.json())

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Update the student in mock storage
  const students = JSON.parse(localStorage.getItem("students") || "[]")
  const updatedStudents = students.map((s: Student) => (s.id === student.id ? student : s))
  localStorage.setItem("students", JSON.stringify(updatedStudents))

  return student
}

export async function deleteStudent(id: string): Promise<void> {
  // In a real app, this would be a DELETE request to your API
  // Example: return fetch(`/api/students/${id}`, { method: 'DELETE' }).then(res => res.json())

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Remove from mock storage
  const students = JSON.parse(localStorage.getItem("students") || "[]")
  const filteredStudents = students.filter((student: Student) => student.id !== id)
  localStorage.setItem("students", JSON.stringify(filteredStudents))
}
