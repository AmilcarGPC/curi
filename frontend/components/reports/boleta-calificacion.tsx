"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { Printer, Download, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { config } from "@/lib/config"

// Sample student data
const periodos = [
  { value: "1", label: "1er Trimestre" },
  { value: "2", label: "2do Trimestre" },
  { value: "3", label: "3er Trimestre" },
  { value: "final", label: "Final del Curso" },
]

// Utilidad para obtener el dominio y color según la calificación
function getDominio(score) {
  if (typeof score !== "number") return { label: "En espera", color: "gray" }
  if (score >= 90) return { label: "Sobresaliente", color: "green" }
  if (score >= 80) return { label: "Satisfactorio", color: "blue" }
  if (score >= 60) return { label: "Suficiente", color: "yellow" }
  return { label: "No acreditado", color: "red" }
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

function PeriodoHeader({ selectedPeriodo }: { selectedPeriodo: string }) {
  const periodoLabel = periodos.find((p) => p.value === selectedPeriodo)?.label || "Periodo"
  return (
    <div className="text-right">
      <p className="font-medium">Boleta de Calificación</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={selectedPeriodo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="text-sm text-muted-foreground"
        >
          {periodoLabel}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

function DesempenoAcademico({
  selectedPeriodo,
  grades,
  subjects,
  getDominio,
  getPeriodoPromedio,
  getPromedioFinal,
}: any) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedPeriodo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Desempeño Académico</h3>
          {selectedPeriodo !== "final" ? (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Asignatura</th>
                    <th className="py-2 px-4 text-center">Dominio</th>
                    <th className="py-2 px-4 text-center">Calificación</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject: any) => {
                    const score = grades[selectedPeriodo]?.[subject.id]
                    const dominio = getDominio(score)
                    return (
                      <tr key={subject.id} className="border-b">
                        <td className="py-3 px-4">{subject.name}</td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block font-semibold px-3 py-1 rounded-full bg-opacity-20 grade-${dominio.color}`}
                            style={{
                              backgroundColor:
                                dominio.color === "green"
                                  ? "#22c55e33"
                                  : dominio.color === "blue"
                                  ? "#3b82f633"
                                  : dominio.color === "yellow"
                                  ? "#eab30833"
                                  : dominio.color === "red"
                                  ? "#ef444433"
                                  : "#d1d5db",
                              color:
                                dominio.color === "green"
                                  ? "#15803d"
                                  : dominio.color === "blue"
                                  ? "#1d4ed8"
                                  : dominio.color === "yellow"
                                  ? "#b45309"
                                  : dominio.color === "red"
                                  ? "#b91c1c"
                                  : "#6b7280",
                            }}
                          >
                            {dominio.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">{typeof score === "number" ? score : "—"}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="mt-4 text-right">
                <span className="font-semibold">Promedio del periodo: </span>
                {getPeriodoPromedio(selectedPeriodo) ?? "—"}
              </div>
            </>
          ) : (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Asignatura</th>
                    <th className="py-2 px-4 text-center">1er Trim.</th>
                    <th className="py-2 px-4 text-center">2do Trim.</th>
                    <th className="py-2 px-4 text-center">3er Trim.</th>
                    <th className="py-2 px-4 text-center">Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject: any) => {
                    const s1 = grades["1"]?.[subject.id]
                    const s2 = grades["2"]?.[subject.id]
                    const s3 = grades["3"]?.[subject.id]
                    const califs = [s1, s2, s3].filter((v) => typeof v === "number")
                    const prom = califs.length ? Math.round(califs.reduce((a, b) => a + b, 0) / califs.length) : null
                    return (
                      <tr key={subject.id} className="border-b">
                        <td className="py-3 px-4">{subject.name}</td>
                        <td className="py-3 px-4 text-center">{typeof s1 === "number" ? s1 : "—"}</td>
                        <td className="py-3 px-4 text-center">{typeof s2 === "number" ? s2 : "—"}</td>
                        <td className="py-3 px-4 text-center">{typeof s3 === "number" ? s3 : "—"}</td>
                        <td className="py-3 px-4 text-center">{prom ?? "—"}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="mt-4 text-right">
                <span className="font-semibold">Promedio final del curso: </span>
                {getPromedioFinal() ?? "—"}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export function BoletaCalificacion() {
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>("1")
  const [boleta, setBoleta] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Fetch students for select
  const [students, setStudents] = useState<any[]>([])
  useEffect(() => {
    setLoading(true)
    fetch(`${config.apiUrl}/alumnos`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error al cargar los alumnos:", error)
        setLoading(false)
      })
  }, [])

  // Fetch boleta when student or periodo changes
  useEffect(() => {
    if (selectedStudent && selectedPeriodo) {
      setLoading(true)
      fetch(`${config.apiUrl}/reportes/boleta/${selectedStudent}?periodo=${selectedPeriodo}`)
        .then((res) => res.json())
        .then((data) => {
          setBoleta(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error al cargar el reporte:", error)
          setLoading(false)
        })
    }
  }, [selectedStudent, selectedPeriodo])

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

  // Calcular promedio del periodo
  function getPeriodoPromedio(periodo: string) {
    const califs = Object.values(boleta?.calificaciones?.[periodo] || {}).filter((v) => typeof v === "number")
    if (!califs.length) return null
    return Math.round(califs.reduce((a, b) => a + b, 0) / califs.length)
  }

  // Calcular promedio final del curso
  function getPromedioFinal() {
    let sum = 0, count = 0
    for (const p of ["1", "2", "3"]) {
      const prom = getPeriodoPromedio(p)
      if (prom !== null) { sum += prom; count++ }
    }
    return count ? Math.round(sum / count) : null
  }

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
                  {student.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPeriodo} onValueChange={setSelectedPeriodo}>
            <SelectTrigger className="w-[180px] focus-visible-ring">
              <SelectValue placeholder="Selecciona periodo" />
            </SelectTrigger>
            <SelectContent>
              {periodos.map((p) => (
                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
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
        <div className="w-full max-w-3xl perspective-1000 report-card">
          {loading ? (
            <div className="report-card-content flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground">Cargando boleta...</p>
            </div>
          ) : boleta ? (
            currentPage === 0 ? (
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
                  <PeriodoHeader selectedPeriodo={selectedPeriodo} />
                </div>
                <div className="report-card-body">
                  <div className="mb-6 p-4 bg-muted/30 rounded-md">
                    <h3 className="text-lg font-semibold mb-2">Información del Estudiante</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Nombre</p>
                        <p className="font-medium">{boleta.alumno?.nombre}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Grado</p>
                        <p className="font-medium">{gradoToTexto(boleta.alumno?.grado)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Matrícula</p>
                        <p className="font-medium">{boleta.alumno?.matricula}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Correo</p>
                        <p className="font-medium">{boleta.alumno?.correo}</p>
                      </div>
                    </div>
                  </div>
                  <DesempenoAcademico
                    selectedPeriodo={selectedPeriodo}
                    grades={boleta.calificaciones}
                    subjects={boleta.asignaturas}
                    getDominio={getDominio}
                    getPeriodoPromedio={getPeriodoPromedio}
                    getPromedioFinal={getPromedioFinal}
                  />
                </div>
              </div>
            ) : (
              <div className="report-card-content">
                <div className="report-card-header">
                  <h2 className="text-xl font-bold">Observaciones</h2>
                </div>
                <div className="report-card-body flex flex-col items-center justify-center min-h-[300px]">
                  <div className="text-center text-muted-foreground">
                    <p className="text-lg font-semibold mb-2">Sin observaciones adicionales</p>
                    <p className="text-sm">No se han registrado comentarios, áreas de mejora ni firmas para este periodo.</p>
                    <div className="mt-6 text-5xl">📝</div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="report-card-content flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground">No se pudo cargar la boleta.</p>
            </div>
          )}
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
