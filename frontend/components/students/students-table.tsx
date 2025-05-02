"use client"

import { useState, useEffect } from "react"
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

export type Student = {
  id: string
  matricula: string
  nombre: string
  grado: number
  correo: string
}

// Utilidad para mostrar el grado como texto
function gradoToTexto(grado: number) {
  switch (grado) {
    case 1:
      return "1er Grado"
    case 2:
      return "2do Grado"
    case 3:
      return "3er Grado"
    case 4:
      return "4to Grado"
    case 5:
      return "5to Grado"
    case 6:
      return "6to Grado"
    default:
      return grado
  }
}

export function StudentsTable() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
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

  // Fetch students from backend
  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:5000/api/alumnos")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false))
  }, [])

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grado.toString().includes(searchTerm) ||
      student.correo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get current page students
  const indexOfLastStudent = currentPage * itemsPerPage
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Handle add student
  const handleAddStudent = async (newStudent: Omit<Student, "id">) => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/alumnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      })
      const created = await res.json()
      setStudents((prev) => [...prev, created])
      setIsAddDialogOpen(false)
      toast({
        title: "Alumno agregado",
        description: `${newStudent.nombre} ha sido agregado exitosamente.`,
        variant: "success",
      })
    } catch {
      toast({ title: "Error", description: "No se pudo agregar el alumno.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  // Handle edit student
  const handleEditStudent = async (updatedStudent: Student) => {
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/alumnos/${updatedStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matricula: updatedStudent.matricula,
          nombre: updatedStudent.nombre,
          grado: updatedStudent.grado,
          correo: updatedStudent.correo,
        }),
      })
      const updated = await res.json()
      setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
      setIsEditDialogOpen(false)
      setSelectedStudent(null)
      toast({
        title: "Alumno actualizado",
        description: `${updatedStudent.nombre} ha sido actualizado exitosamente.`,
        variant: "success",
      })
    } catch {
      toast({ title: "Error", description: "No se pudo actualizar el alumno.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  // Handle delete student
  const handleDeleteStudent = async (id: string) => {
    setLoading(true)
    try {
      await fetch(`http://localhost:5000/api/alumnos/${id}`, { method: "DELETE" })
      setStudents((prev) => prev.filter((s) => s.id !== id))
      setIsDeleteDialogOpen(false)
      setSelectedStudent(null)
      toast({
        title: "Alumno eliminado",
        description: `El alumno ha sido eliminado exitosamente.`,
        variant: "success",
      })
    } catch {
      toast({ title: "Error", description: "No se pudo eliminar el alumno.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
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
              <TableHead>Correo</TableHead>
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
                        {gradoToTexto(student.grado)}
                      </span>
                    </TableCell>
                    <TableCell>{student.correo}</TableCell>
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
