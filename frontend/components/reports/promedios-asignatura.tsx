"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data for subject averages
const subjectAverages = [
  {
    name: "Matemáticas",
    average: 85,
    previousAverage: 82,
  },
  {
    name: "Ciencias",
    average: 78,
    previousAverage: 75,
  },
  {
    name: "Inglés",
    average: 82,
    previousAverage: 80,
  },
  {
    name: "Historia",
    average: 76,
    previousAverage: 74,
  },
  {
    name: "Arte",
    average: 90,
    previousAverage: 88,
  },
  {
    name: "Música",
    average: 88,
    previousAverage: 85,
  },
  {
    name: "Educación Física",
    average: 92,
    previousAverage: 90,
  },
]

// Sample data for grade-level averages
const gradeLevelAverages = {
  "1er Grado": [
    { name: "Matemáticas", average: 83 },
    { name: "Ciencias", average: 80 },
    { name: "Inglés", average: 85 },
    { name: "Historia", average: 78 },
    { name: "Arte", average: 92 },
    { name: "Música", average: 90 },
    { name: "Educación Física", average: 94 },
  ],
  "2do Grado": [
    { name: "Matemáticas", average: 84 },
    { name: "Ciencias", average: 79 },
    { name: "Inglés", average: 83 },
    { name: "Historia", average: 77 },
    { name: "Arte", average: 91 },
    { name: "Música", average: 89 },
    { name: "Educación Física", average: 93 },
  ],
  "3er Grado": [
    { name: "Matemáticas", average: 85 },
    { name: "Ciencias", average: 78 },
    { name: "Inglés", average: 82 },
    { name: "Historia", average: 76 },
    { name: "Arte", average: 90 },
    { name: "Música", average: 88 },
    { name: "Educación Física", average: 92 },
  ],
  "4to Grado": [
    { name: "Matemáticas", average: 86 },
    { name: "Ciencias", average: 80 },
    { name: "Inglés", average: 84 },
    { name: "Historia", average: 79 },
    { name: "Arte", average: 88 },
    { name: "Música", average: 87 },
    { name: "Educación Física", average: 91 },
  ],
  "5to Grado": [
    { name: "Matemáticas", average: 87 },
    { name: "Ciencias", average: 81 },
    { name: "Inglés", average: 85 },
    { name: "Historia", average: 80 },
    { name: "Arte", average: 89 },
    { name: "Música", average: 86 },
    { name: "Educación Física", average: 90 },
  ],
}

export function PromediosAsignatura() {
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [chartType, setChartType] = useState<"bar" | "comparison">("bar")

  // Get data based on selected grade
  const getChartData = () => {
    if (selectedGrade === "all") {
      return subjectAverages
    } else {
      return gradeLevelAverages[selectedGrade as keyof typeof gradeLevelAverages]
    }
  }

  const chartData = getChartData()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-[180px] focus-visible-ring">
              <SelectValue placeholder="Selecciona Grado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Grados</SelectItem>
              <SelectItem value="1er Grado">1er Grado</SelectItem>
              <SelectItem value="2do Grado">2do Grado</SelectItem>
              <SelectItem value="3er Grado">3er Grado</SelectItem>
              <SelectItem value="4to Grado">4to Grado</SelectItem>
              <SelectItem value="5to Grado">5to Grado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px] focus-visible-ring">
              <SelectValue placeholder="Selecciona Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Semestre Actual</SelectItem>
              <SelectItem value="previous">Semestre Anterior</SelectItem>
              <SelectItem value="year">Ciclo Escolar</SelectItem>
            </SelectContent>
          </Select>

          <Select value={chartType} onValueChange={(value) => setChartType(value as "bar" | "comparison")}>
            <SelectTrigger className="w-[180px] focus-visible-ring">
              <SelectValue placeholder="Tipo de Gráfica" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Gráfica de Barras</SelectItem>
              <SelectItem value="comparison">Gráfica Comparativa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm" className="focus-visible-ring">
          <Download className="mr-2 h-4 w-4" />
          Exportar Datos
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">
              {selectedGrade === "all" ? "Todos los Grados" : selectedGrade} - Promedios por Asignatura
            </CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Promedio"]} labelStyle={{ fontWeight: "bold" }} />
                  <Legend />
                  <Bar
                    dataKey="average"
                    name="Promedio Actual"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  {chartType === "comparison" && selectedGrade === "all" && (
                    <Bar
                      dataKey="previousAverage"
                      name="Promedio Anterior"
                      fill="hsl(var(--secondary))"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Asignaturas con Mejor Desempeño</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chartData
                  .sort((a, b) => b.average - a.average)
                  .slice(0, 3)
                  .map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          {index + 1}
                        </div>
                        <span className="font-medium">{subject.name}</span>
                      </div>
                      <span className="text-lg font-bold">{subject.average}%</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Áreas de Mejora</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chartData
                  .sort((a, b) => a.average - b.average)
                  .slice(0, 3)
                  .map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-danger/10 text-danger">
                          {index + 1}
                        </div>
                        <span className="font-medium">{subject.name}</span>
                      </div>
                      <span className="text-lg font-bold">{subject.average}%</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
