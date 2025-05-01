"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import * as z from "zod"

const subjectSchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  grado: z.number().min(1).max(6),
})

type SubjectFormValues = z.infer<typeof subjectSchema>

type AddSubjectDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: Omit<SubjectFormValues, "id">) => void
}

export function AddSubjectDialog({ open, onOpenChange, onSubmit }: AddSubjectDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<SubjectFormValues>({
    defaultValues: { nombre: "", grado: 1 },
  })

  const handleSubmit = async (values: SubjectFormValues) => {
    setIsSubmitting(true)
    await onSubmit(values)
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Agregar Asignatura</DialogTitle>
          <DialogDescription>Llena los campos para agregar una nueva asignatura.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la asignatura" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
                {isSubmitting ? "Agregando..." : "Agregar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
