"use client"

import { useState } from "react"
import { DashboardBreadcrumb } from "@/components/dashboard/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/ui/page-transition"
import { BoletaCalificacion } from "@/components/reports/boleta-calificacion"
import { PromediosAsignatura } from "@/components/reports/promedios-asignatura"
import { AlumnosRegularidad } from "@/components/reports/alumnos-regularidad"
import { motion } from "framer-motion"

export default function ReportsPageClient() {
  const [activeTab, setActiveTab] = useState("boleta")

  return (
    <PageTransition>
      <div className="space-y-6">
        <DashboardBreadcrumb
          items={[
            { title: "Dashboard", href: "/dashboard" },
            { title: "Reports", href: "/reports" },
          ]}
        />

        <div className="container mx-auto py-4">
          <motion.h1
            className="mb-6 text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Reports
          </motion.h1>

          <Tabs defaultValue="boleta" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="boleta" className="focus-visible-ring">
                Boleta de Calificación
              </TabsTrigger>
              <TabsTrigger value="promedios" className="focus-visible-ring">
                Promedios por Asignatura
              </TabsTrigger>
              <TabsTrigger value="regularidad" className="focus-visible-ring">
                Alumnos Regulares/Irregulares
              </TabsTrigger>
            </TabsList>

            <TabsContent value="boleta" className="space-y-4">
              <BoletaCalificacion />
            </TabsContent>

            <TabsContent value="promedios" className="space-y-4">
              <PromediosAsignatura />
            </TabsContent>

            <TabsContent value="regularidad" className="space-y-4">
              <AlumnosRegularidad />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  )
}
