"use client"
import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.name || "Usuario desconocido");
      } else {
        setUserName("Usuario desconocido");
      }
    };
    getUser();
  }, []);

  // Determinar título y mensaje según la ruta
  let title = "";
  let subtitle = "";
  if (pathname === "/dashboard") {
    title = `¡Buen día, ${userName || "Usuario desconocido"}!`;
    subtitle = "Hemos organizado todo para ti, recuerda que este dashboard sirve para resumir información de trimestre.";
  } else if (pathname === "/students") {
    title = "Estudiantes";
    subtitle = "Gestiona y consulta la información de los estudiantes.";
  } else if (pathname === "/subjects") {
    title = "Asignaturas";
    subtitle = "Administra las asignaturas disponibles.";
  } else if (pathname === "/grades") {
    title = "Calificaciones";
    subtitle = "Consulta y edita las calificaciones de los alumnos.";
  } else if (pathname === "/reports") {
    title = "Reportes";
    subtitle = "Visualiza reportes y estadísticas generales.";
  } else {
    title = "Panel";
    subtitle = "Bienvenido al panel de administración.";
  }

  return (
    <SidebarProvider>
      <div className="flex-1 flex items-stretch flex-col bg-white ">
        <DashboardHeader />
        <div className="flex flex-1 inset-0 flex overflow-x-hidden">
          <DashboardSidebar />
          <main className="flex-1 items-center flex-col overflow-x-hidden overflow-y-auto px-4 py-4">
            <div className="mb-8 w-full">
              <div className="rounded-2xl shadow-lg bg-gradient-to-r from-[#C09913] to-[#9e811e] p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                  <div className="flex flex-col justify-center w-full md:w-auto">
                    <h1 className="text-3xl font-bold text-white mb-2 text-center md:text-left">{title}</h1>
                    <p className="text-white text-lg text-center md:text-left">{subtitle}</p>
                  </div>
                  {/* Logo dorado solo en dashboard */}
                  {pathname === "/dashboard" && (
                    <img src="/logo_uady_dorado.png" alt="Logo UADY" className="h-50 hidden md:block filter invert brightness-0 ml-0 md:ml-8" />
                  )}
                </div>
              </div>
            </div>
            <div className="">{/* Centra y da padding lateral y vertical al contenido */}
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
