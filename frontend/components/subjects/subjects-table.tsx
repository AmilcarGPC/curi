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
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, BookPlus } from "lucide-react"

// Sample data for subjects
const subjects = [
  {
    id: "SUB001",
    name: "Matemáticas",
    grade: "3er Grado",
    teacher: "Sra. Johnson",
    students: 28,
    averageGrade: "B+",
  },
  {
    id: "SUB002",
    name: "Ciencias",
    grade: "4to Grado",
    teacher: "Sr. Brown",
    students: 25,
    averageGrade: "B",
  },
  {
    id: "SUB003",
    name: "Inglés",
    grade: "2do Grado",
    teacher: "Sra. Davis",
    students: 22,
    averageGrade: "A-",
  },
  {
    id: "SUB004",
    name: "Historia",
    grade: "5to Grado",
    teacher: "Sr. Wilson",
    students: 26,
    averageGrade: "B-",
  },
  {
    id: "SUB005",
    name: "Arte",
    grade: "1er Grado",
    teacher: "Sra. Thompson",
    students: 20,
    averageGrade: "A",
  },
  {
    id: "SUB006",
    name: "Música",
    grade: "3er Grado",
    teacher: "Sr. Garcia",
    students: 28,
    averageGrade: "A-",
  },
  {
    id: "SUB007",
    name: "Educación Física",
    grade: "Todos los Grados",
    teacher: "Sr. Martinez",
    students: 120,
    averageGrade: "A",
  },
  {
    id: "SUB008",
    name: "Informática",
    grade: "4to-5to Grado",
    teacher: "Sra. Lee",
    students: 45,
    averageGrade: "B+",
  },
]

export function SubjectsTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.grade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar asignaturas..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button>
          <BookPlus className="mr-2 h-4 w-4" />
          Agregar Asignatura
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Grado</TableHead>
              <TableHead>Docente</TableHead>
              <TableHead>Alumnos</TableHead>
              <TableHead>Promedio</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{subject.id}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.grade}</TableCell>
                  <TableCell>{subject.teacher}</TableCell>
                  <TableCell>{subject.students}</TableCell>
                  <TableCell>{subject.averageGrade}</TableCell>
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
                        <DropdownMenuItem>Ver plan de estudios</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Editar asignatura</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron asignaturas.
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
