import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function EditGradeDialog({ open, onOpenChange, grade, onSubmit, alumnos = [], asignaturas = [] }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  grade: any
  onSubmit: (grade: { calificacion: number }) => void
  alumnos?: { id: string, nombre: string }[]
  asignaturas?: { id: string, nombre: string }[]
}) {
  const [form, setForm] = useState<{ calificacion: number }>({ calificacion: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (grade) {
      setForm({ calificacion: grade.calificacion || 0 })
    }
  }, [grade])

  const handleChange = (value: number) => {
    setForm({ calificacion: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit(form)
    setLoading(false)
  }

  // Obtener nombres para mostrar
  const alumnoNombre = alumnos.find(a => a.id === grade?.alumno_id)?.nombre || grade?.alumno || grade?.alumno_id
  const asignaturaNombre = asignaturas.find(a => a.id === grade?.asignatura_id)?.nombre || grade?.asignatura || grade?.asignatura_id
  const periodoLabel =
    grade?.periodo === 1 ? "1er Trimestre" :
    grade?.periodo === 2 ? "2do Trimestre" :
    grade?.periodo === 3 ? "3er Trimestre" : grade?.periodo

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Calificación</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs mb-1">Alumno</label>
            <Input value={alumnoNombre} disabled readOnly />
          </div>
          <div>
            <label className="block text-xs mb-1">Asignatura</label>
            <Input value={asignaturaNombre} disabled readOnly />
          </div>
          <div>
            <label className="block text-xs mb-1">Periodo</label>
            <Input value={periodoLabel} disabled readOnly />
          </div>
          <div>
            <label className="block text-xs mb-1">Calificación</label>
            <Input type="number" min={0} max={100} value={form.calificacion} onChange={e => handleChange(Number(e.target.value))} required />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
