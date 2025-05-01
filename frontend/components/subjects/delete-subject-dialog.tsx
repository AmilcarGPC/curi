"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Subject = {
  id: string
  nombre: string
  grado: number
}

type DeleteSubjectDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  subject: Subject
  onDelete: () => void
}

export function DeleteSubjectDialog({ open, onOpenChange, subject, onDelete }: DeleteSubjectDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete()
    setIsDeleting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Asignatura</DialogTitle>
          <DialogDescription>
            Esta acción eliminará permanentemente la asignatura <span className="font-medium">{subject.nombre}</span>.
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
