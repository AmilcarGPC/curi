"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { config } from "@/lib/config"

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

export function PromediosAsignatura() {
  const [periodo, setPeriodo] = useState("1")
  const [grado, setGrado] = useState("all")
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showComparativa, setShowComparativa] = useState(false)

  useEffect(() => {
    if (periodo && grado) {
      setLoading(true)
      const url = `${config.apiUrl}/reportes/promedios-asignatura?periodo=${periodo}&grado=${grado}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data.filter(d => grado === "all" || String(d.grado) === String(grado)))
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error al cargar las asignaturas:", error)
          setData([])
          setLoading(false)
        })
    }
  }, [periodo, grado])

  const filteredData = data

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={grado} onValueChange={setGrado}>
            <SelectTrigger className="w-[180px] focus-visible-ring">
              <SelectValue placeholder="Selecciona Grado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Grados</SelectItem>
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <SelectItem key={g} value={String(g)}>
                  {gradoToTexto(g)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="w-[180px] focus-visible-ring">
                <SelectValue placeholder="Selecciona Trimestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1er Trimestre</SelectItem>
                <SelectItem value="2">2do Trimestre</SelectItem>
                <SelectItem value="3">3er Trimestre</SelectItem>
              </SelectContent>
            </Select>
            {Number(periodo) > 1 && (
              <Button
                variant={showComparativa ? "default" : "outline"}
                size="sm"
                className="focus-visible-ring"
                onClick={() => setShowComparativa((v) => !v)}
              >
                {showComparativa ? "Ocultar comparativa" : "Ver comparativa"}
              </Button>
            )}
          </div>
        </div>
        <Button variant="outline" size="sm" className="focus-visible-ring">
          <Download className="mr-2 h-4 w-4" />
          Exportar Datos
        </Button>
      </div>

      {loading ? (
        <div className="text-center">Cargando datos...</div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Promedios por Asignatura ({periodo}er Trimestre)</CardTitle>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="nombre" 
                      angle={-45} 
                      textAnchor="end" 
                      height={70} 
                      tick={{ fontSize: 12, width: 80, wordBreak: 'break-all' }}
                      tickFormatter={(value: string) => value.length > 14 ? value.slice(0, 12) + '…' : value}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value, name) => [`${value}%`, name === 'previo' ? 'Trimestre anterior' : 'Promedio']} labelStyle={{ fontWeight: "bold" }} />
                    <Legend />
                    {showComparativa && Number(periodo) > 1 && (
                      <Bar
                        dataKey="previo"
                        name="Trimestre anterior"
                        fill="#d1d5db"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      />
                    )}
                    <Bar
                      dataKey="promedio"
                      name="Promedio Actual"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

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
                {filteredData
                  .sort((a, b) => b.promedio - a.promedio)
                  .slice(0, 3)
                  .map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          {index + 1}
                        </div>
                        <span className="font-medium">{subject.nombre}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{gradoToTexto(subject.grado)}</span>
                      </div>
                      <span className="text-lg font-bold">{subject.promedio}%</span>
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
                {filteredData
                  .sort((a, b) => a.promedio - b.promedio)
                  .slice(0, 3)
                  .map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-danger/10 text-danger">
                          {index + 1}
                        </div>
                        <span className="font-medium">{subject.nombre}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{gradoToTexto(subject.grado)}</span>
                      </div>
                      <span className="text-lg font-bold">{subject.promedio}%</span>
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
