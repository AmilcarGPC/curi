"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
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
      return grado.toString()
  }
}

export function Overview() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${config.apiUrl}/asignaturas/resumen`)
      .then((res) => res.json())
      .then((asignaturas) => {
        setData(
          (asignaturas || []).map((a: any) => ({
            name: a.nombre,
            grado: gradoToTexto(a.grado),
            promedio: a.promedio ?? 0,
          }))
        )
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis domain={[0, 100]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip formatter={(value: any) => `${value}/100`} labelFormatter={(label: any, payload: any) => {
          const item = payload && payload[0] && payload[0].payload
          return item ? `${item.name} (${item.grado})` : label
        }} />
        <Bar dataKey="promedio" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
