import type { Metadata } from "next"
import DashboardClientPage from "./DashboardClientPage"

export const metadata: Metadata = {
  title: "Dashboard | Elementary School Grade Management",
  description: "Dashboard overview of the grade management system",
}

export default function DashboardPage() {
  return <DashboardClientPage />
}
