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

export function DashboardSidebar() {
  const pathname = usePathname()

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

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4 font-semibold text-primary">Navigation</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={isActive(item.path)}>
                <MotionLink
                  href={item.path}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="focus-visible-ring"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </MotionLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <MotionLink
                href="/settings"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="focus-visible-ring"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </MotionLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <MotionLink
                href="/login"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="focus-visible-ring"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </MotionLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
