import type { Metadata } from "next"
import { DashboardBreadcrumb } from "@/components/dashboard/breadcrumb"
import { SubjectsTable } from "@/components/subjects/subjects-table"

export const metadata: Metadata = {
  title: "Subjects | Elementary School Grade Management",
  description: "Manage school subjects and curriculum",
}

export default function SubjectsPage() {
  return (
    <div className="space-y-6">
      <DashboardBreadcrumb
        items={[
          { title: "Panel", href: "/dashboard" },
          { title: "Asignaturas", href: "/subjects" },
        ]}
      />

      <div className="flex-col items-center ">
        <h1 className="mb-6 text-3xl font-bold">Asignaturas</h1>
        <SubjectsTable />
      </div>
    </div>
  )
}
