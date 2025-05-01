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
          { title: "Dashboard", href: "/dashboard" },
          { title: "Subjects", href: "/subjects" },
        ]}
      />

      <div className="container mx-auto py-4">
        <h1 className="mb-6 text-3xl font-bold">Subjects</h1>
        <SubjectsTable />
      </div>
    </div>
  )
}
