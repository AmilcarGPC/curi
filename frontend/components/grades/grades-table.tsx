"use client"

import { useState } from "react"
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

// Sample data for grades
const grades = [
  {
    id: "GRD001",
    student: "Alex Chen",
    subject: "Mathematics",
    grade: "A",
    score: "92/100",
    type: "Quiz",
    date: "2023-05-10",
  },
  {
    id: "GRD002",
    student: "Emma Wilson",
    subject: "Science",
    grade: "B+",
    score: "88/100",
    type: "Test",
    date: "2023-05-12",
  },
  {
    id: "GRD003",
    student: "Olivia Martinez",
    subject: "English",
    grade: "A-",
    score: "90/100",
    type: "Essay",
    date: "2023-05-15",
  },
  {
    id: "GRD004",
    student: "Noah Johnson",
    subject: "History",
    grade: "B",
    score: "85/100",
    type: "Project",
    date: "2023-05-18",
  },
  {
    id: "GRD005",
    student: "Sophia Williams",
    subject: "Art",
    grade: "A+",
    score: "98/100",
    type: "Project",
    date: "2023-05-20",
  },
  {
    id: "GRD006",
    student: "Liam Garcia",
    subject: "Music",
    grade: "B-",
    score: "80/100",
    type: "Performance",
    date: "2023-05-22",
  },
  {
    id: "GRD007",
    student: "Ava Rodriguez",
    subject: "Physical Education",
    grade: "A",
    score: "95/100",
    type: "Assessment",
    date: "2023-05-25",
  },
  {
    id: "GRD008",
    student: "Ethan Lee",
    subject: "Computer Science",
    grade: "B+",
    score: "88/100",
    type: "Project",
    date: "2023-05-28",
  },
]

export function GradesTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGrades = grades.filter(
    (grade) =>
      grade.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Calificación
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Alumno</TableHead>
              <TableHead>Asignatura</TableHead>
              <TableHead>Calificación</TableHead>
              <TableHead>Puntaje</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGrades.length > 0 ? (
              filteredGrades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.id}</TableCell>
                  <TableCell>{grade.student}</TableCell>
                  <TableCell>{grade.subject}</TableCell>
                  <TableCell>{grade.grade}</TableCell>
                  <TableCell>{grade.score}</TableCell>
                  <TableCell>{grade.type}</TableCell>
                  <TableCell>{grade.date}</TableCell>
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
                        <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Editar calificación</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No se encontraron calificaciones.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>
        <Button variant="outline" size="sm">
          Siguiente
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
