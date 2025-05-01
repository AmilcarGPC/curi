"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, UserPlus, Pencil, Trash2 } from "lucide-react"
import { AddStudentDialog } from "./add-student-dialog"
import { EditStudentDialog } from "./edit-student-dialog"
import { DeleteStudentDialog } from "./delete-student-dialog"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

// Sample data for students
const studentsData = [
  {
    id: "STU001",
    matricula: "A12345",
    nombre: "Alex Chen",
    grado: "3rd Grade",
    correoElectronico: "alex.chen@school.edu",
    teacher: "Ms. Johnson",
    averageGrade: "A",
    attendance: "98%",
  },
  {
    id: "STU002",
    matricula: "B23456",
    nombre: "Emma Wilson",
    grado: "4th Grade",
    correoElectronico: "emma.wilson@school.edu",
    teacher: "Mr. Brown",
    averageGrade: "B+",
    attendance: "95%",
  },
  {
    id: "STU003",
    matricula: "C34567",
    nombre: "Olivia Martinez",
    grado: "2nd Grade",
    correoElectronico: "olivia.martinez@school.edu",
    teacher: "Mrs. Davis",
    averageGrade: "A-",
    attendance: "97%",
  },
  {
    id: "STU004",
    matricula: "D45678",
    nombre: "Noah Johnson",
    grado: "5th Grade",
    correoElectronico: "noah.johnson@school.edu",
    teacher: "Mr. Wilson",
    averageGrade: "B",
    attendance: "92%",
  },
  {
    id: "STU005",
    matricula: "E56789",
    nombre: "Sophia Williams",
    grado: "1st Grade",
    correoElectronico: "sophia.williams@school.edu",
    teacher: "Ms. Thompson",
    averageGrade: "A+",
    attendance: "99%",
  },
  {
    id: "STU006",
    matricula: "F67890",
    nombre: "Liam Garcia",
    grado: "3rd Grade",
    correoElectronico: "liam.garcia@school.edu",
    teacher: "Ms. Johnson",
    averageGrade: "B-",
    attendance: "90%",
  },
  {
    id: "STU007",
    matricula: "G78901",
    nombre: "Ava Rodriguez",
    grado: "4th Grade",
    correoElectronico: "ava.rodriguez@school.edu",
    teacher: "Mr. Brown",
    averageGrade: "A",
    attendance: "96%",
  },
  {
    id: "STU008",
    matricula: "H89012",
    nombre: "Ethan Lee",
    grado: "2nd Grade",
    correoElectronico: "ethan.lee@school.edu",
    teacher: "Mrs. Davis",
    averageGrade: "B+",
    attendance: "94%",
  },
  {
    id: "STU009",
    matricula: "I90123",
    nombre: "Isabella Brown",
    grado: "5th Grade",
    correoElectronico: "isabella.brown@school.edu",
    teacher: "Mr. Wilson",
    averageGrade: "A-",
    attendance: "97%",
  },
  {
    id: "STU010",
    matricula: "J01234",
    nombre: "James Taylor",
    grado: "1st Grade",
    correoElectronico: "james.taylor@school.edu",
    teacher: "Ms. Thompson",
    averageGrade: "B+",
    attendance: "93%",
  },
  {
    id: "STU011",
    matricula: "K12345",
    nombre: "Mia Anderson",
    grado: "3rd Grade",
    correoElectronico: "mia.anderson@school.edu",
    teacher: "Ms. Johnson",
    averageGrade: "A",
    attendance: "98%",
  },
  {
    id: "STU012",
    matricula: "L23456",
    nombre: "Benjamin Martin",
    grado: "4th Grade",
    correoElectronico: "benjamin.martin@school.edu",
    teacher: "Mr. Brown",
    averageGrade: "B",
    attendance: "91%",
  },
]

export type Student = (typeof studentsData)[0]

export function StudentsTable() {
  const [students, setStudents] = useState<Student[]>(studentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const { toast } = useToast()

  // Pagination settings
  const itemsPerPage = 5
  const totalPages = Math.ceil(students.length / itemsPerPage)

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.correoElectronico.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get current page students
  const indexOfLastStudent = currentPage * itemsPerPage
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Handle add student
  const handleAddStudent = (newStudent: Omit<Student, "id">) => {
    // In a real app, this would be an API call
    const id = `STU${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`
    const studentWithId = { ...newStudent, id }

    setStudents([...students, studentWithId])
    setIsAddDialogOpen(false)

    toast({
      title: "Alumno agregado",
      description: `${newStudent.nombre} ha sido agregado exitosamente.`,
      variant: "success",
    })
  }

  // Handle edit student
  const handleEditStudent = (updatedStudent: Student) => {
    // In a real app, this would be an API call
    const updatedStudents = students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))

    setStudents(updatedStudents)
    setIsEditDialogOpen(false)
    setSelectedStudent(null)

    toast({
      title: "Alumno actualizado",
      description: `${updatedStudent.nombre} ha sido actualizado exitosamente.`,
      variant: "success",
    })
  }

  // Handle delete student
  const handleDeleteStudent = (id: string) => {
    // In a real app, this would be an API call
    const updatedStudents = students.filter((student) => student.id !== id)
    const deletedStudent = students.find((student) => student.id === id)

    setStudents(updatedStudents)
    setIsDeleteDialogOpen(false)
    setSelectedStudent(null)

    toast({
      title: "Alumno eliminado",
      description: `${deletedStudent?.nombre || "Alumno"} ha sido eliminado exitosamente.`,
      variant: "success",
    })
  }

  const tableRowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
    exit: { opacity: 0, y: -10 },
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar alumnos..."
              className="pl-8 focus-visible-ring"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset to first page on search
              }}
              aria-label="Buscar alumnos"
            />
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 focus-visible-ring"
            aria-label="Agregar nuevo alumno"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Agregar Alumno
          </Button>
        </motion.div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matrícula</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Grado</TableHead>
              <TableHead>Correo Electrónico</TableHead>
              <TableHead className="w-[80px]" aria-label="Acciones"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence initial={false} mode="wait">
              {currentStudents.length > 0 ? (
                currentStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    custom={index}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="table-row-hover"
                  >
                    <TableCell className="font-medium">{student.matricula}</TableCell>
                    <TableCell>{student.nombre}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {student.grado}
                      </span>
                    </TableCell>
                    <TableCell>{student.correoElectronico}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 focus-visible-ring"
                            aria-label={`Acciones para ${student.nombre}`}
                          >
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedStudent(student)
                              setIsEditDialogOpen(true)
                            }}
                            className="flex items-center cursor-pointer focus-visible-ring"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar alumno
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedStudent(student)
                              setIsDeleteDialogOpen(true)
                            }}
                            className="flex items-center text-danger cursor-pointer focus-visible-ring"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar alumno
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center text-muted-foreground"
                    >
                      <Search className="h-8 w-8 mb-2" />
                      No se encontraron alumnos.
                    </motion.div>
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredStudents.length > 0 && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium">{indexOfFirstStudent + 1}</span> a{" "}
            <span className="font-medium">{Math.min(indexOfLastStudent, filteredStudents.length)}</span> de{" "}
            <span className="font-medium">{filteredStudents.length}</span> alumnos
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="focus-visible-ring"
              aria-label="Página anterior"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show pages around current page
                let pageNum = i + 1
                if (totalPages > 5) {
                  if (currentPage > 3) {
                    pageNum = currentPage - 3 + i
                  }
                  if (currentPage > totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  }
                }

                return pageNum <= totalPages ? (
                  <motion.div key={pageNum} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8 focus-visible-ring"
                      onClick={() => paginate(pageNum)}
                      aria-label={`Página ${pageNum}`}
                      aria-current={currentPage === pageNum ? "page" : undefined}
                    >
                      {pageNum}
                    </Button>
                  </motion.div>
                ) : null
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="focus-visible-ring"
              aria-label="Página siguiente"
            >
              Siguiente
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Add Student Dialog */}
      <AddStudentDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSubmit={handleAddStudent} />

      {/* Edit Student Dialog */}
      {selectedStudent && (
        <EditStudentDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          student={selectedStudent}
          onSubmit={handleEditStudent}
        />
      )}

      {/* Delete Student Dialog */}
      {selectedStudent && (
        <DeleteStudentDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          student={selectedStudent}
          onDelete={() => handleDeleteStudent(selectedStudent.id)}
        />
      )}
    </div>
  )
}
