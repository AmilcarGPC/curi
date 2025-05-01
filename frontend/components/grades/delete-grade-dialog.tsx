import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export function DeleteGradeDialog({ open, onOpenChange, grade, onDelete }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  grade: any
  onDelete: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Calificación</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="text-danger h-6 w-6" />
          <span>¿Estás seguro que deseas eliminar esta calificación?</span>
        </div>
        <div className="mb-2 text-sm text-muted-foreground">
          Esta acción no se puede deshacer.
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
