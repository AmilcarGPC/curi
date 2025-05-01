import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type GradeInput = {
  alumno_id: string
  asignatura_id: string
  calificacion: number
  periodo: number
}

export function AddGradeDialog({ open, onOpenChange, onSubmit, alumnos = [], asignaturas = [] }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (grade: GradeInput) => void
  alumnos?: { id: string, nombre: string }[]
  asignaturas?: { id: string, nombre: string }[]
}) {
  const [form, setForm] = useState<GradeInput>({ alumno_id: "", asignatura_id: "", calificacion: 0, periodo: 1 })
  const [loading, setLoading] = useState(false)

  const handleChange = (field: keyof GradeInput, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit(form)
    setLoading(false)
    setForm({ alumno_id: "", asignatura_id: "", calificacion: 0, periodo: 1 })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Calificación</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs mb-1">Alumno</label>
            <Select value={form.alumno_id} onValueChange={v => handleChange("alumno_id", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona alumno" />
              </SelectTrigger>
              <SelectContent>
                {alumnos.map(a => (
                  <SelectItem key={a.id} value={a.id}>{a.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs mb-1">Asignatura</label>
            <Select value={form.asignatura_id} onValueChange={v => handleChange("asignatura_id", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona asignatura" />
              </SelectTrigger>
              <SelectContent>
                {asignaturas.map(a => (
                  <SelectItem key={a.id} value={a.id}>{a.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs mb-1">Calificación</label>
            <Input type="number" min={0} max={100} value={form.calificacion} onChange={e => handleChange("calificacion", Number(e.target.value))} required />
          </div>
          <div>
            <label className="block text-xs mb-1">Periodo</label>
            <Select value={String(form.periodo)} onValueChange={v => handleChange("periodo", Number(v))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1er Trimestre</SelectItem>
                <SelectItem value="2">2do Trimestre</SelectItem>
                <SelectItem value="3">3er Trimestre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
