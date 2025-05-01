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
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, BookPlus } from "lucide-react"
import { AddSubjectDialog } from "./add-subject-dialog"
import { EditSubjectDialog } from "./edit-subject-dialog"
import { DeleteSubjectDialog } from "./delete-subject-dialog"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

export type Subject = {
  id: string
  nombre: string
  grado: number
  alumnos?: number
  promedio?: number
}

// Utilidad para mostrar el grado como texto
function gradoToTexto(grado: number): string {
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
      return grado.toString()
  }
}

export function SubjectsTable() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const { toast } = useToast()

  // Fetch resumen de asignaturas (alumnos y promedio del último periodo)
  useEffect(() => {
    fetch("http://localhost:4000/api/asignaturas/resumen")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) ? setSubjects(data) : setSubjects([]))
      .catch(() => setSubjects([]))
  }, [])

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gradoToTexto(subject.grado).toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginación
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage)
  const indexOfLastSubject = currentPage * itemsPerPage
  const indexOfFirstSubject = indexOfLastSubject - itemsPerPage
  const currentSubjects = filteredSubjects.slice(indexOfFirstSubject, indexOfLastSubject)

  // CRUD handlers
  const handleAddSubject = async (newSubject: Omit<Subject, "id">) => {
    try {
      const res = await fetch("http://localhost:4000/api/asignaturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSubject),
      })
      const created = await res.json()
      setSubjects((prev) => [...prev, created])
      setIsAddDialogOpen(false)
      toast({ title: "Asignatura agregada", description: `${created.nombre} agregada exitosamente.`, variant: "default" })
    } catch {
      toast({ title: "Error", description: "No se pudo agregar la asignatura.", variant: "destructive" })
    }
  }

  const handleEditSubject = async (updatedSubject: Subject) => {
    try {
      const res = await fetch(`http://localhost:4000/api/asignaturas/${updatedSubject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: updatedSubject.nombre, grado: updatedSubject.grado }),
      })
      const updated = await res.json()
      setSubjects((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
      setIsEditDialogOpen(false)
      setSelectedSubject(null)
      toast({ title: "Asignatura actualizada", description: `${updated.nombre} actualizada exitosamente.`, variant: "default" })
    } catch {
      toast({ title: "Error", description: "No se pudo actualizar la asignatura.", variant: "destructive" })
    }
  }

  const handleDeleteSubject = async (id: string) => {
    try {
      await fetch(`http://localhost:4000/api/asignaturas/${id}`, { method: "DELETE" })
      setSubjects((prev) => prev.filter((s) => s.id !== id))
      setIsDeleteDialogOpen(false)
      setSelectedSubject(null)
      toast({ title: "Asignatura eliminada", description: `La asignatura ha sido eliminada exitosamente.`, variant: "default" })
    } catch {
      toast({ title: "Error", description: "No se pudo eliminar la asignatura.", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar asignaturas..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <BookPlus className="mr-2 h-4 w-4" />
          Agregar Asignatura
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Grado</TableHead>
              <TableHead>Alumnos</TableHead>
              <TableHead>Promedio</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence initial={false} mode="wait">
              {currentSubjects.length > 0 ? (
                currentSubjects.map((subject, index) => (
                  <motion.tr
                    key={subject.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: (i: number) => ({
                        opacity: 1,
                        y: 0,
                        transition: { delay: i * 0.05, duration: 0.2 },
                      }),
                      exit: { opacity: 0, y: -10 },
                    }}
                    className="table-row-hover"
                  >
                    <TableCell>{subject.nombre}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {gradoToTexto(subject.grado)}
                      </span>
                    </TableCell>
                    <TableCell>{subject.alumnos ?? 0}</TableCell>
                    <TableCell>{subject.promedio !== null && subject.promedio !== undefined ? `${subject.promedio} %` : "-"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedSubject(subject)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            Editar asignatura
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedSubject(subject)
                              setIsDeleteDialogOpen(true)
                            }}
                            className="text-danger"
                          >
                            Eliminar asignatura
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
                      No se encontraron asignaturas.
                    </motion.div>
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      {filteredSubjects.length > 0 && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium">{indexOfFirstSubject + 1}</span> a {" "}
            <span className="font-medium">{Math.min(indexOfLastSubject, filteredSubjects.length)}</span> de {" "}
            <span className="font-medium">{filteredSubjects.length}</span> asignaturas
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="focus-visible-ring"
              aria-label="Página anterior"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
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
                      onClick={() => setCurrentPage(pageNum)}
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
      {/* Add Subject Dialog */}
      <AddSubjectDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSubmit={handleAddSubject} />
      {/* Edit Subject Dialog */}
      {selectedSubject && (
        <EditSubjectDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          subject={selectedSubject}
          onSubmit={handleEditSubject}
        />
      )}
      {/* Delete Subject Dialog */}
      {selectedSubject && (
        <DeleteSubjectDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          subject={selectedSubject}
          onDelete={() => handleDeleteSubject(selectedSubject.id)}
        />
      )}
    </div>
  )
}
