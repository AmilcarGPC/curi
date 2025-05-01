"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { studentSchema, type StudentFormValues } from "./student-schema"
import type { Student } from "./students-table"

interface EditStudentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: Student
  onSubmit: (values: Student) => void
}

export function EditStudentDialog({ open, onOpenChange, student, onSubmit }: EditStudentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      matricula: student.matricula,
      nombre: student.nombre,
      grado: student.grado,
      correo: student.correo,
    },
  })

  // Update form when student changes
  useEffect(() => {
    if (student) {
      form.reset({
        matricula: student.matricula,
        nombre: student.nombre,
        grado: student.grado,
        correo: student.correo,
      })
    }
  }, [student, form])

  const handleSubmit = async (values: StudentFormValues) => {
    setIsSubmitting(true)
    // Llama directamente a onSubmit, que ahora hace la petición real en students-table.tsx
    await onSubmit({ ...values, id: student.id })
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Alumno</DialogTitle>
          <DialogDescription>Modifica la información del alumno. Todos los campos marcados con * son obligatorios.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="matricula"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matrícula *</FormLabel>
                    <FormControl>
                      <Input placeholder="A12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre *</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="grado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grado *</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona grado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1er Grado</SelectItem>
                        <SelectItem value="2">2do Grado</SelectItem>
                        <SelectItem value="3">3er Grado</SelectItem>
                        <SelectItem value="4">4to Grado</SelectItem>
                        <SelectItem value="5">5to Grado</SelectItem>
                        <SelectItem value="6">6to Grado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="alumno@escuela.edu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
