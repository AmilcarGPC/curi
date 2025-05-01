"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { Printer, Download, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Sample student data
const students = [
  { id: "STU001", name: "Alex Chen", grade: "3er Grado" },
  { id: "STU002", name: "Emma Wilson", grade: "4to Grado" },
  { id: "STU003", name: "Olivia Martinez", grade: "2do Grado" },
]

// Sample subject data
const subjects = [
  { id: "SUB001", name: "Matemáticas", grade: "A", score: 92 },
  { id: "SUB002", name: "Ciencias", grade: "B+", score: 88 },
  { id: "SUB003", name: "Inglés", grade: "A-", score: 90 },
  { id: "SUB004", name: "Historia", grade: "B", score: 85 },
  { id: "SUB005", name: "Arte", grade: "A+", score: 98 },
  { id: "SUB006", name: "Educación Física", grade: "A", score: 95 },
]

export function BoletaCalificacion() {
  const [selectedStudent, setSelectedStudent] = useState<string>("STU001")
  const [isFlipping, setIsFlipping] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = 2

  const handlePageChange = (direction: "next" | "prev") => {
    setIsFlipping(true)
    setTimeout(() => {
      if (direction === "next") {
        setCurrentPage((prev) => (prev + 1) % totalPages)
      } else {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
      }
      setIsFlipping(false)
    }, 300)
  }

  const student = students.find((s) => s.id === selectedStudent)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger className="w-[200px] focus-visible-ring">
              <SelectValue placeholder="Selecciona estudiante" />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="focus-visible-ring">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm" className="focus-visible-ring">
            <Download className="mr-2 h-4 w-4" />
            Descargar PDF
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-3xl perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ rotateY: isFlipping ? -90 : 0, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="report-card"
            >
              {currentPage === 0 ? (
                <div className="report-card-content">
                  <div className="report-card-header flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        alt="School Logo"
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <div>
                        <h2 className="text-2xl font-bold">Primaria</h2>
                        <p className="text-sm text-muted-foreground">Ciclo Escolar 2023-2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Boleta de Calificación</p>
                      <p className="text-sm text-muted-foreground">Primer Semestre</p>
                    </div>
                  </div>

                  <div className="report-card-body">
                    <div className="mb-6 p-4 bg-muted/30 rounded-md">
                      <h3 className="text-lg font-semibold mb-2">Información del Estudiante</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Nombre</p>
                          <p className="font-medium">{student?.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Grado</p>
                          <p className="font-medium">{student?.grade}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Matrícula</p>
                          <p className="font-medium">{student?.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Periodo</p>
                          <p className="font-medium">Enero - Junio 2023</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">Desempeño Académico</h3>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 px-4 text-left">Asignatura</th>
                            <th className="py-2 px-4 text-center">Calificación</th>
                            <th className="py-2 px-4 text-center">Puntaje</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subjects.map((subject) => (
                            <tr key={subject.id} className="border-b">
                              <td className="py-3 px-4">{subject.name}</td>
                              <td className="py-3 px-4 text-center">
                                <span className={`report-card-grade grade-${subject.grade.charAt(0).toLowerCase()}`}>
                                  {subject.grade}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">{subject.score}/100</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="report-card-content">
                  <div className="report-card-header">
                    <h2 className="text-xl font-bold">Comentarios y Asistencia</h2>
                  </div>

                  <div className="report-card-body">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Comentarios del Docente</h3>
                      <div className="p-4 border rounded-md">
                        <p className="italic">
                          {student?.name} ha mostrado un excelente progreso este semestre. Su participación en las discusiones de clase ha sido sobresaliente y demuestra constantemente una gran ética de trabajo. Continúa enfocándote en la gestión del tiempo para las tareas.
                        </p>
                        <div className="mt-4 text-right">
                          <p className="font-medium">Mtra. Johnson</p>
                          <p className="text-sm text-muted-foreground">Docente Titular</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Resumen de Asistencia</h3>
                      <div className="grid grid-cols-2 gap-4 p-4 border rounded-md">
                        <div>
                          <p className="text-sm text-muted-foreground">Días Escolares</p>
                          <p className="font-medium">92</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Asistencias</p>
                          <p className="font-medium">89 (97%)</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Faltas</p>
                          <p className="font-medium">3 (3%)</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Retardos</p>
                          <p className="font-medium">2</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Áreas de Mejora</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Seguir desarrollando habilidades de pensamiento crítico</li>
                        <li>Practicar la gestión del tiempo para proyectos a largo plazo</li>
                        <li>Participar más activamente en discusiones grupales</li>
                      </ul>
                    </div>

                    <div className="mt-8 pt-4 border-t">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Firma del Padre/Madre o Tutor</p>
                          <div className="mt-2 h-8 w-40 border-b"></div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fecha</p>
                          <div className="mt-2 h-8 w-40 border-b"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange("prev")}
          disabled={isFlipping}
          className="focus-visible-ring"
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i ? "default" : "outline"}
              size="icon"
              className="h-8 w-8 focus-visible-ring"
              onClick={() => {
                setIsFlipping(true)
                setTimeout(() => {
                  setCurrentPage(i)
                  setIsFlipping(false)
                }, 300)
              }}
              disabled={isFlipping}
              aria-label={`Página ${i + 1}`}
              aria-current={currentPage === i ? "page" : undefined}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange("next")}
          disabled={isFlipping}
          className="focus-visible-ring"
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
