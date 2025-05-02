"use client"

import { useEffect, useState } from "react"
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
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, PlusCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AddGradeDialog } from "./add-grade-dialog"
import { EditGradeDialog } from "./edit-grade-dialog"
import { DeleteGradeDialog } from "./delete-grade-dialog"
import { useToast } from "@/hooks/use-toast"
import { Pencil, Trash2, BookPlus } from "lucide-react"
import { config } from "@/lib/config"

const periodos = [
  { value: 1, label: "1er Trimestre" },
  { value: 2, label: "2do Trimestre" },
  { value: 3, label: "3er Trimestre" },
]

export function GradesTable() {
  const [grades, setGrades] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState<any | null>(null)
  const [alumnos, setAlumnos] = useState<{ id: string, nombre: string }[]>([])
  const [asignaturas, setAsignaturas] = useState<{ id: string, nombre: string }[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchGrades()
  }, [currentPage, pageSize])

  const fetchGrades = () => {
    setLoading(true)
    fetch(`${config.apiUrl}/calificaciones?page=${currentPage}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then((data) => {
        // Asegurarse de que data.items sea siempre un array
        setGrades(Array.isArray(data?.items) ? data.items : []);
        setTotal(data?.total || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar las calificaciones:", error);
        // En caso de error, establecer un array vacío
        setGrades([]);
        setTotal(0);
        setLoading(false);
      });
  }

  useEffect(() => {
    // Cargar alumnos
    fetch(`${config.apiUrl}/alumnos`)
      .then((response) => response.json())
      .then((data) => setAlumnos(Array.isArray(data) ? data.map((a: any) => ({ id: a.id, nombre: a.nombre })) : []))
      .catch((error) => console.error("Error al cargar los alumnos:", error))

    // Cargar asignaturas
    fetch(`${config.apiUrl}/asignaturas`)
      .then((response) => response.json())
      .then((data) => setAsignaturas(Array.isArray(data) ? data.map((a: any) => ({ id: a.id, nombre: a.nombre })) : []))
      .catch((error) => console.error("Error al cargar las asignaturas:", error))
  }, [])

  // Refetch grades helper con mejor manejo de errores
  const refreshGrades = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/calificaciones?page=${currentPage}&pageSize=${pageSize}`)
      const data = await res.json()
      // Asegurarse de que data.items sea siempre un array
      setGrades(Array.isArray(data?.items) ? data.items : [])
      setTotal(data?.total || 0)
    } catch (error) {
      console.error("Error al actualizar las calificaciones:", error)
      // En caso de error, establecer un array vacío
      setGrades([])
      setTotal(0)
    }
  }

  // CRUD handlers
  const handleAddGrade = async (newGrade: any) => {
    setLoading(true)
    try {
      const res = await fetch(`${config.apiUrl}/calificaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGrade),
      })
      // Refetch para asegurar nombres correctos
      await refreshGrades()
      setIsAddDialogOpen(false)
      toast({ title: "Calificación agregada", description: `La calificación fue agregada exitosamente.`, variant: "success" })
    } catch (error) {
      console.error("Error al agregar la calificación:", error)
      toast({ title: "Error", description: "No se pudo agregar la calificación.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleEditGrade = async (updated: { calificacion: number }) => {
    setLoading(true)
    try {
      // Usar los IDs reales para alumno_id y asignatura_id
      const alumno_id = selectedGrade.alumno_id || alumnos.find(a => a.nombre === selectedGrade.alumno)?.id
      const asignatura_id = selectedGrade.asignatura_id || asignaturas.find(a => a.nombre === selectedGrade.asignatura)?.id
      const body = {
        alumno_id,
        asignatura_id,
        periodo: selectedGrade.periodo,
        calificacion: updated.calificacion,
      }
      const res = await fetch(`${config.apiUrl}/calificaciones/${selectedGrade.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("Error en backend")
      await refreshGrades()
      setIsEditDialogOpen(false)
      setSelectedGrade(null)
      toast({ title: "Calificación actualizada", description: `La calificación fue actualizada exitosamente.`, variant: "success" })
    } catch (error) {
      console.error("Error al actualizar la calificación:", error)
      toast({ title: "Error", description: "No se pudo actualizar la calificación.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteGrade = async (id: string) => {
    setLoading(true)
    try {
      await fetch(`${config.apiUrl}/calificaciones/${id}`, { method: "DELETE" })
      await refreshGrades()
      setIsDeleteDialogOpen(false)
      setSelectedGrade(null)
      toast({ title: "Calificación eliminada", description: `La calificación fue eliminada exitosamente.`, variant: "success" })
    } catch (error) {
      console.error("Error al eliminar la calificación:", error)
      toast({ title: "Error", description: "No se pudo eliminar la calificación.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  // Asegurarse de que grades siempre sea un array antes de filtrar
  const filteredGrades = (grades || []).filter(
    (grade) =>
      (grade?.alumno?.toLowerCase?.().includes(searchTerm.toLowerCase()) || "") ||
      (grade?.asignatura?.toLowerCase?.().includes(searchTerm.toLowerCase()) || "") ||
      String(grade?.calificacion || "").includes(searchTerm)
  )
  const indexOfLastGrade = currentPage * pageSize
  const indexOfFirstGrade = indexOfLastGrade - pageSize
  const currentGrades = filteredGrades.slice(indexOfFirstGrade, indexOfLastGrade)
  const totalPages = Math.ceil(filteredGrades.length / pageSize)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar calificaciones..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <BookPlus className="mr-2 h-4 w-4" />
          Agregar Calificación
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Alumno</TableHead>
              <TableHead>Asignatura</TableHead>
              <TableHead>Calificación</TableHead>
              <TableHead>Periodo</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence initial={false} mode="wait">
              {currentGrades.length > 0 ? (
                currentGrades.map((grade, index) => (
                  <motion.tr
                    key={grade.id}
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
                    <TableCell>{grade.alumno || grade.alumno_id}</TableCell>
                    <TableCell>{grade.asignatura || grade.asignatura_id}</TableCell>
                    <TableCell>{grade.calificacion} %</TableCell>
                    <TableCell>{periodos.find((p) => p.value === grade.periodo)?.label || grade.periodo}</TableCell>
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
                              setSelectedGrade(grade)
                              setIsEditDialogOpen(true)
                            }}
                            className="flex items-center cursor-pointer focus-visible-ring"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar calificación
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedGrade(grade)
                              setIsDeleteDialogOpen(true)
                            }}
                            className="flex items-center text-danger cursor-pointer focus-visible-ring"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar calificación
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
                      No se encontraron calificaciones.
                    </motion.div>
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Mostrando <span className="font-medium">{filteredGrades.length === 0 ? 0 : indexOfFirstGrade + 1}</span> a {" "}
          <span className="font-medium">{Math.min(indexOfLastGrade, filteredGrades.length)}</span> de {" "}
          <span className="font-medium">{filteredGrades.length}</span> calificaciones
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
            disabled={currentPage === totalPages || totalPages === 0}
            className="focus-visible-ring"
            aria-label="Página siguiente"
          >
            Siguiente
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Add Grade Dialog */}
      <AddGradeDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSubmit={handleAddGrade} alumnos={alumnos} asignaturas={asignaturas} />
      {/* Edit Grade Dialog */}
      {selectedGrade && (
        <EditGradeDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          grade={selectedGrade}
          onSubmit={handleEditGrade}
          alumnos={alumnos}
          asignaturas={asignaturas}
        />
      )}
      {/* Delete Grade Dialog */}
      {selectedGrade && (
        <DeleteGradeDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          grade={selectedGrade}
          onDelete={() => handleDeleteGrade(selectedGrade.id)}
        />
      )}
    </div>
  )
}
