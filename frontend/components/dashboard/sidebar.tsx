"use client"

import Link from "next/link"
import { LayoutDashboard, Users, BookOpen, GraduationCap, BarChart3, Settings, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [userName, setUserName] = useState<string>("")

  const isActive = (path: string) => {
    return pathname === path
  }

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/students", label: "Students", icon: Users },
    { path: "/subjects", label: "Subjects", icon: BookOpen },
    { path: "/grades", label: "Grades", icon: GraduationCap },
    { path: "/reports", label: "Reports", icon: BarChart3 },
  ]

  const MotionLink = motion(Link)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUserName(user.user_metadata?.name || "Usuario desconocido")
      } else {
        setUserName("Usuario desconocido")
      }
    }
    getUser()
  }, [])

  return (
    <Sidebar className="bg-[#07346B] min-h-screen flex flex-col justify-between rounded-r-2xl shadow-xl">
      <SidebarHeader className="p-0">
        {/* Perfil */}
        <div className="w-full bg-[#07346B] rounded-t-xl flex flex-col items-center pt-20 pb-6 px-4">
          <div className="relative flex flex-col items-center w-full">
            <div className="w-28 h-28 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center relative">
              {/* Imagen de usuario (puedes reemplazar el src por el avatar real) */}
              <img src="/placeholder-user.jpg" alt="Avatar" className="w-full h-full object-cover rounded-full" />
              {/* Indicador de estado fuera del borde */}
              <span className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow-md z-10"></span>
            </div>
            <span className="text-white font-bold text-lg mt-4">{userName}</span>
            <hr className="w-2/3 border-t border-[#ffffff33] mt-4" />
          </div>
        </div>
      </SidebarHeader>

      {/* Recuadro principal de pestañas */}
      <div className="flex flex-col items-center">
        <div className="bg-[#07346B] rounded-2xl shadow-lg py-2 w-[90%]">
          <SidebarContent className="bg-transparent flex flex-col justify-start px-0">
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)} className={isActive(item.path) ? "!bg-[#FFD600] !text-[#07346B] font-semibold rounded-md mx-2" : "text-white hover:bg-[#0a417e] rounded-md mx-2"}>
                    <MotionLink
                      href={item.path}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 px-4 py-3 text-base focus-visible-ring"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label === "Dashboard" ? "Dashboard" : item.label === "Students" ? "Estudiantes" : item.label === "Subjects" ? "Asignaturas" : item.label === "Grades" ? "Calificaciones" : item.label === "Reports" ? "Reportes" : item.label}</span>
                    </MotionLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </div>
      </div>

      {/* Spacer flexible para empujar el footer */}
      <div className="grow" />

      {/* Footer fijo, sin fondo azul extra */}
      <div className="flex flex-col items-center w-full">
        <div className="bg-[#0a417e] rounded-2xl shadow-lg pb-4 pt-2 px-4 w-[90%] mb-4">
          <SidebarFooter className="bg-transparent p-0 shadow-none rounded-none">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <MotionLink
                    href="/settings"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-[#07346B] focus-visible-ring"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Configuración</span>
                  </MotionLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <MotionLink
                    href="/login"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-[#07346B] focus-visible-ring"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Cerrar Sesión</span>
                  </MotionLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </div>
      </div>
    </Sidebar>
  )
}
