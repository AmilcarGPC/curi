import type { Metadata } from "next"
import ReportsPageClient from "./ReportsPageClient"

export const metadata: Metadata = {
  title: "Reportes | Gestión de Calificaciones Primaria",
  description: "Genera y consulta reportes académicos",
}

export default function ReportsPage() {
  return <ReportsPageClient />
}
