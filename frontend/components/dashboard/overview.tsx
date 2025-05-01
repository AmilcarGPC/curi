"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Sample data for the chart
const data = [
  {
    name: "Math",
    average: 85,
  },
  {
    name: "Science",
    average: 78,
  },
  {
    name: "English",
    average: 82,
  },
  {
    name: "History",
    average: 76,
  },
  {
    name: "Art",
    average: 90,
  },
  {
    name: "Music",
    average: 88,
  },
  {
    name: "P.E.",
    average: 92,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="average" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
