"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Search, AlertCircle, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

export function AlumnosRegularidad() {
  const [periodo, setPeriodo] = useState("1")
  const [alumnos, setAlumnos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedGrades, setExpandedGrades] = useState<string[]>(["1er Grado"])

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:5000/api/reportes/alumnos-regularidad?periodo=${periodo}`)
      .then((res) => res.json())
      .then(setAlumnos)
      .catch(() => setAlumnos([]))
      .finally(() => setLoading(false))
  }, [periodo])

  // Obtener los grados disponibles
  const gradesList = Array.from(new Set(alumnos.map((a) => a.grado))).sort()

  // Agrupar alumnos por grado y regularidad
  const studentsByGrade: Record<string, { regular: any[]; irregular: any[] }> = {}
  for (const grado of gradesList) {
    const gradoTxt = gradoToTexto(grado)
    studentsByGrade[gradoTxt] = { regular: [], irregular: [] }
    alumnos
      .filter((a) => a.grado === grado)
      .forEach((a) => {
        if (a.regular) studentsByGrade[gradoTxt].regular.push(a)
        else studentsByGrade[gradoTxt].irregular.push(a)
      })
  }

  // Get all grades or filter by selected grade
  const getGradesToDisplay = () => {
    if (selectedGrade === "all") {
      return Object.keys(studentsByGrade)
    } else {
      return [selectedGrade]
    }
  }

  // Filter students by search term
  const filterStudents = (students: any[]) => {
    if (!searchTerm) return students
    return students.filter(
      (student) =>
        student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // Toggle expanded grade
  const toggleGrade = (grade: string) => {
    setExpandedGrades((prev) => (prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]))
  }

  // Get summary counts
  const getSummary = () => {
    let regularCount = 0
    let irregularCount = 0

    Object.values(studentsByGrade).forEach((gradeData) => {
      regularCount += gradeData.regular.length
      irregularCount += gradeData.irregular.length
    })

    return { regularCount, irregularCount, total: regularCount + irregularCount }
  }

  const summary = getSummary()
  const gradesToDisplay = getGradesToDisplay()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-[180px] focus-visible-ring">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Grados</SelectItem>
              {gradesList.map((grado) => (
                <SelectItem key={grado} value={gradoToTexto(grado)}>
                  {gradoToTexto(grado)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar alumnos..."
              className="pl-8 focus-visible-ring"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar alumnos"
            />
          </div>
        </div>

        <Button variant="outline" size="sm" className="focus-visible-ring">
          <Download className="mr-2 h-4 w-4" />
          Exportar Lista
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-3"
        >
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Regularidad de Alumnos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success bg-opacity-20">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alumnos Regulares</p>
                    <p className="text-2xl font-bold">{summary.regularCount}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((summary.regularCount / summary.total) * 100)}% del total
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full  bg-opacity-20">
                    <AlertCircle className="h-6 w-6 text-danger" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alumnos Irregulares</p>
                    <p className="text-2xl font-bold">{summary.irregularCount}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((summary.irregularCount / summary.total) * 100)}% del total
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary bg-opacity-20">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Alumnos</p>
                    <p className="text-2xl font-bold">{summary.total}</p>
                    <p className="text-xs text-muted-foreground">En todos los grados</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {gradesToDisplay.map((grade, index) => (
            <motion.div
              key={grade}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Accordion
                type="single"
                collapsible
                value={expandedGrades.includes(grade) ? grade : undefined}
                onValueChange={(value) => {
                  if (value) {
                    setExpandedGrades((prev) => [...prev, grade])
                  } else {
                    setExpandedGrades((prev) => prev.filter((g) => g !== grade))
                  }
                }}
              >
                <AccordionItem value={grade} className="border rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 focus-visible-ring">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{grade}</span>
                      <div className="flex gap-2">
                        <span
                          className="badge-regular"
                          style={{
                            backgroundColor: '#22c55e33', // verde suave
                            color: '#15803d', // verde fuerte
                            borderRadius: '9999px',
                            padding: '0.25rem 0.75rem',
                            fontWeight: 500,
                            fontSize: '0.875rem', // igual que Irregular
                            fontFamily: 'inherit', // igual que Irregular
                            letterSpacing: 'normal', // igual que Irregular
                            lineHeight: '1.25rem', // igual que Irregular
                            display: 'inline-block',
                          }}
                        >
                          Regular: {studentsByGrade[grade as keyof typeof studentsByGrade].regular.length}
                        </span>
                        <span className="badge-irregular">
                          Irregular: {studentsByGrade[grade as keyof typeof studentsByGrade].irregular.length}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-4 py-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        Alumnos Regulares
                      </h4>
                      <div className="space-y-2 mb-4">
                        {filterStudents(studentsByGrade[grade as keyof typeof studentsByGrade].regular).length > 0 ? (
                          filterStudents(studentsByGrade[grade as keyof typeof studentsByGrade].regular).map(
                            (student) => (
                              <motion.div
                                key={student.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{student.nombre}</span>
                                  <span className="text-xs text-muted-foreground">({student.matricula || student.id})</span>
                                </div>
                              </motion.div>
                            ),
                          )
                        ) : (
                          <p className="text-sm text-muted-foreground py-2">No se encontraron alumnos regulares.</p>
                        )}
                      </div>

                      <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-danger" />
                        Alumnos Irregulares
                      </h4>
                      <div className="space-y-2">
                        {filterStudents(studentsByGrade[grade as keyof typeof studentsByGrade].irregular).length > 0 ? (
                          filterStudents(studentsByGrade[grade as keyof typeof studentsByGrade].irregular).map(
                            (student) => (
                              <motion.div
                                key={student.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-between p-2 rounded-md  bg-opacity-5 hover: hover:bg-opacity-10"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{student.nombre}</span>
                                  <span className="text-xs text-muted-foreground">({student.matricula || student.id})</span>
                                </div>
                              </motion.div>
                            ),
                          )
                        ) : (
                          <p className="text-sm text-muted-foreground py-2">No se encontraron alumnos irregulares.</p>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}