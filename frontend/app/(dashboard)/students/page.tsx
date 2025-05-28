import type { Metadata } from "next"
import { DashboardBreadcrumb } from "@/components/dashboard/breadcrumb"
import { StudentsTable } from "@/components/students/students-table"

export const metadata: Metadata = {
  title: "Alumnos | Gestión de Calificaciones Primaria",
  description: "Gestiona la información y registros de los alumnos",
}

export default function StudentsPage() {
  return (
    <div className="space-y-6 w-full min-w-0">
      <DashboardBreadcrumb
        items={[
          { title: "Panel", href: "/dashboard" },
          { title: "Alumnos", href: "/students" },
        ]}
      />

      <div className="py-4 w-full min-w-0">
        <h1 className="mb-6 text-3xl font-bold">Alumnos</h1>
        <StudentsTable />
      </div>
    </div>
  )
}
