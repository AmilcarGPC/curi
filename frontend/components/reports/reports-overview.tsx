"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { Download, FileText, Printer } from "lucide-react"

// Sample data for charts
const gradeDistribution = [
  { name: "A", value: 35 },
  { name: "B", value: 40 },
  { name: "C", value: 15 },
  { name: "D", value: 7 },
  { name: "F", value: 3 },
]

const subjectPerformance = [
  {
    name: "Math",
    current: 82,
    previous: 78,
  },
  {
    name: "Science",
    current: 78,
    previous: 75,
  },
  {
    name: "English",
    current: 85,
    previous: 82,
  },
  {
    name: "History",
    current: 76,
    previous: 74,
  },
  {
    name: "Art",
    current: 90,
    previous: 88,
  },
  {
    name: "Music",
    current: 88,
    previous: 85,
  },
  {
    name: "P.E.",
    current: 92,
    previous: 90,
  },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function ReportsOverview() {
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("semester")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona Grado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Grados</SelectItem>
              <SelectItem value="1">1er Grado</SelectItem>
              <SelectItem value="2">2do Grado</SelectItem>
              <SelectItem value="3">3er Grado</SelectItem>
              <SelectItem value="4">4to Grado</SelectItem>
              <SelectItem value="5">5to Grado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">Semestre Actual</SelectItem>
              <SelectItem value="year">Ciclo Escolar</SelectItem>
              <SelectItem value="quarter">Último Trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Generar Reporte
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="grades">Calificaciones</TabsTrigger>
          <TabsTrigger value="subjects">Asignaturas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Calificaciones</CardTitle>
                <CardDescription>Distribución general de calificaciones para todos los alumnos</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle>Desempeño por Asignatura</CardTitle>
                <CardDescription>Comparación entre periodos actual y anterior</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" name="Periodo Actual" fill="#8884d8" />
                    <Bar dataKey="previous" name="Periodo Anterior" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grades">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Calificaciones</CardTitle>
              <CardDescription>Desglose detallado de calificaciones por asignatura y tipo de evaluación</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Selecciona los filtros específicos arriba para ver el análisis detallado de calificaciones
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Asignaturas</CardTitle>
              <CardDescription>Métricas de desempeño por asignatura</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Selecciona los filtros específicos arriba para ver el análisis detallado de asignaturas
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
