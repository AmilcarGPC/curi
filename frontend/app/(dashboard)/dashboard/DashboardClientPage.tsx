"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { DashboardBreadcrumb } from "@/components/dashboard/breadcrumb"
import { PageTransition } from "@/components/ui/page-transition"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown, Users, BookOpen, GraduationCap, UserCheck } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { config } from "@/lib/config"

export default function DashboardClientPage() {
  const [averageGrade, setAverageGrade] = useState<string | null>(null)
  const [averagePeriod, setAveragePeriod] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [totalStudents, setTotalStudents] = useState<string | null>(null)
  const [totalSubjects, setTotalSubjects] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch(`${config.apiUrl}/alumnos`).then(res => res.json()),
      fetch(`${config.apiUrl}/asignaturas`).then(res => res.json()),
      fetch(`${config.apiUrl}/calificaciones/promedio-ultimo-periodo`).then(res => res.json()),
    ])
      .then(([alumnos, asignaturas, promedio]) => {
        setTotalStudents(alumnos?.length?.toString() ?? "—")
        setTotalSubjects(asignaturas?.length?.toString() ?? "—")
        if (promedio && typeof promedio.promedio === "number") {
          setAverageGrade(promedio.promedio.toString())
          setAveragePeriod(promedio.periodo ? `Periodo ${promedio.periodo}` : null)
        } else {
          setAverageGrade("—")
          setAveragePeriod(null)
        }
      })
      .catch(() => {
        setTotalStudents("—")
        setTotalSubjects("—")
        setAverageGrade("—")
        setAveragePeriod(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const statCards = [
    {
      title: "Total de Estudiantes",
      value: loading ? "..." : totalStudents ?? "—",
      change: "",
      changeText: "",
      icon: Users,
      trend: "up",
    },
    {
      title: "Promedio General",
      value: loading ? "..." : averageGrade ?? "—",
      change: averagePeriod ? averagePeriod : "",
      changeText: "último periodo completo",
      icon: GraduationCap,
      trend: "up",
    },
    {
      title: "Total de Asignaturas",
      value: loading ? "..." : totalSubjects ?? "—",
      change: "",
      changeText: "",
      icon: BookOpen,
      trend: "up",
    },
    {
      title: "Total de Docentes",
      value: "—",
      change: "",
      changeText: "",
      icon: UserCheck,
      trend: "up",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <DashboardBreadcrumb items={[{ title: "Inicio", href: "/dashboard" }]} />

        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {statCards.map((card, index) => (
            <motion.div key={index} variants={item}>
              <Card className="overflow-hidden border-l-4 border-primary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <card.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold min-h-[2.5rem] flex items-center justify-start">
                    {loading ? (
                      <span className="inline-block animate-pulse w-8 h-6 rounded bg-muted" />
                    ) : (
                      card.value
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {card.trend === "up" ? (
                      <ArrowUp className="mr-1 h-3 w-3 text-success" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3 text-danger" />
                    )}
                    <span className={card.trend === "up" ? "text-success" : "text-danger"}>{card.change}</span>
                    <span className="ml-1">{card.changeText}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <motion.div
            className="col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Resumen de desempeño</CardTitle>
                <CardDescription>Promedios de todas las asignaturas del trimestre actual</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Actividad reciente</CardTitle>
                <CardDescription>Últimos movimientos y registros de calificaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
