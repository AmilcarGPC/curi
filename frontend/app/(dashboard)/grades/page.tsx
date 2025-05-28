import type { Metadata } from "next"
import { DashboardBreadcrumb } from "@/components/dashboard/breadcrumb"
import { GradesTable } from "@/components/grades/grades-table"

export const metadata: Metadata = {
  title: "Grades | Elementary School Grade Management",
  description: "Manage and view student grades",
}

export default function GradesPage() {
  return (
    <div className="space-y-6">
      <DashboardBreadcrumb
        items={[
          { title: "Panel", href: "/dashboard" },
          { title: "Calificaciones", href: "/grades" },
        ]}
      />

      <div className="py-4 w-full">
        <h1 className="mb-6 text-3xl font-bold">Calificaciones</h1>
        <GradesTable />
      </div>
    </div>
  )
}
