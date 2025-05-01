"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const isMobile = useIsMobile()
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        {isMobile && <SidebarTrigger />}
        <Link href="/dashboard" className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Logo de la escuela"
              width={32}
              height={32}
              className="rounded-md"
            />
          </motion.div>
          <span className="hidden font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent md:inline-block">
            Primaria
          </span>
        </Link>
      </div>

      {/* Search bar - hidden on mobile unless activated */}
      <div className={`${isMobile && !showSearch ? "hidden" : "flex"} flex-1 items-center gap-4 md:gap-8`}>
        <form className="flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px] focus-visible-ring"
              aria-label="Buscar"
            />
          </div>
        </form>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 focus-visible-ring btn-hover-effect"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle search"
          >
            <Search className="h-4 w-4" />
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 focus-visible-ring btn-hover-effect relative"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full " aria-hidden="true"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="font-medium">Nueva calificación agregada</div>
                  <div className="text-sm text-muted-foreground">Examen de Matemáticas para Alex Chen</div>
                  <div className="text-xs text-muted-foreground mt-1">hace 2 horas</div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium text-primary">
              Ver todas las notificaciones
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full focus-visible-ring">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Juan Pérez</p>
                <p className="text-xs leading-none text-muted-foreground">juan.perez@escuela.edu</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
